"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { RadioGroup } from "@/components/ui/radio-group";
import { IconCard, ImageCard } from "@/components/custom-ui/RadioCards";
import { Ship, Waves } from "lucide-react";

const iconNeckOptions = [
  { id: "boat", name: "Boat Neck", icon: Ship },
  { id: "deep", name: "Deep Neck", icon: Waves },
];

const imageNeckOptions = [
  { id: "1", name: "Style 1", image: "/images/back/1.jpeg" },
  { id: "2", name: "Style 2", image: "/images/back/2.png" },
  { id: "3", name: "Style 3", image: "/images/back/3.png" },
  { id: "4", name: "Style 4", image: "/images/back/4.png" },
  { id: "5", name: "Style 5", image: "/images/back/5.png" },
  { id: "6", name: "Style 6", image: "/images/back/6.png" },
];

export default function BackNeckSection() {
  const {
    back: { neckStyle: backNeckStyle },
    setBackNeckStyle,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">👔</span> Back Neck Styles
      </h3>
      <RadioGroup value={backNeckStyle} onValueChange={setBackNeckStyle}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {iconNeckOptions.map((neck) => (
            <IconCard
              key={neck.id}
              item={neck}
              isSelected={backNeckStyle === neck.id}
              onClick={() => setBackNeckStyle(neck.id)}
              radioId={`back-${neck.id}-neck`}
            />
          ))}
          {imageNeckOptions.map((neck) => (
            <ImageCard
              key={neck.id}
              item={neck}
              isSelected={backNeckStyle === neck.id}
              onClick={() => setBackNeckStyle(neck.id)}
              radioId={`back-${neck.id}-neck`}
              altPrefix="Back Neck "
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
