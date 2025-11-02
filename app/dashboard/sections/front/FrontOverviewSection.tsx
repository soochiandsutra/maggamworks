"use client";

import { useCalculations } from "@/hooks/use-calculations";
import { useAppStateStore } from "@/lib/store/appState";
import { formatTime } from "@/utils/formatters";
import { calculateFrontFillworkArea } from "@/utils/fillwork-calculations";
import { getFrontNeckTypeValue } from "@/utils/neck-type-values";
import { calculateFrontTopBorder, calculateBottomBorder, calculateMotifValue } from "@/utils/border-motif-calculations";

export default function FrontOverviewSection() {
  const calculation = useCalculations();
  const store = useAppStateStore();

  // Group values by category for Front section
  const getGroupedValues = () => {
    const groups = [];

    // Borders group
    const bordersValues = [];
    bordersValues.push({ label: 'Enabled', value: store.front.hasBorders ? 'Yes' : 'No', default: 'No', enabled: store.front.hasBorders });
    if (store.front.hasBorders) {
      bordersValues.push({ label: 'Border Size', value: store.front.borderSize, default: '0', enabled: true });
    } else {
      bordersValues.push({ label: 'Border Size', value: store.front.borderSize, default: '0', enabled: false });
    }
    // Add blouse bottom to borders
    bordersValues.push(
      { label: 'Blouse Bottom Enabled', value: store.front.hasBlouseBottom ? 'Yes' : 'No', default: 'No', enabled: store.front.hasBlouseBottom },
      { label: 'Blouse Bottom Size', value: store.front.blouseBottomSize, default: '0', enabled: store.front.hasBlouseBottom }
    );
    groups.push({ section: 'Borders', values: bordersValues });

    // Border Calculation section - always show
    const borderCalcValues = [];
    const chestSize = parseFloat(store.chestSize) || 36;
    const borderSize = store.front.borderSize !== null ? store.front.borderSize : (store.all.borderSize || 0);
    const blouseBottomSize = store.front.blouseBottomSize !== null ? store.front.blouseBottomSize : (store.all.blouseBottomSize || 0);
    const motifSizeX = store.front.motifSizeX !== null ? store.front.motifSizeX : (store.all.motifSizeX || 0);
    const motifSizeY = store.front.motifSizeY !== null ? store.front.motifSizeY : (store.all.motifSizeY || 0);
    const motifCount = store.front.motifCount !== null ? store.front.motifCount : (store.all.motifCount || '1');
    
    if (store.front.hasBorders && store.front.neckStyle !== 'not selected') {
      const topBorderCalc = calculateFrontTopBorder(
        store.front.neckStyle,
        chestSize,
        borderSize
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
    
    if (store.front.hasBlouseBottom) {
      const bottomBorderCalc = calculateBottomBorder(chestSize, blouseBottomSize);
      
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

    if (!store.front.hasBorders && !store.front.hasBlouseBottom) {
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
    motifsValues.push({ label: 'Enabled', value: store.front.hasMotifs ? 'Yes' : 'No', default: 'No', enabled: store.front.hasMotifs });
    if (store.front.hasMotifs) {
      motifsValues.push(
        { label: 'Motif Size X', value: store.front.motifSizeX, default: '2', enabled: true },
        { label: 'Motif Size Y', value: store.front.motifSizeY, default: '2', enabled: true },
        { label: 'Motif Count', value: store.front.motifCount, default: '1', enabled: true }
      );
    } else {
      motifsValues.push(
        { label: 'Motif Size X', value: store.front.motifSizeX, default: '2', enabled: false },
        { label: 'Motif Size Y', value: store.front.motifSizeY, default: '2', enabled: false },
        { label: 'Motif Count', value: store.front.motifCount, default: '1', enabled: false }
      );
    }
    groups.push({ section: 'Motifs', values: motifsValues });

    // Motif Calculation section - always show
    const motifCalcValues = [];
    if (store.front.hasMotifs) {
      const motifCalc = calculateMotifValue(
        motifSizeX,
        motifSizeY,
        parseInt(motifCount) || 1
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
    fillWorkValues.push({ label: 'Enabled', value: store.front.hasFillWork ? 'Yes' : 'No', default: 'No', enabled: store.front.hasFillWork });
    groups.push({ section: 'Fill Work', values: fillWorkValues });

    // Fillwork Calculation group (separate section) - always show
    const fillworkCalcValues = [];
    if (store.front.hasFillWork) {
      const chestSize = parseFloat(store.chestSize) || 36;
      const fillworkCalc = calculateFrontFillworkArea(store.front.neckStyle, chestSize);
      
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
      'not selected': 'Not Selected'
    };
    
    const displayName = neckStyleNames[store.front.neckStyle] || store.front.neckStyle;
    neckValues.push({
      label: 'Neck Style',
      value: displayName,
      default: 'Not Selected',
      enabled: store.front.neckStyle !== 'not selected'
    });
    groups.push({ section: 'Neck', values: neckValues });

    // Front Neck Type Values section - always show
    const neckTypeValues = [];
    if (store.front.neckStyle !== 'not selected') {
      const chestSize = parseFloat(store.chestSize) || 36;
      const neckTypeValue = getFrontNeckTypeValue(store.front.neckStyle, chestSize);
      
      neckTypeValues.push({
        label: 'Selected Neck Type',
        value: neckTypeValue.name,
        default: '-',
        enabled: true
      });

      neckTypeValues.push({
        label: 'Neck Type Value',
        value: neckTypeValue.value.toFixed(2),
        default: '-',
        enabled: true
      });
    } else {
      neckTypeValues.push({
        label: 'Status',
        value: 'No neck style selected',
        default: 'Not selected',
        enabled: false
      });
    }
    groups.push({ section: 'Front Neck Type Values', values: neckTypeValues });

    // Others group - only techniques
    const othersValues = [];
    const selectedTechniques = store.front.selectedTechniques !== null ? store.front.selectedTechniques : (store.all.selectedTechniques || []);
    const techniquePercentages = store.front.techniquePercentages !== null ? store.front.techniquePercentages : (store.all.techniquePercentages || {});
    if (selectedTechniques && selectedTechniques.length > 0) {
      // Show techniques with percentages like in the preview
      const totalPercentage = selectedTechniques.reduce((sum, technique) => {
        return sum + (techniquePercentages[technique] || 50);
      }, 0);

      selectedTechniques.forEach(technique => {
        const rawPercentage = techniquePercentages[technique] || 50;
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
              {group.section === 'Front Neck Type Values' && '📊'}
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
        <h3 className="font-semibold mb-3">Front Work Overview</h3>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.front.borders)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.front.fillWork)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.front.motifs)}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded">
          <div className="text-center">
            <div className="font-medium text-primary">Front Panel Total</div>
            <div className="text-lg font-bold">{formatTime(calculation.breakdown.front.total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
