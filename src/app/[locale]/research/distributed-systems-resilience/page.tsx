import { Metadata } from "next";
import { generateSEOMetadata, SEO_KEYWORDS } from "@/utils/seo";
import { getTranslations } from "next-intl/server";
import AuthorBio from "@/components/article/AuthorBio";
import RelatedReading from "@/components/article/RelatedReading";
import TableOfContents from "@/components/article/TableOfContents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateSEOMetadata(
    {
      title: "Distributed Systems Resilience & Scalability Patterns",
      description:
        "Deep dive into CAP theorem, chaos engineering, and patterns for building unbreakable distributed systems in the cloud.",
      keywords: [
        ...SEO_KEYWORDS.performance,
        "distributed systems",
        "resilience",
        "cap theorem",
        "chaos engineering",
        "circuit breaker",
        "system scalability",
      ],
      canonical: `https://www.omnigcloud.com/${locale}/research/distributed-systems-resilience`,
      ogImage: "https://www.omnigcloud.com/og-images/research/distributed-systems.png",
      ogType: "article",
      author: "Chaitanya Bharath Gopu",
      publishedTime: "2025-01-05T10:00:00.000Z",
      section: "Research",
      tags: ["distributed systems", "resilience", "engineering"],
    },
    locale
  );
}

export default async function DistributedSystemsResiliencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ResearchPages.distributedSystems" });

  return (
    <article className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <main className="flex-1 max-w-4xl">
            <header className="mb-12">
              <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
                {t("header.category")}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                {t("header.title")}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("header.description")}
              </p>
              <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground font-mono">
                <span>{t("header.lastUpdated")}</span>
                <span>•</span>
                <span>{t("header.readTime")}</span>
              </div>
            </header>

            <div className="prose prose-lg prose-invert max-w-none">
              <p>{t("intro")}</p>

              <h2 id="cap-theorem" className="scroll-mt-24">
                {t("section1.title")}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw("section1.p1") }} />
              <p>
                {t("section1.p2")}
                <br />
                <span dangerouslySetInnerHTML={{ __html: t.raw("section1.strategy") }} />
              </p>

              <h2 id="circuit-breaker" className="scroll-mt-24">
                {t("section2.title")}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw("section2.description") }} />
              <ul>
                <li dangerouslySetInnerHTML={{ __html: t.raw("section2.states.closed") }} />
                <li dangerouslySetInnerHTML={{ __html: t.raw("section2.states.open") }} />
                <li dangerouslySetInnerHTML={{ __html: t.raw("section2.states.halfOpen") }} />
              </ul>

              <h2 id="bulkhead" className="scroll-mt-24">
                {t("section3.title")}
              </h2>
              <p>{t("section3.description")}</p>

              <h2 id="chaos-engineering" className="scroll-mt-24">
                {t("section4.title")}
              </h2>
              <p>{t("section4.description")}</p>
              <div className="my-8 p-6 bg-card border border-primary/20 rounded-xl">
                <h3 className="text-lg font-bold text-primary mb-2">
                  {t("section4.hypothesisTitle")}
                </h3>
                <p className="text-sm">{t("section4.hypothesis")}</p>
              </div>

              <h2 id="idempotency" className="scroll-mt-24">
                {t("section5.title")}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw("section5.description") }} />
            </div>

            <AuthorBio />

            <RelatedReading
              locale={locale}
              articles={[
                {
                  title: t("relatedReading.0.title"),
                  excerpt: t("relatedReading.0.excerpt"),
                  href: "/architecture/cloud-native-reference-architecture",
                  category: t("relatedReading.0.category"),
                },
                {
                  title: t("relatedReading.1.title"),
                  excerpt: t("relatedReading.1.excerpt"),
                  href: "/architecture/ai-driven-enterprise-observability",
                  category: t("relatedReading.1.category"),
                },
                {
                  title: t("relatedReading.2.title"),
                  excerpt: t("relatedReading.2.excerpt"),
                  href: "/security",
                  category: t("relatedReading.2.category"),
                },
              ]}
            />
          </main>

          <aside className="hidden lg:block w-72 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </article>
  );
}
