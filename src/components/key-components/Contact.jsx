import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(8),
  color: "#fff",
}));

const GridWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "30fr 70fr", // 30/70 split
    gap: theme.spacing(8),
  },
}));

const HeaderColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const FormColumn = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: "#fff",
    backgroundColor: alpha("#fff", 0.05),
    borderRadius: 12,
    "&:hover": {
      backgroundColor: alpha("#fff", 0.08),
    },
    "&.Mui-focused": {
      backgroundColor: alpha("#fff", 0.1),
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#fff", 0.1),
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: alpha("#fff", 0.3),
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#f2c230",
  },
  "& .MuiInputLabel-root": {
    color: alpha("#fff", 0.7),
    "&.Mui-focused": {
      color: "#f2c230",
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f2c230",
  color: "#0e0f11",
  fontWeight: 800,
  padding: theme.spacing(1.5, 4),
  borderRadius: 12,
  textTransform: "none",
  fontSize: 16,
  alignSelf: "flex-start",
  fontFamily: "Podkova",
  "&:hover": {
    backgroundColor: "#ffd95a",
  },
}));

export default function Contact() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [status, setStatus] = React.useState("idle"); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("https://txlc-server.onrender.com/api/contact", { // new server
        // const response = await fetch("http://localhost:3000/api/contact", { // local
        // const response = await fetch("https://tx-laser-tag-server.onrender.com/api/contact", { // old server
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <Section>
      <Container maxWidth="xl">
        <GridWrap>
          {/* Left Column: Header & Subheader */}
          <HeaderColumn>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 800 }}>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ color: alpha("#fff", 0.7), lineHeight: 1.6 }}>
              Have questions? Reach out to our team, and we'll get back to you as soon as possible.
            </Typography>
          </HeaderColumn>

          {/* Right Column: Form */}
          <FormColumn component="form" onSubmit={handleSubmit}>
            {status === "success" ? (
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: alpha("#f2c230", 0.1),
                  border: `1px solid ${alpha("#f2c230", 0.2)}`,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#f2c230", mb: 1 }}>
                  Message Sent!
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.8) }}>
                  Thank you for reaching out. We'll get back to you shortly.
                </Typography>
                <Button
                  sx={{ mt: 3, color: "#f2c230" }}
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </Button>
              </Box>
            ) : status === "error" ? (
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: alpha("#ff6b6b", 0.1),
                  border: `1px solid ${alpha("#ff6b6b", 0.2)}`,
                  textAlign: "center",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#ff6b6b", mb: 1 }}>
                  Oops!
                </Typography>
                <Typography sx={{ color: alpha("#fff", 0.8) }}>
                  Something went wrong. Please try again later or contact us directly.
                </Typography>
                <Button
                  sx={{ mt: 3, color: "#ff6b6b" }}
                  onClick={() => setStatus("idle")}
                >
                  Try again
                </Button>
              </Box>
            ) : (
              <>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <StyledTextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    disabled={status === "submitting"}
                  />
                  <StyledTextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    disabled={status === "submitting"}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <StyledTextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    disabled={status === "submitting"}
                  />
                  <StyledTextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    variant="outlined"
                    disabled={status === "submitting"}
                  />
                </Stack>

                <StyledTextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  disabled={status === "submitting"}
                />

                <SubmitButton
                  type="submit"
                  variant="contained"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </SubmitButton>
              </>
            )}
          </FormColumn>
        </GridWrap>
      </Container>
    </Section>
  );
}
