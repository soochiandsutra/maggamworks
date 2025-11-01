import { STANDARD_START_TIME } from '../constants/calculation-constants';
import { calculateBorderTime, calculateFillWorkTime, calculateMotifTime, calculateWeightedTime } from './time-calculations';
import type { CalculationState, CalculationResult, SectionTimeBreakdown } from './types';

export function calculateTime(state: CalculationState): CalculationResult {
  // Helper function to get value from individual section or fallback to "All" section
  const getValue = (section: 'front' | 'back' | 'hands', property: string) => {
    const sectionValue = state[section][property as keyof typeof state[typeof section]];
    const allValue = state.all[property as keyof typeof state.all];

    // Return section value if it exists and is not null/undefined
    // Important: 0 is a valid value and should not fall back to "all"
    if (sectionValue !== null && sectionValue !== undefined && sectionValue !== '' && sectionValue !== false) {
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

    // Calculate weighted time from selected techniques
    const weightedTime = calculateWeightedTime(selectedTechniques, techniquePercentages);

    // For Front/Back sections: borderValue = Top Border + Bottom Border
    // For Hands: borderValue = Hands Border
    const borderValue = borderSize; // This is already the combined border size

    const borderTime = calculateBorderTime(
      hasBorders, 
      borderSize, 
      neckType, 
      neckDesignNumber, 
      coverage, 
      weightedTime
    );
    
    const fillWorkTime = calculateFillWorkTime(
      hasFillWork,
      coverage,
      selectedTechniques,
      techniquePercentages,
      parseFloat(state.chestSize) || 36,
      section,
      borderValue,
      weightedTime
    );
    
    const motifTime = calculateMotifTime(
      hasMotifs,
      motifSizeX,
      motifSizeY,
      motifCount,
      selectedTechniques,
      techniquePercentages,
      coverage,
      weightedTime
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
