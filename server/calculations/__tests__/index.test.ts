import { calculateTime } from '../index';
import type { CalculationState } from '../types';

describe('calculateTime - Integration Tests', () => {
  const createBaseState = (): CalculationState => ({
    chestSize: '36',
    armholeRound: '12',
    handLength: '18',
    handRound: '10',
    all: {
      hasBorders: true,
      borderSize: 2,
      hasBlouseBottom: false,
      blouseBottomSize: 0,
      neckStyle: 'boat',
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

  describe('Basic Calculation', () => {
    it('should return start time when no work is enabled', () => {
      const state = createBaseState();
      state.all.hasBorders = false;
      state.all.hasFillWork = false;
      state.all.hasMotifs = false;

      const result = calculateTime(state);

      expect(result.totalTime).toBe(40); // Only start time
      expect(result.breakdown.front.total).toBe(0);
      expect(result.breakdown.back.total).toBe(0);
      expect(result.breakdown.hands.total).toBe(0);
    });

    it('should include start time in total', () => {
      const state = createBaseState();
      const result = calculateTime(state);

      // Should be at least 40 minutes (start time)
      expect(result.totalTime).toBeGreaterThanOrEqual(40);
    });
  });

  describe('Border Calculations', () => {
    it('should calculate front border time with boat neck', () => {
      const state = createBaseState();
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBeGreaterThan(0);
    });

    it('should calculate back border time with deep neck', () => {
      const state = createBaseState();
      state.back.hasBorders = true;
      state.back.borderSize = 2;
      state.back.neckStyle = 'deep';

      const result = calculateTime(state);

      expect(result.breakdown.back.borders).toBeGreaterThan(0);
    });

    it('should calculate hands border with different styles', () => {
      const state = createBaseState();
      state.hands.hasBorders = true;
      state.hands.borderSize = 1.5;
      state.hands.selectedDesign = 'style1';

      const result = calculateTime(state);

      expect(result.breakdown.hands.borders).toBeGreaterThan(0);
    });

    it('should include bottom border when enabled', () => {
      const state = createBaseState();
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.hasBlouseBottom = true;
      state.front.blouseBottomSize = 1.5;
      state.front.neckStyle = 'boat';

      const resultWithBottom = calculateTime(state);

      state.front.hasBlouseBottom = false;
      const resultWithoutBottom = calculateTime(state);

      expect(resultWithBottom.breakdown.front.borders).toBeGreaterThan(
        resultWithoutBottom.breakdown.front.borders
      );
    });
  });

  describe('Fillwork Calculations', () => {
    it('should calculate front fillwork with boat neck', () => {
      const state = createBaseState();
      state.front.hasFillWork = true;
      state.front.neckStyle = 'boat';
      state.front.hasBorders = true;
      state.front.borderSize = 2;

      const result = calculateTime(state);

      expect(result.breakdown.front.fillWork).toBeGreaterThan(0);
    });

    it('should calculate back fillwork with deep neck', () => {
      const state = createBaseState();
      state.back.hasFillWork = true;
      state.back.neckStyle = 'deep';
      state.back.hasBorders = true;
      state.back.borderSize = 2;

      const result = calculateTime(state);

      expect(result.breakdown.back.fillWork).toBeGreaterThan(0);
    });

    it('should return 0 fillwork for unsupported neck styles', () => {
      const state = createBaseState();
      state.front.hasFillWork = true;
      state.front.neckStyle = '1'; // Style 1 doesn't support fillwork
      state.front.hasBorders = true;
      state.front.borderSize = 2;

      const result = calculateTime(state);

      expect(result.breakdown.front.fillWork).toBe(0);
    });

    it('should calculate hands fillwork', () => {
      const state = createBaseState();
      state.hands.hasFillWork = true;
      state.hands.hasBorders = true;
      state.hands.borderSize = 1;

      const result = calculateTime(state);

      expect(result.breakdown.hands.fillWork).toBeGreaterThan(0);
    });
  });

  describe('Motif Calculations', () => {
    it('should calculate front motif time', () => {
      const state = createBaseState();
      state.front.hasMotifs = true;
      state.front.motifSizeX = 3;
      state.front.motifSizeY = 4;
      state.front.motifCount = '5';

      const result = calculateTime(state);

      expect(result.breakdown.front.motifs).toBeGreaterThan(0);
    });

    it('should calculate back motif time', () => {
      const state = createBaseState();
      state.back.hasMotifs = true;
      state.back.motifSizeX = 2;
      state.back.motifSizeY = 3;
      state.back.motifCount = '3';

      const result = calculateTime(state);

      expect(result.breakdown.back.motifs).toBeGreaterThan(0);
    });

    it('should calculate hands motif time', () => {
      const state = createBaseState();
      state.hands.hasMotifs = true;
      state.hands.motifSizeX = 2.5;
      state.hands.motifSizeY = 2.5;
      state.hands.motifCount = '2';

      const result = calculateTime(state);

      expect(result.breakdown.hands.motifs).toBeGreaterThan(0);
    });

    it('should scale motif time with chest size (size factor)', () => {
      const state28 = createBaseState();
      state28.chestSize = '28';
      state28.front.hasMotifs = true;
      state28.front.motifSizeX = 3;
      state28.front.motifSizeY = 3;
      state28.front.motifCount = '5';

      const state44 = createBaseState();
      state44.chestSize = '44';
      state44.front.hasMotifs = true;
      state44.front.motifSizeX = 3;
      state44.front.motifSizeY = 3;
      state44.front.motifCount = '5';

      const result28 = calculateTime(state28);
      const result44 = calculateTime(state44);

      // Chest 44 should take more time than chest 28 due to size factor
      expect(result44.breakdown.front.motifs).toBeGreaterThan(
        result28.breakdown.front.motifs
      );
    });

    it('should return 0 when motif count is 0', () => {
      const state = createBaseState();
      state.front.hasMotifs = true;
      state.front.motifSizeX = 3;
      state.front.motifSizeY = 4;
      state.front.motifCount = '0';

      const result = calculateTime(state);

      expect(result.breakdown.front.motifs).toBe(0);
    });
  });

  describe('Fallback Logic', () => {
    it('should use "all" values when section values are null', () => {
      const state = createBaseState();
      state.all.hasBorders = true;
      state.all.borderSize = 2;
      state.all.hasMotifs = true;
      state.all.motifSizeX = 3;
      state.all.motifSizeY = 4;
      state.all.motifCount = '5';
      state.all.selectedTechniques = ['Challa work'];
      state.all.techniquePercentages = { 'Challa work': 100 };
      state.all.coverage = 80;

      // Front has null values for motifs, should fallback to "all"
      state.front.hasMotifs = null;
      state.front.motifSizeX = null;
      state.front.motifSizeY = null;
      state.front.motifCount = null;

      const result = calculateTime(state);

      // Should calculate motif time using "all" values through fallback
      expect(result.breakdown.front.motifs).toBeGreaterThan(0);
    });

    it('should override "all" values when section values are set', () => {
      const state = createBaseState();
      state.all.hasBorders = true;
      state.all.borderSize = 2;
      state.all.neckStyle = 'boat';

      state.front.hasBorders = false; // Override to disable

      const result = calculateTime(state);

      // Front should have no border time because it's disabled
      expect(result.breakdown.front.borders).toBe(0);
    });
  });

  describe('Multiple Techniques', () => {
    it('should calculate weighted time with multiple techniques', () => {
      const state = createBaseState();
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';
      state.front.selectedTechniques = ['Challa work', 'Thread roses'];
      state.front.techniquePercentages = {
        'Challa work': 60,
        'Thread roses': 40,
      };

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBeGreaterThan(0);
    });
  });

  describe('Coverage Percentage', () => {
    it('should scale time with coverage percentage', () => {
      const state50 = createBaseState();
      state50.front.hasBorders = true;
      state50.front.borderSize = 2;
      state50.front.neckStyle = 'boat';
      state50.front.coverage = 50;

      const state100 = createBaseState();
      state100.front.hasBorders = true;
      state100.front.borderSize = 2;
      state100.front.neckStyle = 'boat';
      state100.front.coverage = 100;

      const result50 = calculateTime(state50);
      const result100 = calculateTime(state100);

      // 100% coverage should be double of 50%
      expect(result100.breakdown.front.borders).toBeCloseTo(
        result50.breakdown.front.borders * 2,
        0
      );
    });
  });

  describe('Complex Scenarios', () => {
    it('should calculate full project with all features enabled', () => {
      const state = createBaseState();

      // Front
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
      state.front.selectedTechniques = ['Challa work', 'Thread roses'];
      state.front.techniquePercentages = {
        'Challa work': 60,
        'Thread roses': 40,
      };

      // Back
      state.back.hasBorders = true;
      state.back.borderSize = 2;
      state.back.neckStyle = 'deep';
      state.back.hasFillWork = true;
      state.back.hasMotifs = true;
      state.back.motifSizeX = 2;
      state.back.motifSizeY = 3;
      state.back.motifCount = '3';
      state.back.selectedTechniques = ['Challa work'];
      state.back.techniquePercentages = { 'Challa work': 100 };

      // Hands
      state.hands.hasBorders = true;
      state.hands.borderSize = 1;
      state.hands.hasFillWork = true;
      state.hands.hasMotifs = true;
      state.hands.motifSizeX = 2;
      state.hands.motifSizeY = 2;
      state.hands.motifCount = '2';
      state.hands.selectedTechniques = ['Thread filling'];
      state.hands.techniquePercentages = { 'Thread filling': 100 };

      const result = calculateTime(state);

      // All sections should have time
      expect(result.breakdown.front.total).toBeGreaterThan(0);
      expect(result.breakdown.back.total).toBeGreaterThan(0);
      expect(result.breakdown.hands.total).toBeGreaterThan(0);

      // Total should be sum of all sections + start time
      expect(result.totalTime).toBe(
        40 +
          result.breakdown.front.total +
          result.breakdown.back.total +
          result.breakdown.hands.total
      );
    });

    it('should handle partial project (only front enabled)', () => {
      const state = createBaseState();
      
      // Disable all sections
      state.all.hasBorders = false;
      state.all.hasFillWork = false;
      state.all.hasMotifs = false;
      
      // Enable only front
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';

      const result = calculateTime(state);

      expect(result.breakdown.front.total).toBeGreaterThan(0);
      expect(result.breakdown.back.total).toBe(0);
      expect(result.breakdown.hands.total).toBe(0);
    });
  });

  describe('Different Chest Sizes', () => {
    it('should scale calculations for chest size 28', () => {
      const state = createBaseState();
      state.chestSize = '28';
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBeGreaterThan(0);
    });

    it('should scale calculations for chest size 44', () => {
      const state = createBaseState();
      state.chestSize = '44';
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBeGreaterThan(0);
    });

    it('should have proportional time increase for larger sizes', () => {
      const state28 = createBaseState();
      state28.chestSize = '28';
      state28.front.hasBorders = true;
      state28.front.borderSize = 2;
      state28.front.neckStyle = 'boat';

      const state36 = createBaseState();
      state36.chestSize = '36';
      state36.front.hasBorders = true;
      state36.front.borderSize = 2;
      state36.front.neckStyle = 'boat';

      const result28 = calculateTime(state28);
      const result36 = calculateTime(state36);

      // Larger size should take more time
      expect(result36.breakdown.front.borders).toBeGreaterThan(
        result28.breakdown.front.borders
      );
    });
  });

  describe('Neck Style Variations', () => {
    it('should calculate different times for different front neck styles', () => {
      const stateBoat = createBaseState();
      stateBoat.front.hasBorders = true;
      stateBoat.front.borderSize = 2;
      stateBoat.front.neckStyle = 'boat';

      const stateDeep = createBaseState();
      stateDeep.front.hasBorders = true;
      stateDeep.front.borderSize = 2;
      stateDeep.front.neckStyle = 'deep';

      const resultBoat = calculateTime(stateBoat);
      const resultDeep = calculateTime(stateDeep);

      // Different neck styles should give different times
      expect(resultBoat.breakdown.front.borders).not.toBe(
        resultDeep.breakdown.front.borders
      );
    });

    it('should calculate formula-based neck style (front style 3)', () => {
      const state = createBaseState();
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = '3'; // Bridal Neck with formula

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBeGreaterThan(0);
    });

    it('should calculate formula-based neck style (back style 5)', () => {
      const state = createBaseState();
      state.back.hasBorders = true;
      state.back.borderSize = 2;
      state.back.neckStyle = '5'; // Formula-based

      const result = calculateTime(state);

      expect(result.breakdown.back.borders).toBeGreaterThan(0);
    });
  });

  describe('Hand Design Variations', () => {
    it('should calculate different times for different hand designs', () => {
      const state1 = createBaseState();
      state1.hands.hasBorders = true;
      state1.hands.borderSize = 1;
      state1.hands.selectedDesign = 'style1';

      const state2 = createBaseState();
      state2.hands.hasBorders = true;
      state2.hands.borderSize = 1;
      state2.hands.selectedDesign = 'style2';

      const result1 = calculateTime(state1);
      const result2 = calculateTime(state2);

      // Different designs should give different times
      expect(result1.breakdown.hands.borders).not.toBe(
        result2.breakdown.hands.borders
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty chest size (default to 36)', () => {
      const state = createBaseState();
      state.chestSize = '';
      state.front.hasBorders = true;
      state.front.borderSize = 2;
      state.front.neckStyle = 'boat';

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBeGreaterThan(0);
    });

    it('should handle invalid motif count', () => {
      const state = createBaseState();
      state.front.hasMotifs = true;
      state.front.motifSizeX = 3;
      state.front.motifSizeY = 4;
      state.front.motifCount = 'invalid';

      const result = calculateTime(state);

      expect(result.breakdown.front.motifs).toBe(0);
    });

    it('should handle zero border size', () => {
      const state = createBaseState();
      state.front.hasBorders = true;
      state.front.borderSize = 0;

      const result = calculateTime(state);

      expect(result.breakdown.front.borders).toBe(0);
    });
  });
});

