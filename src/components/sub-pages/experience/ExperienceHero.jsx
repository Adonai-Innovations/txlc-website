import React from "react";
import {
  Box,
  Container,
  Button,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Waitlist from "../../forms/Waitlist"; // <- adjust the path if needed

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "70vh",
  display: "grid",
  placeItems: "center",
  background: "transparent",
  color: "#eee",
  overflow: "hidden",
}));

const Headline = styled(motion.h1)(({ theme }) => ({
  margin: 0,
  lineHeight: 1,
  textAlign: "center",
  fontWeight: 800,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  fontFamily: "PostNoBillsJaffna, sans-serif",
  fontSize: "clamp(40px, 9vw, 100px)",
  color: "#fff",
}));

const Subhead = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  maxWidth: 980,
  marginInline: "auto",
  color: alpha("#fff", 0.85),
  letterSpacing: "0.02em",
  fontSize: "clamp(14px, 2.2vw, 20px)",
  lineHeight: 1.7,
}));

const Cta = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontSize: 16,
  fontWeight: 700,
  paddingInline: theme.spacing(3),
  paddingBlock: theme.spacing(1.25),
  backgroundColor: "#c6a045",
  color: "#1a1a1a",
  fontFamily: "Podkova",
  "&:hover": { backgroundColor: "#af8e3e" },
}));

export default function HeroEpic({
  line1 = "STEP INTO THE ACTION",
  line2 = "Plan your attack. Know the terrain. Any successful mission starts with recon.",
  ctaText = "Join VIP Access List",
  /** If false, skip modal and just call onCtaClick */
  openOnClick = true,
  /** Optional handler invoked after successful submit: onCtaClick(formData) */
  onCtaClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- Waitlist modal state/handlers ---
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpen = () => {
    if (openOnClick) setOpenDialog(true);
    else onCtaClick?.();
  };

  const handleClose = () => setOpenDialog(false);

  const handleSubmit = async (data) => {
    try {
      await onCtaClick?.(data); // post to API / analytics if you like
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Wrap>
      <Container maxWidth="xl">
        <Stack
          spacing={isMobile ? 3 : 2}
          alignItems="center"
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Headline
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            {line1}
          </Headline>

          <Subhead
            variant="body1"
            component={motion.p}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.12 }}
          >
            {line2}
          </Subhead>

          <Cta
            size={isMobile ? "medium" : "large"}
            onClick={handleOpen}
            component={motion.button}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            aria-label={ctaText}
          >
            {ctaText}
          </Cta>
        </Stack>
      </Container>

      {/* Waitlist modal */}
      <Waitlist open={openDialog} onClose={handleClose} onSubmit={handleSubmit} />
    </Wrap>
  );
}
