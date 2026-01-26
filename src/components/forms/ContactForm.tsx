"use client";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Globe,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Home,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm({ translations }: { translations?: any }) {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const err = await response.json();
        setErrorMessage(err.message || t("errorGeneric"));
        setStatus("error");
      }
    } catch (_err) {
      setErrorMessage(t("errorMessage"));
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            height: "80px",
            width: "80px",
            background: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 2rem",
          }}
        >
          <Send size={40} />
        </div>
        <h3 style={{ color: "white", fontSize: "1.8rem", fontWeight: 800, marginBottom: "1rem" }}>
          {t("successTitle")}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          {t("successMessage")} <br />{" "}
          <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#60efff" }}>
            TICKET_ID: SOV-77X-BETA
          </span>
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "2rem",
            color: "#60efff",
            background: "none",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {t("newSession")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
    >
      <div className="grid-2" style={{ gap: "1.2rem" }}>
        <input
          name="firstName"
          required
          type="text"
          placeholder={t("firstName")}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "1rem",
            color: "white",
            width: "100%",
          }}
        />
        <input
          name="lastName"
          required
          type="text"
          placeholder={t("lastName")}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "1rem",
            borderRadius: "1rem",
            color: "white",
            width: "100%",
          }}
        />
      </div>
      {/* Honeypot field for bot protection */}
      <div style={{ display: "none" }}>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input
        name="email"
        required
        type="email"
        placeholder={t("email")}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem",
          borderRadius: "1rem",
          color: "white",
          width: "100%",
        }}
      />
      <textarea
        name="message"
        required
        rows={4}
        placeholder={t("message")}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem",
          borderRadius: "1rem",
          color: "white",
          resize: "none",
          width: "100%",
        }}
      ></textarea>
      <button
        disabled={status === "submitting"}
        type="submit"
        className="btn-primary"
        style={{
          padding: "1.2rem",
          borderRadius: "1rem",
          fontWeight: 900,
          background: "#3b82f6",
          borderColor: "#3b82f6",
          width: "100%",
        }}
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
      {status === "error" && (
        <p
          style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.5rem", textAlign: "center" }}
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
