import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import ApplyForm from "../forms/Apply";

const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

const Section = styled(Box)(({ theme }) => ({
  background: "transparent",
  color: alpha("#fff", 0.92),
  paddingBlock: theme.spacing(10, 14),
}));

const Media = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "16 / 6.5",
  borderRadius: 14,
  overflow: "hidden",
  background: "#9b9b9b",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  boxShadow: `0 24px 60px ${alpha("#000", 0.55)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
}));

const CTA = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 800,
  padding: "10px 24px",
  background: ACCENT,
  color: "#101113",
  fontFamily: "Podkova",
  boxShadow: `0 12px 32px ${ACCENT}55`,
  transition: "all .25s ease",
  "&:hover": { background: ACCENT_HOVER, boxShadow: `0 16px 40px ${ACCENT}66`, transform: "translateY(-1px)" },
}));

export default function Apply({
  title = "Join our team!",
  description = `Our tactical laser tag arena in Plano is open and growing, and we're looking for energetic, customer-focused team members to create unforgettable experiences for our guests.`,
  imageSrc = "/landing/team.jpg",
  imageAlt = "Hiring banner",
  onApply,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (data) => { await onApply?.(data); };

  return (
    <Section>
      <Container maxWidth="xl">
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          variant="h3"
          align="center"
          sx={{ fontWeight: 900, mb: 4, letterSpacing: { md: "0.01em" } }}
        >
          {title}
        </Typography>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
          <Media>
            {imageSrc ? (
              <Box component="img" alt={imageAlt} src={imageSrc} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Box sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center", color: "#222", fontSize: 15, letterSpacing: 0.2 }}>
                [Image placeholder]
              </Box>
            )}
          </Media>
        </motion.div>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ textAlign: "center", mt: 4 }}
        >
          <Typography sx={{ maxWidth: 980, mx: "auto", opacity: 0.9, fontSize: { xs: 16, md: 18 }, lineHeight: 1.7, mb: 3 }}>
            {description}
          </Typography>
          <CTA onClick={handleOpen}>Apply now</CTA>
        </Box>
      </Container>

      <ApplyForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        roles={["Entry Ops Specialist", "Squad Instructor", "Entry Ops Director", "Sales Director", "Squad Operations Director"]}
        jobDescriptionsHref="/jobs/descriptions"
      />
    </Section>
  );
}
