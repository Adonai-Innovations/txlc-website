import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import arenaRight from "/about/about.jpg"; // first section (right)
import arenaLeft from "/about/amenities.jpg";  // second section (left)

const ACCENT = "#f2c230";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: alpha("#fff", 0.95),
  paddingBlock: theme.spacing(6),
}));

/* --- Gradients --- */
const RedGradientBlob = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  right: 0,
  width: "60vw",
  height: "70vh",
  background: `radial-gradient(circle at 60% 30%, ${alpha(
    "#8b0000",
    0.55
  )} 0%, transparent 70%)`,
  filter: "blur(60px)",
  zIndex: 0,
  pointerEvents: "none",
}));

const YellowGradientBlob = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "5%",
  left: "-10%",
  width: "50vw",
  height: "60vh",
  background: `radial-gradient(circle at 40% 60%, ${alpha(
    ACCENT,
    0.35
  )} 0%, transparent 70%)`,
  filter: "blur(80px)",
  zIndex: 0,
  pointerEvents: "none",
}));

const TwoColumn = styled(Box)(({ theme, reverse }) => ({
  position: "relative",
  display: "grid",
  gap: theme.spacing(6),
  gridTemplateAreas: `
    "copy"
    "media"
  `,
  gridTemplateColumns: "1fr",
  alignItems: "center",
  zIndex: 1, // Above bg

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: reverse ? `"media copy"` : `"copy media"`,
    gap: theme.spacing(8),
  },
}));

const Copy = styled(Box)({
  gridArea: "copy",
  position: "relative",
});

const Media = styled(Box)({
  gridArea: "media",
  position: "relative",
  display: 'flex',
  justifyContent: 'center',
});

const Eyebrow = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  letterSpacing: 2.2,
  textTransform: "uppercase",
  color: alpha("#fff", 0.7),
  marginBottom: theme.spacing(2),
  fontFamily: "Roboto",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 1.15,
  marginBottom: theme.spacing(3),
  fontFamily: "Roboto",
}));

const Body = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.82),
  lineHeight: 1.7,
  fontFamily: "Roboto",
}));

const Strong = styled("span")({
  color: "#ffd95a",
  fontWeight: 800,
});

const RotatedCard = styled(Box)(({ theme, rotate = 0 }) => ({
  position: "relative",
  width: "100%",
  maxWidth: 480,
  aspectRatio: "16/10",
  background: "#888",
  transform: `rotate(${rotate}deg)`,
  boxShadow: `0 20px 40px ${alpha("#000", 0.6)}`,
  border: "8px solid #fff",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    transform: `rotate(${rotate / 2}deg)`, // Less rotation on mobile
  },
}));

export default function AboutContent() {
  return (
    <Section>
      <RedGradientBlob />
      <YellowGradientBlob />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 20, md: 26 },
          }}
        >
          {/* -------- Section 1: text LEFT, image RIGHT -------- */}
          <TwoColumn>
            <Copy>
              <Eyebrow>Welcome</Eyebrow>
              <Title variant="h4">
                Welcome to Texas Laser Combat, North Dallas’s newest premier
                destination for tactical laser tag adventures in Plano, TX.
              </Title>
              <Body>
                As a veteran and woman-owned family business, we create safe,
                unforgettable bonding for <Strong>ages 7+</Strong>, uniting
                families, friends, and teams. Our community events and
                partnerships with schools and businesses promote active lifestyles.
              </Body>
            </Copy>

            <Media>
              <RotatedCard rotate={3}>
                <Box
                  component="img"
                  src={arenaRight}
                  alt="Texas Laser Combat arena view"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </RotatedCard>
            </Media>
          </TwoColumn>

          {/* -------- Section 2: image LEFT, text RIGHT -------- */}
          <TwoColumn reverse>
            <Media>
              <RotatedCard rotate={-3}>
                <Box
                  component="img"
                  src={arenaLeft}
                  alt="Immersive multi-level arena"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </RotatedCard>
            </Media>

            <Copy>
              <Eyebrow>Arena</Eyebrow>
              <Title variant="h4">Immersive Multi-Level Arena</Title>
              <Body sx={{ mb: 2 }}>
                Our <Strong>15,000-square-foot arena</Strong> offers immersive,
                wasteland-themed gameplay for up to 50, with strategy missions,
                vibration-feedback headsets, and lightweight weapons—making every{" "}
                <Strong>75-minute session</Strong> epic.
              </Body>
              <Body>
                Safety-first equipment and expert staff ensure thrilling,
                accessible fun. Private party rooms host tailored birthdays,
                corporate events, or gatherings. Join solo or with a group to
                unleash your inner warrior at Texas Laser Combat!
              </Body>
            </Copy>
          </TwoColumn>
        </Box>
      </Container>
    </Section>
  );
}
