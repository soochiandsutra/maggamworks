/**
 * Fillwork area calculation utilities based on CALCULATION_README.md formulas
 */

interface FillworkCalculation {
  formula: string;
  inputs: { [key: string]: number };
  result: number;
}

/**
 * Calculate fillwork area for Front section
 * Based on CALCULATION_README.md:
 * - BoatNeck: ((size*7)-10)
 * - DeepNeck: ((size*7)-56)
 * - Remaining all values = 0
 */
export function calculateFrontFillworkArea(
  neckStyle: string,
  chestSize: number
): FillworkCalculation {
  const size = chestSize;

  if (neckStyle === 'boat') {
    return {
      formula: '(size × 7) - 10',
      inputs: { size },
      result: (size * 7) - 10
    };
  }

  if (neckStyle === 'deep') {
    return {
      formula: '(size × 7) - 56',
      inputs: { size },
      result: (size * 7) - 56
    };
  }

  return {
    formula: '0 (no fillwork for this style)',
    inputs: { size },
    result: 0
  };
}

/**
 * Calculate fillwork area for Back section
 * Based on CALCULATION_README.md:
 * - BoatNeck: ((size*7)-10)
 * - DeepNeck: ((size*7)-70)
 * - style3: ((size*7)-50)
 * - Remaining all values = 0
 */
export function calculateBackFillworkArea(
  neckStyle: string,
  chestSize: number
): FillworkCalculation {
  const size = chestSize;

  if (neckStyle === 'boat') {
    return {
      formula: '(size × 7) - 10',
      inputs: { size },
      result: (size * 7) - 10
    };
  }

  if (neckStyle === 'deep') {
    return {
      formula: '(size × 7) - 70',
      inputs: { size },
      result: (size * 7) - 70
    };
  }

  if (neckStyle === '3') {
    return {
      formula: '(size × 7) - 50',
      inputs: { size },
      result: (size * 7) - 50
    };
  }

  return {
    formula: '0 (no fillwork for this style)',
    inputs: { size },
    result: 0
  };
}

/**
 * Calculate fillwork area for Hands section
 * Based on CALCULATION_README.md:
 * - All: ((Armhole round + Hand round) / 2 - 1) × sleeve length × 2
 */
export function calculateHandsFillworkArea(
  armholeRound: number,
  handRound: number,
  sleeveLength: number
): FillworkCalculation {
  const AR = armholeRound;
  const HR = handRound;
  const SL = sleeveLength;

  const result = ((AR + HR) / 2 - 1) * SL * 2;

  return {
    formula: '((ArmholeRound + HandRound) / 2 - 1) × SleeveLength × 2',
    inputs: {
      'Armhole Round': AR,
      'Hand Round': HR,
      'Sleeve Length': SL
    },
    result
  };
}

