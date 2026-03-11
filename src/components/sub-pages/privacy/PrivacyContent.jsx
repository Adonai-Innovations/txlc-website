import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    color: alpha("#fff", 0.95),
    paddingBlock: theme.spacing(6),
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    margin: "0 auto",
}));

const Heading = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    color: "#f2c230",
}));

const Paragraph = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    lineHeight: 1.7,
    color: alpha("#fff", 0.8),
}));

export default function PrivacyContent() {
    return (
        <Section>
            <Container maxWidth="xl">
                <ContentContainer>
                    <Paragraph>
                        Last Updated: January 1, 2026
                    </Paragraph>

                    <Paragraph>
                        At Texas Laser Combat, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully.
                    </Paragraph>

                    <Heading variant="h5">1. Information We Collect</Heading>
                    <Paragraph>
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        <br />
                        <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
                        <br />
                        <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
                    </Paragraph>

                    <Heading variant="h5">2. Use of Your Information</Heading>
                    <Paragraph>
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                        <br />
                        - Process your booking and payments.
                        <br />
                        - Email you regarding your booking or account.
                        <br />
                        - Fulfill and manage purchases, orders, payments, and other transactions related to the Site.
                    </Paragraph>

                    <Heading variant="h5">3. Disclosure of Your Information</Heading>
                    <Paragraph>
                        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                        <br />
                        <strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                    </Paragraph>

                    <Heading variant="h5">4. Security of Your Information</Heading>
                    <Paragraph>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </Paragraph>

                    <Heading variant="h5">5. Contact Us</Heading>
                    <Paragraph>
                        If you have questions or comments about this Privacy Policy, please contact us at:
                        <br />
                        Texas Laser Combat
                        <br />
                        2300 Coit Road (off Irvine Drive) #400, Plano, TX 75075
                        <br />
                        ops@txlasercombat.com
                        <br />
                        (469) 638-8499
                    </Paragraph>
                </ContentContainer>
            </Container>
        </Section>
    );
}
