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
import { openProducts } from "../../lib/roller";
import {
  ADDRESS_LINE,
  HOURS_LINES,
  PHONE_AVAILABILITY_SUFFIX,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "../../lib/site-facts";

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

/* Fall schedule — single group, effective Aug 1. See lib/site-facts.js. */
export const DEFAULT_HOUR_GROUPS = [{ title: "Hours", hours: HOURS_LINES }];

/* ---------------------------- Component ---------------------------- */
export default function CTA({
  title = "Join the laser experience today!",
  // Legacy flat-array prop — kept for backward compat; takes precedence over
  // hourGroups when explicitly passed so existing callers never break.
  hours,
  hourGroups = DEFAULT_HOUR_GROUPS,
  address = ADDRESS_LINE,
  backgroundImage = "/events/corporate-events/join.webp",
  primaryCta = { label: "Book Now" },
  secondaryCta = {
    label: "Get Directions",
    href: "https://maps.google.com/?q=2300+Coit+Road+%23400,+Plano,+TX+75075",
  },
  dense = false,
  onBookNowClick,
}) {
  const theme = useTheme();

  // Resolve to the titled-group format used by the renderer.
  const resolvedGroups =
    hours !== undefined ? [{ title: "Hours", hours }] : hourGroups;

  const handleBookNow = (e) => {
    e?.preventDefault?.();
    if (onBookNowClick) onBookNowClick();
    else openProducts();
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
              component="h2"
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
              <Stack spacing={2}>
                {resolvedGroups.map((group, gi) => (
                  <React.Fragment key={gi}>
                    {gi > 0 && (
                      <Box
                        sx={{
                          height: "1px",
                          background: alpha("#fff", 0.15),
                        }}
                      />
                    )}
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, letterSpacing: 0.2, mb: 0.75 }}
                      >
                        {group.title}
                      </Typography>
                      <Stack spacing={0.5}>
                        {group.hours.map((line, i) => (
                          <Typography
                            key={i}
                            variant="body1"
                            sx={{ lineHeight: 1.6, opacity: 0.95 }}
                          >
                            {line}
                          </Typography>
                        ))}
                      </Stack>
                    </Box>
                  </React.Fragment>
                ))}

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

                <Typography variant="body2" sx={{ lineHeight: 1.6, opacity: 0.9 }}>
                  Call us at{" "}
                  <Box
                    component="a"
                    href={`tel:${PHONE_TEL}`}
                    sx={{ color: "inherit", fontWeight: 700 }}
                  >
                    {PHONE_DISPLAY}
                  </Box>{" "}
                  {PHONE_AVAILABILITY_SUFFIX}
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

    </>
  );
}
