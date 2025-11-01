"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export default function AllFillWorkSection() {
  const {
    all: {
      hasFillWork: allHasFillWork,
    },
    setAllHasFillWork,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🎨</span> All Fill Work Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="all-fill-work"
            checked={allHasFillWork}
            onCheckedChange={(checked) => setAllHasFillWork(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="all-fill-work" className="text-sm font-medium cursor-pointer">
            Fill work present
          </Label>
        </Card>
      </div>
    </div>
  );
}
