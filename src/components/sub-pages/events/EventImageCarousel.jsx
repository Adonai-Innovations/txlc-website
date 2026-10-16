import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";

const Section = styled(Box)({
  width: "100%",
  background: "transparent",
  color: "#eee",
  paddingBlock: 48,
  overflow: "hidden",
});

const Viewport = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "21 / 9",
  borderRadius: 10,
  overflow: "hidden",
  background: "#8d8d8d",
  [theme.breakpoints.down("sm")]: { aspectRatio: "16 / 10" },
}));

const Slide = styled(motion.div)({
  position: "absolute",
  inset: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const Cta = styled(Button)({
  alignSelf: "center",
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 700,
  padding: "8px 16px",
  backgroundColor: "#c6a045",
  color: "#1a1a1a",
  boxShadow: "none",
  "&:hover": { backgroundColor: "#af8e3e", boxShadow: "none" },
});

const Dot = styled("button")(({ active }) => ({
  width: 8,
  height: 8,
  borderRadius: 999,
  border: "none",
  margin: "0 6px",
  background: active ? "#c6a045" : "rgba(255,255,255,.35)",
  cursor: "pointer",
  padding: 0,
}));

export default function EventImageCarousel({
  title = "Plan the perfect event",
  blurb = "We take care of the planning, the gear, and the flow, so your event runs smoothly from start to finish.",
  images = [
    "/events/updates/plan-the-perfect1.webp",
    "/events/updates/plan-the-perfect2.jpeg",
    "/events/updates/plan-the-perfect3.jpeg",
  ],
  intervalMs = 6000,
  onBook,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const count = images?.length ?? 0;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  // Auto-advance
  useEffect(() => {
    if (!count || paused || prefersReducedMotion) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [count, paused, prefersReducedMotion, intervalMs]);

  // Keyboard arrows
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const duration = prefersReducedMotion ? 0 : 0.6;

  return (
    <Section>
      <Container maxWidth="xl">
        <Stack spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={800} textAlign="center">
            {title}
          </Typography>
        </Stack>

        <Viewport
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false} mode="wait">
            {images.map((src, i) =>
              i === index ? (
                <Slide
                  key={src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration }}
                  style={{ backgroundImage: `url(${src})` }}
                  aria-label={`Slide ${i + 1} of ${count}`}
                />
              ) : null
            )}
          </AnimatePresence>
        </Viewport>

        <Stack spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Box aria-label="carousel pagination" role="tablist">
            {images.map((_, i) => (
              <Dot
                key={i}
                active={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: alpha("#fff", 0.8), maxWidth: 720 }}
          >
            {blurb}
          </Typography>

          {/* <Cta onClick={onBook} aria-label="Book now">
            Book now
          </Cta> */}
        </Stack>
      </Container>
    </Section>
  );
}
