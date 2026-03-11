import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "transparent",
  // paddingBlock: theme.spacing(6),
  display: "grid",
  placeItems: "center",
}));

/* Full-bleed shell that expands to viewport width and adds a small gutter */
const FullBleed = styled(Box)(({ theme }) => ({
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  width: "100vw",
  paddingInline: "clamp(8px, 2vw, 16px)",
}));

/* >>> Updated gradient & vignette to match screenshot <<< */
const Panel = styled(Paper)(({ theme }) => ({
  width: "100%",
  position: "relative",
  overflow: "hidden",
  color: alpha("#fff", 0.92),
  borderRadius: 40,
  padding: theme.spacing(5),
  boxShadow:
    "0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
  background: `
  radial-gradient(150% 120% at 100% 0%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 62%),
  radial-gradient(130% 110% at 0% 0%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 58%),
  radial-gradient(140% 120% at 0% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%),
  radial-gradient(140% 120% at 100% 100%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 60%),
  linear-gradient(to bottom left,
    #0a0a0a 0%,
    #120001 18%,
    #1b0002 32%,
    #240002 46%,
    #2a0002 62%,
    #2a0002 100%
  )
`
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  textAlign: "center",
  marginBottom: theme.spacing(4),
  color: alpha("#fff", 0.95),
}));

const Cards = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
  [theme.breakpoints.down("lg")]: { gridTemplateColumns: "repeat(4, 1fr)" },
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
}));

const CardWrap = styled(Box)(({ theme }) => ({
  gridColumn: "span 3",
  [theme.breakpoints.down("lg")]: { gridColumn: "span 2" },
  [theme.breakpoints.down("sm")]: { gridColumn: "auto" },
}));

const ImgShell = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 500,
  borderRadius: 12,
  background: "#bfbfbf",
  boxShadow: "none",
  display: "grid",
  placeItems: "center",
  color: alpha("#000", 0.6),
  fontSize: 13,
  userSelect: "none",
  overflow: "hidden",
  border: `1px solid ${alpha("#000", 0.08)}`,
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    aspectRatio: "16 / 9",
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 16,
  borderRadius: 10,
  background: alpha("#000", 0.55),
  boxShadow: `0 12px 24px ${alpha("#000", 0.35)}`,
  backdropFilter: "blur(2px)",
  WebkitBackdropFilter: "blur(2px)",
  color: "#fff",
  padding: theme.spacing(1.5, 2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    position: "relative",
    left: "auto",
    right: "auto",
    bottom: "auto",
    marginTop: theme.spacing(2),
    background: alpha("#000", 0.75),
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column",
  },
}));

const TitleText = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: 22,
  lineHeight: 1.2,
  letterSpacing: 0.2,
}));

const Body = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.85),
  fontSize: 13.5,
  lineHeight: 1.5,
  marginTop: 4,
}));

const BookBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 800,
  borderRadius: 10,
  paddingBlock: 6,
  paddingInline: 14,
  color: "#111",
  backgroundColor: "#f2c230",
  boxShadow: `0 10px 18px ${alpha("#f2c230", 0.35)}`,
  fontFamily: "Podkova",
  "&:hover": { backgroundColor: "#ffd24a", boxShadow: `0 12px 22px ${alpha("#ffd24a", 0.45)}` },
}));

/* --------------------------- Defaults ---------------------------- */
const packagesDefault = [
  {
    id: "core package",
    title: "Core Package",
    description:
      "75-min private session for 25 players and private room for party and more!",
    image: "/events/core.jpg",
    productId: "1692224",
  },
  {
    id: "executive",
    title: "Executive Package",
    description:
      "75-min private session for 25 players with all upgrades unlocked and private room for party and more!",
    image: "/events/executive.jpg",
    productId: "1692227",
  },
];

/* --------------------------- Component --------------------------- */
export default function PartyRoomPackages({
  heading = "Facility packages",
  items = packagesDefault,
  onBook,
}) {
  return (
    <Section sx={{ mb: 8 }}>
      <Container maxWidth="xl">
        <Panel elevation={0}>
          <Title variant="h3">{heading}</Title>

          <Cards>
            {items.map((pkg) => (
              <CardWrap key={pkg.id}>
                <CardContent>
                  <ImgShell>
                    <Box
                      component="img"
                      src={pkg.image}
                      alt={pkg.title}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </ImgShell>

                  <Overlay>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <TitleText>{pkg.title}</TitleText>
                      <Body>{pkg.description}</Body>
                    </Box>

                    <BookBtn onClick={() => onBook?.(pkg)} size="small">
                      Book Now
                    </BookBtn>
                  </Overlay>
                </CardContent>
              </CardWrap>
            ))}
          </Cards>
        </Panel>
      </Container>
    </Section>
  );
}
