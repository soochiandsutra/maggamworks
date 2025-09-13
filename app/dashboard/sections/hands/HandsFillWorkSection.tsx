"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function HandsFillWorkSection() {
  const handsHasFillWork = useAppStateStore((state) => state.handsHasFillWork);
  const handsCoverage = useAppStateStore((state) => state.handsCoverage);
  const setHandsHasFillWork = useAppStateStore((state) => state.setHandsHasFillWork);
  const setHandsCoverage = useAppStateStore((state) => state.setHandsCoverage);

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🎨</span> Hands Fill Work Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hands-fill-work"
              checked={handsHasFillWork}
              onCheckedChange={(checked) => setHandsHasFillWork(checked as boolean)}
            />
            <Label htmlFor="hands-fill-work" className="text-sm font-medium">
              Fill work present
            </Label>
          </div>

          {handsHasFillWork && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Coverage</Label>
              <RadioGroup value={handsCoverage} onValueChange={setHandsCoverage}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="100%" id="hands-coverage-100" />
                  <Label htmlFor="hands-coverage-100">100%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="80%" id="hands-coverage-80" />
                  <Label htmlFor="hands-coverage-80">80%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60%" id="hands-coverage-60" />
                  <Label htmlFor="hands-coverage-60">60%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="40%" id="hands-coverage-40" />
                  <Label htmlFor="hands-coverage-40">40%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20%" id="hands-coverage-20" />
                  <Label htmlFor="hands-coverage-20">20%</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
