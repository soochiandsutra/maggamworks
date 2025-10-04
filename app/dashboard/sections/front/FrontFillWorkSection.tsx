"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { RadioGroup } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { TextCard } from "@/app/dashboard/components/RadioCards";

export default function FrontFillWorkSection() {
  const frontHasFillWork = useAppStateStore((state) => state.frontHasFillWork);
  const frontCoverage = useAppStateStore((state) => state.frontCoverage);
  const setFrontHasFillWork = useAppStateStore((state) => state.setFrontHasFillWork);
  const setFrontCoverage = useAppStateStore((state) => state.setFrontCoverage);

  const coverageOptions = [
    { id: "100%", name: "100%" },
    { id: "90%", name: "90%" },
    { id: "80%", name: "80%" },
    { id: "70%", name: "70%" },
    { id: "60%", name: "60%" },
    { id: "50%", name: "50%" },
    { id: "40%", name: "40%" },
    { id: "30%", name: "30%" },
    { id: "20%", name: "20%" },
    { id: "10%", name: "10%" }
  ];

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
            <Label className="text-sm font-medium">Coverage</Label>
            <RadioGroup value={frontCoverage} onValueChange={setFrontCoverage} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-3">
              {coverageOptions.map((coverage) => (
                <TextCard
                  key={coverage.id}
                  item={{ ...coverage, name: `${coverage.name} coverage` }}
                  isSelected={frontCoverage === coverage.id}
                  onClick={() => setFrontCoverage(coverage.id)}
                  radioId={`front-coverage-${coverage.id}`}
                />
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
}
