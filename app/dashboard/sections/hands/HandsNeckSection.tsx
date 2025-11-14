"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { RadioGroup } from "@/components/ui/radio-group";
import { ImageCard } from "@/components/custom-ui/RadioCards";
import { calculateHandBorderLength } from "@/utils/border-calculations";

const imageNeckOptions = [
  { id: "style1", name: "Style 1", image: "/images/hands/1.jpeg" },
  { id: "style2", name: "Style 2", image: "/images/hands/2.png" },
  { id: "style3", name: "Style 3", image: "/images/hands/3.jpeg" },
  { id: "style4", name: "Style 4", image: "/images/hands/4.png" },
];

export default function HandsNeckSection() {
  const {
    hands: { selectedDesign },
    handRound,
    armholeRound,
    setHandsSelectedDesign,
  } = useAppStateStore();

  const HR = parseFloat(handRound) || 10;
  const AR = parseFloat(armholeRound) || 14;

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">👔</span> Hands Neck Styles
      </h3>
      <RadioGroup value={selectedDesign} onValueChange={setHandsSelectedDesign}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {imageNeckOptions.map((neck) => (
            <ImageCard
              key={neck.id}
              item={neck}
              isSelected={selectedDesign === neck.id}
              onClick={() => setHandsSelectedDesign(neck.id)}
              radioId={`hands-${neck.id}-neck`}
              altPrefix="Hands Neck "
            />
          ))}
        </div>
      </RadioGroup>

      {/* Border Length Calculation Display */}
      {selectedDesign && selectedDesign !== 'simple' && selectedDesign !== 'not selected' && (
        <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-border">
          <h4 className="font-semibold mb-3 text-sm text-primary">
            📐 Border Length Calculation
          </h4>
          <div className="space-y-3 text-sm">
            {selectedDesign === 'style1' && (
              <>
                <div className="font-mono text-xs bg-background p-2 rounded">
                  Formula: (HandRound - 2) × 2
                </div>
                <div className="text-muted-foreground">
                  With HandRound = {HR}
                </div>
                <div className="font-mono text-xs">
                  → ({HR} - 2) × 2 = {(HR - 2).toFixed(1)} × 2 = <span className="font-bold text-green-600">{calculateHandBorderLength('style1', HR, AR).result} inches</span>
                </div>
              </>
            )}
            {selectedDesign === 'style2' && (
              <>
                <div className="font-mono text-xs bg-background p-2 rounded">
                  Formula: (ArmholeRound - 2) × 2
                </div>
                <div className="text-muted-foreground">
                  With ArmholeRound = {AR}
                </div>
                <div className="font-mono text-xs">
                  → ({AR} - 2) × 2 = {(AR - 2).toFixed(1)} × 2 = <span className="font-bold text-green-600">{calculateHandBorderLength('style2', HR, AR).result} inches</span>
                </div>
              </>
            )}
            {selectedDesign === 'style3' && (
              <>
                <div className="font-mono text-xs bg-background p-2 rounded">
                  Formula: ((HandRound + ArmholeRound) / 2 - 2) × 2
                </div>
                <div className="text-muted-foreground">
                  With HandRound = {HR}, ArmholeRound = {AR}
                </div>
                <div className="font-mono text-xs space-y-1">
                  <div>→ (({HR} + {AR}) / 2 - 2) × 2</div>
                  <div>→ ({((HR + AR) / 2).toFixed(1)} - 2) × 2</div>
                  <div>→ {((HR + AR) / 2 - 2).toFixed(1)} × 2 = <span className="font-bold text-green-600">{calculateHandBorderLength('style3', HR, AR).result} inches</span></div>
                </div>
              </>
            )}
            {selectedDesign === 'style4' && (
              <>
                <div className="font-mono text-xs bg-background p-2 rounded">
                  Formula: HandRound + ArmholeRound
                </div>
                <div className="text-muted-foreground">
                  With HandRound = {HR}, ArmholeRound = {AR}
                </div>
                <div className="font-mono text-xs">
                  → {HR} + {AR} = <span className="font-bold text-green-600">{calculateHandBorderLength('style4', HR, AR).result} inches</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
