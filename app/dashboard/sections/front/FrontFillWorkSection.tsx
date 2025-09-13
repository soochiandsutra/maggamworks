"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FrontFillWorkSection() {
  const frontHasFillWork = useAppStateStore((state) => state.frontHasFillWork);
  const frontCoverage = useAppStateStore((state) => state.frontCoverage);
  const setFrontHasFillWork = useAppStateStore((state) => state.setFrontHasFillWork);
  const setFrontCoverage = useAppStateStore((state) => state.setFrontCoverage);

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">🎨</span> Front Fill Work Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="fill-work"
              checked={frontHasFillWork}
              onCheckedChange={(checked) => setFrontHasFillWork(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="fill-work" className="text-base font-medium cursor-pointer flex-1">
              Fill work present
            </Label>
          </div>

          {frontHasFillWork && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <Label className="text-base font-medium">Coverage</Label>
              <RadioGroup value={frontCoverage} onValueChange={setFrontCoverage} className="grid grid-cols-1 gap-3">
                {[
                  { value: "100%", label: "100%" },
                  { value: "80%", label: "80%" },
                  { value: "60%", label: "60%" },
                  { value: "40%", label: "40%" },
                  { value: "20%", label: "20%" }
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={value} id={`coverage-${value}`} className="h-5 w-5" />
                    <Label htmlFor={`coverage-${value}`} className="text-base cursor-pointer flex-1">
                      {label} coverage
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
