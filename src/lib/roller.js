/**
 * Single source of truth for ROLLER checkout links.
 *
 * Every product id here was re-verified against the ROLLER catalogue on
 * 2026-10-16 (ADO-427). The previous ids (Recruit 1692026, Elite 1692180,
 * Core 1692224) had been retired in ROLLER, so those buttons silently fell
 * through to the generic product list instead of the intended product — which
 * is exactly the bug ADO-427 item 1 reports. Keep every id in this file so a
 * retired product can only ever break in one place.
 *
 * Atomic, Core and Open Play are separate ROLLER products per day, so they are
 * modelled as a `days` map rather than a single id.
 */

const CHECKOUT_BASE = "https://ecom.roller.app/texaslasercombat/checkout/en-us";

/** Generic catalogue page — the fallback when no specific product applies. */
export const PRODUCTS_URL = `${CHECKOUT_BASE}/products`;

/** Products with a single id across the week. */
export const PRODUCTS = {
  recruit: { id: "2039916", campaign: "package_recruit" },
  elite: { id: "2040662", campaign: "package_elite" },
  squad4: { id: "2039865", campaign: "package_squad4" },
  giftCard: { id: "1677710", campaign: "package_giftcard" },
};

/**
 * Products that vary by day. `label` is what the booking button shows, so the
 * day split is explicit to the guest before they land in ROLLER.
 */
export const DAY_PRODUCTS = {
  atomic: [
    { key: "weekday", label: "Weekday", id: "1940988", campaign: "package_atomic_weekday" },
    { key: "saturday", label: "Saturday", id: "1941183", campaign: "package_atomic_sat" },
    { key: "sunday", label: "Sunday", id: "1941203", campaign: "package_atomic_sun" },
  ],
  core: [
    { key: "weekday", label: "Weekday (Mon–Fri)", id: "1939727", campaign: "package_core_weekday" },
    { key: "saturday", label: "Saturday", id: "1939770", campaign: "package_core_sat" },
    { key: "sunday", label: "Sunday", id: "1954420", campaign: "package_core_sun" },
  ],
  openPlay: [
    { key: "wed", label: "Wednesday", id: "2040009", campaign: "package_openplay_wed" },
    { key: "thufri", label: "Thursday & Friday", id: "2040028", campaign: "package_openplay_thufri" },
    { key: "satsun", label: "Saturday & Sunday", id: "2036166", campaign: "package_openplay_satsun" },
  ],
};

/** Builds the tagged checkout URL for a product id. */
export function productUrl(productId, campaign) {
  const url = new URL(`${CHECKOUT_BASE}/product/${productId}`);
  url.searchParams.set("utm_source", "website");
  url.searchParams.set("utm_medium", "button");
  if (campaign) url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

/**
 * Opens ROLLER checkout for a specific product, preferring the embedded widget
 * when it has loaded and falling back to a new tab when it has not.
 *
 * Previously several call sites only logged a warning when `window.RollerCheckout`
 * was missing, which left the button doing nothing at all if the deferred ROLLER
 * script was slow or blocked. The fallback here means a booking button always
 * goes somewhere useful.
 */
export function openCheckout(productId, campaign) {
  if (!productId) return openProducts();

  if (window.RollerCheckout?.show) {
    window.RollerCheckout.show({ productId });
    return;
  }
  window.open(productUrl(productId, campaign), "_blank", "noopener,noreferrer");
}

/** Opens the generic ROLLER catalogue. */
export function openProducts() {
  if (window.RollerCheckout?.show) {
    window.RollerCheckout.show();
    return;
  }
  window.open(PRODUCTS_URL, "_blank", "noopener,noreferrer");
}

/** Convenience wrapper for the gift-card product used in the footer. */
export function giftCardUrl() {
  return productUrl(PRODUCTS.giftCard.id, PRODUCTS.giftCard.campaign);
}
