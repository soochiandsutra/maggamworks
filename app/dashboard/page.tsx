"use client";

import { useState } from "react";
import BottomNavigation from "@/app/dashboard/bottom-navigation";
import AllOverviewSection from "./sections/AllOverviewSection";
import FrontSection from "./sections/FrontSection";
import BackSection from "./sections/BackSection";
import HandsSection from "./sections/HandsSection";
import CalculationSummaryDialog from "./components/CalculationSummaryDialog";
import { useAppStateStore } from "@/lib/store/appState";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<string | undefined>();
  const [calculateOpen, setCalculateOpen] = useState(false);
  const [debugOpen, setDebugOpen] = useState(false);

  const store = useAppStateStore();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveSecondaryTab(undefined); // Reset secondary tab when switching main tabs
    console.log("Switched to tab:", tab);
  };

  const handleSecondaryTabChange = (tab: string) => {
    setActiveSecondaryTab(tab);
    console.log("Switched to secondary tab:", tab);
  };

  const handleCalculateClick = () => {
    setCalculateOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <AllOverviewSection activeSecondaryTab={activeSecondaryTab} />;
      case "front":
        return <FrontSection activeSecondaryTab={activeSecondaryTab} />;
      case "back":
        return <BackSection activeSecondaryTab={activeSecondaryTab} />;
      case "hands":
        return <HandsSection activeSecondaryTab={activeSecondaryTab} />;
      default:
        return null;
    }
  };

  const renderStateValue = (key: string, value: any) => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "true" : "false"}
        </Badge>
      );
    }
    if (typeof value === 'string' && value === '') {
      return <span className="text-muted-foreground italic">empty</span>;
    }
    if (typeof value === 'object' && value !== null) {
      return <span className="font-mono text-sm">{JSON.stringify(value)}</span>;
    }
    return <span className="font-mono">{String(value)}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Debug Button */}
      <div className="sticky top-0 z-50 bg-background border-b border-border p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Maggam Works Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDebugOpen(true)}
            className="ml-auto"
          >
            🐛 Debug State
          </Button>
        </div>
      </div>

      <main className="pb-16">
        {renderContent()}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCalculateClick={handleCalculateClick}
        activeSecondaryTab={activeSecondaryTab}
        onSecondaryTabChange={handleSecondaryTabChange}
      />

      <CalculationSummaryDialog
        open={calculateOpen}
        onOpenChange={setCalculateOpen}
      />

      {/* Debug Modal */}
      <Dialog open={debugOpen} onOpenChange={setDebugOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              🐛 Zustand State Debugger
              <Badge variant="outline">{Object.keys(store).length} properties</Badge>
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-6">
            {/* Size measurements */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Size Measurements
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">chestSize:</span>
                  {renderStateValue('chestSize', store.chestSize)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">armholeRound:</span>
                  {renderStateValue('armholeRound', store.armholeRound)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handLength:</span>
                  {renderStateValue('handLength', store.handLength)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handRound:</span>
                  {renderStateValue('handRound', store.handRound)}
                </div>
              </div>
            </div>

            {/* All Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                All Section
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">allHasBorders:</span>
                  {renderStateValue('allHasBorders', store.allHasBorders)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allBorderSize:</span>
                  {renderStateValue('allBorderSize', store.allBorderSize)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allNeckType:</span>
                  {renderStateValue('allNeckType', store.allNeckType)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allNeckDesignNumber:</span>
                  {renderStateValue('allNeckDesignNumber', store.allNeckDesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allNeckType2:</span>
                  {renderStateValue('allNeckType2', store.allNeckType2)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allNeckType2DesignNumber:</span>
                  {renderStateValue('allNeckType2DesignNumber', store.allNeckType2DesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allHasFillWork:</span>
                  {renderStateValue('allHasFillWork', store.allHasFillWork)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allCoverage:</span>
                  {renderStateValue('allCoverage', store.allCoverage)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allHasMotifs:</span>
                  {renderStateValue('allHasMotifs', store.allHasMotifs)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allMotifSizeX:</span>
                  {renderStateValue('allMotifSizeX', store.allMotifSizeX)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allMotifSizeY:</span>
                  {renderStateValue('allMotifSizeY', store.allMotifSizeY)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allMotifCount:</span>
                  {renderStateValue('allMotifCount', store.allMotifCount)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allSelectedTechniques:</span>
                  {renderStateValue('allSelectedTechniques', store.allSelectedTechniques)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">allTechniquePercentages:</span>
                  {renderStateValue('allTechniquePercentages', store.allTechniquePercentages)}
                </div>
              </div>
            </div>

            {/* Front Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Front Section
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">frontHasBorders:</span>
                  {renderStateValue('frontHasBorders', store.frontHasBorders)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontBorderSize:</span>
                  {renderStateValue('frontBorderSize', store.frontBorderSize)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontNeckType:</span>
                  {renderStateValue('frontNeckType', store.frontNeckType)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontNeckDesignNumber:</span>
                  {renderStateValue('frontNeckDesignNumber', store.frontNeckDesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontNeckType2:</span>
                  {renderStateValue('frontNeckType2', store.frontNeckType2)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontNeckType2DesignNumber:</span>
                  {renderStateValue('frontNeckType2DesignNumber', store.frontNeckType2DesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontHasFillWork:</span>
                  {renderStateValue('frontHasFillWork', store.frontHasFillWork)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontCoverage:</span>
                  {renderStateValue('frontCoverage', store.frontCoverage)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontHasMotifs:</span>
                  {renderStateValue('frontHasMotifs', store.frontHasMotifs)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontMotifSizeX:</span>
                  {renderStateValue('frontMotifSizeX', store.frontMotifSizeX)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontMotifSizeY:</span>
                  {renderStateValue('frontMotifSizeY', store.frontMotifSizeY)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontMotifCount:</span>
                  {renderStateValue('frontMotifCount', store.frontMotifCount)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontSelectedTechniques:</span>
                  {renderStateValue('frontSelectedTechniques', store.frontSelectedTechniques)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">frontTechniquePercentages:</span>
                  {renderStateValue('frontTechniquePercentages', store.frontTechniquePercentages)}
                </div>
              </div>
            </div>

            {/* Back Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Back Section
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">backHasBorders:</span>
                  {renderStateValue('backHasBorders', store.backHasBorders)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backBorderSize:</span>
                  {renderStateValue('backBorderSize', store.backBorderSize)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backNeckType:</span>
                  {renderStateValue('backNeckType', store.backNeckType)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backNeckDesignNumber:</span>
                  {renderStateValue('backNeckDesignNumber', store.backNeckDesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backNeckType2:</span>
                  {renderStateValue('backNeckType2', store.backNeckType2)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backNeckType2DesignNumber:</span>
                  {renderStateValue('backNeckType2DesignNumber', store.backNeckType2DesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backHasFillWork:</span>
                  {renderStateValue('backHasFillWork', store.backHasFillWork)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backCoverage:</span>
                  {renderStateValue('backCoverage', store.backCoverage)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backHasMotifs:</span>
                  {renderStateValue('backHasMotifs', store.backHasMotifs)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backMotifSizeX:</span>
                  {renderStateValue('backMotifSizeX', store.backMotifSizeX)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backMotifSizeY:</span>
                  {renderStateValue('backMotifSizeY', store.backMotifSizeY)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backMotifCount:</span>
                  {renderStateValue('backMotifCount', store.backMotifCount)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backSelectedTechniques:</span>
                  {renderStateValue('backSelectedTechniques', store.backSelectedTechniques)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">backTechniquePercentages:</span>
                  {renderStateValue('backTechniquePercentages', store.backTechniquePercentages)}
                </div>
              </div>
            </div>

            {/* Hands Section */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Hands Section
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">handsHasBorders:</span>
                  {renderStateValue('handsHasBorders', store.handsHasBorders)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsBorderSize:</span>
                  {renderStateValue('handsBorderSize', store.handsBorderSize)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsNeckType:</span>
                  {renderStateValue('handsNeckType', store.handsNeckType)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsNeckDesignNumber:</span>
                  {renderStateValue('handsNeckDesignNumber', store.handsNeckDesignNumber)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsSelectedDesign:</span>
                  {renderStateValue('handsSelectedDesign', store.handsSelectedDesign)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsHasFillWork:</span>
                  {renderStateValue('handsHasFillWork', store.handsHasFillWork)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsCoverage:</span>
                  {renderStateValue('handsCoverage', store.handsCoverage)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsHasMotifs:</span>
                  {renderStateValue('handsHasMotifs', store.handsHasMotifs)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsMotifSizeX:</span>
                  {renderStateValue('handsMotifSizeX', store.handsMotifSizeX)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsMotifSizeY:</span>
                  {renderStateValue('handsMotifSizeY', store.handsMotifSizeY)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsMotifCount:</span>
                  {renderStateValue('handsMotifCount', store.handsMotifCount)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsSelectedTechniques:</span>
                  {renderStateValue('handsSelectedTechniques', store.handsSelectedTechniques)}
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">handsTechniquePercentages:</span>
                  {renderStateValue('handsTechniquePercentages', store.handsTechniquePercentages)}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
