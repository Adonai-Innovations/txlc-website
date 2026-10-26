import React from 'react'
import SEOHead from '../../seo/SEOHead'
import { FAQ, toSchemaQuestion } from '../../../lib/site-facts'

// About Components
import EventsHero from './EventsHero'
import PartyRoomPackages from './PartyRoomPackages';
import EventImageCarousel from './EventImageCarousel';
import EventTypes from './EventTypes';
import CommunityEvents from './CommunityEvents';
import FacilityPackages from './FacilityPackages';
import EventsFAQ from './EventsFAQ';
import CTA from '../../key-components/CTA'

const eventsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/events#webpage",
    "url": "https://txlasercombat.com/events",
    "name": "Events & Packages | Birthday Parties, Group & Corporate Events – Texas Laser Combat",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://txlasercombat.com/events" }
      ]
    },
    "isPartOf": { "@id": "https://txlasercombat.com/#business" }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Laser Tag Events & Party Packages",
    "provider": { "@id": "https://txlasercombat.com/#business" },
    "serviceType": "Laser Tag Entertainment",
    "areaServed": { "@type": "City", "name": "Plano, TX" },
    "description": "Birthday parties, group events, and corporate team building laser tag packages in Plano, TX. Private party rooms, customizable game modes, and packages for all group sizes.",
    "url": "https://txlasercombat.com/events",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Laser Tag Event Packages",
      "itemListElement": [
        { "@type": "Offer", "name": "Birthday Party Package", "description": "Private party room + laser tag session for birthday celebrations" },
        { "@type": "Offer", "name": "Group Event Package", "description": "Private or shared arena laser tag for schools, churches, and community groups" },
        { "@type": "Offer", "name": "Corporate Team Building Package", "description": "Mission-based laser tag for corporate teams, off-sites, and client events" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      toSchemaQuestion(FAQ.cancellation, "What is your cancellation policy for events?"),
      toSchemaQuestion(FAQ.sessionLength, "How long is a laser tag session?"),
      toSchemaQuestion(FAQ.age, "Are there age or height restrictions for laser tag?"),
      toSchemaQuestion(FAQ.parentArea, "Is there a parent viewing area?"),
      toSchemaQuestion(FAQ.whatToWear),
      toSchemaQuestion(FAQ.payment),
      toSchemaQuestion(FAQ.groupSize)
    ]
  }
];

export default function EventsPage() {
  return (
    <>
      <SEOHead
        title="Events & Packages | Birthday Parties, Group & Corporate Laser Tag"
        description="Book laser tag birthday parties, group events, and corporate team building at Texas Laser Combat in Plano, TX. Private party rooms, flexible packages, and immersive gameplay for all ages and group sizes."
        canonical="/events"
        schema={eventsSchema}
      />
      <main>
        <EventsHero />
        <PartyRoomPackages />
        <FacilityPackages />
        <EventImageCarousel />
        <EventTypes />
        <EventsFAQ />
      </main>
    </>
  );
}