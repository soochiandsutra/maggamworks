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
  { id: "1", name: "Style 1", image: "/images/front/1.jpeg" },
  { id: "2", name: "Style 2", image: "/images/front/2.png" },
  { id: "3", name: "Style 3", image: "/images/front/3.png" },
  { id: "4", name: "Style 4", image: "/images/front/4.png" },
];

export default function FrontNeckSection() {
  const {
    front: { neckStyle: frontNeckStyle },
    setFrontNeckStyle,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">👔</span> Front Neck Styles
      </h3>
      <RadioGroup value={frontNeckStyle} onValueChange={setFrontNeckStyle}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {iconNeckOptions.map((neck) => (
            <IconCard
              key={neck.id}
              item={neck}
              isSelected={frontNeckStyle === neck.id}
              onClick={() => setFrontNeckStyle(neck.id)}
              radioId={`front-${neck.id}-neck`}
            />
          ))}
          {imageNeckOptions.map((neck) => (
            <ImageCard
              key={neck.id}
              item={neck}
              isSelected={frontNeckStyle === neck.id}
              onClick={() => setFrontNeckStyle(neck.id)}
              radioId={`front-${neck.id}-neck`}
              altPrefix="Front Neck "
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
