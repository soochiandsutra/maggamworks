"use client";

import { useAppStateStore } from "@/lib/store/appState";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function AllNeckSection() {
  const {
    allNeckType,
    allNeckDesignNumber,
    setAllNeckType,
    setAllNeckDesignNumber,
  } = useAppStateStore();

  return (
    <div className="grid gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-3 text-lg">
          <span className="text-primary text-xl">👔</span> All Neck Details
        </h3>
        <div className="space-y-8">
          <div className="space-y-4">
            <Label className="text-base font-medium">Neck Type</Label>
            <RadioGroup value={allNeckType} onValueChange={setAllNeckType} className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="boat" id="all-boat-neck" className="h-5 w-5" />
                <Label htmlFor="all-boat-neck" className="text-base cursor-pointer flex-1">
                  Boat neck
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="deep" id="all-deep-neck" className="h-5 w-5" />
                <Label htmlFor="all-deep-neck" className="text-base cursor-pointer flex-1">
                  Deep neck
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="other" id="all-other-neck" className="h-5 w-5" />
                <Label htmlFor="all-other-neck" className="text-base cursor-pointer flex-1">
                  Other necks
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-medium">Neck Design Numbers</Label>
            <RadioGroup value={allNeckDesignNumber} onValueChange={setAllNeckDesignNumber} className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center justify-center">
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors min-w-[60px] justify-center">
                    <RadioGroupItem value={num.toString()} id={`all-design-${num}`} className="h-5 w-5" />
                    <Label htmlFor={`all-design-${num}`} className="text-base cursor-pointer font-semibold">
                      {num}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
