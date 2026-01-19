import React from 'react';
import { config } from '@/config';

const SchemaOrg = () => {
    const siteUrl = config.site.url;

    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "OmniGCloud",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "description": "Global Cloud-Agnostic Modernization & AI Engineering platform for enterprise sovereignty.",
        "sameAs": [
            "https://twitter.com/omnigcloud",
            "https://www.linkedin.com/company/omnigcloud",
            "https://github.com/omnigcloud"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-212-OMNIGCLOUD",
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

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Cloud Modernization & AI Engineering",
        "provider": {
            "@type": "Organization",
            "name": "OmniGCloud"
        },
        "areaServed": "Global",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Cloud Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Azure Modernization"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "RedHat OpenShift Modernization"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Cloud Cost Optimization"
                    }
                }
            ]
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "OmniGCloud",
        "url": siteUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
        </>
    );
};

export default SchemaOrg;
