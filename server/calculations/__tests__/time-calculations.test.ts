import { calculateMotifTime, calculateBorderTime, calculateFillWorkTime, calculateWeightedTime } from '../time-calculations';

describe('calculateWeightedTime', () => {
  it('should calculate weighted time with single technique', () => {
    const techniques = ['Challa work'];
    const percentages = { 'Challa work': 100 };
    
    const result = calculateWeightedTime(techniques, percentages);
    
    expect(result).toBe(12); // Challa work is 12 min/unit
  });

  it('should calculate weighted time with multiple techniques', () => {
    const techniques = ['Challa work', 'Thread roses'];
    const percentages = { 'Challa work': 60, 'Thread roses': 40 };
    
    const result = calculateWeightedTime(techniques, percentages);
    
    // (12 * 0.6) + (30 * 0.4) = 7.2 + 12 = 19.2
    expect(result).toBe(19.2);
  });

  it('should return 1 when no techniques selected', () => {
    const result = calculateWeightedTime([], {});
    
    expect(result).toBe(1);
  });

  it('should use default 50% when percentage not provided', () => {
    const techniques = ['Challa work'];
    const percentages = {};
    
    const result = calculateWeightedTime(techniques, percentages);
    
    // Should use 50% default
    expect(result).toBeGreaterThan(0);
  });
});

describe('calculateBorderTime', () => {
  it('should calculate border time correctly', () => {
    const hasBorders = true;
    const borderValue = 50; // inches
    const coverage = 80; // percent
    const weightedTime = 19.2; // min/unit
    
    const result = calculateBorderTime(hasBorders, borderValue, coverage, weightedTime);
    
    // 50 * 0.8 * 19.2 = 768 minutes
    expect(result).toBe(768);
  });

  it('should return 0 when borders disabled', () => {
    const result = calculateBorderTime(false, 50, 80, 19.2);
    
    expect(result).toBe(0);
  });

  it('should return 0 when border value is 0', () => {
    const result = calculateBorderTime(true, 0, 80, 19.2);
    
    expect(result).toBe(0);
  });

  it('should handle 100% coverage', () => {
    const result = calculateBorderTime(true, 50, 100, 20);
    
    // 50 * 1.0 * 20 = 1000
    expect(result).toBe(1000);
  });
});

describe('calculateFillWorkTime', () => {
  it('should calculate fillwork time correctly', () => {
    const hasFillWork = true;
    const fillworkArea = 200; // sq inches
    const coverage = 80; // percent
    const weightedTime = 19.2; // min/unit
    
    const result = calculateFillWorkTime(hasFillWork, fillworkArea, coverage, weightedTime);
    
    // 200 * 0.8 * 19.2 = 3,072 minutes
    expect(result).toBe(3072);
  });

  it('should return 0 when fillwork disabled', () => {
    const result = calculateFillWorkTime(false, 200, 80, 19.2);
    
    expect(result).toBe(0);
  });

  it('should return 0 when fillwork area is 0', () => {
    const result = calculateFillWorkTime(true, 0, 80, 19.2);
    
    expect(result).toBe(0);
  });

  it('should handle different coverages', () => {
    const result50 = calculateFillWorkTime(true, 100, 50, 10);
    const result100 = calculateFillWorkTime(true, 100, 100, 10);
    
    // 100% should be double of 50%
    expect(result100).toBe(result50 * 2);
  });
});

describe('calculateMotifTime', () => {
  it('should calculate motif time with size factor', () => {
    const hasMotifs = true;
    const motifValue = 60; // sq inches (e.g., 5 motifs × 3×4)
    const sizeFactor = 1.112; // for chest size 36
    const coverage = 80; // percent
    const weightedTime = 19.2; // min/unit
    
    const result = calculateMotifTime(hasMotifs, motifValue, sizeFactor, coverage, weightedTime);
    
    // 60 * 1.112 * 0.8 * 19.2 = 1,024.8192
    expect(result).toBeCloseTo(1024.8192, 1);
  });

  it('should return 0 when motifs disabled', () => {
    const result = calculateMotifTime(false, 60, 1.112, 80, 19.2);
    
    expect(result).toBe(0);
  });

  it('should return 0 when motif value is 0', () => {
    const result = calculateMotifTime(true, 0, 1.112, 80, 19.2);
    
    expect(result).toBe(0);
  });

  it('should scale with size factor', () => {
    const baseResult = calculateMotifTime(true, 100, 1.0, 100, 10);
    const scaledResult = calculateMotifTime(true, 100, 1.5, 100, 10);
    
    // 1.5x size factor should give 1.5x the time
    expect(scaledResult).toBe(baseResult * 1.5);
  });

  it('should handle small chest sizes (lower size factor)', () => {
    const sizeFactor28 = 1.0; // chest size 28
    const result = calculateMotifTime(true, 50, sizeFactor28, 100, 15);
    
    // 50 * 1.0 * 1.0 * 15 = 750
    expect(result).toBe(750);
  });

  it('should handle large chest sizes (higher size factor)', () => {
    const sizeFactor44 = 1.224; // chest size 44
    const result = calculateMotifTime(true, 50, sizeFactor44, 100, 15);
    
    // 50 * 1.224 * 1.0 * 15 = 918
    expect(result).toBeCloseTo(918, 1);
  });

  it('should apply coverage correctly', () => {
    const result50 = calculateMotifTime(true, 100, 1.0, 50, 10);
    const result80 = calculateMotifTime(true, 100, 1.0, 80, 10);
    
    // 80% coverage should be 1.6x the time of 50% coverage
    expect(result80).toBe(result50 * 1.6);
  });

  it('should work with realistic embroidery scenario', () => {
    // Scenario: 5 motifs, 3×4 inches each, chest size 36, 80% coverage
    // Challa work 60% + Thread roses 40%
    const motifValue = (3 * 4) * 5; // 60 sq inches
    const sizeFactor = 1.112; // chest size 36
    const coverage = 80;
    const weightedTime = (12 * 0.6) + (30 * 0.4); // 19.2 min/unit
    
    const result = calculateMotifTime(true, motifValue, sizeFactor, coverage, weightedTime);
    
    // 60 * 1.112 * 0.8 * 19.2 = 1,024.8192 minutes ≈ 17.08 hours
    expect(result).toBeCloseTo(1024.8192, 1);
    expect(result / 60).toBeCloseTo(17.08, 1); // Convert to hours
  });
});

