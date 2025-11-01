"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function BackMotifsSection() {
  const {
    back,
    all,
    setBackHasMotifs,
    setBackMotifSizeX,
    setBackMotifSizeY,
    setBackMotifCount,
  } = useAppStateStore();

  const hasMotifs = back.hasMotifs !== null ? back.hasMotifs : all.hasMotifs;
  const motifSizeX = back.motifSizeX !== null ? back.motifSizeX : all.motifSizeX;
  const motifSizeY = back.motifSizeY !== null ? back.motifSizeY : all.motifSizeY;
  const motifCount = back.motifCount !== null ? back.motifCount : all.motifCount;
  const isCustom = back.hasMotifs !== null;

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">✨</span> Back Motifs Details
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
                  setBackHasMotifs(all.hasMotifs);
                  setBackMotifSizeX(all.motifSizeX);
                  setBackMotifSizeY(all.motifSizeY);
                  setBackMotifCount(all.motifCount);
                } else {
                  setBackHasMotifs(null);
                  setBackMotifSizeX(null);
                  setBackMotifSizeY(null);
                  setBackMotifCount(null);
                }
              }}
            />
          </div>
        </div>

        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="back-motifs"
            checked={hasMotifs}
            onCheckedChange={(checked) => setBackHasMotifs(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
            disabled={!isCustom}
          />
          <Label htmlFor="back-motifs" className="text-sm font-medium cursor-pointer">
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
                    <Label htmlFor="back-motif-size-x" className="text-xs font-medium text-muted-foreground">
                      Width (X)
                    </Label>
                    <Input
                      id="back-motif-size-x"
                      type="number"
                      min="0"
                      step="0.1"
                      value={motifSizeX || ''}
                      onChange={(e) => setBackMotifSizeX(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
                      disabled={!isCustom}
                    />
                  </div>
                </Card>
                <Card className="p-3 ring-1 border-border ring-border/30">
                  <div className="space-y-2">
                    <Label htmlFor="back-motif-size-y" className="text-xs font-medium text-muted-foreground">
                      Height (Y)
                    </Label>
                    <Input
                      id="back-motif-size-y"
                      type="number"
                      min="0"
                      step="0.1"
                      value={motifSizeY || ''}
                      onChange={(e) => setBackMotifSizeY(parseFloat(e.target.value) || 0)}
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
                <Label htmlFor="back-motif-count" className="text-sm font-medium">
                  Count (1-20)
                </Label>
                <Input
                  id="back-motif-count"
                  type="number"
                  min="1"
                  max="20"
                  value={motifCount}
                  onChange={(e) => setBackMotifCount(e.target.value)}
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
