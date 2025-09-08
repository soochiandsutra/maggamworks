"use client";

import { useState } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AllOverviewSection from "./sections/AllOverviewSection";
import FrontSection from "./sections/FrontSection";
import BackSection from "./sections/BackSection";
import HandsSection from "./sections/HandsSection";

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

      <Dialog open={calculateOpen} onOpenChange={setCalculateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calculate Project Time</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Start calculating time estimates for your Maggam Works projects.
            </p>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Calculator functionality will be implemented here
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCalculateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setCalculateOpen(false)}>
              Start Calculation
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCalculateClick={handleCalculateClick}
        activeSecondaryTab={activeSecondaryTab}
        onSecondaryTabChange={handleSecondaryTabChange}
      />
    </div>
  );
}
