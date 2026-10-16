import React from 'react'
import SEOHead from '../../seo/SEOHead'
import { FAQ, toSchemaQuestion } from '../../../lib/site-facts'

// About page components
import AboutHero from './AboutHero'
import AboutTestimonials from './AboutTestimonials'
import Community from './Community';
import AboutContent from './AboutContent'
import CTA from '../../key-components/CTA'
import AboutFAQ from './AboutFAQ'
import Contact from '../../key-components/Contact'
import Apply from '../../landing/Apply'

const aboutSchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://txlasercombat.com/about#webpage",
    "url": "https://txlasercombat.com/about",
    "name": "About Texas Laser Combat | Veteran & Woman-Owned Laser Tag in Plano, TX",
    "description": "Learn about Texas Laser Combat — a veteran and woman-owned family business bringing premier tactical laser tag to Plano, TX. 15,000 sq ft wasteland-themed arena for ages 7+.",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://txlasercombat.com" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://txlasercombat.com/about" }
      ]
    },
    "isPartOf": { "@id": "https://txlasercombat.com/#business" }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      toSchemaQuestion(FAQ.cancellation),
      toSchemaQuestion(FAQ.sessionLength, "How long is a laser tag session at Texas Laser Combat?"),
      toSchemaQuestion(FAQ.age, "Are there age or height restrictions to play laser tag?"),
      toSchemaQuestion(FAQ.parentArea, "Is there a parent viewing area at Texas Laser Combat?"),
      toSchemaQuestion(FAQ.whatToWear)
    ]
  }
];

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Us | Veteran & Woman-Owned Laser Tag in Plano, TX"
        description="Texas Laser Combat is a veteran and woman-owned family business in Plano, TX. Discover our 15,000 sq ft immersive wasteland arena, mission-based gameplay, and community-first mission for ages 7+."
        canonical="/about"
        schema={aboutSchema}
      />
      <main>
        <AboutHero />
        <AboutContent />
        <AboutTestimonials />
        <Community />
        <CTA />
        <AboutFAQ />
        <Apply />
        <Contact />
      </main>
    </>
  );
}