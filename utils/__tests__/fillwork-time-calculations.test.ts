import { calculateFrontFillworkArea, calculateBackFillworkArea, calculateHandsFillworkArea } from '../fillwork-calculations';
import { calculateFillWorkTime, calculateWeightedTime } from '@/server/calculations/time-calculations';

describe('Fillwork Area Calculations', () => {
  describe('Front Fillwork Area', () => {
    it('should calculate boat neck fillwork area for chest size 36', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      
      // Calculation:
      // Formula: (size × 7) - 10
      // (36 × 7) - 10 = 252 - 10 = 242
      const expected = (chestSize * 7) - 10; // = 242
      
      const result = calculateFrontFillworkArea(neckStyle, chestSize);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate deep neck fillwork area for chest size 32', () => {
      // Given
      const neckStyle = 'deep';
      const chestSize = 32;
      
      // Calculation:
      // Formula: (size × 7) - 56
      // (32 × 7) - 56 = 224 - 56 = 168
      const expected = (chestSize * 7) - 56; // = 168
      
      const result = calculateFrontFillworkArea(neckStyle, chestSize);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate boat neck for different chest sizes', () => {
      const neckStyle = 'boat';
      
      // Chest 28
      const size28 = 28;
      const expected28 = (28 * 7) - 10; // = 196 - 10 = 186
      expect(calculateFrontFillworkArea(neckStyle, size28).result).toBe(expected28);
      
      // Chest 36
      const size36 = 36;
      const expected36 = (36 * 7) - 10; // = 252 - 10 = 242
      expect(calculateFrontFillworkArea(neckStyle, size36).result).toBe(expected36);
      
      // Chest 44
      const size44 = 44;
      const expected44 = (44 * 7) - 10; // = 308 - 10 = 298
      expect(calculateFrontFillworkArea(neckStyle, size44).result).toBe(expected44);
    });

    it('should calculate deep neck for different chest sizes', () => {
      const neckStyle = 'deep';
      
      // Chest 28
      const expected28 = (28 * 7) - 56; // = 196 - 56 = 140
      expect(calculateFrontFillworkArea(neckStyle, 28).result).toBe(expected28);
      
      // Chest 40
      const expected40 = (40 * 7) - 56; // = 280 - 56 = 224
      expect(calculateFrontFillworkArea(neckStyle, 40).result).toBe(expected40);
      
      // Chest 44
      const expected44 = (44 * 7) - 56; // = 308 - 56 = 252
      expect(calculateFrontFillworkArea(neckStyle, 44).result).toBe(expected44);
    });

    it('should return 0 for unsupported neck styles', () => {
      const chestSize = 36;
      
      // Style 1
      expect(calculateFrontFillworkArea('1', chestSize).result).toBe(0);
      
      // Style 2
      expect(calculateFrontFillworkArea('2', chestSize).result).toBe(0);
      
      // Style 3
      expect(calculateFrontFillworkArea('3', chestSize).result).toBe(0);
      
      // Style 4
      expect(calculateFrontFillworkArea('4', chestSize).result).toBe(0);
    });

    it('should show boat neck has more area than deep neck', () => {
      const chestSize = 36;
      
      // Boat: 242 sq.in
      const boatArea = (36 * 7) - 10; // = 242
      const boatResult = calculateFrontFillworkArea('boat', chestSize);
      expect(boatResult.result).toBe(boatArea);
      
      // Deep: 196 sq.in
      const deepArea = (36 * 7) - 56; // = 196
      const deepResult = calculateFrontFillworkArea('deep', chestSize);
      expect(deepResult.result).toBe(deepArea);
      
      // Boat should have more area (smaller opening)
      // Difference: 242 - 196 = 46 sq.in more
      expect(boatResult.result).toBeGreaterThan(deepResult.result);
      expect(boatResult.result - deepResult.result).toBe(46);
    });
  });

  describe('Back Fillwork Area', () => {
    it('should calculate boat neck fillwork area for chest size 36', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      
      // Calculation:
      // Formula: (size × 7) - 10 (same as front)
      // (36 × 7) - 10 = 252 - 10 = 242
      const expected = (chestSize * 7) - 10; // = 242
      
      const result = calculateBackFillworkArea(neckStyle, chestSize);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate deep neck fillwork area for chest size 32', () => {
      // Given
      const neckStyle = 'deep';
      const chestSize = 32;
      
      // Calculation:
      // Formula: (size × 7) - 70 (different from front!)
      // (32 × 7) - 70 = 224 - 70 = 154
      const expected = (chestSize * 7) - 70; // = 154
      
      const result = calculateBackFillworkArea(neckStyle, chestSize);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate style 3 fillwork area for chest size 40', () => {
      // Given
      const neckStyle = '3';
      const chestSize = 40;
      
      // Calculation:
      // Formula: (size × 7) - 50
      // (40 × 7) - 50 = 280 - 50 = 230
      const expected = (chestSize * 7) - 50; // = 230
      
      const result = calculateBackFillworkArea(neckStyle, chestSize);
      
      expect(result.result).toBe(expected);
    });

    it('should compare boat, deep, and style 3 for chest 36', () => {
      const chestSize = 36;
      const baseArea = chestSize * 7; // = 252
      
      // Boat: -10
      const boatArea = baseArea - 10; // = 242
      expect(calculateBackFillworkArea('boat', chestSize).result).toBe(boatArea);
      
      // Style 3: -50
      const style3Area = baseArea - 50; // = 202
      expect(calculateBackFillworkArea('3', chestSize).result).toBe(style3Area);
      
      // Deep: -70
      const deepArea = baseArea - 70; // = 182
      expect(calculateBackFillworkArea('deep', chestSize).result).toBe(deepArea);
      
      // Order: Boat > Style 3 > Deep
      expect(boatArea).toBeGreaterThan(style3Area);
      expect(style3Area).toBeGreaterThan(deepArea);
    });

    it('should return 0 for unsupported back styles', () => {
      const chestSize = 36;
      
      // Style 1
      expect(calculateBackFillworkArea('1', chestSize).result).toBe(0);
      
      // Style 2
      expect(calculateBackFillworkArea('2', chestSize).result).toBe(0);
      
      // Style 4
      expect(calculateBackFillworkArea('4', chestSize).result).toBe(0);
      
      // Style 5
      expect(calculateBackFillworkArea('5', chestSize).result).toBe(0);
      
      // Style 6
      expect(calculateBackFillworkArea('6', chestSize).result).toBe(0);
    });

    it('should show back deep neck has less area than front deep neck', () => {
      const chestSize = 36;
      
      // Front deep: (36 × 7) - 56 = 196
      const frontArea = (36 * 7) - 56; // = 196
      const frontResult = calculateFrontFillworkArea('deep', chestSize);
      expect(frontResult.result).toBe(frontArea);
      
      // Back deep: (36 × 7) - 70 = 182
      const backArea = (36 * 7) - 70; // = 182
      const backResult = calculateBackFillworkArea('deep', chestSize);
      expect(backResult.result).toBe(backArea);
      
      // Back should have less area (larger opening)
      // Difference: 196 - 182 = 14 sq.in less
      expect(frontResult.result).toBeGreaterThan(backResult.result);
      expect(frontResult.result - backResult.result).toBe(14);
    });
  });

  describe('Hands Fillwork Area', () => {
    it('should calculate hands fillwork area with typical measurements', () => {
      // Given
      const armholeRound = 12;
      const handRound = 10;
      const sleeveLength = 18;
      
      // Calculation:
      // Formula: ((AR + HR) / 2 - 1) × SL × 2
      // ((12 + 10) / 2 - 1) × 18 × 2
      // (22 / 2 - 1) × 18 × 2
      // (11 - 1) × 18 × 2
      // 10 × 18 × 2
      const avgCircumference = (armholeRound + handRound) / 2; // = 11
      const adjusted = avgCircumference - 1; // = 10
      const areaPerSleeve = adjusted * sleeveLength; // = 180
      const totalArea = areaPerSleeve * 2; // = 360
      
      const result = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      
      expect(result.result).toBe(totalArea);
    });

    it('should calculate for small arms (chest 28)', () => {
      // Given
      const armholeRound = 10;
      const handRound = 8;
      const sleeveLength = 15;
      
      // Calculation:
      // ((10 + 8) / 2 - 1) × 15 × 2
      // (18 / 2 - 1) × 15 × 2
      // (9 - 1) × 15 × 2
      // 8 × 15 × 2
      const expected = ((armholeRound + handRound) / 2 - 1) * sleeveLength * 2; // = 240
      
      const result = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      
      expect(result.result).toBe(expected);
    });

    it('should calculate for large arms (chest 44)', () => {
      // Given
      const armholeRound = 14;
      const handRound = 12;
      const sleeveLength = 20;
      
      // Calculation:
      // ((14 + 12) / 2 - 1) × 20 × 2
      // (26 / 2 - 1) × 20 × 2
      // (13 - 1) × 20 × 2
      // 12 × 20 × 2
      const expected = ((armholeRound + handRound) / 2 - 1) * sleeveLength * 2; // = 480
      
      const result = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      
      expect(result.result).toBe(expected);
    });

    it('should show larger measurements give more area', () => {
      const sleeveLength = 18;
      
      // Small
      const small = calculateHandsFillworkArea(10, 8, 15);
      // (10 + 8) / 2 - 1 = 8, 8 × 15 × 2 = 240
      const expectedSmall = ((10 + 8) / 2 - 1) * 15 * 2; // = 240
      expect(small.result).toBe(expectedSmall);
      
      // Medium
      const medium = calculateHandsFillworkArea(12, 10, 18);
      // (12 + 10) / 2 - 1 = 10, 10 × 18 × 2 = 360
      const expectedMedium = ((12 + 10) / 2 - 1) * 18 * 2; // = 360
      expect(medium.result).toBe(expectedMedium);
      
      // Large
      const large = calculateHandsFillworkArea(14, 12, 20);
      // (14 + 12) / 2 - 1 = 12, 12 × 20 × 2 = 480
      const expectedLarge = ((14 + 12) / 2 - 1) * 20 * 2; // = 480
      expect(large.result).toBe(expectedLarge);
      
      // Verify increasing sizes
      expect(medium.result).toBeGreaterThan(small.result);
      expect(large.result).toBeGreaterThan(medium.result);
    });

    it('should handle short sleeves', () => {
      // Given
      const armholeRound = 12;
      const handRound = 10;
      const sleeveLength = 10; // Short sleeve
      
      // Calculation:
      // ((12 + 10) / 2 - 1) × 10 × 2
      // (11 - 1) × 10 × 2
      // 10 × 10 × 2
      const expected = ((armholeRound + handRound) / 2 - 1) * sleeveLength * 2; // = 200
      
      const result = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      
      expect(result.result).toBe(expected);
    });

    it('should handle long sleeves', () => {
      // Given
      const armholeRound = 12;
      const handRound = 10;
      const sleeveLength = 24; // Long sleeve
      
      // Calculation:
      // ((12 + 10) / 2 - 1) × 24 × 2
      // (11 - 1) × 24 × 2
      // 10 × 24 × 2
      const expected = ((armholeRound + handRound) / 2 - 1) * sleeveLength * 2; // = 480
      
      const result = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      
      expect(result.result).toBe(expected);
    });
  });

  describe('Fillwork Area Comparison Table', () => {
    it('should verify fillwork area values across chest sizes', () => {
      const sizes = [28, 32, 36, 40, 44];
      
      sizes.forEach(size => {
        const baseArea = size * 7;
        
        // Front boat = base - 10
        const frontBoat = calculateFrontFillworkArea('boat', size).result;
        expect(frontBoat).toBe(baseArea - 10);
        
        // Front deep = base - 56
        const frontDeep = calculateFrontFillworkArea('deep', size).result;
        expect(frontDeep).toBe(baseArea - 56);
        
        // Back boat = base - 10
        const backBoat = calculateBackFillworkArea('boat', size).result;
        expect(backBoat).toBe(baseArea - 10);
        
        // Back deep = base - 70
        const backDeep = calculateBackFillworkArea('deep', size).result;
        expect(backDeep).toBe(baseArea - 70);
        
        // Back style 3 = base - 50
        const backStyle3 = calculateBackFillworkArea('3', size).result;
        expect(backStyle3).toBe(baseArea - 50);
      });
    });
  });
});

describe('Fillwork Time Calculations', () => {
  describe('Basic Fillwork Time', () => {
    it('should calculate fillwork time with single technique', () => {
      // Given
      const hasFillWork = true;
      const fillworkArea = 200; // sq inches
      const coverage = 80; // percent
      const techniques = ['Challa work'];
      const techniquePercentages = { 'Challa work': 100 };
      
      // Calculation:
      // Weighted Time: 100% Challa work = 12 min/sq.in
      // Coverage: 80% = 0.8
      // Formula: 200 × 0.8 × 12
      const weightedTime = 12; // Challa work time
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 200 × 0.8 × 12 = 1,920
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateFillWorkTime(hasFillWork, fillworkArea, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });

    it('should calculate fillwork time with multiple techniques', () => {
      // Given
      const hasFillWork = true;
      const fillworkArea = 150;
      const coverage = 100; // Full coverage
      const techniques = ['Thread filling', 'Mirror / Zarkans'];
      const techniquePercentages = {
        'Thread filling': 70,
        'Mirror / Zarkans': 30
      };
      
      // Calculation:
      // Weighted Time: (8.5 × 0.7) + (7 × 0.3) = 5.95 + 2.1 = 8.05 min/sq.in
      // Coverage: 100% = 1.0
      // Formula: 150 × 1.0 × 8.05
      const threadTime = 8.5 * 0.7; // = 5.95
      const mirrorTime = 7 * 0.3; // = 2.1
      const weightedTime = threadTime + mirrorTime; // = 8.05
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 150 × 1.0 × 8.05 = 1,207.5
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateFillWorkTime(hasFillWork, fillworkArea, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });

    it('should calculate with partial coverage (60%)', () => {
      // Given
      const hasFillWork = true;
      const fillworkArea = 250;
      const coverage = 60;
      const techniques = ['Sugar bead'];
      const techniquePercentages = { 'Sugar bead': 100 };
      
      // Calculation:
      // Weighted Time: 100% Sugar bead = 7.5 min/sq.in
      // Coverage: 60% = 0.6
      // Formula: 250 × 0.6 × 7.5
      const weightedTime = 7.5;
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 250 × 0.6 × 7.5 = 1,125
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateFillWorkTime(hasFillWork, fillworkArea, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });
  });

  describe('Realistic Fillwork Time Scenarios', () => {
    it('should calculate front fillwork time with boat neck, chest 36', () => {
      // Given
      const neckStyle = 'boat';
      const chestSize = 36;
      const coverage = 80;
      const techniques = ['Challa work', 'Thread roses'];
      const techniquePercentages = {
        'Challa work': 60,
        'Thread roses': 40
      };
      
      // Step 1: Calculate fillwork area
      // Formula: (36 × 7) - 10 = 252 - 10 = 242
      const fillworkArea = (chestSize * 7) - 10; // = 242
      const areaResult = calculateFrontFillworkArea(neckStyle, chestSize);
      expect(areaResult.result).toBe(fillworkArea);
      
      // Step 2: Calculate weighted time
      // Challa: 12 × 0.6 = 7.2
      // Thread roses: 30 × 0.4 = 12
      // Total: 7.2 + 12 = 19.2 min/sq.in
      const challaTime = 12 * 0.6; // = 7.2
      const rosesTime = 30 * 0.4; // = 12
      const weightedTime = challaTime + rosesTime; // = 19.2
      
      // Step 3: Calculate fillwork time
      // Formula: 242 × 0.8 × 19.2
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 242 × 0.8 × 19.2 = 3,718.4
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateFillWorkTime(true, areaResult.result, coverage, calculatedWeightedTime);
      
      expect(result).toBeCloseTo(expected, 1);
    });

    it('should calculate back fillwork time with deep neck, chest 40', () => {
      // Given
      const neckStyle = 'deep';
      const chestSize = 40;
      const coverage = 90;
      const techniques = ['Zardosi Challa', 'Chamki filling'];
      const techniquePercentages = {
        'Zardosi Challa': 50,
        'Chamki filling': 50
      };
      
      // Step 1: Calculate fillwork area
      // Formula: (40 × 7) - 70 = 280 - 70 = 210
      const fillworkArea = (chestSize * 7) - 70; // = 210
      const areaResult = calculateBackFillworkArea(neckStyle, chestSize);
      expect(areaResult.result).toBe(fillworkArea);
      
      // Step 2: Calculate weighted time
      // Zardosi Challa: 21 × 0.5 = 10.5
      // Chamki: 5 × 0.5 = 2.5
      // Total: 10.5 + 2.5 = 13 min/sq.in
      const zardosiTime = 21 * 0.5; // = 10.5
      const chamkiTime = 5 * 0.5; // = 2.5
      const weightedTime = zardosiTime + chamkiTime; // = 13
      
      // Step 3: Calculate fillwork time
      // Formula: 210 × 0.9 × 13
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 210 × 0.9 × 13 = 2,457
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateFillWorkTime(true, areaResult.result, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });

    it('should calculate hands fillwork time', () => {
      // Given
      const armholeRound = 12;
      const handRound = 10;
      const sleeveLength = 18;
      const coverage = 70;
      const techniques = ['Thread filling', 'Sugar bead + Chamki'];
      const techniquePercentages = {
        'Thread filling': 60,
        'Sugar bead + Chamki': 40
      };
      
      // Step 1: Calculate fillwork area
      // Formula: ((12 + 10) / 2 - 1) × 18 × 2
      // (11 - 1) × 18 × 2 = 10 × 18 × 2 = 360
      const fillworkArea = ((armholeRound + handRound) / 2 - 1) * sleeveLength * 2; // = 360
      const areaResult = calculateHandsFillworkArea(armholeRound, handRound, sleeveLength);
      expect(areaResult.result).toBe(fillworkArea);
      
      // Step 2: Calculate weighted time
      // Thread filling: 8.5 × 0.6 = 5.1
      // Sugar bead + Chamki: 8.5 × 0.4 = 3.4
      // Total: 5.1 + 3.4 = 8.5 min/sq.in
      const threadTime = 8.5 * 0.6; // = 5.1
      const sugarChamkiTime = 8.5 * 0.4; // = 3.4
      const weightedTime = threadTime + sugarChamkiTime; // = 8.5
      
      // Step 3: Calculate fillwork time
      // Formula: 360 × 0.7 × 8.5
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 360 × 0.7 × 8.5 = 2,142
      
      const calculatedWeightedTime = calculateWeightedTime(techniques, techniquePercentages);
      const result = calculateFillWorkTime(true, areaResult.result, coverage, calculatedWeightedTime);
      
      expect(result).toBe(expected);
    });
  });

  describe('Different Coverage Levels', () => {
    it('should compare 50%, 75%, and 100% coverage', () => {
      const fillworkArea = 300;
      const techniques = ['Challa work'];
      const techniquePercentages = { 'Challa work': 100 };
      const weightedTime = 12; // Challa work
      
      // 50% coverage
      // Formula: 300 × 0.5 × 12 = 1,800
      const expected50 = fillworkArea * 0.5 * weightedTime; // = 1,800
      const result50 = calculateFillWorkTime(true, fillworkArea, 50, weightedTime);
      expect(result50).toBe(expected50);
      
      // 75% coverage
      // Formula: 300 × 0.75 × 12 = 2,700
      const expected75 = fillworkArea * 0.75 * weightedTime; // = 2,700
      const result75 = calculateFillWorkTime(true, fillworkArea, 75, weightedTime);
      expect(result75).toBe(expected75);
      
      // 100% coverage
      // Formula: 300 × 1.0 × 12 = 3,600
      const expected100 = fillworkArea * 1.0 * weightedTime; // = 3,600
      const result100 = calculateFillWorkTime(true, fillworkArea, 100, weightedTime);
      expect(result100).toBe(expected100);
      
      // Verify proportions
      // 75% should be 1.5× of 50%
      expect(result75).toBe(result50 * 1.5);
      // 100% should be 2× of 50%
      expect(result100).toBe(result50 * 2);
    });
  });

  describe('Edge Cases', () => {
    it('should return 0 when fillwork disabled', () => {
      const result = calculateFillWorkTime(false, 200, 80, 12);
      expect(result).toBe(0);
    });

    it('should return 0 when fillwork area is 0', () => {
      const result = calculateFillWorkTime(true, 0, 80, 12);
      expect(result).toBe(0);
    });

    it('should handle zero coverage', () => {
      // Formula: 200 × 0.0 × 12 = 0
      const expected = 200 * 0 * 12; // = 0
      const result = calculateFillWorkTime(true, 200, 0, 12);
      expect(result).toBe(expected);
    });

    it('should handle very small areas', () => {
      const fillworkArea = 10;
      const coverage = 50;
      const weightedTime = 5;
      
      // Formula: 10 × 0.5 × 5 = 25
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 25
      const result = calculateFillWorkTime(true, fillworkArea, coverage, weightedTime);
      expect(result).toBe(expected);
    });

    it('should handle very large areas', () => {
      const fillworkArea = 500;
      const coverage = 100;
      const weightedTime = 30;
      
      // Formula: 500 × 1.0 × 30 = 15,000
      const expected = fillworkArea * (coverage / 100) * weightedTime; // = 15,000
      const result = calculateFillWorkTime(true, fillworkArea, coverage, weightedTime);
      expect(result).toBe(expected);
    });
  });
});

