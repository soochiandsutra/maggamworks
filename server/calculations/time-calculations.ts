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

export function calculateBorderTime(
  hasBorders: boolean,
  borderSize: number,
  neckType: string,
  designNumber: number
): number {
  if (!hasBorders || !borderSize) return 0;

  const baseTime = borderSize * BORDER_BASE_TIME_PER_INCH;
  const neckMultiplier = NECK_TYPE_MULTIPLIERS[neckType as keyof typeof NECK_TYPE_MULTIPLIERS] || 1.0;
  const designMultiplier = designNumber > 1 ? 1.2 : 1.0; // Additional time for multiple designs

  return baseTime * neckMultiplier * designMultiplier;
}

export function calculateFillWorkTime(
  hasFillWork: boolean,
  coverage: string,
  techniques: string[],
  techniquePercentages: Record<string, number>,
  chestSize: number,
  section: string
): number {
  if (!hasFillWork || !techniques.length) return 0;

  const area = calculateCoverageArea(chestSize, section);
  let totalTime = 0;

  for (const technique of techniques) {
    const workType = technique as WorkType;
    const percentage = techniquePercentages[technique] || 0;
    const baseTimePerSqInch = WORK_TYPE_BASE_TIMES[workType] || FILL_WORK_BASE_TIME_PER_SQ_INCH;
    const techniqueMultiplier = TECHNIQUE_MULTIPLIERS[technique as TechniqueType] || 1.0;

    const techniqueArea = area * (percentage / 100);
    const techniqueTime = techniqueArea * baseTimePerSqInch * techniqueMultiplier;

    totalTime += techniqueTime;
  }

  return totalTime;
}

export function calculateMotifTime(
  hasMotifs: boolean,
  motifSizeX: number,
  motifSizeY: number,
  motifCount: string,
  techniques: string[],
  techniquePercentages: Record<string, number>
): number {
  if (!hasMotifs || !motifCount) return 0;

  const count = parseInt(motifCount) || 0;
  if (count === 0) return 0;

  const averageSize = (motifSizeX + motifSizeY) / 2;
  const sizeMultiplier = averageSize > 2 ? MOTIF_SIZE_MULTIPLIER : 1.0;

  let totalTime = 0;

  for (const technique of techniques) {
    const percentage = techniquePercentages[technique] || 0;
    const techniqueMultiplier = TECHNIQUE_MULTIPLIERS[technique as TechniqueType] || 1.0;

    const motifTime = MOTIF_BASE_TIME_PER_MOTIF * count * sizeMultiplier * techniqueMultiplier;
    totalTime += motifTime * (percentage / 100);
  }

  return totalTime;
}
