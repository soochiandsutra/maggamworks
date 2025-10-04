"use client";

import { useState } from "react";
import BottomNavigation from "@/app/dashboard/bottom-navigation";
import AllOverviewSection from "./sections/AllOverviewSection";
import FrontSection from "./sections/FrontSection";
import BackSection from "./sections/BackSection";
import HandsSection from "./sections/HandsSection";
import CalculationSummaryDialog from "./components/CalculationSummaryDialog";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<string | undefined>();
  const [calculateOpen, setCalculateOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-background">
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
    </div>
  );
}
