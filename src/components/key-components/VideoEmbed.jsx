import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/**
 * Lazy YouTube embed (ADO-427).
 *
 * Renders a poster frame first and only swaps in the YouTube iframe once the
 * guest clicks. A plain iframe would pull YouTube's player bundle and set
 * cookies on every page load, which is a lot of weight for a video most
 * visitors will not play. `youtube-nocookie.com` keeps the privacy posture
 * reasonable for the ones who do.
 */

const Frame = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: 16,
  overflow: "hidden",
  background: "#0b0c0e",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  boxShadow: `0 28px 64px ${alpha("#000", 0.55)}`,
  cursor: "pointer",
  "& iframe": { width: "100%", height: "100%", border: 0, display: "block" },
}));

const Poster = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const PlayBadge = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  display: "grid",
  placeItems: "center",
  background:
    "linear-gradient(to bottom, rgba(0,0,0,.15), rgba(0,0,0,.45))",
  transition: "background 200ms ease",
}));

const PlayGlyph = styled(Box)(() => ({
  width: 76,
  height: 76,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  background: "#f2c230",
  color: "#101113",
  boxShadow: "0 12px 36px rgba(0,0,0,.45)",
  fontSize: 26,
  lineHeight: 1,
  paddingLeft: 6,
}));

export default function VideoEmbed({ videoId, title, caption }) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <Box sx={{ width: "100%" }}>
      <Frame
        role={playing ? undefined : "button"}
        tabIndex={playing ? undefined : 0}
        aria-label={playing ? undefined : `Play video: ${title}`}
        onClick={() => setPlaying(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setPlaying(true);
          }
        }}
      >
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Poster
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              loading="lazy"
              width="1280"
              height="720"
            />
            <PlayBadge>
              <PlayGlyph aria-hidden>▶</PlayGlyph>
            </PlayBadge>
          </>
        )}
      </Frame>
      {caption && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 1.25, fontSize: "0.95rem", color: alpha("#fff", 0.8) }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}

/** Section wrapper for one or more embeds. */
export function VideoSection({ heading, subheading, videos = [] }) {
  if (!videos.length) return null;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        {heading && (
          <Typography
            component="h2"
            variant="h4"
            sx={{ fontWeight: 800, color: "#fff", mb: subheading ? 1 : 4 }}
          >
            {heading}
          </Typography>
        )}
        {subheading && (
          <Typography sx={{ color: alpha("#fff", 0.75), mb: 4, maxWidth: 760 }}>
            {subheading}
          </Typography>
        )}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: videos.length > 1 ? "repeat(2, minmax(0, 1fr))" : "1fr",
            },
          }}
        >
          {videos.map((video) => (
            <VideoEmbed key={video.videoId} {...video} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
