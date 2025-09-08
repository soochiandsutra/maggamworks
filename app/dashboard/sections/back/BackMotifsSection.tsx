"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export default function BackMotifsSection() {
  const [hasMotifs, setHasMotifs] = useState<boolean>(false);
  const [motifSize, setMotifSize] = useState<string>("");
  const [motifCount, setMotifCount] = useState<string>("");

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
              checked={hasMotifs}
              onCheckedChange={(checked) => setHasMotifs(checked as boolean)}
            />
            <Label htmlFor="back-motifs" className="text-sm font-medium">
              Motifs present
            </Label>
          </div>

          {hasMotifs && (
            <>
              <div className="space-y-3">
                <Label className="text-sm font-medium">Motif Size</Label>
                <RadioGroup value={motifSize} onValueChange={setMotifSize}>
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
                  value={motifCount}
                  onChange={(e) => setMotifCount(e.target.value)}
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
