import Portal from "@mui/material/Portal";
import { keyframes } from "@mui/system";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";

const ACCENT = "#f2c230";

const fall = keyframes`
  0% { transform: translate3d(0,-20px,0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(0,110vh,0) rotate(720deg); opacity: 1; }
`;

function Confetti({ show }) {
  if (!show) return null;
  const pieces = Array.from({ length: 140 });
  const colors = [ACCENT, "#ffd24a", "#4ecdc4", "#a78bfa", "#ff6b6b"];

  return (
    <Portal container={document.body}>
      <Box
        aria-hidden
        sx={(theme) => ({
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: (theme.zIndex?.snackbar || 1400) + 10,
          overflow: "hidden",
        })}
      >
        {pieces.map((_, i) => {
          const left = Math.random() * 100;
          const size = 6 + Math.random() * 8;
          const duration = 5.5 + Math.random() * 3.5;
          const delay = Math.random() * 0.8;
          const rotate = Math.random() * 360;
          const bg = colors[i % colors.length];
          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                top: -20,
                left: `${left}%`,
                width: size,
                height: size * 1.6,
                backgroundColor: bg,
                borderRadius: "2px",
                transform: `rotate(${rotate}deg)`,
                animation: `${fall} ${duration}s linear ${delay}s forwards`,
                boxShadow: `0 0 0 1px ${alpha("#000", 0.06)}`,
              }}
            />
          );
        })}
      </Box>
    </Portal>
  );
}

export default Confetti;
