"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HandsSizeSection() {
  const [armholeRound, setArmholeRound] = useState<string>("");
  const [handLength, setHandLength] = useState<string>("");
  const [handRound, setHandRound] = useState<string>("");

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
    </div>
  );
}
