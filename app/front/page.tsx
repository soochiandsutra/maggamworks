"use client";

import { useState } from "react";
import BottomNavigation from "@/components/ui/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FrontPage() {
  const [activeTab, setActiveTab] = useState("front");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "front") {
      window.location.href = `/${tab}`;
    }
  };

  const frontTasks = [
    { name: "Collar work", time: "2.5 hrs", complexity: "Medium", status: "Active" },
    { name: "Button holes", time: "1.0 hr", complexity: "Low", status: "Completed" },
    { name: "Pocket embroidery", time: "3.0 hrs", complexity: "High", status: "Active" },
    { name: "Logo placement", time: "4.5 hrs", complexity: "High", status: "Pending" },
    { name: "Front placket", time: "2.0 hrs", complexity: "Medium", status: "Active" },
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
          <h1 className="text-2xl font-bold mb-4">Front Work Details</h1>
          <p className="text-muted-foreground mb-6">
            Front panel embroidery and decoration work specifications.
          </p>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Front Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{frontTasks.length}</div>
                <p className="text-xs text-muted-foreground">Tasks assigned</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13.0 hrs</div>
                <p className="text-xs text-muted-foreground">Total duration</p>
              </CardContent>
            </Card>
          </div>

          {/* Front Panel Work Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Front Panel Work Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {frontTasks.map((task, index) => (
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
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
