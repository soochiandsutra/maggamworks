"use client";

import { useState } from "react";
import BottomNavigation from "@/components/ui/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function BackPage() {
  const [activeTab, setActiveTab] = useState("back");
  const [activeSecondaryTab, setActiveSecondaryTab] = useState<string | undefined>();
  const [calculateOpen, setCalculateOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setActiveSecondaryTab(undefined); // Reset secondary tab when switching main tabs
    if (tab !== "back") {
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

  const backTasks = [
    { name: "Center seam", time: "1.5 hrs", complexity: "Low", status: "Completed" },
    { name: "Back embroidery", time: "5.0 hrs", complexity: "High", status: "Active" },
    { name: "Tag attachment", time: "0.5 hr", complexity: "Low", status: "Active" },
    { name: "Back vent", time: "2.0 hrs", complexity: "Medium", status: "Pending" },
    { name: "Shoulder seam", time: "1.0 hr", complexity: "Low", status: "Completed" },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Active": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Pending": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Back Work Details</h1>
          <p className="text-muted-foreground mb-6">
            Back panel stitching and decorative work specifications.
          </p>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Back Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{backTasks.length}</div>
                <p className="text-xs text-muted-foreground">Tasks assigned</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">10.0 hrs</div>
                <p className="text-xs text-muted-foreground">Total duration</p>
              </CardContent>
            </Card>
          </div>

          {/* Back Panel Work Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Back Panel Work Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{task.name}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary" className={getComplexityColor(task.complexity)}>
                          {task.complexity}
                        </Badge>
                        <Badge variant="secondary" className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{task.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
