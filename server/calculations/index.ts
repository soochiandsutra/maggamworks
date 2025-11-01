import { STANDARD_START_TIME } from '../constants/calculation-constants';
import { calculateBorderTime, calculateFillWorkTime, calculateMotifTime } from './time-calculations';
import type { CalculationState, CalculationResult, SectionTimeBreakdown } from './types';

export function calculateTime(state: CalculationState): CalculationResult {
  // Helper function to get value from individual section or fallback to "All" section
  const getValue = (section: 'front' | 'back' | 'hands', property: string) => {
    const sectionValue = state[section][property as keyof typeof state[typeof section]];
    const allValue = state.all[property as keyof typeof state.all];

    // Return section value if it exists and is not empty/default
    if (sectionValue !== undefined && sectionValue !== '' && sectionValue !== false && sectionValue !== 0) {
      return sectionValue;
    }

    return allValue;
  };

  const calculateSectionTime = (section: 'front' | 'back' | 'hands'): SectionTimeBreakdown => {
    const hasBorders = getValue(section, 'hasBorders') as boolean;
    const borderSize = getValue(section, 'borderSize') as number;
    const neckType = getValue(section, 'neckType') as string;
    const neckDesignNumber = parseInt(String(getValue(section, 'neckDesignNumber'))) || 1;

    const hasFillWork = getValue(section, 'hasFillWork') as boolean;
    const coverage = getValue(section, 'coverage') as number;
    const selectedTechniques = getValue(section, 'selectedTechniques') as string[];
    const techniquePercentages = getValue(section, 'techniquePercentages') as Record<string, number>;

    const hasMotifs = getValue(section, 'hasMotifs') as boolean;
    const motifSizeX = getValue(section, 'motifSizeX') as number;
    const motifSizeY = getValue(section, 'motifSizeY') as number;
    const motifCount = String(getValue(section, 'motifCount'));

    const borderTime = calculateBorderTime(hasBorders, borderSize, neckType, neckDesignNumber);
    const fillWorkTime = calculateFillWorkTime(
      hasFillWork,
      String(coverage),
      selectedTechniques,
      techniquePercentages,
      parseFloat(state.chestSize) || 36,
      section
    );
    const motifTime = calculateMotifTime(
      hasMotifs,
      motifSizeX,
      motifSizeY,
      motifCount,
      selectedTechniques,
      techniquePercentages
    );

    return {
      borders: borderTime,
      fillWork: fillWorkTime,
      motifs: motifTime,
      total: borderTime + fillWorkTime + motifTime
    };
  };

  const allSectionTime: SectionTimeBreakdown = {
    borders: 0,
    fillWork: 0,
    motifs: 0,
    total: STANDARD_START_TIME
  };

  const frontTime = calculateSectionTime('front');
  const backTime = calculateSectionTime('back');
  const handsTime = calculateSectionTime('hands');

  const totalTime = STANDARD_START_TIME + frontTime.total + backTime.total + handsTime.total;

  // Cost calculation (assuming ₹200/hour rate)
  const hourlyRate = 200;
  const estimatedCost = Math.round((totalTime / 60) * hourlyRate);

  return {
    totalTime,
    breakdown: {
      all: allSectionTime,
      front: frontTime,
      back: backTime,
      hands: handsTime
    },
    estimatedCost,
    hourlyRate
  };
}

// Legacy function for backward compatibility
export function calculate(): number {
  return 0; // This would need the state to be passed or accessed from store
}
