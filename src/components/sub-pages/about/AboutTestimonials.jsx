import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "transparent",
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  overflow: "hidden",
  [theme.breakpoints.up("md")]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
}));

const Card = styled(motion.div)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  minWidth: 280,
  maxWidth: 420,
  height: "350px", // fixed height with scroll
  padding: theme.spacing(4),
  borderRadius: 18,
  color: "#fff",
  background: alpha("#fff", 0.05),
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 30px rgba(0,0,0,.45)"
      : "0 8px 30px rgba(0,0,0,.12)",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
  },
}));

const RingGlow = styled("span")(({ theme }) => ({
  pointerEvents: "none",
  position: "absolute",
  inset: -2,
  borderRadius: 20,
  background: `radial-gradient(120% 120% at 0% 0%, ${alpha(
    theme.palette.primary.main,
    0.14
  )} 0%, transparent 45%)`,
  filter: "blur(16px)",
  zIndex: 0,
}));

export default function AboutTestimonials({
  title = "What our customers say",
  subtitle = "Real stories from people who trust us.",
  testimonials = [
    {
      name: "Courtney",
      role: "Parent",
      rating: 5,
      quote: "Our group ranged in age from 11 to 50, and every single one of us had an absolute blast. We’d never been to TX Laser Combat before, but now that we have, we won’t go anywhere else going forward.",
      avatar: "/avatars/alex.jpg",
    },
    {
      name: "Aleese",
      role: "Laser Tag Enthusiast",
      rating: 5,
      quote: "Had a great experience here with my 10 yr old and his friends. They break it up into smaller games and make it fun and interactive. Will definitely be back.",
      avatar: "/avatars/priya.jpg",
    },
    {
      name: "Ginger",
      role: "Event Planner",
      rating: 5,
      quote: "Despite the challenges you were handed, your team truly went above and beyond—everything was handled beautifully and felt completely effortless on our end. The planning, execution, and overall experience could not have been better. Most importantly, the kids had the absolute best time, which made the day so special for all of us. We truly cannot sing your praises highly enough.",
      avatar: "/avatars/jordan.jpg",
    },
    {
      name: "Malaina",
      role: "Youth Group Leader",
      rating: 5,
      quote: "Loved this. Great time! Our family of 8 will definitely be back!",
      avatar: "/avatars/jordan.jpg",
    },
  ],
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const trackRef = React.useRef(null);
  const [index, setIndex] = React.useState(0);

  // --- helpers
  const clamp = (n, min, max) => Math.max(min, Math.min(n, max));

  const centerSlide = React.useCallback((i) => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.children);
    const slide = slides[i];
    if (!slide) return;

    const slideLeft = slide.offsetLeft;
    const slideWidth = slide.clientWidth;
    const containerWidth = track.clientWidth;
    const offset = slideLeft - (containerWidth - slideWidth) / 2;

    track.scrollTo({ left: offset, behavior: "smooth" });
  }, []);

  const goTo = (i) => {
    const max = testimonials.length - 1;
    const next = clamp(i, 0, max);
    setIndex(next);
    centerSlide(next);
  };

  // Sync index while swiping (mobile)
  React.useEffect(() => {
    if (!isMobile) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const slides = Array.from(track.children);
        const center = track.scrollLeft + track.clientWidth / 2;
        let bestI = 0;
        let bestDist = Infinity;
        slides.forEach((el, i) => {
          const mid = el.offsetLeft + el.clientWidth / 2;
          const dist = Math.abs(center - mid);
          if (dist < bestDist) {
            bestDist = dist;
            bestI = i;
          }
        });
        setIndex(bestI);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
    };
  }, [isMobile]);

  // Re-center on load and when layout changes (mobile)
  React.useEffect(() => {
    if (!isMobile) return;
    centerSlide(index);
    const handler = () => centerSlide(index);
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, [isMobile, index, centerSlide]);

  return (
    <Section>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={1.2} sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
            Testimonials
          </Typography>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: { xs: "1.75rem", md: "3rem" },
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ opacity: 0.75, fontSize: { xs: 14, md: 16 } }}>
              {subtitle}
            </Typography>
          )}
        </Stack>

        {/* Track: carousel on mobile, grid on desktop */}
        <Box
          ref={trackRef}
          role={isMobile ? "region" : undefined}
          aria-label="Customer testimonials"
          sx={{
            position: "relative",

            // uniform mobile slide height (tweak as needed)
            "--slide-h": { xs: "300px", md: "auto" },

            display: { xs: "flex", md: "grid" },
            gap: { xs: 1.5, md: 3 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            WebkitOverflowScrolling: "touch",
            px: { xs: 0.25, md: 0 }, // near edge on mobile
            pb: { xs: 0.5, md: 0 },
            py: { xs: 2.5, md: 5 },

            "& > *": {
              scrollSnapAlign: { xs: "center", md: "none" },
              flex: { xs: "0 0 94%", md: "unset" }, // card width ~ full screen on mobile
              maxWidth: { xs: "94%", md: "unset" },
              display: { xs: "flex", md: "block" },
              alignItems: { xs: "stretch", md: "initial" },
            },

            gridTemplateColumns: { md: "repeat(4, 1fr)" },

            // hide scrollbar
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <RingGlow />
              <Stack spacing={2} sx={{ position: "relative", zIndex: 1, height: "100%" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={t.avatar}
                    alt={t.name}
                    sx={{
                      width: 48,
                      height: 48,
                      fontWeight: 600,
                      bgcolor: alpha(theme.palette.primary.main, 0.18),
                    }}
                  >
                    {getInitials(t.name)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {t.name}
                    </Typography>
                    {/* <Typography variant="body2" sx={{ opacity: 0.7, mt: -0.25 }}>
                      {t.role}
                    </Typography> */}
                  </Box>
                </Stack>

                <Rating
                  value={t.rating ?? 5}
                  precision={0.5}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color:
                        theme.palette.mode === "dark"
                          ? alpha("#fff", 0.9)
                          : theme.palette.primary.main,
                    },
                  }}
                />

                {/* Clamp quote to keep heights equal */}
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    opacity: 0.95,
                    overflowY: "auto",
                    flex: 1,
                    pr: 1,
                    "&::-webkit-scrollbar": {
                      width: "4px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: alpha("#fff", 0.2),
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: alpha("#fff", 0.4),
                    },
                  }}
                >
                  “{t.quote}”
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>

        {/* Mobile dots only (arrows removed) */}
        {isMobile && (
          <Box role="tablist" aria-label="Testimonial slides" sx={{ mt: 2, textAlign: "center" }}>
            {testimonials.map((_, i) => (
              <IconButton
                key={i}
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  m: 0.5,
                  p: 0,
                  background:
                    i === index
                      ? alpha(theme.palette.primary.main, 0.9)
                      : alpha(theme.palette.primary.main, 0.35),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.65),
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Container>
    </Section>
  );
}

/* ------------------------------- Utilities ------------------------------- */
function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
