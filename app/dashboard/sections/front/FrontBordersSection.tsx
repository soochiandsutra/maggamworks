"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";

export default function FrontBordersSection() {
  const {
    front,
    setFrontHasBorders,
    setFrontBorderSize,
    setFrontHasBlouseBottom,
    setFrontBlouseBottomSize,
  } = useAppStateStore();

  return (
    <SectionWrapper
      title="Front Border Details"
      icon="🔲"
    >
      <CheckboxCard
        id="front-borders"
        checked={front.hasBorders}
        onCheckedChange={setFrontHasBorders}
        label="main borders"
      />

      <CheckboxCard
        id="front-blouse-bottom"
        checked={front.hasBlouseBottom}
        onCheckedChange={setFrontHasBlouseBottom}
        label="Blouse bottom"
      />

      {front.hasBorders && (
        <NumberInput
          id="front-border-size"
          label="main borders Size"
          value={front.borderSize}
          onChange={setFrontBorderSize}
          unit="inches"
        />
      )}

      {front.hasBlouseBottom && (
        <NumberInput
          id="front-blouse-bottom-size"
          label="Blouse bottom Size"
          value={front.blouseBottomSize}
          onChange={setFrontBlouseBottomSize}
          unit="inches"
        />
      )}
    </SectionWrapper>
  );
}
