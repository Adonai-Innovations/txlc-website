import React from 'react';
import SEOHead from '../../seo/SEOHead';
import EventSubHero from './EventSubHero';
import EventIntroSection from './EventIntroSection';
import EventFeatures from './EventFeatures';
import FacilityPackages from './FacilityPackages';
import CTA from '../../key-components/CTA';
import EventImageCarousel from './EventImageCarousel';
import EventsFAQ from './EventsFAQ';
import { openProducts } from '../../../lib/roller';

const corporateSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/events/corporate#webpage",
    "url": "https://txlasercombat.com/events/corporate",
    "name": "Corporate Team Building Laser Tag | Company Events – Texas Laser Combat Plano TX",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://txlasercombat.com/events" },
        { "@type": "ListItem", "position": 3, "name": "Corporate Events", "item": "https://txlasercombat.com/events/corporate" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Corporate Team Building Laser Tag Events",
    "provider": { "@id": "https://txlasercombat.com/#business" },
    "serviceType": "Corporate Team Building & Entertainment",
    "description": "Corporate laser tag team building events in Plano, TX. Mission-based gameplay that strengthens collaboration, communication, and morale. Perfect for company off-sites, holiday parties, and client events.",
    "url": "https://txlasercombat.com/events/corporate"
  }
];

export default function CorporateEvents() {
  return (
    <>
      <SEOHead
        title="Corporate Team Building Laser Tag | Company Events in Plano, TX"
        description="Trade conference rooms for tactical laser tag at Texas Laser Combat in Plano, TX. Immersive corporate team building events, company off-sites, and celebrations that truly engage your team. Book online."
        canonical="/events/corporate"
        schema={corporateSchema}
      />
      <main>
        <EventSubHero
          title={<>CORPORATE<br />EVENTS</>}
          description="Trade conference rooms for controlled adrenaline at Texas Laser Combat in Plano, Texas. Our immersive indoor laser arena is built for corporate team building events, company off-sites, and corporate celebrations that truly engage your team, strengthen collaboration, and create lasting memories, without the usual forced icebreakers."
          ctaText="Book online"
          image="/events/sub/hero.jpg"
          contentBg="#1B2E40"
          bgPosition="center 30%"
          onCtaClick={openProducts}
        />
        <EventIntroSection
          heading="Designed for teams, not just casual fun"
          text={[
            "Texas Laser Combat delivers a high energy corporate event experience designed to bring teams together through strategy, collaboration, and friendly competition. Our private or shared arena events replace passive outings with immersive gameplay that encourages communication, leadership, and real engagement.",
            "From team building sessions and company off-sites to holiday parties and client events, we handle the details so your group can focus on having fun. It’s an experience that works for all skill levels, all personalities, and teams of any size, without feeling forced or awkward."
          ]}
          ctaText="Book online"
          image="/events/corporate-events/designed.jpeg"
          onCtaClick={openProducts}
        />
        <EventFeatures
          heading="Great for..."
          image="/events/corporate-events/great-for.webp"
          features={[
            {
              title: "Team building",
              description: "Strengthen communication, trust, and collaboration through fast paced, mission based gameplay that gets everyone involved, no experience required.",
              icon: "team"
            },
            {
              title: "Company off sites",
              description: "Break out of the office for your meetings and also give your team a shared experience that energizes, resets focus and builds real connections outside of daily routines",
              icon: "company"
            },
            {
              title: "Celebrations",
              description: "Perfect for holiday parties, milestones, and client events, our private laser tag experiences deliver excitement and fun without the pressure of formal programming.",
              icon: "party"
            }
          ]}
        />
        <CTA />
        <EventsFAQ />
      </main>
    </>
  );
}