import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  useTheme,
  Container,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";


const Panel = styled(Box)(({ theme }) => ({
  "--gutter": "min(8vw, 64px)",
  width: "100%",
  borderRadius: 30,
  overflow: "hidden",
  background: "linear-gradient(180deg, #2a2a2a 0%, #2b2b2b 100%)",
  color: alpha("#fff", 0.92),
  border: `1px solid ${alpha("#fff", 0.08)}`,
  boxShadow: `0 24px 80px ${alpha("#000", 0.45)}`,

  paddingInline: "var(--gutter)",
}));

const Track = styled(Box)(({ theme }) => ({
  width: "100%",
  marginInline: "auto",
  paddingTop: theme.spacing(10),
  paddingBottom: 0,
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(6),
  alignItems: "center",
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "380px 1fr",
    gap: theme.spacing(10),
  },
}));

const LogosStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(6),
  [theme.breakpoints.up("md")]: { alignItems: "flex-start" },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "220px",
  height: "auto",
  filter: "saturate(0.98)",
  userSelect: "none",
  pointerEvents: "none",
  [theme.breakpoints.down("sm")]: { width: "180px" },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Podkova',
  fontWeight: 800,
  letterSpacing: 0.2,
  color: alpha("#fff", 0.96),
  textShadow: `0 1px 0 ${alpha("#000", 0.35)}`,
}));

const Copy = styled(Typography)(({ theme }) => ({
  lineHeight: 1.8,
  fontSize: 18,
  color: alpha("#fff", 0.88),
  textAlign: "center", // ⬅️ center on mobile
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));

const PledgeBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),

  marginInline: "calc(-1 * var(--gutter))",
  width: "calc(100% + (2 * var(--gutter)))",

  background: "#f2c230",
  color: "#151515",
  borderTop: `1px solid ${alpha("#000", 0.2)}`,

  paddingInline: "var(--gutter)",
  paddingTop: theme.spacing(2.25),
  paddingBottom: theme.spacing(2.25),
  fontSize: 16,
  textAlign: "center",
}));

export default function CommunityCommitment({
  title = "Our Community Commitment",
  woundedWarriorLogo = "/community/wounded-warrior.png",
  bcrfLogo = "/community/breast-cancer.png",
  pinkLinkHref = "#",
}) {
  const theme = useTheme();

  return (
    <Box component="section" aria-label="Community Commitment" sx={{ mb: 16 }}>
      <Container maxWidth="xl">
        <Panel>
          <Track>
            <Title
              variant="h3"
              sx={{
                mb: 3,
                fontSize: { xs: "2rem", md: "2.4rem" },
                textAlign: { xs: "center", md: "center" }, // already centered on mobile
              }}
            >
              {title}
            </Title>

            <GridWrap>
              <LogosStack>
                <Logo src={woundedWarriorLogo} alt="Wounded Warrior Project" />
                <Logo src={bcrfLogo} alt="Breast Cancer Research Foundation" />
              </LogosStack>

              <Stack spacing={3} sx={{ alignItems: { xs: "center", md: "flex-start" } }}>
                <Copy>
                  At Texas Laser Combat, our{" "}
                  <strong>veteran and woman-owned</strong> roots fuel a deep
                  commitment to community. A share of our proceeds from these
                  weapon upgrades proudly support the{" "}
                  <MuiLink
                    href="https://www.woundedwarriorproject.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                    sx={{ fontWeight: 600 }}
                  >
                    Wounded Warrior Project
                  </MuiLink>
                  , aiding our disabled heroes, and the{" "}
                  <MuiLink
                    href="https://www.bcrf.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    color="inherit"
                    sx={{ fontWeight: 600 }}
                  >
                    Breast Cancer Research Foundation
                  </MuiLink>
                  , driving life-saving research.
                </Copy>

                <Copy>
                  Through local events, charities and partnerships, we build
                  stronger bonds and promote active lifestyles—because fun and
                  impact go hand in hand.
                </Copy>
              </Stack>
            </GridWrap>
          </Track>

          <PledgeBar role="note">
            For certain weapons upgrades such as our{" "}
            <MuiLink
              href={pinkLinkHref}
              underline="always"
              color="inherit"
              sx={{ fontWeight: 700 }}
            >
              Pink P90{" "}
            </MuiLink>
            and{" "}
            <MuiLink
              href={pinkLinkHref}
              underline="always"
              color="inherit"
              sx={{ fontWeight: 700 }}
            >
              FN Scar
            </MuiLink>
            , we have pledged to donate a percentage of our proceeds to our nonprofit
            partners.
          </PledgeBar>
        </Panel>
      </Container>
    </Box>
  );
}
