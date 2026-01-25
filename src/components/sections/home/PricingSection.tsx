import Link from "next/link";
import { CheckCircle, Shield } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function PricingSection() {
  const locale = useLocale();
  const t = useTranslations("HomeSections.Pricing");

  return (
    <section className="snap-section">
      <div
        className="bg-cover-overlay"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 60%)",
        }}
      ></div>
      <div className="container">
        <div className="section-title-group">
          <h2 className="mb-2">{t("title")}</h2>
          <p className="text-section-lead">{t("subtitle")}</p>
        </div>

        <div className="grid-3 gap-6 items-stretch">
          {/* STARTER */}
          <div className="card-pricing">
            <div className="mb-6">
              <div className="pricing-badge" style={{ color: "var(--primary)" }}>
                {t("core.badge")}
              </div>
              <div className="pricing-price">
                {t("core.price")}
                <span className="text-base font-medium opacity-60"> {t("core.unit")}</span>
              </div>
              <p className="mt-2 opacity-60 text-sm">{t("core.desc")}</p>
            </div>
            <div className="pricing-features">
              {[
                t("core.features.nodes"),
                t("core.features.drift"),
                t("core.features.sla"),
                t("core.features.support"),
              ].map((feat, i) => (
                <div key={i} className="pricing-feature-item">
                  <CheckCircle size={16} color="var(--primary)" /> {feat}
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/pricing`}
              className="btn-secondary text-center rounded-xl font-bold p-3"
            >
              {t("core.cta")}
            </Link>
          </div>

          {/* ENTERPRISE */}
          <div className="card-pricing popular">
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-black text-xs font-black py-1 px-3 rounded-full"
              style={{ background: "var(--primary)" }}
            >
              {t("enterprise.popular")}
            </div>
            <div className="mb-6">
              <div className="pricing-badge" style={{ color: "var(--primary)" }}>
                {t("enterprise.badge")}
              </div>
              <div className="pricing-price">{t("enterprise.price")}</div>
              <p className="mt-2 opacity-60 text-sm">{t("enterprise.desc")}</p>
            </div>
            <div className="pricing-features">
              {[
                t("enterprise.features.nodes"),
                t("enterprise.features.remediation"),
                t("enterprise.features.finops"),
                t("enterprise.features.rbac"),
                t("enterprise.features.support"),
              ].map((feat, i) => (
                <div key={i} className="pricing-feature-item font-medium">
                  <CheckCircle
                    size={16}
                    color="var(--primary)"
                    fill="var(--primary)"
                    style={{ color: "#000" }}
                  />{" "}
                  {feat}
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn-primary text-center rounded-xl font-bold p-3"
            >
              {t("enterprise.cta")}
            </Link>
          </div>

          {/* FEDERAL */}
          <div className="card-pricing">
            <div className="mb-6">
              <div className="pricing-badge" style={{ color: "#60efff" }}>
                {t("federal.badge")}
              </div>
              <div className="pricing-price">{t("federal.price")}</div>
              <p className="mt-2 opacity-60 text-sm">{t("federal.desc")}</p>
            </div>
            <div className="pricing-features">
              {[
                t("federal.features.onprem"),
                t("federal.features.byok"),
                t("federal.features.security"),
                t("federal.features.audit"),
              ].map((feat, i) => (
                <div key={i} className="pricing-feature-item">
                  <Shield size={16} color="#60efff" /> {feat}
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/contact`}
              className="btn-secondary text-center rounded-xl font-bold p-3"
            >
              {t("federal.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
