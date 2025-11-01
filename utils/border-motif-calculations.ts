/**
 * Border and Motif calculation utilities
 * 
 * Formulas:
 * For Front and Back:
 * - Top Border value = Neck type value × Size factor × main border thickness
 * - Bottom Border value = (size/2) × bottom border thickness
 * - Motif value = (X inch × Y inch) × count
 * 
 * For hands:
 * - Hands Border value = Border Formula result × thickness
 * - Motif value = (X inch × Y inch) × count
 */

import { getSizeFactor } from './size-factor';
import { getFrontNeckTypeValue, getBackNeckTypeValue } from './neck-type-values';
import { calculateHandBorderLength } from './border-calculations';

interface CalculationResult {
  formula: string;
  inputs: { [key: string]: number | string };
  result: number;
}

/**
 * Calculate Front Top Border value
 * Formula: Neck type value × Size factor × main border thickness
 */
export function calculateFrontTopBorder(
  neckStyle: string,
  chestSize: number,
  borderThickness: number
): CalculationResult {
  const neckTypeValue = getFrontNeckTypeValue(neckStyle).value;
  const sizeFactor = getSizeFactor(chestSize);
  const result = neckTypeValue * sizeFactor * borderThickness;

  return {
    formula: 'Neck Type Value × Size Factor × Border Thickness',
    inputs: {
      'Neck Type Value': neckTypeValue,
      'Size Factor': sizeFactor,
      'Border Thickness': borderThickness
    },
    result
  };
}

/**
 * Calculate Back Top Border value
 * Formula: Neck type value × Size factor × main border thickness
 */
export function calculateBackTopBorder(
  neckStyle: string,
  chestSize: number,
  borderThickness: number
): CalculationResult {
  const neckTypeValue = getBackNeckTypeValue(neckStyle).value;
  const sizeFactor = getSizeFactor(chestSize);
  const result = neckTypeValue * sizeFactor * borderThickness;

  return {
    formula: 'Neck Type Value × Size Factor × Border Thickness',
    inputs: {
      'Neck Type Value': neckTypeValue,
      'Size Factor': sizeFactor,
      'Border Thickness': borderThickness
    },
    result
  };
}

/**
 * Calculate Bottom Border value (for Front and Back)
 * Formula: (size/2) × bottom border thickness
 */
export function calculateBottomBorder(
  chestSize: number,
  bottomBorderThickness: number
): CalculationResult {
  const result = (chestSize / 2) * bottomBorderThickness;

  return {
    formula: '(Chest Size / 2) × Bottom Border Thickness',
    inputs: {
      'Chest Size': chestSize,
      'Bottom Border Thickness': bottomBorderThickness
    },
    result
  };
}

/**
 * Calculate Hands Border value
 * Formula: Border Formula result × thickness
 */
export function calculateHandsBorderValue(
  neckStyle: string,
  handRound: number,
  armholeRound: number,
  borderThickness: number
): CalculationResult {
  const borderLength = calculateHandBorderLength(neckStyle, handRound, armholeRound);
  const result = borderLength.result * borderThickness;

  return {
    formula: 'Border Formula Result × Border Thickness',
    inputs: {
      'Border Formula Result': borderLength.result,
      'Border Thickness': borderThickness,
      'Formula Used': borderLength.formula
    },
    result
  };
}

/**
 * Calculate Motif value (same for Front, Back, and Hands)
 * Formula: (X inch × Y inch) × count
 */
export function calculateMotifValue(
  motifX: number,
  motifY: number,
  count: number
): CalculationResult {
  const result = (motifX * motifY) * count;

  return {
    formula: '(Motif X × Motif Y) × Count',
    inputs: {
      'Motif X': motifX,
      'Motif Y': motifY,
      'Count': count
    },
    result
  };
}

