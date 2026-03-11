import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Waitlist from "../forms/Waitlist";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme, bgimg }) => ({
  position: "relative",
  width: "100%",
  minHeight: "60vh",
  display: "grid",
  placeItems: "center",
  backgroundImage: bgimg ? `url(${bgimg})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  color: "#fff",
  overflow: "hidden",
  isolation: "isolate",
  // borderRadius: 40,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: "linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.6))",
    zIndex: 0,
  },

  [theme.breakpoints.down("sm")]: {
    minHeight: "85svh",
    paddingBlock: theme.spacing(6),
  },
}));

const Glass = styled(Box)(({ theme }) => ({
  background: alpha("#000", 0.28),
  border: `1px solid ${alpha("#fff", 0.18)}`,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderRadius: 16,
  padding: theme.spacing(3),
  width: "100%",
}));

/* ---------------------------- Component ---------------------------- */
export default function CTA({
  title = "Join the laser experience today!",
  hours = [
    "Wed–Thurs: 4pm – 10:30pm",
    "Fri: 4pm – 11:30pm",
    "Sat: 11am – 11:30pm",
    "Sun: 11am – 8pm",
  ],
  address = "2300 Coit Road (off Irvine Drive) #400, Plano, TX 75075",
  backgroundImage = "/cta.jpg",
  primaryCta = { label: "Join VIP Access List" },
  secondaryCta = {
    label: "Get Directions",
    href: "https://maps.google.com/?q=2300+Coit+Road+%23400,+Plano,+TX+75075",
  },
  dense = false,
  onBookNowClick,
}) {
  const theme = useTheme();

  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  const openWaitlist = () => setWaitlistOpen(true);
  const closeWaitlist = () => setWaitlistOpen(false);
  const submitWaitlist = async (data) => {
    console.log("CTA waitlist submission:", data);
    setWaitlistOpen(false);
  };

  const handleBookNow = (e) => {
    e?.preventDefault?.();
    if (onBookNowClick) onBookNowClick();
    else openWaitlist();
  };

  return (
    <>
      <Section bgimg={backgroundImage}>
        <Container
          maxWidth="md"
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3 } }}
        >
          <Stack spacing={2.5} alignItems="center" textAlign="center">
            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1.15,
                textShadow: "0 2px 20px rgba(0,0,0,.5)",
                fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.6rem" },
              }}
            >
              {title}
            </Typography>

            <Glass sx={{ maxWidth: 560 }}>
              <Stack spacing={1.25}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, letterSpacing: 0.2 }}
                >
                  Hours
                </Typography>
                <Stack spacing={0.5}>
                  {hours.map((line, i) => (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{ lineHeight: 1.6, opacity: 0.95 }}
                    >
                      {line}
                    </Typography>
                  ))}
                </Stack>

                <Typography
                  variant="body1"
                  sx={{
                    pt: 1,
                    fontWeight: 600,
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  {address}
                </Typography>
              </Stack>
            </Glass>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              sx={{ pt: dense ? 0.5 : 1 }}
            >
              {primaryCta && (
                <Button
                  onClick={handleBookNow}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 3,
                    borderRadius: 999,
                    boxShadow: "none",
                    textTransform: "none",
                    fontFamily: "Podkova",
                    background: "#f2c230",
                    color: "#000",
                    "&:hover": { background: "#ffd24a" },
                  }}
                >
                  {primaryCta.label}
                </Button>
              )}

              {secondaryCta && (
                <Button
                  component="a"
                  href={secondaryCta.href}
                  target={secondaryCta.href?.startsWith("/") ? "_self" : "_blank"}
                  rel="noreferrer"
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 3,
                    borderRadius: 999,
                    color: "#fff",
                    borderColor: alpha("#fff", 0.6),
                    textTransform: "none",
                    fontFamily: "Podkova",
                    "&:hover": {
                      borderColor: "#fff",
                      background: alpha("#fff", 0.06),
                    },
                  }}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </Stack>
          </Stack>
        </Container>
      </Section>

      {/* Embedded Waitlist (only used if onBookNowClick isn't provided) */}
      {!onBookNowClick && (
        <Waitlist open={waitlistOpen} onClose={closeWaitlist} onSubmit={submitWaitlist} />
      )}
    </>
  );
}
