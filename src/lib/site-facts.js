/**
 * Canonical copy for the facts that appear in more than one place.
 *
 * ADO-427 found the same answer written out three or four times with different
 * wording — the age rule said "no height restrictions" on /events while /about
 * said `7 years old or 46"`, and the shoe rule was pasted into three files.
 * Anything a guest could read twice lives here once, and both the visible FAQ
 * accordions and the JSON-LD `FAQPage` schemas read from it, so the rendered
 * answer and the answer Google indexes can no longer disagree.
 */

/* ------------------------------- Contact ------------------------------- */

export const PHONE_DISPLAY = "469-638-8499";
export const PHONE_TEL = "+14696388499";
export const OPS_EMAIL = "ops@txlasercombat.com";

/**
 * Staffed-phone guidance — the arena is unstaffed outside these windows.
 * `PHONE_AVAILABILITY` is the full sentence for plain-text contexts; the
 * `_SUFFIX` is the part that follows the number when the number itself is
 * rendered as a `tel:` link.
 */
export const PHONE_AVAILABILITY_SUFFIX =
  "after 4pm Wednesday to Friday, or after 11am on Saturday and Sunday.";
export const PHONE_AVAILABILITY = `Call us at ${PHONE_DISPLAY} ${PHONE_AVAILABILITY_SUFFIX}`;

export const ADDRESS_LINE =
  "2300 Coit Road (off Irvine Drive) #400, Plano, TX 75075";

/* -------------------------------- Hours -------------------------------- */

/** Display hours, matching the footer and the LocalBusiness schema. */
export const HOURS_LINES = [
  "Wed–Thurs: 4pm – 10:30pm",
  "Fri: 4pm – 11:30pm",
  "Sat: 11am – 11:30pm",
  "Sun: 11am – 8pm",
];

/**
 * The same schedule in schema.org form. Kept beside HOURS_LINES so the two can
 * be diffed at a glance — before ADO-427 the structured data advertised
 * "Sat & Sun 10:00–20:00" while the footer showed a four-line Wed–Sun schedule.
 */
export const OPENING_HOURS_SPECIFICATION = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Wednesday", "Thursday"],
    opens: "16:00",
    closes: "22:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Friday",
    opens: "16:00",
    closes: "23:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "11:00",
    closes: "23:30",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Sunday",
    opens: "11:00",
    closes: "20:00",
  },
];

/**
 * Coordinates for the 2300 Coit Rd building, Plano, TX 75075 (OpenStreetMap
 * building centroid, looked up 2026-10-16).
 *
 * The previous 33.0198, -96.6989 was a generic Plano point about five miles
 * east of the arena — close enough to look plausible, far enough to put the
 * business pin in the wrong part of town. If Ops has the exact pin from the
 * Google Business Profile for suite #400, prefer that value over this one.
 */
export const GEO = { latitude: 33.0306, longitude: -96.7703 };

/* ------------------------------- Capacity ------------------------------ */

/**
 * Arena capacity. "42" is the cap the online booking flow enforces for open
 * play; a staffed private event can run higher, so the two numbers are named
 * separately rather than collapsed into one "maximum".
 */
export const OPEN_PLAY_ONLINE_CAP = 42;
export const PRIVATE_EVENT_CAP = 60;
export const PACKAGE_MIN_PLAYERS = 4;
export const PACKAGE_INCLUDED_WEEKDAY = 30;
export const PACKAGE_INCLUDED_SATURDAY = 40;

/** Shared one-liner for package cards. */
export const PACKAGE_SIZE_SUMMARY =
  "From 4 players — 30 included weekdays & Sundays, 40 Saturdays.";

/* --------------------------- Shared FAQ answers ------------------------ */

export const FAQ = {
  cancellation: {
    q: "What is your cancellation policy?",
    a: "If canceled with more than 72 hours' notice, full refund. With 24-72 hours' notice, forfeit 50% of paid amount, remaining portion can also be refunded to a Gift Card. With less than 24 hours' notice or no-show, forfeit 100% of paid amount. If walking out, full amount retained. No refunds for completed sessions, participant misconduct, or non-compliance. Rescheduling incurs no penalty.",
  },
  sessionLength: {
    q: "How long is a session?",
    a: "A standard laser tag session lasts 75 minutes, which includes approximately 15 minutes for safety briefings and gearing up, leaving 1 hour of active gameplay.",
  },
  age: {
    q: "Are there age or height restrictions to play?",
    a: "Players must be 7 or older, or at least 46 inches tall. Players under 14 need an adult on site.",
  },
  parentArea: {
    q: "Is there a parent viewing area available?",
    a: "Yes, Texas Laser Combat provides a designated parent viewing area where you can watch the action safely and comfortably.",
  },
  whatToWear: {
    q: "What should I wear for a tactical laser tag session?",
    a: "Wear closed-toe, closed-heel shoes for safety. The arena is cool at the start, but can heat up as you play, so dress in comfortable, breathable clothing suitable for physical activity.",
  },
  groupSize: {
    q: "What is the minimum and maximum group size?",
    a: `Minimum is ${PACKAGE_MIN_PLAYERS} players. Our online cap for open play is ${OPEN_PLAY_ONLINE_CAP} players per session in the arena. Private events can host up to ${PRIVATE_EVENT_CAP} players at a time. Larger groups can be accommodated with staggered sessions or full-facility rentals.`,
  },
  payment: {
    q: "What payment methods are accepted?",
    a: "We accept credit/debit cards and cash. Checks are not accepted unless preapproved by management. Any balance must be paid 3 days before the session.",
  },
};

/** Turns one of the FAQ entries above into a schema.org Question node. */
export function toSchemaQuestion({ q, a }, nameOverride) {
  return {
    "@type": "Question",
    name: nameOverride ?? q,
    acceptedAnswer: { "@type": "Answer", text: a },
  };
}
