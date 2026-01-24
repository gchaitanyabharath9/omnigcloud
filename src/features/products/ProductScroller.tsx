"use client";

import React, { useEffect } from 'react';
import ProductDetailView from './ProductDetailView';

interface ProductScrollerProps {
    activeProduct: string;
    products: any[];
}

export default function ProductScroller({ activeProduct, products }: ProductScrollerProps) {
    // Rely on global HashScrollHandler
    return (
        <div className="flex flex-col w-full max-w-full mx-auto pb-32">
            {products.map((product) => {
                return (
                    <section
                        key={product.id}
                        id={product.id}
                        data-testid={`product-section-${product.id}`}
                        className="w-full flex flex-col justify-start relative border-b border-white/5 last:border-0"
                        // Force each section to be at least a full viewport height for "page" feel
                        // scrollMarginTop accounts for the fixed header so content starts cleanly below it
                        style={{
                            minHeight: 'calc(100vh - var(--header-height) - var(--breadcrumb-height))',
                            paddingTop: '2rem',
                            paddingBottom: '4rem',
                            scrollMarginTop: 'calc(var(--header-height) + var(--breadcrumb-height))'
                        }}
                    >
                        <div className="container">
                            <ProductDetailView {...product} />
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
