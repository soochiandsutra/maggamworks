"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { TextCard } from "@/app/dashboard/components/RadioCards";

export default function BordersSection() {
  const {
    allHasBorders,
    allBorderSize,
    setAllHasBorders,
    setAllBorderSize,
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
            Borders present
          </Label>
        </Card>

        {allHasBorders && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Border Size</Label>
            <RadioGroup value={allBorderSize} onValueChange={setAllBorderSize} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {borderSizes.map((size) => (
                <TextCard
                  key={size.id}
                  item={size}
                  isSelected={allBorderSize === size.id}
                  onClick={() => setAllBorderSize(size.id)}
                  radioId={`all-border-${size.id}`}
                />
              ))}
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
}
