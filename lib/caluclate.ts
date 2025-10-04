// Time constants in minutes
const STANDARD_START_TIME = 40; // mins (for fitting cloth and marking)

// Base times for different work types (minutes per unit)
const BORDER_BASE_TIME_PER_INCH = 5; // time per inch of border
const FILL_WORK_BASE_TIME_PER_SQ_INCH = 0.5; // time per square inch of fill work
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

// Technique time multipliers (how much extra time each technique adds)
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

// Calculate border time based on size and type
function calculateBorderTime(hasBorders: boolean, borderSize: number, neckType: string, designNumber: number): number {
  if (!hasBorders) return 0;

  const borderLength = borderSize || 1; // fallback to 1 inch if not specified
  const neckMultiplier = NECK_TYPE_MULTIPLIERS[neckType as keyof typeof NECK_TYPE_MULTIPLIERS] || 1.0;
  const designMultiplier = 1 + (designNumber * 0.1); // each design number adds 10% time

  return BORDER_BASE_TIME_PER_INCH * borderLength * neckMultiplier * designMultiplier;
}

// Calculate fill work time based on coverage and techniques
function calculateFillWorkTime(hasFillWork: boolean, coverage: string, techniques: string[], techniquePercentages: Record<string, number>, chestSize: number, section: string): number {
  if (!hasFillWork) return 0;

  const coveragePercent = (parseFloat(coverage) || 50) / 100; // default 50% coverage
  const area = calculateCoverageArea(chestSize, section) * coveragePercent;

  let techniqueMultiplier = 1.0;
  techniques.forEach(technique => {
    const percentage = techniquePercentages[technique] || 0;
    techniqueMultiplier *= (1 + (TECHNIQUE_MULTIPLIERS[technique as keyof typeof TECHNIQUE_MULTIPLIERS] || 1.0 - 1) * (percentage / 100));
  });

  return area * FILL_WORK_BASE_TIME_PER_SQ_INCH * techniqueMultiplier;
}

// Calculate motif time based on count, size, and techniques
function calculateMotifTime(hasMotifs: boolean, motifSize: string, motifCount: string, techniques: string[], techniquePercentages: Record<string, number>): number {
  if (!hasMotifs) return 0;

  const size = parseFloat(motifSize) || 1;
  const count = parseFloat(motifCount) || 1;

  let techniqueMultiplier = 1.0;
  techniques.forEach(technique => {
    const percentage = techniquePercentages[technique] || 0;
    techniqueMultiplier *= (1 + (TECHNIQUE_MULTIPLIERS[technique as keyof typeof TECHNIQUE_MULTIPLIERS] || 1.0 - 1) * (percentage / 100));
  });

  return count * MOTIF_BASE_TIME_PER_MOTIF * size * MOTIF_SIZE_MULTIPLIER * techniqueMultiplier;
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
  allBorderSize: string;
  allNeckType: string;
  allNeckDesignNumber: string;
  allNeckType2: string;
  allNeckType2DesignNumber: string;
  allHasFillWork: boolean;
  allCoverage: string;
  allHasMotifs: boolean;
  allMotifSize: string;
  allMotifCount: string;
  allSelectedTechniques: string[];
  allTechniquePercentages: Record<string, number>;
  frontHasBorders: boolean;
  frontBorderSize: string;
  frontNeckType: string;
  frontNeckDesignNumber: string;
  frontNeckType2: string;
  frontNeckType2DesignNumber: string;
  frontHasFillWork: boolean;
  frontCoverage: string;
  frontHasMotifs: boolean;
  frontMotifSize: string;
  frontMotifCount: string;
  frontSelectedTechniques: string[];
  frontTechniquePercentages: Record<string, number>;
  backHasBorders: boolean;
  backBorderSize: string;
  backNeckType: string;
  backNeckDesignNumber: string;
  backNeckType2: string;
  backNeckType2DesignNumber: string;
  backHasFillWork: boolean;
  backCoverage: string;
  backHasMotifs: boolean;
  backMotifSize: string;
  backMotifCount: string;
  backSelectedTechniques: string[];
  backTechniquePercentages: Record<string, number>;
  handsHasBorders: boolean;
  handsBorderSize: string;
  handsNeckType: string;
  handsNeckDesignNumber: string;
  handsSelectedDesign: string;
  handsHasFillWork: boolean;
  handsCoverage: string;
  handsHasMotifs: boolean;
  handsMotifSize: string;
  handsMotifCount: string;
  handsSelectedTechniques: string[];
  handsTechniquePercentages: Record<string, number>;
}

export function calculateTime(state: CalculationState): CalculationResult {
  const chestSize = parseFloat(state.chestSize) || 36; // default 36 inches

  // Calculate times for each section
  const frontBorders = calculateBorderTime(
    state.frontHasBorders,
    parseFloat(state.frontBorderSize) || 1,
    state.frontNeckType,
    parseFloat(state.frontNeckDesignNumber) || 1
  );

  const frontFillWork = calculateFillWorkTime(
    state.frontHasFillWork,
    state.frontCoverage || '50',
    state.frontSelectedTechniques,
    state.frontTechniquePercentages,
    chestSize,
    'front'
  );

  const frontMotifs = calculateMotifTime(
    state.frontHasMotifs,
    state.frontMotifSize || '1',
    state.frontMotifCount || '1',
    state.frontSelectedTechniques,
    state.frontTechniquePercentages
  );

  const backBorders = calculateBorderTime(
    state.backHasBorders,
    parseFloat(state.backBorderSize) || 1,
    state.backNeckType,
    parseFloat(state.backNeckDesignNumber) || 1
  );

  const backFillWork = calculateFillWorkTime(
    state.backHasFillWork,
    state.backCoverage || '50',
    state.backSelectedTechniques,
    state.backTechniquePercentages,
    chestSize,
    'back'
  );

  const backMotifs = calculateMotifTime(
    state.backHasMotifs,
    state.backMotifSize || '1',
    state.backMotifCount || '1',
    state.backSelectedTechniques,
    state.backTechniquePercentages
  );

  const handsBorders = calculateBorderTime(
    state.handsHasBorders,
    parseFloat(state.handsBorderSize) || 1,
    state.handsNeckType,
    parseFloat(state.handsNeckDesignNumber) || 1
  );

  const handsFillWork = calculateFillWorkTime(
    state.handsHasFillWork,
    state.handsCoverage || '50',
    state.handsSelectedTechniques,
    state.handsTechniquePercentages,
    chestSize,
    'hands'
  );

  const handsMotifs = calculateMotifTime(
    state.handsHasMotifs,
    state.handsMotifSize || '1',
    state.handsMotifCount || '1',
    state.handsSelectedTechniques,
    state.handsTechniquePercentages
  );

  // Calculate section totals
  const frontTotal = frontBorders + frontFillWork + frontMotifs;
  const backTotal = backBorders + backFillWork + backMotifs;
  const handsTotal = handsBorders + handsFillWork + handsMotifs;

  const totalTime = STANDARD_START_TIME + frontTotal + backTotal + handsTotal;

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
