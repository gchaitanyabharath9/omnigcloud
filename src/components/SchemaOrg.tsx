import React from 'react';
import {
    generateOrganizationSchema,
    generateSoftwareAppSchema,
    generateServiceSchema,
    generateWebSiteSchema
} from '@/utils/seo';
import { safeJsonLd } from '@/lib/security';

/**
 * Standardized Schema.org Structured Data
 * Injected globally into all pages for maximum SEO benefit.
 */
const SchemaOrg = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(generateOrganizationSchema() as any) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(generateSoftwareAppSchema() as any) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(generateServiceSchema() as any) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: safeJsonLd(generateWebSiteSchema() as any) }}
            />
        </>
    );
};

export default SchemaOrg;
