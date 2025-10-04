"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TextCard, ImageCard } from "@/app/dashboard/components/RadioCards";

export default function AllMotifsSection() {
  const allHasMotifs = useAppStateStore((state) => state.allHasMotifs);
  const allMotifSize = useAppStateStore((state) => state.allMotifSize);
  const allMotifCount = useAppStateStore((state) => state.allMotifCount);
  const setAllHasMotifs = useAppStateStore((state) => state.setAllHasMotifs);
  const setAllMotifSize = useAppStateStore((state) => state.setAllMotifSize);
  const setAllMotifCount = useAppStateStore((state) => state.setAllMotifCount);

  const motifSizes = [
    { id: "small", name: "Small" },
    { id: "medium", name: "Medium" },
    { id: "large", name: "Large" },
    { id: "big", name: "Big" }
  ];

  const motifDesigns = [
    { id: 1, name: "Design 1", seed: "motif1" },
    { id: 2, name: "Design 2", seed: "motif2" },
    { id: 3, name: "Design 3", seed: "motif3" },
    { id: 4, name: "Design 4", seed: "motif4" }
  ];

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">✨</span> All Motifs Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="all-motifs"
            checked={allHasMotifs}
            onCheckedChange={(checked) => setAllHasMotifs(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="all-motifs" className="text-sm font-medium cursor-pointer">
            Motifs present
          </Label>
        </Card>

        {allHasMotifs && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Motif Size</Label>
              <RadioGroup value={allMotifSize} onValueChange={setAllMotifSize} className="grid grid-cols-2 gap-3">
                {motifSizes.map((size) => (
                  <TextCard
                    key={size.id}
                    item={size}
                    isSelected={allMotifSize === size.id}
                    onClick={() => setAllMotifSize(size.id)}
                    radioId={`all-motif-${size.id}`}
                  />
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Motif Designs</Label>
              <div className="grid grid-cols-2 gap-3">
                {motifDesigns.map((design) => (
                  <ImageCard
                    key={design.id}
                    item={design}
                    isSelected={false}
                    onClick={() => {}}
                    radioId={`all-motif-design-${design.id}`}
                    altPrefix="Motif "
                  />
                ))}
              </div>
            </div>

            <Card className="p-4 ring-1 border-border ring-border/30">
              <div className="space-y-3">
                <Label htmlFor="all-motif-count" className="text-sm font-medium">
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
