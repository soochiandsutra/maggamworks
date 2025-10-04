"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAppStateStore } from "@/lib/store/appState";

export default function AllSizeSection() {
  const {
    chestSize,
    armholeRound,
    handLength,
    handRound,
    setChestSize,
    setArmholeRound,
    setHandLength,
    setHandRound,
  } = useAppStateStore();

  const sizeInputs = [
    {
      id: "chest-size",
      label: "Chest Size/Blouse size (28-44)",
      value: chestSize,
      onChange: setChestSize,
      placeholder: "Enter chest size",
      min: 28,
      max: 44,
      icon: "📏"
    },
    {
      id: "armhole-round",
      label: "Sleeve Armhole round",
      value: armholeRound,
      onChange: setArmholeRound,
      placeholder: "Enter armhole measurement",
      icon: "🔄"
    },
    {
      id: "hand-length",
      label: "Hand length",
      value: handLength,
      onChange: setHandLength,
      placeholder: "Enter hand length",
      icon: "📏"
    },
    {
      id: "hand-round",
      label: "Hand round",
      value: handRound,
      onChange: setHandRound,
      placeholder: "Enter hand circumference",
      icon: "⭕"
    }
  ];

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">📏</span> Size Measurements
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {sizeInputs.map((input) => (
          <Card key={input.id} className="p-4 ring-1 border-border ring-border/30">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{input.icon}</span>
                <Label htmlFor={input.id} className="text-sm font-medium">
                  {input.label}
                </Label>
              </div>
              <Input
                id={input.id}
                type="number"
                min={input.min}
                max={input.max}
                value={input.value}
                onChange={(e) => input.onChange(e.target.value)}
                placeholder={input.placeholder}
                className="h-10 text-sm"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
