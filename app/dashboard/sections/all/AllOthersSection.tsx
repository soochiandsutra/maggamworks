"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function AllOthersSection() {
  const {
    allSelectedTechniques = [],
    allTechniquePercentages = {},
    setAllSelectedTechniques,
    setAllTechniquePercentage
  } = useAppStateStore();

  // Ensure allSelectedTechniques is always an array
  const techniques = allSelectedTechniques;

  const embroideryTechniques = [
    { id: "challa-work", name: "Challa work (12 mins)", icon: "🧵" },
    { id: "paani-work", name: "Paani work (9.5 mins)", icon: "💧" },
    { id: "chambu-filling", name: "Chambu filling (7 mins)", icon: "🧵" },
    { id: "cutdana-filling", name: "Cutdana filling (7 mins)", icon: "💎" },
    { id: "lavangam-kuttu", name: "Lavangam Kuttu (7.5 mins)", icon: "🌾" },
    { id: "thread-filling", name: "Thread filling (8 mins)", icon: "🧶" },
    { id: "zardosi-chain-stitch", name: "Zardosi chain stitch (14 mins)", icon: "🔗" },
    { id: "thread-knot-work", name: "Thread knot work (21 mins)", icon: "🪢" },
    { id: "mirror-work", name: "Mirror work (7 mins)", icon: "🪞" },
    { id: "zarkan", name: "Zarkan (27 mins)", icon: "✨" },
    { id: "thread-roses", name: "Thread roses (30 mins)", icon: "🌹" },
    { id: "zardosi-rose", name: "Zardosi rose (27 mins)", icon: "🌹" }
  ];

  const handleTechniqueChange = (techniqueId: string, techniqueName: string, checked: boolean) => {
    if (checked) {
      setAllSelectedTechniques([...techniques, techniqueName]);
      // Initialize percentage to 50% if not already set
      if (!allTechniquePercentages[techniqueName]) {
        setAllTechniquePercentage(techniqueName, 50);
      }
    } else {
      setAllSelectedTechniques(techniques.filter(t => t !== techniqueName));
    }
  };

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🔧</span> Type of Work - Embroidery Techniques
      </h3>
      <div className="space-y-4">
        {techniques.length > 0 && (
          <Card className="p-4 bg-primary/5 border border-primary/20 ring-1 ring-primary/30">
            <Label className="text-sm font-medium text-primary">Selected techniques:</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {techniques.map((technique) => (
                <span
                  key={technique}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-primary/10 text-primary rounded-full font-medium"
                >
                  {technique}
                </span>
              ))}
            </div>
          </Card>
        )}

        {techniques.length > 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Technique Intensity (%)</Label>
            <div className="space-y-3">
              {techniques.map((technique) => (
                <Card key={technique} className="p-4 ring-1 border-border ring-border/30">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">{technique}</Label>
                    <span className="text-sm text-muted-foreground">
                      {allTechniquePercentages[technique] || 50}%
                    </span>
                  </div>
                  <Slider
                    value={[allTechniquePercentages[technique] || 50]}
                    onValueChange={(value) => setAllTechniquePercentage(technique, value[0])}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </Card>
              ))}
            </div>
          </div>
        )}

        <Label className="text-sm font-medium">Select embroidery techniques used:</Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {embroideryTechniques.map((technique) => (
            <Card
              key={technique.id}
              className={`relative cursor-pointer p-4 ring-1 transition-all ${
                techniques.includes(technique.name)
                  ? "border-primary ring-primary bg-primary/5"
                  : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
              }`}
              onClick={() => handleTechniqueChange(technique.id, technique.name, !techniques.includes(technique.name))}
            >
              <div className="absolute right-3 top-3">
                <Checkbox
                  id={technique.id}
                  checked={techniques.includes(technique.name)}
                  onChange={() => {}}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">{technique.icon}</span>
                <Label
                  htmlFor={technique.id}
                  className="text-sm font-medium cursor-pointer leading-relaxed flex-1 pr-6"
                >
                  {technique.name}
                </Label>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
