"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

export default function HandsFillWorkSection() {
  const {
    hands,
    all,
    setHandsHasFillWork,
  } = useAppStateStore();

  const hasFillWork = hands.hasFillWork !== null ? hands.hasFillWork : all.hasFillWork;
  const isCustom = hands.hasFillWork !== null;

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🎨</span> Hands Fill Work Details
      </h3>
      <div className="space-y-4 p-4 border rounded-lg bg-muted/10">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">Fill Work Settings</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {isCustom ? "Custom" : "Inherited"}
            </span>
            <Checkbox
              checked={isCustom}
              onCheckedChange={(checked) => {
                if (checked) {
                  setHandsHasFillWork(all.hasFillWork);
                } else {
                  setHandsHasFillWork(null);
                }
              }}
            />
          </div>
        </div>
        
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="hands-fill-work"
            checked={!!hasFillWork}
            onCheckedChange={(checked) => setHandsHasFillWork(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
            disabled={!isCustom}
          />
          <Label htmlFor="hands-fill-work" className="text-sm font-medium cursor-pointer">
            Fill work present
          </Label>
        </Card>
      </div>
    </div>
  );
}
