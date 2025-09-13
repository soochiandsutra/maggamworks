"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AllFillWorkSection() {
  const allHasFillWork = useAppStateStore((state) => state.allHasFillWork);
  const allCoverage = useAppStateStore((state) => state.allCoverage);
  const setAllHasFillWork = useAppStateStore((state) => state.setAllHasFillWork);
  const setAllCoverage = useAppStateStore((state) => state.setAllCoverage);

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">🎨</span> All Fill Work Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="all-fill-work"
              checked={allHasFillWork}
              onCheckedChange={(checked) => setAllHasFillWork(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="all-fill-work" className="text-base font-medium cursor-pointer flex-1">
              Fill work present
            </Label>
          </div>

          {allHasFillWork && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <Label className="text-base font-medium">Coverage</Label>
              <RadioGroup value={allCoverage} onValueChange={setAllCoverage} className="grid grid-cols-1 gap-3">
                {[
                  { value: "100%", label: "100%" },
                  { value: "80%", label: "80%" },
                  { value: "60%", label: "60%" },
                  { value: "40%", label: "40%" },
                  { value: "20%", label: "20%" }
                ].map(({ value, label }) => (
                  <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={value} id={`all-coverage-${value}`} className="h-5 w-5" />
                    <Label htmlFor={`all-coverage-${value}`} className="text-base cursor-pointer flex-1">
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
