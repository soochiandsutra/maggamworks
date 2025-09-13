"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function HandsBordersSection() {
  const {
    handsHasBorders,
    handsBorderSize,
    setHandsHasBorders,
    setHandsBorderSize,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🔲</span> Hands Border Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hands-borders"
              checked={handsHasBorders}
              onCheckedChange={(checked) => setHandsHasBorders(checked as boolean)}
            />
            <Label htmlFor="hands-borders" className="text-sm font-medium">
              Borders present
            </Label>
          </div>

          {handsHasBorders && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Border Size</Label>
              <RadioGroup value={handsBorderSize} onValueChange={setHandsBorderSize}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-inch" id="hands-border-1-inch" />
                  <Label htmlFor="hands-border-1-inch">1 inch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-inch" id="hands-border-2-inch" />
                  <Label htmlFor="hands-border-2-inch">2 inch</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
