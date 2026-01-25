import { useTranslations } from "next-intl";

export default function IntegrationsSection() {
  const t = useTranslations("Platform.integrations");
  return (
    <section
      id="integrations"
      className="snap-section container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--section-pt)",
        paddingBottom: "4rem",
      }}
    >
      <div className="w-full">
        <div className="section-title-group text-center mb-12">
          <h2 className="mb-2">{t("title")}</h2>
          <p className="text-section-lead text-center mx-auto">{t("subtitle")}</p>
        </div>

        {/* Infrastructure - Text List */}
        <div className="card-feature p-8">
          <h4 className="text-lg font-bold mb-4 text-cyan-400">{t("infra")}</h4>
          <div className="flex flex-wrap gap-2">
            {["Terraform", "Ansible", "Helm", "Kubernetes"].map((t) => (
              <span key={t} className="badge bg-white/5 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Observability - Image Overlay */}
        <div className="img-card-container">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Metrics"
            className="img-cover opacity-60"
          />
          <div
            className="card-overlay"
            style={{
              background:
                "linear-gradient(0deg, rgba(2,6,23,0.9) 20%, rgba(147, 51, 234, 0.3) 100%)",
            }}
          ></div>
          <div className="card-content-overlay p-8 justify-end">
            <h4 className="text-lg font-bold mb-4 text-purple-400">{t("obs")}</h4>
            <div className="flex flex-wrap gap-2">
              {["Datadog", "Prometheus", "Grafana", "Splunk"].map((t) => (
                <span key={t} className="badge bg-black/40 border border-white/20 backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery - Text List */}
        <div className="card-feature p-8">
          <h4 className="text-lg font-bold mb-4 text-emerald-400">{t("delivery")}</h4>
          <div className="flex flex-wrap gap-2">
            {["GitHub", "GitLab", "Jenkins", "ArgoCD"].map((t) => (
              <span key={t} className="badge bg-white/5 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Identity - Image Overlay */}
        <div className="img-card-container">
          <img
            src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80"
            alt="Security"
            className="img-cover opacity-60"
          />
          <div
            className="card-overlay"
            style={{
              background:
                "linear-gradient(0deg, rgba(2,6,23,0.9) 20%, rgba(251, 191, 36, 0.3) 100%)",
            }}
          ></div>
          <div className="card-content-overlay p-8 justify-end">
            <h4 className="text-lg font-bold mb-4 text-amber-400">{t("identity")}</h4>
            <div className="flex flex-wrap gap-2">
              {["Okta", "Auth0", "Vault", "CyberArk"].map((t) => (
                <span key={t} className="badge bg-black/40 border border-white/20 backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
