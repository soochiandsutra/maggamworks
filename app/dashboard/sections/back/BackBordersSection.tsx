"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";

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

  const hasBlouseBottom = back.hasBlouseBottom !== null ? back.hasBlouseBottom : all.hasBlouseBottom;
  const blouseBottomSize = back.blouseBottomSize !== null ? back.blouseBottomSize : all.blouseBottomSize;

  return (
    <SectionWrapper
      title="Back Border Details"
      icon="🔲"
    >
      <div className="space-y-2 p-4 border rounded-lg bg-muted/10">
        <CheckboxCard
          id="back-borders"
          checked={!!hasBorders}
          onCheckedChange={(checked) => setBackHasBorders(checked as boolean)}
          label="Main borders present"
        />

        {hasBorders && (
          <NumberInput
            id="back-border-size"
            label="Main borders Size"
            value={borderSize}
            onChange={setBackBorderSize}
            unit="inches"
          />
        )}
      </div>

      <div className="space-y-2 p-4 border rounded-lg bg-muted/10">
        <CheckboxCard
          id="back-blouse-bottom"
          checked={!!hasBlouseBottom}
          onCheckedChange={(checked) => setBackHasBlouseBottom(checked as boolean)}
          label="Blouse bottom present"
        />

        {hasBlouseBottom && (
          <NumberInput
            id="back-blouse-bottom-size"
            label="Blouse bottom Size"
            value={blouseBottomSize}
            onChange={setBackBlouseBottomSize}
            unit="inches"
          />
        )}
      </div>
    </SectionWrapper>
  );
}
