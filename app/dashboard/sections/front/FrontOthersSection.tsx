"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export default function FrontOthersSection() {
  const {
    front: {
      selectedTechniques: frontSelectedTechniques = [],
      techniquePercentages: frontTechniquePercentages = {},
      coverage: frontCoverage,
    },
    all: {
      coverage: allCoverage = 50,
    },
    setFrontSelectedTechniques,
    setFrontTechniquePercentages,
    setFrontCoverage,
  } = useAppStateStore();

  const effectiveCoverage = frontCoverage !== null ? frontCoverage : allCoverage;
  const isCustomCoverage = frontCoverage !== null;

  // Ensure frontSelectedTechniques is always an array
  const techniques = frontSelectedTechniques;

  const embroideryTechniques = [
    { id: "challa-work", name: "Challa work", icon: "🧵", timeValue: 12 },
    { id: "paani-work", name: "Paani work", icon: "💧", timeValue: 5 },
    { id: "chamki-filling", name: "Chamki filling", icon: "✨", timeValue: 5 },
    { id: "cutdana-filling", name: "Cutdana filling", icon: "💎", timeValue: 5 },
    { id: "lavangam-kuttu", name: "Lavangam Kuttu", icon: "🌾", timeValue: 7.5 },
    { id: "sugar-bead", name: "Sugar bead", icon: "🔮", timeValue: 7.5 },
    { id: "thread-filling", name: "Thread filling", icon: "🧶", timeValue: 8.5 },
    { id: "sugar-bead-chamki", name: "Sugar bead + Chamki", icon: "💫", timeValue: 8.5 },
    { id: "zardosi-challa", name: "Zardosi Challa", icon: "⭐", timeValue: 21 },
    { id: "thread-knot", name: "Thread Knot", icon: "🪢", timeValue: 21 },
    { id: "mirror-zarkan", name: "Mirror / Zarkans", icon: "🪞", timeValue: 7 },
    { id: "zardosi-rose", name: "Zardosi rose", icon: "🌹", timeValue: 27 },
    { id: "thread-roses", name: "Thread roses", icon: "🌺", timeValue: 30 },
    { id: "zardosi-chain", name: "Zardosi chain", icon: "🔗", timeValue: 14 },
    { id: "knot-w-chamki", name: "Knot W/ chamki", icon: "💠", timeValue: 17 }
  ];

  const handleTechniqueChange = (techniqueId: string, techniqueName: string, checked: boolean) => {
    if (checked) {
      setFrontSelectedTechniques([...techniques, techniqueName]);
      // Initialize percentage to 50% if not already set
      if (!frontTechniquePercentages[techniqueName]) {
        setFrontTechniquePercentages({
          ...frontTechniquePercentages,
          [techniqueName]: 50
        });
      }
    } else {
      setFrontSelectedTechniques(techniques.filter(t => t !== techniqueName));
      // Remove the percentage when unchecked
      const newPercentages = { ...frontTechniquePercentages };
      delete newPercentages[techniqueName];
      setFrontTechniquePercentages(newPercentages);
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
              return sum + (frontTechniquePercentages[technique] || 50);
            }, 0);

            return techniques.map((technique) => {
              const rawPercentage = frontTechniquePercentages[technique] || 50;
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
        <span className="text-primary">🔧</span> Front Embroidery Techniques
      </h3>
      <div className="space-y-4">
        {/* Coverage Slider */}
        <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 ring-1 ring-purple-300">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium text-purple-900">📏 Coverage Percentage</Label>
            <Checkbox
              checked={isCustomCoverage}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFrontCoverage(allCoverage);
                } else {
                  setFrontCoverage(null);
                }
              }}
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">
                {isCustomCoverage ? "Custom Coverage" : `Inherited (${allCoverage}%)`}
              </span>
              <span className="text-lg font-bold text-purple-900">{effectiveCoverage}%</span>
            </div>
            <Slider
              value={[effectiveCoverage]}
              onValueChange={(value) => setFrontCoverage(value[0])}
              max={100}
              min={0}
              step={1}
              className="w-full"
              disabled={!isCustomCoverage}
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
                <Card key={technique.id} className={`relative cursor-pointer p-4 ring-1 transition-all ${
                  isSelected
                    ? "border-primary ring-primary bg-primary/5"
                    : "border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2"
                }`}>
                  <div className="absolute right-3 top-3">
                    <Checkbox
                      id={`front-${technique.id}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleTechniqueChange(technique.id, technique.name, checked as boolean)}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{technique.icon}</span>
                    <div className="flex-1">
                      <Label htmlFor={`front-${technique.id}`} className="text-sm font-medium cursor-pointer">
                        {technique.name}
                      </Label>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {technique.name} - {frontTechniquePercentages[technique.name] || 50}%
                        </Label>
                        <Slider
                          value={[frontTechniquePercentages[technique.name] || 50]}
                          onValueChange={(value) => setFrontTechniquePercentages({
                            ...frontTechniquePercentages,
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

        {/* Calculation Breakdown */}
        {techniques.length > 0 && (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 ring-1 ring-green-300">
            <Label className="text-sm font-medium text-green-900 mb-3 block">🧮 Weighted Time Calculation</Label>
            <div className="space-y-3">
              {(() => {
                // Calculate normalized percentages and weighted times
                const totalPercentage = techniques.reduce((sum, technique) => {
                  return sum + (frontTechniquePercentages[technique] || 50);
                }, 0);

                let totalWeightedTime = 0;
                const calculations = techniques.map((technique) => {
                  const rawPercentage = frontTechniquePercentages[technique] || 50;
                  const normalizedPercentage = totalPercentage > 0 ? (rawPercentage / totalPercentage) * 100 : 0;
                  const techniqueData = embroideryTechniques.find(t => t.name === technique);
                  const timeValue = techniqueData?.timeValue || 0;
                  const weightedTime = timeValue * (normalizedPercentage / 100);
                  totalWeightedTime += weightedTime;

                  return {
                    technique,
                    timeValue,
                    normalizedPercentage,
                    weightedTime
                  };
                });

                return (
                  <>
                    {calculations.map((calc, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border border-green-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-green-900">{calc.technique}</span>
                          <span className="text-sm font-bold text-green-700">{calc.weightedTime.toFixed(2)} mins</span>
                        </div>
                        <div className="text-xs text-green-600">
                          {calc.timeValue} × {calc.normalizedPercentage.toFixed(1)}% = {calc.weightedTime.toFixed(2)}
                        </div>
                      </div>
                    ))}
                    <div className="bg-green-100 p-3 rounded border-2 border-green-400">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-green-900">Total Weighted Time</span>
                        <span className="text-lg font-bold text-green-700">{totalWeightedTime.toFixed(2)} mins</span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
