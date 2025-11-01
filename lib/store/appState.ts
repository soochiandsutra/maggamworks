import { create } from 'zustand';

interface SectionState {
  hasBorders: boolean;
  borderSize: number;
  hasBlouseBottom: boolean;
  blouseBottomSize: number;
  neckStyle: string;
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

interface AppState {
  // Size measurements
  chestSize: string;
  armholeRound: string;
  handLength: string;
  handRound: string;

  // All Section
  all: SectionState;

  // Front Section
  front: SectionState;

  // Back Section
  back: SectionState;

  // Hands Section
  hands: SectionState & { selectedDesign: string };

  // Actions
  setChestSize: (size: string) => void;
  setArmholeRound: (round: string) => void;
  setHandLength: (length: string) => void;
  setHandRound: (round: string) => void;

  // Section actions
  setAllHasBorders: (has: boolean) => void;
  setAllBorderSize: (size: number) => void;
  setAllHasBlouseBottom: (has: boolean) => void;
  setAllBlouseBottomSize: (size: number) => void;
  setAllNeckStyle: (style: string) => void;
  setAllHasFillWork: (has: boolean) => void;
  setAllCoverage: (coverage: number) => void;
  setAllHasMotifs: (has: boolean) => void;
  setAllMotifSizeX: (size: number) => void;
  setAllMotifSizeY: (size: number) => void;
  setAllMotifCount: (count: string) => void;
  setAllSelectedTechniques: (techniques: string[]) => void;
  setAllTechniquePercentages: (percentages: Record<string, number>) => void;

  setFrontHasBorders: (has: boolean) => void;
  setFrontBorderSize: (size: number) => void;
  setFrontHasBlouseBottom: (has: boolean) => void;
  setFrontBlouseBottomSize: (size: number) => void;
  setFrontNeckStyle: (style: string) => void;
  setFrontHasFillWork: (has: boolean) => void;
  setFrontCoverage: (coverage: number) => void;
  setFrontHasMotifs: (has: boolean) => void;
  setFrontMotifSizeX: (size: number) => void;
  setFrontMotifSizeY: (size: number) => void;
  setFrontMotifCount: (count: string) => void;
  setFrontSelectedTechniques: (techniques: string[]) => void;
  setFrontTechniquePercentages: (percentages: Record<string, number>) => void;

  setBackHasBorders: (has: boolean) => void;
  setBackBorderSize: (size: number) => void;
  setBackHasBlouseBottom: (has: boolean) => void;
  setBackBlouseBottomSize: (size: number) => void;
  setBackNeckStyle: (style: string) => void;
  setBackHasFillWork: (has: boolean) => void;
  setBackCoverage: (coverage: number) => void;
  setBackHasMotifs: (has: boolean) => void;
  setBackMotifSizeX: (size: number) => void;
  setBackMotifSizeY: (size: number) => void;
  setBackMotifCount: (count: string) => void;
  setBackSelectedTechniques: (techniques: string[]) => void;
  setBackTechniquePercentages: (percentages: Record<string, number>) => void;

  setHandsHasBorders: (has: boolean) => void;
  setHandsBorderSize: (size: number) => void;
  setHandsNeckStyle: (style: string) => void;
  setHandsSelectedDesign: (design: string) => void;
  setHandsHasFillWork: (has: boolean) => void;
  setHandsCoverage: (coverage: number) => void;
  setHandsHasMotifs: (has: boolean) => void;
  setHandsMotifSizeX: (size: number) => void;
  setHandsMotifSizeY: (size: number) => void;
  setHandsMotifCount: (count: string) => void;
  setHandsSelectedTechniques: (techniques: string[]) => void;
  setHandsTechniquePercentages: (percentages: Record<string, number>) => void;

}

export const useAppStateStore = create<AppState>((set) => ({
  // Size measurements
  chestSize: '36',
  armholeRound: '14',
  handLength: '18',
  handRound: '8',

  // All Section
  all: {
    hasBorders: true,
    borderSize: 0.5,
    hasBlouseBottom: false,
    blouseBottomSize: 0,
    neckStyle: 'not selected',
    hasFillWork: false,
    coverage: 50,
    hasMotifs: false,
    motifSizeX: 2,
    motifSizeY: 2,
    motifCount: '1',
    selectedTechniques: [],
    techniquePercentages: {},
  },

  // Front Section
  front: {
    hasBorders: false,
    borderSize: 0,
    hasBlouseBottom: false,
    blouseBottomSize: 0,
    neckStyle: 'not selected',
    hasFillWork: false,
    coverage: 50,
    hasMotifs: false,
    motifSizeX: 2,
    motifSizeY: 2,
    motifCount: '1',
    selectedTechniques: [],
    techniquePercentages: {},
  },

  // Back Section
  back: {
    hasBorders: false,
    borderSize: 0,
    hasBlouseBottom: false,
    blouseBottomSize: 0,
    neckStyle: 'not selected',
    hasFillWork: false,
    coverage: 50,
    hasMotifs: false,
    motifSizeX: 2,
    motifSizeY: 2,
    motifCount: '1',
    selectedTechniques: [],
    techniquePercentages: {},
  },

  // Hands Section
  hands: {
    hasBorders: false,
    borderSize: 0,
    hasBlouseBottom: false,
    blouseBottomSize: 0,
    neckStyle: 'not selected',
    hasFillWork: false,
    coverage: 30,
    hasMotifs: false,
    motifSizeX: 1.5,
    motifSizeY: 1.5,
    motifCount: '1',
    selectedTechniques: [],
    techniquePercentages: {},
    selectedDesign: 'simple',
  },

  // Size actions
  setChestSize: (size) => set({ chestSize: size }),
  setArmholeRound: (round) => set({ armholeRound: round }),
  setHandLength: (length) => set({ handLength: length }),
  setHandRound: (round) => set({ handRound: round }),

  // All section actions
  setAllHasBorders: (has) => set((state) => ({ all: { ...state.all, hasBorders: has } })),
  setAllBorderSize: (size) => set((state) => ({ all: { ...state.all, borderSize: size } })),
  setAllHasBlouseBottom: (has) => set((state) => ({ all: { ...state.all, hasBlouseBottom: has } })),
  setAllBlouseBottomSize: (size) => set((state) => ({ all: { ...state.all, blouseBottomSize: size } })),
  setAllNeckStyle: (style) => set((state) => ({ all: { ...state.all, neckStyle: style } })),
  setAllHasFillWork: (has) => set((state) => ({ all: { ...state.all, hasFillWork: has } })),
  setAllCoverage: (coverage) => set((state) => ({ all: { ...state.all, coverage: coverage } })),
  setAllHasMotifs: (has) => set((state) => ({ all: { ...state.all, hasMotifs: has } })),
  setAllMotifSizeX: (size) => set((state) => ({ all: { ...state.all, motifSizeX: size } })),
  setAllMotifSizeY: (size) => set((state) => ({ all: { ...state.all, motifSizeY: size } })),
  setAllMotifCount: (count) => set((state) => ({ all: { ...state.all, motifCount: count } })),
  setAllSelectedTechniques: (techniques) => set((state) => ({ all: { ...state.all, selectedTechniques: techniques } })),
  setAllTechniquePercentages: (percentages) => set((state) => ({ all: { ...state.all, techniquePercentages: percentages } })),

  // Front section actions
  setFrontHasBorders: (has) => set((state) => ({ front: { ...state.front, hasBorders: has } })),
  setFrontBorderSize: (size) => set((state) => ({ front: { ...state.front, borderSize: size } })),
  setFrontHasBlouseBottom: (has) => set((state) => ({ front: { ...state.front, hasBlouseBottom: has } })),
  setFrontBlouseBottomSize: (size) => set((state) => ({ front: { ...state.front, blouseBottomSize: size } })),
  setFrontNeckStyle: (style) => set((state) => ({ front: { ...state.front, neckStyle: style } })),
  setFrontHasFillWork: (has) => set((state) => ({ front: { ...state.front, hasFillWork: has } })),
  setFrontCoverage: (coverage) => set((state) => ({ front: { ...state.front, coverage: coverage } })),
  setFrontHasMotifs: (has) => set((state) => ({ front: { ...state.front, hasMotifs: has } })),
  setFrontMotifSizeX: (size) => set((state) => ({ front: { ...state.front, motifSizeX: size } })),
  setFrontMotifSizeY: (size) => set((state) => ({ front: { ...state.front, motifSizeY: size } })),
  setFrontMotifCount: (count) => set((state) => ({ front: { ...state.front, motifCount: count } })),
  setFrontSelectedTechniques: (techniques) => set((state) => ({ front: { ...state.front, selectedTechniques: techniques } })),
  setFrontTechniquePercentages: (percentages) => set((state) => ({ front: { ...state.front, techniquePercentages: percentages } })),

  // Back section actions
  setBackHasBorders: (has) => set((state) => ({ back: { ...state.back, hasBorders: has } })),
  setBackBorderSize: (size) => set((state) => ({ back: { ...state.back, borderSize: size } })),
  setBackHasBlouseBottom: (has) => set((state) => ({ back: { ...state.back, hasBlouseBottom: has } })),
  setBackBlouseBottomSize: (size) => set((state) => ({ back: { ...state.back, blouseBottomSize: size } })),
  setBackNeckStyle: (style) => set((state) => ({ back: { ...state.back, neckStyle: style } })),
  setBackHasFillWork: (has) => set((state) => ({ back: { ...state.back, hasFillWork: has } })),
  setBackCoverage: (coverage) => set((state) => ({ back: { ...state.back, coverage: coverage } })),
  setBackHasMotifs: (has) => set((state) => ({ back: { ...state.back, hasMotifs: has } })),
  setBackMotifSizeX: (size) => set((state) => ({ back: { ...state.back, motifSizeX: size } })),
  setBackMotifSizeY: (size) => set((state) => ({ back: { ...state.back, motifSizeY: size } })),
  setBackMotifCount: (count) => set((state) => ({ back: { ...state.back, motifCount: count } })),
  setBackSelectedTechniques: (techniques) => set((state) => ({ back: { ...state.back, selectedTechniques: techniques } })),
  setBackTechniquePercentages: (percentages) => set((state) => ({ back: { ...state.back, techniquePercentages: percentages } })),

  // Hands section actions
  setHandsHasBorders: (has) => set((state) => ({ hands: { ...state.hands, hasBorders: has } })),
  setHandsBorderSize: (size) => set((state) => ({ hands: { ...state.hands, borderSize: size } })),
  setHandsNeckStyle: (style) => set((state) => ({ hands: { ...state.hands, neckStyle: style } })),
  setHandsSelectedDesign: (design) => set((state) => ({ hands: { ...state.hands, selectedDesign: design } })),
  setHandsHasFillWork: (has) => set((state) => ({ hands: { ...state.hands, hasFillWork: has } })),
  setHandsCoverage: (coverage) => set((state) => ({ hands: { ...state.hands, coverage: coverage } })),
  setHandsHasMotifs: (has) => set((state) => ({ hands: { ...state.hands, hasMotifs: has } })),
  setHandsMotifSizeX: (size) => set((state) => ({ hands: { ...state.hands, motifSizeX: size } })),
  setHandsMotifSizeY: (size) => set((state) => ({ hands: { ...state.hands, motifSizeY: size } })),
  setHandsMotifCount: (count) => set((state) => ({ hands: { ...state.hands, motifCount: count } })),
  setHandsSelectedTechniques: (techniques) => set((state) => ({ hands: { ...state.hands, selectedTechniques: techniques } })),
  setHandsTechniquePercentages: (percentages) => set((state) => ({ hands: { ...state.hands, techniquePercentages: percentages } })),
}));
