"use client";

import { useEffect } from 'react';

/**
 * ScrollManager ensures that Page Down / Page Up / Space keys 
 * navigate perfectly between .snap-section elements.
 */
export default function ScrollManager() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle if not in an input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const isPageDown = e.key === 'PageDown';
            const isPageUp = e.key === 'PageUp';
            const isSpace = e.key === ' ' && !e.shiftKey;
            const isShiftSpace = e.key === ' ' && e.shiftKey;

            if (isPageDown || isPageUp || isSpace || isShiftSpace) {
                e.preventDefault();

                const sections = Array.from(document.querySelectorAll('.snap-section'));
                if (sections.length === 0) return;

                // Current scroll position + small buffer
                const currentScroll = window.scrollY + 100;

                let targetSection: Element | null = null;

                if (isPageDown || isSpace) {
                    // Find the first section whose top is below current scroll
                    targetSection = sections.find(section => {
                        const rect = section.getBoundingClientRect();
                        return rect.top > 80; // Buffer for header
                    }) || null;
                } else if (isPageUp || isShiftSpace) {
                    // Find the last section whose top is above current scroll
                    const reversedSections = [...sections].reverse();
                    targetSection = reversedSections.find(section => {
                        const rect = section.getBoundingClientRect();
                        return rect.top < -80; // Buffer for header
                    }) || null;
                }

                if (targetSection) {
                    const headerOffset = 70;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return null; // This component doesn't render anything
}
