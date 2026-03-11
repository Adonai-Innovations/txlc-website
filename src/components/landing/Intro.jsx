import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Waitlist from "../forms/Waitlist";

const CTA = "#f2c230";
const CTA_HOVER = "#ffd24a";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  color: alpha("#fff", 0.92),
  background: "transparent",
  overflow: "hidden",
  paddingBlock: theme.spacing(8),
  [theme.breakpoints.up("md")]: { paddingBlock: theme.spacing(12) },
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gridTemplateAreas: `"media" "content"`,
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(6),
  alignItems: "center",
  paddingInline: 0,
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 0.4fr) minmax(0, 0.6fr)",
    gridTemplateAreas: '"media content"',
    rowGap: 0,
  },
}));

const MediaArea = styled("div")({ gridArea: "media", minWidth: 0 });
const ContentArea = styled("div")({ gridArea: "content", minWidth: 0 });

const MediaWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  [theme.breakpoints.up("sm")]: { aspectRatio: "16 / 10" },
  [theme.breakpoints.up("md")]: { minHeight: 420, aspectRatio: "auto" },
  borderRadius: 18,
  overflow: "hidden",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  background: alpha("#fff", 0.06),
  boxShadow: `0 18px 60px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
}));

const CtaButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  paddingInline: theme.spacing(3.25),
  paddingBlock: theme.spacing(1.4),
  borderRadius: 999,
  fontWeight: 800,
  letterSpacing: "0.02em",
  textTransform: "none",
  color: "#101113",
  backgroundColor: CTA,
  boxShadow: `0 14px 34px ${alpha(CTA, 0.38)}, inset 0 1px 0 ${alpha("#fff", 0.35)}`,
  transition: "transform .2s ease, box-shadow .2s ease, background-color .2s ease",
  "&:hover": { backgroundColor: CTA_HOVER, boxShadow: `0 18px 42px ${alpha(CTA, 0.5)}`, transform: "translateY(-1px)" },
  "&:active": { transform: "translateY(0)" },
  [theme.breakpoints.down("sm")]: { paddingBlock: theme.spacing(1.6) },
}));

export default function HeroIntroSplit({
  title = "A premier immersive experience",
  paragraphs = [
    "At Texas Laser Combat, we deliver more than laser tag—we create full-scale missions that immerse you in strategy, teamwork, and adrenaline. Our DFW arena is built for players ages 7+, where every mission challenges you to think fast, move smart, and win together in a safe, inclusive environment.",
    "Blending cutting-edge technology with creative scenarios, we’re redefining what tactical entertainment means. Texas Laser Combat is where families, friends, schools, and organizations come to connect, celebrate, and experience unforgettable adventures—making us the premier destination for mission-based fun.",
  ],
  ctaText = "Join our VIPs waitlist",

  onWaitlistSubmit,

  onCtaClick = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
  waitlistDisabled = false,

  imageSrc = "/landing/intro.jpg",
  imageAlt = "Texas Laser Combat preview",
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const [openDialog, setOpenDialog] = React.useState(false);
  const handleJoin = () => {
    if (waitlistDisabled) return onCtaClick?.();
    setOpenDialog(true);
  };
  const handleClose = () => setOpenDialog(false);
  const handleSubmit = async (data) => {
    try {
      await onWaitlistSubmit?.(data);
    } finally {
      setOpenDialog(false);
    }
  };

  return (
    <Section component="section" aria-label="Intro">
      <Container maxWidth="xl">
        <GridWrap>
          {/* Media */}
          <MediaArea>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <MediaWrap>
                {imageSrc ? (
                  <Box
                    component="img"
                    alt={imageAlt}
                    src={imageSrc}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 960px) 100vw, 40vw"
                    sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Stack alignItems="center" justifyContent="center" sx={{ position: "absolute", inset: 0, color: alpha("#fff", 0.55) }}>
                    <Typography variant="body2">[ Image / Video Placeholder ]</Typography>
                  </Stack>
                )}
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(700px 360px at 100% 0%, rgba(255,255,255,0.08), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </MediaWrap>
            </motion.div>
          </MediaArea>

          {/* Content */}
          <ContentArea>
            <Stack spacing={downMd ? 3 : 4} alignItems={{ xs: "center", md: "flex-start" }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: 32, sm: 35, md: 40 },
                    lineHeight: 1.15,
                    letterSpacing: { xs: 0, md: "0.2px" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {title}
                </Typography>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.05 }}>
                <Stack spacing={2.25}>
                  {paragraphs.map((p, i) => (
                    <Typography key={i} sx={{ opacity: 0.88, fontSize: { xs: 15.5, md: 16.5 }, lineHeight: 1.8, textAlign: { xs: "center", md: "left" } }}>
                      {p}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>

              <motion.div style={{ alignSelf: downMd ? "stretch" : "flex-start", width: downMd ? "100%" : "auto" }}>
                {/* <CtaButton onClick={handleJoin} size={downMd ? "medium" : "large"} fullWidth={downMd}>
                  {ctaText}
                </CtaButton> */}
              </motion.div>
            </Stack>
          </ContentArea>
        </GridWrap>
      </Container>

      {!waitlistDisabled && (
        <Waitlist open={openDialog} onClose={handleClose} onSubmit={handleSubmit} />
      )}
    </Section>
  );
}
