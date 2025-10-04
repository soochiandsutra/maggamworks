"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStateStore } from "@/lib/store/appState";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import Image from "next/image";

// Reusable Components
function ImageDesignCard({
  item,
  isSelected,
  onClick,
  radioId
}: {
  item: { id: string, name: string, imagePath: string },
  isSelected: boolean,
  onClick: () => void,
  radioId: string
}) {
  return (
    <Card
      className={`py-0 gap-0 relative cursor-pointer overflow-hidden transition-all ring-1 ${
        isSelected
          ? "border-primary ring-primary bg-primary/5"
          : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
      }`}
      onClick={onClick}
    >
      <div className="absolute right-2 top-2 z-10">
        <RadioGroupItem
          value={item.id}
          id={radioId}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>
      <div className="aspect-[1/1] relative">
        <Image
          src={item.imagePath}
          alt={`Hand design: ${item.name}`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-2">
        <h3 className={`text-sm font-medium text-center ${
          isSelected ? "text-primary" : "text-muted-foreground"
        }`}>
          {item.name}
        </h3>
      </div>
    </Card>
  );
}

export default function HandsSizeSection() {
  const {
    armholeRound,
    handLength,
    handRound,
    handsSelectedDesign,
    setArmholeRound,
    setHandLength,
    setHandRound,
    setHandsSelectedDesign,
  } = useAppStateStore();

  // Hand design options using actual images
  const handDesigns = [
    { id: "design1", name: "Hand Design 1", imagePath: "/images/hands/2.png" },
    { id: "design2", name: "Hand Design 2", imagePath: "/images/hands/3.jpeg" },
    { id: "design3", name: "Hand Design 3", imagePath: "/images/hands/4.png" },
  ];

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">📏</span> Hands Size Measurements
        </h3>
        <div className="grid gap-4 md:grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="hands-armhole-round">Sleeve Armhole round</Label>
            <Input
              id="hands-armhole-round"
              type="number"
              value={armholeRound}
              onChange={(e) => setArmholeRound(e.target.value)}
              placeholder="Enter armhole measurement"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hands-hand-length">Hand length</Label>
            <Input
              id="hands-hand-length"
              type="number"
              value={handLength}
              onChange={(e) => setHandLength(e.target.value)}
              placeholder="Enter hand length"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hands-hand-round">Hand round</Label>
            <Input
              id="hands-hand-round"
              type="number"
              value={handRound}
              onChange={(e) => setHandRound(e.target.value)}
              placeholder="Enter hand circumference"
            />
          </div>
        </div>
      </div>

      {/* Hand Design Selection */}
      <div>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🖼️</span> Select Hand Design
        </h3>
        <div className="mb-3">
          <Label className="text-sm font-medium">Choose a hand design pattern</Label>
          <RadioGroup value={handsSelectedDesign} onValueChange={setHandsSelectedDesign} className="grid grid-cols-2 gap-4 mt-2">
            {handDesigns.map((design) => (
              <ImageDesignCard
                key={design.id}
                item={design}
                isSelected={handsSelectedDesign === design.id}
                onClick={() => setHandsSelectedDesign(design.id)}
                radioId={`hands-design-${design.id}`}
              />
            ))}
          </RadioGroup>
        </div>
        {handsSelectedDesign && (
          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Selected: {handDesigns.find(d => d.id === handsSelectedDesign)?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
