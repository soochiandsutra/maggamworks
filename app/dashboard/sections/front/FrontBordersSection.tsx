"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FrontBordersSection() {
  const {
    front,
    all,
    setFrontHasBorders,
    setFrontBorderSize,
    setFrontHasBlouseBottom,
    setFrontBlouseBottomSize,
  } = useAppStateStore();

  const hasBorders = front.hasBorders !== null ? front.hasBorders : all.hasBorders;
  const borderSize = front.borderSize !== null ? front.borderSize : all.borderSize;
  const isCustomBorders = front.hasBorders !== null;

  const hasBlouseBottom = front.hasBlouseBottom !== null ? front.hasBlouseBottom : all.hasBlouseBottom;
  const blouseBottomSize = front.blouseBottomSize !== null ? front.blouseBottomSize : all.blouseBottomSize;
  const isCustomBlouseBottom = front.hasBlouseBottom !== null;

  return (
    <SectionWrapper
      title="Front Border Details"
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
                  setFrontHasBorders(all.hasBorders);
                  setFrontBorderSize(all.borderSize);
                } else {
                  setFrontHasBorders(null);
                  setFrontBorderSize(null);
                }
              }}
            />
          </div>
        </div>
        
        <CheckboxCard
          id="front-borders"
          checked={hasBorders}
          onCheckedChange={(checked) => setFrontHasBorders(checked as boolean)}
          label="Main borders present"
          disabled={!isCustomBorders}
        />

        {hasBorders && (
          <NumberInput
            id="front-border-size"
            label="Main borders Size"
            value={borderSize}
            onChange={setFrontBorderSize}
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
                  setFrontHasBlouseBottom(all.hasBlouseBottom);
                  setFrontBlouseBottomSize(all.blouseBottomSize);
                } else {
                  setFrontHasBlouseBottom(null);
                  setFrontBlouseBottomSize(null);
                }
              }}
            />
          </div>
        </div>
        
        <CheckboxCard
          id="front-blouse-bottom"
          checked={hasBlouseBottom}
          onCheckedChange={(checked) => setFrontHasBlouseBottom(checked as boolean)}
          label="Blouse bottom present"
          disabled={!isCustomBlouseBottom}
        />

        {hasBlouseBottom && (
          <NumberInput
            id="front-blouse-bottom-size"
            label="Blouse bottom Size"
            value={blouseBottomSize}
            onChange={setFrontBlouseBottomSize}
            unit="inches"
            disabled={!isCustomBlouseBottom}
          />
        )}
      </div>
    </SectionWrapper>
  );
}
