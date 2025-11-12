import { useAppStateStore } from '../appState';
import { act } from '@testing-library/react';

describe('appState Store - Size Measurements', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    const store = useAppStateStore.getState();
    act(() => {
      store.setChestSize('');
      store.setArmholeRound('');
      store.setHandLength('');
      store.setHandRound('');
    });
  });

  describe('Chest Size', () => {
    it('should have empty string as initial chest size', () => {
      const { chestSize } = useAppStateStore.getState();
      expect(chestSize).toBe('');
    });

    it('should store chest size as string when set', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('36');
      });
      
      const { chestSize } = useAppStateStore.getState();
      expect(chestSize).toBe('36');
    });

    it('should store exact value entered - size 28', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('28');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('28');
    });

    it('should store exact value entered - size 32', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('32');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('32');
    });

    it('should store exact value entered - size 36', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('36');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('36');
    });

    it('should store exact value entered - size 40', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('40');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('40');
    });

    it('should store exact value entered - size 44', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('44');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('44');
    });

    it('should store odd sizes - size 29', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('29');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('29');
    });

    it('should store odd sizes - size 35', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('35');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('35');
    });

    it('should store decimal values', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('36.5');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('36.5');
    });

    it('should store decimal values with precision', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('32.75');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('32.75');
    });

    it('should allow updating chest size multiple times', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('28');
      });
      expect(useAppStateStore.getState().chestSize).toBe('28');
      
      act(() => {
        setChestSize('36');
      });
      expect(useAppStateStore.getState().chestSize).toBe('36');
      
      act(() => {
        setChestSize('44');
      });
      expect(useAppStateStore.getState().chestSize).toBe('44');
    });

    it('should store empty string when cleared', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('36');
      });
      expect(useAppStateStore.getState().chestSize).toBe('36');
      
      act(() => {
        setChestSize('');
      });
      expect(useAppStateStore.getState().chestSize).toBe('');
    });

    it('should store very small values', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('20');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('20');
    });

    it('should store very large values', () => {
      const { setChestSize } = useAppStateStore.getState();
      
      act(() => {
        setChestSize('50');
      });
      
      expect(useAppStateStore.getState().chestSize).toBe('50');
    });
  });

  describe('Armhole Round', () => {
    it('should have empty string as initial armhole round', () => {
      const { armholeRound } = useAppStateStore.getState();
      expect(armholeRound).toBe('');
    });

    it('should store armhole round value', () => {
      const { setArmholeRound } = useAppStateStore.getState();
      
      act(() => {
        setArmholeRound('14');
      });
      
      expect(useAppStateStore.getState().armholeRound).toBe('14');
    });

    it('should store decimal armhole round', () => {
      const { setArmholeRound } = useAppStateStore.getState();
      
      act(() => {
        setArmholeRound('14.5');
      });
      
      expect(useAppStateStore.getState().armholeRound).toBe('14.5');
    });
  });

  describe('Hand Length', () => {
    it('should have empty string as initial hand length', () => {
      const { handLength } = useAppStateStore.getState();
      expect(handLength).toBe('');
    });

    it('should store hand length value', () => {
      const { setHandLength } = useAppStateStore.getState();
      
      act(() => {
        setHandLength('18');
      });
      
      expect(useAppStateStore.getState().handLength).toBe('18');
    });

    it('should store decimal hand length', () => {
      const { setHandLength } = useAppStateStore.getState();
      
      act(() => {
        setHandLength('17.5');
      });
      
      expect(useAppStateStore.getState().handLength).toBe('17.5');
    });
  });

  describe('Hand Round', () => {
    it('should have empty string as initial hand round', () => {
      const { handRound } = useAppStateStore.getState();
      expect(handRound).toBe('');
    });

    it('should store hand round value', () => {
      const { setHandRound } = useAppStateStore.getState();
      
      act(() => {
        setHandRound('8');
      });
      
      expect(useAppStateStore.getState().handRound).toBe('8');
    });

    it('should store decimal hand round', () => {
      const { setHandRound } = useAppStateStore.getState();
      
      act(() => {
        setHandRound('8.5');
      });
      
      expect(useAppStateStore.getState().handRound).toBe('8.5');
    });
  });

  describe('Integration - Multiple size values', () => {
    it('should store all size measurements independently', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setArmholeRound('14');
        store.setHandLength('18');
        store.setHandRound('8');
      });
      
      const state = useAppStateStore.getState();
      expect(state.chestSize).toBe('36');
      expect(state.armholeRound).toBe('14');
      expect(state.handLength).toBe('18');
      expect(state.handRound).toBe('8');
    });

    it('should not affect other measurements when updating one', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setArmholeRound('14');
      });
      
      act(() => {
        store.setChestSize('40');
      });
      
      const state = useAppStateStore.getState();
      expect(state.chestSize).toBe('40');
      expect(state.armholeRound).toBe('14'); // Should remain unchanged
    });
  });

  describe('Real-world scenarios', () => {
    it('should handle typical user input flow', () => {
      const store = useAppStateStore.getState();
      
      // User starts entering chest size
      act(() => {
        store.setChestSize('3');
      });
      expect(useAppStateStore.getState().chestSize).toBe('3');
      
      // User continues typing
      act(() => {
        store.setChestSize('36');
      });
      expect(useAppStateStore.getState().chestSize).toBe('36');
      
      // User corrects the value
      act(() => {
        store.setChestSize('38');
      });
      expect(useAppStateStore.getState().chestSize).toBe('38');
    });

    it('should handle all common blouse sizes', () => {
      const commonSizes = ['28', '30', '32', '34', '36', '38', '40', '42', '44'];
      const store = useAppStateStore.getState();
      
      commonSizes.forEach(size => {
        act(() => {
          store.setChestSize(size);
        });
        expect(useAppStateStore.getState().chestSize).toBe(size);
      });
    });
  });
});

