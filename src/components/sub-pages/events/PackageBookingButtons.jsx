import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { openCheckout } from "../../../lib/roller";

/**
 * Booking control for a package card (ADO-427).
 *
 * Atomic, Core and Open Play are separate ROLLER products per day, so a single
 * "Book Now" cannot address them — picking the product has to happen before the
 * guest leaves the site. A package with a `days` list renders one button per
 * day; anything with a single `productId` keeps the original single button.
 */

const BookBtn = styled(Button)(() => ({
  textTransform: "none",
  fontWeight: 800,
  borderRadius: 10,
  paddingBlock: 6,
  paddingInline: 14,
  color: "#111",
  backgroundColor: "#f2c230",
  fontFamily: "Podkova",
  whiteSpace: "nowrap",
  boxShadow: `0 10px 18px ${alpha("#f2c230", 0.35)}`,
  "&:hover": {
    backgroundColor: "#ffd24a",
    boxShadow: `0 12px 22px ${alpha("#ffd24a", 0.45)}`,
  },
}));

const DayBtn = styled(BookBtn)(() => ({
  paddingInline: 12,
  fontSize: 13,
  flex: "1 1 auto",
}));

export default function PackageBookingButtons({ pkg, onBook }) {
  // `onBook` stays supported so existing callers that want to intercept the
  // click (analytics, a different checkout) keep working.
  const book = (productId, campaign) => {
    if (onBook) {
      onBook({ ...pkg, productId, campaign });
      return;
    }
    openCheckout(productId, campaign);
  };

  if (pkg.days?.length) {
    return (
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.4,
            textTransform: "uppercase",
            color: alpha("#fff", 0.7),
            mb: 0.75,
          }}
        >
          Book by day
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ flexWrap: "wrap" }}
          aria-label={`${pkg.title} booking options`}
        >
          {pkg.days.map((day) => (
            <DayBtn
              key={day.key}
              size="small"
              onClick={() => book(day.id, day.campaign)}
            >
              {day.label}
            </DayBtn>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <BookBtn onClick={() => book(pkg.productId, pkg.campaign)} size="small">
      Book Now
    </BookBtn>
  );
}
