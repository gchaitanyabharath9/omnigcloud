import { Cloud, Server, Zap, BarChart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CloudFactorySection() {
  const t = useTranslations("Services.Migration");
  return (
    <section
      id="cloud-factory"
      className="snap-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--section-pt)",
      }}
    >
      <div className="container">
        <div className="section-title-group">
          <h2 className="mb-2">{t("title")}</h2>
          <p className="text-section-lead">{t("subtitle")}</p>
        </div>

        {/* Card 1: Azure - Image */}
        <div className="img-card-container">
          <img
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
            alt="Azure Data Center"
            className="img-cover"
          />
          <div
            className="card-overlay"
            style={{
              background:
                "linear-gradient(0deg, rgba(2,6,23,0.95) 40%, rgba(59, 130, 246, 0.2) 100%)",
            }}
          ></div>
          <div className="card-content-overlay p-6 justify-end">
            <div className="mb-2 p-2 rounded-lg bg-blue-500/20 w-fit border border-blue-500/30">
              <Cloud size={24} color="#3b82f6" />
            </div>
            <h3 className="card-title">{t("azure.title")}</h3>
            <p className="card-body text-white/80">{t("azure.desc")}</p>
          </div>
        </div>

        {/* Card 2: OCP - Content/Text (Reverted from Image) */}
        <div className="card-feature justify-center relative overflow-hidden group">
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle at top right, rgba(239, 68, 68, 0.1), transparent 50%)",
            }}
          ></div>
          <div className="flex justify-between items-start w-full mb-4 relative z-10">
            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <Server size={32} color="#ef4444" />
            </div>
            <div className="dashboard-console p-2 text-tiny font-mono bg-black/40 border border-white/5 rounded">
              <span className="text-red-400">$</span> ocp-install --dir=./config
            </div>
          </div>
          <h3 className="card-title relative z-10">{t("ocp.title")}</h3>
          <p className="card-body relative z-10">{t("ocp.desc")}</p>
        </div>

        {/* Card 3: Provisioning - Image */}
        <div className="img-card-container">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
            alt="Circuit Board"
            className="img-cover"
          />
          <div
            className="card-overlay"
            style={{
              background:
                "linear-gradient(0deg, rgba(2,6,23,0.95) 40%, rgba(96, 239, 255, 0.2) 100%)",
            }}
          ></div>
          <div className="card-content-overlay p-6 justify-end">
            <div className="flex justify-between items-start w-full mb-4">
              <div className="p-2 bg-cyan-500/20 rounded border border-cyan-500/30 backdrop-blur">
                <Zap size={24} color="#60efff" />
              </div>
              <div className="text-mono text-tiny text-cyan-400 font-bold bg-black/50 px-2 py-1 rounded">
                AVG_TIME: 14m 32s
              </div>
            </div>
            <h3 className="card-title">{t("provisioning.title")}</h3>
            <p className="card-body text-white/80">{t("provisioning.desc")}</p>
          </div>
        </div>

        {/* Card 4: Drift Cost - Content/Text (Reverted from Image) */}
        <div className="card-feature justify-center relative overflow-hidden">
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.1), transparent 50%)",
            }}
          ></div>
          <div className="flex justify-between items-start w-full mb-4 relative z-10">
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <BarChart size={32} color="#10b981" />
            </div>
            <div className="text-2xl font-black text-emerald-500 tracking-tight">$0.00</div>
          </div>
          <h3 className="card-title relative z-10">{t("drift.title")}</h3>
          <p className="card-body relative z-10">{t("drift.desc")}</p>
        </div>
      </div>
    </section>
  );
}
