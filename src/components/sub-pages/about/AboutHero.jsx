import React from "react";
import {
  Box,
  Container,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Waitlist from "../../forms/Waitlist";

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
  letterSpacing: "1rsem",
  textTransform: "uppercase",
  fontFamily: "PostNoBillsJaffna, sans-serif",
}));

const Cta = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontSize: 16,
  fontWeight: 700,
  paddingInline: theme.spacing(3),
  paddingBlock: theme.spacing(1.25),
  backgroundColor: "#c6a045",
  fontFamily: "Podkova",
  color: "#1a1a1a",
  "&:hover": { backgroundColor: "#af8e3e" },
}));

const Line = styled("span")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  paddingInline: theme.spacing(1),
  letterSpacing: "0.04em",
}));

export default function EventsHero({
  line1 = "About us",
  line2 = "Unforgettable Events.",
  ctaText = "Join VIP Access List",
  /** If false, don't open modal—just call onCtaClick */
  openOnClick = true,
  /** Called after successful submit (or directly if openOnClick=false) */
  onCtaClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- Waitlist modal state/handlers (same pattern as other sections) ---
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpen = () => {
    if (openOnClick) setOpenDialog(true);
    else onCtaClick?.();
  };
  const handleClose = () => setOpenDialog(false);
  const handleSubmit = async (data) => {
    try {
      await onCtaClick?.(data); // optional hook after submit
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Wrap>
      <Container maxWidth="xl">
        <Stack
          spacing={isMobile ? 4 : 6}
          alignItems="center"
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Headline
            sx={{ fontSize: { xs: "3rem", sm: "6rem" } }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            <Line>{line1}</Line>
          </Headline>

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
