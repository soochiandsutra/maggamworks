import { calculateTime } from '../index';
import type { CalculationState } from '../types';

describe('Total Time Calculation Tests', () => {
  const createState = (): CalculationState => ({
    chestSize: '36',
    armholeRound: '12',
    handLength: '18',
    handRound: '10',
    all: {
      hasBorders: false,
      borderSize: 0,
      hasBlouseBottom: false,
      blouseBottomSize: 0,
      neckStyle: 'not selected',
      hasFillWork: false,
      coverage: 80,
      hasMotifs: false,
      motifSizeX: 0,
      motifSizeY: 0,
      motifCount: null,
      selectedTechniques: ['Challa work'],
      techniquePercentages: { 'Challa work': 100 },
    },
    front: {
      hasBorders: null,
      borderSize: null,
      hasBlouseBottom: null,
      blouseBottomSize: null,
      neckStyle: 'not selected',
      hasFillWork: null,
      coverage: null,
      hasMotifs: null,
      motifSizeX: null,
      motifSizeY: null,
      motifCount: null,
      selectedTechniques: null,
      techniquePercentages: null,
    },
    back: {
      hasBorders: null,
      borderSize: null,
      hasBlouseBottom: null,
      blouseBottomSize: null,
      neckStyle: 'not selected',
      hasFillWork: null,
      coverage: null,
      hasMotifs: null,
      motifSizeX: null,
      motifSizeY: null,
      motifCount: null,
      selectedTechniques: null,
      techniquePercentages: null,
    },
    hands: {
      hasBorders: null,
      borderSize: null,
      hasBlouseBottom: null,
      blouseBottomSize: null,
      neckStyle: 'not selected',
      hasFillWork: null,
      coverage: null,
      hasMotifs: null,
      motifSizeX: null,
      motifSizeY: null,
      motifCount: null,
      selectedTechniques: null,
      techniquePercentages: null,
      selectedDesign: 'style1',
    },
  });

  describe('Basic Total Time Formula', () => {
    it('should include start time in total (40 minutes)', () => {
      const state = createState();
      // All work disabled
      
      const result = calculateTime(state);
      
      // Calculation:
      // Total = START_TIME + Front + Back + Hands
      // Total = 40 + 0 + 0 + 0 = 40
      const expected = 40; // Only start time
      expect(result.totalTime).toBe(expected);
    });

    it('should calculate total as sum of all sections plus start time', () => {
      const state = createState();
      
      // Enable front borders only
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';
      
      const result = calculateTime(state);
      
      // Calculation:
      // Front Border Value = 11 × 1.112 × 2 = 24.464
      // Weighted Time = 12 (Challa work)
      // Coverage = 0.8
      // Front Border Time = 24.464 × 0.8 × 12 = 235.33
      const frontBorderValue = 11 * 1.112 * 2; // = 24.464
      const weightedTime = 12;
      const coverage = 0.8;
      const frontBorderTime = frontBorderValue * coverage * weightedTime; // = 235.33
      
      // Total = START_TIME + Front Total
      const expectedTotal = 40 + frontBorderTime; // = 40 + 235.33 = 275.33
      
      expect(result.breakdown.front.borders).toBeCloseTo(frontBorderTime, 1);
      expect(result.totalTime).toBeCloseTo(expectedTotal, 1);
    });
  });

  describe('Single Section Complete', () => {
    it('should calculate complete front section time', () => {
      const state = createState();
      
      // Front complete: borders + fillwork + motifs
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.hasBlouseBottom = true;
      state.front.blouseBottomSize = 1.5;
      state.front.neckStyle = 'boat';
      state.front.hasFillWork = true;
      state.front.hasMotifs = true;
      state.front.motifSizeX = 3;
      state.front.motifSizeY = 4;
      state.front.motifCount = '5';
      state.front.coverage = 80;
      state.front.selectedTechniques = ['Challa work'];
      state.front.techniquePercentages = { 'Challa work': 100 };
      
      const result = calculateTime(state);
      
      // Calculation:
      const chestSize = 36;
      const sizeFactor = 1.112;
      const weightedTime = 12; // Challa work
      const coverage = 0.8;
      
      // Border Value
      const topBorder = 11 * sizeFactor * 2; // = 24.464
      const bottomBorder = (chestSize / 2) * 1.5; // = 27
      const borderValue = topBorder + bottomBorder; // = 51.464
      
      // Border Time
      const borderTime = borderValue * coverage * weightedTime;
      // = 51.464 × 0.8 × 12 = 494.05
      
      // Fillwork Area
      const fillworkArea = (chestSize * 7) - 10; // = 242
      
      // Fillwork Time
      const fillworkTime = fillworkArea * coverage * weightedTime;
      // = 242 × 0.8 × 12 = 2,323.2
      
      // Motif Value
      const motifValue = (3 * 4) * 5; // = 60
      
      // Motif Time
      const motifTime = motifValue * sizeFactor * coverage * weightedTime;
      // = 60 × 1.112 × 0.8 × 12 = 641.02
      
      // Front Total
      const frontTotal = borderTime + fillworkTime + motifTime;
      // = 494.05 + 2,323.2 + 641.02 = 3,458.27
      
      // Project Total
      const expectedTotal = 40 + frontTotal;
      // = 40 + 3,458.27 = 3,498.27
      
      expect(result.breakdown.front.borders).toBeCloseTo(borderTime, 1);
      expect(result.breakdown.front.fillWork).toBeCloseTo(fillworkTime, 1);
      expect(result.breakdown.front.motifs).toBeCloseTo(motifTime, 1);
      expect(result.breakdown.front.total).toBeCloseTo(frontTotal, 1);
      expect(result.totalTime).toBeCloseTo(expectedTotal, 1);
    });

    it('should calculate complete back section time', () => {
      const state = createState();
      
      // Back complete: borders + fillwork + motifs
      state.back.hasBorders = true;
      state.back.borderSize = 2;
      state.back.hasBlouseBottom = true;
      state.back.blouseBottomSize = 1.5;
      state.back.neckStyle = 'deep';
      state.back.hasFillWork = true;
      state.back.hasMotifs = true;
      state.back.motifSizeX = 2;
      state.back.motifSizeY = 3;
      state.back.motifCount = '3';
      state.back.coverage = 80;
      state.back.selectedTechniques = ['Challa work'];
      state.back.techniquePercentages = { 'Challa work': 100 };
      
      const result = calculateTime(state);
      
      // Calculation:
      const chestSize = 36;
      const sizeFactor = 1.112;
      const weightedTime = 12;
      const coverage = 0.8;
      
      // Border Value
      const topBorder = 2 * sizeFactor * 2; // = 4.448 (deep neck value = 2)
      const bottomBorder = (chestSize / 2) * 1.5; // = 27
      const borderValue = topBorder + bottomBorder; // = 31.448
      
      // Border Time
      const borderTime = borderValue * coverage * weightedTime;
      // = 31.448 × 0.8 × 12 = 301.90
      
      // Fillwork Area (back deep)
      const fillworkArea = (chestSize * 7) - 70; // = 182
      
      // Fillwork Time
      const fillworkTime = fillworkArea * coverage * weightedTime;
      // = 182 × 0.8 × 12 = 1,747.2
      
      // Motif Value
      const motifValue = (2 * 3) * 3; // = 18
      
      // Motif Time
      const motifTime = motifValue * sizeFactor * coverage * weightedTime;
      // = 18 × 1.112 × 0.8 × 12 = 192.31
      
      // Back Total
      const backTotal = borderTime + fillworkTime + motifTime;
      // = 301.90 + 1,747.2 + 192.31 = 2,241.41
      
      // Project Total
      const expectedTotal = 40 + backTotal;
      // = 40 + 2,241.41 = 2,281.41
      
      expect(result.breakdown.back.borders).toBeCloseTo(borderTime, 1);
      expect(result.breakdown.back.fillWork).toBeCloseTo(fillworkTime, 1);
      expect(result.breakdown.back.motifs).toBeCloseTo(motifTime, 1);
      expect(result.breakdown.back.total).toBeCloseTo(backTotal, 1);
      expect(result.totalTime).toBeCloseTo(expectedTotal, 1);
    });

    it('should calculate complete hands section time', () => {
      const state = createState();
      
      // Hands complete: borders + fillwork + motifs
      state.hands.hasBorders = true;
      state.hands.borderSize = 1;
      state.hands.selectedDesign = 'style1';
      state.hands.hasFillWork = true;
      state.hands.hasMotifs = true;
      state.hands.motifSizeX = 2;
      state.hands.motifSizeY = 2;
      state.hands.motifCount = '2';
      state.hands.coverage = 80;
      state.hands.selectedTechniques = ['Challa work'];
      state.hands.techniquePercentages = { 'Challa work': 100 };
      
      const result = calculateTime(state);
      
      // Calculation:
      const armholeRound = 12;
      const handRound = 10;
      const sleeveLength = 18;
      const sizeFactor = 1.112;
      const weightedTime = 12;
      const coverage = 0.8;
      
      // Border Value (style1)
      const borderFormula = (handRound - 2) * 2; // = 16
      const borderValue = borderFormula * 1; // = 16
      
      // Border Time
      const borderTime = borderValue * coverage * weightedTime;
      // = 16 × 0.8 × 12 = 153.6
      
      // Fillwork Area
      const fillworkArea = ((armholeRound + handRound) / 2 - 1) * sleeveLength * 2;
      // = (11 - 1) × 18 × 2 = 360
      
      // Fillwork Time
      const fillworkTime = fillworkArea * coverage * weightedTime;
      // = 360 × 0.8 × 12 = 3,456
      
      // Motif Value
      const motifValue = (2 * 2) * 2; // = 8
      
      // Motif Time
      const motifTime = motifValue * sizeFactor * coverage * weightedTime;
      // = 8 × 1.112 × 0.8 × 12 = 85.47
      
      // Hands Total
      const handsTotal = borderTime + fillworkTime + motifTime;
      // = 153.6 + 3,456 + 85.47 = 3,695.07
      
      // Project Total
      const expectedTotal = 40 + handsTotal;
      // = 40 + 3,695.07 = 3,735.07
      
      expect(result.breakdown.hands.borders).toBeCloseTo(borderTime, 1);
      expect(result.breakdown.hands.fillWork).toBeCloseTo(fillworkTime, 1);
      expect(result.breakdown.hands.motifs).toBeCloseTo(motifTime, 1);
      expect(result.breakdown.hands.total).toBeCloseTo(handsTotal, 1);
      expect(result.totalTime).toBeCloseTo(expectedTotal, 1);
    });
  });

  describe('Complete Project Calculation', () => {
    it('should calculate full project with all sections and all features', () => {
      const state = createState();
      
      // Front: Boat neck, borders, fillwork, motifs
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.hasBlouseBottom = true;
      state.front.blouseBottomSize = 1.5;
      state.front.neckStyle = 'boat';
      state.front.hasFillWork = true;
      state.front.hasMotifs = true;
      state.front.motifSizeX = 3;
      state.front.motifSizeY = 4;
      state.front.motifCount = '5';
      state.front.coverage = 80;
      state.front.selectedTechniques = ['Challa work'];
      state.front.techniquePercentages = { 'Challa work': 100 };
      
      // Back: Deep neck, borders, fillwork, motifs
      state.back.hasBorders = true;
      state.back.borderSize = 2;
      state.back.hasBlouseBottom = true;
      state.back.blouseBottomSize = 1.5;
      state.back.neckStyle = 'deep';
      state.back.hasFillWork = true;
      state.back.hasMotifs = true;
      state.back.motifSizeX = 2;
      state.back.motifSizeY = 3;
      state.back.motifCount = '3';
      state.back.coverage = 80;
      state.back.selectedTechniques = ['Challa work'];
      state.back.techniquePercentages = { 'Challa work': 100 };
      
      // Hands: Style 1, borders, fillwork, motifs
      state.hands.hasBorders = true;
      state.hands.borderSize = 1;
      state.hands.selectedDesign = 'style1';
      state.hands.hasFillWork = true;
      state.hands.hasMotifs = true;
      state.hands.motifSizeX = 2;
      state.hands.motifSizeY = 2;
      state.hands.motifCount = '2';
      state.hands.coverage = 80;
      state.hands.selectedTechniques = ['Challa work'];
      state.hands.techniquePercentages = { 'Challa work': 100 };
      
      const result = calculateTime(state);
      
      // Calculation (from Example 3 in guide):
      const startTime = 40;
      
      // Front Total (calculated earlier)
      const frontTotal = result.breakdown.front.total;
      
      // Back Total (calculated earlier)
      const backTotal = result.breakdown.back.total;
      
      // Hands Total (calculated earlier)
      const handsTotal = result.breakdown.hands.total;
      
      // Project Total
      const expectedTotal = startTime + frontTotal + backTotal + handsTotal;
      
      // Verify each component exists
      expect(result.breakdown.front.total).toBeGreaterThan(3000);
      expect(result.breakdown.back.total).toBeGreaterThan(2000);
      expect(result.breakdown.hands.total).toBeGreaterThan(3000);
      
      // Verify total formula
      expect(result.totalTime).toBe(expectedTotal);
    });

    it('should verify total equals start + sum of all sections', () => {
      const state = createState();
      
      // Enable various features
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';
      
      state.back.hasMotifs = true;
      state.back.motifSizeX = 3;
      state.back.motifSizeY = 3;
      state.back.motifCount = '2';
      
      state.hands.hasFillWork = true;
      state.hands.coverage = 70;
      
      const result = calculateTime(state);
      
      // Verify formula: Total = START + Front + Back + Hands
      const calculatedTotal = 40 + 
        result.breakdown.front.total + 
        result.breakdown.back.total + 
        result.breakdown.hands.total;
      
      expect(result.totalTime).toBe(calculatedTotal);
    });
  });

  describe('Different Chest Sizes', () => {
    it('should show larger chest sizes result in more time', () => {
      // Small size (28)
      const state28 = createState();
      state28.chestSize = '28';
      state28.front.hasBorders = true;
      state28.front.borderSize = 2;
      state28.front.neckStyle = 'boat';
      state28.front.hasMotifs = true;
      state28.front.motifSizeX = 3;
      state28.front.motifSizeY = 4;
      state28.front.motifCount = '5';
      
      // Large size (44)
      const state44 = createState();
      state44.chestSize = '44';
      state44.front.hasBorders = true;
      state44.front.borderSize = 2;
      state44.front.neckStyle = 'boat';
      state44.front.hasMotifs = true;
      state44.front.motifSizeX = 3;
      state44.front.motifSizeY = 4;
      state44.front.motifCount = '5';
      
      const result28 = calculateTime(state28);
      const result44 = calculateTime(state44);
      
      // Size 44 should take more time than size 28
      // Because:
      // 1. Size factor: 1.224 vs 1.000 (affects motifs)
      // 2. Border values scale with size
      expect(result44.totalTime).toBeGreaterThan(result28.totalTime);
      
      // Calculate the difference
      const difference = result44.totalTime - result28.totalTime;
      const percentIncrease = (difference / result28.totalTime) * 100;
      
      // Should be roughly 22.4% more (size factor difference)
      expect(percentIncrease).toBeGreaterThan(15);
      expect(percentIncrease).toBeLessThan(30);
    });

    it('should calculate exact time for chest size 36 reference', () => {
      const state = createState();
      state.chestSize = '36';
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';
      
      const result = calculateTime(state);
      
      // Reference calculation:
      // Border Value = 11 × 1.112 × 2 = 24.464
      // Weighted Time = 12
      // Coverage = 0.8
      // Border Time = 24.464 × 0.8 × 12 = 235.33
      // Total = 40 + 235.33 = 275.33
      const expected = 40 + (11 * 1.112 * 2 * 0.8 * 12);
      
      expect(result.totalTime).toBeCloseTo(expected, 1);
    });
  });

  describe('Multiple Techniques Impact', () => {
    it('should show different technique mixes produce different times', () => {
      // State 1: Challa work only
      const state1 = createState();
      state1.front.hasBorders = true;
      state1.front.borderSize = 2;
      state1.front.neckStyle = 'boat';
      state1.front.selectedTechniques = ['Challa work'];
      state1.front.techniquePercentages = { 'Challa work': 100 };
      
      // State 2: Thread roses only
      const state2 = createState();
      state2.front.hasBorders = true;
      state2.front.borderSize = 2;
      state2.front.neckStyle = 'boat';
      state2.front.selectedTechniques = ['Thread roses'];
      state2.front.techniquePercentages = { 'Thread roses': 100 };
      
      const result1 = calculateTime(state1);
      const result2 = calculateTime(state2);
      
      // Thread roses (30 min) should take longer than Challa work (12 min)
      // Ratio: 30/12 = 2.5×
      expect(result2.totalTime).toBeGreaterThan(result1.totalTime);
      
      const ratio = (result2.totalTime - 40) / (result1.totalTime - 40);
      expect(ratio).toBeCloseTo(2.5, 0);
    });

    it('should calculate weighted average for mixed techniques', () => {
      const state = createState();
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';
      state.front.selectedTechniques = ['Challa work', 'Thread roses'];
      state.front.techniquePercentages = {
        'Challa work': 60,
        'Thread roses': 40
      };
      
      const result = calculateTime(state);
      
      // Weighted Time = (12 × 0.6) + (30 × 0.4) = 19.2
      // Border Value = 24.464
      // Border Time = 24.464 × 0.8 × 19.2 = 376.53
      // Total = 40 + 376.53 = 416.53
      const weightedTime = (12 * 0.6) + (30 * 0.4); // = 19.2
      const expected = 40 + (11 * 1.112 * 2 * 0.8 * weightedTime);
      
      expect(result.totalTime).toBeCloseTo(expected, 1);
    });
  });

  describe('Coverage Impact', () => {
    it('should show 100% coverage takes double time of 50% coverage', () => {
      // 50% coverage
      const state50 = createState();
      state50.front.hasBorders = true;
      state50.front.borderSize = 2;
      state50.front.neckStyle = 'boat';
      state50.front.coverage = 50;
      
      // 100% coverage
      const state100 = createState();
      state100.front.hasBorders = true;
      state100.front.borderSize = 2;
      state100.front.neckStyle = 'boat';
      state100.front.coverage = 100;
      
      const result50 = calculateTime(state50);
      const result100 = calculateTime(state100);
      
      // Work time (excluding start time) should be exactly 2×
      const work50 = result50.totalTime - 40;
      const work100 = result100.totalTime - 40;
      
      expect(work100).toBeCloseTo(work50 * 2, 1);
    });
  });

  describe('Working Days Calculation', () => {
    it('should calculate working days at 8 hours per day', () => {
      const state = createState();
      
      // Full project
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';
      state.front.hasFillWork = true;
      state.front.hasMotifs = true;
      state.front.motifSizeX = 3;
      state.front.motifSizeY = 4;
      state.front.motifCount = '5';
      
      state.back.hasBorders = true;
      state.back.borderSize = 2;
      state.back.neckStyle = 'deep';
      
      state.hands.hasBorders = true;
      state.hands.borderSize = 1;
      
      const result = calculateTime(state);
      
      // Convert to hours and days
      const hours = result.totalTime / 60;
      const workingDays = hours / 8;
      
      // Should be reasonable (not 0 or infinity)
      expect(workingDays).toBeGreaterThan(0);
      expect(workingDays).toBeLessThan(100); // Sanity check
    });
  });

  describe('Formula Verification', () => {
    it('should verify the total time formula components', () => {
      const state = createState();
      
      state.front.hasBorders = true;
      state.front.borderSize = 1;
      state.front.neckStyle = 'deep';
      
      const result = calculateTime(state);
      
      // Verify breakdown structure
      expect(result).toHaveProperty('totalTime');
      expect(result).toHaveProperty('breakdown');
      expect(result.breakdown).toHaveProperty('front');
      expect(result.breakdown).toHaveProperty('back');
      expect(result.breakdown).toHaveProperty('hands');
      expect(result.breakdown).toHaveProperty('all');
      
      // Verify each section has required properties
      ['front', 'back', 'hands'].forEach(section => {
        const sectionBreakdown = result.breakdown[section as keyof typeof result.breakdown];
        expect(sectionBreakdown).toHaveProperty('borders');
        expect(sectionBreakdown).toHaveProperty('fillWork');
        expect(sectionBreakdown).toHaveProperty('motifs');
        expect(sectionBreakdown).toHaveProperty('total');
        
        // Verify section total equals sum of components
        const componentSum = sectionBreakdown.borders + 
                            sectionBreakdown.fillWork + 
                            sectionBreakdown.motifs;
        expect(sectionBreakdown.total).toBeCloseTo(componentSum, 5);
      });
    });

    it('should always include start time (minimum 40 minutes)', () => {
      const state = createState();
      // All features disabled
      
      const result = calculateTime(state);
      
      // Even with nothing enabled, should have start time
      expect(result.totalTime).toBeGreaterThanOrEqual(40);
    });

    it('should have non-negative times for all components', () => {
      const state = createState();
      
      // Enable random features
      state.front.hasBorders = true;
      state.front.borderSize = 1;
      state.front.neckStyle = 'boat';
      state.back.hasMotifs = true;
      state.back.motifSizeX = 2;
      state.back.motifSizeY = 2;
      state.back.motifCount = '3';
      
      const result = calculateTime(state);
      
      // All times should be >= 0
      expect(result.totalTime).toBeGreaterThanOrEqual(0);
      ['front', 'back', 'hands'].forEach(section => {
        const breakdown = result.breakdown[section as keyof typeof result.breakdown];
        expect(breakdown.borders).toBeGreaterThanOrEqual(0);
        expect(breakdown.fillWork).toBeGreaterThanOrEqual(0);
        expect(breakdown.motifs).toBeGreaterThanOrEqual(0);
        expect(breakdown.total).toBeGreaterThanOrEqual(0);
      });
    });
  });
});

