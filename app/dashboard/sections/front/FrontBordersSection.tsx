"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { TextCard } from "@/app/dashboard/components/RadioCards";
import { Input } from "@/components/ui/input";

export default function FrontBordersSection() {
  const {
    frontHasBorders,
    frontBorderSize,
    frontHasBlouseBottom,
    frontBlouseBottomSize,
    setFrontHasBorders,
    setFrontBorderSize,
    setFrontHasBlouseBottom,
    setFrontBlouseBottomSize,
  } = useAppStateStore();

  const borderSizes = [
    { id: "0.5-inch", name: "0.5 inch" },
    { id: "1-inch", name: "1 inch" },
    { id: "1.5-inch", name: "1.5 inch" },
    { id: "2-inch", name: "2 inch" },
    { id: "2.5-inch", name: "2.5 inch" },
    { id: "3-inch", name: "3 inch" },
    { id: "3.5-inch", name: "3.5 inch" },
    { id: "4-inch", name: "4 inch" },
    { id: "4.5-inch", name: "4.5 inch" },
    { id: "5-inch", name: "5 inch" }
  ];

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🔲</span> Front Border Details
      </h3>
      <div className="space-y-4">
        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="front-borders"
            checked={frontHasBorders}
            onCheckedChange={(checked) => setFrontHasBorders(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="front-borders" className="text-sm font-medium cursor-pointer">
            main borders
          </Label>
        </Card>

        <Card className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
          <Checkbox
            id="front-blouse-bottom"
            checked={frontHasBlouseBottom}
            onCheckedChange={(checked) => setFrontHasBlouseBottom(checked as boolean)}
            className="absolute right-4 top-4 h-5 w-5"
          />
          <Label htmlFor="front-blouse-bottom" className="text-sm font-medium cursor-pointer">
            Blouse bottom
          </Label>
        </Card>

        {frontHasBorders && (
          <Card className="p-4 ring-1 border-border ring-border/30">
            <div className="space-y-3">
              <Label htmlFor="front-border-size" className="text-sm font-medium">
                main borders Size (inches)
              </Label>
              <Input
                id="front-border-size"
                type="number"
                min="0"
                step="0.1"
                value={frontBorderSize || ''}
                onChange={(e) => setFrontBorderSize(parseFloat(e.target.value) || 0)}
                placeholder="0.0"
                className="h-10 text-sm"
              />
            </div>
          </Card>
        )}

        {frontHasBlouseBottom && (
          <Card className="p-4 ring-1 border-border ring-border/30">
            <div className="space-y-3">
              <Label htmlFor="front-blouse-bottom-size" className="text-sm font-medium">
                Blouse bottom Size (inches)
              </Label>
              <Input
                id="front-blouse-bottom-size"
                type="number"
                min="0"
                step="0.1"
                value={frontBlouseBottomSize || ''}
                onChange={(e) => setFrontBlouseBottomSize(parseFloat(e.target.value) || 0)}
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
