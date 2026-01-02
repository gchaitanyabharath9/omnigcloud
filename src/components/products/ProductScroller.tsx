"use client";

import React, { useEffect } from 'react';
import ProductDetailView from './ProductDetailView';
import { PageShell } from '@/components/layout/PageShell';

interface ProductScrollerProps {
    activeProduct: string;
    products: any[];
}

export default function ProductScroller({ activeProduct, products }: ProductScrollerProps) {
    useEffect(() => {
        const element = document.getElementById(activeProduct);
        if (element) {
            // Add a small delay to ensure rendering is complete
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [activeProduct]);

    return (
        <div className="flex flex-col w-full max-w-full mx-auto pb-32">
            {products.map((product) => {
                return (
                    <div
                        key={product.id}
                        id={product.id}
                        className="w-full flex flex-col justify-start relative border-b border-white/5 last:border-0"
                        // Force each section to be at least a full viewport height for "page" feel
                        // scrollMarginTop accounts for the fixed header so content starts cleanly below it
                        style={{
                            minHeight: '100vh',
                            paddingTop: '2rem',
                            paddingBottom: '4rem',
                            scrollMarginTop: '140px'
                        }}
                    >
                        <PageShell>
                            <ProductDetailView {...product} />
                        </PageShell>
                    </div>
                );
            })}
        </div>
    );
}
