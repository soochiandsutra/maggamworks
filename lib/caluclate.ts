// Time constants in minutes
const STANDARD_START_TIME = 40; // mins (for fitting cloth and marking)

// Base times for different work types (minutes per unit)
const BORDER_BASE_TIME_PER_INCH = 5; // time per inch of border
const FILL_WORK_BASE_TIME_PER_SQ_INCH = 0.5; // fallback time per square inch of fill work
const MOTIF_BASE_TIME_PER_MOTIF = 15; // time per motif
const MOTIF_SIZE_MULTIPLIER = 1.2; // multiplier for motif size (larger motifs take more time)

// Neck type time multipliers
const NECK_TYPE_MULTIPLIERS = {
  'round': 1.0,
  'v-neck': 1.2,
  'boat-neck': 0.8,
  'square': 1.1,
  'collar': 1.5,
  'none': 0.1
};

// Work type base times (in minutes per unit area, based on actual measurements)
const WORK_TYPE_BASE_TIMES = {
  'challa-work': 12,        // Challa work - 12 mins
  'paani-work': 9.5,        // Paani work - 9.5 mins
  'chambu-filling': 7,      // Chambu filling - 7 mins
  'cutdana-filling': 7,     // Cutdana filling - 7 mins
  'lavangam-kuttu': 7.5,    // Lavangam kuttu - 7.5 mins
  'thread-filling': 8,      // Thread filling - 8 mins
  'zardosi-chain-stitch': 14, // Zardosi chain stitch - 14 mins
  'thread-knot-work': 21,   // Thread knot work - 21 mins
  'mirror-work': 7,         // Mirror - 7 mins
  'zarkan': 27,             // Zarkan - 27 mins
  'thread-roses': 30,       // Thread roses - 30 mins
  'zardosi-rose': 27,       // Zardosi rose - 27 mins
};

// Technique time multipliers (relative multipliers for complexity)
const TECHNIQUE_MULTIPLIERS = {
  'embroidery': 1.3,
  'applique': 1.2,
  'patchwork': 1.4,
  'beading': 1.5,
  'sequins': 1.6,
  'mirror-work': 1.4,
  'zari': 1.3,
  'thread-work': 1.2,
  'none': 1.0
};

// Coverage area calculations (approximate square inches based on garment measurements)
function calculateCoverageArea(chestSize: number, section: string): number {
  const baseArea = (chestSize * chestSize) / 144; // rough conversion to sq ft then sq in
  switch (section) {
    case 'front': return baseArea * 0.7; // front is typically 70% of total area
    case 'back': return baseArea * 0.8; // back is typically 80% of total area
    case 'hands': return (chestSize * 0.3) * 2; // hands are sleeves, roughly 30% of chest per arm
    default: return 0;
  }
}

// Normalize technique percentages to ensure they don't exceed 100%
function normalizeTechniquePercentages(techniquePercentages: Record<string, number>): Record<string, number> {
  const totalPercentage = Object.values(techniquePercentages).reduce((sum, percentage) => sum + percentage, 0);

  if (totalPercentage <= 100) {
    return techniquePercentages;
  }

  // If total exceeds 100%, scale all percentages proportionally
  const scaleFactor = 100 / totalPercentage;
  const normalizedPercentages: Record<string, number> = {};

  Object.entries(techniquePercentages).forEach(([technique, percentage]) => {
    normalizedPercentages[technique] = Math.round(percentage * scaleFactor);
  });

  return normalizedPercentages;
}

// Calculate border time based on size and type
function calculateBorderTime(hasBorders: boolean, borderSize: number, neckType: string, designNumber: number): number {
  if (!hasBorders) return 0;

  const borderLength = borderSize || 1; // fallback to 1 inch if not specified
  const neckMultiplier = NECK_TYPE_MULTIPLIERS[neckType as keyof typeof NECK_TYPE_MULTIPLIERS] || NECK_TYPE_MULTIPLIERS['round'] || 1.0;
  const designMultiplier = 1 + (designNumber * 0.1); // each design number adds 10% time

  return BORDER_BASE_TIME_PER_INCH * borderLength * neckMultiplier * designMultiplier;
}

// Calculate fill work time based on coverage and techniques
function calculateFillWorkTime(hasFillWork: boolean, coverage: string, techniques: string[], techniquePercentages: Record<string, number>, chestSize: number, section: string): number {
  if (!hasFillWork) return 0;

  const coveragePercent = (parseFloat(coverage) || 50) / 100; // default 50% coverage
  const area = calculateCoverageArea(chestSize, section) * coveragePercent;

  // Normalize technique percentages to ensure they don't exceed 100%
  const normalizedPercentages = normalizeTechniquePercentages(techniquePercentages);

  let totalTime = 0;

  // Calculate time for each selected technique
  techniques.forEach(technique => {
    const percentage = normalizedPercentages[technique] || 0;
    if (percentage > 0) {
      // Use work type base time if available, otherwise use fallback multiplier approach
      const baseTime = WORK_TYPE_BASE_TIMES[technique as keyof typeof WORK_TYPE_BASE_TIMES];
      if (baseTime) {
        // Use absolute time per square inch (adjust based on reference measurement)
        // The reference shows times for 1.25x1.5 = 1.875 sq inches at 100% fill
        // So we need to normalize to per square inch
        const referenceArea = 1.875; // 1.25 * 1.5
        const normalizedTimePerSqInch = baseTime / referenceArea;
        totalTime += area * normalizedTimePerSqInch * (percentage / 100);
      } else {
        // Fallback to multiplier approach for techniques not in the reference
        const techniqueMultiplier = TECHNIQUE_MULTIPLIERS[technique as keyof typeof TECHNIQUE_MULTIPLIERS] || 1.0;
        totalTime += area * FILL_WORK_BASE_TIME_PER_SQ_INCH * techniqueMultiplier * (percentage / 100);
      }
    }
  });

  return totalTime;
}

// Calculate motif time based on count, size, and techniques
function calculateMotifTime(hasMotifs: boolean, motifSizeX: number, motifSizeY: number, motifCount: string, techniques: string[], techniquePercentages: Record<string, number>): number {
  if (!hasMotifs) return 0;

  const sizeX = motifSizeX || 1;
  const sizeY = motifSizeY || 1;
  const count = parseFloat(motifCount) || 1;

  // Calculate motif area (length × width)
  const motifArea = sizeX * sizeY;

  // Normalize technique percentages to ensure they don't exceed 100%
  const normalizedPercentages = normalizeTechniquePercentages(techniquePercentages);

  let totalTime = 0;

  // Calculate time for each selected technique
  techniques.forEach(technique => {
    const percentage = normalizedPercentages[technique] || 0;
    if (percentage > 0) {
      // Use work type base time if available, otherwise use fallback approach
      const baseTime = WORK_TYPE_BASE_TIMES[technique as keyof typeof WORK_TYPE_BASE_TIMES];
      if (baseTime) {
        // Use absolute time per motif area (normalize based on reference measurement)
        const referenceArea = 1.875; // 1.25 * 1.5 - same reference area as fill work
        const normalizedTimePerSqInch = baseTime / referenceArea;
        totalTime += count * motifArea * normalizedTimePerSqInch * (percentage / 100);
      } else {
        // Fallback to multiplier approach for techniques not in the reference
        const techniqueMultiplier = TECHNIQUE_MULTIPLIERS[technique as keyof typeof TECHNIQUE_MULTIPLIERS] || 1.0;
        totalTime += count * MOTIF_BASE_TIME_PER_MOTIF * motifArea * MOTIF_SIZE_MULTIPLIER * techniqueMultiplier * (percentage / 100);
      }
    }
  });

  return totalTime;
}

export interface CalculationResult {
  totalTime: number;
  breakdown: {
    front: {
      total: number;
      borders: number;
      fillWork: number;
      motifs: number;
      neck: number;
      others: number;
    };
    back: {
      total: number;
      borders: number;
      fillWork: number;
      motifs: number;
      neck: number;
      others: number;
    };
    hands: {
      total: number;
      borders: number;
      fillWork: number;
      motifs: number;
      neck: number;
      others: number;
    };
  };
}

// State interface matching the store structure
interface CalculationState {
  chestSize: string;
  armholeRound: string;
  handLength: string;
  handRound: string;
  allHasBorders: boolean;
  allBorderSize: number;
  allNeckType: string;
  allNeckDesignNumber: string;
  allNeckType2: string;
  allNeckType2DesignNumber: string;
  allHasFillWork: boolean;
  allCoverage: number;
  allHasMotifs: boolean;
  allMotifSizeX: number;
  allMotifSizeY: number;
  allMotifCount: string;
  allSelectedTechniques: string[];
  allTechniquePercentages: Record<string, number>;
  frontHasBorders: boolean;
  frontBorderSize: number;
  frontNeckType: string;
  frontNeckDesignNumber: string;
  frontNeckType2: string;
  frontNeckType2DesignNumber: string;
  frontHasFillWork: boolean;
  frontCoverage: number;
  frontHasMotifs: boolean;
  frontMotifSizeX: number;
  frontMotifSizeY: number;
  frontMotifCount: string;
  frontSelectedTechniques: string[];
  frontTechniquePercentages: Record<string, number>;
  backHasBorders: boolean;
  backBorderSize: number;
  backNeckType: string;
  backNeckDesignNumber: string;
  backNeckType2: string;
  backNeckType2DesignNumber: string;
  backHasFillWork: boolean;
  backCoverage: number;
  backHasMotifs: boolean;
  backMotifSizeX: number;
  backMotifSizeY: number;
  backMotifCount: string;
  backSelectedTechniques: string[];
  backTechniquePercentages: Record<string, number>;
  handsHasBorders: boolean;
  handsBorderSize: number;
  handsNeckType: string;
  handsNeckDesignNumber: string;
  handsSelectedDesign: string;
  handsHasFillWork: boolean;
  handsCoverage: number;
  handsHasMotifs: boolean;
  handsMotifSizeX: number;
  handsMotifSizeY: number;
  handsMotifCount: string;
  handsSelectedTechniques: string[];
  handsTechniquePercentages: Record<string, number>;
}

export function calculateTime(state: CalculationState): CalculationResult {
  const chestSize = parseFloat(state.chestSize) || 36; // default 36 inches

  // Helper function to get value from individual section or fallback to "All" section
  const getValueOrFallback = <T>(individualValue: T | undefined | null, allValue: T | undefined | null, defaultValue: T): T => {
    // Helper to check if a value is meaningful (not empty, null, undefined, or zero for numbers)
    const isMeaningful = (val: T | undefined | null): val is T => {
      if (val === null || val === undefined) return false;
      if (typeof val === 'string' && (val as string).trim() === '') return false;
      if (typeof val === 'number' && val === 0) return false;
      if (Array.isArray(val) && val.length === 0) return false;
      if (typeof val === 'object' && Object.keys(val as object).length === 0) return false;
      return true;
    };

    // If individual value is meaningful, use it
    if (isMeaningful(individualValue)) {
      return individualValue;
    }
    // Otherwise, use "All" section value if it exists
    if (isMeaningful(allValue)) {
      return allValue;
    }
    // Finally, use default value
    return defaultValue;
  };

  // Calculate times for each section with fallback to "All" settings
  const frontBorders = calculateBorderTime(
    getValueOrFallback(state.frontHasBorders, state.allHasBorders, false),
    getValueOrFallback(state.frontBorderSize, state.allBorderSize, 1) || 1,
    getValueOrFallback(state.frontNeckType, state.allNeckType, 'round') || 'round',
    parseFloat((getValueOrFallback(state.frontNeckDesignNumber, state.allNeckDesignNumber, '1') || '1').toString()) || 1
  );

  const frontFillWork = calculateFillWorkTime(
    getValueOrFallback(state.frontHasFillWork, state.allHasFillWork, false),
    getValueOrFallback(state.frontCoverage, state.allCoverage, 50).toString(),
    getValueOrFallback(state.frontSelectedTechniques, state.allSelectedTechniques, []),
    getValueOrFallback(state.frontTechniquePercentages, state.allTechniquePercentages, {}),
    chestSize,
    'front'
  );

  const frontMotifs = calculateMotifTime(
    getValueOrFallback(state.frontHasMotifs, state.allHasMotifs, false),
    getValueOrFallback(state.frontMotifSizeX, state.allMotifSizeX, 1),
    getValueOrFallback(state.frontMotifSizeY, state.allMotifSizeY, 1),
    getValueOrFallback(state.frontMotifCount, state.allMotifCount, '1') || '1',
    getValueOrFallback(state.frontSelectedTechniques, state.allSelectedTechniques, []),
    getValueOrFallback(state.frontTechniquePercentages, state.allTechniquePercentages, {})
  );

  const backBorders = calculateBorderTime(
    getValueOrFallback(state.backHasBorders, state.allHasBorders, false),
    getValueOrFallback(state.backBorderSize, state.allBorderSize, 1) || 1,
    getValueOrFallback(state.backNeckType, state.allNeckType, 'round') || 'round',
    parseFloat((getValueOrFallback(state.backNeckDesignNumber, state.allNeckDesignNumber, '1') || '1').toString()) || 1
  );

  const backFillWork = calculateFillWorkTime(
    getValueOrFallback(state.backHasFillWork, state.allHasFillWork, false),
    getValueOrFallback(state.backCoverage, state.allCoverage, 50).toString(),
    getValueOrFallback(state.backSelectedTechniques, state.allSelectedTechniques, []),
    getValueOrFallback(state.backTechniquePercentages, state.allTechniquePercentages, {}),
    chestSize,
    'back'
  );

  const backMotifs = calculateMotifTime(
    getValueOrFallback(state.backHasMotifs, state.allHasMotifs, false),
    getValueOrFallback(state.backMotifSizeX, state.allMotifSizeX, 1),
    getValueOrFallback(state.backMotifSizeY, state.allMotifSizeY, 1),
    getValueOrFallback(state.backMotifCount, state.allMotifCount, '1') || '1',
    getValueOrFallback(state.backSelectedTechniques, state.allSelectedTechniques, []),
    getValueOrFallback(state.backTechniquePercentages, state.allTechniquePercentages, {})
  );

  const handsBorders = calculateBorderTime(
    getValueOrFallback(state.handsHasBorders, state.allHasBorders, false),
    getValueOrFallback(state.handsBorderSize, state.allBorderSize, 1) || 1,
    getValueOrFallback(state.handsNeckType, state.allNeckType, 'round') || 'round',
    parseFloat((getValueOrFallback(state.handsNeckDesignNumber, state.allNeckDesignNumber, '1') || '1').toString()) || 1
  );

  const handsFillWork = calculateFillWorkTime(
    getValueOrFallback(state.handsHasFillWork, state.allHasFillWork, false),
    getValueOrFallback(state.handsCoverage, state.allCoverage, 50).toString(),
    getValueOrFallback(state.handsSelectedTechniques, state.allSelectedTechniques, []),
    getValueOrFallback(state.handsTechniquePercentages, state.allTechniquePercentages, {}),
    chestSize,
    'hands'
  );

  const handsMotifs = calculateMotifTime(
    getValueOrFallback(state.handsHasMotifs, state.allHasMotifs, false),
    getValueOrFallback(state.handsMotifSizeX, state.allMotifSizeX, 1),
    getValueOrFallback(state.handsMotifSizeY, state.allMotifSizeY, 1),
    getValueOrFallback(state.handsMotifCount, state.allMotifCount, '1') || '1',
    getValueOrFallback(state.handsSelectedTechniques, state.allSelectedTechniques, []),
    getValueOrFallback(state.handsTechniquePercentages, state.allTechniquePercentages, {})
  );

  // Calculate section totals
  const frontTotal = frontBorders + frontFillWork + frontMotifs;
  const backTotal = backBorders + backFillWork + backMotifs;
  const handsTotal = handsBorders + handsFillWork + handsMotifs;

  // Debug: Log individual calculations
  console.log('Individual calculations:', {
    frontBorders,
    frontFillWork,
    frontMotifs,
    backBorders,
    backFillWork,
    backMotifs,
    handsBorders,
    handsFillWork,
    handsMotifs,
  });

  const totalTime = STANDARD_START_TIME + frontTotal + backTotal + handsTotal;

  // Debug: Log totals
  console.log('Section totals:', {
    frontTotal,
    backTotal,
    handsTotal,
    totalTime,
  });

  return {
    totalTime: Math.round(totalTime * 100) / 100, // round to 2 decimal places
    breakdown: {
      front: {
        total: Math.round(frontTotal * 100) / 100,
        borders: Math.round(frontBorders * 100) / 100,
        fillWork: Math.round(frontFillWork * 100) / 100,
        motifs: Math.round(frontMotifs * 100) / 100,
        neck: Math.round(frontBorders * 0.3 * 100) / 100, // assume 30% of borders is neck work
        others: Math.round((frontFillWork + frontMotifs) * 100) / 100
      },
      back: {
        total: Math.round(backTotal * 100) / 100,
        borders: Math.round(backBorders * 100) / 100,
        fillWork: Math.round(backFillWork * 100) / 100,
        motifs: Math.round(backMotifs * 100) / 100,
        neck: Math.round(backBorders * 0.3 * 100) / 100,
        others: Math.round((backFillWork + backMotifs) * 100) / 100
      },
      hands: {
        total: Math.round(handsTotal * 100) / 100,
        borders: Math.round(handsBorders * 100) / 100,
        fillWork: Math.round(handsFillWork * 100) / 100,
        motifs: Math.round(handsMotifs * 100) / 100,
        neck: Math.round(handsBorders * 0.3 * 100) / 100,
        others: Math.round((handsFillWork + handsMotifs) * 100) / 100
      }
    }
  };
}

// Legacy function for backward compatibility
export function calculate(): number {
  // This would need to use the store in a real implementation
  // For now, return a placeholder
  return STANDARD_START_TIME;
} 
