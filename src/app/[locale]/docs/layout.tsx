import React from "react";
import { DocsSidebar } from "@/components/navigation/DocsSidebar";
import { Container } from "@/components/ui/Container";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-[var(--header-height)] bg-background">
      <Container>
        <div className="grid grid-cols-[220px_1fr] gap-12 pt-5 items-start">
          <DocsSidebar />
          <main className="min-w-0 w-full relative">{children}</main>
        </div>
      </Container>
    </div>
  );
}
