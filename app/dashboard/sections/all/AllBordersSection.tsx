"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function BordersSection() {
  const {
    all: {
      hasBorders: allHasBorders,
      borderSize: allBorderSize,
      hasBlouseBottom: allHasBlouseBottom,
      blouseBottomSize: allBlouseBottomSize,
    },
    setAllHasBorders,
    setAllBorderSize,
    setAllHasBlouseBottom,
    setAllBlouseBottomSize,
  } = useAppStateStore();


  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🔲</span> All Border Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="all-borders"
            checked={allHasBorders}
            onCheckedChange={(checked) => setAllHasBorders(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="all-borders" className="text-sm font-medium cursor-pointer">
            main borders
          </Label>
        </Card>

        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="all-blouse-bottom"
            checked={allHasBlouseBottom}
            onCheckedChange={(checked) => setAllHasBlouseBottom(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="all-blouse-bottom" className="text-sm font-medium cursor-pointer">
            Blouse bottom
          </Label>
        </Card>

        {allHasBorders && (
          <Card className="p-4 ring-1 border-border ring-border/30">
            <div className="space-y-3">
              <Label htmlFor="all-border-size" className="text-sm font-medium">
                main borders Size (inches)
              </Label>
              <Input
                id="all-border-size"
                type="number"
                min="0"
                step="0.1"
                value={allBorderSize || ''}
                onChange={(e) => setAllBorderSize(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="h-10 text-sm"
              />
            </div>
          </Card>
        )}

        {allHasBlouseBottom && (
          <Card className="p-4 ring-1 border-border ring-border/30">
            <div className="space-y-3">
              <Label htmlFor="all-blouse-bottom-size" className="text-sm font-medium">
                Blouse bottom Size (inches)
              </Label>
              <Input
                id="all-blouse-bottom-size"
                type="number"
                min="0"
                step="0.1"
                value={allBlouseBottomSize || ''}
                onChange={(e) => setAllBlouseBottomSize(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="h-10 text-sm"
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
