import { PRODUCTS } from "@/data/products";
import ProductDetailView from "@/features/products/ProductDetailView";
import ProductScroller from "@/features/products/ProductScroller";
import { notFound } from "next/navigation";
import React from "react";

// Generates static params for all products to be statically optimized
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.id,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Verify the slug exists in our products list
  const activeProduct = PRODUCTS.find((p) => p.id === slug);

  if (!activeProduct) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1600px]">
        {/* Render ALL products in a scrollable stream, active one first scrolled into view */}
        <ProductScroller activeProduct={slug} products={PRODUCTS} />
      </div>
    </div>
  );
}
