"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";

export default function BackBordersSection() {
  const {
    back,
    setBackHasBorders,
    setBackBorderSize,
    setBackHasBlouseBottom,
    setBackBlouseBottomSize,
  } = useAppStateStore();

  return (
    <SectionWrapper
      title="Back Border Details"
      icon="🔲"
    >
      <CheckboxCard
        id="back-borders"
        checked={back.hasBorders}
        onCheckedChange={setBackHasBorders}
        label="main borders"
      />

      <CheckboxCard
        id="back-blouse-bottom"
        checked={back.hasBlouseBottom}
        onCheckedChange={setBackHasBlouseBottom}
        label="Blouse bottom"
      />

      {back.hasBorders && (
        <NumberInput
          id="back-border-size"
          label="main borders Size"
          value={back.borderSize}
          onChange={setBackBorderSize}
          unit="inches"
        />
      )}

      {back.hasBlouseBottom && (
        <NumberInput
          id="back-blouse-bottom-size"
          label="Blouse bottom Size"
          value={back.blouseBottomSize}
          onChange={setBackBlouseBottomSize}
          unit="inches"
        />
      )}
    </SectionWrapper>
  );
}
