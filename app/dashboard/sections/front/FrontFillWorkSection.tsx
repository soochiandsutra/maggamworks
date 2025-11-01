"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function FrontFillWorkSection() {
  const {
    front: {
      hasFillWork: frontHasFillWork,
      coverage: frontCoverage,
    },
    setFrontHasFillWork,
    setFrontCoverage,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🎨</span> Front Fill Work Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="front-fill-work"
            checked={frontHasFillWork}
            onCheckedChange={(checked) => setFrontHasFillWork(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="front-fill-work" className="text-sm font-medium cursor-pointer">
            Fill work present
          </Label>
        </Card>

        {frontHasFillWork && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Coverage: {frontCoverage}%</Label>
            <Card className="p-4">
              <Slider
                value={[frontCoverage]}
                onValueChange={(value) => setFrontCoverage(value[0])}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0%</span>
                <span>100%</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
