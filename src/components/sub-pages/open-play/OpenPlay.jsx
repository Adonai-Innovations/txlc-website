import React from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import SEOHead from "../../seo/SEOHead";
import CTA from "../../key-components/CTA";
import EventsFAQ from "../events/EventsFAQ";
import { DAY_PRODUCTS, PRODUCTS, openCheckout } from "../../../lib/roller";
import {
  FAQ,
  HOURS_LINES,
  OPEN_PLAY_ONLINE_CAP,
  PHONE_AVAILABILITY_SUFFIX,
  PHONE_DISPLAY,
  PHONE_TEL,
  toSchemaQuestion,
} from "../../../lib/site-facts";

/**
 * Open Play page (ADO-427).
 *
 * /open-play was a 404 even though the ROLLER catalogue has had Open Play
 * products for months and the route is handed out in person and on socials.
 * This gives those sessions a landing page with hours, the rules a walk-in
 * guest needs before they arrive, and a booking button per day group.
 */

const ACCENT = "#f2c230";

const Hero = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "52vh",
  display: "grid",
  placeItems: "center",
  color: "#fff",
  overflow: "hidden",
  isolation: "isolate",
  backgroundImage: "url(/experience/atmosphere.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  paddingBlock: theme.spacing(10),
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.75))",
    zIndex: 0,
  },
}));

const Headline = styled(Typography)(() => ({
  fontWeight: 900,
  lineHeight: 1.05,
  letterSpacing: "0.01em",
  textShadow: "0 2px 24px rgba(0,0,0,.55)",
}));

const Panel = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha("#fff", 0.03)})`,
  border: `1px solid ${alpha("#fff", 0.12)}`,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  borderRadius: 18,
  padding: theme.spacing(3.5),
  color: alpha("#fff", 0.92),
  boxShadow: `0 24px 80px ${alpha("#000", 0.45)}`,
  height: "100%",
}));

const PanelTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 20,
  marginBottom: theme.spacing(1.75),
}));

const BookBtn = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 800,
  fontFamily: "Podkova",
  borderRadius: 999,
  paddingInline: 22,
  paddingBlock: 10,
  background: ACCENT,
  color: "#101113",
  boxShadow: `0 10px 26px ${alpha(ACCENT, 0.35)}`,
  "&:hover": { background: "#ffd24a" },
}));

const OutlineBtn = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 800,
  fontFamily: "Podkova",
  borderRadius: 999,
  paddingInline: 22,
  paddingBlock: 10,
  color: "#fff",
  borderColor: alpha("#fff", 0.6),
  "&:hover": { borderColor: "#fff", background: alpha("#fff", 0.06) },
}));

const Rules = styled("ul")(({ theme }) => ({
  margin: 0,
  paddingLeft: theme.spacing(2.5),
  lineHeight: 1.85,
  color: alpha("#fff", 0.88),
  "& li + li": { marginTop: theme.spacing(0.75) },
}));

const Cards = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  [theme.breakpoints.down("md")]: { gridTemplateColumns: "1fr" },
}));

/** What each Open Play product covers, in guest-facing terms. */
const SESSION_BLURBS = {
  wed: "Midweek drop-in session. Good for a quieter arena and shorter waits.",
  thufri: "Thursday and Friday evening sessions once the arena opens at 4pm.",
  satsun: "Our busiest sessions — weekend slots fill first, so book ahead.",
};

const openPlaySchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/open-play#webpage",
    url: "https://txlasercombat.com/open-play",
    name: "Open Play Laser Tag | Walk-In Sessions – Texas Laser Combat Plano, TX",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://txlasercombat.com" },
        { "@type": "ListItem", position: 2, name: "Open Play", item: "https://txlasercombat.com/open-play" },
      ],
    },
    isPartOf: { "@id": "https://txlasercombat.com/#business" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Open Play Laser Tag Sessions",
    provider: { "@id": "https://txlasercombat.com/#business" },
    serviceType: "Laser Tag Open Play",
    description:
      "Individually ticketed open play laser tag sessions at Texas Laser Combat in Plano, TX. No group booking required — reserve a single seat or a squad four-pack.",
    url: "https://txlasercombat.com/open-play",
    areaServed: { "@type": "City", name: "Plano, TX" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      toSchemaQuestion(FAQ.age),
      toSchemaQuestion(FAQ.whatToWear),
      toSchemaQuestion(FAQ.sessionLength),
      toSchemaQuestion(FAQ.payment),
    ],
  },
];

export default function OpenPlayPage() {
  return (
    <>
      <SEOHead
        title="Open Play Laser Tag | Walk-In Sessions in Plano, TX"
        description="Book an open play laser tag session at Texas Laser Combat in Plano, TX. Individual seats and squad four-packs, Wednesday through Sunday. Ages 7+ or 46 inches tall; closed-toe, closed-heel shoes required."
        canonical="/open-play"
        schema={openPlaySchema}
      />
      <main>
        <Hero component="section">
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            <Stack
              spacing={2.5}
              alignItems="center"
              textAlign="center"
              component={motion.div}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Headline component="h1" variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.4rem" } }}>
                OPEN PLAY
              </Headline>
              <Typography sx={{ maxWidth: 680, fontSize: { xs: 16, md: 18 }, lineHeight: 1.7, opacity: 0.95 }}>
                No group to organise and no minimum to hit. Book a single seat in
                a shared arena session, or grab a squad four-pack and bring your
                own team.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <BookBtn
                  onClick={() =>
                    openCheckout(
                      DAY_PRODUCTS.openPlay[2].id,
                      DAY_PRODUCTS.openPlay[2].campaign
                    )
                  }
                >
                  Book this weekend
                </BookBtn>
                <OutlineBtn
                  variant="outlined"
                  onClick={() => openCheckout(PRODUCTS.squad4.id, PRODUCTS.squad4.campaign)}
                >
                  Squad 4-Pack
                </OutlineBtn>
              </Stack>
            </Stack>
          </Container>
        </Hero>

        {/* Sessions by day */}
        <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
          <Container maxWidth="xl">
            <Typography
              component="h2"
              variant="h4"
              sx={{ fontWeight: 800, color: "#fff", mb: 1 }}
            >
              Book an open play session
            </Typography>
            <Typography sx={{ color: alpha("#fff", 0.75), mb: 4, maxWidth: 720 }}>
              Sessions are ticketed per day group. Pick the one that matches your
              visit and you will land on the right booking page.
            </Typography>

            <Cards>
              {DAY_PRODUCTS.openPlay.map((day) => (
                <Panel key={day.key} elevation={0}>
                  <Stack sx={{ height: "100%" }} spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <PanelTitle>{day.label}</PanelTitle>
                      <Typography sx={{ color: alpha("#fff", 0.85), lineHeight: 1.7 }}>
                        {SESSION_BLURBS[day.key]}
                      </Typography>
                    </Box>
                    <BookBtn onClick={() => openCheckout(day.id, day.campaign)}>
                      Book {day.label}
                    </BookBtn>
                  </Stack>
                </Panel>
              ))}
            </Cards>

            <Panel elevation={0} sx={{ mt: 3 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2.5}
                alignItems={{ xs: "stretch", md: "center" }}
              >
                <Box sx={{ flex: 1 }}>
                  <PanelTitle sx={{ mb: 0.75 }}>Squad 4-Pack</PanelTitle>
                  <Typography sx={{ color: alpha("#fff", 0.85), lineHeight: 1.7 }}>
                    Four open play seats in one booking — the easiest way to bring
                    a group without organising a private event.
                  </Typography>
                </Box>
                <BookBtn
                  onClick={() => openCheckout(PRODUCTS.squad4.id, PRODUCTS.squad4.campaign)}
                  sx={{ alignSelf: { xs: "stretch", md: "center" } }}
                >
                  Book Squad 4-Pack
                </BookBtn>
              </Stack>
            </Panel>
          </Container>
        </Box>

        {/* Hours + rules */}
        <Box component="section" sx={{ pb: { xs: 6, md: 10 } }}>
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
              }}
            >
              <Panel elevation={0}>
                <PanelTitle>Hours</PanelTitle>
                <Stack spacing={0.5}>
                  {HOURS_LINES.map((line) => (
                    <Typography key={line} sx={{ lineHeight: 1.7, opacity: 0.95 }}>
                      {line}
                    </Typography>
                  ))}
                </Stack>
                <Typography sx={{ mt: 2, color: alpha("#fff", 0.75), lineHeight: 1.7 }}>
                  Closed Monday and Tuesday. Call us at{" "}
                  <Box
                    component="a"
                    href={`tel:${PHONE_TEL}`}
                    sx={{ color: ACCENT, fontWeight: 700, textDecoration: "none" }}
                  >
                    {PHONE_DISPLAY}
                  </Box>{" "}
                  {PHONE_AVAILABILITY_SUFFIX}
                </Typography>
              </Panel>

              <Panel elevation={0}>
                <PanelTitle>Before you arrive</PanelTitle>
                <Rules>
                  <li>{FAQ.age.a}</li>
                  <li>{FAQ.whatToWear.a}</li>
                  <li>
                    Sessions run 75 minutes, including roughly 15 minutes of
                    safety briefing and gearing up.
                  </li>
                  <li>
                    Arrive 10–15 minutes early so check-in does not eat into your
                    play time.
                  </li>
                  <li>
                    Every player needs a signed waiver. Players under 18 need a
                    parent or guardian to sign.
                  </li>
                  <li>
                    Open play books up to {OPEN_PLAY_ONLINE_CAP} players per
                    session online.
                  </li>
                </Rules>
              </Panel>
            </Box>
          </Container>
        </Box>

        <CTA
          title="Drop in and play"
          backgroundImage="/experience/atmosphere2.JPG"
        />
        <EventsFAQ
          title="Open play questions"
          subtitle="The things walk-in players ask most."
          items={[FAQ.age, FAQ.whatToWear, FAQ.sessionLength, FAQ.groupSize, FAQ.payment, FAQ.cancellation]}
        />
      </main>
    </>
  );
}
