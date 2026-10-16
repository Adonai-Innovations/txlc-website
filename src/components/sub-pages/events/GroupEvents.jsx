import React from 'react';
import SEOHead from '../../seo/SEOHead';
import EventSubHero from './EventSubHero';
import EventIntroSection from './EventIntroSection';
import EventFeatures from './EventFeatures';
import FacilityPackages from './FacilityPackages';
import EventImageCarousel from './EventImageCarousel';
import CTA from '../../key-components/CTA';
import EventsFAQ from './EventsFAQ';
import { openProducts } from '../../../lib/roller';

const groupEventsSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/events/group#webpage",
    "url": "https://txlasercombat.com/events/group",
    "name": "Group Laser Tag Events | Birthdays, Schools & Community Groups – Texas Laser Combat Plano",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "Events", "item": "https://txlasercombat.com/events" },
        { "@type": "ListItem", "position": 3, "name": "Group Events", "item": "https://txlasercombat.com/events/group" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Group Laser Tag Events",
    "provider": { "@id": "https://txlasercombat.com/#business" },
    "serviceType": "Group Entertainment & Laser Tag",
    "description": "Group laser tag events for birthdays, school outings, senior groups, and community gatherings at Texas Laser Combat in Plano, TX. Private or shared arena games for all ages and activity levels.",
    "url": "https://txlasercombat.com/events/group"
  }
];

export default function GroupEvents() {
  return (
    <>
      <SEOHead
        title="Group Laser Tag Events | Birthdays, Schools & Community Groups in Plano, TX"
        description="Celebrate birthdays, school outings, and community gatherings with group laser tag at Texas Laser Combat in Plano, TX. Fun, safe, and engaging for all ages. Private and shared arena options available."
        canonical="/events/group"
        schema={groupEventsSchema}
      />
      <main>
        <EventSubHero
          title={<>GROUP<br />EVENTS</>}
          description="Celebrate birthdays, milestones and special occasions with an experience everyone can enjoy! Our group laser tag events can be private and are designated to be fun, safe, and engaging for all ages and activity levels."
          ctaText="Book Your Group Event"
          image="/events/sub/hero.jpg"
          contentBg="#3E5C47" // Lighter slate for groups
          bgPosition="center 30%" // Shift focus higher up
          onCtaClick={openProducts}
        />
        <EventIntroSection
          heading="Built for squads, not just play"
          text={[
            "Texas Laser Combat offers a fun, flexible group event experience designed for birthdays, school outings, senior groups, and community gatherings. Our private or shared arena games create an inclusive environment where participants can play at their own pace while enjoying safe, immersive gameplay.",
            "From kids’ parties and youth group outings to senior activities and family celebrations, we handle the setup and flow so your group can focus on having fun. With adjustable game modes and experienced staff on site, it’s an engaging experience that works for all ages, abilities, and group sizes, without feeling overwhelming or chaotic."
          ]}
          ctaText="Book online"
          image="/events/group-events/Squads.webp"
          onCtaClick={openProducts}
        />
        <EventFeatures
          heading="Great for..."
          image="/events/core.jpg"
          backgroundColor="#3E5C47" // Distinct background for features
          features={[
            {
              title: "Group Celebrations",
              description: "Celebrate birthdays, milestones and special occasions with a laser tag experience that's fun, safe and engaging for all ages!",
              icon: "team"
            },
            {
              title: "Seniors & Community Groups and Teams",
              description: "Enjoy a low-impact, customizable laser tag experience designed for comfort, flexibility, and participation at any pace or skill level.",
              icon: "company" // using 'company' icon which is building/business, generic enough or maybe swap to party
            },
            {
              title: "Schools, Churches & Youth Groups",
              description: "Bring groups together with supervised, teamwork-focused gameplay that encourages connection, communication, and shared fun.",
              icon: "party"
            }
          ]}
        />
        <FacilityPackages />
        <CTA />
        <EventsFAQ />
      </main>
    </>
  );
}
