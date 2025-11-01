"use client";

import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onDebugClick: () => void;
}

export function DashboardHeader({ onDebugClick }: DashboardHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Maggam Works Dashboard</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={onDebugClick}
          className="ml-auto"
        >
          🐛 Debug State
        </Button>
      </div>
    </div>
  );
}
