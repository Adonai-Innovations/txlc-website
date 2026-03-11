import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

const Section = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(8, 12),
  [theme.breakpoints.down('sm')]: {
    paddingBlock: theme.spacing(2, 4),
  },
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(2, 1fr)", gap: theme.spacing(6) },
  [theme.breakpoints.up("md")]: { gridTemplateColumns: "repeat(3, 1fr)" },
}));

const Media = styled(Box)(({ theme }) => ({
  position: "relative", // <-- allow overlay positioning
  width: "100%",
  aspectRatio: "3 / 2",
  borderRadius: 16,
  overflow: "hidden",
  background: "#9b9b9b",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  boxShadow: {
    xs: "none", // mobile
    sm: `0 20px 50px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
  },
}));

const LearnBtn = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: 12,
  textTransform: "none",
  fontWeight: 800,
  padding: "12px 16px",
  background: alpha("#000", 0.06),
  color: ACCENT,
  border: `1px solid ${alpha(ACCENT, 0.45)}`,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "none",
  letterSpacing: 0.2,
  fontFamily: "Podkova",
  transition: "all .25s ease",
  "&:hover": {
    background: alpha("#000", 0.12),
    borderColor: ACCENT,
    color: ACCENT_HOVER,
    transform: "translateY(-1px)",
  },

  [theme.breakpoints.up("sm")]: {
    width: "auto",
    borderRadius: 999,
    padding: "10px 20px",
    background: ACCENT,
    color: "#101113",
    border: "none",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    boxShadow: `0 10px 28px ${ACCENT}55`,
    "&:hover": {
      background: ACCENT_HOVER,
      boxShadow: `0 14px 36px ${ACCENT}66`,
      transform: "translateY(-1px)",
      color: "#101113",
    },
  },
}));


const GradientWash = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0) 85%)",
  pointerEvents: "none",
}));

const OverlayContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 12,
  right: 12,
  bottom: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",
  gap: theme.spacing(1),
  pointerEvents: "auto",
}));

/* Mobile card shell */
function OfferCard({ it, overlayContent = false }) {
  const ImageBlock = (
    <Box
      component="img"
      src={it.img}
      alt={it.heading}
      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );

  return (
    <Stack
      spacing={3}
      alignItems="center"
      textAlign={overlayContent ? "left" : "center"}
      sx={{ scrollSnapAlign: "center" }}
    >
      <Media>
        {it.img ? (
          ImageBlock
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: "#222",
              fontSize: 15,
              letterSpacing: 0.2,
              background: "#bdbdbd",
            }}
          >
            [Image placeholder]
          </Box>
        )}

        {overlayContent ? (
          <>
            <GradientWash />
            <OverlayContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: "#fff", mb: -1 }}
              >
                {it.heading}
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.92) }}>
                {it.sub}
              </Typography>
              <LearnBtn onClick={it.onClick}>{it.cta}</LearnBtn>
            </OverlayContent>
          </>
        ) : null}
      </Media>

      {!overlayContent && (
        <Box sx={{ maxWidth: 380 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            {it.heading}
          </Typography>
          <Typography sx={{ opacity: 0.85, mb: 2 }}>{it.sub}</Typography>
          <LearnBtn onClick={it.onClick}>{it.cta}</LearnBtn>
        </Box>
      )}
    </Stack>
  );
}

export default function OffersShowcase({
  title = "What We Offer",
  items,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const defaultItems = [
    {
      img: "/landing/experience.jpg",
      heading: "The experience",
      sub: "Immersive tactical game play",
      cta: "Learn more",
      onClick: () => navigate("/experience"),
    },
    {
      img: "/landing/parties.jpg",
      heading: "Groups and parties",
      sub: "Host events, corporate events & more",
      cta: "Learn more",
      onClick: () => navigate("/events"),
    },
    {
      img: "/landing/food.jpg",
      heading: "Food and beverages",
      sub: "Enjoy unique food offerings and catering",
      cta: "Learn more",
      onClick: () => navigate("/experience"),
    },
  ];

  const displayItems = items || defaultItems;

  return (
    <Section>
      <Container maxWidth="xl">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 4,
            letterSpacing: { md: "0.01em" },
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

        <GridWrap>
          {displayItems.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <OfferCard it={it} overlayContent={isMobile} />
            </motion.div>
          ))}
        </GridWrap>
      </Container>
    </Section>
  );
}
