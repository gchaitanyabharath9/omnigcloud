"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RelatedArticle {
    title: string;
    excerpt: string;
    href: string;
    category: string;
}

interface RelatedReadingProps {
    articles: RelatedArticle[];
    locale?: string;
}

export default function RelatedReading({ articles, locale = 'en' }: RelatedReadingProps) {
    const t = useTranslations('Components.Article.RelatedReading');
    return (
        <section className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">{t('title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article, idx) => (
                    <Link
                        key={idx}
                        href={article.href.startsWith('/') ? article.href : `/${locale}${article.href}`}
                        className="group block p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                    >
                        <span className="text-xs font-semibold text-primary tracking-wider uppercase mb-2 block">
                            {article.category}
                        </span>
                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center text-sm font-medium text-foreground group-hover:translate-x-1 transition-transform">
                            {t('readAnalysis')} <ArrowRight size={14} className="ml-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
