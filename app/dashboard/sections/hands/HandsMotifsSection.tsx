"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export default function HandsMotifsSection() {
  const handsHasMotifs = useAppStateStore((state) => state.handsHasMotifs);
  const handsMotifSize = useAppStateStore((state) => state.handsMotifSize);
  const handsMotifCount = useAppStateStore((state) => state.handsMotifCount);
  const setHandsHasMotifs = useAppStateStore((state) => state.setHandsHasMotifs);
  const setHandsMotifSize = useAppStateStore((state) => state.setHandsMotifSize);
  const setHandsMotifCount = useAppStateStore((state) => state.setHandsMotifCount);

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">✨</span> Hands Motifs Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hands-motifs"
              checked={handsHasMotifs}
              onCheckedChange={(checked) => setHandsHasMotifs(checked as boolean)}
            />
            <Label htmlFor="hands-motifs" className="text-sm font-medium">
              Motifs present
            </Label>
          </div>

          {handsHasMotifs && (
            <>
              <div className="space-y-3">
                <Label className="text-sm font-medium">Motif Size</Label>
                <RadioGroup value={handsMotifSize} onValueChange={setHandsMotifSize}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="hands-motif-small" />
                    <Label htmlFor="hands-motif-small">Small</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="hands-motif-medium" />
                    <Label htmlFor="hands-motif-medium">Med</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="hands-motif-large" />
                    <Label htmlFor="hands-motif-large">Large</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="big" id="hands-motif-big" />
                    <Label htmlFor="hands-motif-big">Big</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hands-motif-count" className="text-sm font-medium">
                  Count (1-20)
                </Label>
                <Input
                  id="hands-motif-count"
                  type="number"
                  min="1"
                  max="20"
                  value={handsMotifCount}
                  onChange={(e) => setHandsMotifCount(e.target.value)}
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
