import React, { useEffect, useState } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { openProducts } from "../../lib/roller";

const ACCENT = "#f2c230";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  display: "grid",
  placeItems: "center",
  color: "#e8e8e8",
  background: "transparent",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    height: "100svh",
    paddingTop: "max(12px, env(safe-area-inset-top))",
    paddingBottom: "max(12px, env(safe-area-inset-bottom))",
  },
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
  overflow: "hidden",
  "& video": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export default function Hero({ ctaText = "Book Now" }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const videoRef = React.useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const playVideo = () => {
      if (video.paused) {
        video.play().catch((e) => console.error("Autoplay failed:", e));
      }
    };

    if (video.readyState >= 3) {
      playVideo();
    }
    video.addEventListener("canplay", playVideo);

    // Cleanup
    return () => {
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  const handleLearnMore = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <Section component="section">
      {/*
        The hero is a video with two buttons, so the homepage shipped with no
        <h1> at all. This keeps the design untouched while giving the most
        important page on the site a heading for crawlers and screen readers.
      */}
      <Box
        component="h1"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Texas Laser Combat — tactical laser tag arena in Plano, TX
      </Box>

      <VideoContainer>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
          aria-hidden="true"
          {...{ "webkit-playsinline": "" }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Desktop-only mute button */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            right: 40,
            zIndex: 2,
            display: { xs: "none", md: "block" },
          }}
        >
          <IconButton
            onClick={toggleMute}
            sx={{
              color: "white",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              "&:hover": { background: "rgba(255,255,255,0.2)" },
            }}
          >
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Box>
      </VideoContainer>

      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        sx={{
          position: "absolute",
          bottom: { xs: 32, md: 48 },
          left: { xs: 0, md: 64 },
          right: { xs: 0, md: "auto" },
          px: { xs: 2.25, md: 0 },
          zIndex: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {/* Mobile-only mute button — sits above the action buttons */}
        <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end" }}>
          <IconButton
            onClick={toggleMute}
            sx={{
              color: "white",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              "&:hover": { background: "rgba(255,255,255,0.2)" },
            }}
          >
            {isMuted ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
        </Box>

        <Button
          onClick={openProducts}
          size={isSm ? "medium" : "large"}
          sx={{
            px: { xs: 3, sm: 3.5 },
            py: { xs: 1.25, sm: 1.5 },
            minWidth: { md: 230 },
            borderRadius: 999,
            fontWeight: 800,
            textTransform: "none",
            letterSpacing: "0.02em",
            color: "#0e0f11",
            backgroundColor: ACCENT,
            boxShadow: `0 10px 30px ${alpha(ACCENT, 0.45)}`,
            fontFamily: "Podkova",
            "&:hover": { backgroundColor: "#ffd24a", boxShadow: `0 14px 36px ${alpha(ACCENT, 0.55)}`, transform: "translateY(-1px)" },
            transition: "all .25s ease",
          }}
        >
          {ctaText}
        </Button>

        <Button
          onClick={handleLearnMore}
          size={isSm ? "medium" : "large"}
          sx={{
            px: { xs: 3, sm: 3.5 },
            py: { xs: 1.25, sm: 1.5 },
            minWidth: { md: 230 },
            borderRadius: 999,
            fontWeight: 800,
            textTransform: "none",
            letterSpacing: "0.02em",
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontFamily: "Podkova",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.22)", transform: "translateY(-1px)" },
            transition: "all .25s ease",
          }}
        >
          Learn More
        </Button>
      </Box>
    </Section>
  );
}
