"use client";

import { useState } from "react";
import BottomNavigation from "@/components/ui/bottom-navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        return (
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
          </div>
        );
      case "front":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Front Work Details</h1>
            <p className="text-muted-foreground mb-6">
              Front panel embroidery and decoration work specifications.
            </p>
            <div className="grid gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Front Panel Work</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Collar work</span>
                    <span className="text-sm font-medium">2.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Button holes</span>
                    <span className="text-sm font-medium">1.0 hr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pocket embroidery</span>
                    <span className="text-sm font-medium">3.0 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Logo placement</span>
                    <span className="text-sm font-medium">4.5 hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "back":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Back Work Details</h1>
            <p className="text-muted-foreground mb-6">
              Back panel stitching and decorative work specifications.
            </p>
            <div className="grid gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Back Panel Work</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Center seam</span>
                    <span className="text-sm font-medium">1.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Back embroidery</span>
                    <span className="text-sm font-medium">5.0 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tag attachment</span>
                    <span className="text-sm font-medium">0.5 hr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Back vent</span>
                    <span className="text-sm font-medium">2.0 hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "hands":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Hand Work Details</h1>
            <p className="text-muted-foreground mb-6">
              Hand stitching and finishing work specifications.
            </p>
            <div className="grid gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Hand Finishing Work</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Button attachment</span>
                    <span className="text-sm font-medium">1.0 hr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hem stitching</span>
                    <span className="text-sm font-medium">2.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Final pressing</span>
                    <span className="text-sm font-medium">1.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality check</span>
                    <span className="text-sm font-medium">1.0 hr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "add":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">New Project</h1>
            <p className="text-muted-foreground mb-6">Start a new Maggam Works project calculation...</p>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-center text-muted-foreground">
                New project form will be implemented here
              </p>
            </div>
          </div>
        );
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
