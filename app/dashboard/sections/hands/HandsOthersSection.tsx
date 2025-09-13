"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function HandsOthersSection() {
  const { handsSelectedTechniques, setHandsSelectedTechniques } = useAppStateStore();

  const embroideryTechniques = [
    "Challa work",
    "Paani work / chamki filling / culdhan filling",
    "Knot work",
    "Lavangam Kuttu / sugar bead filling",
    "Thread filling",
    "Small mirror",
    "Zardosi challa work",
    "Zardosi Knot work",
    "Zardosi loading",
    "Zardosi filling",
    "Zardose rose",
    "Zardosi cross line / chain like Zardosi",
    "Knot work with chamki",
    "Thread roses"
  ];

  const handleTechniqueChange = (technique: string, checked: boolean) => {
    if (checked) {
      setHandsSelectedTechniques(prev => [...prev, technique]);
    } else {
      setHandsSelectedTechniques(prev => prev.filter(t => t !== technique));
    }
  };

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🔧</span> Hands Type of Work - Embroidery Techniques
        </h3>
        <div className="space-y-4">
          <Label className="text-sm font-medium">Select embroidery techniques used on hands/sleeves:</Label>
          <div className="grid gap-3 md:grid-cols-2">
            {embroideryTechniques.map((technique) => (
              <div key={technique} className="flex items-center space-x-2">
                <Checkbox
                  id={technique.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') + '-hands'}
                  checked={handsSelectedTechniques.includes(technique)}
                  onCheckedChange={(checked) => handleTechniqueChange(technique, checked as boolean)}
                />
                <Label
                  htmlFor={technique.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') + '-hands'}
                  className="text-sm"
                >
                  {technique}
                </Label>
              </div>
            ))}
          </div>
          {handsSelectedTechniques.length > 0 && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium">Selected techniques:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {handsSelectedTechniques.map((technique) => (
                  <span
                    key={technique}
                    className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                  >
                    {technique}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
