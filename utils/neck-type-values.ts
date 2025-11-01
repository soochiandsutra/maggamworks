/**
 * Neck type value utilities based on CALCULATION_README.md
 */

/**
 * Get front neck type value
 * Based on CALCULATION_README.md:
 * - BoatNeck: 11
 * - DeepNeck: 2
 * - style1 (MadubalaNeck): 3.8
 * - Style2 (PatchWork): 3.0
 * - Style3 (BridalNeck): 2.5
 * - Style4 (V-Neck): 1.5
 */
export function getFrontNeckTypeValue(neckStyle: string): { name: string; value: number } {
  const neckValues: { [key: string]: { name: string; value: number } } = {
    'boat': { name: 'Boat Neck', value: 11 },
    'deep': { name: 'Deep Neck', value: 2 },
    '1': { name: 'Style 1 (Madubala Neck)', value: 3.8 },
    '2': { name: 'Style 2 (Patch Work)', value: 3.0 },
    '3': { name: 'Style 3 (Bridal Neck)', value: 2.5 },
    '4': { name: 'Style 4 (V-Neck)', value: 1.5 }
  };

  return neckValues[neckStyle] || { name: 'Not Selected', value: 0 };
}

/**
 * Get back neck type value
 * Based on CALCULATION_README.md:
 * - BoatNeck: 11
 * - DeepNeck: 2
 * - style1: 2
 * - Style2: 2.7
 * - Style3: 3.7
 * - Style4: 2
 * - Style5: 2.5
 * - Style6: 1.4
 */
export function getBackNeckTypeValue(neckStyle: string): { name: string; value: number } {
  const neckValues: { [key: string]: { name: string; value: number } } = {
    'boat': { name: 'Boat Neck', value: 11 },
    'deep': { name: 'Deep Neck', value: 2 },
    '1': { name: 'Style 1', value: 2 },
    '2': { name: 'Style 2', value: 2.7 },
    '3': { name: 'Style 3', value: 3.7 },
    '4': { name: 'Style 4', value: 2 },
    '5': { name: 'Style 5', value: 2.5 },
    '6': { name: 'Style 6', value: 1.4 }
  };

  return neckValues[neckStyle] || { name: 'Not Selected', value: 0 };
}

