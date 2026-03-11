import React from 'react';
import PrivacyHero from './PrivacyHero';
import PrivacyContent from './PrivacyContent';
import Contact from '../../key-components/Contact';
import CTA from '../../key-components/CTA';

export default function PrivacyPage() {
    return (
        <>
            <PrivacyHero />
            <PrivacyContent />
            <CTA />
            <Contact />
        </>
    );
}
