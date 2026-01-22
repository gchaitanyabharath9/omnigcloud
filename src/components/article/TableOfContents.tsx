"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const t = useTranslations('Components.Article.TableOfContents');
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3"))
            .map((elem) => ({
                id: elem.id,
                text: elem.textContent || "",
                level: Number(elem.tagName.substring(1)),
            }));
        setHeadings(elements);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -40% 0px" }
        );

        elements.forEach((elem) => {
            const el = document.getElementById(elem.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 w-64 flex-shrink-0 h-fit pl-4 border-l border-border/40">
            <p className="font-semibold text-sm mb-4 text-foreground uppercase tracking-widest">{t('title')}</p>
            <ul className="space-y-3 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: heading.level === 3 ? '1rem' : '0' }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block transition-colors hover:text-primary ${activeId === heading.id
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                                    behavior: "smooth"
                                });
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
