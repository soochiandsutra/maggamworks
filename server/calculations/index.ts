import { STANDARD_START_TIME } from '../constants/calculation-constants';
import { calculateBorderTime, calculateFillWorkTime, calculateMotifTime, calculateWeightedTime } from './time-calculations';
import { calculateFrontTopBorder, calculateBackTopBorder, calculateBottomBorder, calculateHandsBorderValue, calculateMotifValue } from '@/utils/border-motif-calculations';
import { calculateFrontFillworkArea, calculateBackFillworkArea, calculateHandsFillworkArea } from '@/utils/fillwork-calculations';
import { getSizeFactor } from '@/utils/size-factor';
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
    const hasBlouseBottom = getValue(section, 'hasBlouseBottom') as boolean;
    const blouseBottomSize = getValue(section, 'blouseBottomSize') as number;
    const neckStyle = getValue(section, 'neckStyle') as string;

    const hasFillWork = getValue(section, 'hasFillWork') as boolean;
    const coverage = getValue(section, 'coverage') as number;
    const selectedTechniques = getValue(section, 'selectedTechniques') as string[];
    const techniquePercentages = getValue(section, 'techniquePercentages') as Record<string, number>;

    const hasMotifs = getValue(section, 'hasMotifs') as boolean;
    const motifSizeX = getValue(section, 'motifSizeX') as number;
    const motifSizeY = getValue(section, 'motifSizeY') as number;
    const motifCount = String(getValue(section, 'motifCount'));

    const chestSize = parseFloat(state.chestSize) || 36;
    const armholeRound = parseFloat(state.armholeRound) || 0;
    const handRound = parseFloat(state.handRound) || 0;
    const handLength = parseFloat(state.handLength) || 0;

    // Calculate weighted time from selected techniques
    const weightedTime = calculateWeightedTime(selectedTechniques, techniquePercentages);

    // Calculate border value based on section
    let borderValue = 0;
    if (section === 'front') {
      const topBorder = calculateFrontTopBorder(neckStyle, chestSize, borderSize);
      const bottomBorder = hasBlouseBottom ? calculateBottomBorder(chestSize, blouseBottomSize) : { result: 0 };
      borderValue = topBorder.result + bottomBorder.result;
    } else if (section === 'back') {
      const topBorder = calculateBackTopBorder(neckStyle, chestSize, borderSize);
      const bottomBorder = hasBlouseBottom ? calculateBottomBorder(chestSize, blouseBottomSize) : { result: 0 };
      borderValue = topBorder.result + bottomBorder.result;
    } else if (section === 'hands') {
      const selectedDesign = (state.hands as any).selectedDesign || 'simple';
      const handsBorder = calculateHandsBorderValue(selectedDesign, handRound, armholeRound, borderSize);
      borderValue = handsBorder.result;
    }

    // Calculate fillwork area based on section
    let fillworkArea = 0;
    if (section === 'front') {
      fillworkArea = calculateFrontFillworkArea(neckStyle, chestSize).result;
    } else if (section === 'back') {
      fillworkArea = calculateBackFillworkArea(neckStyle, chestSize).result;
    } else if (section === 'hands') {
      fillworkArea = calculateHandsFillworkArea(armholeRound, handRound, handLength).result;
    }

    // Calculate motif value
    // For hands section, multiply count by 2 to account for both sleeves
    let count = parseInt(motifCount) || 0;
    if (section === 'hands') {
      count = count * 2;
    }
    const motifValue = calculateMotifValue(motifSizeX, motifSizeY, count).result;
    const sizeFactor = getSizeFactor(chestSize);

    // Calculate times using the formulas from CALCULATION_README.md
    const borderTime = calculateBorderTime(hasBorders, borderValue, coverage, weightedTime);
    const fillWorkTime = calculateFillWorkTime(hasFillWork, fillworkArea, coverage, weightedTime);
    const motifTime = calculateMotifTime(hasMotifs, motifValue, sizeFactor, coverage, weightedTime);

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

  return {
    totalTime,
    breakdown: {
      all: allSectionTime,
      front: frontTime,
      back: backTime,
      hands: handsTime
    }
  };
}

// Legacy function for backward compatibility
export function calculate(): number {
  return 0; // This would need the state to be passed or accessed from store
}
