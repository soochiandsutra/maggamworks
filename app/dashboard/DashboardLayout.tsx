"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}

export function DashboardLayout({ header, main, footer }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {header}
      <main className="pb-16">
        {main}
      </main>
      {footer}
    </div>
  );
}
