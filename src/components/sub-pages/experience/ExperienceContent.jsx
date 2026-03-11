import React from "react";
import { Box, Container, Grid, Paper, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "transparent",
  color: alpha("#fff", 0.9),
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(10),
  overflow: "hidden",
}));

const Shell = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.xl,
  marginInline: "auto",
  paddingInline: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { paddingInline: theme.spacing(3) },
  [theme.breakpoints.up("md")]: { paddingInline: theme.spacing(4) },
}));

const ImgCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "clamp(260px, 42vw, 520px)",
  borderRadius: { xs: 2, md: 14 },
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
  border: `1px solid ${alpha("#fff", 0.1)}`,
  boxShadow: `0 24px 48px ${alpha("#000", 0.55)}`,
  overflow: "hidden",
}));

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
});

const H3 = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: 0.2,
  marginBottom: theme.spacing(1.5),
}));

const Body = styled(Typography)(({ theme }) => ({
  fontSize: { xs: 14.5, sm: 15.5, md: 16 },
  lineHeight: 1.8,
  color: alpha("#fff", 0.88),
}));

const Cta = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  marginTop: theme.spacing(2.5),
  textTransform: "none",
  fontWeight: 700,
  borderRadius: { xs: 2, md: 14 },
  paddingInline: theme.spacing(2.5),
  paddingBlock: theme.spacing(1.1),
  background: "#e0ad22",
  color: "#1a1a1a",
  fontFamily: "Podkova",
  "&:hover": { background: "#c89a1e" },
}));

function Row({ children, sx = {} }) {
  return (
    <Grid
      container
      alignItems="center"
      columnSpacing={{ xs: 2, md: 6 }}
      rowSpacing={{ xs: 4, md: 6 }}
      sx={{
        mb: { xs: 6, md: 10 },
        flexDirection: { xs: "column", md: "row" },
        flexWrap: { xs: "wrap", md: "nowrap" },
        ...sx,
      }}
    >
      {children}
    </Grid>
  );
}

function TextBlock({ title, body, withCta }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { lg: 620 },
        mx: { xs: "auto", md: 0 },
      }}
    >
      <H3 variant="h3">{title}</H3>
      <Body>{body}</Body>
      {withCta ? (
        <Cta
          variant="contained"
          onClick={() => navigate("/events")}
        >
          Explore party menu packages
        </Cta>
      ) : null}
    </Box>
  );
}

export default function AmenitiesStaggered() {
  return (
    <Section>
      <Container maxWidth={false} disableGutters>
        <Shell>
          {/* Reusable banner */}
          {/* <FeatureBanner
            src="/experience.png"
            alt="Texas Laser Combat arena overview"
            sx={{ mb: (theme) => theme.spacing(8) }}
          /> */}


          <Row sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
            <Grid item xs={12} sm={6} sx={{ minWidth: 0, flexBasis: { sm: "50%" }, maxWidth: { sm: "50%" } }}>
              <TextBlock
                title="Refuel between battles"
                body="Need a quick refuel? We’ve got you covered. Grab non-alcoholic drinks and snacks from our convenient vending machines or choose from one of our catering partners for delicious options to keep your party energized. Looking for more customization? Bring your own favorites, as outside food and beverages are welcome in designated areas."
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ minWidth: 0, flexBasis: { sm: "50%" }, maxWidth: { sm: "50%" } }}>
              <ImgCard elevation={0}><Img src="/experience/refuel.jpg" alt="Concession snacks and drinks area" /></ImgCard>
            </Grid>
          </Row>

          <Row>
            <Grid item xs={12} sm={6} sx={{ minWidth: 0, flexBasis: { sm: "50%" }, maxWidth: { sm: "50%" } }}>
              <ImgCard elevation={0}><Img src="/experience/comfort.jpg" alt="Lounge seating area" /></ImgCard>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ minWidth: 0, flexBasis: { sm: "50%" }, maxWidth: { sm: "50%" } }}>
              <TextBlock
                title="Comfort and amenities"
                body="Our center is tuned for comfort—spacious party rooms, gathering nooks, staging areas, and staff support for smooth events. Whether you’re hosting a birthday, team outing, or VIP party, every detail receives attentive care."
                withCta
              />
            </Grid>
          </Row>

          <Row sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}>
            <Grid item xs={12} sm={6} sx={{ minWidth: 0, flexBasis: { sm: "50%" }, maxWidth: { sm: "50%" } }}>
              <TextBlock
                title="The atmosphere"
                body="Step into a wasteland-style arena with themed set pieces, ambient sound, and dramatic lighting that elevate every mission. It’s not just laser tag—it’s an immersive chapter in an ongoing campaign."
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ minWidth: 0, flexBasis: { sm: "50%" }, maxWidth: { sm: "50%" } }}>
              <ImgCard elevation={0}><Img src="/experience/atmosphere.jpg" alt="Arena set pieces and lighting" /></ImgCard>
            </Grid>
          </Row>
        </Shell>
      </Container>
    </Section>
  );
}
