"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";

export default function HandsBordersSection() {
  const {
    hands,
    setHandsHasBorders,
    setHandsBorderSize,
  } = useAppStateStore();

  return (
    <SectionWrapper
      title="Hands Border Details"
      icon="🔲"
    >
      <CheckboxCard
        id="hands-borders"
        checked={hands.hasBorders}
        onCheckedChange={setHandsHasBorders}
        label="main borders"
      />

      {hands.hasBorders && (
        <NumberInput
          id="hands-border-size"
          label="main borders Size"
          value={hands.borderSize}
          onChange={setHandsBorderSize}
          unit="inches"
        />
      )}
    </SectionWrapper>
  );
}
