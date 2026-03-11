import React, { useMemo, useState } from "react";
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

const ACCENT = "#f2c230";
const CANVAS = "#0e0f11";

const Card = styled(Box)(({ theme }) => ({
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
    borderRadius: 4,
    "& fieldset": { borderColor: alpha("#000", 0.22) },
    "&:hover fieldset": { borderColor: alpha("#000", 0.38) },
    "&.Mui-focused fieldset": { borderColor: ACCENT, borderWidth: 2 },
  },
  "& input": { caretColor: ACCENT },
  "& .MuiFormHelperText-root": { color: alpha("#000", 0.55) },
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 1000px #fff inset",
    WebkitTextFillColor: "#111",
    caretColor: ACCENT,
  },
};

export default function Waitlist({
  open,
  onClose,
  onSubmit,
  defaultValues,
  loading = false,
}) {
  const initial = useMemo(
    () => ({
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
    }),
    [defaultValues]
  );
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error
  const [touched, setTouched] = useState({});

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const nameValid = form.name.trim().length > 1;
  const canSubmit = nameValid && emailValid && status !== "submitting";

  const helper = {
    name: touched.name && !nameValid ? "Please enter your name" : "",
    email: touched.email && !emailValid ? "Enter a valid email" : "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!canSubmit) return;

    setStatus("submitting");

    try {
      const response = await fetch("https://txlc-server.onrender.com/api/vip", { // new server
        // const response = await fetch("https://tx-laser-tag-server.onrender.com/api/vip", {
        // const response = await fetch("http://localhost:3000/api/vip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("VIP signup error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
      >
        <Card sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h5" sx={{ fontWeight: 900, color: ACCENT, mb: 2 }}>
            You're on the list!
          </Typography>
          <Typography sx={{ mb: 3, color: alpha("#000", 0.7) }}>
            Check your email for a welcome message from TX Laser Combat.
          </Typography>
          <Button
            onClick={onClose}
            sx={{
              borderRadius: 2,
              py: 1.25,
              fontWeight: 800,
              textTransform: "none",
              color: "#0e0f11",
              backgroundColor: ACCENT,
              px: 4,
              "&:hover": { backgroundColor: "#ffd24a" },
            }}
          >
            Awesome
          </Button>
        </Card>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
      BackdropProps={{
        sx: {
          backgroundColor: alpha(CANVAS, 0.6),
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Card as="form" onSubmit={handleSubmit}>
        <Box sx={{ position: "relative", p: 3.25, pb: 2.5 }}>
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: alpha("#000", 0.65),
              transition:
                "color .2s ease, transform .2s ease, box-shadow .25s ease, background-color .2s ease",
              backgroundColor: "transparent",
              "&:hover": {
                color: ACCENT,
                backgroundColor: alpha(ACCENT, 0.12),
                transform: "rotate(90deg)",
              },
              "&:active": { transform: "rotate(90deg) scale(0.94)" },
              "&:focus-visible": {
                outline: `2px solid ${alpha(ACCENT, 0.9)}`,
                outlineOffset: 2,
                borderRadius: "50%",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogTitle sx={{ p: 0, mb: 1.25, fontWeight: 900, fontSize: 26 }}>
            Join the VIP Access List
          </DialogTitle>

          <Typography sx={{ color: alpha("#000", 0.7), fontSize: 15, mb: 2 }}>
            Unlock exclusive perks as a Texas Laser Combat VIP! Be some of the
            first to know about  special events, sizzling promos, and grand
            opening benefits delivered straight to your inbox. Sign up now and
            elevate your tactical adventures—don't miss out on the action!
          </Typography>

          <DialogContent sx={{ p: 0, py: 1 }}>
            <Stack spacing={1.5}>
              <TextField
                label="Name"
                placeholder="Name"
                fullWidth
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                error={Boolean(helper.name)}
                helperText={helper.name}
                sx={fieldAccentSX}
              />
              <TextField
                label="Email"
                placeholder="example@gmail.com"
                fullWidth
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={Boolean(helper.email)}
                helperText={helper.email}
                type="email"
                sx={fieldAccentSX}
              />
              {status === "error" && (
                <Typography sx={{ color: "#ff6b6b", fontSize: 14, fontWeight: 600, textAlign: "center", mb: 1 }}>
                  Oops! Something went wrong. Please try again.
                </Typography>
              )}
              <Button
                type="submit"
                disabled={!canSubmit}
                sx={{
                  mt: 0.5,
                  borderRadius: 2,
                  py: 1.25,
                  fontWeight: 800,
                  textTransform: "none",
                  color: "#0e0f11",
                  backgroundColor: ACCENT,
                  boxShadow: `0 10px 26px ${alpha(ACCENT, 0.45)}`,
                  fontFamily: "Podkova",
                  "&:hover": { backgroundColor: "#ffd24a" },
                  "&.Mui-disabled": {
                    color: alpha("#000", 0.38),
                    backgroundColor: alpha("#000", 0.08),
                    boxShadow: "none",
                  },
                }}
              >
                {status === "submitting" ? "Joining..." : "Join VIP Access List"}
              </Button>
              <Typography
                sx={{ color: alpha("#000", 0.55), fontSize: 13, mt: 0.5 }}
              >
                By joining our VIP Access List you agree to receive email
                communications from TX Laser Combat to stay up to date with us.
              </Typography>
            </Stack>
          </DialogContent>
        </Box>
      </Card>
    </Dialog>
  );
}
