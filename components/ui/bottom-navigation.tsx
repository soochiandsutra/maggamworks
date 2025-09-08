import React from "react";
import { Grid3X3, Shirt, RotateCcw, Hand, Calculator, Clock, Star, Settings, Filter, Box, Sparkles, Palette, MoreHorizontal } from "lucide-react";
import { Button } from "./button";

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onCalculateClick?: () => void;
  activeSecondaryTab?: string;
  onSecondaryTabChange?: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = "all",
  onTabChange,
  onCalculateClick,
  activeSecondaryTab,
  onSecondaryTabChange
}) => {
  const tabs = [
    { id: "all", icon: Grid3X3, label: "ALL" },
    { id: "front", icon: Shirt, label: "Front" },
    { id: "back", icon: RotateCcw, label: "Back" },
    { id: "hands", icon: Hand, label: "Hands" },
  ];

  // Secondary navigation items for each section
  const getSecondaryNavItems = (activeTab: string) => {
    switch (activeTab) {
      case "all":
        return [
          { id: "recent", icon: Clock, label: "Recent" },
          { id: "favorites", icon: Star, label: "Favorites" },
          { id: "filter", icon: Filter, label: "Filter" },
        ];
      case "front":
        return [
          { id: "neck", icon: Shirt, label: "Neck" },
          { id: "borders", icon: Settings, label: "Borders" },
          { id: "motifs", icon: Sparkles, label: "Motifs" },
          { id: "fill-work", icon: Palette, label: "Fill Work" },
          { id: "others", icon: MoreHorizontal, label: "Others" },
        ];
      case "back":
        return [
          { id: "seam", icon: Settings, label: "Seam" },
          { id: "embroidery", icon: Star, label: "Embroidery" },
          { id: "vent", icon: Filter, label: "Vent" },
        ];
      case "hands":
        return [
          { id: "stitching", icon: Settings, label: "Stitching" },
          { id: "pressing", icon: Star, label: "Pressing" },
          { id: "finishing", icon: Filter, label: "Finishing" },
        ];
      default:
        return [];
    }
  };

  const secondaryNavItems = getSecondaryNavItems(activeTab);

  return (
    <>
      {/* Secondary Bottom Bar */}
      {secondaryNavItems.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-muted/30 border-t border-border/50 z-30">
          <div className="flex items-center justify-center px-2 pt-2 pb-3">
            <div className="flex items-center justify-between flex-1 max-w-lg">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isSecondaryActive = activeSecondaryTab === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    className={`flex flex-col items-center gap-1 h-auto py-2 px-3 flex-1 relative rounded-lg transition-all duration-200 ${
                      isSecondaryActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    onClick={() => onSecondaryTabChange?.(item.id)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs font-medium">{item.label}</span>
                    {isSecondaryActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Navigation Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40`}>
        <div className="flex items-center justify-center px-2 py-2 pb-safe">
          {/* All navigation items evenly spaced */}
          <div className="flex items-center justify-between flex-1 max-w-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-2 flex-1 relative rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => onTabChange?.(tab.id)}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                  )}
                </Button>
              );
            })}

            {/* Calculate Button - Same size as other buttons */}
            <Button
              variant="default"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2 px-2 flex-1 relative rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
              onClick={onCalculateClick}
            >
              <Calculator className="h-5 w-5" />
              <span className="text-xs font-medium">Calc</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Safe area padding for mobile devices - accounting for both bars */}
      <div className="h-28" />
    </>
  );
};

export default BottomNavigation;
