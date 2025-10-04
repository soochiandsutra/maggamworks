'use client';

import { useAppStateStore } from '@/lib/store/appState';
import { calculateTime, CalculationResult } from '@/lib/caluclate';

export default function BackOverviewSection() {
  const store = useAppStateStore();
  const calculation: CalculationResult = calculateTime(store);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}.${mins} hrs`;
  };

  return (
    <div className="grid gap-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Back Panel Work Overview</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Select a specific back work category from the bottom navigation to see detailed time estimates.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">👔 Neck</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.neck)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.borders)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.motifs)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.fillWork)}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded">
          <div className="text-center">
            <div className="font-medium text-primary">Total Back Time</div>
            <div className="text-lg font-bold">{formatTime(calculation.breakdown.back.total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
