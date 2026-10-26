// src/components/PartyRoomPackages.jsx
import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { PRODUCTS, DAY_PRODUCTS } from "../../../lib/roller";
import PackageBookingButtons from "./PackageBookingButtons";
import { PACKAGE_SIZE_SUMMARY } from "../../../lib/site-facts";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "transparent",
  paddingBlock: theme.spacing(6),
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
  paddingInline: "clamp(8px, 2vw, 16px)", // side spacing
}));

/* Big rounded panel (use 100%, NOT 100vw) */
const Panel = styled(Paper)(({ theme }) => ({
  width: "100%",
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
`,
  color: alpha("#fff", 0.92),
  borderRadius: 36,
  padding: theme.spacing(5),
  boxShadow:
    "0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
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
  gridColumn: "span 2",
  [theme.breakpoints.down("lg")]: { gridColumn: "span 2" },
  [theme.breakpoints.down("sm")]: { gridColumn: "auto" },
}));

/**
 * Square shell for the package artwork. The client-supplied cards (ADO-437) are
 * 1:1 posters that already carry the title, pricing and inclusions, so they are
 * letterboxed rather than cropped — cropping would cut the price off the card.
 */
const ImgShell = styled(Paper)(() => ({
  position: "relative",
  aspectRatio: "1 / 1",
  borderRadius: 12,
  background: "#111",
  boxShadow: "none",
  display: "grid",
  placeItems: "center",
  color: alpha("#fff", 0.4),
  fontSize: 13,
  userSelect: "none",
  overflow: "hidden",
  border: `1px solid ${alpha("#000", 0.08)}`,
}));

/**
 * Caption + booking strip. It sits under the poster rather than on top of it so
 * it never covers the artwork's own pricing panel.
 */
const Overlay = styled(Box)(({ theme }) => ({
  borderRadius: 10,
  background: alpha("#000", 0.55),
  boxShadow: `0 12px 24px ${alpha("#000", 0.35)}`,
  color: "#fff",
  padding: theme.spacing(1.5, 2),
  marginTop: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
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

/* --------------------------- Defaults ---------------------------- */
const packagesDefault = [
  {
    id: "recruit",
    title: "Recruit Package",
    description:
      "75-minute public arena session for 4+ players with private room for party & more!",
    image: "/events/packages/recruit.webp",
    productId: PRODUCTS.recruit.id,
    campaign: PRODUCTS.recruit.campaign,
  },
  {
    id: "elite",
    title: "Elite Package",
    description:
      "75-minute public arena session with upgraded weapons for 4+ players with private room for party & more!",
    image: "/events/packages/elite.webp",
    productId: PRODUCTS.elite.id,
    campaign: PRODUCTS.elite.campaign,
  },
  {
    // Atomic is three separate ROLLER products (weekday / Saturday / Sunday),
    // so the card books by day rather than through a single Book Now.
    id: "atomic",
    title: "Atomic Package",
    description: `75-minute private arena session, upgraded weapons, private party room. ${PACKAGE_SIZE_SUMMARY}`,
    image: "/events/packages/atomic.webp",
    days: DAY_PRODUCTS.atomic,
  },
];

/* --------------------------- Component --------------------------- */
export default function PartyRoomPackages({
  heading = "Party room packages",
  items = packagesDefault,
  onBook,
}) {
  return (
    <Section>
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
                      alt={`${pkg.title} — pricing and inclusions`}
                      loading="lazy"
                      decoding="async"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                      }}
                    />
                  </ImgShell>

                  <Overlay sx={pkg.days?.length ? { flexDirection: "column", alignItems: "stretch" } : undefined}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <TitleText>{pkg.title}</TitleText>
                      <Body>{pkg.description}</Body>
                    </Box>

                    <PackageBookingButtons pkg={pkg} onBook={onBook} />
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
