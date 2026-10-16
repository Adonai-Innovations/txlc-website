import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Stack,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { OPS_EMAIL } from "../../lib/site-facts";

/**
 * Donation request form (ADO-427).
 *
 * The /about FAQ has always told guests to "complete the online donation
 * request form on our website" — but no such form existed, so every donation
 * enquiry had nowhere to land. This collects the request and emails it to Ops.
 * Deliberately no payment step: this is an organisation asking Texas Laser
 * Combat for a donation, not taking one.
 */

const ACCENT = "#f2c230";

const Card = styled(Box)(() => ({
  borderRadius: 16,
  border: `1px solid ${alpha("#000", 0.18)}`,
  background: "#fff",
  color: "#111",
  boxShadow: `0 12px 40px ${alpha("#000", 0.35)}`,
}));

const fieldAccentSX = {
  "& .MuiInputLabel-root": { color: alpha("#000", 0.6) },
  "& .MuiInputLabel-root.Mui-focused": { color: ACCENT },
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    "& fieldset": { borderColor: alpha("#000", 0.22) },
    "&:hover fieldset": { borderColor: alpha("#000", 0.38) },
    "&.Mui-focused fieldset": { borderColor: ACCENT, borderWidth: 2 },
  },
  "& input, & textarea": { caretColor: ACCENT },
  "& .MuiFormHelperText-root": { color: alpha("#000", 0.55) },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #fff inset",
    WebkitTextFillColor: "#111",
    caretColor: ACCENT,
  },
};

const SubmitBtn = styled(Button)(() => ({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 800,
  fontFamily: "Podkova",
  padding: "10px 24px",
  background: ACCENT,
  color: "#101113",
  boxShadow: "none",
  "&:hover": { background: "#ffd95a" },
  "&.Mui-disabled": { background: alpha("#000", 0.12), color: alpha("#000", 0.4) },
}));

const EMPTY = {
  organization: "",
  contactName: "",
  email: "",
  phone: "",
  eventDate: "",
  details: "",
};

export default function DonationRequest({ open, onClose }) {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [touched, setTouched] = useState({});

  const valid = {
    organization: form.organization.trim().length > 1,
    contactName: form.contactName.trim().length > 1,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    details: form.details.trim().length > 9,
  };
  const canSubmit =
    valid.organization &&
    valid.contactName &&
    valid.email &&
    valid.details &&
    status !== "submitting";

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const blur = (key) => () => setTouched((prev) => ({ ...prev, [key]: true }));

  const showError = (key) => Boolean(touched[key]) && !valid[key];
  const helper = (key, message) => (showError(key) ? message : "");

  const handleClose = () => {
    onClose?.();
    // Reset only once the dialog is closed so a successful submit stays visible
    // until the guest dismisses it.
    setForm(EMPTY);
    setStatus("idle");
    setTouched({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      organization: true,
      contactName: true,
      email: true,
      details: true,
    });
    if (!canSubmit) return;

    setStatus("submitting");
    try {
      const response = await fetch(
        "https://txlc-server.onrender.com/api/donation-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      setStatus(response.ok ? "success" : "error");
    } catch (err) {
      console.error("Donation request error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
      >
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: ACCENT, mb: 2 }}>
            Request received
          </Typography>
          <Typography sx={{ mb: 3, color: alpha("#000", 0.7) }}>
            Thanks — our team reviews donation requests and will respond within
            1–2 weeks.
          </Typography>
          <SubmitBtn onClick={handleClose}>Close</SubmitBtn>
        </Card>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
    >
      <Card>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            pb: 1,
            fontWeight: 900,
          }}
        >
          <Box sx={{ flex: 1 }}>
            Donation request
            <Typography
              sx={{ mt: 0.5, fontSize: 14, fontWeight: 400, color: alpha("#000", 0.65) }}
            >
              Tell us about your organization and we will respond within 1–2 weeks.
            </Typography>
          </Box>
          <IconButton onClick={handleClose} aria-label="Close donation request form">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Stack component="form" spacing={2.5} onSubmit={handleSubmit} sx={{ pt: 1 }}>
            <TextField
              label="Organization"
              required
              value={form.organization}
              onChange={setField("organization")}
              onBlur={blur("organization")}
              error={showError("organization")}
              helperText={helper("organization", "Please enter your organization")}
              sx={fieldAccentSX}
              fullWidth
            />
            <TextField
              label="Contact name"
              required
              value={form.contactName}
              onChange={setField("contactName")}
              onBlur={blur("contactName")}
              error={showError("contactName")}
              helperText={helper("contactName", "Please enter a contact name")}
              sx={fieldAccentSX}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={setField("email")}
              onBlur={blur("email")}
              error={showError("email")}
              helperText={helper("email", "Enter a valid email")}
              sx={fieldAccentSX}
              fullWidth
            />
            <TextField
              label="Phone (optional)"
              value={form.phone}
              onChange={setField("phone")}
              sx={fieldAccentSX}
              fullWidth
            />
            <TextField
              label="Event or campaign date (optional)"
              placeholder="e.g. March 14, 2027"
              value={form.eventDate}
              onChange={setField("eventDate")}
              sx={fieldAccentSX}
              fullWidth
            />
            <TextField
              label="What are you requesting, and who does it support?"
              required
              multiline
              minRows={4}
              value={form.details}
              onChange={setField("details")}
              onBlur={blur("details")}
              error={showError("details")}
              helperText={helper("details", "Please add a little more detail")}
              sx={fieldAccentSX}
              fullWidth
            />

            {status === "error" && (
              <Typography sx={{ color: "#b3261e", fontSize: 14 }}>
                Something went wrong sending your request. Please try again, or
                email us directly at {OPS_EMAIL}.
              </Typography>
            )}

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <SubmitBtn type="submit" disabled={!canSubmit}>
                {status === "submitting" ? "Sending…" : "Send request"}
              </SubmitBtn>
            </Box>
          </Stack>
        </DialogContent>
      </Card>
    </Dialog>
  );
}
