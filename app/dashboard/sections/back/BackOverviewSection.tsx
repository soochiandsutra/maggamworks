"use client";

import { useCalculations } from "@/hooks/use-calculations";
import { useAppStateStore } from "@/lib/store/appState";
import { formatTime } from "@/utils/formatters";
import { calculateBackFillworkArea } from "@/utils/fillwork-calculations";
import { getBackNeckTypeValue } from "@/utils/neck-type-values";
import { calculateBackTopBorder, calculateBottomBorder, calculateMotifValue } from "@/utils/border-motif-calculations";

export default function BackOverviewSection() {
  const calculation = useCalculations();
  const store = useAppStateStore();

  // Helper function to format values
  const formatValue = (value: any) => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.length > 0 ? value.join(', ') : 'None';
    if (typeof value === 'object' && value !== null) {
      const entries = Object.entries(value);
      if (entries.length === 0) return 'None';
      return entries.map(([k, v]) => `${k}: ${v}`).join(', ');
    }
    return String(value);
  };

  // Group values by category for Back section
  const getGroupedValues = () => {
    const groups = [];

    // Borders group
    const bordersValues = [];
    bordersValues.push({ label: 'Enabled', value: store.back.hasBorders ? 'Yes' : 'No', default: 'No', enabled: store.back.hasBorders });
    if (store.back.hasBorders) {
      bordersValues.push({ label: 'Border Size', value: store.back.borderSize, default: '0', enabled: true });
    } else {
      bordersValues.push({ label: 'Border Size', value: store.back.borderSize, default: '0', enabled: false });
    }
    // Add blouse bottom to borders
    bordersValues.push(
      { label: 'Blouse Bottom Enabled', value: store.back.hasBlouseBottom ? 'Yes' : 'No', default: 'No', enabled: store.back.hasBlouseBottom },
      { label: 'Blouse Bottom Size', value: store.back.blouseBottomSize, default: '0', enabled: store.back.hasBlouseBottom }
    );
    groups.push({ section: 'Borders', values: bordersValues });

    // Border Calculation section - always show
    const borderCalcValues = [];
    const chestSize = parseFloat(store.chestSize) || 36;
    
    if (store.back.hasBorders && store.back.neckStyle !== 'not selected') {
      const topBorderCalc = calculateBackTopBorder(
        store.back.neckStyle,
        chestSize,
        store.back.borderSize
      );
      
      borderCalcValues.push({
        label: 'Top Border Formula',
        value: topBorderCalc.formula,
        default: '-',
        enabled: true
      });

      Object.entries(topBorderCalc.inputs).forEach(([key, value]) => {
        borderCalcValues.push({
          label: key,
          value: typeof value === 'number' ? value.toFixed(3) : value,
          default: '-',
          enabled: true
        });
      });

      borderCalcValues.push({
        label: 'Top Border Result',
        value: `${topBorderCalc.result.toFixed(3)} inches`,
        default: '-',
        enabled: true
      });
    }
    
    if (store.back.hasBlouseBottom) {
      const bottomBorderCalc = calculateBottomBorder(chestSize, store.back.blouseBottomSize);
      
      borderCalcValues.push({
        label: 'Bottom Border Formula',
        value: bottomBorderCalc.formula,
        default: '-',
        enabled: true
      });

      Object.entries(bottomBorderCalc.inputs).forEach(([key, value]) => {
        borderCalcValues.push({
          label: key,
          value: typeof value === 'number' ? value.toFixed(3) : value,
          default: '-',
          enabled: true
        });
      });

      borderCalcValues.push({
        label: 'Bottom Border Result',
        value: `${bottomBorderCalc.result.toFixed(3)} inches`,
        default: '-',
        enabled: true
      });
    }

    if (!store.back.hasBorders && !store.back.hasBlouseBottom) {
      borderCalcValues.push({
        label: 'Status',
        value: 'Borders not enabled',
        default: 'Not enabled',
        enabled: false
      });
    }
    
    groups.push({ section: 'Border Calculation', values: borderCalcValues });

    // Motifs group
    const motifsValues = [];
    motifsValues.push({ label: 'Enabled', value: store.back.hasMotifs ? 'Yes' : 'No', default: 'No', enabled: store.back.hasMotifs });
    if (store.back.hasMotifs) {
      motifsValues.push(
        { label: 'Motif Size X', value: store.back.motifSizeX, default: '2', enabled: true },
        { label: 'Motif Size Y', value: store.back.motifSizeY, default: '2', enabled: true },
        { label: 'Motif Count', value: store.back.motifCount, default: '1', enabled: true }
      );
    } else {
      motifsValues.push(
        { label: 'Motif Size X', value: store.back.motifSizeX, default: '2', enabled: false },
        { label: 'Motif Size Y', value: store.back.motifSizeY, default: '2', enabled: false },
        { label: 'Motif Count', value: store.back.motifCount, default: '1', enabled: false }
      );
    }
    groups.push({ section: 'Motifs', values: motifsValues });

    // Motif Calculation section - always show
    const motifCalcValues = [];
    if (store.back.hasMotifs) {
      const motifCalc = calculateMotifValue(
        store.back.motifSizeX,
        store.back.motifSizeY,
        parseInt(store.back.motifCount) || 1
      );
      
      motifCalcValues.push({
        label: 'Formula',
        value: motifCalc.formula,
        default: '-',
        enabled: true
      });

      Object.entries(motifCalc.inputs).forEach(([key, value]) => {
        motifCalcValues.push({
          label: key,
          value: typeof value === 'number' ? value.toFixed(2) : value,
          default: '-',
          enabled: true
        });
      });

      motifCalcValues.push({
        label: 'Motif Value',
        value: `${motifCalc.result.toFixed(2)} sq.in`,
        default: '-',
        enabled: true
      });
    } else {
      motifCalcValues.push({
        label: 'Status',
        value: 'Motifs not enabled',
        default: 'Not enabled',
        enabled: false
      });
    }
    groups.push({ section: 'Motif Calculation', values: motifCalcValues });

    // Fill Work group
    const fillWorkValues = [];
    fillWorkValues.push({ label: 'Enabled', value: store.back.hasFillWork ? 'Yes' : 'No', default: 'No', enabled: store.back.hasFillWork });
    if (store.back.hasFillWork) {
      fillWorkValues.push({ label: 'Coverage', value: store.back.coverage, default: '50', enabled: true });
    } else {
      fillWorkValues.push({ label: 'Coverage', value: store.back.coverage, default: '50', enabled: false });
    }
    groups.push({ section: 'Fill Work', values: fillWorkValues });

    // Fillwork Calculation group (separate section) - always show
    const fillworkCalcValues = [];
    if (store.back.hasFillWork) {
      const chestSize = parseFloat(store.chestSize) || 36;
      const fillworkCalc = calculateBackFillworkArea(store.back.neckStyle, chestSize);
      
      fillworkCalcValues.push({
        label: 'Formula',
        value: fillworkCalc.formula,
        default: '-',
        enabled: true
      });

      // Add inputs
      Object.entries(fillworkCalc.inputs).forEach(([key, value]) => {
        fillworkCalcValues.push({
          label: key,
          value: value.toFixed(2),
          default: '-',
          enabled: true
        });
      });

      fillworkCalcValues.push({
        label: 'Calculated Area',
        value: `${fillworkCalc.result.toFixed(2)} sq.in`,
        default: '-',
        enabled: true
      });
    } else {
      fillworkCalcValues.push({
        label: 'Status',
        value: 'Fillwork not enabled',
        default: 'Not enabled',
        enabled: false
      });
    }
    groups.push({ section: 'Fillwork Calculation', values: fillworkCalcValues });

    // Neck group
    const neckValues = [];
    const neckStyleNames: { [key: string]: string } = {
      'boat': 'Boat Neck',
      'deep': 'Deep Neck',
      'round': 'Round Neck',
      'v': 'V Neck',
      'square': 'Square Neck',
      'sweetheart': 'Sweetheart',
      '1': 'Design 1',
      '2': 'Design 2',
      '3': 'Design 3',
      '4': 'Design 4',
      '5': 'Design 5',
      '6': 'Design 6',
      'not selected': 'Not Selected'
    };
    
    const displayName = neckStyleNames[store.back.neckStyle] || store.back.neckStyle;
    neckValues.push({
      label: 'Neck Style',
      value: displayName,
      default: 'Not Selected',
      enabled: store.back.neckStyle !== 'not selected'
    });
    groups.push({ section: 'Neck', values: neckValues });

    // Back Neck Type Values section - always show
    const backNeckTypeValues = [];
    if (store.back.neckStyle !== 'not selected') {
      const neckTypeValue = getBackNeckTypeValue(store.back.neckStyle);
      
      backNeckTypeValues.push({
        label: 'Selected Neck Type',
        value: neckTypeValue.name,
        default: '-',
        enabled: true
      });

      backNeckTypeValues.push({
        label: 'Neck Type Value',
        value: neckTypeValue.value.toString(),
        default: '-',
        enabled: true
      });
    } else {
      backNeckTypeValues.push({
        label: 'Status',
        value: 'No neck style selected',
        default: 'Not selected',
        enabled: false
      });
    }
    groups.push({ section: 'Back Neck Type Values', values: backNeckTypeValues });

    // Others group - only techniques
    const othersValues = [];
    if (store.back.selectedTechniques.length > 0) {
      // Show techniques with percentages like in the preview
      const totalPercentage = store.back.selectedTechniques.reduce((sum, technique) => {
        return sum + (store.back.techniquePercentages[technique] || 50);
      }, 0);

      store.back.selectedTechniques.forEach(technique => {
        const rawPercentage = store.back.techniquePercentages[technique] || 50;
        const normalizedPercentage = totalPercentage > 0 ? (rawPercentage / totalPercentage) * 100 : 0;
        othersValues.push({
          label: technique,
          value: (
            <span>
              <span className="text-muted-foreground">({rawPercentage}%)</span>{' '}
              <span className="font-medium">{normalizedPercentage.toFixed(1)}%</span>
            </span>
          ),
          default: 'Not Selected',
          enabled: true
        });
      });
    } else {
      othersValues.push({
        label: 'Techniques Selected',
        value: 'None',
        default: 'None',
        enabled: false
      });
    }
    groups.push({ section: 'Others', values: othersValues });

    return groups;
  };

  const groupedValues = getGroupedValues();

  return (
    <div className="space-y-6">
      {/* Grouped Values by Category */}
      {groupedValues.map((group, groupIndex) => (
        <div key={groupIndex} className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2 text-primary">
            <span className="text-lg">
              {group.section === 'Borders' && '🔲'}
              {group.section === 'Border Calculation' && '🧮'}
              {group.section === 'Motifs' && '✨'}
              {group.section === 'Motif Calculation' && '🧮'}
              {group.section === 'Fill Work' && '🎨'}
              {group.section === 'Fillwork Calculation' && '🧮'}
              {group.section === 'Neck' && '👔'}
              {group.section === 'Back Neck Type Values' && '📊'}
              {group.section === 'Others' && '🔧'}
            </span>
            {group.section}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {group.values.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`flex justify-between items-center p-2 rounded ${
                  item.enabled
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <span className={`font-medium ${item.enabled ? 'text-green-900' : 'text-red-900'}`}>
                  {item.label}:
                </span>
                <span className={`font-mono ${item.enabled ? 'text-green-700' : 'text-red-700'}`}>
                  {item.enabled ? item.value : item.default}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold mb-3">Back Work Overview</h3>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.borders)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.fillWork)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.back.motifs)}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded">
          <div className="text-center">
            <div className="font-medium text-primary">Back Panel Total</div>
            <div className="text-lg font-bold">{formatTime(calculation.breakdown.back.total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
