"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function HandsBordersSection() {
  const {
    hands,
    all,
    setHandsHasBorders,
    setHandsBorderSize,
  } = useAppStateStore();

  const hasBorders = hands.hasBorders !== null ? hands.hasBorders : all.hasBorders;
  const borderSize = hands.borderSize !== null ? hands.borderSize : all.borderSize;
  const isCustomBorders = hands.hasBorders !== null;

  return (
    <SectionWrapper
      title="Hands Border Details"
      icon="🔲"
    >
      {/* Main Borders Inheritance */}
      <div className="space-y-2 p-4 border rounded-lg bg-muted/10">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Main Borders</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {isCustomBorders ? "Custom" : `Inherited (${all.hasBorders ? 'Yes' : 'No'})`}
            </span>
            <Checkbox
              checked={isCustomBorders}
              onCheckedChange={(checked) => {
                if (checked) {
                  setHandsHasBorders(all.hasBorders);
                  setHandsBorderSize(all.borderSize);
                } else {
                  setHandsHasBorders(null);
                  setHandsBorderSize(null);
                }
              }}
            />
          </div>
        </div>
        
        <CheckboxCard
          id="hands-borders"
          checked={hasBorders}
          onCheckedChange={(checked) => setHandsHasBorders(checked as boolean)}
          label="Main borders present"
          disabled={!isCustomBorders}
        />

        {hasBorders && (
          <NumberInput
            id="hands-border-size"
            label="Main borders Size"
            value={borderSize}
            onChange={setHandsBorderSize}
            unit="inches"
            disabled={!isCustomBorders}
          />
        )}
      </div>
    </SectionWrapper>
  );
}
