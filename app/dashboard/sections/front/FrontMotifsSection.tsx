"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function FrontMotifsSection() {
  const {
    front,
    all,
    setFrontHasMotifs,
    setFrontMotifSizeX,
    setFrontMotifSizeY,
    setFrontMotifCount,
  } = useAppStateStore();

  const hasMotifs = front.hasMotifs !== null ? front.hasMotifs : all.hasMotifs;
  const motifSizeX = front.motifSizeX !== null ? front.motifSizeX : all.motifSizeX;
  const motifSizeY = front.motifSizeY !== null ? front.motifSizeY : all.motifSizeY;
  const motifCount = front.motifCount !== null ? front.motifCount : all.motifCount;
  const isCustom = front.hasMotifs !== null;

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">✨</span> Front Motifs Details
      </h3>
      <div className="space-y-4 p-4 border rounded-lg bg-muted/10">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">Motifs Settings</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {isCustom ? "Custom" : "Inherited"}
            </span>
            <Checkbox
              checked={isCustom}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFrontHasMotifs(all.hasMotifs);
                  setFrontMotifSizeX(all.motifSizeX);
                  setFrontMotifSizeY(all.motifSizeY);
                  setFrontMotifCount(all.motifCount);
                } else {
                  setFrontHasMotifs(null);
                  setFrontMotifSizeX(null);
                  setFrontMotifSizeY(null);
                  setFrontMotifCount(null);
                }
              }}
            />
          </div>
        </div>

        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="front-motifs"
            checked={!!hasMotifs}
            onCheckedChange={(checked) => setFrontHasMotifs(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
            disabled={!isCustom}
          />
          <Label htmlFor="front-motifs" className="text-sm font-medium cursor-pointer">
            Motifs present
          </Label>
        </Card>

        {hasMotifs && (
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Motif Size (inches)</Label>
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 ring-1 border-border ring-border/30">
                  <div className="space-y-2">
                    <Label htmlFor="front-motif-size-x" className="text-xs font-medium text-muted-foreground">
                      Width (X)
                    </Label>
                    <Input
                      id="front-motif-size-x"
                      type="number"
                      min="0"
                      step="0.1"
                      value={motifSizeX || ''}
                      onChange={(e) => setFrontMotifSizeX(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
                      disabled={!isCustom}
                    />
                  </div>
                </Card>
                <Card className="p-3 ring-1 border-border ring-border/30">
                  <div className="space-y-2">
                    <Label htmlFor="front-motif-size-y" className="text-xs font-medium text-muted-foreground">
                      Height (Y)
                    </Label>
                    <Input
                      id="front-motif-size-y"
                      type="number"
                      min="0"
                      step="0.1"
                      value={motifSizeY || ''}
                      onChange={(e) => setFrontMotifSizeY(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
                      disabled={!isCustom}
                    />
                  </div>
                </Card>
              </div>
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
                  value={motifCount || ''}
                  onChange={(e) => setFrontMotifCount(e.target.value)}
                  placeholder="Enter motif count"
                  className="h-10 text-sm"
                  disabled={!isCustom}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
