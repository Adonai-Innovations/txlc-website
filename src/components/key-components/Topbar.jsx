import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useScrollTrigger,
  Button,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


const GlassBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  background: "transparent",
  boxShadow: "none",
  transition: "background-color 220ms ease, box-shadow 220ms ease",
  "&.elevated": {
    background: `linear-gradient(180deg, ${alpha("#0a0a0a", 0.78)}, ${alpha("#0a0a0a", 0.64)})`,
    backdropFilter: "saturate(140%) blur(10px)",
    WebkitBackdropFilter: "saturate(140%) blur(10px)",
    boxShadow: `0 10px 30px ${alpha("#000", 0.45)}`,
    borderBottom: `1px solid ${alpha("#fff", 0.08)}`,
  },
}));

const Wrap = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: "max(env(safe-area-inset-top, 0px), 0px)",
  [theme.breakpoints.up("sm")]: { minHeight: 76, paddingLeft: 3, paddingRight: 3 },
  [theme.breakpoints.up("md")]: { minHeight: 80, paddingLeft: 4, paddingRight: 4, paddingTop: 0 },
  position: "relative",
}));

const EdgeSlot = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingInline: theme.spacing(1.25),
  [theme.breakpoints.up("sm")]: { paddingInline: theme.spacing(1.5) },
  [theme.breakpoints.up("md")]: { paddingInline: theme.spacing(1.75) },
}));

const CenterRail = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: theme.spacing(1.75),
  paddingInline: theme.spacing(1),
  whiteSpace: "nowrap",
  [theme.breakpoints.up("md")]: { display: "flex" },
}));

const NavLink = styled(MuiLink)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  fontSize: 22,
  [theme.breakpoints.up("md")]: { fontSize: 28 },
  letterSpacing: 0.2,
  fontFamily: "Roboto",
  textDecoration: "none",
  color: alpha("#fff", 0.92),
  padding: theme.spacing(1, 1.25),
  borderRadius: 12,
  transition: "transform 160ms ease, color 160ms ease",
  "&:hover": { transform: "translateY(-1px)" },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "10%",
    right: "10%",
    bottom: 6,
    height: 3,
    borderRadius: 2,
    transform: "scaleX(0)",
    transformOrigin: "center",
    background: alpha("#ffd15b", 0.95),
    transition: "transform 220ms ease",
  },
  "&:hover::after": { transform: "scaleX(1)" },
  "&.active": { color: "#fff" },
  "&.active::after": { transform: "scaleX(1)" },
}));

const LogoLink = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  textDecoration: "none",
});

const Burger = styled("span")(({ theme }) => ({
  position: "relative",
  width: 24,
  height: 2,
  borderRadius: 2,
  background: alpha("#fff", 0.95),
  display: "block",
  transition: "background 180ms ease",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    left: 0,
    width: 24,
    height: 2,
    borderRadius: 2,
    background: alpha("#fff", 0.95),
    transition: "transform 220ms ease, opacity 220ms ease",
  },
  "&::before": { top: -7 },
  "&::after": { top: 7 },
}));
const BurgerWrap = styled(Box)(({ theme }) => ({
  "&.open span": { background: "transparent" },
  "&.open span::before": { transform: "translateY(7px) rotate(45deg)" },
  "&.open span::after": { transform: "translateY(-7px) rotate(-45deg)" },
}));

const DrawerShell = styled(Box)(({ theme }) => ({
  width: "min(86vw, 420px)",
  background: "linear-gradient(180deg, rgba(14,15,17,.95), rgba(14,15,17,.9))",
  color: alpha("#fff", 0.92),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  paddingTop: "max(env(safe-area-inset-top, 0px), 12px)",
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
}));

const DrawerLogo = styled("img")(({ theme }) => ({
  height: 44,
  width: "auto",
  display: "block",
}));

const DrawerList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  "& .MuiListItemButton-root": {
    borderRadius: 12,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1.25, 1.5),
    "&.active": {
      background: alpha("#ffffff", 0.06),
      boxShadow: `inset 0 0 0 1px ${alpha("#fff", 0.06)}`,
    },
  },
  "& .MuiListItemText-primary": {
    fontSize: 18,
    fontFamily: "Roboto",
    letterSpacing: 0.2,
  },
}));

function useElevateOnScroll() {
  return useScrollTrigger({ disableHysteresis: true, threshold: 8 });
}

/* Desktop CTA */
const WaitlistCta = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 800,
  letterSpacing: "0.02em",
  borderRadius: 999,
  paddingInline: theme.spacing(2.25),
  paddingBlock: theme.spacing(1.1),
  color: "#0e0f11",
  backgroundColor: "#f2c230",
  boxShadow: `0 10px 28px ${alpha("#f2c230", 0.35)}`,
  fontFamily: "Podkova",
  "&:hover": {
    backgroundColor: "#ffd24a",
    boxShadow: `0 12px 32px ${alpha("#ffd24a", 0.45)}`,
    transform: "translateY(-1px)",
  },
  transition: "all .2s ease",
}));

/* Desktop Waiver Button (secondary) */
const WaiverBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 700,
  fontSize: 16,
  borderRadius: 999,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  color: alpha("#fff", 0.9),
  border: `1px solid ${alpha("#fff", 0.35)}`,
  fontFamily: "Podkova",
  marginRight: theme.spacing(1),
  "&:hover": {
    borderColor: "#fff",
    backgroundColor: alpha("#fff", 0.08),
  },
  transition: "all .2s ease",
}));

export default function TopbarResponsiveNav({
  logoSrc = "/alt-logo.png",
  logoAlt = "TX Laser Tag",
  links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    {
      label: "Events",
      to: "/events",
      subItems: [
        { label: "Events Home", to: "/events" },
        { label: "Group Events", to: "/events/group" },
        { label: "Corporate Events", to: "/events/corporate" },
      ],
    },
    { label: "Experience", to: "/experience" },
  ],
  onJoinWaitlist,
  appBarProps,
}) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const scrolled = useElevateOnScroll();

  const [open, setOpen] = React.useState(false);
  const toggle = (val) => () => setOpen(val);

  // Dropdown state for desktop
  const [eventsAnchor, setEventsAnchor] = React.useState(null);
  const isEventsOpen = Boolean(eventsAnchor);

  const handleEventsEnter = (event) => {
    setEventsAnchor(event.currentTarget);
  };
  const handleEventsLeave = () => {
    setEventsAnchor(null);
  };

  // Roller Checkout Handler
  const handleJoinClick = () => {
    if (onJoinWaitlist) {
      onJoinWaitlist();
    } else if (window.RollerCheckout) {
      window.RollerCheckout.show();
    } else {
      console.warn("Roller Checkout script not loaded");
    }
  };

  const activeCheck = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  // Hash link handler
  const handleHashLink = (to) => {
    if (to.includes("#")) {
      const [path, hash] = to.split("#");
      // If we are already on the path, just scroll
      if (location.pathname === path) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <GlassBar position="fixed" className={scrolled ? "elevated" : ""} {...appBarProps}>
        <Wrap disableGutters>
          <EdgeSlot>
            <LogoLink component={RouterLink} to="/" aria-label="Go to homepage">
              <Box
                component="img"
                src={logoSrc}
                alt={logoAlt}
                sx={{
                  height: { xs: 56, sm: 68, md: 120 },
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 6px rgba(0,0,0,.35))",
                }}
              />
            </LogoLink>
          </EdgeSlot>

          <Box sx={{ flexGrow: 1 }} />

          <CenterRail aria-label="Primary navigation (desktop)" role="navigation">
            {links.map((link) => {
              const active = activeCheck(link.to);

              if (link.subItems) {
                return (
                  <Box
                    key={link.to}
                    onMouseEnter={handleEventsEnter}
                    onMouseLeave={handleEventsLeave}
                    sx={{ position: "relative", display: "inline-block" }}
                  >
                    <NavLink
                      component={RouterLink}
                      to={link.to}
                      className={active ? "active" : undefined}
                      underline="none"
                      aria-current={active ? "page" : undefined}
                      aria-haspopup="true"
                      aria-expanded={isEventsOpen ? "true" : undefined}
                    >
                      {link.label}
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 20,
                          ml: 0.5,
                          transform: isEventsOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s ease",
                          verticalAlign: "middle",
                          mb: 0.3,
                        }}
                      />
                    </NavLink>

                    {/* Hover Dropdown */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        pt: 1, // spacing for hover bridge
                        display: isEventsOpen ? "block" : "none",
                        zIndex: 9999,
                      }}
                    >
                      <Box
                        sx={{
                          minWidth: 200,
                          bgcolor: "rgba(14,15,17,0.95)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 3,
                          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                          p: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {link.subItems.map((sub) => (
                          <MuiLink
                            key={sub.label}
                            component={RouterLink}
                            to={sub.to}
                            underline="none"
                            onClick={(e) => {
                              handleHashLink(sub.to);
                              setEventsAnchor(null);
                            }}
                            sx={{
                              color: "#e0e0e0",
                              fontSize: "1rem",
                              fontWeight: 500,
                              px: 2,
                              py: 1,
                              borderRadius: 2,
                              transition: "all 0.15s ease",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.08)",
                                color: "#ffd15b",
                                transform: "translateX(4px)",
                              },
                            }}
                          >
                            {sub.label}
                          </MuiLink>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  component={RouterLink}
                  to={link.to}
                  className={active ? "active" : undefined}
                  underline="none"
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </CenterRail>

          {/* Right side: CTA (desktop) or hamburger (mobile) */}
          {isMobile ? (
            <EdgeSlot>
              <IconButton
                aria-label={open ? "Close menu" : "Open menu"}
                edge="end"
                onClick={toggle(!open)}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  backgroundColor: alpha("#fff", 0.06),
                  border: `1px solid ${alpha("#fff", 0.08)}`,
                  backdropFilter: "saturate(140%) blur(6px)",
                  WebkitBackdropFilter: "saturate(140%) blur(6px)",
                  "&:hover": { backgroundColor: alpha("#fff", 0.1) },
                }}
              >
                <BurgerWrap className={open ? "open" : ""}>
                  <Burger />
                </BurgerWrap>
              </IconButton>
            </EdgeSlot>
          ) : (
            <EdgeSlot sx={{ ml: 1.5 }}>
              <WaiverBtn
                href="https://waiver.roller.app/TexasLaserCombat"
                target="_blank"
                rel="noopener noreferrer"
              >
                Waiver
              </WaiverBtn>
              <WaitlistCta onClick={handleJoinClick} aria-label="Book Now">
                Book Now
              </WaitlistCta>
            </EdgeSlot>
          )}
        </Wrap>
      </GlassBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggle(false)}
        PaperProps={{
          sx: {
            background: "transparent",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerShell role="dialog" aria-label="Mobile navigation">
          <DrawerHeader>
            <DrawerLogo src={logoSrc} alt={logoAlt} />
            <IconButton
              aria-label="Close menu"
              onClick={toggle(false)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: alpha("#fff", 0.06),
                border: `1px solid ${alpha("#fff", 0.08)}`,
                "&:hover": { backgroundColor: alpha("#fff", 0.1) },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 18,
                  height: 18,
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    width: 18,
                    height: 2,
                    borderRadius: 2,
                    background: alpha("#fff", 0.95),
                  },
                  "&:before": { transform: "translateY(-50%) rotate(45deg)" },
                  "&:after": { transform: "translateY(-50%) rotate(-45deg)" },
                }}
              />
            </IconButton>
          </DrawerHeader>

          <Divider sx={{ opacity: 0.1, borderColor: alpha("#fff", 0.2) }} />

          <DrawerList component="nav" aria-label="Primary navigation (mobile)">
            {links.map(({ label, to, subItems }) => {
              const active = activeCheck(to);

              if (subItems) {
                return (
                  <React.Fragment key={to}>
                    <ListItemButton
                      component={RouterLink}
                      to={to}
                      onClick={toggle(false)}
                      className={active ? "active" : undefined}
                      aria-current={active ? "page" : undefined}
                    >
                      <ListItemText primary={label} />
                    </ListItemButton>
                    {/* Indented Sub Items */}
                    {subItems.map((sub) => (
                      <ListItemButton
                        key={sub.label}
                        component={RouterLink}
                        to={sub.to}
                        onClick={() => {
                          handleHashLink(sub.to);
                          setOpen(false);
                        }}
                        sx={{
                          pl: 4,
                          my: 0,
                          py: 1,
                          "& .MuiListItemText-primary": { fontSize: 16, opacity: 0.8 }
                        }}
                      >
                        <ListItemText primary={sub.label} />
                      </ListItemButton>
                    ))}
                  </React.Fragment>
                );
              }

              return (
                <ListItemButton
                  key={to}
                  component={RouterLink}
                  to={to}
                  onClick={toggle(false)}
                  className={active ? "active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              );
            })}
          </DrawerList>

          {/* Waitlist shortcut in the drawer */}
          <Box sx={{ p: 2, display: 'flex', gap: 2, flexDirection: 'column' }}>
            <Button
              fullWidth
              variant="outlined"
              href="https://waiver.roller.app/TexasLaserCombat"
              target="_blank"
              onClick={toggle(false)}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 2,
                color: "#fff",
                borderColor: alpha("#fff", 0.4),
                "&:hover": { borderColor: "#fff", backgroundColor: alpha("#fff", 0.05) },
              }}
            >
              Waiver
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                toggle(false)();
                handleJoinClick();
              }}
              sx={{
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2,
                backgroundColor: "#f2c230",
                color: "#0e0f11",
                "&:hover": { backgroundColor: "#ffd24a" },
              }}
            >
              Book Now
            </Button>
          </Box>

          <Box sx={{ mt: "auto", p: 2, opacity: 0.7, fontSize: 13 }}>
            © {new Date().getFullYear()} {logoAlt}
          </Box>
        </DrawerShell>
      </Drawer>

    </>
  );
}
