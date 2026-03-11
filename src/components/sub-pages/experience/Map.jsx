import React, { useEffect, useRef } from "react";
import { Box, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const BASE_URL = (import.meta?.env?.BASE_URL ?? "/").replace(/\/+/g, "/");
const DEFAULT_SRC = `/experience.png`;

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: `0 28px 64px ${alpha("#000", 0.55)}`,
}));

const Iframe = styled("iframe")({
  width: "100%",
  height: "100%",
  border: 0,
  display: "block",
});

const Overlay = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
}));

export default function FeatureBanner({
  src = DEFAULT_SRC,
  alt = "",
  height = "clamp(420px, 48vw, 720px)",
  radius = 16,
  overlay = false,
  overlaySx,
  children,
  containerProps,
  sx,
}) {
  const iframeRef = useRef(null);
  const pano_iframe_name = "tour-embeded";

  useEffect(() => {
    const handler = (e) => {
      const iframe =
        document.getElementById(pano_iframe_name) || iframeRef.current;
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage(
        {
          type: "devicemotion",
          deviceMotionEvent: {
            acceleration: {
              x: e.acceleration?.x,
              y: e.acceleration?.y,
              z: e.acceleration?.z,
            },
            accelerationIncludingGravity: {
              x: e.accelerationIncludingGravity?.x,
              y: e.accelerationIncludingGravity?.y,
              z: e.accelerationIncludingGravity?.z,
            },
            rotationRate: {
              alpha: e.rotationRate?.alpha,
              beta: e.rotationRate?.beta,
              gamma: e.rotationRate?.gamma,
            },
            interval: e.interval,
            timeStamp: e.timeStamp,
          },
        },
        "*"
      );
    };
    window.addEventListener("devicemotion", handler, { passive: true });
    return () => window.removeEventListener("devicemotion", handler);
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ mb: { xs: 6, md: 8 } }}
      {...containerProps}
    >
      <Wrap sx={{ height, borderRadius: radius, ...sx }}>
        <Iframe
          id="tour-embeded"
          ref={iframeRef}
          name="The Wastelands"
          src="https://tour.panoee.net/iframe/68c393b865c1d7461aa7a8ed"
          frameBorder="0"
          width="100%"
          height="400px"
          scrolling="no"
          allowvr="yes"
          allow="vr; xr; accelerometer; gyroscope; autoplay;"
          allowFullScreen={true}
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          loading="eager"
        />

        {overlay ? <Overlay sx={overlaySx} /> : null}

        {children ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              p: 2,
              pointerEvents: "none",
            }}
          >
            {children}
          </Box>
        ) : null}
      </Wrap>
    </Container>
  );
}
