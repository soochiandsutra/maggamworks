"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BackFillWorkSection() {
  const backHasFillWork = useAppStateStore((state) => state.backHasFillWork);
  const backCoverage = useAppStateStore((state) => state.backCoverage);
  const setBackHasFillWork = useAppStateStore((state) => state.setBackHasFillWork);
  const setBackCoverage = useAppStateStore((state) => state.setBackCoverage);

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🎨</span> Back Fill Work Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="back-fill-work"
              checked={backHasFillWork}
              onCheckedChange={(checked) => setBackHasFillWork(checked as boolean)}
            />
            <Label htmlFor="back-fill-work" className="text-sm font-medium">
              Fill work present
            </Label>
          </div>

          {backHasFillWork && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Coverage</Label>
              <RadioGroup value={backCoverage} onValueChange={setBackCoverage}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="100%" id="back-coverage-100" />
                  <Label htmlFor="back-coverage-100">100%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="80%" id="back-coverage-80" />
                  <Label htmlFor="back-coverage-80">80%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60%" id="back-coverage-60" />
                  <Label htmlFor="back-coverage-60">60%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="40%" id="back-coverage-40" />
                  <Label htmlFor="back-coverage-40">40%</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20%" id="back-coverage-20" />
                  <Label htmlFor="back-coverage-20">20%</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
