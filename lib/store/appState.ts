import { create } from 'zustand';

interface AppState {
  // Size measurements
  chestSize: string;
  armholeRound: string;
  handLength: string;
  handRound: string;

  // All Section
  allHasBorders: boolean;
  allBorderSize: string;
  allNeckType: string;
  allNeckDesignNumber: string;
  allNeckType2: string;
  allNeckType2DesignNumber: string;
  allHasFillWork: boolean;
  allCoverage: string;
  allHasMotifs: boolean;
  allMotifSize: string;
  allMotifCount: string;
  allSelectedTechniques: string[];
  allTechniquePercentages: Record<string, number>;

  // Front Section
  frontHasBorders: boolean;
  frontBorderSize: string;
  frontNeckType: string;
  frontNeckDesignNumber: string;

  
  frontNeckType2: string;
  frontNeckType2DesignNumber: string;
  frontHasFillWork: boolean;
  frontCoverage: string;
  frontHasMotifs: boolean;
  frontMotifSize: string;
  frontMotifCount: string;
  frontSelectedTechniques: string[];
  frontTechniquePercentages: Record<string, number>;

  // Back Section
  backHasBorders: boolean;
  backBorderSize: string;
  backNeckType: string;
  backNeckDesignNumber: string;
  backNeckType2: string;
  backNeckType2DesignNumber: string;
  backHasFillWork: boolean;
  backCoverage: string;
  backHasMotifs: boolean;
  backMotifSize: string;
  backMotifCount: string;
  backSelectedTechniques: string[];
  backTechniquePercentages: Record<string, number>;

  // Hands Section
  handsHasBorders: boolean;
  handsBorderSize: string;
  handsNeckType: string;
  handsNeckDesignNumber: string;
  handsSelectedDesign: string;
  handsHasFillWork: boolean;
  handsCoverage: string;
  handsHasMotifs: boolean;
  handsMotifSize: string;
  handsMotifCount: string;
  handsSelectedTechniques: string[];
  handsTechniquePercentages: Record<string, number>;

  // Size measurement setters
  setChestSize: (value: string) => void;
  setArmholeRound: (value: string) => void;
  setHandLength: (value: string) => void;
  setHandRound: (value: string) => void;

  // All Section setters
  setAllHasBorders: (value: boolean) => void;
  setAllBorderSize: (value: string) => void;
  setAllNeckType: (value: string) => void;
  setAllNeckDesignNumber: (value: string) => void;
  setAllNeckType2: (value: string) => void;
  setAllNeckType2DesignNumber: (value: string) => void;
  setAllHasFillWork: (value: boolean) => void;
  setAllCoverage: (value: string) => void;
  setAllHasMotifs: (value: boolean) => void;
  setAllMotifSize: (value: string) => void;
  setAllMotifCount: (value: string) => void;
  setAllSelectedTechniques: (techniques: string[]) => void;
  setAllTechniquePercentage: (technique: string, percentage: number) => void;

  // Front Section setters
  setFrontHasBorders: (value: boolean) => void;
  setFrontBorderSize: (value: string) => void;
  setFrontNeckType: (value: string) => void;
  setFrontNeckDesignNumber: (value: string) => void;
  setFrontNeckType2: (value: string) => void;
  setFrontNeckType2DesignNumber: (value: string) => void;
  setFrontHasFillWork: (value: boolean) => void;
  setFrontCoverage: (value: string) => void;
  setFrontHasMotifs: (value: boolean) => void;
  setFrontMotifSize: (value: string) => void;
  setFrontMotifCount: (value: string) => void;
  setFrontSelectedTechniques: (techniques: string[]) => void;
  setFrontTechniquePercentage: (technique: string, percentage: number) => void;

  // Back Section setters
  setBackHasBorders: (value: boolean) => void;
  setBackBorderSize: (value: string) => void;
  setBackNeckType: (value: string) => void;
  setBackNeckDesignNumber: (value: string) => void;
  setBackNeckType2: (value: string) => void;
  setBackNeckType2DesignNumber: (value: string) => void;
  setBackHasFillWork: (value: boolean) => void;
  setBackCoverage: (value: string) => void;
  setBackHasMotifs: (value: boolean) => void;
  setBackMotifSize: (value: string) => void;
  setBackMotifCount: (value: string) => void;
  setBackSelectedTechniques: (techniques: string[]) => void;
  setBackTechniquePercentage: (technique: string, percentage: number) => void;

  // Hands Section setters
  setHandsHasBorders: (value: boolean) => void;
  setHandsBorderSize: (value: string) => void;
  setHandsNeckType: (value: string) => void;
  setHandsNeckDesignNumber: (value: string) => void;
  setHandsSelectedDesign: (value: string) => void;
  setHandsHasFillWork: (value: boolean) => void;
  setHandsCoverage: (value: string) => void;
  setHandsHasMotifs: (value: boolean) => void;
  setHandsMotifSize: (value: string) => void;
  setHandsMotifCount: (value: string) => void;
  setHandsSelectedTechniques: (techniques: string[]) => void;
  setHandsTechniquePercentage: (technique: string, percentage: number) => void;

  // Reset function
  resetAll: () => void;
}

const initialState = {
  // Size measurements
  chestSize: '',
  armholeRound: '',
  handLength: '',
  handRound: '',

  // All Section
  allHasBorders: false,
  allBorderSize: '',
  allNeckType: '',
  allNeckDesignNumber: '',
  allNeckType2: '',
  allNeckType2DesignNumber: '',
  allHasFillWork: false,
  allCoverage: '',
  allHasMotifs: false,
  allMotifSize: '',
  allMotifCount: '',
  allSelectedTechniques: [],
  allTechniquePercentages: {},

  // Front Section
  frontHasBorders: false,
  frontBorderSize: '',
  frontNeckType: '',
  frontNeckDesignNumber: '',
  frontNeckType2: '',
  frontNeckType2DesignNumber: '',
  frontHasFillWork: false,
  frontCoverage: '',
  frontHasMotifs: false,
  frontMotifSize: '',
  frontMotifCount: '',
  frontSelectedTechniques: [],
  frontTechniquePercentages: {},

  // Back Section
  backHasBorders: false,
  backBorderSize: '',
  backNeckType: '',
  backNeckDesignNumber: '',
  backNeckType2: '',
  backNeckType2DesignNumber: '',
  backHasFillWork: false,
  backCoverage: '',
  backHasMotifs: false,
  backMotifSize: '',
  backMotifCount: '',
  backSelectedTechniques: [],
  backTechniquePercentages: {},

  // Hands Section
  handsHasBorders: false,
  handsBorderSize: '',
  handsNeckType: '',
  handsNeckDesignNumber: '',
  handsSelectedDesign: '',
  handsHasFillWork: false,
  handsCoverage: '',
  handsHasMotifs: false,
  handsMotifSize: '',
  handsMotifCount: '',
  handsSelectedTechniques: [],
  handsTechniquePercentages: {},
};

export const useAppStateStore = create<AppState>((set) => ({
  ...initialState,

  // Size measurement setters
  setChestSize: (value) => set({ chestSize: value }),
  setArmholeRound: (value) => set({ armholeRound: value }),
  setHandLength: (value) => set({ handLength: value }),
  setHandRound: (value) => set({ handRound: value }),

  // All Section setters
  setAllHasBorders: (value) => set({ allHasBorders: value }),
  setAllBorderSize: (value) => set({ allBorderSize: value }),
  setAllNeckType: (value) => set({ allNeckType: value }),
  setAllNeckDesignNumber: (value) => set({ allNeckDesignNumber: value }),
  setAllNeckType2: (value) => set({ allNeckType2: value }),
  setAllNeckType2DesignNumber: (value) => set({ allNeckType2DesignNumber: value }),
  setAllHasFillWork: (value) => set({ allHasFillWork: value }),
  setAllCoverage: (value) => set({ allCoverage: value }),
  setAllHasMotifs: (value) => set({ allHasMotifs: value }),
  setAllMotifSize: (value) => set({ allMotifSize: value }),
  setAllMotifCount: (value) => set({ allMotifCount: value }),
  setAllSelectedTechniques: (techniques) => set({ allSelectedTechniques: techniques }),
  setAllTechniquePercentage: (technique, percentage) => set((state) => ({
    allTechniquePercentages: { ...state.allTechniquePercentages, [technique]: percentage }
  })),

  // Front Section setters
  setFrontHasBorders: (value) => set({ frontHasBorders: value }),
  setFrontBorderSize: (value) => set({ frontBorderSize: value }),
  setFrontNeckType: (value) => set({ frontNeckType: value }),
  setFrontNeckDesignNumber: (value) => set({ frontNeckDesignNumber: value }),
  setFrontNeckType2: (value) => set({ frontNeckType2: value }),
  setFrontNeckType2DesignNumber: (value) => set({ frontNeckType2DesignNumber: value }),
  setFrontHasFillWork: (value) => set({ frontHasFillWork: value }),
  setFrontCoverage: (value) => set({ frontCoverage: value }),
  setFrontHasMotifs: (value) => set({ frontHasMotifs: value }),
  setFrontMotifSize: (value) => set({ frontMotifSize: value }),
  setFrontMotifCount: (value) => set({ frontMotifCount: value }),
  setFrontSelectedTechniques: (techniques) => set({ frontSelectedTechniques: techniques }),
  setFrontTechniquePercentage: (technique, percentage) => set((state) => ({
    frontTechniquePercentages: { ...state.frontTechniquePercentages, [technique]: percentage }
  })),

  // Back Section setters
  setBackHasBorders: (value) => set({ backHasBorders: value }),
  setBackBorderSize: (value) => set({ backBorderSize: value }),
  setBackNeckType: (value) => set({ backNeckType: value }),
  setBackNeckDesignNumber: (value) => set({ backNeckDesignNumber: value }),
  setBackNeckType2: (value) => set({ backNeckType2: value }),
  setBackNeckType2DesignNumber: (value) => set({ backNeckType2DesignNumber: value }),
  setBackHasFillWork: (value) => set({ backHasFillWork: value }),
  setBackCoverage: (value) => set({ backCoverage: value }),
  setBackHasMotifs: (value) => set({ backHasMotifs: value }),
  setBackMotifSize: (value) => set({ backMotifSize: value }),
  setBackMotifCount: (value) => set({ backMotifCount: value }),
  setBackSelectedTechniques: (techniques) => set({ backSelectedTechniques: techniques }),
  setBackTechniquePercentage: (technique, percentage) => set((state) => ({
    backTechniquePercentages: { ...state.backTechniquePercentages, [technique]: percentage }
  })),

  // Hands Section setters
  setHandsHasBorders: (value) => set({ handsHasBorders: value }),
  setHandsBorderSize: (value) => set({ handsBorderSize: value }),
  setHandsNeckType: (value) => set({ handsNeckType: value }),
  setHandsNeckDesignNumber: (value) => set({ handsNeckDesignNumber: value }),
  setHandsSelectedDesign: (value) => set({ handsSelectedDesign: value }),
  setHandsHasFillWork: (value) => set({ handsHasFillWork: value }),
  setHandsCoverage: (value) => set({ handsCoverage: value }),
  setHandsHasMotifs: (value) => set({ handsHasMotifs: value }),
  setHandsMotifSize: (value) => set({ handsMotifSize: value }),
  setHandsMotifCount: (value) => set({ handsMotifCount: value }),
  setHandsSelectedTechniques: (techniques) => set({ handsSelectedTechniques: techniques }),
  setHandsTechniquePercentage: (technique, percentage) => set((state) => ({
    handsTechniquePercentages: { ...state.handsTechniquePercentages, [technique]: percentage }
  })),

  // Reset function
  resetAll: () => set(initialState),
  resetTechniquesAndPercentages: () => set((state) => ({
    ...state,
    allSelectedTechniques: [],
    allTechniquePercentages: {},
    frontSelectedTechniques: [],
    frontTechniquePercentages: {},
    backSelectedTechniques: [],
    backTechniquePercentages: {},
    handsSelectedTechniques: [],
    handsTechniquePercentages: {},
  })),
}));