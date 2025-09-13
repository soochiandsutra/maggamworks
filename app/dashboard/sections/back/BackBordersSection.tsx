"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BackBordersSection() {
  const {
    backHasBorders,
    backBorderSize,
    setBackHasBorders,
    setBackBorderSize,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🔲</span> Back Border Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="back-borders"
              checked={backHasBorders}
              onCheckedChange={(checked) => setBackHasBorders(checked as boolean)}
            />
            <Label htmlFor="back-borders" className="text-sm font-medium">
              Borders present
            </Label>
          </div>

          {backHasBorders && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Border Size</Label>
              <RadioGroup value={backBorderSize} onValueChange={setBackBorderSize}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-inch" id="back-border-1-inch" />
                  <Label htmlFor="back-border-1-inch">1 inch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-inch" id="back-border-2-inch" />
                  <Label htmlFor="back-border-2-inch">2 inch</Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
