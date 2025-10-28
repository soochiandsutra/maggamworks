"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function HandsFillWorkSection() {
  const handsHasFillWork = useAppStateStore((state) => state.handsHasFillWork);
  const handsCoverage = useAppStateStore((state) => state.handsCoverage);
  const setHandsHasFillWork = useAppStateStore((state) => state.setHandsHasFillWork);
  const setHandsCoverage = useAppStateStore((state) => state.setHandsCoverage);

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🎨</span> Hands Fill Work Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="hands-fill-work"
            checked={handsHasFillWork}
            onCheckedChange={(checked) => setHandsHasFillWork(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="hands-fill-work" className="text-sm font-medium cursor-pointer">
            Fill work present
          </Label>
        </Card>

        {handsHasFillWork && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Coverage: {handsCoverage}%</Label>
            <Card className="p-4">
              <Slider
                value={[handsCoverage]}
                onValueChange={(value) => setHandsCoverage(value[0])}
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
