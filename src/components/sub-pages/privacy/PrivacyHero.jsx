import React from "react";
import {
    Box,
    Container,
    Stack,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const Wrap = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    minHeight: "50vh",
    display: "grid",
    placeItems: "center",
    background: "transparent",
    color: "#eee",
    overflow: "hidden",
    paddingTop: theme.spacing(12),
}));

const Headline = styled(motion.h1)(({ theme }) => ({
    margin: 0,
    lineHeight: 1,
    textAlign: "center",
    fontWeight: 800,
    letterSpacing: "0.5rem",
    textTransform: "uppercase",
    fontFamily: "PostNoBillsJaffna, sans-serif",
}));

const Line = styled("span")(({ theme }) => ({
    position: "relative",
    display: "inline-block",
    paddingInline: theme.spacing(1),
    letterSpacing: "0.04em",
}));

export default function PrivacyHero() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Wrap>
            <Container maxWidth="xl">
                <Stack
                    spacing={isMobile ? 4 : 6}
                    alignItems="center"
                    component={motion.div}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Headline
                        sx={{ fontSize: { xs: "2.5rem", sm: "4rem" } }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
                    >
                        <Line>Privacy Policy</Line>
                    </Headline>
                </Stack>
            </Container>
        </Wrap>
    );
}
