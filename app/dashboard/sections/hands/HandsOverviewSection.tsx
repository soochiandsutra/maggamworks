"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
// import { Card } from "@/components/ui/card"; // Commented out - not used in component
// import { RadioGroupItem } from "@/components/ui/radio-group"; // Commented out - not used in component
import { Ship, Waves, Plus } from "lucide-react";
import { TextCard } from "@/app/dashboard/components/RadioCards";
import { calculateTime, CalculationResult } from '@/lib/caluclate';

// Data structure
const neckTypes = [
  { id: "boat", name: "Boat neck", icon: Ship },
  { id: "deep", name: "Deep neck", icon: Waves },
  { id: "other", name: "Other necks", icon: Plus },
];

export default function HandsOverviewSection() {
  const {
    handsNeckType,
    handsNeckDesignNumber,
    setHandsNeckType,
    setHandsNeckDesignNumber,
  } = useAppStateStore();

  const calculation: CalculationResult = calculateTime(useAppStateStore.getState());

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}.${mins} hrs`;
  };

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Hand Work Overview</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Select a specific hand work category from the bottom navigation to see detailed time estimates.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">📏 Size</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.others)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.borders)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.motifs)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.fillWork)}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded">
          <div className="text-center">
            <div className="font-medium text-primary">Total Hands Time</div>
            <div className="text-lg font-bold">{formatTime(calculation.breakdown.hands.total)}</div>
          </div>
        </div>
      </div>

      {/* Neck Type Selection */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">👔</span> Type of Neck
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Neck Type</Label>
            <RadioGroup value={handsNeckType} onValueChange={setHandsNeckType} className="grid grid-cols-1 gap-3 md:grid-cols-3 mt-2">
              {neckTypes.map((neck) => (
                <TextCard
                  key={neck.id}
                  item={neck}
                  isSelected={handsNeckType === neck.id}
                  onClick={() => setHandsNeckType(neck.id)}
                  radioId={`hands-neck-${neck.id}`}
                />
              ))}
            </RadioGroup>
          </div>

          {handsNeckType && (
            <div>
              <Label className="text-sm font-medium">Design Numbers</Label>
              <RadioGroup value={handsNeckDesignNumber} onValueChange={setHandsNeckDesignNumber} className="grid grid-cols-3 gap-3 mt-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <TextCard
                    key={num}
                    item={{ id: num.toString(), name: `Design ${num}` }}
                    isSelected={handsNeckDesignNumber === num.toString()}
                    onClick={() => setHandsNeckDesignNumber(num.toString())}
                    radioId={`hands-neck-design-${num}`}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
