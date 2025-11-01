"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function BackBordersSection() {
  const {
    back,
    all,
    setBackHasBorders,
    setBackBorderSize,
    setBackHasBlouseBottom,
    setBackBlouseBottomSize,
  } = useAppStateStore();

  const hasBorders = back.hasBorders !== null ? back.hasBorders : all.hasBorders;
  const borderSize = back.borderSize !== null ? back.borderSize : all.borderSize;
  const isCustomBorders = back.hasBorders !== null;

  const hasBlouseBottom = back.hasBlouseBottom !== null ? back.hasBlouseBottom : all.hasBlouseBottom;
  const blouseBottomSize = back.blouseBottomSize !== null ? back.blouseBottomSize : all.blouseBottomSize;
  const isCustomBlouseBottom = back.hasBlouseBottom !== null;

  return (
    <SectionWrapper
      title="Back Border Details"
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
                  setBackHasBorders(all.hasBorders);
                  setBackBorderSize(all.borderSize);
                } else {
                  setBackHasBorders(null);
                  setBackBorderSize(null);
                }
              }}
            />
          </div>
        </div>
        
        <CheckboxCard
          id="back-borders"
          checked={hasBorders}
          onCheckedChange={(checked) => setBackHasBorders(checked as boolean)}
          label="Main borders present"
          disabled={!isCustomBorders}
        />

        {hasBorders && (
          <NumberInput
            id="back-border-size"
            label="Main borders Size"
            value={borderSize}
            onChange={setBackBorderSize}
            unit="inches"
            disabled={!isCustomBorders}
          />
        )}
      </div>

      {/* Blouse Bottom Inheritance */}
      <div className="space-y-2 p-4 border rounded-lg bg-muted/10">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Blouse Bottom</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {isCustomBlouseBottom ? "Custom" : `Inherited (${all.hasBlouseBottom ? 'Yes' : 'No'})`}
            </span>
            <Checkbox
              checked={isCustomBlouseBottom}
              onCheckedChange={(checked) => {
                if (checked) {
                  setBackHasBlouseBottom(all.hasBlouseBottom);
                  setBackBlouseBottomSize(all.blouseBottomSize);
                } else {
                  setBackHasBlouseBottom(null);
                  setBackBlouseBottomSize(null);
                }
              }}
            />
          </div>
        </div>
        
        <CheckboxCard
          id="back-blouse-bottom"
          checked={hasBlouseBottom}
          onCheckedChange={(checked) => setBackHasBlouseBottom(checked as boolean)}
          label="Blouse bottom present"
          disabled={!isCustomBlouseBottom}
        />

        {hasBlouseBottom && (
          <NumberInput
            id="back-blouse-bottom-size"
            label="Blouse bottom Size"
            value={blouseBottomSize}
            onChange={setBackBlouseBottomSize}
            unit="inches"
            disabled={!isCustomBlouseBottom}
          />
        )}
      </div>
    </SectionWrapper>
  );
}
