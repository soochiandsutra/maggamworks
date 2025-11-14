import { render, screen, act } from '@testing-library/react';
import FrontOverviewSection from '../FrontOverviewSection';
import { useAppStateStore } from '@/lib/store/appState';

// Mock the hooks
jest.mock('@/hooks/use-calculations', () => ({
  useCalculations: () => ({
    totalTime: 100,
    breakdown: {
      front: { total: 40, borders: 20, fillWork: 10, motifs: 10 },
      back: { total: 30, borders: 15, fillWork: 10, motifs: 5 },
      hands: { total: 30, borders: 10, fillWork: 10, motifs: 10 },
      all: { total: 100, borders: 45, fillWork: 30, motifs: 25 }
    }
  })
}));

describe('FrontOverviewSection - Front Neck Type Values', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useAppStateStore.getState();
    act(() => {
      store.setChestSize('36');
      store.setFrontNeckStyle('not selected');
    });
  });

  describe('Fixed neck type values', () => {
    it('should display Boat Neck value as 11', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('boat');
      });
      
      render(<FrontOverviewSection />);
      
      // Check if Boat Neck is displayed (appears in multiple places)
      expect(screen.getAllByText(/Boat Neck/)[0]).toBeInTheDocument();
      // Check if the value 11 is displayed
      expect(screen.getByText('11.00')).toBeInTheDocument();
    });

    it('should display Deep Neck value as 2', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('deep');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getAllByText(/Deep Neck/)[0]).toBeInTheDocument();
      expect(screen.getByText('22.00')).toBeInTheDocument();
    });

    it('should display Style 1 (Madubala Neck) value as 41.8', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('1');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('Style 1 (Madubala Neck)')).toBeInTheDocument();
      expect(screen.getByText('41.80')).toBeInTheDocument();
    });

    it('should display Style 2 (Patch Work) value as 33', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('2');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('Style 2 (Patch Work)')).toBeInTheDocument();
      expect(screen.getByText('33.00')).toBeInTheDocument();
    });

    it('should display Style 4 (V-Neck) value as 16.5', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('4');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('Style 4 (V-Neck)')).toBeInTheDocument();
      expect(screen.getByText('16.50')).toBeInTheDocument();
    });
  });

  describe('Style 3 (Bridal Neck) - Formula based calculation', () => {
    it('should calculate and display correct value for chest size 36', () => {
      // Formula: (2/5) * ((36 * 7) - 56) = (2/5) * 196 = 78.4
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('Style 3 (Bridal Neck)')).toBeInTheDocument();
      expect(screen.getByText('78.40')).toBeInTheDocument();
      
      // Should also display the formula
      expect(screen.getByText('(2/5) × ((chest size × 7) - 56)')).toBeInTheDocument();
    });

    it('should calculate and display correct value for chest size 28', () => {
      // Formula: (2/5) * ((28 * 7) - 56) = (2/5) * 140 = 56
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('28');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('Style 3 (Bridal Neck)')).toBeInTheDocument();
      expect(screen.getByText('56.00')).toBeInTheDocument();
    });

    it('should calculate and display correct value for chest size 32', () => {
      // Formula: (2/5) * ((32 * 7) - 56) = (2/5) * 168 = 67.2
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('32');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('67.20')).toBeInTheDocument();
    });

    it('should calculate and display correct value for chest size 40', () => {
      // Formula: (2/5) * ((40 * 7) - 56) = (2/5) * 224 = 89.6
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('40');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('89.60')).toBeInTheDocument();
    });

    it('should calculate and display correct value for chest size 44', () => {
      // Formula: (2/5) * ((44 * 7) - 56) = (2/5) * 252 = 100.8
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('44');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('100.80')).toBeInTheDocument();
    });

    it('should calculate and display correct value for odd chest size 35', () => {
      // Formula: (2/5) * ((35 * 7) - 56) = (2/5) * 189 = 75.6
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('35');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('75.60')).toBeInTheDocument();
    });

    it('should calculate and display correct value for decimal chest size 36.5', () => {
      // Formula: (2/5) * ((36.5 * 7) - 56) = (2/5) * 199.5 = 79.8
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36.5');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      expect(screen.getByText('79.80')).toBeInTheDocument();
    });

    it('should display formula details for Style 3', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('3');
      });
      
      const { container } = render(<FrontOverviewSection />);
      
      // Check that the formula text is present in the document
      expect(container.textContent).toContain('Formula');
      expect(container.textContent).toContain('(2/5) × ((chest size × 7) - 56)');
      expect(container.textContent).toContain('Chest Size');
      expect(container.textContent).toContain('78.40');
    });
  });

  describe('Formula verification - Style 3', () => {
    it('should verify formula for chest size 28: result 56.00', () => {
      const store = useAppStateStore.getState();
      act(() => {
        store.setChestSize('28');
        store.setFrontNeckStyle('3');
      });
      render(<FrontOverviewSection />);
      expect(screen.getByText('56.00')).toBeInTheDocument();
    });

    it('should verify formula for chest size 32: result 67.20', () => {
      const store = useAppStateStore.getState();
      act(() => {
        store.setChestSize('32');
        store.setFrontNeckStyle('3');
      });
      render(<FrontOverviewSection />);
      expect(screen.getByText('67.20')).toBeInTheDocument();
    });

    it('should verify formula for chest size 40: result 89.60', () => {
      const store = useAppStateStore.getState();
      act(() => {
        store.setChestSize('40');
        store.setFrontNeckStyle('3');
      });
      render(<FrontOverviewSection />);
      expect(screen.getByText('89.60')).toBeInTheDocument();
    });

    it('should verify formula for chest size 44: result 100.80', () => {
      const store = useAppStateStore.getState();
      act(() => {
        store.setChestSize('44');
        store.setFrontNeckStyle('3');
      });
      render(<FrontOverviewSection />);
      expect(screen.getByText('100.80')).toBeInTheDocument();
    });

    it('should match manual calculation exactly', () => {
      const chestSize = 36;
      const manualCalculation = (2 / 5) * ((chestSize * 7) - 56);
      
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      // The displayed value should match manual calculation
      expect(screen.getByText(manualCalculation.toFixed(2))).toBeInTheDocument();
    });
  });

  describe('Integration with different chest sizes', () => {
    it('should update Style 3 value when chest size changes', () => {
      const store = useAppStateStore.getState();
      
      // Start with chest size 28
      act(() => {
        store.setChestSize('28');
        store.setFrontNeckStyle('3');
      });
      
      const { container, rerender } = render(<FrontOverviewSection />);
      expect(container.textContent).toContain('56.00');
      
      // Change to chest size 36
      act(() => {
        store.setChestSize('36');
      });
      
      rerender(<FrontOverviewSection />);
      expect(container.textContent).toContain('78.40');
      
      // Change to chest size 44
      act(() => {
        store.setChestSize('44');
      });
      
      rerender(<FrontOverviewSection />);
      expect(container.textContent).toContain('100.80');
    });

    it('should maintain correct value when switching between neck styles', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('36');
        store.setFrontNeckStyle('boat');
      });
      
      const { rerender } = render(<FrontOverviewSection />);
      expect(screen.getByText('11.00')).toBeInTheDocument();
      
      // Switch to Style 3
      act(() => {
        store.setFrontNeckStyle('3');
      });
      
      rerender(<FrontOverviewSection />);
      expect(screen.getByText('78.40')).toBeInTheDocument();
      
      // Switch back to Style 1
      act(() => {
        store.setFrontNeckStyle('1');
      });
      
      rerender(<FrontOverviewSection />);
      expect(screen.getByText('41.80')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty chest size with default 36', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      // Should use default chest size 36: (2/5) * ((36 * 7) - 56) = 78.4
      expect(screen.getByText('78.40')).toBeInTheDocument();
    });

    it('should handle very small chest size', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('20');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      // Formula: (2/5) * ((20 * 7) - 56) = (2/5) * 84 = 33.6
      expect(screen.getByText('33.60')).toBeInTheDocument();
    });

    it('should handle very large chest size', () => {
      const store = useAppStateStore.getState();
      
      act(() => {
        store.setChestSize('50');
        store.setFrontNeckStyle('3');
      });
      
      render(<FrontOverviewSection />);
      
      // Formula: (2/5) * ((50 * 7) - 56) = (2/5) * 294 = 117.6
      expect(screen.getByText('117.60')).toBeInTheDocument();
    });
  });
});

