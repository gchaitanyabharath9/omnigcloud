"use client";

import React, { useEffect, useState } from "react";

import { DemoChartPlaceholder } from "../demo/DemoChartPlaceholder";

export default function NoSSR({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <DemoChartPlaceholder />;

  return <>{children}</>;
}
