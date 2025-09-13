"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FrontBordersSection() {
  const {
    frontHasBorders,
    frontBorderSize,
    setFrontHasBorders,
    setFrontBorderSize,
  } = useAppStateStore();

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">🔲</span> Front Border Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="borders"
              checked={frontHasBorders}
              onCheckedChange={(checked) => setFrontHasBorders(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="borders" className="text-base font-medium cursor-pointer flex-1">
              Borders present
            </Label>
          </div>

          {frontHasBorders && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <Label className="text-base font-medium">Border Size</Label>
              <RadioGroup value={frontBorderSize} onValueChange={setFrontBorderSize} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="1-inch" id="border-1-inch" className="h-5 w-5" />
                  <Label htmlFor="border-1-inch" className="text-base cursor-pointer flex-1">
                    1 inch
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="2-inch" id="border-2-inch" className="h-5 w-5" />
                  <Label htmlFor="border-2-inch" className="text-base cursor-pointer flex-1">
                    2 inch
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
