/**
 * Border calculation utilities based on CALCULATION_README.md formulas
 */

interface BorderCalculation {
  formula: string;
  inputs: { [key: string]: number };
  result: number;
}

/**
 * Calculate hand border length
 * Based on CALCULATION_README.md:
 * - style1: ((HandRound - 2)*2)
 * - style2: ((ArmholeRound - 2)*2)
 * - style3: (((HR + AR)/2 - 2)*2)
 * - style4: HR + AR
 */
export function calculateHandBorderLength(
  neckStyle: string,
  handRound: number,
  armholeRound: number
): BorderCalculation {
  const HR = handRound;
  const AR = armholeRound;

  if (neckStyle === 'style1') {
    return {
      formula: '(HandRound - 2) × 2',
      inputs: { 'Hand Round': HR },
      result: (HR - 2) * 2
    };
  }

  if (neckStyle === 'style2') {
    return {
      formula: '(ArmholeRound - 2) × 2',
      inputs: { 'Armhole Round': AR },
      result: (AR - 2) * 2
    };
  }

  if (neckStyle === 'style3') {
    return {
      formula: '((HandRound + ArmholeRound) / 2 - 2) × 2',
      inputs: { 'Hand Round': HR, 'Armhole Round': AR },
      result: (((HR + AR) / 2) - 2) * 2
    };
  }

  if (neckStyle === 'style4') {
    return {
      formula: 'HandRound + ArmholeRound',
      inputs: { 'Hand Round': HR, 'Armhole Round': AR },
      result: HR + AR
    };
  }

  return {
    formula: '0 (no border for this style)',
    inputs: { 'Hand Round': HR, 'Armhole Round': AR },
    result: 0
  };
}

