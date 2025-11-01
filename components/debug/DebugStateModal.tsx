"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { StateValueDisplay } from "@/components/shared";
import { useDebugState } from "@/hooks/use-debug-state";
import type { StateValue } from "@/types/common";

interface DebugStateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DebugStateModal({ open, onOpenChange }: DebugStateModalProps) {
  const { stateValues, totalProperties } = useDebugState();

  const renderStateSection = (title: string, values: StateValue[]) => (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {values.map((item, index) => (
          <StateValueDisplay key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🐛 Zustand State Debugger
            <Badge variant="outline">{totalProperties} properties</Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {renderStateSection("Size Measurements", stateValues.sizes)}
          {renderStateSection("All Section", stateValues.all)}
          {renderStateSection("Front Section", stateValues.front)}
          {renderStateSection("Back Section", stateValues.back)}
          {renderStateSection("Hands Section", stateValues.hands)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
