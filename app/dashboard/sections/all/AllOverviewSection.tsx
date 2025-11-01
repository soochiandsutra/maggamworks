'use client';

import { useCalculations } from '@/hooks/use-calculations';
import { useAppStateStore } from '@/lib/store/appState';
import { getSizeFactorInfo } from '@/utils/size-factor';

export default function AllOverviewContent() {
  const calculation = useCalculations();
  const store = useAppStateStore();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}.${mins} hrs`;
  };

  const totalBorders = calculation.breakdown.front.borders + calculation.breakdown.back.borders + calculation.breakdown.hands.borders;
  const totalMotifs = calculation.breakdown.front.motifs + calculation.breakdown.back.motifs + calculation.breakdown.hands.motifs;
  const totalFillWork = calculation.breakdown.front.fillWork + calculation.breakdown.back.fillWork + calculation.breakdown.hands.fillWork;

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

  // Group values by category for All section
  const getGroupedValues = () => {
    const groups = [];

    // Size group - always shown
    const sizeValues = [
      { label: 'Chest Size', value: store.chestSize, default: '36', enabled: true },
      { label: 'Armhole Round', value: store.armholeRound, default: '14', enabled: true },
      { label: 'Hand Length', value: store.handLength, default: '18', enabled: true },
      { label: 'Hand Round', value: store.handRound, default: '8', enabled: true },
    ];

    // Add size factor if chest size is valid
    const chestSize = parseFloat(store.chestSize);
    if (chestSize >= 28 && chestSize <= 44) {
      const sizeFactorInfo = getSizeFactorInfo(chestSize);
      sizeValues.push({
        label: 'Size Factor',
        value: sizeFactorInfo.isInterpolated 
          ? `${sizeFactorInfo.factor.toFixed(3)} (${sizeFactorInfo.calculation})` 
          : sizeFactorInfo.factor.toFixed(3),
        default: '1.000',
        enabled: true
      });
    }

    groups.push({
      section: 'Size',
      values: sizeValues
    });

    // Borders group
    const bordersValues = [];
    bordersValues.push({ label: 'Enabled', value: store.all.hasBorders ? 'Yes' : 'No', default: 'No', enabled: store.all.hasBorders });
    if (store.all.hasBorders) {
      bordersValues.push({ label: 'Border Size', value: store.all.borderSize, default: '0.5', enabled: true });
    } else {
      bordersValues.push({ label: 'Border Size', value: store.all.borderSize, default: '0.5', enabled: false });
    }
    // Add blouse bottom to borders
    bordersValues.push(
      { label: 'Blouse Bottom Enabled', value: store.all.hasBlouseBottom ? 'Yes' : 'No', default: 'No', enabled: store.all.hasBlouseBottom },
      { label: 'Blouse Bottom Size', value: store.all.blouseBottomSize, default: '0', enabled: store.all.hasBlouseBottom }
    );
    groups.push({ section: 'Borders', values: bordersValues });

    // Motifs group
    const motifsValues = [];
    motifsValues.push({ label: 'Enabled', value: store.all.hasMotifs ? 'Yes' : 'No', default: 'No', enabled: store.all.hasMotifs });
    if (store.all.hasMotifs) {
      motifsValues.push(
        { label: 'Motif Size X', value: store.all.motifSizeX, default: '2', enabled: true },
        { label: 'Motif Size Y', value: store.all.motifSizeY, default: '2', enabled: true },
        { label: 'Motif Count', value: store.all.motifCount, default: '1', enabled: true }
      );
    } else {
      motifsValues.push(
        { label: 'Motif Size X', value: store.all.motifSizeX, default: '2', enabled: false },
        { label: 'Motif Size Y', value: store.all.motifSizeY, default: '2', enabled: false },
        { label: 'Motif Count', value: store.all.motifCount, default: '1', enabled: false }
      );
    }
    groups.push({ section: 'Motifs', values: motifsValues });

    // Fill Work group
    const fillWorkValues = [];
    fillWorkValues.push({ label: 'Enabled', value: store.all.hasFillWork ? 'Yes' : 'No', default: 'No', enabled: store.all.hasFillWork });
    groups.push({ section: 'Fill Work', values: fillWorkValues });

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
    
    const displayName = neckStyleNames[store.all.neckStyle] || store.all.neckStyle;
    neckValues.push({
      label: 'Neck Style',
      value: displayName,
      default: 'Not Selected',
      enabled: store.all.neckStyle !== 'not selected'
    });
    groups.push({ section: 'Neck', values: neckValues });

    // Others group - only techniques
    const othersValues = [];
    if (store.all.selectedTechniques.length > 0) {
      // Show techniques with percentages like in the preview
      const totalPercentage = store.all.selectedTechniques.reduce((sum, technique) => {
        return sum + (store.all.techniquePercentages[technique] || 50);
      }, 0);

      store.all.selectedTechniques.forEach(technique => {
        const rawPercentage = store.all.techniquePercentages[technique] || 50;
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
              {group.section === 'Size' && '📏'}
              {group.section === 'Borders' && '🔲'}
              {group.section === 'Motifs' && '✨'}
              {group.section === 'Fill Work' && '🎨'}
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
    </div>
  );
}
