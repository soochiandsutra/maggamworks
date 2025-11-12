"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function HandsOthersSection() {
  const {
    hands: {
      selectedTechniques: handsSelectedTechniques,
      techniquePercentages: handsTechniquePercentages,
      coverage: handsCoverage,
    },
    all: {
      selectedTechniques: allSelectedTechniques = [],
      techniquePercentages: allTechniquePercentages = {},
      coverage: allCoverage = 50,
    },
    setHandsSelectedTechniques,
    setHandsTechniquePercentages,
    setHandsCoverage,
  } = useAppStateStore();

  const effectiveCoverage = handsCoverage !== null ? handsCoverage : (allCoverage ?? 50);

  const effectiveSelectedTechniques = handsSelectedTechniques !== null ? handsSelectedTechniques : allSelectedTechniques;
  const effectiveTechniquePercentages = handsTechniquePercentages !== null ? handsTechniquePercentages : allTechniquePercentages;

  // Ensure effectiveSelectedTechniques is always an array
  const techniques = effectiveSelectedTechniques || [];
  const techniquePercentages = effectiveTechniquePercentages || {};

  const embroideryTechniques = [
    { id: "challa-work", name: "Challa work", icon: "🧵" },
    { id: "paani-work", name: "Paani work", icon: "💧" },
    { id: "chamki-filling", name: "Chamki filling", icon: "✨" },
    { id: "cutdana-filling", name: "Cutdana filling", icon: "💎" },
    { id: "lavangam-kuttu", name: "Lavangam Kuttu", icon: "🌾" },
    { id: "sugar-bead", name: "Sugar bead", icon: "🔮" },
    { id: "thread-filling", name: "Thread filling", icon: "🧶" },
    { id: "sugar-bead-chamki", name: "Sugar bead + Chamki", icon: "💫" },
    { id: "zardosi-challa", name: "Zardosi Challa", icon: "⭐" },
    { id: "thread-knot", name: "Thread Knot", icon: "🪢" },
    { id: "mirror-zarkan", name: "Mirror / Zarkans", icon: "🪞" },
    { id: "zardosi-rose", name: "Zardosi rose", icon: "🌹" },
    { id: "thread-roses", name: "Thread roses", icon: "🌺" },
    { id: "zardosi-chain", name: "Zardosi chain", icon: "🔗" },
    { id: "knot-w-chamki", name: "Knot W/ chamki", icon: "💠" }
  ];

  const handleTechniqueChange = (techniqueId: string, techniqueName: string, checked: boolean) => {
    if (checked) {
      setHandsSelectedTechniques([...techniques, techniqueName]);
      // Initialize percentage to 50% if not already set
      if (!techniquePercentages[techniqueName]) {
        setHandsTechniquePercentages({
          ...techniquePercentages,
          [techniqueName]: 50
        });
      }
    } else {
      setHandsSelectedTechniques(techniques.filter(t => t !== techniqueName));
      // Remove the percentage when unchecked
      const newPercentages = { ...techniquePercentages };
      delete newPercentages[techniqueName];
      setHandsTechniquePercentages(newPercentages);
    }
  };

  // Preview Section - Normalized Percentages (moved to top)
  const renderPreview = () => {
    if (techniques.length === 0) return null;

    return (
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 ring-1 ring-blue-300">
        <Label className="text-sm font-medium text-blue-900 mb-3 block">📊 Normalized Distribution</Label>
        <div className="space-y-2">
          {(() => {
            // Calculate normalized percentages
            const totalPercentage = techniques.reduce((sum, technique) => {
              return sum + (techniquePercentages[technique] || 50);
            }, 0);

            return techniques.map((technique) => {
              const rawPercentage = techniquePercentages[technique] || 50;
              const normalizedPercentage = totalPercentage > 0 ? (rawPercentage / totalPercentage) * 100 : 0;

              return (
                  <div key={`preview-${technique}`} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">{technique}</span>
                    <span className="text-sm">
                      <span className="text-blue-500 font-normal">({rawPercentage}%)</span>
                      <span className="text-blue-900 font-bold ml-1">{normalizedPercentage.toFixed(1)}%</span>
                    </span>
                  </div>
              );
            });
          })()}
        </div>
      </Card>
    );
  };

  return (
    <div className="grid gap-4">
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        <span className="text-primary">🔧</span> Hands Embroidery Techniques
      </h3>

      <div className="space-y-4">
        {/* Coverage Slider */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 ring-1 ring-purple-300">
          <Label className="text-sm font-medium text-purple-900 mb-3 block">📏 Coverage Percentage</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-purple-900">{effectiveCoverage}%</span>
            </div>
            <Slider
              value={[effectiveCoverage]}
              onValueChange={(value) => setHandsCoverage(value[0])}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
        </Card>

        {/* Preview Section - Normalized Percentages (moved to top) */}
        {renderPreview()}

        <div className="space-y-3">
          <Label className="text-sm font-medium">Available Techniques</Label>
          <div className="grid grid-cols-1 gap-3">
            {embroideryTechniques.map((technique) => {
              const isSelected = techniques.includes(technique.name);
              return (
                <Card key={technique.id} className="relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all">
                  <Checkbox
                    id={`hands-${technique.id}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => handleTechniqueChange(technique.id, technique.name, checked as boolean)}
                    className="absolute right-4 top-4 h-5 w-5"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{technique.icon}</span>
                    <div className="flex-1">
                      <Label htmlFor={`hands-${technique.id}`} className="text-sm font-medium cursor-pointer">
                        {technique.name}
                      </Label>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {technique.name} - {techniquePercentages[technique.name] || 50}%
                        </Label>
                        <Slider
                          value={[techniquePercentages[technique.name] || 50]}
                          onValueChange={(value) => setHandsTechniquePercentages({
                            ...techniquePercentages,
                            [technique.name]: value[0]
                          })}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
