"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ImageCard } from "@/components/custom-ui/RadioCards";

export default function AllMotifsSection() {
  const {
    all: {
      hasMotifs: allHasMotifs,
      motifSizeX: allMotifSizeX,
      motifSizeY: allMotifSizeY,
      motifCount: allMotifCount,
    },
    setAllHasMotifs,
    setAllMotifSizeX,
    setAllMotifSizeY,
    setAllMotifCount,
  } = useAppStateStore();


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
              <Label className="text-sm font-medium">Motif Size (inches)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 ring-1 border-border ring-border/30">
                  <div className="space-y-2">
                    <Label htmlFor="all-motif-size-x" className="text-xs font-medium text-muted-foreground">
                      Width (X)
                    </Label>
                    <Input
                      id="all-motif-size-x"
                      type="number"
                      min="0"
                      step="0.1"
                      value={allMotifSizeX || ''}
                      onChange={(e) => setAllMotifSizeX(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
                    />
                  </div>
                </Card>
                <Card className="p-3 ring-1 border-border ring-border/30">
                  <div className="space-y-2">
                    <Label htmlFor="all-motif-size-y" className="text-xs font-medium text-muted-foreground">
                      Height (Y)
                    </Label>
                    <Input
                      id="all-motif-size-y"
                      type="number"
                      min="0"
                      step="0.1"
                      value={allMotifSizeY || ''}
                      onChange={(e) => setAllMotifSizeY(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
                    />
                  </div>
                </Card>
              </div>
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
                    altPrefix="Motif "
                    showRadioButton={false}
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
