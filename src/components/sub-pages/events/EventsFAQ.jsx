import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { motion } from "framer-motion";
import { FAQ } from "../../../lib/site-facts";

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
  background: `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha(
    "#fff",
    0.03
  )})`,
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

export default function EventsFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Quick answers to common questions.",
  items = [
    FAQ.cancellation,
    FAQ.sessionLength,
    FAQ.age,
    FAQ.parentArea,
    FAQ.whatToWear,
    {
      q: "Can I consume alcohol at Texas Laser Combat?",
      a: "Alcohol consumption is permitted only in a reserved private room with a pre-arranged drink agreement. No alcohol is allowed in the arena or public areas."
    },
    {
      q: "How many people does one large (14\") pizza serve at a party?",
      a: "Each pizza has approximately 10 slices. Assuming 2 slices per person, one pizza serves about 5 people. Pizza orders should be placed in advance to ensure timely delivery. We do have a pizza warmer that can hold pizzas up to 16\" in size."
    },
    {
      q: "Do party room bookings include a dedicated party host?",
      a: "No, a dedicated party host is not provided. However, our Entry Ops Specialists are available to assist as needed during your party."
    },
    {
      q: "How is a party at Texas Laser Combat structured?",
      a: "Our staff will check in players, followed by a 1-hour laser tag session. After gameplay, players will proceed to their designated party room for food, drinks, and celebration."
    },
    {
      q: "Can I bring outside food like ice cream, cake, or cupcakes to a party?",
      a: "Yes, you may bring outside food and drinks in for private parties and events. Texas Laser Combat can also recommend catering options with partnered restaurants. Outside desserts such as ice cream, cake, or cupcakes are welcome. A fridge and freezer with limited availability is on-site for private parties & events to store these items during your event. Please inform us ahead of time to ensure space is available."
    },
    {
      q: "What supplies are included in the party packages?",
      a: "Cake plates, plastic silverware, disposable cake knife, table cloths, magnetic strip/magnets to hang banners/signs, and party favors are all included in party packages."
    },
    {
      q: "What happens if some of my party guests do not show up? Am I still charged for them?",
      a: "You must notify us of any changes in guest count at least 3 days before the event to adjust your package pricing. Otherwise, you will be charged for the reserved number of guests."
    },
    {
      q: "Can I add last-minute guests to my party?",
      a: "Yes, you may increase your headcount on the day of the event, provided there is availability and space in the arena and party room."
    },
    {
      q: "How early should I arrive for my session or party?",
      a: "Arrive 10-15 minutes before your scheduled start time to allow for check-in for smaller groups; 15-20 minutes for larger groups. Your party room will be available for setup at the scheduled start time, earlier arrival may conflict with other bookings."
    },
    {
      q: "Is gratuity included in party package pricing, or should I tip separately?",
      a: "Gratuity is not automatically included in the party package pricing. You may tip in person at your discretion."
    },
    {
      q: "What happens if there is inclement weather on the day of my event?",
      a: "In the rare event of extreme inclement weather, Texas Laser Combat may reschedule or cancel sessions to ensure players' and employees' safety. If your event is affected, we will contact you to discuss rescheduling options or provide credit for a future visit, per our cancellation policy."
    },
    {
      q: "Is there a designated place to store presents for a party?",
      a: "Yes, presents will be placed on a designated cart labeled with your party's name, which will be moved to your party room at the scheduled party time."
    },
    {
      q: "What happens if my party runs over the scheduled time in the party room?",
      a: "Party rooms are reserved for the allotted time in your package. If you wish to extend your time, it is subject to availability and may incur an additional fee. Please coordinate with an Entry Ops Specialist as soon as possible."
    },
    FAQ.groupSize,
    {
      q: "How long does a session last?",
      a: "Standard sessions are 75 minutes in the arena for safety briefing, arming, and play. Extended hours are available as add-ons."
    },
    FAQ.payment,
    {
      q: "Is the venue accessible for all players?",
      a: "Yes, the main level of our multi-level arena and facilities are designed for varying mobility with wide paths and versatile equipment available."
    },
    {
      q: "Is there Wi-Fi available?",
      a: "Yes, Wi-Fi is available throughout the lounge, lobby, and party rooms."
    },
  ],
}) {
  const [active, setActive] = useState(-1);

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
                </AccordionDetails>
              </Row>
            ))}
          </Box>
        </Shell>
      </Container>
    </Section>
  );
}
