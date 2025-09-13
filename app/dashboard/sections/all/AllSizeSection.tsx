"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">📏</span> Size Measurements
        </h3>
        <div className="grid gap-6">
          <div className="space-y-3">
            <Label htmlFor="chest-size" className="text-base font-medium">
              Chest Size/Blouse size (28-44)
            </Label>
            <Input
              id="chest-size"
              type="number"
              min="28"
              max="44"
              value={chestSize}
              onChange={(e) => setChestSize(e.target.value)}
              placeholder="Enter chest size"
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="armhole-round" className="text-base font-medium">
              Sleeve Armhole round
            </Label>
            <Input
              id="armhole-round"
              type="number"
              value={armholeRound}
              onChange={(e) => setArmholeRound(e.target.value)}
              placeholder="Enter armhole measurement"
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="hand-length" className="text-base font-medium">
              Hand length
            </Label>
            <Input
              id="hand-length"
              type="number"
              value={handLength}
              onChange={(e) => setHandLength(e.target.value)}
              placeholder="Enter hand length"
              className="h-12 text-base"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="hand-round" className="text-base font-medium">
              Hand round
            </Label>
            <Input
              id="hand-round"
              type="number"
              value={handRound}
              onChange={(e) => setHandRound(e.target.value)}
              placeholder="Enter hand circumference"
              className="h-12 text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
