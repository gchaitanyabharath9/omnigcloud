import { Brain, Database, Bot, BarChart, Server, Cpu, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function AiDataPage() {
  const t = await getTranslations("AiData");

  return (
    <section
      className="snap-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--section-pt)",
      }}
    >
      <div className="container">
        <div className="grid-2-strict items-center mb-12">
          {/* Left Column: Text Content */}
          <div className="flex-col gap-6">
            <div className="badge badge-primary-subtle w-fit">
              <Brain size={16} /> {t("hero.badge")}
            </div>
            <h1
              className="text-gradient"
              style={{ fontSize: "3.5rem", fontWeight: 950, lineHeight: 1.1 }}
            >
              {t.raw("hero.title")}
            </h1>
            <p style={{ fontSize: "1.25rem", opacity: 0.8, lineHeight: 1.6, maxWidth: "500px" }}>
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Right Column: Neural Network Visual (Constrained) */}
          <div
            className="glass-panel"
            style={{
              height: "400px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "var(--radius)",
              background: "radial-gradient(circle at center, #1e1b4b 0%, #020617 100%)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
              {/* CSS Dots acting as nodes */}
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "20%",
                  width: "10px",
                  height: "10px",
                  background: "#3b82f6",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px #3b82f6",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "40%",
                  width: "14px",
                  height: "14px",
                  background: "#8b5cf6",
                  borderRadius: "50%",
                  boxShadow: "0 0 15px #8b5cf6",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "70%",
                  width: "12px",
                  height: "12px",
                  background: "#ec4899",
                  borderRadius: "50%",
                  boxShadow: "0 0 12px #ec4899",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "70%",
                  left: "60%",
                  width: "10px",
                  height: "10px",
                  background: "#10b981",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px #10b981",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "60%",
                  left: "80%",
                  width: "8px",
                  height: "8px",
                  background: "#f59e0b",
                  borderRadius: "50%",
                  boxShadow: "0 0 8px #f59e0b",
                }}
              ></div>

              {/* CSS Lines connecting nodes */}
              <div
                style={{
                  position: "absolute",
                  top: "35%",
                  left: "21%",
                  width: "20%",
                  height: "1px",
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                  transformOrigin: "left",
                  transform: "rotate(15deg)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "41%",
                  width: "30%",
                  height: "1px",
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                  transformOrigin: "left",
                  transform: "rotate(-10deg)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "65%",
                  left: "60%",
                  width: "20%",
                  height: "1px",
                  background: "linear-gradient(90deg, #10b981, #f59e0b)",
                  transformOrigin: "left",
                  transform: "rotate(10deg)",
                }}
              ></div>
            </div>

            {/* Overlay Card */}
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
              <div
                style={{
                  backdropFilter: "blur(12px)",
                  padding: "1.5rem",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "1rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "0.25rem",
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {t("visual.title")}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>
                  {t("visual.subtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Generative AI - Text Card */}
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)" }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #7928ca 0%, #ff0080 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Brain size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.genAI.title")}
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                }}
              >
                {t("cards.genAI.desc")}
              </p>
            </div>
          </div>

          {/* Data Modernization - Converted to Image Card */}
          <div className="img-card-container">
            <img
              src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80"
              alt="Data Lake"
              className="img-cover"
            />
            <div
              className="card-overlay"
              style={{
                background:
                  "linear-gradient(0deg, rgba(2,6,23,0.9) 30%, rgba(59, 130, 246, 0.2) 100%)",
              }}
            ></div>
            <div className="card-content-overlay p-6 justify-end">
              <div className="mb-2 p-2 bg-blue-500/20 rounded backdrop-blur w-fit">
                <Database size={24} color="var(--primary)" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">{t("cards.dataMod.title")}</h3>
              <p className="text-sm text-white/80">{t("cards.dataMod.desc")}</p>
            </div>
          </div>

          {/* MLOps */}
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)" }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Cpu size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.mlOps.title")}
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                }}
              >
                {t("cards.mlOps.desc")}
              </p>
            </div>
          </div>
        </div>

        {/* Data Science Team Visual */}
        <div
          className="problem-statement-visual"
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
            position: "relative",
            margin: "4rem 0",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop"
            alt="Data scientists analyzing insights on multiple screens"
            style={{ width: "100%", display: "block", height: "450px", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
              padding: "3rem 2rem 2rem",
              color: "white",
            }}
          >
            <h3 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
              {t("visuals.dataDriven.title")}
            </h3>
            <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "800px" }}>
              {t("visuals.dataDriven.desc")}
            </p>
          </div>
        </div>

        {/* AI Engineering Visual */}
        <div
          className="problem-statement-visual"
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
            position: "relative",
            marginBottom: "4rem",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=700&fit=crop"
            alt="AI engineers working on machine learning models"
            style={{ width: "100%", display: "block", height: "450px", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
              padding: "3rem 2rem 2rem",
              color: "white",
            }}
          >
            <h3 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
              {t("visuals.enterpriseAI.title")}
            </h3>
            <p style={{ fontSize: "1.1rem", opacity: 0.9, maxWidth: "800px" }}>
              {t("visuals.enterpriseAI.desc")}
            </p>
          </div>
        </div>

        <div
          id="advanced-analytics"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
          }}
        >
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)", padding: 0 }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChart size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.predictive.title")}
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>
                {t("cards.predictive.desc")}
              </p>
            </div>
          </div>

          {/* AI Agents */}
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)", padding: 0 }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #ff0080 0%, #7928ca 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.agents.title")}
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>
                {t("cards.agents.desc")}
              </p>
            </div>
          </div>

          {/* Data Governance */}
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)", padding: 0 }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #64748b 0%, #0f172a 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Server size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.governance.title")}
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>
                {t("cards.governance.desc")}
              </p>
            </div>
          </div>

          {/* Vector Search */}
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)", padding: 0 }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #c026d3 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Database size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.vector.title")}
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>
                {t("cards.vector.desc")}
              </p>
            </div>
          </div>

          {/* Real-Time Analytics - Text Card */}
          <div
            className="glass-panel"
            style={{ overflow: "hidden", borderRadius: "var(--radius)", padding: 0 }}
          >
            <div
              style={{
                height: "80px",
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Zap size={28} color="white" />
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                {t("cards.streaming.title")}
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.95rem" }}>
                {t("cards.streaming.desc")}
              </p>
            </div>
          </div>

          {/* Computer Vision - Converted to Image Card */}
          <div className="img-card-container">
            <img
              src="https://images.unsplash.com/photo-1535378437327-b7149b32450a?w=800&q=80"
              alt="Computer Vision"
              className="img-cover"
            />
            <div
              className="card-overlay"
              style={{
                background:
                  "linear-gradient(0deg, rgba(2,6,23,0.9) 30%, rgba(236, 72, 153, 0.2) 100%)",
              }}
            ></div>
            <div className="card-content-overlay p-6 justify-end">
              <div className="mb-2 p-2 bg-pink-500/20 rounded backdrop-blur w-fit">
                <Bot size={24} color="#ec4899" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-white">{t("cards.vision.title")}</h3>
              <p className="text-sm text-white/80">{t("cards.vision.desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
