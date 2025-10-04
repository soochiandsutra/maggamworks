"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStateStore } from "@/lib/store/appState";
import { calculateTime, CalculationResult } from "@/lib/caluclate";

interface CalculationSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function CalculationSummaryDialog({
  open,
  onOpenChange,
}: CalculationSummaryDialogProps) {
  const store = useAppStateStore();
  const calculation: CalculationResult = calculateTime(store);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}.${mins} hrs`;
  };

  const {
    // Size measurements
    chestSize,
    armholeRound,
    handLength,
    handRound,

    // All Section
    allHasBorders,
    // allBorderSize, // Commented out - may be needed for future detailed views
    // allNeckType, // Commented out - may be needed for future detailed views
    // allNeckDesignNumber, // Commented out - may be needed for future detailed views
    allHasFillWork,
    // allCoverage, // Commented out - may be needed for future detailed views
    allHasMotifs,
    // allMotifSize, // Commented out - may be needed for future detailed views
    // allMotifCount, // Commented out - may be needed for future detailed views
    // allSelectedTechniques, // Commented out - may be needed for future detailed views
    // allTechniquePercentages, // Commented out - may be needed for future detailed views

    // Front Section
    frontHasBorders,
    // frontBorderSize, // Commented out - may be needed for future detailed views
    // frontNeckType, // Commented out - may be needed for future detailed views
    // frontNeckDesignNumber, // Commented out - may be needed for future detailed views
    frontHasFillWork,
    // frontCoverage, // Commented out - may be needed for future detailed views
    frontHasMotifs,
    // frontMotifSize, // Commented out - may be needed for future detailed views
    // frontMotifCount, // Commented out - may be needed for future detailed views
    // frontSelectedTechniques, // Commented out - may be needed for future detailed views

    // Back Section
    backHasBorders,
    // backBorderSize, // Commented out - may be needed for future detailed views
    // backNeckType, // Commented out - may be needed for future detailed views
    // backNeckDesignNumber, // Commented out - may be needed for future detailed views
    backHasFillWork,
    // backCoverage, // Commented out - may be needed for future detailed views
    backHasMotifs,
    // backMotifSize, // Commented out - may be needed for future detailed views
    // backMotifCount, // Commented out - may be needed for future detailed views
    // backSelectedTechniques, // Commented out - may be needed for future detailed views

    // Hands Section
    handsHasBorders,
    // handsBorderSize, // Commented out - may be needed for future detailed views
    handsHasFillWork,
    // handsCoverage, // Commented out - may be needed for future detailed views
    handsHasMotifs,
    // handsMotifSize, // Commented out - may be needed for future detailed views
    // handsMotifCount, // Commented out - may be needed for future detailed views
    // handsSelectedTechniques, // Commented out - may be needed for future detailed views
  } = store;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground font-bold">Project Summary</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-4">
            {/* Summary Header */}
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-center space-y-2">
                <div className="text-3xl font-black text-primary">{formatTime(calculation.totalTime)}</div>
                <div className="text-sm text-secondary-foreground font-medium">Total Project Time</div>
                <div className="text-sm text-muted-foreground font-normal">
                  <span>{Math.round(calculation.totalTime / 8)} working days</span>
                </div>
              </div>
            </div>

            {/* Time Breakdown */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-3 text-foreground">Time Breakdown</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-secondary-foreground font-semibold">Front Panel Total</span>
                  <span className="font-black text-primary">{formatTime(calculation.breakdown.front.total)}</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Borders</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.front.borders)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Fill Work</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.front.fillWork)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Motifs</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.front.motifs)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-secondary-foreground font-semibold">Back Panel Total</span>
                  <span className="font-black text-primary">{formatTime(calculation.breakdown.back.total)}</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Borders</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.back.borders)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Fill Work</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.back.fillWork)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Motifs</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.back.motifs)}</span>
                  </div>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-secondary-foreground font-semibold">Hands/Sleeves Total</span>
                  <span className="font-black text-primary">{formatTime(calculation.breakdown.hands.total)}</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Borders</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.hands.borders)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Fill Work</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.hands.fillWork)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-normal">Motifs</span>
                    <span className="text-secondary-foreground font-medium">{formatTime(calculation.breakdown.hands.motifs)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-bold mb-3 text-foreground">Project Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold mb-2 text-secondary-foreground">Measurements</div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground font-normal">Chest: {chestSize || "—"}</div>
                    <div className="text-muted-foreground font-normal">Armhole: {armholeRound || "—"}</div>
                    <div className="text-muted-foreground font-normal">Hand Length: {handLength || "—"}</div>
                    <div className="text-muted-foreground font-normal">Hand Round: {handRound || "—"}</div>
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2 text-secondary-foreground">Configuration</div>
                  <div className="space-y-1">
                    <div className="text-muted-foreground font-normal">Borders: {[allHasBorders, frontHasBorders, backHasBorders, handsHasBorders].filter(Boolean).length} sections</div>
                    <div className="text-muted-foreground font-normal">Fill Work: {[allHasFillWork, frontHasFillWork, backHasFillWork, handsHasFillWork].filter(Boolean).length} sections</div>
                    <div className="text-muted-foreground font-normal">Motifs: {[allHasMotifs, frontHasMotifs, backHasMotifs, handsHasMotifs].filter(Boolean).length} sections</div>
                    <div className="text-muted-foreground font-normal">Techniques: {Object.keys(store.allTechniquePercentages || {}).length} applied</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}