import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import multer from 'multer';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced .env loading with debugging
const envPath = path.resolve(__dirname, '../../.env');
console.log(`[DEBUG] Attempting to load .env from: ${envPath}`);

if (fs.existsSync(envPath)) {
    console.log(`[DEBUG] .env file found on disk.`);
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        console.error(`[DEBUG] Error parsing .env file:`, result.error);
    } else {
        console.log(`[DEBUG] .env variables loaded successfully.`);
    }
} else {
    console.error(`[DEBUG] .env file NOT FOUND at: ${envPath}`);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for memory storage
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('[DEBUG] MONGODB_URI is not defined in environment variables');
            return;
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
    }
};
connectDB();

// Define VIP Schema & Model
const vipSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const VIPUser = mongoose.model('VIPUser', vipSchema);

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Escapes guest-supplied values before they are interpolated into notification
 * email HTML, so a stray `<` in a submission cannot break or inject markup.
 * The older routes in this file still interpolate raw input — see ADO-427 notes.
 */
const escapeHtml = (value) =>
    String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

// Validation: Ensure critical environment variables are loaded
const requiredEnv = ['EMAIL_USER', 'EMAIL_PASS'];
const missingEnv = requiredEnv.filter(key => !process.env[key]);

if (missingEnv.length > 0) {
    console.error('\n❌ CRITICAL ERROR: Missing environment variables in .env:');
    missingEnv.forEach(key => console.error(`   - ${key}`));
    console.error('\nPlease check your .env file in the project root.\n');
    // We don't exit(1) anymore to allow the server to start even if partially configured
}

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Verify transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error connecting to email server:', error);
        console.error('TIP: If using Gmail, make sure you are using an APP PASSWORD, not your regular password.');
    } else {
        console.log('✅ Server is ready to take our messages');
    }
});

// Job Application Route
app.post('/api/apply', upload.single('resume'), async (req, res) => {
    const { role, name, phone, skills, noResume } = req.body;
    const file = req.file;

    console.log(`\n📩 Received Job Application:`);
    console.log(`   - Role: ${role}`);
    console.log(`   - Name: ${name}`);
    console.log(`   - Phone: ${phone}`);
    console.log(`   - Resume Uploaded: ${file ? '✅ ' + file.originalname : '❌ No'}`);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Job Application: ${role} from ${name}`,
        html: `
            <h3>New Job Application for TX Laser Combat</h3>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Resume Provided:</strong> ${file ? 'Yes' : 'No'}</p>
            ${skills ? `<p><strong>Skills/Availability:</strong><br/>${skills}</p>` : ''}
        `,
        attachments: file ? [
            {
                filename: file.originalname,
                content: file.buffer
            }
        ] : []
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Application email sent successfully for ${name}`);
        res.status(200).json({ message: 'Application submitted successfully!' });
    } catch (error) {
        console.error('❌ Error sending application email:', error);
        res.status(500).json({ message: 'Failed to submit application.' });
    }
});

// VIP Access List Route
app.post('/api/vip', async (req, res) => {
    const { name, email } = req.body;
    console.log(`\n💎 New VIP Signup: ${name} (${email})`);

    // 1. Log to CSV & MongoDB
    const csvPath = path.resolve(__dirname, '../../vip_signups.csv');
    const timestamp = new Date().toISOString();
    const csvLine = `"${timestamp}","${name}","${email}"\n`;

    try {
        // Create header if file doesn't exist
        if (!fs.existsSync(csvPath)) {
            fs.writeFileSync(csvPath, '"Timestamp","Name","Email"\n');
        }
        fs.appendFileSync(csvPath, csvLine);
        console.log(`   - Logged to CSV: ${csvPath}`);
        
        // Save to MongoDB
        const newVip = new VIPUser({ name, email });
        await newVip.save();
        console.log(`   - Logged to MongoDB`);
    } catch (err) {
        console.error('   ❌ Error writing to DB/CSV:', err);
    }

    // 2. Alert Owner
    const ownerMail = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New VIP Access List Signup: ${name}`,
        html: `
            <h3>New VIP Alert!</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>This user has been added to the VIP Access List Database.</p>
        `
    };

    // 3. Welcome User
    const welcomeMail = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Welcome to the TX Laser Combat VIP List!`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; line-height: 1.6;">
                <h2 style="color: #f2c230;">Welcome to the VIP Access List, ${name}!</h2>
                <p>You're in! Thank you for joining the Texas Laser Combat VIP list. You'll be the first to know about our grand opening, exclusive promotions, and special tactical events.</p>
                <p>Stay tuned for more updates coming straight to your inbox.</p>
                <br/>
                <p>Best regards,<br/><strong>The TX Laser Combat Team</strong></p>
            </div>
        `
    };

    try {
        await Promise.all([
            transporter.sendMail(ownerMail),
            transporter.sendMail(welcomeMail)
        ]);
        console.log(`✅ VIP alert and welcome emails sent successfully.`);
        res.status(200).json({ message: 'Successfully joined the VIP list!' });
    } catch (error) {
        console.error('❌ Error sending VIP emails:', error);
        res.status(500).json({ message: 'Failed to complete VIP signup.' });
    }
});

// VIP Access List View Route (JSON from DB or CSV fallback)
app.get('/api/vip-list', async (req, res) => {
    try {
        // Try getting from MongoDB first
        if (mongoose.connection.readyState === 1) {
            const vips = await VIPUser.find().sort({ timestamp: -1 });
            
            if (vips.length > 0) {
                let plainText = '=== Texas Laser Combat VIP Access List (MongoDB) ===\n\n';
                vips.forEach(vip => {
                    const date = new Date(vip.timestamp).toLocaleString();
                    plainText += `[${date}] ${vip.name.padEnd(20)} | ${vip.email}\n`;
                });
                res.setHeader('Content-Type', 'text/plain');
                return res.send(plainText);
            }
        }
        
        // Fallback to CSV if DB is empty or disconnected
        const csvPath = path.resolve(__dirname, '../../vip_signups.csv');
        
        if (!fs.existsSync(csvPath)) {
            return res.status(404).send('VIP list is currently empty.');
        }

        const data = fs.readFileSync(csvPath, 'utf8');
        const lines = data.split('\n');
        
        // Format the CSV as nice plain text
        let plainText = '=== Texas Laser Combat VIP Access List (CSV Fallback) ===\n\n';
        
        // Skip header
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            
            // Basic CSV parser for "val","val" format
            const parts = lines[i].split('","').map(s => s.replace(/"/g, ''));
            if (parts.length >= 3) {
                const [timestamp, csvName, csvEmail] = parts;
                const date = new Date(timestamp).toLocaleString();
                plainText += `[${date}] ${csvName.padEnd(20)} | ${csvEmail}\n`;
            }
        }
        
        res.setHeader('Content-Type', 'text/plain');
        res.send(plainText);
    } catch (err) {
        console.error('Error reading VIP list:', err);
        res.status(500).send('Error retrieving VIP list.');
    }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, message } = req.body;
    console.log(`\n📬 Received Contact Form: ${firstName} ${lastName} (${email})`);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
            <h3>New Contact Form Submission from tx-laser-combat</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phoneNumber}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Contact email sent successfully for ${firstName} ${lastName}`);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('❌ Error sending contact email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

// Donation Request Route (ADO-427)
// The /about FAQ promises an online donation request form; this is where it
// lands. Requests go to Ops rather than the shared EMAIL_USER inbox so they can
// be triaged separately from contact-form traffic.
app.post('/api/donation-request', async (req, res) => {
    const { organization, contactName, email, phone, eventDate, details } = req.body ?? {};

    if (!organization || !contactName || !email || !details) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    console.log(`\n🎁 Received Donation Request from ${organization} (${contactName})`);

    const recipient = process.env.DONATION_EMAIL || 'ops@txlasercombat.com';

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        replyTo: email,
        subject: `Donation Request: ${organization}`,
        html: `
            <h3>New Donation Request — txlasercombat.com</h3>
            <p><strong>Organization:</strong> ${escapeHtml(organization)}</p>
            <p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone) || 'Not provided'}</p>
            <p><strong>Event / campaign date:</strong> ${escapeHtml(eventDate) || 'Not provided'}</p>
            <p><strong>Request details:</strong></p>
            <p>${escapeHtml(details).replace(/\n/g, '<br/>')}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Donation request emailed to ${recipient}`);
        res.status(200).json({ message: 'Donation request submitted successfully!' });
    } catch (error) {
        console.error('❌ Error sending donation request email:', error);
        res.status(500).json({ message: 'Failed to submit donation request.' });
    }
});

// Apple Merchant ID Domain Association Route
app.get('/.well-known/apple-developer-merchantid-domain-association', (req, res) => {
    const filePath = path.resolve(__dirname, '../../public/.well-known/apple-developer-merchantid-domain-association');
    
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/plain');
        // Read file explicitly to ensure we send exact content as text/plain
        const content = fs.readFileSync(filePath, 'utf8');
        res.send(content);
    } else {
        console.error(`[Error] Merchant ID file not found at ${filePath}`);
        res.status(404).send('File not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
