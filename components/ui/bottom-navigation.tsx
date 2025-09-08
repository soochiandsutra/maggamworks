import React from "react";
import { Grid3X3, Shirt, RotateCcw, Hand, Plus } from "lucide-react";
import { Button } from "./button";

interface BottomNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab = "all", onTabChange }) => {
  const tabs = [
    { id: "all", icon: Grid3X3, label: "ALL" },
    { id: "front", icon: Shirt, label: "Front" },
    { id: "back", icon: RotateCcw, label: "Back" },
    { id: "hands", icon: Hand, label: "Hands" },
  ];

  return (
    <div className="relative">
      {/* Floating Action Button */}
      <div className="fixed bottom-16 right-4 z-50">
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-primary shadow-lg hover:bg-primary/90 active:scale-95 transition-transform"
          onClick={() => onTabChange?.("add")}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40">
        <div className="flex items-center justify-around px-4 py-2 pb-safe">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0 flex-1 relative rounded-lg transition-all duration-200 ${
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
        </div>
      </div>

      {/* Safe area padding for mobile devices */}
      <div className="h-20" />
    </div>
  );
};

export default BottomNavigation;
