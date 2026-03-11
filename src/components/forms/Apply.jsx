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
  RadioGroup,
  FormControlLabel,
  Radio,
  Link,
  Checkbox,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ACCENT = "#f2c230";
const CANVAS = "#0e0f11";

const Card = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  border: `1px solid ${alpha("#000", 0.18)}`,
  background: "#fff",
  color: "#111",
  boxShadow: `0 16px 48px ${alpha("#000", 0.38)}`,
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
};

const DropZone = styled(Box)(({ active }) => ({
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  borderRadius: 10,
  border: `2px dashed ${active ? ACCENT : "rgba(0,0,0,0.28)"}`,
  background: active ? alpha(ACCENT, 0.08) : "#f3f3f3",
  color: "rgba(0,0,0,0.7)",
  padding: 18,
  transition: "border-color .2s ease, background-color .2s ease",
}));

const fall = keyframes`
  0% { transform: translate3d(0,-20px,0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(0,110vh,0) rotate(720deg); opacity: 1; }
`;

function Confetti({ show }) {
  if (!show) return null;
  const pieces = Array.from({ length: 140 });
  const colors = [ACCENT, "#ffd24a", "#4ecdc4", "#a78bfa", "#ff6b6b"];
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const size = 6 + Math.random() * 8;
        const duration = 5.5 + Math.random() * 3.5;
        const delay = Math.random() * 0.8;
        const rotate = Math.random() * 360;
        const bg = colors[i % colors.length];
        return (
          <Box
            key={i}
            sx={{
              position: "absolute",
              top: -20,
              left: `${left}%`,
              width: size,
              height: size * 1.6,
              backgroundColor: bg,
              borderRadius: "2px",
              transform: `rotate(${rotate}deg)`,
              animation: `${fall} ${duration}s linear ${delay}s forwards`,
              boxShadow: `0 0 0 1px ${alpha("#000", 0.06)}`,
            }}
          />
        );
      })}
    </Box>
  );
}

export default function ApplyForm({
  open,
  onClose,
  onSubmit,
  loading = false,
  roles = ["Entry Ops Specialist", "Squad Instructor", "Entry Ops Director", "Sales Director", "Squad Operations Director"],
  jobDescriptionsHref = "#",
}) {
  const initial = useMemo(
    () => ({
      role: roles[0] || "",
      name: "",
      phone: "",
      noResume: false,
      skills: "",
      resume: null,
    }),
    [roles]
  );
  const [form, setForm] = useState(initial);
  const [touched, setTouched] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [showJobDescriptions, setShowJobDescriptions] = useState(false);

  // Job positions with PDF paths
  const jobPositions = [
    { title: "Squad Instructor", pdfPath: "/job-descriptions/squad-instructor.pdf" },
    { title: "Entry Ops Director", pdfPath: "/job-descriptions/entry-ops-director.pdf" },
    { title: "Squad Operations Director", pdfPath: "/job-descriptions/squad-operations-director.pdf" },
    { title: "Sales Director", pdfPath: "/job-descriptions/sales-director.pdf" },
    { title: "Entry Ops Specialist", pdfPath: "/job-descriptions/entry-ops-specialist.pdf" },
  ];

  const phoneOk = /^\+?[\d\s().-]{7,}$/.test(form.phone || "");
  const nameOk = (form.name || "").trim().length > 1;
  const roleOk = Boolean(form.role);
  const attachmentOk = form.noResume
    ? (form.skills || "").trim().length > 5
    : Boolean(form.resume);
  const canSubmit = roleOk && nameOk && phoneOk && attachmentOk && !loading;

  const handleFile = (file) => setForm((f) => ({ ...f, resume: file }));
  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setTouched({
      role: true,
      name: true,
      phone: true,
      resume: true,
      skills: true,
    });

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const formData = new FormData();
      formData.append("role", form.role);
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("noResume", form.noResume);
      formData.append("skills", form.skills);
      if (form.resume) {
        formData.append("resume", form.resume);
      }

      const response = await fetch("https://txlc-server.onrender.com/api/apply", { // new server
        // const response = await fetch("https://tx-laser-tag-server.onrender.com/api/apply", { // old server
        // const response = await fetch("http://localhost:3000/api/apply", { // local
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Submission failed");

      // Optional: still call the prop-based onSubmit if needed
      await onSubmit?.(form);

      setSubmitted(true);
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 7000);
    } catch (err) {
      console.error("Application submission error:", err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setForm(initial);
    setTouched({});
    setSubmitted(false);
    setCelebrate(false);
    setShowJobDescriptions(false);
    onClose?.();
  };

  return (
    <>
      <Confetti show={celebrate && open} />
      <Dialog
        open={open}
        onClose={resetAndClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
        BackdropProps={{
          sx: {
            backgroundColor: alpha(CANVAS, 0.62),
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <AnimatePresence mode="wait">
          {showJobDescriptions ? (
            <Card
              key="job-descriptions"
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Box sx={{
                position: "relative",
                p: { xs: 3.5, sm: 4 },
                minHeight: 600,
                maxHeight: "80vh",
                display: "flex",
                flexDirection: "column",
              }}>
                <IconButton
                  aria-label="Back to application"
                  onClick={() => setShowJobDescriptions(false)}
                  sx={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    color: alpha("#000", 0.7),
                    transition:
                      "color .2s, transform .2s, box-shadow .25s, background-color .2s",
                    "&:hover": {
                      color: ACCENT,
                      backgroundColor: alpha(ACCENT, 0.12),
                      transform: "translateX(-2px)",
                    },
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <IconButton
                  aria-label="Close"
                  onClick={resetAndClose}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: alpha("#000", 0.7),
                    transition:
                      "color .2s, transform .2s, box-shadow .25s, background-color .2s",
                    "&:hover": {
                      color: ACCENT,
                      backgroundColor: alpha(ACCENT, 0.12),
                      transform: "rotate(90deg)",
                      boxShadow: `0 0 0 6px ${alpha(
                        ACCENT,
                        0.12
                      )}, 0 10px 28px ${alpha(ACCENT, 0.35)}`,
                    },
                    "&:active": { transform: "rotate(90deg) scale(0.94)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <DialogTitle sx={{ p: 0, mb: 0.75, fontWeight: 900, fontSize: 26, mt: 2 }}>
                  Job Descriptions
                </DialogTitle>
                <Typography sx={{ color: alpha("#000", 0.7), fontSize: 15, mb: 3 }}>
                  Download position descriptions to learn more about each role
                </Typography>

                <Stack spacing={2} sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
                  {jobPositions.map((position, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${alpha("#000", 0.12)}`,
                        background: alpha("#000", 0.02),
                        transition: "all .2s ease",
                        "&:hover": {
                          background: alpha(ACCENT, 0.08),
                          borderColor: alpha(ACCENT, 0.3),
                          transform: "translateY(-2px)",
                          boxShadow: `0 4px 12px ${alpha("#000", 0.1)}`,
                        },
                      }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                        {position.title}
                      </Typography>
                      <Button
                        component="a"
                        href={position.pdfPath}
                        download
                        startIcon={<DownloadIcon />}
                        sx={{
                          borderRadius: 1.5,
                          px: 2,
                          py: 0.75,
                          fontWeight: 700,
                          textTransform: "none",
                          color: "#0e0f11",
                          backgroundColor: ACCENT,
                          boxShadow: `0 4px 12px ${alpha(ACCENT, 0.3)}`,
                          "&:hover": {
                            backgroundColor: "#ffd24a",
                            boxShadow: `0 6px 16px ${alpha(ACCENT, 0.4)}`,
                          },
                        }}
                      >
                        Download
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Card>
          ) : submitted ? (
            <Card
              key="success"
              component={motion.div}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Box sx={{ position: "relative", p: { xs: 3.5, sm: 4 } }}>
                <IconButton
                  aria-label="Close"
                  onClick={resetAndClose}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: alpha("#000", 0.7),
                    transition:
                      "color .2s, transform .2s, box-shadow .25s, background-color .2s",
                    "&:hover": {
                      color: ACCENT,
                      backgroundColor: alpha(ACCENT, 0.12),
                      transform: "rotate(90deg)",
                      boxShadow: `0 0 0 6px ${alpha(
                        ACCENT,
                        0.12
                      )}, 0 10px 28px ${alpha(ACCENT, 0.35)}`,
                    },
                    "&:active": { transform: "rotate(90deg) scale(0.94)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <DialogTitle sx={{ p: 0, mb: 1, fontWeight: 900, fontSize: 24 }}>
                  Application submitted!
                </DialogTitle>
                <Typography
                  sx={{ color: alpha("#000", 0.7), fontSize: 15, mb: 2.5 }}
                >
                  Thank you for taking the time to apply to TX Laser Combat! We’re
                  looking forward to reviewing your application and will get back to
                  you if it seems like the right fit.
                </Typography>
                <Button
                  onClick={resetAndClose}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    fontWeight: 800,
                    textTransform: "none",
                    color: "#0e0f11",
                    backgroundColor: ACCENT,
                    boxShadow: `0 12px 30px ${alpha(ACCENT, 0.45)}`,
                    "&:hover": { backgroundColor: "#ffd24a" },
                  }}
                >
                  Done
                </Button>
              </Box>
            </Card>
          ) : (
            <Card
              key="form"
              component={motion.form}
              onSubmit={submit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 3.5, sm: 4 },
                  pt: { xs: 4.5, sm: 5 },
                }}
              >
                <IconButton
                  aria-label="Close"
                  onClick={resetAndClose}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    color: alpha("#000", 0.7),
                    transition:
                      "color .2s, transform .2s, box-shadow .25s, background-color .2s",
                    "&:hover": {
                      color: ACCENT,
                      backgroundColor: alpha(ACCENT, 0.12),
                      transform: "rotate(90deg)",
                      boxShadow: `0 0 0 6px ${alpha(
                        ACCENT,
                        0.12
                      )}, 0 10px 28px ${alpha(ACCENT, 0.35)}`,
                    },
                    "&:active": { transform: "rotate(90deg) scale(0.94)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <DialogTitle sx={{ p: 0, mb: 0.75, fontWeight: 900, fontSize: 26 }}>
                  Apply today
                </DialogTitle>
                <Typography sx={{ color: alpha("#000", 0.7), fontSize: 15, mb: 2 }}>
                  Come work with our amazing team!{" "}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => setShowJobDescriptions(true)}
                    underline="hover"
                    sx={{ color: ACCENT, fontWeight: 700, cursor: "pointer" }}
                  >
                    Job descriptions
                  </Link>
                </Typography>

                <DialogContent sx={{ p: 0 }}>
                  <Stack spacing={2.2}>
                    <Box>
                      <Typography sx={{ fontWeight: 700, mb: 0.75, fontSize: 15 }}>
                        Which role are you applying for?
                      </Typography>
                      <RadioGroup
                        value={form.role}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, role: e.target.value }))
                        }
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                          gridAutoFlow: "row",
                          gap: 0.5,
                        }}
                      >
                        {roles.map((r) => (
                          <FormControlLabel
                            key={r}
                            value={r}
                            control={
                              <Radio
                                sx={{
                                  "&.Mui-checked": { color: ACCENT },
                                  "&:hover": {
                                    backgroundColor: alpha(ACCENT, 0.12),
                                  },
                                  borderRadius: "50%",
                                }}
                              />
                            }
                            label={r}
                          />
                        ))}
                      </RadioGroup>
                    </Box>

                    <TextField
                      label="Full legal name"
                      placeholder="Name"
                      fullWidth
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                      error={touched.name && !nameOk}
                      helperText={
                        touched.name && !nameOk ? "Please enter your name" : ""
                      }
                      sx={fieldAccentSX}
                    />

                    <TextField
                      label="Phone number"
                      placeholder="(123) 456-7890"
                      fullWidth
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                      error={touched.phone && !phoneOk}
                      helperText={
                        touched.phone && !phoneOk
                          ? "Enter a valid phone number"
                          : ""
                      }
                      sx={fieldAccentSX}
                    />

                    {!form.noResume ? (
                      <Stack spacing={1}>
                        {form.resume ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              p: 1,
                              borderRadius: 1,
                              background: alpha("#000", 0.04),
                            }}
                          >
                            <InsertDriveFileIcon fontSize="small" />
                            <Typography variant="body2" sx={{ flex: 1 }}>
                              {form.resume.name}
                            </Typography>
                            <CheckCircleRoundedIcon sx={{ color: "#1aa251" }} />
                          </Box>
                        ) : null}

                        <DropZone
                          active={dragActive}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                          }}
                          onDragLeave={() => setDragActive(false)}
                          onDrop={onDrop}
                        >
                          <Stack spacing={1} alignItems="center">
                            <UploadFileRoundedIcon />
                            <Typography variant="body2">
                              Drag and drop a file
                            </Typography>
                            <Button
                              component="label"
                              sx={{
                                mt: 0.5,
                                borderRadius: 1.5,
                                px: 2,
                                fontWeight: 700,
                                textTransform: "none",
                                color: "#0e0f11",
                                backgroundColor: ACCENT,
                                boxShadow: `0 8px 22px ${alpha(ACCENT, 0.35)}`,
                                "&:hover": { backgroundColor: "#ffd24a" },
                              }}
                            >
                              Browse
                              <input
                                hidden
                                type="file"
                                accept=".pdf,.doc,.docx,.txt,.rtf"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFile(file);
                                }}
                              />
                            </Button>
                          </Stack>
                        </DropZone>
                      </Stack>
                    ) : (
                      <TextField
                        label="Please add availability and relevant skills"
                        placeholder="E.g., I am free weekends and Tuesdays after 3pm. I am CPR certified and have good customer service skills."
                        fullWidth
                        multiline
                        minRows={4}
                        value={form.skills}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, skills: e.target.value }))
                        }
                        onBlur={() => setTouched((t) => ({ ...t, skills: true }))}
                        error={touched.skills && !attachmentOk}
                        helperText={
                          touched.skills && !attachmentOk
                            ? "Please provide a brief summary"
                            : ""
                        }
                        sx={fieldAccentSX}
                      />
                    )}

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.noResume}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              noResume: e.target.checked,
                              resume: e.target.checked ? null : f.resume,
                            }))
                          }
                          sx={{
                            "&.Mui-checked": { color: ACCENT },
                            "&:hover": { backgroundColor: alpha(ACCENT, 0.12) },
                            borderRadius: 1,
                          }}
                        />
                      }
                      label="I don’t have a resume"
                    />

                    {submitError && (
                      <Typography sx={{ color: "#ff6b6b", fontSize: 14, fontWeight: 600, textAlign: "center" }}>
                        Oops! We couldn't submit your application. Please check your connection and try again.
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      component={motion.button}
                      whileTap={{ scale: 0.98 }}
                      sx={{
                        mt: 0.5,
                        borderRadius: 2,
                        py: 1.25,
                        fontWeight: 800,
                        textTransform: "none",
                        color: "#0e0f11",
                        backgroundColor: ACCENT,
                        boxShadow: `0 12px 30px ${alpha(ACCENT, 0.45)}`,
                        "&:hover": { backgroundColor: "#ffd24a" },
                        "&.Mui-disabled": {
                          color: alpha("#000", 0.38),
                          backgroundColor: alpha("#000", 0.08),
                          boxShadow: "none",
                        },
                      }}
                    >
                      {isSubmitting || loading ? "Submitting..." : "Submit application"}
                    </Button>

                    <Typography sx={{ color: alpha("#000", 0.55), fontSize: 13 }}>
                      By submitting your application, you consent to the collection
                      and processing of your personal data for selection purposes in
                      accordance with our Privacy Policy.
                    </Typography>
                  </Stack>
                </DialogContent>
              </Box>
            </Card>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}
