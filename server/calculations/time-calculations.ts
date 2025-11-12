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
  borderValue: number,
  coverage: number,
  weightedTime: number
): number {
  if (!hasBorders || !borderValue) return 0;

  // Formula: Border value × coverage% × Weighted Time
  const coverageMultiplier = coverage / 100;
  
  return borderValue * coverageMultiplier * weightedTime;
}

export function calculateFillWorkTime(
  hasFillWork: boolean,
  fillworkArea: number,
  coverage: number,
  weightedTime: number
): number {
  if (!hasFillWork || !fillworkArea) return 0;

  // Formula: Fillwork area × coverage% × Weighted Time
  const coverageMultiplier = coverage / 100;
  
  return fillworkArea * coverageMultiplier * weightedTime;
}

export function calculateMotifTime(
  hasMotifs: boolean,
  motifValue: number,
  sizeFactor: number,
  coverage: number,
  weightedTime: number
): number {
  if (!hasMotifs || !motifValue) return 0;

  // Formula: Motif value × Size Factor × coverage% × Weighted Time
  const coverageMultiplier = coverage / 100;
  
  return motifValue * sizeFactor * coverageMultiplier * weightedTime;
}
