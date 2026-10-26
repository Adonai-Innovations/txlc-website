import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { motion } from "framer-motion";
import { FAQ } from "../../../lib/site-facts";
import DonationRequest from "../../forms/DonationRequest";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "transparent",
  color: "#fff",
  overflow: "hidden",
  paddingBlock: theme.spacing(10),
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: 0.2,
  background: "linear-gradient(180deg, #ffffff, #b9c3cf)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
}));

const Sub = styled(Typography)(({ theme }) => ({
  opacity: 0.8,
  maxWidth: 780,
  marginInline: "auto",
}));

const Shell = styled(Box)(({ theme }) => ({
  "--glass": alpha("#fff", 0.06),
  "--stroke": alpha("#fff", 0.12),
  borderRadius: 18,
  border: `1px solid var(--stroke)`,
  background: alpha("#fff", 0.05),
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: `0 24px 80px ${alpha("#000", 0.45)}`,
}));

const Row = styled(Accordion)(({ theme }) => ({
  background: "transparent",
  borderRadius: 14,
  boxShadow: "none",
  border: `1px solid ${alpha("#fff", 0.08)}`,
  margin: theme.spacing(1, 0),
  "&::before": { display: "none" },
  "& .MuiAccordionSummary-root": {
    padding: theme.spacing(1.25, 2),
    minHeight: 64,
  },
  "& .MuiAccordionDetails-root": {
    padding: theme.spacing(2.25),
    borderTop: `1px solid ${alpha("#fff", 0.06)}`,
    lineHeight: 1.8,
    color: alpha("#fff", 0.86),
  },
}));

export default function AboutFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Quick answers to common questions.",
  items = [
    FAQ.cancellation,
    FAQ.sessionLength,
    FAQ.age,
    FAQ.parentArea,
    FAQ.whatToWear,
    {
      q: "What are the waivers, and who needs to complete them?",
      a: "Waivers outline the risks associated with laser tag and must be signed for each player before participating. Parents or guardians are required to sign waivers for all players under 18 years of age. Waivers should be completed in advance online for faster check-in and are valid for 1 year."
    },
    {
      q: "Is laser combat safe for players' eyes?",
      a: "Yes, our laser tag equipment uses infrared technology (the same as a TV remote), not real lasers, making it completely safe for players' eyes."
    },
    {
      q: "Does Texas Laser Combat accept walk-in players?",
      a: "Yes, walk-in players are welcome to join sessions if there is availability. We recommend checking the calendar on our website or calling ahead to confirm space."
    },
    {
      q: "Does Texas Laser Combat accept cash or checks for payment?",
      a: "No, we do not accept checks unless authorized by management under extenuating circumstances. Preferred payment methods include credit/debit cards and electronic payments including Apple and Google Pay."
    },
    {
      q: "Why might Texas Laser Combat be closed on a day they are normally open?",
      a: "The facility may close due to extreme weather conditions to ensure the safety of staff and customers, or if the entire arena is reserved for a private event."
    },
    {
      q: "How can I check availability for an event or individual play?",
      a: "Visit our website and click on the booking tab to check availability for events or individual play sessions. You can also contact our Entry Ops team for assistance."
    },
    {
      q: "Do gift cards at Texas Laser Combat expire?",
      a: "No, our electronic gift cards do not expire unless otherwise specified in the email accompanying the gift card."
    },
    {
      q: "Does Texas Laser Combat accept donation requests?",
      a: "Yes, we accept donation requests. Complete the donation request form below and we will respond within 1-2 weeks.",
      // ADO-427: this answer promised a form that did not exist anywhere on the
      // site. The action renders the request form inline, right where the
      // promise is made.
      action: "donation",
    },
  ],
}) {
  const [active, setActive] = useState(-1);
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <Section>
      <Container maxWidth="lg" sx={{ textAlign: "center", mb: 5, pt: 10 }}>
        <Stack spacing={1.5} alignItems="center">
          <Headline variant="h3" sx={{ fontSize: { xs: 32, md: "3rem" } }}>
            {title}
          </Headline>
          <Sub variant="body1">{subtitle}</Sub>
        </Stack>
      </Container>

      <Container maxWidth="xl">
        <Shell
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Box sx={{ p: { xs: 1.25, md: 2 } }}>
            {items.map((item, i) => (
              <Row
                key={i}
                expanded={active === i}
                onChange={(_, ex) => setActive(ex ? i : -1)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon sx={{ color: "#fff" }} />}
                >
                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    sx={{ width: "100%", pr: 1 }}
                  >
                    <Typography sx={{ fontWeight: 700, flex: 1, color: "#fff" }}>
                      {item.q}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.a}</Typography>
                  {item.action === "donation" && (
                    <Button
                      onClick={() => setDonationOpen(true)}
                      sx={{
                        mt: 2,
                        borderRadius: 999,
                        textTransform: "none",
                        fontWeight: 800,
                        fontFamily: "Podkova",
                        px: 2.5,
                        background: "#f2c230",
                        color: "#101113",
                        "&:hover": { background: "#ffd95a" },
                      }}
                    >
                      Open donation request form
                    </Button>
                  )}
                </AccordionDetails>
              </Row>
            ))}
          </Box>
        </Shell>
      </Container>

      <DonationRequest
        open={donationOpen}
        onClose={() => setDonationOpen(false)}
      />
    </Section>
  );
}
