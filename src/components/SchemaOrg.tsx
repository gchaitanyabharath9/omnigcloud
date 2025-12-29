import React from 'react';

const SchemaOrg = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OmniGCloud",
        "url": "https://omnigcloud.com",
        "logo": "https://omnigcloud.com/logo.png",
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
            "availableLanguage": ["English", "French", "German", "Spanish"]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default SchemaOrg;
