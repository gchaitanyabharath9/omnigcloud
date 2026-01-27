import { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSEOMetadata } from "@/utils/seo";
import { papersManifest, PaperManifestItem } from "@/content/papers/papers.manifest";
import { PaperLanding } from "@/components/papers/PaperLanding";
import { getTranslations } from "next-intl/server";

// Generate params for all papers and locales
export function generateStaticParams() {
  const locales = ["en", "es", "fr", "de", "zh", "hi", "ja", "ko"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const paper of papersManifest) {
      params.push({ locale, slug: paper.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const paper = papersManifest.find((p) => p.slug === slug);

  if (!paper) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "Papers" });
  const getLocalKey = (fullKey: string) => fullKey.replace("Papers.", "");

  const title = t(getLocalKey(paper.titleKey));
  const description = t(getLocalKey(paper.subtitleKey));

  return generateSEOMetadata(
    {
      title: `${title} | OmniGCloud Research`,
      description,
      canonical: `https://www.omnigcloud.com/${locale}/research/papers/${slug}`,
    },
    locale
  );
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const paper = papersManifest.find((p) => p.slug === slug);

  if (!paper) {
    notFound();
  }

  return <PaperLanding paper={paper} locale={locale} />;
}
