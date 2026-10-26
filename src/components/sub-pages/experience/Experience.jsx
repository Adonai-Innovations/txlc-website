import React from "react";
import SEOHead from "../../seo/SEOHead";
import ExperienceHero from "./ExperienceHero";
import Map from "./Map";
import ExperienceContent from "./ExperienceContent";
import Carousel from "./Carousel";
import GameModes from "./GameModes";
import { VideoSection } from "../../key-components/VideoEmbed";
import PosterSection from "../../key-components/PosterSection";

const experienceSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://txlasercombat.com/experience#webpage",
    "url": "https://txlasercombat.com/experience",
    "name": "The Experience | 15,000 Sq Ft Wasteland Arena & Weapons – Texas Laser Combat Plano",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "Experience", "item": "https://txlasercombat.com/experience" }
      ]
    },
    "isPartOf": { "@id": "https://txlasercombat.com/#business" }
  },
  {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Texas Laser Combat Arena",
    "description": "15,000 square foot immersive wasteland-themed laser tag arena in Plano, TX. Features multi-level gameplay, vibration-feedback headsets, and over 18 laser tag weapons including rifles, SMGs, and sniper rifles.",
    "url": "https://txlasercombat.com/experience",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2300 Coit Road (off Irvine Drive) #400",
      "addressLocality": "Plano",
      "addressRegion": "TX",
      "postalCode": "75075",
      "addressCountry": "US"
    }
  }
];

/** Board-approved walkthrough videos (ADO-427). */
const EXPERIENCE_VIDEOS = [
  {
    videoId: "i7aFh2zfy8o",
    title: "Texas Laser Combat — arena walkthrough",
    caption: "A look inside the 15,000 sq ft wasteland arena.",
  },
  {
    videoId: "56UIgeUjSNo",
    title: "Texas Laser Combat — gameplay",
    caption: "Mission-based gameplay as it actually runs.",
  },
];

export default function ExperiencePage() {
  return (
    <>
      <SEOHead
        title="The Experience | 15,000 Sq Ft Wasteland Arena & Arsenal in Plano, TX"
        description="Explore Texas Laser Combat's 15,000 sq ft immersive wasteland-themed laser tag arena in Plano, TX. Over 18 weapons, vibration-feedback headsets, multi-level gameplay, and amenities for the ultimate tactical experience."
        canonical="/experience"
        schema={experienceSchema}
      />
      <main>
        <ExperienceHero />
        <Carousel />
        <PosterSection
          heading="Weapons compared"
          subheading="Every weapon in the arsenal, by level — fire type, damage, fire rate and ammo."
          src="/experience/weapons-compare.webp"
          alt="Weapons comparison matrix listing each Texas Laser Combat weapon by level with its fire type, damage, fire rate and ammo."
          maxWidth="md"
        />
        <VideoSection
          heading="See it in action"
          subheading="Two short walkthroughs of the arena and a live session."
          videos={EXPERIENCE_VIDEOS}
        />
        <GameModes />
        {/*
          ADO-437: the client wants the drone flythrough video and this field map
          to replace the Panoee walkthrough below. The flythrough is still
          pending delivery, so the walkthrough stays until it lands.
        */}
        <PosterSection
          heading="Know the ground"
          subheading="Barter Town, the Bot-Tec buildings, Atomic Gas, the Toxic Dump and both spawns."
          src="/experience/arena-map.webp"
          alt="Field map of the Texas Laser Combat arena showing Barter Town, three shelter buildings, two Bot-Tec buildings, the train, the missile, Atomic Gas, the house, the toxic dump, Pew-Pew Depot and the bunker and station spawns."
          background="#f4f4f1"
          maxWidth="lg"
        />
        <Map fit="contain" backdrop="#111" />
        <ExperienceContent />
      </main>
    </>
  );
}
