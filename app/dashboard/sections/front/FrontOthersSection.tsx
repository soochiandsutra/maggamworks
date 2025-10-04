"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function FrontOthersSection() {
  const {
    frontSelectedTechniques = [],
    frontTechniquePercentages = {},
    setFrontSelectedTechniques,
    setFrontTechniquePercentage
  } = useAppStateStore();

  const embroideryTechniques = [
    { id: "challa-work", name: "Challa work", icon: "🧵" },
    { id: "paani-work", name: "Paani work / chamki filling / culdhan filling", icon: "💧" },
    { id: "knot-work", name: "Knot work", icon: "🪢" },
    { id: "lavangam-kuttu", name: "Lavangam Kuttu / sugar bead filling", icon: "🌾" },
    { id: "thread-filling", name: "Thread filling", icon: "🧶" },
    { id: "small-mirror", name: "Small mirror", icon: "🪞" },
    { id: "zardosi-challa", name: "Zardosi challa work", icon: "✨" },
    { id: "zardosi-knot", name: "Zardosi Knot work", icon: "🔗" },
    { id: "zardosi-loading", name: "Zardosi loading", icon: "⚖️" },
    { id: "zardosi-filling", name: "Zardosi filling", icon: "🎨" },
    { id: "zardose-rose", name: "Zardose rose", icon: "🌹" },
    { id: "zardosi-cross", name: "Zardosi cross line / chain like Zardosi", icon: "➕" },
    { id: "knot-chamki", name: "Knot work with chamki", icon: "✨" },
    { id: "thread-roses", name: "Thread roses", icon: "🌹" }
  ];

  const handleTechniqueChange = (technique: string, checked: boolean) => {
    if (checked) {
      setFrontSelectedTechniques([...frontSelectedTechniques, technique]);
      // Initialize percentage to 50% if not already set
      if (!frontTechniquePercentages[technique]) {
        setFrontTechniquePercentage(technique, 50);
      }
    } else {
      setFrontSelectedTechniques(frontSelectedTechniques.filter(t => t !== technique));
    }
  };

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🔧</span> Front Type of Work - Embroidery Techniques
      </h3>
      <div className="space-y-4">
        {frontSelectedTechniques.length > 0 && (
          <Card className="p-4 bg-primary/5 border border-primary/20 ring-1 ring-primary/30">
            <Label className="text-sm font-medium text-primary">Selected techniques:</Label>
            <div className="flex flex-wrap gap-2 mt-3">
              {frontSelectedTechniques.map((technique) => (
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

        {frontSelectedTechniques.length > 0 && (
          <div className="space-y-4">
            <Label className="text-sm font-medium">Technique Intensity (%)</Label>
            <div className="space-y-3">
              {frontSelectedTechniques.map((technique) => (
                <Card key={technique} className="p-4 ring-1 border-border ring-border/30">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">{technique}</Label>
                    <span className="text-sm text-muted-foreground">
                      {frontTechniquePercentages[technique] || 50}%
                    </span>
                  </div>
                  <Slider
                    value={[frontTechniquePercentages[technique] || 50]}
                    onValueChange={(value) => setFrontTechniquePercentage(technique, value[0])}
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

        <Label className="text-sm font-medium">Select embroidery techniques used on front:</Label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {embroideryTechniques.map((technique) => (
            <Card
              key={technique.id}
              className={`relative cursor-pointer p-4 ring-1 transition-all ${
                frontSelectedTechniques.includes(technique.name)
                  ? "border-primary ring-primary bg-primary/5"
                  : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
              }`}
              onClick={() => handleTechniqueChange(technique.name, !frontSelectedTechniques.includes(technique.name))}
            >
              <div className="absolute right-3 top-3">
                <Checkbox
                  id={technique.id + '-front'}
                  checked={frontSelectedTechniques.includes(technique.name)}
                  onChange={() => {}}
                  className="h-5 w-5"
                />
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">{technique.icon}</span>
                <Label
                  htmlFor={technique.id + '-front'}
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
