import React from "react";
import { ShieldCheck, Lock, Globe, FileText } from "lucide-react";

const ComplianceBadges = () => {
  const badges = [
    { icon: <ShieldCheck size={14} />, name: "SOC2 TYPE II" },
    { icon: <Lock size={14} />, name: "GDPR COMPLIANT" },
    { icon: <FileText size={14} />, name: "ISO 27001" },
    { icon: <Globe size={14} />, name: "HIPAA READY" },
  ];

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex items-center gap-2 group cursor-help">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md hover:border-primary/40 hover:bg-white/[0.07] transition-all duration-300">
            <div className="text-primary opacity-60 group-hover:opacity-100 transition-opacity">
              {badge.icon}
            </div>
            <span className="text-[10px] font-black text-foreground/60 uppercase tracking-widest group-hover:text-foreground transition-colors">
              {badge.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComplianceBadges;
