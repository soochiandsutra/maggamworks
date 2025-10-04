'use client';

import { useAppStateStore } from '@/lib/store/appState';
import { calculateTime, CalculationResult } from '@/lib/caluclate';

export default function AllOverviewContent() {
  const store = useAppStateStore();
  const calculation: CalculationResult = calculateTime(store);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}.${mins} hrs`;
  };

  const totalNeck = calculation.breakdown.front.neck + calculation.breakdown.back.neck + calculation.breakdown.hands.neck;
  const totalBorders = calculation.breakdown.front.borders + calculation.breakdown.back.borders + calculation.breakdown.hands.borders;
  const totalMotifs = calculation.breakdown.front.motifs + calculation.breakdown.back.motifs + calculation.breakdown.hands.motifs;
  const totalFillWork = calculation.breakdown.front.fillWork + calculation.breakdown.back.fillWork + calculation.breakdown.hands.fillWork;
  const totalOthers = calculation.breakdown.front.others + calculation.breakdown.back.others + calculation.breakdown.hands.others;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">📊</span> Total Projects
          </h3>
          <p className="text-2xl font-bold text-primary">1</p>
          <p className="text-sm text-muted-foreground">Current project</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">⏱️</span> Total Hours
          </h3>
          <p className="text-2xl font-bold text-primary">{formatTime(calculation.totalTime)}</p>
          <p className="text-sm text-muted-foreground">Estimated time</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-primary">💰</span> Revenue
          </h3>
          <p className="text-2xl font-bold text-primary">₹{Math.round(calculation.totalTime * 200)}</p>
          <p className="text-sm text-muted-foreground">Estimated (₹200/hr)</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Complete Work Overview</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Select a specific work category from the bottom navigation to see detailed time estimates.
        </p>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">📏 Size</div>
            <div className="text-muted-foreground">{formatTime(totalOthers)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">👔 Neck</div>
            <div className="text-muted-foreground">{formatTime(totalNeck)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">{formatTime(totalBorders)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">{formatTime(totalMotifs)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">{formatTime(totalFillWork)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔧 Others</div>
            <div className="text-muted-foreground">{formatTime(totalOthers)}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded">
          <div className="text-center">
            <div className="font-medium text-primary">Total Project Time</div>
            <div className="text-lg font-bold">{formatTime(calculation.totalTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
