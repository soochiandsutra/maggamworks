"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCalculations } from "@/hooks/use-calculations";
import { useAppStateStore } from "@/lib/store/appState";

interface CalculationSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function CalculationSummaryDialog({
  open,
  onOpenChange,
}: CalculationSummaryDialogProps) {
  const calculation = useCalculations();
  const store = useAppStateStore();

  // Debug: Log the calculation result
  console.log('Calculation result:', calculation);

  // Additional debug: Check if calculation is working
  console.log('Total time:', calculation.totalTime);
  console.log('Front total:', calculation.breakdown.front.total);
  console.log('Back total:', calculation.breakdown.back.total);
  console.log('Hands total:', calculation.breakdown.hands.total);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}.${mins} hrs`;
  };

  // Extract values from the nested store structure
  const {
    chestSize,
    armholeRound,
    handLength,
    handRound,
    all: {
      hasBorders: allHasBorders,
      hasFillWork: allHasFillWork,
      hasMotifs: allHasMotifs,
      techniquePercentages: allTechniquePercentages,
    },
    front: {
      hasBorders: frontHasBorders,
      hasFillWork: frontHasFillWork,
      hasMotifs: frontHasMotifs,
    },
    back: {
      hasBorders: backHasBorders,
      hasFillWork: backHasFillWork,
      hasMotifs: backHasMotifs,
    },
    hands: {
      hasBorders: handsHasBorders,
      hasFillWork: handsHasFillWork,
      hasMotifs: handsHasMotifs,
    },
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
                    <div className="text-muted-foreground font-normal">Chest: {chestSize}</div>
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
                    <div className="text-muted-foreground font-normal">Techniques: {Object.keys(allTechniquePercentages || {}).length} applied</div>
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