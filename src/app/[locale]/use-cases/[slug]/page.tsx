import { getTranslations, getLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/navigation";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Section } from "@/components/layout/Section";
import { PageShell } from "@/components/layout/PageShell";
import { USE_CASES } from "@/data/use-cases";
import Grid2x2Section from "@/components/layout/Grid2x2Section";

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const t = await getTranslations("UseCases");
  const locale = await getLocale();
  const { slug } = await params;

  const useCase = USE_CASES.find((uc) => uc.id === slug);

  if (!useCase) {
    notFound();
  }

  return (
    <div className="animate-fade-in">
      <Section
        className="py-20 border-b border-white/10"
        style={{ background: "var(--bg-surface-2)" }}
      >
        <PageShell>
          <Link
            href="/use-cases"
            className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={16} /> {t("allUseCases")}
          </Link>

          <div className="max-w-4xl">
            <div className="badge badge-primary-subtle mb-4">
              {useCase.icon}{" "}
              <span className="ml-2 uppercase tracking-widest text-[0.7rem] font-black">
                {t(`${useCase.id}.tag`)}
              </span>
            </div>
            <h1 className="text-6xl font-black mb-6 leading-[1.1] tracking-tight">
              {t(`${useCase.id}.title`)}
            </h1>
            <p className="text-xl opacity-80 mb-12 leading-relaxed max-w-2xl">
              {t(`${useCase.id}.description`)}
            </p>
          </div>

          <div className="mt-12">
            <Grid2x2Section
              {...useCase}
              title={t(`${useCase.id}.title`)}
              tag={t(`${useCase.id}.tag`)}
              description={t(`${useCase.id}.description`)}
              explanation={t(`${useCase.id}.explanation`)}
              darkBg={false}
              reverse={false}
            />
          </div>
        </PageShell>
      </Section>

      {/* SITEMAP / FOOTER */}
      <Section
        id="footer"
        className="snap-section"
        style={{ background: "var(--background)", borderTop: "1px solid var(--card-border)" }}
      >
        <Footer />
      </Section>
    </div>
  );
}

export async function generateStaticParams() {
  const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
  return locales.flatMap((locale) => USE_CASES.map((uc) => ({ locale, slug: uc.id })));
}
