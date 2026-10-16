// src/components/TypesOfEvents.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Paper,
  ButtonBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "transparent",
  color: "#eee",
  paddingBlock: theme.spacing(6),
}));

const Title = (props) => (
  <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }} {...props} />
);

/* Filter bar */
const FilterShell = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: 16,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  overflowX: "auto",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
}));

const Pill = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  padding: "8px 14px",
  borderRadius: 999,
  color: alpha("#fff", 0.9),
  fontWeight: 700,
  letterSpacing: 0.2,
  whiteSpace: "nowrap",
  transition: "transform 160ms ease, color 160ms ease",
  "&:hover": { transform: "translateY(-1px)" },
}));

const ActiveHalo = styled("span")(({ rect }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  height: 36,
  borderRadius: 999,
  background: "rgba(255,255,255,0.12)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
  transform: `translateX(${rect?.x ?? 0}px)`,
  width: rect?.w ?? 0,
  transition: "transform 220ms cubic-bezier(.2,.8,.2,1), width 220ms ease",
  pointerEvents: "none",
}));

/* Carousel + thumb */
const ScrollRow = styled(Box)(({ theme }) => ({
  "--gap": theme.spacing(2),
  position: "relative",
  display: "grid",
  gridAutoFlow: "column",
  gap: "var(--gap)",
  overflowX: "auto",
  // bottom padding is set inline based on showScrollbar
  scrollSnapType: "x mandatory",
  scrollPadding: "var(--gap)",
  WebkitOverflowScrolling: "touch",
  overscrollBehaviorX: "contain",
  gridAutoColumns: "calc((100% - (var(--gap) * 2)) / 3.05)",
  [theme.breakpoints.down("md")]: {
    gridAutoColumns: "calc((100% - var(--gap)) / 2.1)",
  },
  [theme.breakpoints.down("sm")]: {
    gridAutoColumns: "88%",
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
  bottom: 0, // fixed at bottom; spacing comes from ScrollRow padding
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

const Tile = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  background: "#8d8d8d",
  boxShadow: "none",
  overflow: "hidden",
  scrollSnapAlign: "start",
  display: "grid",
  placeItems: "center",
  aspectRatio: "10/10",
  color: alpha("#000", 0.65),
  fontSize: 13,
  userSelect: "none",
}));

const Caption = (props) => (
  <Typography
    variant="caption"
    sx={{ display: "block", fontSize: "1rem", mt: 0.75, color: alpha("#fff", 0.9) }}
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

/* ----------------------------- Data ----------------------------- */
const DATA_DEFAULT = [
  {
    id: "youth",
    title: "Youth Events",
    items: [
      { id: "birthday-kids", label: "Birthday Parties", image: "/events/updates/birthday-parties.webp" },
      { id: "open-play", label: "Open Play", image: "/events/updates/open-play.jpeg" },
      { id: "family-fun", label: "Family Fun", image: "/events/updates/family-fun.webp" },
    ],
  },
  {
    id: "adult",
    title: "Adult Social Groups",
    items: [
      { id: "singles", label: "Singles Meet Ups", image: "/events/updates/meet-ups.webp" },
      { id: "adult-family", label: "Family Fun", image: "/events/updates/family-fun.webp" },
      { id: "adult-open-play", label: "Open Play", image: "/events/updates/open-play.jpeg" },
      { id: "parties", label: "Bachelor/ette Parties", image: "/events/updates/meet-ups.webp" },
    ],
  },
  // {
  //   id: "school",
  //   title: "School Organizations",
  //   items: [
  //     { id: "jrotc", label: "JROTC", image: "/events/corp-party.jpg" },
  //     { id: "fieldtrips", label: "Field Trips", image: "/events/corp-party.jpg" },
  //     { id: "athletics", label: "Athletic Teams", image: "/events/corp-party.jpg" },
  //     { id: "clubs", label: "Clubs", image: "/events/corp-party.jpg" },
  //   ],
  // },
  {
    id: "corporate",
    title: "Corporate Events",
    items: [
      { id: "team", label: "Team Building", image: "/events/updates/team-building.webp" },
      { id: "holiday-parties", label: "Holiday Parties", image: "/events/updates/holiday-parties.webp" },
      { id: "fundraisers", label: "Fundraisers", image: "/events/updates/fundraisers.JPG" },
    ],
  },
];

/* ----------------------------- Component ----------------------------- */
export default function TypesOfEvents({
  heading = "Types of events",
  data = DATA_DEFAULT,
  onTileClick,
  onBook,
}) {
  // Helpers
  const withStableKeys = (arr, prefix) =>
    arr.map((item, idx) => ({ ...item, _key: `${prefix}-${item.id}-${idx}` }));

  // Build categories + All
  const categories = React.useMemo(() => {
    const map = {};
    data.forEach((group) => {
      map[group.title] = withStableKeys(group.items, group.id);
    });
    const seen = new Set();
    const deduped = data.flatMap((g) => g.items).filter((item) => {
      if (seen.has(item.label)) return false;
      seen.add(item.label);
      return true;
    });
    const all = withStableKeys(deduped, "all");
    return { All: all, ...map };
  }, [data]);

  const catKeys = Object.keys(categories);
  const [activeCat, setActiveCat] = useState(catKeys[0] ?? "All");
  const rowRef = useRef(null);

  // Active pill indicator
  const barRef = useRef(null);
  const [rect, setRect] = useState({ x: 0, w: 0 });
  const pillRefs = useRef({});

  const updateIndicator = () => {
    const el = pillRefs.current[activeCat];
    const bar = barRef.current;
    if (!el || !bar) return;
    const eb = el.getBoundingClientRect();
    const bb = bar.getBoundingClientRect();
    setRect({ x: eb.left - bb.left, w: eb.width });
  };

  useEffect(() => {
    updateIndicator();
    const ro = new ResizeObserver(updateIndicator);
    if (barRef.current) ro.observe(barRef.current);
    const onResize = () => updateIndicator();
    window.addEventListener("resize", onResize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCat, catKeys.join("|")]);

  // Progress thumb calc (kept even if bar hidden)
  const [thumb, setThumb] = useState({ widthPct: 0, leftPct: 0 });

  const updateThumb = () => {
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const widthPct = Math.max((clientWidth / scrollWidth) * 100, 8);
    const maxLeft = 100 - widthPct;
    const leftPct =
      scrollWidth > clientWidth
        ? Math.min((scrollLeft / (scrollWidth - clientWidth)) * maxLeft, maxLeft)
        : 0;
    setThumb({ widthPct, leftPct });
  };

  useEffect(() => {
    updateThumb();
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => updateThumb();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  // Reset carousel on category change
  useEffect(() => {
    if (!rowRef.current) return;
    rowRef.current.scrollTo({ left: 0, behavior: "smooth" });
    updateThumb();
  }, [activeCat]);

  const items = categories[activeCat] ?? [];
  const showScrollbar = items.length > 3; // always show when more than 3

  return (
    <Section>
      <Container maxWidth="xl">
        <Title>{heading}</Title>

        {/* Category filter bar */}
        <FilterShell ref={barRef} aria-label="Select event type">
          {/* <ActiveHalo rect={rect} /> */}
          {catKeys.map((key) => (
            <Pill
              key={key}
              ref={(n) => (pillRefs.current[key] = n)}
              onClick={() => setActiveCat(key)}
              aria-pressed={activeCat === key}
              sx={{
                color: activeCat === key ? "#111" : alpha("#fff", 0.9),
                backgroundColor:
                  activeCat === key ? alpha("#fff", 0.85) : "transparent",
              }}
            >
              {key}
            </Pill>
          ))}
        </FilterShell>

        {/* Carousel */}
        <Box position="relative" sx={{ mt: 2 }}>
          <ScrollRow
            ref={rowRef}
            aria-label={`${activeCat} carousel`}
            sx={{ pb: showScrollbar ? 3 : 1 }} // extra spacing when bar is visible
          >
            {items.map((ev) => (
              <Box key={ev._key} sx={{ minWidth: 0 }}>
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

          {/* Progress thumb */}
          <OverlayBar aria-hidden>
            <OverlayTrack visible={showScrollbar}>
              <OverlayThumb
                style={{
                  width: `${thumb.widthPct}%`,
                  left: `${thumb.leftPct}%`,
                }}
              />
            </OverlayTrack>
          </OverlayBar>
        </Box>

        {/* <Stack alignItems="center" sx={{ mt: 3 }}>
          <Cta onClick={onBook}>Book online now</Cta>
        </Stack> */}
      </Container>
    </Section>
  );
}
