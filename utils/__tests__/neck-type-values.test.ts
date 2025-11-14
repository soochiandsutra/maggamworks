import { getFrontNeckTypeValue, getBackNeckTypeValue } from '../neck-type-values';

describe('getFrontNeckTypeValue', () => {
  describe('Fixed values (non-formula styles)', () => {
    it('should return correct value for Boat Neck', () => {
      const result = getFrontNeckTypeValue('boat');
      expect(result.name).toBe('Boat Neck');
      expect(result.value).toBe(11);
    });

    it('should return correct value for Deep Neck', () => {
      const result = getFrontNeckTypeValue('deep');
      expect(result.name).toBe('Deep Neck');
      expect(result.value).toBe(22);
    });

    it('should return correct value for Style 1 (Madubala Neck)', () => {
      const result = getFrontNeckTypeValue('1');
      expect(result.name).toBe('Style 1 (Madubala Neck)');
      expect(result.value).toBe(41.8);
    });

    it('should return correct value for Style 2 (Patch Work)', () => {
      const result = getFrontNeckTypeValue('2');
      expect(result.name).toBe('Style 2 (Patch Work)');
      expect(result.value).toBe(33);
    });

    it('should return correct value for Style 4 (V-Neck)', () => {
      const result = getFrontNeckTypeValue('4');
      expect(result.name).toBe('Style 4 (V-Neck)');
      expect(result.value).toBe(16.5);
    });

    it('should return Not Selected for unknown style', () => {
      const result = getFrontNeckTypeValue('unknown');
      expect(result.name).toBe('Not Selected');
      expect(result.value).toBe(0);
    });

    it('should return Not Selected for empty string', () => {
      const result = getFrontNeckTypeValue('');
      expect(result.name).toBe('Not Selected');
      expect(result.value).toBe(0);
    });
  });

  describe('Style 3 (Bridal Neck) - Formula based calculation', () => {
    it('should calculate correctly for chest size 36', () => {
      // Formula: (2/5) * ((36 * 7) - 56) = (2/5) * (252 - 56) = (2/5) * 196 = 78.4
      const result = getFrontNeckTypeValue('3', 36);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(78.4, 2);
    });

    it('should calculate correctly for chest size 28', () => {
      // Formula: (2/5) * ((28 * 7) - 56) = (2/5) * (196 - 56) = (2/5) * 140 = 56
      const result = getFrontNeckTypeValue('3', 28);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(56, 2);
    });

    it('should calculate correctly for chest size 32', () => {
      // Formula: (2/5) * ((32 * 7) - 56) = (2/5) * (224 - 56) = (2/5) * 168 = 67.2
      const result = getFrontNeckTypeValue('3', 32);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(67.2, 2);
    });

    it('should calculate correctly for chest size 40', () => {
      // Formula: (2/5) * ((40 * 7) - 56) = (2/5) * (280 - 56) = (2/5) * 224 = 89.6
      const result = getFrontNeckTypeValue('3', 40);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(89.6, 2);
    });

    it('should calculate correctly for chest size 44', () => {
      // Formula: (2/5) * ((44 * 7) - 56) = (2/5) * (308 - 56) = (2/5) * 252 = 100.8
      const result = getFrontNeckTypeValue('3', 44);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(100.8, 2);
    });

    it('should return fallback value 0 when chest size is not provided', () => {
      const result = getFrontNeckTypeValue('3');
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBe(0);
    });

    it('should return fallback value 0 when chest size is undefined', () => {
      const result = getFrontNeckTypeValue('3', undefined);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBe(0);
    });

    it('should handle decimal chest sizes', () => {
      // Formula: (2/5) * ((36.5 * 7) - 56) = (2/5) * (255.5 - 56) = (2/5) * 199.5 = 79.8
      const result = getFrontNeckTypeValue('3', 36.5);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(79.8, 2);
    });
  });

  describe('Edge cases', () => {
    it('should handle chest size 0 for Style 3', () => {
      // Formula: (2/5) * ((0 * 7) - 56) = (2/5) * (-56) = -22.4
      const result = getFrontNeckTypeValue('3', 0);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(-22.4, 2);
    });

    it('should handle very large chest size for Style 3', () => {
      // Formula: (2/5) * ((100 * 7) - 56) = (2/5) * (700 - 56) = (2/5) * 644 = 257.6
      const result = getFrontNeckTypeValue('3', 100);
      expect(result.name).toBe('Style 3 (Bridal Neck)');
      expect(result.value).toBeCloseTo(257.6, 2);
    });

    it('should not use formula for other styles even if chest size is provided', () => {
      const result = getFrontNeckTypeValue('1', 36);
      expect(result.value).toBe(41.8); // Should be fixed value, not calculated
    });
  });
});

describe('getBackNeckTypeValue', () => {
  describe('Fixed values (non-formula styles)', () => {
    it('should return correct value for Boat Neck', () => {
      const result = getBackNeckTypeValue('boat');
      expect(result.name).toBe('Boat Neck');
      expect(result.value).toBe(11);
    });

    it('should return correct value for Deep Neck', () => {
      const result = getBackNeckTypeValue('deep');
      expect(result.name).toBe('Deep Neck');
      expect(result.value).toBe(22);
    });

    it('should return correct value for Style 1', () => {
      const result = getBackNeckTypeValue('1');
      expect(result.name).toBe('Style 1');
      expect(result.value).toBe(22);
    });

    it('should return correct value for Style 2', () => {
      const result = getBackNeckTypeValue('2');
      expect(result.name).toBe('Style 2');
      expect(result.value).toBe(29.7);
    });

    it('should return correct value for Style 3', () => {
      const result = getBackNeckTypeValue('3');
      expect(result.name).toBe('Style 3');
      expect(result.value).toBe(40.7);
    });

    it('should return correct value for Style 4', () => {
      const result = getBackNeckTypeValue('4');
      expect(result.name).toBe('Style 4');
      expect(result.value).toBe(22);
    });

    it('should return correct value for Style 6', () => {
      const result = getBackNeckTypeValue('6');
      expect(result.name).toBe('Style 6');
      expect(result.value).toBe(15.4);
    });

    it('should return Not Selected for unknown style', () => {
      const result = getBackNeckTypeValue('unknown');
      expect(result.name).toBe('Not Selected');
      expect(result.value).toBe(0);
    });
  });

  describe('Style 5 - Formula based calculation', () => {
    it('should calculate correctly for chest size 36', () => {
      // Formula: 0.55 * ((36 * 7) - 10) = 0.55 * (252 - 10) = 0.55 * 242 = 133.1
      const result = getBackNeckTypeValue('5', 36);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(133.1, 2);
    });

    it('should calculate correctly for chest size 28', () => {
      // Formula: 0.55 * ((28 * 7) - 10) = 0.55 * (196 - 10) = 0.55 * 186 = 102.3
      const result = getBackNeckTypeValue('5', 28);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(102.3, 2);
    });

    it('should calculate correctly for chest size 32', () => {
      // Formula: 0.55 * ((32 * 7) - 10) = 0.55 * (224 - 10) = 0.55 * 214 = 117.7
      const result = getBackNeckTypeValue('5', 32);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(117.7, 2);
    });

    it('should calculate correctly for chest size 40', () => {
      // Formula: 0.55 * ((40 * 7) - 10) = 0.55 * (280 - 10) = 0.55 * 270 = 148.5
      const result = getBackNeckTypeValue('5', 40);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(148.5, 2);
    });

    it('should calculate correctly for chest size 44', () => {
      // Formula: 0.55 * ((44 * 7) - 10) = 0.55 * (308 - 10) = 0.55 * 298 = 163.9
      const result = getBackNeckTypeValue('5', 44);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(163.9, 2);
    });

    it('should return fallback value 0 when chest size is not provided', () => {
      const result = getBackNeckTypeValue('5');
      expect(result.name).toBe('Style 5');
      expect(result.value).toBe(0);
    });

    it('should return fallback value 0 when chest size is undefined', () => {
      const result = getBackNeckTypeValue('5', undefined);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBe(0);
    });

    it('should handle decimal chest sizes', () => {
      // Formula: 0.55 * ((36.5 * 7) - 10) = 0.55 * (255.5 - 10) = 0.55 * 245.5 = 135.025
      const result = getBackNeckTypeValue('5', 36.5);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(135.025, 2);
    });
  });

  describe('Edge cases', () => {
    it('should handle chest size 0 for Style 5', () => {
      // Formula: 0.55 * ((0 * 7) - 10) = 0.55 * (-10) = -5.5
      const result = getBackNeckTypeValue('5', 0);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(-5.5, 2);
    });

    it('should handle very large chest size for Style 5', () => {
      // Formula: 0.55 * ((100 * 7) - 10) = 0.55 * (700 - 10) = 0.55 * 690 = 379.5
      const result = getBackNeckTypeValue('5', 100);
      expect(result.name).toBe('Style 5');
      expect(result.value).toBeCloseTo(379.5, 2);
    });

    it('should not use formula for other styles even if chest size is provided', () => {
      const result = getBackNeckTypeValue('2', 36);
      expect(result.value).toBe(29.7); // Should be fixed value, not calculated
    });
  });
});

describe('Formula accuracy verification', () => {
  it('Front Style 3 formula matches README specification', () => {
    // README: 2/5 * ((chestsize * 7) - 56)
    const chestSize = 36;
    const expected = (2 / 5) * ((chestSize * 7) - 56);
    const result = getFrontNeckTypeValue('3', chestSize);
    expect(result.value).toBe(expected);
  });

  it('Back Style 5 formula matches README specification', () => {
    // README: 0.55 * ((chestsize * 7) - 10)
    const chestSize = 36;
    const expected = 0.55 * ((chestSize * 7) - 10);
    const result = getBackNeckTypeValue('5', chestSize);
    expect(result.value).toBe(expected);
  });
});

