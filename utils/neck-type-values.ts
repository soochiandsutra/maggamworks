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
 * - Style3 (BridalNeck): 2/5 * ((chestsize * 7) - 56)
 * - Style4 (V-Neck): 1.5
 */
export function getFrontNeckTypeValue(neckStyle: string, chestSize?: number): { name: string; value: number } {
  // Style3 uses a formula based on chest size
  if (neckStyle === '3' && chestSize !== undefined) {
    const value = (2 / 5) * ((chestSize * 7) - 56);
    return { name: 'Style 3 (Bridal Neck)', value };
  }

  const neckValues: { [key: string]: { name: string; value: number } } = {
    'boat': { name: 'Boat Neck', value: 11 },
    'deep': { name: 'Deep Neck', value: 22 },
    '1': { name: 'Style 1 (Madubala Neck)', value: 41.8 },
    '2': { name: 'Style 2 (Patch Work)', value: 33 },
    '3': { name: 'Style 3 (Bridal Neck)', value: 0 }, // fallback if chestSize not provided
    '4': { name: 'Style 4 (V-Neck)', value: 16.5 }
  };

  return neckValues[neckStyle] || { name: 'Not Selected', value: 0 };
}

/**
 * Get back neck type value
 * Based on CALCULATION_README.md:
 * - BoatNeck: 11
 * - DeepNeck: 2.7
 * - style1: 2
 * - Style2: 2.7
 * - Style3: 3.7
 * - Style4: 2
 * - Style5: 0.55 * ((chestsize * 7) - 10)
 * - Style6: 1.4
 */
export function getBackNeckTypeValue(neckStyle: string, chestSize?: number): { name: string; value: number } {
  // Style5 uses a formula based on chest size
  if (neckStyle === '5' && chestSize !== undefined) {
    const value = 0.55 * ((chestSize * 7) - 10);
    return { name: 'Style 5', value };
  }

  const neckValues: { [key: string]: { name: string; value: number } } = {
    'boat': { name: 'Boat Neck', value: 11 },
    'deep': { name: 'Deep Neck', value: 29.7 },
    '1': { name: 'Style 1', value: 22 },
    '2': { name: 'Style 2', value: 29.7 },
    '3': { name: 'Style 3', value: 40.7 },
    '4': { name: 'Style 4', value: 22 },
    '5': { name: 'Style 5', value: 0 }, // fallback if chestSize not provided
    '6': { name: 'Style 6', value: 15.4 }
  };

  return neckValues[neckStyle] || { name: 'Not Selected', value: 0 };
}

