import {
  BORDER_BASE_TIME_PER_INCH,
  FILL_WORK_BASE_TIME_PER_SQ_INCH,
  MOTIF_BASE_TIME_PER_MOTIF,
  MOTIF_SIZE_MULTIPLIER,
  NECK_TYPE_MULTIPLIERS,
  WORK_TYPE_BASE_TIMES,
  TECHNIQUE_MULTIPLIERS,
  type WorkType,
  type TechniqueType
} from '../constants/calculation-constants';
import { calculateCoverageArea } from './area-calculations';

export function normalizeTechniquePercentages(techniquePercentages: Record<string, number>): Record<string, number> {
  const total = Object.values(techniquePercentages).reduce((sum, val) => sum + val, 0);
  if (total === 0) return techniquePercentages;

  const normalized: Record<string, number> = {};
  for (const [key, value] of Object.entries(techniquePercentages)) {
    normalized[key] = Math.round((value / total) * 100);
  }
  return normalized;
}

// Technique time values (in minutes per sq inch or per motif)
const TECHNIQUE_TIME_VALUES: Record<string, number> = {
  "Challa work": 12,
  "Paani work": 5,
  "Chamki filling": 5,
  "Cutdana filling": 5,
  "Lavangam Kuttu": 7.5,
  "Sugar bead": 7.5,
  "Thread filling": 8.5,
  "Sugar bead + Chamki": 8.5,
  "Zardosi Challa": 21,
  "Thread Knot": 21,
  "Mirror / Zarkans": 7,
  "Zardosi rose": 27,
  "Thread roses": 30,
  "Zardosi chain": 14,
  "Knot W/ chamki": 17
};

export function calculateWeightedTime(
  techniques: string[],
  techniquePercentages: Record<string, number>
): number {
  if (!techniques.length) return 1; // Return 1 as default multiplier if no techniques

  // Calculate total raw percentage
  const totalPercentage = techniques.reduce((sum, technique) => {
    return sum + (techniquePercentages[technique] || 50);
  }, 0);

  // Calculate weighted time
  let weightedTime = 0;
  for (const technique of techniques) {
    const rawPercentage = techniquePercentages[technique] || 50;
    const normalizedPercentage = totalPercentage > 0 ? (rawPercentage / totalPercentage) * 100 : 0;
    const timeValue = TECHNIQUE_TIME_VALUES[technique] || 0;
    weightedTime += timeValue * (normalizedPercentage / 100);
  }

  return weightedTime;
}

export function calculateBorderTime(
  hasBorders: boolean,
  borderSize: number,
  neckType: string,
  designNumber: number,
  coverage: number,
  weightedTime: number
): number {
  if (!hasBorders || !borderSize) return 0;

  // BorderValue is the base time
  const borderValue = borderSize * BORDER_BASE_TIME_PER_INCH;
  const neckMultiplier = NECK_TYPE_MULTIPLIERS[neckType as keyof typeof NECK_TYPE_MULTIPLIERS] || 1.0;
  const designMultiplier = designNumber > 1 ? 1.2 : 1.0;
  
  const totalBorderValue = borderValue * neckMultiplier * designMultiplier;
  
  // Apply coverage and weighted time: (Border Value) * coverage% * WeightedTime
  const coverageMultiplier = coverage / 100;
  
  return totalBorderValue * coverageMultiplier * weightedTime;
}

export function calculateFillWorkTime(
  hasFillWork: boolean,
  coverage: number,
  techniques: string[],
  techniquePercentages: Record<string, number>,
  chestSize: number,
  section: string,
  borderValue: number,
  weightedTime: number
): number {
  if (!hasFillWork || !techniques.length) return 0;

  // Calculate the fill work base calculation
  const area = calculateCoverageArea(chestSize, section);
  let fillWorkCalculation = 0;

  // Calculate total raw percentage for normalization
  const totalPercentage = techniques.reduce((sum, technique) => {
    return sum + (techniquePercentages[technique] || 50);
  }, 0);

  for (const technique of techniques) {
    const workType = technique as WorkType;
    const rawPercentage = techniquePercentages[technique] || 50;
    const normalizedPercentage = totalPercentage > 0 ? (rawPercentage / totalPercentage) * 100 : 0;
    const baseTimePerSqInch = WORK_TYPE_BASE_TIMES[workType] || FILL_WORK_BASE_TIME_PER_SQ_INCH;
    const techniqueMultiplier = TECHNIQUE_MULTIPLIERS[technique as TechniqueType] || 1.0;

    const techniqueArea = area * (normalizedPercentage / 100);
    const techniqueTime = techniqueArea * baseTimePerSqInch * techniqueMultiplier;

    fillWorkCalculation += techniqueTime;
  }

  // Apply formula: FillWork calculation * borderValue * coverage% * WeightedTime
  const coverageMultiplier = coverage / 100;
  
  return fillWorkCalculation * borderValue * coverageMultiplier * weightedTime;
}

export function calculateMotifTime(
  hasMotifs: boolean,
  motifSizeX: number,
  motifSizeY: number,
  motifCount: string,
  techniques: string[],
  techniquePercentages: Record<string, number>,
  coverage: number,
  weightedTime: number
): number {
  if (!hasMotifs || !motifCount) return 0;

  const count = parseInt(motifCount) || 0;
  if (count === 0) return 0;

  const averageSize = (motifSizeX + motifSizeY) / 2;
  const sizeMultiplier = averageSize > 2 ? MOTIF_SIZE_MULTIPLIER : 1.0;

  let motifValue = 0;

  // Calculate total raw percentage for normalization
  const totalPercentage = techniques.reduce((sum, technique) => {
    return sum + (techniquePercentages[technique] || 50);
  }, 0);

  for (const technique of techniques) {
    const rawPercentage = techniquePercentages[technique] || 50;
    const normalizedPercentage = totalPercentage > 0 ? (rawPercentage / totalPercentage) * 100 : 0;
    const techniqueMultiplier = TECHNIQUE_MULTIPLIERS[technique as TechniqueType] || 1.0;

    const motifTime = MOTIF_BASE_TIME_PER_MOTIF * count * sizeMultiplier * techniqueMultiplier;
    motifValue += motifTime * (normalizedPercentage / 100);
  }

  // Apply formula: Motif value * coverage% * WeightedTime
  const coverageMultiplier = coverage / 100;
  
  return motifValue * coverageMultiplier * weightedTime;
}
