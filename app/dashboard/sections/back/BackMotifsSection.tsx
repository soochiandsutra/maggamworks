"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TextCard } from "@/app/dashboard/components/RadioCards";

export default function BackMotifsSection() {
  const backHasMotifs = useAppStateStore((state) => state.backHasMotifs);
  const backMotifSizeX = useAppStateStore((state) => state.backMotifSizeX);
  const backMotifSizeY = useAppStateStore((state) => state.backMotifSizeY);
  const backMotifCount = useAppStateStore((state) => state.backMotifCount);
  const setBackHasMotifs = useAppStateStore((state) => state.setBackHasMotifs);
  const setBackMotifSizeX = useAppStateStore((state) => state.setBackMotifSizeX);
  const setBackMotifSizeY = useAppStateStore((state) => state.setBackMotifSizeY);
  const setBackMotifCount = useAppStateStore((state) => state.setBackMotifCount);

  const motifSizes = [
    { id: "small", name: "Small" },
    { id: "medium", name: "Medium" },
    { id: "large", name: "Large" },
    { id: "big", name: "Big" }
  ];

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">✨</span> Back Motifs Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="back-motifs"
            checked={backHasMotifs}
            onCheckedChange={(checked) => setBackHasMotifs(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="back-motifs" className="text-sm font-medium cursor-pointer">
            Motifs present
          </Label>
        </Card>

        {backHasMotifs && (
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
                      value={backMotifSizeX || ''}
                      onChange={(e) => setBackMotifSizeX(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
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
                      value={backMotifSizeY || ''}
                      onChange={(e) => setBackMotifSizeY(parseFloat(e.target.value) || 0)}
                      placeholder="0.0"
                      className="h-8 text-sm"
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
                  value={backMotifCount}
                  onChange={(e) => setBackMotifCount(e.target.value)}
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
