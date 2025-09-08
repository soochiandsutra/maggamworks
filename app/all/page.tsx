"use client";

import { useState } from "react";
import BottomNavigation from "@/components/ui/bottom-navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AllPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<string | undefined>();
  const [calculateOpen, setCalculateOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveSecondaryTab(undefined); // Reset secondary tab when switching main tabs
    // Navigate to different sections if needed
    if (tab !== "all") {
      window.location.href = `/${tab}`;
    }
  };

  const handleSecondaryTabChange = (tab: string) => {
    setActiveSecondaryTab(tab);
    console.log("Switched to secondary tab:", tab);
  };

  const handleCalculateClick = () => {
    setCalculateOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">All Work Overview</h1>
          <p className="text-muted-foreground mb-6">
            Complete overview of all Maggam Works projects and time estimates.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📊</span> Total Projects
              </h3>
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">⏱️</span> Total Hours
              </h3>
              <p className="text-2xl font-bold text-primary">156.5</p>
              <p className="text-sm text-muted-foreground">Estimated time</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">💰</span> Revenue
              </h3>
              <p className="text-2xl font-bold text-primary">₹24,800</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </div>

          {/* Recent Projects List */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Project #{i}</h4>
                      <p className="text-sm text-muted-foreground">Custom shirt with embroidery</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">8.5 hrs</p>
                      <p className="text-xs text-muted-foreground">₹1,200</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
