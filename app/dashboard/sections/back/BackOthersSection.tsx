"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function BackOthersSection() {
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);

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
      setSelectedTechniques(prev => [...prev, technique]);
    } else {
      setSelectedTechniques(prev => prev.filter(t => t !== technique));
    }
  };

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <span className="text-primary">🔧</span> Back Type of Work - Embroidery Techniques
        </h3>
        <div className="space-y-4">
          <Label className="text-sm font-medium">Select embroidery techniques used on back:</Label>
          <div className="grid gap-3 md:grid-cols-2">
            {embroideryTechniques.map((technique) => (
              <div key={technique} className="flex items-center space-x-2">
                <Checkbox
                  id={technique.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') + '-back'}
                  checked={selectedTechniques.includes(technique)}
                  onCheckedChange={(checked) => handleTechniqueChange(technique, checked as boolean)}
                />
                <Label
                  htmlFor={technique.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-') + '-back'}
                  className="text-sm"
                >
                  {technique}
                </Label>
              </div>
            ))}
          </div>
          {selectedTechniques.length > 0 && (
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium">Selected techniques:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTechniques.map((technique) => (
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
