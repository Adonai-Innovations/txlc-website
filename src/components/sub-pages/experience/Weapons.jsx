import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled(Box)({
  width: "100%",
  background: "transparent",
  color: "#eee",
  paddingBlock: 48,
});

const Title = (props) => (
  <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }} {...props} />
);
const Subhead = (props) => (
  <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }} {...props} />
);

const ScrollRow = styled(Box)(({ theme }) => ({
  "--gap": theme.spacing(2),
  position: "relative",
  display: "grid",
  gridAutoFlow: "column",
  gap: "var(--gap)",
  overflowX: "auto",
  paddingBottom: theme.spacing(1),
  scrollSnapType: "x mandatory",
  scrollPadding: "var(--gap)",
  WebkitOverflowScrolling: "touch",
  overscrollBehaviorX: "contain",
  gridAutoColumns: "calc((100% - (var(--gap) * 2)) / 3.05)",
  [theme.breakpoints.down("md")]: {
    gridAutoColumns: "calc((100% - var(--gap)) / 2.1)", // 2 + peek
  },
  [theme.breakpoints.down("sm")]: {
    gridAutoColumns: "88%", // ~1 + peek
    scrollSnapType: "x proximity",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
}));

const OverlayBar = styled("div")({
  pointerEvents: "none",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 6,
});
const OverlayTrack = styled("div")(({ visible }) => ({
  position: "relative",
  height: 6,
  width: "100%",
  borderRadius: 999,
  background: "transparent",
  transition: "opacity 220ms ease",
  opacity: visible ? 1 : 0,
}));
const OverlayThumb = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  height: 6,
  borderRadius: 999,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.85))",
  boxShadow: "0 0.5px 0 rgba(0,0,0,0.35) inset, 0 2px 6px rgba(0,0,0,0.25)",
});

const ThreeCol = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const Tile = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  background: "#8d8d8d",
  boxShadow: "none",
  overflow: "hidden",
  scrollSnapAlign: "start",
  display: "grid",
  placeItems: "center",
  aspectRatio: "16/10",
  color: alpha("#000", 0.65),
  fontSize: 13,
  userSelect: "none",
}));

const Caption = (props) => (
  <Typography
    variant="caption"
    sx={{ display: "block", mt: 0.75, color: alpha("#fff", 0.9) }}
    {...props}
  />
);

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

const PARTY_EVENTS = [
  { id: "p90", label: "Pink P90", image: "/weapons/p90.png" },
  { id: "rifle", label: "Battle Rifle", image: "/weapons/rifle.webp" },
  { id: "weapon", label: "Weapon", image: "" },
  { id: "holiday", label: "Weapon", image: "" },
  { id: "team", label: "Weapon", image: "" },
  { id: "reunion", label: "Weapon", image: "" },
];

export default function Weapons({
  heading = "Weapons",
  partyEvents = PARTY_EVENTS,
  onTileClick,
  onBook,
}) {
  const rowRef = useRef(null);

  const [thumb, setThumb] = useState({ widthPct: 0, leftPct: 0 });
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);

  const updateThumb = () => {
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const widthPct = Math.max((clientWidth / scrollWidth) * 100, 8);
    const maxLeft = 100 - widthPct;
    const leftPct =
      scrollWidth > clientWidth
        ? Math.min(
          (scrollLeft / (scrollWidth - clientWidth)) * maxLeft,
          maxLeft
        )
        : 0;
    setThumb({ widthPct, leftPct });
  };

  const showThenFade = () => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 900);
  };

  useEffect(() => {
    updateThumb();
    const el = rowRef.current;
    if (!el) return;

    const onScroll = () => {
      updateThumb();
      showThenFade();
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);

    showThenFade();

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <Section>
      <Container maxWidth="xl" sx={{ pb: 15 }}>
        <Title>{heading}</Title>

        <Box position="relative">
          <ScrollRow ref={rowRef} aria-label="Parties">
            {partyEvents.map((ev) => (
              <Box key={ev.id} sx={{ minWidth: 0 }}>
                <Tile
                  role="button"
                  tabIndex={0}
                  onClick={() => onTileClick?.(ev)}
                  sx={{ backgroundImage: `url(${ev.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                </Tile>
                <Caption>{ev.label}</Caption>
              </Box>
            ))}
          </ScrollRow>

          <OverlayBar aria-hidden>
            <OverlayTrack visible={visible}>
              <OverlayThumb
                style={{
                  width: `${thumb.widthPct}%`,
                  left: `${thumb.leftPct}%`,
                }}
              />
            </OverlayTrack>
          </OverlayBar>
        </Box>
      </Container>
    </Section>
  );
}
