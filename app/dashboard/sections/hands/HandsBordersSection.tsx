"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { CheckboxCard, NumberInput, SectionWrapper } from "@/components/shared";

export default function HandsBordersSection() {
  const {
    hands,
    all,
    setHandsHasBorders,
    setHandsBorderSize,
  } = useAppStateStore();

  const hasBorders = hands.hasBorders !== null ? hands.hasBorders : all.hasBorders;
  const borderSize = hands.borderSize !== null ? hands.borderSize : all.borderSize;

  return (
    <SectionWrapper
      title="Hands Border Details"
      icon="🔲"
    >
      <div className="space-y-2 p-4 rounded-lg bg-muted/10">
        <CheckboxCard
          id="hands-borders"
          checked={!!hasBorders}
          onCheckedChange={(checked) => setHandsHasBorders(checked as boolean)}
          label="Main borders present"
        />

        {hasBorders && (
          <NumberInput
            id="hands-border-size"
            label="Main borders Size"
            value={borderSize}
            onChange={setHandsBorderSize}
            unit="inches"
          />
        )}
      </div>
    </SectionWrapper>
  );
}
