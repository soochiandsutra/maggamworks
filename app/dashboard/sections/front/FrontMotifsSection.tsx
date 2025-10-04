"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TextCard } from "@/app/dashboard/components/RadioCards";

export default function FrontMotifsSection() {
  const frontHasMotifs = useAppStateStore((state) => state.frontHasMotifs);
  const frontMotifSize = useAppStateStore((state) => state.frontMotifSize);
  const frontMotifCount = useAppStateStore((state) => state.frontMotifCount);
  const setFrontHasMotifs = useAppStateStore((state) => state.setFrontHasMotifs);
  const setFrontMotifSize = useAppStateStore((state) => state.setFrontMotifSize);
  const setFrontMotifCount = useAppStateStore((state) => state.setFrontMotifCount);

  const motifSizes = [
    { id: "small", name: "Small" },
    { id: "medium", name: "Medium" },
    { id: "large", name: "Large" },
    { id: "big", name: "Big" }
  ];

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">✨</span> Front Motifs Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="front-motifs"
            checked={frontHasMotifs}
            onCheckedChange={(checked) => setFrontHasMotifs(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="front-motifs" className="text-sm font-medium cursor-pointer">
            Motifs present
          </Label>
        </Card>

        {frontHasMotifs && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Motif Size</Label>
              <RadioGroup value={frontMotifSize} onValueChange={setFrontMotifSize} className="grid grid-cols-2 gap-3">
                {motifSizes.map((size) => (
                  <TextCard
                    key={size.id}
                    item={size}
                    isSelected={frontMotifSize === size.id}
                    onClick={() => setFrontMotifSize(size.id)}
                    radioId={`front-motif-${size.id}`}
                  />
                ))}
              </RadioGroup>
            </div>

            <Card className="p-4 ring-1 border-border ring-border/30">
              <div className="space-y-3">
                <Label htmlFor="front-motif-count" className="text-sm font-medium">
                  Count (1-20)
                </Label>
                <Input
                  id="front-motif-count"
                  type="number"
                  min="1"
                  max="20"
                  value={frontMotifCount}
                  onChange={(e) => setFrontMotifCount(e.target.value)}
                  placeholder="Enter motif count"
                  className="h-10 text-sm"
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
