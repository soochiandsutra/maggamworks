"use client";

import { useCalculations } from "@/hooks/use-calculations";
import { formatTime } from "@/utils/formatters";

interface DashboardHeaderProps {
  activeTab: string;
}

export function DashboardHeader({ activeTab }: DashboardHeaderProps) {
  const calculation = useCalculations();

  const getSectionTime = () => {
    switch (activeTab) {
      case "front":
        return calculation.breakdown.front.total;
      case "back":
        return calculation.breakdown.back.total;
      case "hands":
        return calculation.breakdown.hands.total;
      case "all":
      default:
        return calculation.breakdown.all.total;
    }
  };

  const getSectionLabel = () => {
    switch (activeTab) {
      case "front":
        return "Front";
      case "back":
        return "Back";
      case "hands":
        return "Hands";
      case "all":
      default:
        return "Base";
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-background via-background/95 to-background border-b border-border/50 backdrop-blur-sm">
      <div className="flex items-center justify-center px-6 py-4">
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-center min-w-[140px]">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Time</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {formatTime(calculation.totalTime)}
            </span>
          </div>
          
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent" />
          
          <div className="flex flex-col items-center min-w-[140px]">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{getSectionLabel()} Section</span>
            <span className="text-2xl font-bold text-foreground/90">
              {formatTime(getSectionTime())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
