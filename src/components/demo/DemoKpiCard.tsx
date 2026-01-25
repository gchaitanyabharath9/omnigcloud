import React from "react";
import { DemoSparkline } from "./DemoSparkline";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface DemoKpiCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export const DemoKpiCard = ({
  label,
  value,
  trend,
  trendUp = true,
  color = "var(--primary)",
}: DemoKpiCardProps) => {
  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-primary/30 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        {trend && (
          <div
            className={`flex items-center gap-1 text-xs font-black ${trendUp ? "text-emerald-400" : "text-rose-400"}`}
          >
            {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend}
          </div>
        )}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="text-3xl font-black tracking-tight text-foreground">{value}</div>
        <div className="opacity-40 group-hover:opacity-100 transition-opacity">
          <DemoSparkline
            color={color}
            width={80}
            height={30}
            data={trendUp ? [10, 20, 15, 30, 25, 45] : [45, 30, 35, 20, 25, 10]}
          />
        </div>
      </div>
    </div>
  );
};
