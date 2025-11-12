import { getSizeFactor, getSizeFactorInfo } from '../size-factor';

describe('getSizeFactor', () => {
  describe('Exact size factor values', () => {
    it('should return 1 for chest size 28', () => {
      expect(getSizeFactor(28)).toBe(1);
    });

    it('should return 1.028 for chest size 30', () => {
      expect(getSizeFactor(30)).toBe(1.028);
    });

    it('should return 1.056 for chest size 32', () => {
      expect(getSizeFactor(32)).toBe(1.056);
    });

    it('should return 1.084 for chest size 34', () => {
      expect(getSizeFactor(34)).toBe(1.084);
    });

    it('should return 1.112 for chest size 36', () => {
      expect(getSizeFactor(36)).toBe(1.112);
    });

    it('should return 1.14 for chest size 38', () => {
      expect(getSizeFactor(38)).toBe(1.14);
    });

    it('should return 1.168 for chest size 40', () => {
      expect(getSizeFactor(40)).toBe(1.168);
    });

    it('should return 1.196 for chest size 42', () => {
      expect(getSizeFactor(42)).toBe(1.196);
    });

    it('should return 1.224 for chest size 44', () => {
      expect(getSizeFactor(44)).toBe(1.224);
    });
  });

  describe('Interpolated values (odd sizes)', () => {
    it('should interpolate for chest size 29', () => {
      // (28: 1 + 30: 1.028) / 2 = 2.028 / 2 = 1.014
      const result = getSizeFactor(29);
      expect(result).toBeCloseTo(1.014, 3);
    });

    it('should interpolate for chest size 31', () => {
      // (30: 1.028 + 32: 1.056) / 2 = 2.084 / 2 = 1.042
      const result = getSizeFactor(31);
      expect(result).toBeCloseTo(1.042, 3);
    });

    it('should interpolate for chest size 33', () => {
      // (32: 1.056 + 34: 1.084) / 2 = 2.14 / 2 = 1.07
      const result = getSizeFactor(33);
      expect(result).toBeCloseTo(1.07, 3);
    });

    it('should interpolate for chest size 35', () => {
      // (34: 1.084 + 36: 1.112) / 2 = 2.196 / 2 = 1.098
      const result = getSizeFactor(35);
      expect(result).toBeCloseTo(1.098, 3);
    });

    it('should interpolate for chest size 37', () => {
      // (36: 1.112 + 38: 1.14) / 2 = 2.252 / 2 = 1.126
      const result = getSizeFactor(37);
      expect(result).toBeCloseTo(1.126, 3);
    });

    it('should interpolate for chest size 39', () => {
      // (38: 1.14 + 40: 1.168) / 2 = 2.308 / 2 = 1.154
      const result = getSizeFactor(39);
      expect(result).toBeCloseTo(1.154, 3);
    });

    it('should interpolate for chest size 41', () => {
      // (40: 1.168 + 42: 1.196) / 2 = 2.364 / 2 = 1.182
      const result = getSizeFactor(41);
      expect(result).toBeCloseTo(1.182, 3);
    });

    it('should interpolate for chest size 43', () => {
      // (42: 1.196 + 44: 1.224) / 2 = 2.42 / 2 = 1.21
      const result = getSizeFactor(43);
      expect(result).toBeCloseTo(1.21, 3);
    });
  });

  describe('Edge cases - Clamping', () => {
    it('should clamp size below 28 to 28', () => {
      expect(getSizeFactor(20)).toBe(1); // Same as size 28
      expect(getSizeFactor(25)).toBe(1);
      expect(getSizeFactor(27)).toBe(1);
    });

    it('should clamp size above 44 to 44', () => {
      expect(getSizeFactor(45)).toBe(1.224); // Same as size 44
      expect(getSizeFactor(50)).toBe(1.224);
      expect(getSizeFactor(100)).toBe(1.224);
    });

    it('should handle exactly 0', () => {
      expect(getSizeFactor(0)).toBe(1); // Clamped to 28
    });

    it('should handle negative values', () => {
      expect(getSizeFactor(-10)).toBe(1); // Clamped to 28
    });
  });

  describe('Decimal values', () => {
    it('should handle decimal values by rounding to nearest even for interpolation', () => {
      // 28.5 should be treated as between 28 and 30
      const result = getSizeFactor(28.5);
      expect(result).toBeCloseTo(1.014, 3);
    });

    it('should handle 36.7 by interpolating between 36 and 38', () => {
      // Should be treated as 37 (odd), so (36 + 38) / 2
      const result = getSizeFactor(36.7);
      expect(result).toBeCloseTo(1.126, 3);
    });

    it('should handle exact even decimal like 32.0', () => {
      const result = getSizeFactor(32.0);
      expect(result).toBe(1.056);
    });
  });

  describe('Interpolation formula verification', () => {
    it('should use average formula: (lower + upper) / 2', () => {
      const size29 = getSizeFactor(29);
      const manual29 = (1 + 1.028) / 2;
      expect(size29).toBe(manual29);

      const size35 = getSizeFactor(35);
      const manual35 = (1.084 + 1.112) / 2;
      expect(size35).toBe(manual35);

      const size41 = getSizeFactor(41);
      const manual41 = (1.168 + 1.196) / 2;
      expect(size41).toBe(manual41);
    });
  });
});

describe('getSizeFactorInfo', () => {
  describe('Exact sizes - Not interpolated', () => {
    it('should return correct info for size 28', () => {
      const info = getSizeFactorInfo(28);
      expect(info.size).toBe(28);
      expect(info.factor).toBe(1);
      expect(info.isInterpolated).toBe(false);
      expect(info.calculation).toBeUndefined();
    });

    it('should return correct info for size 36', () => {
      const info = getSizeFactorInfo(36);
      expect(info.size).toBe(36);
      expect(info.factor).toBe(1.112);
      expect(info.isInterpolated).toBe(false);
      expect(info.calculation).toBeUndefined();
    });

    it('should return correct info for size 44', () => {
      const info = getSizeFactorInfo(44);
      expect(info.size).toBe(44);
      expect(info.factor).toBe(1.224);
      expect(info.isInterpolated).toBe(false);
      expect(info.calculation).toBeUndefined();
    });
  });

  describe('Odd sizes - Interpolated', () => {
    it('should return interpolated info for size 29', () => {
      const info = getSizeFactorInfo(29);
      expect(info.size).toBe(29);
      expect(info.factor).toBeCloseTo(1.014, 3);
      expect(info.isInterpolated).toBe(true);
      expect(info.calculation).toBe('(1 + 1.028) / 2');
    });

    it('should return interpolated info for size 35', () => {
      const info = getSizeFactorInfo(35);
      expect(info.size).toBe(35);
      expect(info.factor).toBeCloseTo(1.098, 3);
      expect(info.isInterpolated).toBe(true);
      expect(info.calculation).toBe('(1.084 + 1.112) / 2');
    });

    it('should return interpolated info for size 41', () => {
      const info = getSizeFactorInfo(41);
      expect(info.size).toBe(41);
      expect(info.factor).toBeCloseTo(1.182, 3);
      expect(info.isInterpolated).toBe(true);
      expect(info.calculation).toBe('(1.168 + 1.196) / 2');
    });

    it('should return interpolated info for size 43', () => {
      const info = getSizeFactorInfo(43);
      expect(info.size).toBe(43);
      expect(info.factor).toBeCloseTo(1.21, 3);
      expect(info.isInterpolated).toBe(true);
      expect(info.calculation).toBe('(1.196 + 1.224) / 2');
    });
  });

  describe('Edge cases with info', () => {
    it('should clamp and show info for size below 28', () => {
      const info = getSizeFactorInfo(20);
      expect(info.size).toBe(28); // Clamped
      expect(info.factor).toBe(1);
      expect(info.isInterpolated).toBe(false);
    });

    it('should clamp and show info for size above 44', () => {
      const info = getSizeFactorInfo(50);
      expect(info.size).toBe(44); // Clamped
      expect(info.factor).toBe(1.224);
      expect(info.isInterpolated).toBe(false);
    });
  });

  describe('Calculation string format', () => {
    it('should format calculation string correctly', () => {
      const info29 = getSizeFactorInfo(29);
      expect(info29.calculation).toMatch(/^\([\d.]+ \+ [\d.]+\) \/ 2$/);
      
      const info35 = getSizeFactorInfo(35);
      expect(info35.calculation).toMatch(/^\([\d.]+ \+ [\d.]+\) \/ 2$/);
    });

    it('should have no calculation string for exact sizes', () => {
      const info30 = getSizeFactorInfo(30);
      expect(info30.calculation).toBeUndefined();
      
      const info36 = getSizeFactorInfo(36);
      expect(info36.calculation).toBeUndefined();
    });
  });
});

describe('Integration - Size factor in calculations', () => {
  it('should produce consistent results between getSizeFactor and getSizeFactorInfo', () => {
    const testSizes = [28, 29, 30, 35, 36, 40, 41, 44];
    
    testSizes.forEach(size => {
      const factor = getSizeFactor(size);
      const info = getSizeFactorInfo(size);
      expect(factor).toBe(info.factor);
    });
  });

  it('should handle all sizes from 28 to 44', () => {
    for (let size = 28; size <= 44; size++) {
      const factor = getSizeFactor(size);
      expect(factor).toBeGreaterThanOrEqual(1);
      expect(factor).toBeLessThanOrEqual(1.224);
    }
  });

  it('should produce monotonically increasing factors', () => {
    const sizes = [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44];
    const factors = sizes.map(size => getSizeFactor(size));
    
    for (let i = 1; i < factors.length; i++) {
      expect(factors[i]).toBeGreaterThan(factors[i - 1]);
    }
  });

  it('should work correctly with real-world scenarios', () => {
    // Common blouse sizes
    const size32 = getSizeFactor(32); // Small
    const size36 = getSizeFactor(36); // Medium
    const size40 = getSizeFactor(40); // Large
    
    expect(size32).toBe(1.056);
    expect(size36).toBe(1.112);
    expect(size40).toBe(1.168);
    
    // Size differences should be reasonable
    expect(size36 - size32).toBeCloseTo(0.056, 3);
    expect(size40 - size36).toBeCloseTo(0.056, 3);
  });
});

describe('README specification compliance', () => {
  it('should match all values from CALCULATION_README.md', () => {
    const specifiedSizes = {
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

    Object.entries(specifiedSizes).forEach(([size, expectedFactor]) => {
      const actualFactor = getSizeFactor(Number(size));
      expect(actualFactor).toBe(expectedFactor);
    });
  });

  it('should interpolate between specified values as documented', () => {
    // Documentation states: "if middle no of those values its those values average"
    const size29 = getSizeFactor(29);
    const expected29 = (1 + 1.028) / 2;
    expect(size29).toBe(expected29);

    const size35 = getSizeFactor(35);
    const expected35 = (1.084 + 1.112) / 2;
    expect(size35).toBe(expected35);
  });
});

