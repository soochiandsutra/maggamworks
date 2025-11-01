"use client";

import { useCalculations } from "@/hooks/use-calculations";
import { useAppStateStore } from "@/lib/store/appState";
import { formatTime } from "@/utils/formatters";
import { calculateHandsFillworkArea } from "@/utils/fillwork-calculations";
import { calculateHandBorderLength } from "@/utils/border-calculations";
import { calculateHandsBorderValue, calculateMotifValue } from "@/utils/border-motif-calculations";

export default function HandsOverviewSection() {
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

  // Group values by category for Hands section
  const getGroupedValues = () => {
    const groups = [];

    // Borders group
    const bordersValues = [];
    bordersValues.push({ label: 'Enabled', value: store.hands.hasBorders ? 'Yes' : 'No', default: 'No', enabled: store.hands.hasBorders });
    if (store.hands.hasBorders) {
      bordersValues.push({ label: 'Border Size', value: store.hands.borderSize, default: '0', enabled: true });
    } else {
      bordersValues.push({ label: 'Border Size', value: store.hands.borderSize, default: '0', enabled: false });
    }
    // Add blouse bottom to borders
    bordersValues.push(
      { label: 'Blouse Bottom Enabled', value: store.hands.hasBlouseBottom ? 'Yes' : 'No', default: 'No', enabled: store.hands.hasBlouseBottom },
      { label: 'Blouse Bottom Size', value: store.hands.blouseBottomSize, default: '0', enabled: store.hands.hasBlouseBottom }
    );
    groups.push({ section: 'Borders', values: bordersValues });

    // Hand Border Formulas section - always show
    const borderCalcValues = [];
    if (store.hands.hasBorders && store.hands.neckStyle !== 'not selected') {
      const handRound = parseFloat(store.handRound) || 8;
      const armholeRound = parseFloat(store.armholeRound) || 14;
      const borderCalc = calculateHandBorderLength(store.hands.neckStyle, handRound, armholeRound);
      
      borderCalcValues.push({
        label: 'Border Length Formula',
        value: borderCalc.formula,
        default: '-',
        enabled: true
      });

      // Add inputs
      Object.entries(borderCalc.inputs).forEach(([key, value]) => {
        borderCalcValues.push({
          label: key,
          value: value.toFixed(2),
          default: '-',
          enabled: true
        });
      });

      borderCalcValues.push({
        label: 'Border Length',
        value: `${borderCalc.result.toFixed(2)} inches`,
        default: '-',
        enabled: true
      });

      // Add border value calculation
      const effectiveHandsBorderSize = store.hands.borderSize !== null ? store.hands.borderSize : (store.all.borderSize || 0);
      const borderValueCalc = calculateHandsBorderValue(
        store.hands.neckStyle,
        handRound,
        armholeRound,
        effectiveHandsBorderSize
      );

      borderCalcValues.push({
        label: 'Border Value Formula',
        value: borderValueCalc.formula,
        default: '-',
        enabled: true
      });

      Object.entries(borderValueCalc.inputs).forEach(([key, value]) => {
        borderCalcValues.push({
          label: key,
          value: typeof value === 'number' ? value.toFixed(3) : value,
          default: '-',
          enabled: true
        });
      });

      borderCalcValues.push({
        label: 'Border Value',
        value: `${borderValueCalc.result.toFixed(3)} inches`,
        default: '-',
        enabled: true
      });
    } else if (!store.hands.hasBorders) {
      borderCalcValues.push({
        label: 'Status',
        value: 'Border not enabled',
        default: 'Not enabled',
        enabled: false
      });
    } else {
      borderCalcValues.push({
        label: 'Status',
        value: 'No neck style selected',
        default: 'Not selected',
        enabled: false
      });
    }
    groups.push({ section: 'Hand Border Calculation', values: borderCalcValues });

    // Motifs group
    const motifsValues = [];
    motifsValues.push({ label: 'Enabled', value: store.hands.hasMotifs ? 'Yes' : 'No', default: 'No', enabled: store.hands.hasMotifs });
    if (store.hands.hasMotifs) {
      motifsValues.push(
        { label: 'Motif Size X', value: store.hands.motifSizeX, default: '1.5', enabled: true },
        { label: 'Motif Size Y', value: store.hands.motifSizeY, default: '1.5', enabled: true },
        { label: 'Motif Count', value: store.hands.motifCount, default: '1', enabled: true }
      );
    } else {
      motifsValues.push(
        { label: 'Motif Size X', value: store.hands.motifSizeX, default: '1.5', enabled: false },
        { label: 'Motif Size Y', value: store.hands.motifSizeY, default: '1.5', enabled: false },
        { label: 'Motif Count', value: store.hands.motifCount, default: '1', enabled: false }
      );
    }
    groups.push({ section: 'Motifs', values: motifsValues });

    // Motif Calculation section - always show
    const motifCalcValues = [];
    if (store.hands.hasMotifs) {
      const effectiveMotifSizeX = store.hands.motifSizeX !== null ? store.hands.motifSizeX : (store.all.motifSizeX || 2);
      const effectiveMotifSizeY = store.hands.motifSizeY !== null ? store.hands.motifSizeY : (store.all.motifSizeY || 2);
      const effectiveMotifCount = store.hands.motifCount !== null ? store.hands.motifCount : (store.all.motifCount || '1');
      const motifCalc = calculateMotifValue(
        effectiveMotifSizeX,
        effectiveMotifSizeY,
        parseInt(effectiveMotifCount) || 1
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
    fillWorkValues.push({ label: 'Enabled', value: store.hands.hasFillWork ? 'Yes' : 'No', default: 'No', enabled: store.hands.hasFillWork });
    if (store.hands.hasFillWork) {
      fillWorkValues.push({ label: 'Coverage', value: store.hands.coverage, default: '30', enabled: true });
    } else {
      fillWorkValues.push({ label: 'Coverage', value: store.hands.coverage, default: '30', enabled: false });
    }
    groups.push({ section: 'Fill Work', values: fillWorkValues });

    // Fillwork Calculation group (separate section) - always show
    const handsFillworkCalcValues = [];
    if (store.hands.hasFillWork) {
      const armholeRound = parseFloat(store.armholeRound) || 14;
      const handRound = parseFloat(store.handRound) || 8;
      const sleeveLength = parseFloat(store.handLength) || 18;
      const fillworkCalc = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      
      handsFillworkCalcValues.push({
        label: 'Formula',
        value: fillworkCalc.formula,
        default: '-',
        enabled: true
      });

      // Add inputs
      Object.entries(fillworkCalc.inputs).forEach(([key, value]) => {
        handsFillworkCalcValues.push({
          label: key,
          value: value.toFixed(2),
          default: '-',
          enabled: true
        });
      });

      handsFillworkCalcValues.push({
        label: 'Calculated Area',
        value: `${fillworkCalc.result.toFixed(2)} sq.in`,
        default: '-',
        enabled: true
      });
    } else {
      handsFillworkCalcValues.push({
        label: 'Status',
        value: 'Fillwork not enabled',
        default: 'Not enabled',
        enabled: false
      });
    }
    groups.push({ section: 'Fillwork Calculation', values: handsFillworkCalcValues });

    // Neck group
    const neckValues = [];
    const neckStyleNames: { [key: string]: string } = {
      'style1': 'Style 1',
      'style2': 'Style 2',
      'style3': 'Style 3',
      'style4': 'Style 4',
      'not selected': 'Not Selected'
    };
    
    const displayName = neckStyleNames[store.hands.neckStyle] || store.hands.neckStyle;
    neckValues.push(
      { label: 'Neck Style', value: displayName, default: 'Not Selected', enabled: store.hands.neckStyle !== 'not selected' },
      { label: 'Selected Design', value: store.hands.selectedDesign, default: 'simple', enabled: true }
    );
    groups.push({ section: 'Neck', values: neckValues });

    // Others group - only techniques
    const othersValues = [];
    const selectedTechniques = store.hands.selectedTechniques !== null ? store.hands.selectedTechniques : (store.all.selectedTechniques || []);
    const techniquePercentages = store.hands.techniquePercentages !== null ? store.hands.techniquePercentages : (store.all.techniquePercentages || {});
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
              {group.section === 'Hand Border Calculation' && '🧮'}
              {group.section === 'Motifs' && '✨'}
              {group.section === 'Motif Calculation' && '🧮'}
              {group.section === 'Fill Work' && '🎨'}
              {group.section === 'Fillwork Calculation' && '🧮'}
              {group.section === 'Neck' && '👔'}
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
        <h3 className="font-semibold mb-3">Hands Work Overview</h3>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🔲 Borders</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.borders)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">🎨 Fill Work</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.fillWork)}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded">
            <div className="font-medium">✨ Motifs</div>
            <div className="text-muted-foreground">{formatTime(calculation.breakdown.hands.motifs)}</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-primary/10 rounded">
          <div className="text-center">
            <div className="font-medium text-primary">Hands Panel Total</div>
            <div className="text-lg font-bold">{formatTime(calculation.breakdown.hands.total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
