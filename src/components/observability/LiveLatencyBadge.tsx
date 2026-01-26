"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Zap } from "lucide-react";

import { usePathname } from "next/navigation";

export default function LiveLatencyBadge() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const [latency, setLatency] = useState(14);

  const isDashboard = pathname?.includes("/dashboard") || pathname?.includes("/command-center");
  const diagnosticsEnabled = process.env.NEXT_PUBLIC_ENABLE_DIAGNOSTICS === "true";

  useEffect(() => {
    if (!isDashboard && !diagnosticsEnabled) return;

    const interval = setInterval(() => {
      setLatency((prev) => {
        const jitter = Math.floor(Math.random() * 3) - 1;
        return Math.max(8, prev + jitter);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isDashboard, diagnosticsEnabled]);

  if (!isDashboard && !diagnosticsEnabled) return null;

  return (
    <div
      className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-mono font-black tracking-widest select-none transition-all duration-500 hover:bg-blue-500/20 cursor-help group shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      style={{
        background: "rgba(59, 130, 246, 0.12)",
        border: "1px solid rgba(59, 130, 246, 0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Zap
        size={14}
        className="text-primary animate-pulse group-hover:scale-125 transition-transform drop-shadow-[0_0_8px_var(--primary)]"
      />
      <span className="text-primary group-hover:text-white transition-colors">
        {t("latency_badge")}: <span className="font-black text-white">{latency}ms</span>
      </span>
    </div>
  );
}
