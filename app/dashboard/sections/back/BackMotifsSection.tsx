"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export default function BackMotifsSection() {
  const backHasMotifs = useAppStateStore((state) => state.backHasMotifs);
  const backMotifSize = useAppStateStore((state) => state.backMotifSize);
  const backMotifCount = useAppStateStore((state) => state.backMotifCount);
  const setBackHasMotifs = useAppStateStore((state) => state.setBackHasMotifs);
  const setBackMotifSize = useAppStateStore((state) => state.setBackMotifSize);
  const setBackMotifCount = useAppStateStore((state) => state.setBackMotifCount);

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">✨</span> Back Motifs Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="back-motifs"
              checked={backHasMotifs}
              onCheckedChange={(checked) => setBackHasMotifs(checked as boolean)}
            />
            <Label htmlFor="back-motifs" className="text-sm font-medium">
              Motifs present
            </Label>
          </div>

          {backHasMotifs && (
            <>
              <div className="space-y-3">
                <Label className="text-sm font-medium">Motif Size</Label>
                <RadioGroup value={backMotifSize} onValueChange={setBackMotifSize}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="back-motif-small" />
                    <Label htmlFor="back-motif-small">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="back-motif-medium" />
                    <Label htmlFor="back-motif-medium">Med</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="back-motif-large" />
                    <Label htmlFor="back-motif-large">Large</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="big" id="back-motif-big" />
                    <Label htmlFor="back-motif-big">Big</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="back-motif-count" className="text-sm font-medium">
                  Count (1-20)
                </Label>
                <Input
                  id="back-motif-count"
                  type="number"
                  min="1"
                  max="20"
                  value={backMotifCount}
                  onChange={(e) => setBackMotifCount(e.target.value)}
                  placeholder="Enter motif count"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
