"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { NumberInput, SectionWrapper } from "@/components/shared";

export default function HandsSizeSection() {
  const {
    handLength,
    handRound,
    armholeRound,
    setHandLength,
    setHandRound,
    setArmholeRound,
  } = useAppStateStore();

  return (
    <SectionWrapper
      title="Hands Size Details"
      icon="📏"
      description="Configure the base measurements used for hand embroidery calculations. These measurements affect the time estimates for hand-specific work."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumberInput
          id="hands-length"
          label="Hand Length"
          value={parseFloat(handLength) || 0}
          onChange={(value) => setHandLength(value.toString())}
          unit="inches"
          placeholder="18.0"
          min={10}
        />

        <NumberInput
          id="hands-round"
          label="Hand Circumference"
          value={parseFloat(handRound) || 0}
          onChange={(value) => setHandRound(value.toString())}
          unit="inches"
          placeholder="8.0"
          min={6}
        />

        <NumberInput
          id="hands-armhole-round"
          label="Sleeve Armhole Round"
          value={parseFloat(armholeRound) || 0}
          onChange={(value) => setArmholeRound(value.toString())}
          unit="inches"
          placeholder="14.0"
          min={8}
        />
      </div>

      <div className="bg-muted/20 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Note:</strong> These measurements are used as the foundation for calculating embroidery time on hands/sleeves.
          The actual work time will be adjusted based on the complexity of borders, fill work, motifs, and selected techniques.
        </p>
      </div>
    </SectionWrapper>
  );
}
