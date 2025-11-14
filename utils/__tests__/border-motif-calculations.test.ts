import {
  calculateFrontTopBorder,
  calculateBackTopBorder,
  calculateBottomBorder,
} from '../border-motif-calculations';

describe('calculateFrontTopBorder', () => {
  describe('Fixed neck styles', () => {
    it('should calculate correctly for Boat Neck', () => {
      // Neck Type Value: 11, Size Factor for 36: 1.112, Border Thickness: 2
      // Expected: 11 * 1.112 * 2 = 24.464
      const result = calculateFrontTopBorder('boat', 36, 2);
      
      expect(result.formula).toBe('Neck Type Value × Size Factor × Border Thickness');
      expect(result.inputs['Neck Type Value']).toBe(11);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBeCloseTo(24.464, 2);
    });

    it('should calculate correctly for Deep Neck', () => {
      // Neck Type Value: 22, Size Factor for 32: 1.056, Border Thickness: 1.5
      // Expected: 22 * 1.056 * 1.5 = 34.848
      const result = calculateFrontTopBorder('deep', 32, 1.5);
      
      expect(result.inputs['Neck Type Value']).toBe(22);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.056, 3);
      expect(result.inputs['Border Thickness']).toBe(1.5);
      expect(result.result).toBeCloseTo(34.848, 2);
    });

    it('should calculate correctly for Style 1 (Madubala Neck)', () => {
      // Neck Type Value: 41.8, Size Factor for 28: 1, Border Thickness: 1
      // Expected: 41.8 * 1 * 1 = 41.8
      const result = calculateFrontTopBorder('1', 28, 1);
      
      expect(result.inputs['Neck Type Value']).toBe(41.8);
      expect(result.inputs['Size Factor']).toBe(1);
      expect(result.inputs['Border Thickness']).toBe(1);
      expect(result.result).toBe(41.8);
    });

    it('should calculate correctly for Style 2 (Patch Work)', () => {
      // Neck Type Value: 33, Size Factor for 40: 1.168, Border Thickness: 2.5
      // Expected: 33 * 1.168 * 2.5 = 96.36
      const result = calculateFrontTopBorder('2', 40, 2.5);
      
      expect(result.inputs['Neck Type Value']).toBe(33);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.168, 3);
      expect(result.inputs['Border Thickness']).toBe(2.5);
      expect(result.result).toBeCloseTo(96.36, 2);
    });

    it('should calculate correctly for Style 4 (V-Neck)', () => {
      // Neck Type Value: 16.5, Size Factor for 44: 1.224, Border Thickness: 3
      // Expected: 16.5 * 1.224 * 3 = 60.588
      const result = calculateFrontTopBorder('4', 44, 3);
      
      expect(result.inputs['Neck Type Value']).toBe(16.5);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.224, 3);
      expect(result.inputs['Border Thickness']).toBe(3);
      expect(result.result).toBeCloseTo(60.588, 2);
    });
  });

  describe('Style 3 (Bridal Neck) - Formula based', () => {
    it('should calculate correctly with chest size 36', () => {
      // Neck Type Value: (2/5) * ((36 * 7) - 56) = 78.4
      // Size Factor for 36: 1.112
      // Border Thickness: 2
      // Expected: 78.4 * 1.112 * 2 = 174.3616
      const result = calculateFrontTopBorder('3', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBeCloseTo(78.4, 2);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBeCloseTo(174.3616, 2);
    });

    it('should calculate correctly with chest size 28', () => {
      // Neck Type Value: (2/5) * ((28 * 7) - 56) = 56
      // Size Factor for 28: 1
      // Border Thickness: 1.5
      // Expected: 56 * 1 * 1.5 = 84
      const result = calculateFrontTopBorder('3', 28, 1.5);
      
      expect(result.inputs['Neck Type Value']).toBeCloseTo(56, 2);
      expect(result.inputs['Size Factor']).toBe(1);
      expect(result.inputs['Border Thickness']).toBe(1.5);
      expect(result.result).toBeCloseTo(84, 2);
    });

    it('should calculate correctly with chest size 40', () => {
      // Neck Type Value: (2/5) * ((40 * 7) - 56) = 89.6
      // Size Factor for 40: 1.168
      // Border Thickness: 2
      // Expected: 89.6 * 1.168 * 2 = 209.2736
      const result = calculateFrontTopBorder('3', 40, 2);
      
      expect(result.inputs['Neck Type Value']).toBeCloseTo(89.6, 2);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.168, 3);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBeCloseTo(209.2736, 1);
    });

    it('should handle different border thicknesses', () => {
      const result1 = calculateFrontTopBorder('3', 36, 1);
      const result2 = calculateFrontTopBorder('3', 36, 2);
      const result3 = calculateFrontTopBorder('3', 36, 3);
      
      expect(result2.result).toBeCloseTo(result1.result * 2, 2);
      expect(result3.result).toBeCloseTo(result1.result * 3, 2);
    });
  });

  describe('Edge cases', () => {
    it('should handle zero border thickness', () => {
      const result = calculateFrontTopBorder('boat', 36, 0);
      expect(result.result).toBe(0);
    });

    it('should handle decimal border thickness', () => {
      const result = calculateFrontTopBorder('deep', 32, 1.75);
      expect(result.inputs['Border Thickness']).toBe(1.75);
      expect(result.result).toBeCloseTo(40.656, 2);
    });
  });
});

describe('calculateBackTopBorder', () => {
  describe('Fixed neck styles', () => {
    it('should calculate correctly for Boat Neck', () => {
      const result = calculateBackTopBorder('boat', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBe(11);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBeCloseTo(24.464, 2);
    });

    it('should calculate correctly for Style 1', () => {
      const result = calculateBackTopBorder('1', 32, 1.5);
      
      expect(result.inputs['Neck Type Value']).toBe(22);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.056, 3);
      expect(result.result).toBeCloseTo(34.848, 2);
    });

    it('should calculate correctly for Style 2', () => {
      const result = calculateBackTopBorder('2', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBe(29.7);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.result).toBeCloseTo(66.0528, 2);
    });

    it('should calculate correctly for Style 3', () => {
      const result = calculateBackTopBorder('3', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBe(40.7);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.result).toBeCloseTo(90.5168, 2);
    });

    it('should calculate correctly for Style 4', () => {
      const result = calculateBackTopBorder('4', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBe(22);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.result).toBeCloseTo(48.928, 2);
    });

    it('should calculate correctly for Style 6', () => {
      const result = calculateBackTopBorder('6', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBe(15.4);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.result).toBeCloseTo(34.2496, 2);
    });
  });

  describe('Style 5 - Formula based', () => {
    it('should calculate correctly with chest size 36', () => {
      // Neck Type Value: 0.55 * ((36 * 7) - 10) = 133.1
      // Size Factor for 36: 1.112
      // Border Thickness: 2
      // Expected: 133.1 * 1.112 * 2 = 296.0064
      const result = calculateBackTopBorder('5', 36, 2);
      
      expect(result.inputs['Neck Type Value']).toBeCloseTo(133.1, 2);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.112, 3);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBeCloseTo(296.0064, 1);
    });

    it('should calculate correctly with chest size 28', () => {
      // Neck Type Value: 0.55 * ((28 * 7) - 10) = 102.3
      // Size Factor for 28: 1
      // Border Thickness: 1.5
      // Expected: 102.3 * 1 * 1.5 = 153.45
      const result = calculateBackTopBorder('5', 28, 1.5);
      
      expect(result.inputs['Neck Type Value']).toBeCloseTo(102.3, 2);
      expect(result.inputs['Size Factor']).toBe(1);
      expect(result.inputs['Border Thickness']).toBe(1.5);
      expect(result.result).toBeCloseTo(153.45, 2);
    });

    it('should calculate correctly with chest size 40', () => {
      // Neck Type Value: 0.55 * ((40 * 7) - 10) = 148.5
      // Size Factor for 40: 1.168
      // Border Thickness: 2
      // Expected: 148.5 * 1.168 * 2 = 346.896
      const result = calculateBackTopBorder('5', 40, 2);
      
      expect(result.inputs['Neck Type Value']).toBeCloseTo(148.5, 2);
      expect(result.inputs['Size Factor']).toBeCloseTo(1.168, 3);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBeCloseTo(346.896, 2);
    });

    it('should handle different border thicknesses', () => {
      const result1 = calculateBackTopBorder('5', 36, 1);
      const result2 = calculateBackTopBorder('5', 36, 2);
      const result3 = calculateBackTopBorder('5', 36, 3);
      
      expect(result2.result).toBeCloseTo(result1.result * 2, 2);
      expect(result3.result).toBeCloseTo(result1.result * 3, 2);
    });
  });
});

describe('calculateBottomBorder', () => {
  it('should calculate correctly for chest size 36', () => {
    // Formula: (36 / 2) * 2 = 18 * 2 = 36
    const result = calculateBottomBorder(36, 2);
    
    expect(result.formula).toBe('(Chest Size / 2) × Bottom Border Thickness');
    expect(result.inputs['Chest Size']).toBe(36);
    expect(result.inputs['Bottom Border Thickness']).toBe(2);
    expect(result.result).toBe(36);
  });

  it('should calculate correctly for chest size 28', () => {
    const result = calculateBottomBorder(28, 1.5);
    
    expect(result.inputs['Chest Size']).toBe(28);
    expect(result.inputs['Bottom Border Thickness']).toBe(1.5);
    expect(result.result).toBe(21);
  });

  it('should calculate correctly for chest size 44', () => {
    const result = calculateBottomBorder(44, 3);
    
    expect(result.inputs['Chest Size']).toBe(44);
    expect(result.inputs['Bottom Border Thickness']).toBe(3);
    expect(result.result).toBe(66);
  });

  it('should handle decimal chest sizes', () => {
    const result = calculateBottomBorder(36.5, 2);
    expect(result.result).toBeCloseTo(36.5, 2);
  });

  it('should handle zero thickness', () => {
    const result = calculateBottomBorder(36, 0);
    expect(result.result).toBe(0);
  });
});

describe('Integration tests - Complete border calculations', () => {
  it('should calculate total front borders correctly', () => {
    const chestSize = 36;
    const mainBorderThickness = 2;
    const bottomBorderThickness = 1.5;
    
    const topBorder = calculateFrontTopBorder('3', chestSize, mainBorderThickness);
    const bottomBorder = calculateBottomBorder(chestSize, bottomBorderThickness);
    
    const totalBorder = topBorder.result + bottomBorder.result;
    
    // Top: 78.4 * 1.112 * 2 = 174.3616
    // Bottom: (36 / 2) * 1.5 = 27
    // Total: 201.3616
    expect(totalBorder).toBeCloseTo(201.3616, 2);
  });

  it('should calculate total back borders correctly', () => {
    const chestSize = 36;
    const mainBorderThickness = 2;
    const bottomBorderThickness = 1.5;
    
    const topBorder = calculateBackTopBorder('5', chestSize, mainBorderThickness);
    const bottomBorder = calculateBottomBorder(chestSize, bottomBorderThickness);
    
    const totalBorder = topBorder.result + bottomBorder.result;
    
    // Top: 133.1 * 1.112 * 2 = 296.0064
    // Bottom: (36 / 2) * 1.5 = 27
    // Total: 323.0064
    expect(totalBorder).toBeCloseTo(323.0064, 1);
  });

  it('should produce different results for different chest sizes', () => {
    const result28 = calculateFrontTopBorder('3', 28, 2);
    const result36 = calculateFrontTopBorder('3', 36, 2);
    const result44 = calculateFrontTopBorder('3', 44, 2);
    
    expect(result28.result).toBeLessThan(result36.result);
    expect(result36.result).toBeLessThan(result44.result);
  });
});

