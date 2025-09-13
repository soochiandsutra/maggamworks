"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export default function FrontMotifsSection() {
  const frontHasMotifs = useAppStateStore((state) => state.frontHasMotifs);
  const frontMotifSize = useAppStateStore((state) => state.frontMotifSize);
  const frontMotifCount = useAppStateStore((state) => state.frontMotifCount);
  const setFrontHasMotifs = useAppStateStore((state) => state.setFrontHasMotifs);
  const setFrontMotifSize = useAppStateStore((state) => state.setFrontMotifSize);
  const setFrontMotifCount = useAppStateStore((state) => state.setFrontMotifCount);

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">✨</span> Front Motifs Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="motifs"
              checked={frontHasMotifs}
              onCheckedChange={(checked) => setFrontHasMotifs(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="motifs" className="text-base font-medium cursor-pointer flex-1">
              Motifs present
            </Label>
          </div>

          {frontHasMotifs && (
            <div className="space-y-6 pl-6 border-l-2 border-muted">
              <div className="space-y-4">
                <Label className="text-base font-medium">Motif Size</Label>
                <RadioGroup value={frontMotifSize} onValueChange={setFrontMotifSize} className="grid grid-cols-2 gap-3">
                  {[
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                    { value: "big", label: "Big" }
                  ].map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={value} id={`motif-${value}`} className="h-5 w-5" />
                      <Label htmlFor={`motif-${value}`} className="text-base cursor-pointer flex-1">
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="motif-count" className="text-base font-medium">
                  Count (1-20)
                </Label>
                <Input
                  id="motif-count"
                  type="number"
                  min="1"
                  max="20"
                  value={frontMotifCount}
                  onChange={(e) => setFrontMotifCount(e.target.value)}
                  placeholder="Enter motif count"
                  className="h-12 text-base"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
