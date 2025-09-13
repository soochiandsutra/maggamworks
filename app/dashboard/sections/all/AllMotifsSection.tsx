"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export default function AllMotifsSection() {
  const allHasMotifs = useAppStateStore((state) => state.allHasMotifs);
  const allMotifSize = useAppStateStore((state) => state.allMotifSize);
  const allMotifCount = useAppStateStore((state) => state.allMotifCount);
  const setAllHasMotifs = useAppStateStore((state) => state.setAllHasMotifs);
  const setAllMotifSize = useAppStateStore((state) => state.setAllMotifSize);
  const setAllMotifCount = useAppStateStore((state) => state.setAllMotifCount);

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">✨</span> All Motifs Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="all-motifs"
              checked={allHasMotifs}
              onCheckedChange={(checked) => setAllHasMotifs(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="all-motifs" className="text-base font-medium cursor-pointer flex-1">
              Motifs present
            </Label>
          </div>

          {allHasMotifs && (
            <div className="space-y-6 pl-6 border-l-2 border-muted">
              <div className="space-y-4">
                <Label className="text-base font-medium">Motif Size</Label>
                <RadioGroup value={allMotifSize} onValueChange={setAllMotifSize} className="grid grid-cols-2 gap-3">
                  {[
                    { value: "small", label: "Small" },
                    { value: "medium", label: "Medium" },
                    { value: "large", label: "Large" },
                    { value: "big", label: "Big" }
                  ].map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={value} id={`all-motif-${value}`} className="h-5 w-5" />
                      <Label htmlFor={`all-motif-${value}`} className="text-base cursor-pointer flex-1">
                        {label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label htmlFor="all-motif-count" className="text-base font-medium">
                  Count (1-20)
                </Label>
                <Input
                  id="all-motif-count"
                  type="number"
                  min="1"
                  max="20"
                  value={allMotifCount}
                  onChange={(e) => setAllMotifCount(e.target.value)}
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
