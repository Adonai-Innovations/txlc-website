import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { Link as RouterLink } from "react-router-dom";

const BG = `transparent`;
const FG = alpha("#fff", 0.88);
const MUTED = alpha("#fff", 0.72);
const LINE = "rgba(255,255,255,0.10)";
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

const Section = styled(Box)(({ theme }) => ({
  background: BG,
  color: FG,
  paddingBlock: theme.spacing(8),
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(6),
  alignItems: "start",
  gridTemplateColumns: "repeat(2, 1fr)",
  justifyItems: "center",
  textAlign: "center",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
    justifyItems: "stretch",
    textAlign: "left",
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.6fr 1fr 1fr 1.4fr",
  },
}));

const FullSpanOnMobile = styled(Box)(({ theme }) => ({
  gridColumn: "1 / -1",
  [theme.breakpoints.up("sm")]: { gridColumn: "auto" },
}));

const ColTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 18,
  marginBottom: theme.spacing(2.5),
  textAlign: "inherit",
}));

const FooterLink = styled(MuiLink)(({ theme }) => ({
  display: "inline-block",
  color: FG,
  opacity: 0.9,
  textDecoration: "none",
  paddingBlock: 6,
  "&:hover": { opacity: 1, textDecoration: "underline" },
}));

const EmailField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiInputBase-root": { color: FG },
  "& .MuiInput-underline:before": { borderBottomColor: LINE },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: alpha("#fff", 0.3),
  },
  "& .MuiInput-underline:after": { borderBottomColor: ACCENT },
  "& .MuiInputAdornment-root": { color: MUTED },
}));

const SubmitBtn = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: "none",
  fontWeight: 800,
  padding: "10px 18px",
  background: ACCENT,
  fontFamily: "Podkova",
  color: "#101113",
  boxShadow: `0 8px 22px ${ACCENT}55`,
  "&:hover": { background: ACCENT_HOVER, boxShadow: `0 12px 28px ${ACCENT}66` },
}));

export default function Footer({ logoSrc = "/alt-logo.png" }) {
  const [email, setEmail] = React.useState("");

  const sitemap = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Events", to: "/events" },
    { label: "Experience", to: "/experience" },
    { label: "Waiver", href: "https://waiver.roller.app/TexasLaserCombat" },
  ];

  return (
    <Section component="footer">
      <Container maxWidth="xl">
        <GridWrap>
          <FullSpanOnMobile>
            <Box
              component="img"
              src={logoSrc}
              alt="TX Laser Combat"
              sx={{
                width: 180,
                height: "auto",
                display: "block",
                mb: 2,
                mx: { xs: "auto", sm: 0 },
              }}
            />
          </FullSpanOnMobile>

          <Box>
            <ColTitle>Sitemap</ColTitle>
            <Stack spacing={0} alignItems={{ xs: "center", sm: "flex-start" }}>
              {sitemap.map((item) => (
                <FooterLink
                  key={item.label}
                  component={item.to ? RouterLink : "a"}
                  to={item.to}
                  href={item.href}
                  target={item.href ? "_blank" : undefined}
                  rel={item.href ? "noopener noreferrer" : undefined}
                >
                  {item.label}
                </FooterLink>
              ))}
            </Stack>
          </Box>

          <Box>
            <ColTitle>Socials</ColTitle>
            <Stack spacing={0} alignItems={{ xs: "center", sm: "flex-start" }}>
              <FooterLink href="https://www.facebook.com/people/TX-Laser-Combat/61585110921158/">Facebook</FooterLink>
              {/* <FooterLink href="https://linkedin.com">LinkedIn</FooterLink> */}
              <FooterLink href="https://www.instagram.com/txlasercombat">Instagram</FooterLink>
              {/* <FooterLink href="https://youtube.com">YouTube</FooterLink> */}
              {/* <FooterLink href="https://x.com">X</FooterLink> */}
            </Stack>
          </Box>

          <FullSpanOnMobile>
            <ColTitle>Address</ColTitle>
            <Typography sx={{ color: MUTED, mb: 3 }}>
              2300 Coit Road (off Irvine Drive) #400, Plano, TX 75075
            </Typography>

            <ColTitle sx={{ mb: 1.5 }}>Stay up to date</ColTitle>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1.5, sm: 2 }}
              alignItems={{ xs: "stretch", sm: "center" }}
              justifyContent={{ xs: "stretch", sm: "flex-start" }}
              sx={{ width: "100%" }}
            >
              <EmailField
                variant="standard"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                sx={{
                  maxWidth: { xs: "none", sm: 520 },
                }}
              />
              <SubmitBtn
                onClick={() => setEmail("")}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                Submit
              </SubmitBtn>
            </Stack>

            <Box sx={{ height: 1, background: LINE, mt: 2.5 }} />
          </FullSpanOnMobile>
        </GridWrap>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: `1px solid ${LINE}`,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "space-between", md: "flex-start" },
            alignItems: { xs: "center", md: "center" },
            rowGap: 2,
            fontSize: 15,
            color: MUTED,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {/* Left cluster: socials (icons) */}
          <Stack direction="row" spacing={2}>
            <MuiLink href="https://facebook.com" color={MUTED}>
              <FacebookIcon fontSize="small" />
            </MuiLink>
            {/* <MuiLink href="https://linkedin.com" color={MUTED}>
              <LinkedInIcon fontSize="small" />
            </MuiLink>
            <MuiLink href="https://x.com" color={MUTED}>
              <XIcon fontSize="small" />
            </MuiLink> */}
            <MuiLink href="https://facebook.com" color={MUTED}>
              <InstagramIcon fontSize="small" />
            </MuiLink>
          </Stack>

          {/* Middle cluster: email + phone + policies */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1.25, md: 3 }}
            alignItems={{ xs: "center", md: "center" }}
            justifyContent={{ xs: "center", md: "flex-end" }}
            sx={{
              width: { xs: "100%", md: "auto" },
              ml: { md: "auto" }, // ⬅️ pushes this cluster to the right edge
              "& a": {
                fontSize: { xs: 16, md: 14 }, // larger font on mobile
                lineHeight: 1.65,
              },
            }}
          >
            <MuiLink
              href="mailto:contact@txlasercombat.com"
              underline="hover"
              color={MUTED}
            >
              ops@txlasercombat.com
            </MuiLink>
            <MuiLink href="tel:+14696388499" underline="hover" color={MUTED}>
              (469) 638-8499
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/privacy"
              underline="hover"
              color={MUTED}
            >
              Privacy policy
            </MuiLink>
            <MuiLink
              href="https://waiver.roller.app/TexasLaserCombat"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color={MUTED}
            >
              Waiver
            </MuiLink>
            <MuiLink
              sx={{
                color: MUTED,
                pointerEvents: "none",
                textDecoration: "none",
                "&:hover": { textDecoration: "none", color: MUTED },
              }}
            >
              © {new Date().getFullYear()} TX Laser Combat
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Section>
  );
}
