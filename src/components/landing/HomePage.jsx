import SEOHead from "../seo/SEOHead";
import {
  GEO,
  OPENING_HOURS_SPECIFICATION,
  OPS_EMAIL,
  PHONE_TEL,
} from "../../lib/site-facts";
import Hero from "./Hero";
import Intro from "./Intro";
import About from "./About";
import Offer from "./Offer";
import Apply from "./Apply";

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Texas Laser Combat",
    "url": "https://txlasercombat.com"
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://txlasercombat.com/#business",
    "name": "Texas Laser Combat",
    "description": "Premier tactical laser tag arena in Plano, TX. Immersive 15,000 sq ft wasteland-themed arena with state-of-the-art equipment. Perfect for birthday parties, group events, corporate team building, and family fun.",
    "url": "https://txlasercombat.com",
    "telephone": PHONE_TEL,
    "email": OPS_EMAIL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2300 Coit Road (off Irvine Drive) #400",
      "addressLocality": "Plano",
      "addressRegion": "TX",
      "postalCode": "75075",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": GEO.latitude,
      "longitude": GEO.longitude
    },
    "openingHoursSpecification": OPENING_HOURS_SPECIFICATION,
    "image": "https://txlasercombat.com/og-image.jpg",
    "logo": "https://txlasercombat.com/alt-logo.png",
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Credit Card, Debit Card, Cash",
    "areaServed": [
      { "@type": "City", "name": "Plano" },
      { "@type": "City", "name": "Frisco" },
      { "@type": "City", "name": "McKinney" },
      { "@type": "City", "name": "Allen" },
      { "@type": "City", "name": "Richardson" },
      { "@type": "City", "name": "Dallas" }
    ],
    "sameAs": [
      "https://www.facebook.com/people/TX-Laser-Combat/61585110921158/",
      "https://www.instagram.com/txlasercombat"
    ],
    "hasMap": "https://maps.google.com/?q=2300+Coit+Road+%23400+Plano+TX+75075"
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://txlasercombat.com/#organization",
    "name": "Texas Laser Combat",
    "url": "https://txlasercombat.com",
    "logo": "https://txlasercombat.com/alt-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": PHONE_TEL,
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  }
];

export default function HomePage() {
  return (
    <>
      <SEOHead
        title="Premier Tactical Laser Tag in Plano, TX"
        description="Experience high-adrenaline tactical laser tag at Texas Laser Combat in Plano, TX. 15,000 sq ft immersive wasteland arena, state-of-the-art equipment, private party rooms, and missions for ages 7+. Book now!"
        canonical="/"
        schema={homepageSchema}
      />
      <main>
        <Hero />
        <Intro />
        <About />
        <Offer />
        <Apply />
      </main>
    </>
  );
}
