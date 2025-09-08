"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BordersSection() {
  const [hasBorders, setHasBorders] = useState<boolean>(false);
  const [borderSize, setBorderSize] = useState<string>("");

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">🔲</span> All Border Details
        </h3>
        <div className="space-y-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Checkbox
              id="all-borders"
              checked={hasBorders}
              onCheckedChange={(checked) => setHasBorders(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="all-borders" className="text-base font-medium cursor-pointer flex-1">
              Borders present
            </Label>
          </div>

          {hasBorders && (
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              <Label className="text-base font-medium">Border Size</Label>
              <RadioGroup value={borderSize} onValueChange={setBorderSize} className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="1-inch" id="all-border-1-inch" className="h-5 w-5" />
                  <Label htmlFor="all-border-1-inch" className="text-base cursor-pointer flex-1">
                    1 inch
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="2-inch" id="all-border-2-inch" className="h-5 w-5" />
                  <Label htmlFor="all-border-2-inch" className="text-base cursor-pointer flex-1">
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
