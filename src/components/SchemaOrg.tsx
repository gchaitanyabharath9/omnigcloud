import React from 'react';

const SchemaOrg = () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omnigcloud.com";

    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OmniGCloud",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "description": "Global Cloud-Agnostic Modernization & AI Engineering platform for enterprise sovereignty.",
        "sameAs": [
            "https://twitter.com/omnigcloud",
            "https://www.linkedin.com/company/omnigcloud"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-800-OMNIGCLOUD",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["English", "Spanish", "French", "German", "Chinese", "Hindi", "Japanese"]
        }
    };

    const softwareSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "OmniGCloud Platform",
        "operatingSystem": "Cloud-Native",
        "applicationCategory": "EnterpriseSoftware",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />
        </>
    );
};

export default SchemaOrg;
