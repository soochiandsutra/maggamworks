"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Ship, Waves, Plus } from "lucide-react";
import Image from "next/image";

// Data structure
const neckTypes = [
  { id: "boat", name: "Boat neck", icon: Ship },
  { id: "deep", name: "Deep neck", icon: Waves },
  { id: "other", name: "Other necks", icon: Plus },
];

const neckType2Data = [
  { id: 'round', name: 'Round Neck', seed: 'neck1' },
  { id: 'v', name: 'V Neck', seed: 'neck2' },
  { id: 'square', name: 'Square Neck', seed: 'neck3' },
  { id: 'sweetheart', name: 'Sweetheart', seed: 'neck4' },
];

// Reusable Components
function IconCard({
  item,
  isSelected,
  onClick,
  radioId
}: {
  item: typeof neckTypes[0],
  isSelected: boolean,
  onClick: () => void,
  radioId: string
}) {
  const Icon = item.icon;
  return (
    <Card
      className={`relative cursor-pointer p-3 gap-2 transition-all ring-1 ${
        isSelected
          ? "border-primary ring-primary bg-primary/5"
          : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
      }`}
      onClick={onClick}
    >
      <div className="absolute right-2">
        <RadioGroupItem
          value={item.id}
          id={radioId}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>
      <div className={`${isSelected ? "text-primary" : "text-muted-foreground"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <h3
        className={`text-sm font-medium ${
          isSelected ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {item.name}
      </h3>
    </Card>
  );
}

function ImageCard({
  item,
  isSelected,
  onClick,
  radioId,
  altPrefix = ""
}: {
  item: { id: string | number, name: string, seed?: string },
  isSelected: boolean,
  onClick: () => void,
  radioId: string,
  altPrefix?: string
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
          value={item.id.toString()}
          id={radioId}
          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>
      <div className="aspect-[1/1] relative">
        <Image
          src={`https://picsum.photos/seed/${item.seed || `neckdesign${item.id}`}/200/200.jpg`}
          alt={`${altPrefix}${item.name}`}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2">
        <h3
          className={`text-sm font-medium text-center ${
            isSelected ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {item.name}
        </h3>
      </div>
    </Card>
  );
}

export default function AllNeckSection() {
  const {
    allNeckType,
    allNeckDesignNumber,
    allNeckType2,
    allNeckType2DesignNumber,
    setAllNeckType,
    setAllNeckDesignNumber,
    setAllNeckType2,
    setAllNeckType2DesignNumber,
  } = useAppStateStore();

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">👔</span> All Neck Details
      </h3>
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Neck Type</Label>
          <RadioGroup value={allNeckType} onValueChange={setAllNeckType} className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {neckTypes.map((neck) => (
              <IconCard
                key={neck.id}
                item={neck}
                isSelected={allNeckType === neck.id}
                onClick={() => setAllNeckType(neck.id)}
                radioId={`all-${neck.id}-neck`}
              />
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Neck Design Numbers</Label>
          <RadioGroup value={allNeckDesignNumber} onValueChange={setAllNeckDesignNumber} className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {[1, 2, 3, 4, 5].map((num) => (
              <Card
                key={num}
                className={`relative cursor-pointer p-3 gap-2 transition-all ring-1 flex items-center justify-center ${
                  allNeckDesignNumber === num.toString()
                    ? "border-primary ring-primary bg-primary/5"
                    : "border-border ring-1 ring-border/30 hover:border-primary/30 hover:bg-primary/5"
                }`}
                onClick={() => setAllNeckDesignNumber(num.toString())}
              >
                <div className="absolute right-2 top-2">
                  <RadioGroupItem
                    value={num.toString()}
                    id={`all-design-${num}`}
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                </div>
                <h3
                  className={`text-sm font-medium ${
                    allNeckDesignNumber === num.toString() ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {num}
                </h3>
              </Card>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Neck Type 2</Label>
          <RadioGroup value={allNeckType2} onValueChange={setAllNeckType2} className="grid grid-cols-2 gap-3">
            {neckType2Data.map((neck) => (
              <ImageCard
                key={neck.id}
                item={neck}
                isSelected={allNeckType2 === neck.id}
                onClick={() => setAllNeckType2(neck.id)}
                radioId={`all-neck2-${neck.id}`}
              />
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Neck Type 2 Design Numbers</Label>
          <RadioGroup value={allNeckType2DesignNumber} onValueChange={setAllNeckType2DesignNumber} className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <ImageCard
                key={num}
                item={{ id: num, name: `Design ${num}` }}
                isSelected={allNeckType2DesignNumber === num.toString()}
                onClick={() => setAllNeckType2DesignNumber(num.toString())}
                radioId={`all-neck2-design-${num}`}
                altPrefix="Neck "
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
