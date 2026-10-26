// src/components/key-components/PosterSection.jsx
import React from "react";
import { Box, Container, Dialog, IconButton, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/**
 * A single client-supplied poster shown at its natural aspect ratio (ADO-437).
 *
 * The package comparison table, the weapons matrix and the arena field map are
 * all dense artwork that has to stay legible, so they are never cropped and can
 * be opened full-screen — at section width the smallest type in the comparison
 * table is otherwise borderline on a laptop.
 */

const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBlock: theme.spacing(6),
  color: alpha("#fff", 0.92),
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  textTransform: "uppercase",
  textAlign: "center",
  fontFamily: "PostNoBillsJaffna, sans-serif",
  letterSpacing: "0.04em",
  fontSize: "clamp(30px, 5vw, 56px)",
  lineHeight: 1.1,
  marginBottom: theme.spacing(1),
}));

const Subheading = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  opacity: 0.8,
  marginBottom: theme.spacing(3),
}));

const Frame = styled(Box)(() => ({
  borderRadius: 16,
  overflow: "hidden",
  border: `1px solid ${alpha("#fff", 0.1)}`,
  boxShadow: `0 28px 64px ${alpha("#000", 0.55)}`,
  cursor: "zoom-in",
  lineHeight: 0,
}));

export default function PosterSection({
  heading,
  subheading,
  src,
  alt,
  /** Light artwork (e.g. the line-drawn field map) needs a pale backdrop. */
  background = "#0e0f11",
  maxWidth = "lg",
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Section>
      <Container maxWidth={maxWidth}>
        {heading ? <Heading variant="h2">{heading}</Heading> : null}
        {subheading ? <Subheading>{subheading}</Subheading> : null}

        <Frame
          onClick={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setOpen(true);
          }}
          role="button"
          tabIndex={0}
          aria-label={`Enlarge ${alt}`}
          sx={{ background }}
        >
          <Box
            component="img"
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            sx={{ width: "100%", height: "auto", display: "block" }}
          />
        </Frame>
      </Container>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xl"
        fullWidth
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(8px)",
              backgroundColor: "rgba(0,0,0,0.75)",
            },
          },
          paper: { sx: { bgcolor: "transparent", boxShadow: "none" } },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          aria-label="Close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        <Box
          component="img"
          src={src}
          alt={alt}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "92vh",
            objectFit: "contain",
            borderRadius: 2,
            background,
          }}
        />
      </Dialog>
    </Section>
  );
}
