"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { RadioGroup } from "@/components/ui/radio-group";
import { ImageCard } from "@/components/custom-ui/RadioCards";

const imageNeckOptions = [
  { id: "style1", name: "Style 1", image: "/images/hands/1.jpeg" },
  { id: "style2", name: "Style 2", image: "/images/hands/2.png" },
  { id: "style3", name: "Style 3", image: "/images/hands/3.jpeg" },
  { id: "style4", name: "Style 4", image: "/images/hands/4.png" },
];

export default function HandsNeckSection() {
  const {
    hands: { neckStyle: handsNeckStyle },
    setHandsNeckStyle,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">👔</span> Hands Neck Styles
      </h3>
      <RadioGroup value={handsNeckStyle} onValueChange={setHandsNeckStyle}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {imageNeckOptions.map((neck) => (
            <ImageCard
              key={neck.id}
              item={neck}
              isSelected={handsNeckStyle === neck.id}
              onClick={() => setHandsNeckStyle(neck.id)}
              radioId={`hands-${neck.id}-neck`}
              altPrefix="Hands Neck "
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
