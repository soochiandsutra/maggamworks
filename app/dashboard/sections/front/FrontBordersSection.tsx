"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";

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

  const hasBlouseBottom = front.hasBlouseBottom !== null ? front.hasBlouseBottom : all.hasBlouseBottom;
  const blouseBottomSize = front.blouseBottomSize !== null ? front.blouseBottomSize : all.blouseBottomSize;

  return (
    <SectionWrapper
      title="Front Border Details"
      icon="🔲"
    >
      <div className="space-y-2 p-4 rounded-lg bg-muted/10">
        <CheckboxCard
          id="front-borders"
          checked={!!hasBorders}
          onCheckedChange={(checked) => setFrontHasBorders(checked as boolean)}
          label="Main borders present"
        />

        {hasBorders && (
          <NumberInput
            id="front-border-size"
            label="Main borders Size"
            value={borderSize}
            onChange={setFrontBorderSize}
            unit="inches"
          />
        )}
      </div>

      <div className="space-y-2 p-4 rounded-lg bg-muted/10">
        <CheckboxCard
          id="front-blouse-bottom"
          checked={!!hasBlouseBottom}
          onCheckedChange={(checked) => setFrontHasBlouseBottom(checked as boolean)}
          label="Blouse bottom present"
        />

        {hasBlouseBottom && (
          <NumberInput
            id="front-blouse-bottom-size"
            label="Blouse bottom Size"
            value={blouseBottomSize}
            onChange={setFrontBlouseBottomSize}
            unit="inches"
          />
        )}
      </div>
    </SectionWrapper>
  );
}
