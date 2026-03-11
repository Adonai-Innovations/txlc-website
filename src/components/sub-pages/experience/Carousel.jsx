import React from "react";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Dialog,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";



/* -------------------------------- Config -------------------------------- */
export const CAROUSEL_CONFIG = {
  title: "READY YOUR GEAR",
  subtitle: "Build the load-out that takes the territory.",
  slides: [
    { src: "/weapon-carousel/1 Carousel Havoc SI.png", alt: "Havoc SI", modalSrc: "/weapon-stats/updated-stats/1 Update Weapons Screen Havoc SI.png" },
    { src: "/weapon-carousel/2 Carousel Havoc FA.png", alt: "Havoc FA", modalSrc: "/weapon-stats/updated-stats/2 Update Weapons Screen Havoc FA.png" },
    { src: "/weapon-carousel/3 Carousel Havoc SMG.png", alt: "Havoc SMG", modalSrc: "/weapon-stats/updated-stats/3 Update Weapons Screen Havoc SMG.png" },
    { src: "/weapon-carousel/4 Carousel Hornet.png", alt: "Hornet", modalSrc: "/weapon-stats/updated-stats/4 Update Weapons Screen Hornet 9mm.png" },
    { src: "/weapon-carousel/5 Carousel ACR.png", alt: "ACR", modalSrc: "/weapon-stats/updated-stats/5 Update Weapons Screen ACR.png" },
    { src: "/weapon-carousel/6 Carousel Bullpup SG.png", alt: "Bullpup SG", modalSrc: "/weapon-stats/updated-stats/6 Update Weapons Screen Bulpup SG.png" },
    { src: "/weapon-carousel/7 Carousel BMG-50.png", alt: "BMG-50", modalSrc: "/weapon-stats/updated-stats/7 Update Weapons Screen BMG-50.png" },
    { src: "/weapon-carousel/8 Carousel Havoc Sniper.png", alt: "Havoc Sniper", modalSrc: "/weapon-stats/updated-stats/8 Update Weapons Screen Havoc Sniper.png" },
    { src: "/weapon-carousel/9 Carousel Matrix SMG.png", alt: "Matrix SMG", modalSrc: "/weapon-stats/updated-stats/9 Update Weapons Screen Matrix SMG.png" },
    { src: "/weapon-carousel/10 Carousel Pink-90.png", alt: "Pink-90", modalSrc: "/weapon-stats/updated-stats/10 Update Weapons Screen Pink-90.png" },
    { src: "/weapon-carousel/11 Carousel FN SCAR.png", alt: "FN SCAR", modalSrc: "/weapon-stats/updated-stats/11 Update Weapons Screen FN SCAR.png" },
    { src: "/weapon-carousel/12 Carousel Tactical SG.png", alt: "Tactical SG", modalSrc: "/weapon-stats/updated-stats/12 Update Weapons Screen Tactical SG.png" },
    { src: "/weapon-carousel/13 Carousel Warthog M4.png", alt: "Warthog M4", modalSrc: "/weapon-stats/updated-stats/13 Update Weapons Screen Warthog M4.png" },
    { src: "/weapon-carousel/14 Carousel TAR-21.png", alt: "TAR-21", modalSrc: "/weapon-stats/updated-stats/14 Update Weapons Screen TAR-21 Sniper.png" },
    { src: "/weapon-carousel/15 Carousel Incinerator.png", alt: "Incinerator", modalSrc: "/weapon-stats/updated-stats/15 Update Weapons Screen Incinerator Mark-1.png" },
    { src: "/weapon-carousel/16 Carousel Tommy Gun.png", alt: "Tommy Gun", modalSrc: "/weapon-stats/updated-stats/16 Update Weapons Screen Tommy Gun.png" },
    { src: "/weapon-carousel/17 Carousel Rocket Launcher.png", alt: "Rocket Launcher", modalSrc: "/weapon-stats/updated-stats/17 Update Weapons Screen Rocket Launcher.png" },
    { src: "/weapon-carousel/18 Carousel Zombie SAW.png", alt: "Zombie SAW", modalSrc: "/weapon-stats/updated-stats/18 Update Weapons Screen M249 Zombie Saw.png" },
  ],

  stageHeight: { xs: 240, md: 500 },
  containerMaxWidth: "lg",
  spacingY: { xs: 6, md: 20 },

  card: {
    radius: { xs: 10, md: 28 },
    width: { xs: 320, md: 780 },
    height: { xs: 200, md: 480 },
    outlineAlpha: 0.4,
    shadowCenterAlpha: 0.55,
    shadowSideAlpha: 0.35,
  },

  offsets: { near: { xs: 220, md: 320 }, farMultiplier: 1.9 },
  scales: { center: 1.0, near: 0.86, far: 0.76 },
  blur: { near: { xs: 1, md: 2 }, farExtra: 1 },

  showDots: true,
  showArrows: true,
  dots: { activeColor: "#d8b14a", inactiveAlpha: 0.35, size: { active: 12, inactive: 8 } },

  drag: { offsetThreshold: 120, velocityThreshold: 600 },
  autoplay: { enabled: false, intervalMs: 5000, pauseOnHover: true },
  initialIndex: 0,
};

const SHADOW = (a) => `0 24px 80px rgba(0,0,0,${a})`;
const SPRING = { type: "spring", stiffness: 160, damping: 26, mass: 0.9 };



/* ------------------------------ Carousel ------------------------------ */

function useCarousel(length, initial = 0, enableKeys = true) {
  const [index, setIndex] = React.useState(initial);
  const clamp = (v) => (length ? (v + length) % length : 0);
  const next = React.useCallback(() => setIndex((i) => clamp(i + 1)), [length]);
  const prev = React.useCallback(() => setIndex((i) => clamp(i - 1)), [length]);
  const goto = React.useCallback((i) => setIndex(clamp(i)), [length]);

  React.useEffect(() => {
    if (!enableKeys) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, enableKeys]);

  return { index, next, prev, goto, setIndex };
}

function positionFor(slot, cfg, isMdUp) {
  const xBase = isMdUp ? cfg.offsets.near.md : cfg.offsets.near.xs;
  const blurNear = isMdUp ? cfg.blur.near.md : cfg.blur.near.xs;
  switch (slot) {
    case 0: return { x: 0, scale: cfg.scales.center, zIndex: 5, filter: "none", opacity: 1 };
    case -1: return { x: -xBase, scale: cfg.scales.near, zIndex: 4, filter: `blur(${blurNear}px)`, opacity: 0.8 };
    case 1: return { x: xBase, scale: cfg.scales.near, zIndex: 4, filter: `blur(${blurNear}px)`, opacity: 0.8 };
    case -2: return { x: -xBase * cfg.offsets.farMultiplier, scale: cfg.scales.far, zIndex: 3, filter: `blur(${blurNear + cfg.blur.farExtra}px)`, opacity: 0.5 };
    case 2: return { x: xBase * cfg.offsets.farMultiplier, scale: cfg.scales.far, zIndex: 3, filter: `blur(${blurNear + cfg.blur.farExtra}px)`, opacity: 0.5 };
    default: return { x: 0, scale: 0.6, zIndex: 1, filter: "blur(3px)", opacity: 0 };
  }
}

export default function GearCarousel(props) {
  const cfg = {
    ...CAROUSEL_CONFIG,
    ...props,
    card: { ...CAROUSEL_CONFIG.card, ...(props.card || {}) },
  };

  const theme = useTheme();
  const isMdUp =
    typeof window !== "undefined"
      ? window.innerWidth >= theme.breakpoints.values.md
      : true;

  // Lightbox (image OR 3D)
  const [lightbox, setLightbox] = React.useState({ open: false, index: 0 });
  const openLightbox = (i) => setLightbox({ open: true, index: i });
  const closeLightbox = () => setLightbox((v) => ({ ...v, open: false }));

  const nextLightbox = React.useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % cfg.slides.length,
    }));
  }, [cfg.slides.length]);

  const prevLightbox = React.useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + cfg.slides.length) % cfg.slides.length,
    }));
  }, [cfg.slides.length]);

  // Lightbox keyboard nav
  React.useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, nextLightbox, prevLightbox]);

  const { index, next, prev, goto } = useCarousel(cfg.slides.length, cfg.initialIndex, !lightbox.open);
  const dragX = useMotionValue(0);

  // relative slot around active (-2,-1,0,1,2)
  const rel = (i) => {
    const n = cfg.slides.length;
    const diff = ((i - index) % n + n) % n; // 0..n-1
    return diff > n / 2 ? diff - n : diff; // negative = left side
  };

  const onDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -cfg.drag.offsetThreshold || velocity.x < -cfg.drag.velocityThreshold) next();
    else if (offset.x > cfg.drag.offsetThreshold || velocity.x > cfg.drag.velocityThreshold) prev();
  };

  // Preload images & models (basic warm-up)
  React.useEffect(() => {
    cfg.slides.forEach((s) => {
      const imgUrl = s.modalSrc || s.src;
      if (imgUrl) {
        const i = new Image();
        i.decoding = "async";
        i.src = imgUrl;
      }
      // Let three.js load models on demand (preloading OBJ/MTL in the browser is non-trivial).
    });
  }, [cfg.slides]);

  // Autoplay
  React.useEffect(() => {
    if (!cfg.autoplay.enabled || cfg.slides.length <= 1) return;
    const id = setInterval(() => next(), cfg.autoplay.intervalMs);
    return () => clearInterval(id);
  }, [cfg.autoplay.enabled, cfg.autoplay.intervalMs, cfg.slides.length, next]);

  const activeSlide = cfg.slides[lightbox.index] || {};

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        color: "#fff",
        py: cfg.spacingY,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Container maxWidth={cfg.containerMaxWidth} sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: "uppercase", fontSize: { xs: 36, md: 64 }, lineHeight: 1.1, fontFamily: "PostNoBillsJaffna, sans-serif", letterSpacing: "0.04em" }}>
          {cfg.title}
        </Typography>
        <Typography sx={{ opacity: 0.8, mt: 1 }}>{cfg.subtitle}</Typography>
      </Container>

      {/* Stage */}
      <Box sx={{ position: "relative", height: cfg.stageHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ position: "relative", width: "100%", maxWidth: 1100, height: "100%" }}>
          <AnimatePresence initial={false} mode="popLayout">
            {cfg.slides.map((s, i) => {
              const slot = rel(i);
              if (Math.abs(slot) > 2) return null;
              const pos = positionFor(slot, cfg, isMdUp);

              return (
                <motion.div
                  key={i}
                  style={{ position: "absolute", top: 0, left: "50%", x: "-50%" }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  animate={{
                    x: `calc(-50% + ${pos.x}px)`,
                    scale: pos.scale,
                    filter: pos.filter,
                    opacity: pos.opacity,
                    zIndex: pos.zIndex,
                  }}
                  transition={SPRING}
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    style={{ x: dragX, cursor: "grab" }}
                    onDragEnd={onDragEnd}
                  >
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0.92 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: slot === 0 ? 1.02 : 1 }}
                      onClick={() => openLightbox(i)}
                      role="button"
                      aria-label={`View ${s.alt || "weapon"} larger`}
                      tabIndex={0}
                      sx={{
                        width: cfg.card.width,
                        height: cfg.card.height,
                        borderRadius: cfg.card.radius,
                        overflow: "hidden",
                        willChange: "transform, filter, opacity",
                        boxShadow: SHADOW(slot === 0 ? cfg.card.shadowCenterAlpha : cfg.card.shadowSideAlpha),
                        backgroundColor: s.bg || "#0e0f11",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <Box
                        component={motion.img}
                        src={s.src}
                        alt={s.alt || "slide"}
                        loading="eager"
                        decoding="async"
                        initial={{ opacity: 0.85 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        draggable={false}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Controls */}
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 3 }}
        alignItems="center"
        justifyContent="center"
        sx={{
          mt: { xs: 1, md: 3 },
          width: "100%",
          px: 2,
          boxSizing: "border-box"
        }}
      >
        {cfg.showArrows && (
          <IconButton onClick={prev} aria-label="Previous" sx={{ color: alpha("#fff", 0.9) }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {cfg.showDots && (
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1.25 }}
            alignItems="center"
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              maxWidth: { xs: "240px", sm: "none" }
            }}
          >
            {cfg.slides.map((_, i) => (
              <Box
                key={i}
                onClick={() => goto(i)}
                role="button"
                aria-label={`Go to slide ${i + 1}`}
                sx={{
                  width: i === index ? cfg.dots.size.active : cfg.dots.size.inactive,
                  height: i === index ? cfg.dots.size.active : cfg.dots.size.inactive,
                  borderRadius: 999,
                  cursor: "pointer",
                  backgroundColor: i === index ? cfg.dots.activeColor : alpha("#fff", 0.35),
                  boxShadow: i === index ? SHADOW(0.35) : "none",
                  transition: "all .2s ease",
                }}
              />
            ))}
          </Stack>
        )}

        {cfg.showArrows && (
          <IconButton onClick={next} aria-label="Next" sx={{ color: alpha("#fff", 0.9) }}>
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Stack>

      {/* Lightbox Dialog: renders 3D if slide has model; otherwise shows image */}
      <Dialog
        open={lightbox.open}
        onClose={closeLightbox}
        maxWidth="lg"
        fullWidth
        BackdropProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.65)",
          },
        }}
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
            position: "relative",
          },
        }}
      >
        {/* Close */}
        <IconButton
          onClick={closeLightbox}
          aria-label="Close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {/* Navigation Buttons */}
        <IconButton
          onClick={prevLightbox}
          aria-label="Previous Weapon"
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={nextLightbox}
          aria-label="Next Weapon"
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
            display: { xs: "none", sm: "flex" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Content */}
        <Box sx={{ position: "relative", p: { xs: 1.5, md: 2 } }}>
          <Box
            component="img"
            src={activeSlide.modalSrc || activeSlide.src}
            alt={activeSlide.alt || "weapon large"}
            draggable={false}
            style={{ userSelect: "none" }}
            sx={{
              maxWidth: "100%",
              maxHeight: "80vh",
              borderRadius: 2,
              objectFit: "contain",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              display: "block",
              mx: "auto",
            }}
          />
        </Box>
      </Dialog>
    </Box>
  );
}
