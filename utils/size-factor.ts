/**
 * Size factor utilities based on CALCULATION_README.md
 * 
 * Size factors:
 * 28 - 1
 * 30 - 1.028
 * 32 - 1.056
 * 34 - 1.084
 * 36 - 1.112
 * 38 - 1.14
 * 40 - 1.168
 * 42 - 1.196
 * 44 - 1.224
 */

const SIZE_FACTORS: { [key: number]: number } = {
  28: 1,
  30: 1.028,
  32: 1.056,
  34: 1.084,
  36: 1.112,
  38: 1.14,
  40: 1.168,
  42: 1.196,
  44: 1.224
};

/**
 * Get size factor for a given chest size
 * For odd sizes, calculate the average of the surrounding even sizes
 */
export function getSizeFactor(chestSize: number): number {
  // Clamp size between 28 and 44
  const size = Math.max(28, Math.min(44, chestSize));
  
  // If exact size exists in factors, return it
  if (SIZE_FACTORS[size]) {
    return SIZE_FACTORS[size];
  }
  
  // For odd sizes, interpolate between surrounding even sizes
  const lowerSize = Math.floor(size / 2) * 2; // Round down to nearest even
  const upperSize = lowerSize + 2;
  
  const lowerFactor = SIZE_FACTORS[lowerSize] || 1;
  const upperFactor = SIZE_FACTORS[upperSize] || SIZE_FACTORS[44];
  
  // Linear interpolation
  return (lowerFactor + upperFactor) / 2;
}

/**
 * Get size factor info for display
 */
export function getSizeFactorInfo(chestSize: number): {
  size: number;
  factor: number;
  isInterpolated: boolean;
  calculation?: string;
} {
  const size = Math.max(28, Math.min(44, chestSize));
  
  if (SIZE_FACTORS[size]) {
    return {
      size,
      factor: SIZE_FACTORS[size],
      isInterpolated: false
    };
  }
  
  // For odd sizes
  const lowerSize = Math.floor(size / 2) * 2;
  const upperSize = lowerSize + 2;
  const lowerFactor = SIZE_FACTORS[lowerSize] || 1;
  const upperFactor = SIZE_FACTORS[upperSize] || SIZE_FACTORS[44];
  const interpolatedFactor = (lowerFactor + upperFactor) / 2;
  
  return {
    size,
    factor: interpolatedFactor,
    isInterpolated: true,
    calculation: `(${lowerFactor} + ${upperFactor}) / 2`
  };
}

