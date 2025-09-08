"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function AllOthersSection() {
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
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">🔧</span> Type of Work - Embroidery Techniques
        </h3>
        <div className="space-y-6">
          <Label className="text-base font-medium">Select embroidery techniques used:</Label>
          <div className="space-y-3">
            {embroideryTechniques.map((technique) => (
              <div key={technique} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={technique.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}
                  checked={selectedTechniques.includes(technique)}
                  onCheckedChange={(checked) => handleTechniqueChange(technique, checked as boolean)}
                  className="h-5 w-5 mt-0.5"
                />
                <Label
                  htmlFor={technique.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}
                  className="text-base cursor-pointer leading-relaxed flex-1"
                >
                  {technique}
                </Label>
              </div>
            ))}
          </div>
          {selectedTechniques.length > 0 && (
            <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <Label className="text-base font-medium text-primary">Selected techniques:</Label>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTechniques.map((technique) => (
                  <span
                    key={technique}
                    className="inline-flex items-center px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium"
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
