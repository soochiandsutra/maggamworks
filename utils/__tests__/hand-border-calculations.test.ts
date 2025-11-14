import { calculateHandBorderLength } from '../border-calculations';
import { calculateHandsBorderValue } from '../border-motif-calculations';

describe('calculateHandBorderLength', () => {
  describe('Style 1 - Hand Round Based', () => {
    it('should calculate correctly for standard hand round 10', () => {
      // Formula: (HandRound - 2) × 2
      // Expected: (10 - 2) × 2 = 8 × 2 = 16
      const result = calculateHandBorderLength('style1', 10, 14);
      
      expect(result.formula).toBe('(HandRound - 2) × 2');
      expect(result.inputs['Hand Round']).toBe(10);
      expect(result.result).toBe(16);
    });

    it('should calculate correctly for hand round 8', () => {
      // Formula: (HandRound - 2) × 2
      // Expected: (8 - 2) × 2 = 6 × 2 = 12
      const result = calculateHandBorderLength('style1', 8, 14);
      
      expect(result.inputs['Hand Round']).toBe(8);
      expect(result.result).toBe(12);
    });

    it('should calculate correctly for hand round 12', () => {
      // Formula: (HandRound - 2) × 2
      // Expected: (12 - 2) × 2 = 10 × 2 = 20
      const result = calculateHandBorderLength('style1', 12, 16);
      
      expect(result.inputs['Hand Round']).toBe(12);
      expect(result.result).toBe(20);
    });

    it('should handle decimal hand round', () => {
      // Formula: (HandRound - 2) × 2
      // Expected: (9.5 - 2) × 2 = 7.5 × 2 = 15
      const result = calculateHandBorderLength('style1', 9.5, 14);
      
      expect(result.inputs['Hand Round']).toBe(9.5);
      expect(result.result).toBe(15);
    });
  });

  describe('Style 2 - Armhole Round Based', () => {
    it('should calculate correctly for standard armhole round 14', () => {
      // Formula: (ArmholeRound - 2) × 2
      // Expected: (14 - 2) × 2 = 12 × 2 = 24
      const result = calculateHandBorderLength('style2', 10, 14);
      
      expect(result.formula).toBe('(ArmholeRound - 2) × 2');
      expect(result.inputs['Armhole Round']).toBe(14);
      expect(result.result).toBe(24);
    });

    it('should calculate correctly for armhole round 12', () => {
      // Formula: (ArmholeRound - 2) × 2
      // Expected: (12 - 2) × 2 = 10 × 2 = 20
      const result = calculateHandBorderLength('style2', 8, 12);
      
      expect(result.inputs['Armhole Round']).toBe(12);
      expect(result.result).toBe(20);
    });

    it('should calculate correctly for armhole round 16', () => {
      // Formula: (ArmholeRound - 2) × 2
      // Expected: (16 - 2) × 2 = 14 × 2 = 28
      const result = calculateHandBorderLength('style2', 10, 16);
      
      expect(result.inputs['Armhole Round']).toBe(16);
      expect(result.result).toBe(28);
    });

    it('should handle decimal armhole round', () => {
      // Formula: (ArmholeRound - 2) × 2
      // Expected: (13.5 - 2) × 2 = 11.5 × 2 = 23
      const result = calculateHandBorderLength('style2', 10, 13.5);
      
      expect(result.inputs['Armhole Round']).toBe(13.5);
      expect(result.result).toBe(23);
    });
  });

  describe('Style 3 - Average Based', () => {
    it('should calculate correctly with hand round 10 and armhole round 14', () => {
      // Formula: ((HandRound + ArmholeRound) / 2 - 2) × 2
      // Expected: ((10 + 14) / 2 - 2) × 2 = (12 - 2) × 2 = 10 × 2 = 20
      const result = calculateHandBorderLength('style3', 10, 14);
      
      expect(result.formula).toBe('((HandRound + ArmholeRound) / 2 - 2) × 2');
      expect(result.inputs['Hand Round']).toBe(10);
      expect(result.inputs['Armhole Round']).toBe(14);
      expect(result.result).toBe(20);
    });

    it('should calculate correctly with hand round 8 and armhole round 12', () => {
      // Formula: ((HandRound + ArmholeRound) / 2 - 2) × 2
      // Expected: ((8 + 12) / 2 - 2) × 2 = (10 - 2) × 2 = 8 × 2 = 16
      const result = calculateHandBorderLength('style3', 8, 12);
      
      expect(result.inputs['Hand Round']).toBe(8);
      expect(result.inputs['Armhole Round']).toBe(12);
      expect(result.result).toBe(16);
    });

    it('should calculate correctly with hand round 12 and armhole round 16', () => {
      // Formula: ((HandRound + ArmholeRound) / 2 - 2) × 2
      // Expected: ((12 + 16) / 2 - 2) × 2 = (14 - 2) × 2 = 12 × 2 = 24
      const result = calculateHandBorderLength('style3', 12, 16);
      
      expect(result.inputs['Hand Round']).toBe(12);
      expect(result.inputs['Armhole Round']).toBe(16);
      expect(result.result).toBe(24);
    });

    it('should handle decimal values', () => {
      // Formula: ((HandRound + ArmholeRound) / 2 - 2) × 2
      // Expected: ((9.5 + 13.5) / 2 - 2) × 2 = (11.5 - 2) × 2 = 9.5 × 2 = 19
      const result = calculateHandBorderLength('style3', 9.5, 13.5);
      
      expect(result.inputs['Hand Round']).toBe(9.5);
      expect(result.inputs['Armhole Round']).toBe(13.5);
      expect(result.result).toBe(19);
    });

    it('should correctly average different values', () => {
      // Formula: ((HandRound + ArmholeRound) / 2 - 2) × 2
      // Expected: ((10 + 20) / 2 - 2) × 2 = (15 - 2) × 2 = 13 × 2 = 26
      const result = calculateHandBorderLength('style3', 10, 20);
      
      expect(result.result).toBe(26);
    });
  });

  describe('Style 4 - Sum of Both', () => {
    it('should calculate correctly with hand round 10 and armhole round 14', () => {
      // Formula: HandRound + ArmholeRound
      // Expected: 10 + 14 = 24
      const result = calculateHandBorderLength('style4', 10, 14);
      
      expect(result.formula).toBe('HandRound + ArmholeRound');
      expect(result.inputs['Hand Round']).toBe(10);
      expect(result.inputs['Armhole Round']).toBe(14);
      expect(result.result).toBe(24);
    });

    it('should calculate correctly with hand round 8 and armhole round 12', () => {
      // Formula: HandRound + ArmholeRound
      // Expected: 8 + 12 = 20
      const result = calculateHandBorderLength('style4', 8, 12);
      
      expect(result.inputs['Hand Round']).toBe(8);
      expect(result.inputs['Armhole Round']).toBe(12);
      expect(result.result).toBe(20);
    });

    it('should calculate correctly with hand round 12 and armhole round 16', () => {
      // Formula: HandRound + ArmholeRound
      // Expected: 12 + 16 = 28
      const result = calculateHandBorderLength('style4', 12, 16);
      
      expect(result.inputs['Hand Round']).toBe(12);
      expect(result.inputs['Armhole Round']).toBe(16);
      expect(result.result).toBe(28);
    });

    it('should handle decimal values', () => {
      // Formula: HandRound + ArmholeRound
      // Expected: 9.5 + 13.5 = 23
      const result = calculateHandBorderLength('style4', 9.5, 13.5);
      
      expect(result.inputs['Hand Round']).toBe(9.5);
      expect(result.inputs['Armhole Round']).toBe(13.5);
      expect(result.result).toBe(23);
    });
  });

  describe('Unknown/Invalid Styles', () => {
    it('should return 0 for unknown style', () => {
      const result = calculateHandBorderLength('unknown', 10, 14);
      
      expect(result.formula).toBe('0 (no border for this style)');
      expect(result.result).toBe(0);
    });

    it('should return 0 for empty string style', () => {
      const result = calculateHandBorderLength('', 10, 14);
      
      expect(result.result).toBe(0);
    });

    it('should return 0 for simple style', () => {
      const result = calculateHandBorderLength('simple', 10, 14);
      
      expect(result.result).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero hand round', () => {
      // Style 1: (0 - 2) × 2 = -4
      const result = calculateHandBorderLength('style1', 0, 14);
      expect(result.result).toBe(-4);
    });

    it('should handle zero armhole round', () => {
      // Style 2: (0 - 2) × 2 = -4
      const result = calculateHandBorderLength('style2', 10, 0);
      expect(result.result).toBe(-4);
    });

    it('should handle very large values', () => {
      // Style 4: 100 + 200 = 300
      const result = calculateHandBorderLength('style4', 100, 200);
      expect(result.result).toBe(300);
    });

    it('should handle small values close to 2', () => {
      // Style 1: (2.5 - 2) × 2 = 0.5 × 2 = 1
      const result = calculateHandBorderLength('style1', 2.5, 14);
      expect(result.result).toBe(1);
    });

    it('should handle exact value of 2', () => {
      // Style 1: (2 - 2) × 2 = 0
      const result = calculateHandBorderLength('style1', 2, 14);
      expect(result.result).toBe(0);
    });
  });

  describe('Style Comparison', () => {
    it('should produce different results for different styles with same inputs', () => {
      const handRound = 10;
      const armholeRound = 14;

      const style1 = calculateHandBorderLength('style1', handRound, armholeRound);
      const style2 = calculateHandBorderLength('style2', handRound, armholeRound);
      const style3 = calculateHandBorderLength('style3', handRound, armholeRound);
      const style4 = calculateHandBorderLength('style4', handRound, armholeRound);

      // Style 1: (10 - 2) × 2 = 16
      // Style 2: (14 - 2) × 2 = 24
      // Style 3: ((10 + 14) / 2 - 2) × 2 = 20
      // Style 4: 10 + 14 = 24

      expect(style1.result).toBe(16);
      expect(style2.result).toBe(24);
      expect(style3.result).toBe(20);
      expect(style4.result).toBe(24);

      // Verify they are different (except style2 and style4 in this case)
      expect(style1.result).not.toBe(style2.result);
      expect(style1.result).not.toBe(style3.result);
      expect(style2.result).not.toBe(style3.result);
    });
  });
});

describe('calculateHandsBorderValue', () => {
  describe('Style 1 with Different Thicknesses', () => {
    it('should calculate border value with thickness 1', () => {
      // Border Length: (10 - 2) × 2 = 16
      // Border Value: 16 × 1 = 16
      const result = calculateHandsBorderValue('style1', 10, 14, 1);
      
      expect(result.formula).toBe('Border Formula Result × Border Thickness');
      expect(result.inputs['Border Formula Result']).toBe(16);
      expect(result.inputs['Border Thickness']).toBe(1);
      expect(result.result).toBe(16);
    });

    it('should calculate border value with thickness 2', () => {
      // Border Length: (10 - 2) × 2 = 16
      // Border Value: 16 × 2 = 32
      const result = calculateHandsBorderValue('style1', 10, 14, 2);
      
      expect(result.inputs['Border Formula Result']).toBe(16);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBe(32);
    });

    it('should calculate border value with thickness 1.5', () => {
      // Border Length: (10 - 2) × 2 = 16
      // Border Value: 16 × 1.5 = 24
      const result = calculateHandsBorderValue('style1', 10, 14, 1.5);
      
      expect(result.inputs['Border Formula Result']).toBe(16);
      expect(result.inputs['Border Thickness']).toBe(1.5);
      expect(result.result).toBe(24);
    });

    it('should calculate border value with thickness 0.5', () => {
      // Border Length: (10 - 2) × 2 = 16
      // Border Value: 16 × 0.5 = 8
      const result = calculateHandsBorderValue('style1', 10, 14, 0.5);
      
      expect(result.inputs['Border Formula Result']).toBe(16);
      expect(result.inputs['Border Thickness']).toBe(0.5);
      expect(result.result).toBe(8);
    });
  });

  describe('Style 2 with Different Thicknesses', () => {
    it('should calculate border value with thickness 2', () => {
      // Border Length: (14 - 2) × 2 = 24
      // Border Value: 24 × 2 = 48
      const result = calculateHandsBorderValue('style2', 10, 14, 2);
      
      expect(result.inputs['Border Formula Result']).toBe(24);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBe(48);
    });

    it('should calculate border value with thickness 1.5', () => {
      // Border Length: (12 - 2) × 2 = 20
      // Border Value: 20 × 1.5 = 30
      const result = calculateHandsBorderValue('style2', 8, 12, 1.5);
      
      expect(result.inputs['Border Formula Result']).toBe(20);
      expect(result.inputs['Border Thickness']).toBe(1.5);
      expect(result.result).toBe(30);
    });
  });

  describe('Style 3 with Different Thicknesses', () => {
    it('should calculate border value with thickness 2', () => {
      // Border Length: ((10 + 14) / 2 - 2) × 2 = 20
      // Border Value: 20 × 2 = 40
      const result = calculateHandsBorderValue('style3', 10, 14, 2);
      
      expect(result.inputs['Border Formula Result']).toBe(20);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBe(40);
    });

    it('should calculate border value with thickness 1', () => {
      // Border Length: ((8 + 12) / 2 - 2) × 2 = 16
      // Border Value: 16 × 1 = 16
      const result = calculateHandsBorderValue('style3', 8, 12, 1);
      
      expect(result.inputs['Border Formula Result']).toBe(16);
      expect(result.inputs['Border Thickness']).toBe(1);
      expect(result.result).toBe(16);
    });
  });

  describe('Style 4 with Different Thicknesses', () => {
    it('should calculate border value with thickness 2', () => {
      // Border Length: 10 + 14 = 24
      // Border Value: 24 × 2 = 48
      const result = calculateHandsBorderValue('style4', 10, 14, 2);
      
      expect(result.inputs['Border Formula Result']).toBe(24);
      expect(result.inputs['Border Thickness']).toBe(2);
      expect(result.result).toBe(48);
    });

    it('should calculate border value with thickness 1.5', () => {
      // Border Length: 8 + 12 = 20
      // Border Value: 20 × 1.5 = 30
      const result = calculateHandsBorderValue('style4', 8, 12, 1.5);
      
      expect(result.inputs['Border Formula Result']).toBe(20);
      expect(result.inputs['Border Thickness']).toBe(1.5);
      expect(result.result).toBe(30);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero thickness', () => {
      // Border Length: 16
      // Border Value: 16 × 0 = 0
      const result = calculateHandsBorderValue('style1', 10, 14, 0);
      
      expect(result.result).toBe(0);
    });

    it('should handle very small thickness', () => {
      // Border Length: 16
      // Border Value: 16 × 0.1 = 1.6
      const result = calculateHandsBorderValue('style1', 10, 14, 0.1);
      
      expect(result.result).toBeCloseTo(1.6, 2);
    });

    it('should handle very large thickness', () => {
      // Border Length: 16
      // Border Value: 16 × 10 = 160
      const result = calculateHandsBorderValue('style1', 10, 14, 10);
      
      expect(result.result).toBe(160);
    });

    it('should return 0 for unknown style', () => {
      const result = calculateHandsBorderValue('unknown', 10, 14, 2);
      
      expect(result.inputs['Border Formula Result']).toBe(0);
      expect(result.result).toBe(0);
    });
  });

  describe('Realistic Scenarios', () => {
    it('should calculate for typical garment - style1, hand 8, armhole 12, thickness 1.5', () => {
      // Border Length: (8 - 2) × 2 = 12
      // Border Value: 12 × 1.5 = 18
      const result = calculateHandsBorderValue('style1', 8, 12, 1.5);
      
      expect(result.result).toBe(18);
    });

    it('should calculate for typical garment - style2, hand 10, armhole 14, thickness 2', () => {
      // Border Length: (14 - 2) × 2 = 24
      // Border Value: 24 × 2 = 48
      const result = calculateHandsBorderValue('style2', 10, 14, 2);
      
      expect(result.result).toBe(48);
    });

    it('should calculate for typical garment - style3, hand 10, armhole 14, thickness 1.5', () => {
      // Border Length: ((10 + 14) / 2 - 2) × 2 = 20
      // Border Value: 20 × 1.5 = 30
      const result = calculateHandsBorderValue('style3', 10, 14, 1.5);
      
      expect(result.result).toBe(30);
    });

    it('should calculate for typical garment - style4, hand 10, armhole 14, thickness 1', () => {
      // Border Length: 10 + 14 = 24
      // Border Value: 24 × 1 = 24
      const result = calculateHandsBorderValue('style4', 10, 14, 1);
      
      expect(result.result).toBe(24);
    });
  });

  describe('Thickness Proportionality', () => {
    it('should scale linearly with thickness', () => {
      const thickness1 = calculateHandsBorderValue('style1', 10, 14, 1);
      const thickness2 = calculateHandsBorderValue('style1', 10, 14, 2);
      const thickness3 = calculateHandsBorderValue('style1', 10, 14, 3);
      
      expect(thickness2.result).toBe(thickness1.result * 2);
      expect(thickness3.result).toBe(thickness1.result * 3);
    });

    it('should verify doubling thickness doubles the result', () => {
      const result1 = calculateHandsBorderValue('style3', 10, 14, 1.5);
      const result2 = calculateHandsBorderValue('style3', 10, 14, 3);
      
      expect(result2.result).toBeCloseTo(result1.result * 2, 2);
    });
  });

  describe('Formula Information', () => {
    it('should include formula information in results', () => {
      const result = calculateHandsBorderValue('style1', 10, 14, 2);
      
      expect(result.inputs['Formula Used']).toBe('(HandRound - 2) × 2');
    });

    it('should include different formula information for different styles', () => {
      const result1 = calculateHandsBorderValue('style1', 10, 14, 2);
      const result2 = calculateHandsBorderValue('style2', 10, 14, 2);
      const result3 = calculateHandsBorderValue('style3', 10, 14, 2);
      const result4 = calculateHandsBorderValue('style4', 10, 14, 2);
      
      expect(result1.inputs['Formula Used']).toBe('(HandRound - 2) × 2');
      expect(result2.inputs['Formula Used']).toBe('(ArmholeRound - 2) × 2');
      expect(result3.inputs['Formula Used']).toBe('((HandRound + ArmholeRound) / 2 - 2) × 2');
      expect(result4.inputs['Formula Used']).toBe('HandRound + ArmholeRound');
    });
  });
});

describe('Integration Tests - Complete Hand Border Calculations', () => {
  it('should calculate end-to-end for style1', () => {
    const handRound = 10;
    const armholeRound = 14;
    const thickness = 2;
    
    // Step 1: Calculate border length
    const borderLength = calculateHandBorderLength('style1', handRound, armholeRound);
    expect(borderLength.result).toBe(16);
    
    // Step 2: Calculate border value
    const borderValue = calculateHandsBorderValue('style1', handRound, armholeRound, thickness);
    expect(borderValue.result).toBe(32);
    
    // Verify relationship
    expect(borderValue.result).toBe(borderLength.result * thickness);
  });

  it('should calculate end-to-end for style2', () => {
    const handRound = 8;
    const armholeRound = 12;
    const thickness = 1.5;
    
    const borderLength = calculateHandBorderLength('style2', handRound, armholeRound);
    const borderValue = calculateHandsBorderValue('style2', handRound, armholeRound, thickness);
    
    // Border Length: (12 - 2) × 2 = 20
    // Border Value: 20 × 1.5 = 30
    expect(borderLength.result).toBe(20);
    expect(borderValue.result).toBe(30);
    expect(borderValue.result).toBe(borderLength.result * thickness);
  });

  it('should calculate end-to-end for style3', () => {
    const handRound = 10;
    const armholeRound = 14;
    const thickness = 1.5;
    
    const borderLength = calculateHandBorderLength('style3', handRound, armholeRound);
    const borderValue = calculateHandsBorderValue('style3', handRound, armholeRound, thickness);
    
    // Border Length: ((10 + 14) / 2 - 2) × 2 = 20
    // Border Value: 20 × 1.5 = 30
    expect(borderLength.result).toBe(20);
    expect(borderValue.result).toBe(30);
    expect(borderValue.result).toBe(borderLength.result * thickness);
  });

  it('should calculate end-to-end for style4', () => {
    const handRound = 12;
    const armholeRound = 16;
    const thickness = 2.5;
    
    const borderLength = calculateHandBorderLength('style4', handRound, armholeRound);
    const borderValue = calculateHandsBorderValue('style4', handRound, armholeRound, thickness);
    
    // Border Length: 12 + 16 = 28
    // Border Value: 28 × 2.5 = 70
    expect(borderLength.result).toBe(28);
    expect(borderValue.result).toBe(70);
    expect(borderValue.result).toBe(borderLength.result * thickness);
  });

  it('should verify all styles produce different border values', () => {
    const handRound = 10;
    const armholeRound = 14;
    const thickness = 2;
    
    const style1 = calculateHandsBorderValue('style1', handRound, armholeRound, thickness);
    const style2 = calculateHandsBorderValue('style2', handRound, armholeRound, thickness);
    const style3 = calculateHandsBorderValue('style3', handRound, armholeRound, thickness);
    const style4 = calculateHandsBorderValue('style4', handRound, armholeRound, thickness);
    
    // Style 1: 16 × 2 = 32
    // Style 2: 24 × 2 = 48
    // Style 3: 20 × 2 = 40
    // Style 4: 24 × 2 = 48
    expect(style1.result).toBe(32);
    expect(style2.result).toBe(48);
    expect(style3.result).toBe(40);
    expect(style4.result).toBe(48);
  });
});

