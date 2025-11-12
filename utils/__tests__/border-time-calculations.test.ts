import { calculateFrontTopBorder, calculateBackTopBorder, calculateBottomBorder } from '../border-motif-calculations';
import { getSizeFactor } from '../size-factor';
import { calculateBorderTime } from '@/server/calculations/time-calculations';
import { calculateWeightedTime } from '@/server/calculations/time-calculations';

describe('Border Value Calculations', () => {
  describe('Front Top Border', () => {
    it('should calculate boat neck front top border for chest size 36', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      const borderThickness = 2;
      
      // Calculation:
      // Neck Type Value for boat = 11 (from neck-type-values.ts)
      // Size Factor for 36 = 1.112 (from size-factor.ts)
      // Formula: 11 × 1.112 × 2
      const expected = 11 * 1.112 * 2; // = 24.464
      
      const result = calculateFrontTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate deep neck front top border for chest size 32', () => {
      // Given
      const neckStyle = 'deep';
      const chestSize = 32;
      const borderThickness = 1.5;
      
      // Calculation:
      // Neck Type Value for deep = 2
      // Size Factor for 32 = 1.056
      // Formula: 2 × 1.056 × 1.5
      const expected = 2 * 1.056 * 1.5; // = 3.168
      
      const result = calculateFrontTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate style 1 (Madubala neck) for chest size 40', () => {
      // Given
      const neckStyle = '1';
      const chestSize = 40;
      const borderThickness = 2.5;
      
      // Calculation:
      // Neck Type Value for style 1 = 3.8
      // Size Factor for 40 = 1.168
      // Formula: 3.8 × 1.168 × 2.5
      const expected = 3.8 * 1.168 * 2.5; // = 11.096
      
      const result = calculateFrontTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate style 3 (Bridal neck - formula based) for chest size 36', () => {
      // Given
      const neckStyle = '3';
      const chestSize = 36;
      const borderThickness = 2;
      
      // Calculation:
      // Neck Type Value formula: (2/5) × ((chestSize × 7) - 56)
      // For chest 36: (2/5) × ((36 × 7) - 56) = (2/5) × (252 - 56) = (2/5) × 196 = 78.4
      // Size Factor for 36 = 1.112
      // Formula: 78.4 × 1.112 × 2
      const neckTypeValue = (2/5) * ((chestSize * 7) - 56); // = 78.4
      const sizeFactor = 1.112;
      const expected = neckTypeValue * sizeFactor * borderThickness; // = 174.3616
      
      const result = calculateFrontTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBeCloseTo(expected, 4);
    });

    it('should calculate with different border thickness values', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      
      // Test 1: Thin border
      const thickness1 = 1;
      const expected1 = 11 * 1.112 * 1; // = 12.232
      const result1 = calculateFrontTopBorder(neckStyle, chestSize, thickness1);
      expect(result1.result).toBe(expected1);
      
      // Test 2: Medium border
      const thickness2 = 2;
      const expected2 = 11 * 1.112 * 2; // = 24.464
      const result2 = calculateFrontTopBorder(neckStyle, chestSize, thickness2);
      expect(result2.result).toBe(expected2);
      
      // Test 3: Thick border
      const thickness3 = 3;
      const expected3 = 11 * 1.112 * 3; // = 36.696
      const result3 = calculateFrontTopBorder(neckStyle, chestSize, thickness3);
      expect(result3.result).toBe(expected3);
    });
  });

  describe('Back Top Border', () => {
    it('should calculate boat neck back top border for chest size 36', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      const borderThickness = 2;
      
      // Calculation:
      // Back Neck Type Value for boat = 11 (same as front)
      // Size Factor for 36 = 1.112
      // Formula: 11 × 1.112 × 2
      const expected = 11 * 1.112 * 2; // = 24.464
      
      const result = calculateBackTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate style 2 back border for chest size 28', () => {
      // Given
      const neckStyle = '2';
      const chestSize = 28;
      const borderThickness = 1.5;
      
      // Calculation:
      // Back Neck Type Value for style 2 = 2.7
      // Size Factor for 28 = 1.0
      // Formula: 2.7 × 1.0 × 1.5
      const expected = 2.7 * 1.0 * 1.5; // = 4.05
      
      const result = calculateBackTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate style 5 (formula based) for chest size 44', () => {
      // Given
      const neckStyle = '5';
      const chestSize = 44;
      const borderThickness = 2;
      
      // Calculation:
      // Neck Type Value formula: 0.55 × ((chestSize × 7) - 10)
      // For chest 44: 0.55 × ((44 × 7) - 10) = 0.55 × (308 - 10) = 0.55 × 298 = 163.9
      // Size Factor for 44 = 1.224
      // Formula: 163.9 × 1.224 × 2
      const neckTypeValue = 0.55 * ((chestSize * 7) - 10); // = 163.9
      const sizeFactor = 1.224;
      const expected = neckTypeValue * sizeFactor * borderThickness; // = 401.2176
      
      const result = calculateBackTopBorder(neckStyle, chestSize, borderThickness);
      
      expect(result.result).toBeCloseTo(expected, 4);
    });

    it('should handle small and large chest sizes differently', () => {
      const neckStyle = 'deep';
      const borderThickness = 2;
      
      // Small size
      const chestSize28 = 28;
      const sizeFactor28 = 1.0;
      const neckValue = 2;
      const expected28 = neckValue * sizeFactor28 * borderThickness; // = 4.0
      const result28 = calculateBackTopBorder(neckStyle, chestSize28, borderThickness);
      expect(result28.result).toBe(expected28);
      
      // Large size
      const chestSize44 = 44;
      const sizeFactor44 = 1.224;
      const expected44 = neckValue * sizeFactor44 * borderThickness; // = 4.896
      const result44 = calculateBackTopBorder(neckStyle, chestSize44, borderThickness);
      expect(result44.result).toBe(expected44);
    });
  });

  describe('Bottom Border', () => {
    it('should calculate bottom border for chest size 36', () => {
      // Given
      const chestSize = 36;
      const bottomBorderThickness = 1.5;
      
      // Calculation:
      // Formula: (chestSize / 2) × thickness
      // (36 / 2) × 1.5 = 18 × 1.5
      const expected = (chestSize / 2) * bottomBorderThickness; // = 27
      
      const result = calculateBottomBorder(chestSize, bottomBorderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate bottom border for chest size 32', () => {
      // Given
      const chestSize = 32;
      const bottomBorderThickness = 2;
      
      // Calculation:
      // (32 / 2) × 2 = 16 × 2
      const expected = (chestSize / 2) * bottomBorderThickness; // = 32
      
      const result = calculateBottomBorder(chestSize, bottomBorderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate bottom border for chest size 44 with thin border', () => {
      // Given
      const chestSize = 44;
      const bottomBorderThickness = 0.5;
      
      // Calculation:
      // (44 / 2) × 0.5 = 22 × 0.5
      const expected = (chestSize / 2) * bottomBorderThickness; // = 11
      
      const result = calculateBottomBorder(chestSize, bottomBorderThickness);
      
      expect(result.result).toBe(expected);
    });

    it('should handle various thickness values', () => {
      const chestSize = 36;
      
      // Thin
      const thickness1 = 1;
      const expected1 = (36 / 2) * 1; // = 18
      expect(calculateBottomBorder(chestSize, thickness1).result).toBe(expected1);
      
      // Medium
      const thickness2 = 2;
      const expected2 = (36 / 2) * 2; // = 36
      expect(calculateBottomBorder(chestSize, thickness2).result).toBe(expected2);
      
      // Thick
      const thickness3 = 3;
      const expected3 = (36 / 2) * 3; // = 54
      expect(calculateBottomBorder(chestSize, thickness3).result).toBe(expected3);
    });
  });

  describe('Combined Border Values (Top + Bottom)', () => {
    it('should calculate total border value for front with both top and bottom', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      const topThickness = 2;
      const bottomThickness = 1.5;
      
      // Calculation:
      // Top Border: 11 × 1.112 × 2 = 24.464
      // Bottom Border: (36 / 2) × 1.5 = 18 × 1.5 = 27
      // Total: 24.464 + 27
      const topBorder = 11 * 1.112 * topThickness; // = 24.464
      const bottomBorder = (chestSize / 2) * bottomThickness; // = 27
      const expectedTotal = topBorder + bottomBorder; // = 51.464
      
      const topResult = calculateFrontTopBorder(neckStyle, chestSize, topThickness);
      const bottomResult = calculateBottomBorder(chestSize, bottomThickness);
      const totalBorderValue = topResult.result + bottomResult.result;
      
      expect(totalBorderValue).toBe(expectedTotal);
    });

    it('should calculate total for back with formula-based neck and bottom', () => {
      // Given
      const neckStyle = '5'; // Formula based
      const chestSize = 40;
      const topThickness = 2;
      const bottomThickness = 2;
      
      // Calculation:
      // Neck Type Value: 0.55 × ((40 × 7) - 10) = 0.55 × (280 - 10) = 0.55 × 270 = 148.5
      // Size Factor for 40: 1.168
      // Top Border: 148.5 × 1.168 × 2 = 346.896
      // Bottom Border: (40 / 2) × 2 = 20 × 2 = 40
      // Total: 346.896 + 40
      const neckTypeValue = 0.55 * ((chestSize * 7) - 10); // = 148.5
      const sizeFactor = getSizeFactor(chestSize); // = 1.168
      const topBorder = neckTypeValue * sizeFactor * topThickness; // = 346.896
      const bottomBorder = (chestSize / 2) * bottomThickness; // = 40
      const expectedTotal = topBorder + bottomBorder; // = 386.896
      
      const topResult = calculateBackTopBorder(neckStyle, chestSize, topThickness);
      const bottomResult = calculateBottomBorder(chestSize, bottomThickness);
      const totalBorderValue = topResult.result + bottomResult.result;
      
      expect(totalBorderValue).toBeCloseTo(expectedTotal, 3);
    });
  });
});

describe('Border Time Calculations', () => {
  describe('Basic Border Time', () => {
    it('should calculate border time with single technique', () => {
      // Given
      const hasBorders = true;
      const borderValue = 50; // inches (could be top + bottom)
      const coverage = 80; // percent
      const techniques = ['Challa work'];
      const techniquePercentages = { 'Challa work': 100 };
      
      // Calculation:
      // Weighted Time: 100% Challa work = 12 min/unit
      // Coverage: 80% = 0.8
      // Formula: 50 × 0.8 × 12
      const weightedTime = 12; // Challa work time
      const expected = borderValue * (coverage / 100) * weightedTime; // = 50 × 0.8 × 12 = 480
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateBorderTime(hasBorders, borderValue, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });

    it('should calculate border time with multiple techniques', () => {
      // Given
      const hasBorders = true;
      const borderValue = 30;
      const coverage = 100; // Full coverage
      const techniques = ['Challa work', 'Thread roses'];
      const techniquePercentages = { 
        'Challa work': 60, 
        'Thread roses': 40 
      };
      
      // Calculation:
      // Weighted Time: (12 × 0.6) + (30 × 0.4) = 7.2 + 12 = 19.2 min/unit
      // Coverage: 100% = 1.0
      // Formula: 30 × 1.0 × 19.2
      const challaTime = 12 * 0.6; // = 7.2
      const threadRosesTime = 30 * 0.4; // = 12
      const weightedTime = challaTime + threadRosesTime; // = 19.2
      const expected = borderValue * (coverage / 100) * weightedTime; // = 30 × 1.0 × 19.2 = 576
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateBorderTime(hasBorders, borderValue, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });

    it('should calculate with partial coverage (50%)', () => {
      // Given
      const hasBorders = true;
      const borderValue = 40;
      const coverage = 50;
      const techniques = ['Thread filling'];
      const techniquePercentages = { 'Thread filling': 100 };
      
      // Calculation:
      // Weighted Time: 100% Thread filling = 8.5 min/unit
      // Coverage: 50% = 0.5
      // Formula: 40 × 0.5 × 8.5
      const weightedTime = 8.5;
      const expected = borderValue * (coverage / 100) * weightedTime; // = 40 × 0.5 × 8.5 = 170
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateBorderTime(hasBorders, borderValue, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });
  });

  describe('Realistic Border Time Scenarios', () => {
    it('should calculate front border time with boat neck, chest 36', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      const topThickness = 2;
      const hasBottom = true;
      const bottomThickness = 1.5;
      const coverage = 80;
      const techniques = ['Challa work', 'Zardosi chain'];
      const techniquePercentages = { 
        'Challa work': 70,
        'Zardosi chain': 30
      };
      
      // Step 1: Calculate border value
      // Top Border: 11 × 1.112 × 2 = 24.464
      // Bottom Border: (36 / 2) × 1.5 = 18 × 1.5 = 27
      // Total Border Value: 24.464 + 27 = 51.464
      const topBorderValue = 11 * 1.112 * topThickness; // = 24.464
      const bottomBorderValue = (chestSize / 2) * bottomThickness; // = 27
      const totalBorderValue = topBorderValue + bottomBorderValue; // = 51.464
      
      // Step 2: Calculate weighted time
      // Challa work: 12 × 0.7 = 8.4
      // Zardosi chain: 14 × 0.3 = 4.2
      // Weighted Time: 8.4 + 4.2 = 12.6 min/unit
      const challaTime = 12 * 0.7; // = 8.4
      const zardosiChainTime = 14 * 0.3; // = 4.2
      const weightedTime = challaTime + zardosiChainTime; // = 12.6
      
      // Step 3: Calculate border time
      // Formula: 51.464 × 0.8 × 12.6
      const expected = totalBorderValue * (coverage / 100) * weightedTime; // = 51.464 × 0.8 × 12.6 = 518.711424
      
      const topResult = calculateFrontTopBorder(neckStyle, chestSize, topThickness);
      const bottomResult = calculateBottomBorder(chestSize, bottomThickness);
      const borderValue = topResult.result + bottomResult.result;
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateBorderTime(true, borderValue, coverage, calculatedWeightedTime);
      
      expect(result).toBeCloseTo(expected, 2);
    });

    it('should calculate back border time with style 5 (formula), chest 40', () => {
      // Given
      const neckStyle = '5';
      const chestSize = 40;
      const topThickness = 2;
      const hasBottom = false; // No bottom border
      const coverage = 90;
      const techniques = ['Thread roses', 'Mirror / Zarkans'];
      const techniquePercentages = {
        'Thread roses': 50,
        'Mirror / Zarkans': 50
      };
      
      // Step 1: Calculate border value (top only)
      // Neck Type Value: 0.55 × ((40 × 7) - 10) = 0.55 × 270 = 148.5
      // Size Factor: 1.168
      // Top Border: 148.5 × 1.168 × 2 = 346.896
      const neckTypeValue = 0.55 * ((chestSize * 7) - 10); // = 148.5
      const sizeFactor = getSizeFactor(chestSize); // = 1.168
      const borderValue = neckTypeValue * sizeFactor * topThickness; // = 346.896
      
      // Step 2: Calculate weighted time
      // Thread roses: 30 × 0.5 = 15
      // Mirror: 7 × 0.5 = 3.5
      // Weighted Time: 15 + 3.5 = 18.5 min/unit
      const threadRosesTime = 30 * 0.5; // = 15
      const mirrorTime = 7 * 0.5; // = 3.5
      const weightedTime = threadRosesTime + mirrorTime; // = 18.5
      
      // Step 3: Calculate border time
      // Formula: 346.896 × 0.9 × 18.5
      const expected = borderValue * (coverage / 100) * weightedTime; // = 346.896 × 0.9 × 18.5 = 5776.6992
      
      const topResult = calculateBackTopBorder(neckStyle, chestSize, topThickness);
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateBorderTime(true, topResult.result, coverage, calculatedWeightedTime);
      
      expect(result).toBeCloseTo(expected, 2);
    });

    it('should calculate with three techniques mixed', () => {
      // Given
      const borderValue = 45;
      const coverage = 70;
      const techniques = ['Challa work', 'Thread filling', 'Sugar bead'];
      const techniquePercentages = {
        'Challa work': 50,
        'Thread filling': 30,
        'Sugar bead': 20
      };
      
      // Calculation:
      // Weighted Time:
      //   Challa: 12 × 0.5 = 6.0
      //   Thread filling: 8.5 × 0.3 = 2.55
      //   Sugar bead: 7.5 × 0.2 = 1.5
      //   Total: 6.0 + 2.55 + 1.5 = 10.05 min/unit
      // Coverage: 70% = 0.7
      // Formula: 45 × 0.7 × 10.05
      const challaTime = 12 * 0.5; // = 6.0
      const threadTime = 8.5 * 0.3; // = 2.55
      const sugarBeadTime = 7.5 * 0.2; // = 1.5
      const weightedTime = challaTime + threadTime + sugarBeadTime; // = 10.05
      const expected = borderValue * (coverage / 100) * weightedTime; // = 45 × 0.7 × 10.05 = 316.575
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateBorderTime(true, borderValue, coverage, calculatedWeightedTime);
      
      expect(result).toBeCloseTo(expected, 2);
    });
  });

  describe('Different Coverage Levels', () => {
    it('should compare 50%, 80%, and 100% coverage', () => {
      const borderValue = 60;
      const techniques = ['Challa work'];
      const techniquePercentages = { 'Challa work': 100 };
      const weightedTime = 12; // Challa work
      
      // 50% coverage
      // Formula: 60 × 0.5 × 12 = 360
      const expected50 = borderValue * 0.5 * weightedTime; // = 360
      const result50 = calculateBorderTime(true, borderValue, 50, weightedTime);
      expect(result50).toBe(expected50);
      
      // 80% coverage
      // Formula: 60 × 0.8 × 12 = 576
      const expected80 = borderValue * 0.8 * weightedTime; // = 576
      const result80 = calculateBorderTime(true, borderValue, 80, weightedTime);
      expect(result80).toBe(expected80);
      
      // 100% coverage
      // Formula: 60 × 1.0 × 12 = 720
      const expected100 = borderValue * 1.0 * weightedTime; // = 720
      const result100 = calculateBorderTime(true, borderValue, 100, weightedTime);
      expect(result100).toBe(expected100);
      
      // Verify proportions
      // 80% should be 1.6× of 50%
      expect(result80).toBe(result50 * 1.6);
      // 100% should be 2× of 50%
      expect(result100).toBe(result50 * 2);
    });
  });

  describe('Edge Cases', () => {
    it('should return 0 when borders disabled', () => {
      const result = calculateBorderTime(false, 50, 80, 12);
      expect(result).toBe(0);
    });

    it('should return 0 when border value is 0', () => {
      const result = calculateBorderTime(true, 0, 80, 12);
      expect(result).toBe(0);
    });

    it('should handle zero coverage', () => {
      // Formula: 50 × 0.0 × 12 = 0
      const expected = 50 * 0 * 12; // = 0
      const result = calculateBorderTime(true, 50, 0, 12);
      expect(result).toBe(expected);
    });

    it('should handle very small border values', () => {
      const borderValue = 0.5;
      const coverage = 100;
      const weightedTime = 12;
      
      // Formula: 0.5 × 1.0 × 12 = 6
      const expected = borderValue * 1.0 * weightedTime; // = 6
      const result = calculateBorderTime(true, borderValue, coverage, weightedTime);
      expect(result).toBe(expected);
    });

    it('should handle very large border values', () => {
      const borderValue = 500;
      const coverage = 50;
      const weightedTime = 20;
      
      // Formula: 500 × 0.5 × 20 = 5000
      const expected = borderValue * (coverage / 100) * weightedTime; // = 5000
      const result = calculateBorderTime(true, borderValue, coverage, weightedTime);
      expect(result).toBe(expected);
    });
  });
});

