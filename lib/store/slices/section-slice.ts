import { StateCreator } from 'zustand';

export interface SectionState {
  hasBorders: boolean;
  borderSize: number;
  hasBlouseBottom: boolean;
  blouseBottomSize: number;
  neckType: string;
  neckDesignNumber: string;
  neckType2: string;
  neckType2DesignNumber: string;
  hasFillWork: boolean;
  coverage: number;
  hasMotifs: boolean;
  motifSizeX: number;
  motifSizeY: number;
  motifCount: string;
  selectedTechniques: string[];
  techniquePercentages: Record<string, number>;

  // Hands specific
  selectedDesign?: string;
}

export interface SectionSlice extends SectionState {
  // Actions
  setHasBorders: (has: boolean) => void;
  setBorderSize: (size: number) => void;
  setHasBlouseBottom: (has: boolean) => void;
  setBlouseBottomSize: (size: number) => void;
  setNeckType: (type: string) => void;
  setNeckDesignNumber: (number: string) => void;
  setNeckType2: (type: string) => void;
  setNeckType2DesignNumber: (number: string) => void;
  setHasFillWork: (has: boolean) => void;
  setCoverage: (coverage: number) => void;
  setHasMotifs: (has: boolean) => void;
  setMotifSizeX: (size: number) => void;
  setMotifSizeY: (size: number) => void;
  setMotifCount: (count: string) => void;
  setSelectedTechniques: (techniques: string[]) => void;
  setTechniquePercentages: (percentages: Record<string, number>) => void;

  // Hands specific
  setSelectedDesign?: (design: string) => void;
}

export const createSectionSlice = (
  initialState: Partial<SectionState> = {}
): StateCreator<SectionSlice> => (set) => ({
  // Default initial state
  hasBorders: false,
  borderSize: 0,
  hasBlouseBottom: false,
  blouseBottomSize: 0,
  neckType: 'round',
  neckDesignNumber: '1',
  neckType2: 'none',
  neckType2DesignNumber: '1',
  hasFillWork: false,
  coverage: 50,
  hasMotifs: false,
  motifSizeX: 2,
  motifSizeY: 2,
  motifCount: '1',
  selectedTechniques: [],
  techniquePercentages: {},

  // Override with provided initial state
  ...initialState,

  // Actions
  setHasBorders: (has) => set({ hasBorders: has }),
  setBorderSize: (size) => set({ borderSize: size }),
  setHasBlouseBottom: (has) => set({ hasBlouseBottom: has }),
  setBlouseBottomSize: (size) => set({ blouseBottomSize: size }),
  setNeckType: (type) => set({ neckType: type }),
  setNeckDesignNumber: (number) => set({ neckDesignNumber: number }),
  setNeckType2: (type) => set({ neckType2: type }),
  setNeckType2DesignNumber: (number) => set({ neckType2DesignNumber: number }),
  setHasFillWork: (has) => set({ hasFillWork: has }),
  setCoverage: (coverage) => set({ coverage: coverage }),
  setHasMotifs: (has) => set({ hasMotifs: has }),
  setMotifSizeX: (size) => set({ motifSizeX: size }),
  setMotifSizeY: (size) => set({ motifSizeY: size }),
  setMotifCount: (count) => set({ motifCount: count }),
  setSelectedTechniques: (techniques) => set({ selectedTechniques: techniques }),
  setTechniquePercentages: (percentages) => set({ techniquePercentages: percentages }),
});
