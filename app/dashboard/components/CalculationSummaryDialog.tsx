"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStateStore } from "@/lib/store/appState";

interface CalculationSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function CalculationSummaryDialog({
  open,
  onOpenChange,
}: CalculationSummaryDialogProps) {
  const {
    // Size measurements
    chestSize,
    armholeRound,
    handLength,
    handRound,

    // All Section
    allHasBorders,
    allBorderSize,
    allNeckType,
    allNeckDesignNumber,
    allHasFillWork,
    allCoverage,
    allHasMotifs,
    allMotifSize,
    allMotifCount,
    allSelectedTechniques,

    // Front Section
    frontHasBorders,
    frontBorderSize,
    frontNeckType,
    frontNeckDesignNumber,
    frontHasFillWork,
    frontCoverage,
    frontHasMotifs,
    frontMotifSize,
    frontMotifCount,
    frontSelectedTechniques,

    // Back Section
    backHasBorders,
    backBorderSize,
    backNeckType,
    backNeckDesignNumber,
    backHasFillWork,
    backCoverage,
    backHasMotifs,
    backMotifSize,
    backMotifCount,
    backSelectedTechniques,

    // Hands Section
    handsHasBorders,
    handsBorderSize,
    handsHasFillWork,
    handsCoverage,
    handsHasMotifs,
    handsMotifSize,
    handsMotifCount,
    handsSelectedTechniques,
  } = useAppStateStore();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Project Summary</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground mb-6">
            All measurements and selections for your Maggam Works project
          </p>

          <div className="space-y-6">
            {/* Size Measurements */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">Size Measurements</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Chest Size</p>
                  <p className="text-lg">{chestSize || "NA"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Armhole Round</p>
                  <p className="text-lg">{armholeRound || "NA"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Hand Length</p>
                  <p className="text-lg">{handLength || "NA"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Hand Round</p>
                  <p className="text-lg">{handRound || "NA"}</p>
                </div>
              </div>
            </div>

            {/* All Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">All Sections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Borders</p>
                  <p className="text-muted-foreground">
                    {allHasBorders ? `Size: ${allBorderSize || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Neck Design</p>
                  <p className="text-muted-foreground">
                    {allNeckType ? `${allNeckType} #${allNeckDesignNumber || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Fill Work</p>
                  <p className="text-muted-foreground">
                    {allHasFillWork ? `Coverage: ${allCoverage || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Motifs</p>
                  <p className="text-muted-foreground">
                    {allHasMotifs ? `${allMotifSize || "NA"}, Count: ${allMotifCount || "NA"}` : "NA"}
                  </p>
                </div>
                {allSelectedTechniques.length > 0 && (
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm font-medium">Other Techniques</p>
                    <p className="text-muted-foreground">{allSelectedTechniques.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Front Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">Front Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Borders</p>
                  <p className="text-muted-foreground">
                    {frontHasBorders ? `Size: ${frontBorderSize || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Neck Design</p>
                  <p className="text-muted-foreground">
                    {frontNeckType ? `${frontNeckType} #${frontNeckDesignNumber || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Fill Work</p>
                  <p className="text-muted-foreground">
                    {frontHasFillWork ? `Coverage: ${frontCoverage || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Motifs</p>
                  <p className="text-muted-foreground">
                    {frontHasMotifs ? `${frontMotifSize || "NA"}, Count: ${frontMotifCount || "NA"}` : "NA"}
                  </p>
                </div>
                {frontSelectedTechniques.length > 0 && (
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm font-medium">Other Techniques</p>
                    <p className="text-muted-foreground">{frontSelectedTechniques.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Back Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">Back Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Borders</p>
                  <p className="text-muted-foreground">
                    {backHasBorders ? `Size: ${backBorderSize || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Neck Design</p>
                  <p className="text-muted-foreground">
                    {backNeckType ? `${backNeckType} #${backNeckDesignNumber || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Fill Work</p>
                  <p className="text-muted-foreground">
                    {backHasFillWork ? `Coverage: ${backCoverage || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Motifs</p>
                  <p className="text-muted-foreground">
                    {backHasMotifs ? `${backMotifSize || "NA"}, Count: ${backMotifCount || "NA"}` : "NA"}
                  </p>
                </div>
                {backSelectedTechniques.length > 0 && (
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm font-medium">Other Techniques</p>
                    <p className="text-muted-foreground">{backSelectedTechniques.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Hands Section */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-4 text-lg">Hands Section</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Borders</p>
                  <p className="text-muted-foreground">
                    {handsHasBorders ? `Size: ${handsBorderSize || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Fill Work</p>
                  <p className="text-muted-foreground">
                    {handsHasFillWork ? `Coverage: ${handsCoverage || "NA"}` : "NA"}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Motifs</p>
                  <p className="text-muted-foreground">
                    {handsHasMotifs ? `${handsMotifSize || "NA"}, Count: ${handsMotifCount || "NA"}` : "NA"}
                  </p>
                </div>
                {handsSelectedTechniques.length > 0 && (
                  <div className="space-y-2 md:col-span-2">
                    <p className="text-sm font-medium">Other Techniques</p>
                    <p className="text-muted-foreground">{handsSelectedTechniques.join(", ")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}