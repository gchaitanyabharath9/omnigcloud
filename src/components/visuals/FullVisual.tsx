"use client";

import React from "react";
import Image from "next/image";

interface FullVisualProps {
    imageSrc: string;
    children?: React.ReactNode;
    overlayOpacity?: number;
}

export const FullVisual: React.FC<FullVisualProps> = ({
    imageSrc,
    children,
    overlayOpacity = 0.4,
}) => {
    return (
        <div className="relative w-full h-full min-h-[350px] overflow-hidden rounded-[2rem] flex items-center justify-center">
            {/* Background Image */}
            <Image
                src={imageSrc}
                alt="Visual Background"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Dark/Glass Overlay */}
            <div
                className="absolute inset-0 z-10 backdrop-blur-[2px]"
                style={{ background: `rgba(0, 0, 0, ${overlayOpacity})` }}
            />

            {/* Gradient Vignette */}
            <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            {/* Content */}
            <div className="relative z-30 w-full h-full flex items-center justify-center p-8">
                {children}
            </div>
        </div>
    );
};
