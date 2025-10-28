import { create } from 'zustand';

interface AppState {
  // Size measurements
  chestSize: string;
  armholeRound: string;
  handLength: string;
  handRound: string;

  // All Section
  allHasBorders: boolean;
  allBorderSize: number;
  allHasBlouseBottom: boolean;
  allBlouseBottomSize: number;
  allNeckType: string;
  allNeckDesignNumber: string;
  allNeckType2: string;
  allNeckType2DesignNumber: string;
  allHasFillWork: boolean;
  allCoverage: number;
  allHasMotifs: boolean;
  allMotifSizeX: number;
  allMotifSizeY: number;
  allMotifCount: string;
  allSelectedTechniques: string[];
  allTechniquePercentages: Record<string, number>;

  // Front Section
  frontHasBorders: boolean;
  frontBorderSize: number;
  frontHasBlouseBottom: boolean;
  frontBlouseBottomSize: number;
  frontNeckType: string;
  frontNeckDesignNumber: string;


  frontNeckType2: string;
  frontNeckType2DesignNumber: string;
  frontHasFillWork: boolean;
  frontCoverage: number;
  frontHasMotifs: boolean;
  frontMotifSizeX: number;
  frontMotifSizeY: number;
  frontMotifCount: string;
  frontSelectedTechniques: string[];
  frontTechniquePercentages: Record<string, number>;

  // Back Section
  backHasBorders: boolean;
  backBorderSize: number;
  backHasBlouseBottom: boolean;
  backBlouseBottomSize: number;
  backNeckType: string;
  backNeckDesignNumber: string;
  backNeckType2: string;
  backNeckType2DesignNumber: string;
  backHasFillWork: boolean;
  backCoverage: number;
  backHasMotifs: boolean;
  backMotifSizeX: number;
  backMotifSizeY: number;
  backMotifCount: string;
  backSelectedTechniques: string[];
  backTechniquePercentages: Record<string, number>;

  // Hands Section
  handsHasBorders: boolean;
  handsBorderSize: number;
  handsNeckType: string;
  handsNeckDesignNumber: string;
  handsSelectedDesign: string;
  handsHasFillWork: boolean;
  handsCoverage: number;
  handsHasMotifs: boolean;
  handsMotifSizeX: number;
  handsMotifSizeY: number;
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
  setAllBorderSize: (value: number) => void;
  setAllHasBlouseBottom: (value: boolean) => void;
  setAllBlouseBottomSize: (value: number) => void;
  setAllNeckType: (value: string) => void;
  setAllNeckDesignNumber: (value: string) => void;
  setAllNeckType2: (value: string) => void;
  setAllNeckType2DesignNumber: (value: string) => void;
  setAllHasFillWork: (value: boolean) => void;
  setAllCoverage: (value: number) => void;
  setAllHasMotifs: (value: boolean) => void;
  setAllMotifSizeX: (value: number) => void;
  setAllMotifSizeY: (value: number) => void;
  setAllMotifCount: (value: string) => void;
  setAllSelectedTechniques: (techniques: string[]) => void;
  setAllTechniquePercentage: (technique: string, percentage: number) => void;

  // Front Section setters
  setFrontHasBorders: (value: boolean) => void;
  setFrontBorderSize: (value: number) => void;
  setFrontHasBlouseBottom: (value: boolean) => void;
  setFrontBlouseBottomSize: (value: number) => void;
  setFrontNeckType: (value: string) => void;
  setFrontNeckDesignNumber: (value: string) => void;
  setFrontNeckType2: (value: string) => void;
  setFrontNeckType2DesignNumber: (value: string) => void;
  setFrontHasFillWork: (value: boolean) => void;
  setFrontCoverage: (value: number) => void;
  setFrontHasMotifs: (value: boolean) => void;
  setFrontMotifSizeX: (value: number) => void;
  setFrontMotifSizeY: (value: number) => void;
  setFrontMotifCount: (value: string) => void;
  setFrontSelectedTechniques: (techniques: string[]) => void;
  setFrontTechniquePercentage: (technique: string, percentage: number) => void;

  // Back Section setters
  setBackHasBorders: (value: boolean) => void;
  setBackBorderSize: (value: number) => void;
  setBackHasBlouseBottom: (value: boolean) => void;
  setBackBlouseBottomSize: (value: number) => void;
  setBackNeckType: (value: string) => void;
  setBackNeckDesignNumber: (value: string) => void;
  setBackNeckType2: (value: string) => void;
  setBackNeckType2DesignNumber: (value: string) => void;
  setBackHasFillWork: (value: boolean) => void;
  setBackCoverage: (value: number) => void;
  setBackHasMotifs: (value: boolean) => void;
  setBackMotifSizeX: (value: number) => void;
  setBackMotifSizeY: (value: number) => void;
  setBackMotifCount: (value: string) => void;
  setBackSelectedTechniques: (techniques: string[]) => void;
  setBackTechniquePercentage: (technique: string, percentage: number) => void;

  // Hands Section setters
  setHandsHasBorders: (value: boolean) => void;
  setHandsBorderSize: (value: number) => void;
  setHandsNeckType: (value: string) => void;
  setHandsNeckDesignNumber: (value: string) => void;
  setHandsSelectedDesign: (value: string) => void;
  setHandsHasFillWork: (value: boolean) => void;
  setHandsCoverage: (value: number) => void;
  setHandsHasMotifs: (value: boolean) => void;
  setHandsMotifSizeX: (value: number) => void;
  setHandsMotifSizeY: (value: number) => void;
  setHandsMotifCount: (value: string) => void;
  setHandsSelectedTechniques: (techniques: string[]) => void;
  setHandsTechniquePercentage: (technique: string, percentage: number) => void;

  // Reset function
  resetAll: () => void;

  // Global settings application
  applyAllSettingsToFront: () => void;
  applyAllSettingsToBack: () => void;
  applyAllSettingsToHands: () => void;
}

const initialState = {
  // Size measurements
  chestSize: '',
  armholeRound: '',
  handLength: '',
  handRound: '',

  // All Section
  allHasBorders: false,
  allBorderSize: 0,
  allHasBlouseBottom: false,
  allBlouseBottomSize: 0,
  allNeckType: '',
  allNeckDesignNumber: '',
  allNeckType2: '',
  allNeckType2DesignNumber: '',
  allHasFillWork: false,
  allCoverage: 0,
  allHasMotifs: false,
  allMotifSizeX: 0,
  allMotifSizeY: 0,
  allMotifCount: '',
  allSelectedTechniques: [],
  allTechniquePercentages: {},

  // Front Section
  frontHasBorders: false,
  frontBorderSize: 0,
  frontHasBlouseBottom: false,
  frontBlouseBottomSize: 0,
  frontNeckType: '',
  frontNeckDesignNumber: '',
  frontNeckType2: '',
  frontNeckType2DesignNumber: '',
  frontHasFillWork: false,
  frontCoverage: 0,
  frontHasMotifs: false,
  frontMotifSizeX: 0,
  frontMotifSizeY: 0,
  frontMotifCount: '',
  frontSelectedTechniques: [],
  frontTechniquePercentages: {},

  // Back Section
  backHasBorders: false,
  backBorderSize: 0,
  backHasBlouseBottom: false,
  backBlouseBottomSize: 0,
  backNeckType: '',
  backNeckDesignNumber: '',
  backNeckType2: '',
  backNeckType2DesignNumber: '',
  backHasFillWork: false,
  backCoverage: 0,
  backHasMotifs: false,
  backMotifSizeX: 0,
  backMotifSizeY: 0,
  backMotifCount: '',
  backSelectedTechniques: [],
  backTechniquePercentages: {},

  // Hands Section
  handsHasBorders: false,
  handsBorderSize: 0,
  handsNeckType: '',
  handsNeckDesignNumber: '',
  handsSelectedDesign: '',
  handsHasFillWork: false,
  handsCoverage: 0,
  handsHasMotifs: false,
  handsMotifSizeX: 0,
  handsMotifSizeY: 0,
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
  setAllHasBlouseBottom: (value) => set({ allHasBlouseBottom: value }),
  setAllBlouseBottomSize: (value) => set({ allBlouseBottomSize: value }),
  setAllNeckType: (value) => set({ allNeckType: value }),
  setAllNeckDesignNumber: (value) => set({ allNeckDesignNumber: value }),
  setAllNeckType2: (value) => set({ allNeckType2: value }),
  setAllNeckType2DesignNumber: (value) => set({ allNeckType2DesignNumber: value }),
  setAllHasFillWork: (value) => set({ allHasFillWork: value }),
  setAllCoverage: (value) => set({ allCoverage: value }),
  setAllHasMotifs: (value) => set({ allHasMotifs: value }),
  setAllMotifSizeX: (value) => set({ allMotifSizeX: value }),
  setAllMotifSizeY: (value) => set({ allMotifSizeY: value }),
  setAllMotifCount: (value) => set({ allMotifCount: value }),
  setAllSelectedTechniques: (techniques) => set({ allSelectedTechniques: techniques }),
  setAllTechniquePercentage: (technique, percentage) => set((state) => ({
    allTechniquePercentages: { ...state.allTechniquePercentages, [technique]: percentage }
  })),

  // Front Section setters
  setFrontHasBorders: (value) => set({ frontHasBorders: value }),
  setFrontBorderSize: (value) => set({ frontBorderSize: value }),
  setFrontHasBlouseBottom: (value) => set({ frontHasBlouseBottom: value }),
  setFrontBlouseBottomSize: (value) => set({ frontBlouseBottomSize: value }),
  setFrontNeckType: (value) => set({ frontNeckType: value }),
  setFrontNeckDesignNumber: (value) => set({ frontNeckDesignNumber: value }),
  setFrontNeckType2: (value) => set({ frontNeckType2: value }),
  setFrontNeckType2DesignNumber: (value) => set({ frontNeckType2DesignNumber: value }),
  setFrontHasFillWork: (value) => set({ frontHasFillWork: value }),
  setFrontCoverage: (value) => set({ frontCoverage: value }),
  setFrontHasMotifs: (value) => set({ frontHasMotifs: value }),
  setFrontMotifSizeX: (value) => set({ frontMotifSizeX: value }),
  setFrontMotifSizeY: (value) => set({ frontMotifSizeY: value }),
  setFrontMotifCount: (value) => set({ frontMotifCount: value }),
  setFrontSelectedTechniques: (techniques) => set({ frontSelectedTechniques: techniques }),
  setFrontTechniquePercentage: (technique, percentage) => set((state) => ({
    frontTechniquePercentages: { ...state.frontTechniquePercentages, [technique]: percentage }
  })),

  // Back Section setters
  setBackHasBorders: (value) => set({ backHasBorders: value }),
  setBackBorderSize: (value) => set({ backBorderSize: value }),
  setBackHasBlouseBottom: (value) => set({ backHasBlouseBottom: value }),
  setBackBlouseBottomSize: (value) => set({ backBlouseBottomSize: value }),
  setBackNeckType: (value) => set({ backNeckType: value }),
  setBackNeckDesignNumber: (value) => set({ backNeckDesignNumber: value }),
  setBackNeckType2: (value) => set({ backNeckType2: value }),
  setBackNeckType2DesignNumber: (value) => set({ backNeckType2DesignNumber: value }),
  setBackHasFillWork: (value) => set({ backHasFillWork: value }),
  setBackCoverage: (value) => set({ backCoverage: value }),
  setBackHasMotifs: (value) => set({ backHasMotifs: value }),
  setBackMotifSizeX: (value) => set({ backMotifSizeX: value }),
  setBackMotifSizeY: (value) => set({ backMotifSizeY: value }),
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
  setHandsMotifSizeX: (value) => set({ handsMotifSizeX: value }),
  setHandsMotifSizeY: (value) => set({ handsMotifSizeY: value }),
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

  // Global settings application functions
  applyAllSettingsToFront: () => set((state) => ({
    frontHasBorders: state.allHasBorders,
    frontBorderSize: state.allBorderSize,
    frontNeckType: state.allNeckType,
    frontNeckDesignNumber: state.allNeckDesignNumber,
    frontNeckType2: state.allNeckType2,
    frontNeckType2DesignNumber: state.allNeckType2DesignNumber,
    frontHasFillWork: state.allHasFillWork,
    frontCoverage: state.allCoverage,
    frontHasMotifs: state.allHasMotifs,
    frontMotifSizeX: state.allMotifSizeX,
    frontMotifSizeY: state.allMotifSizeY,
    frontMotifCount: state.allMotifCount,
    frontSelectedTechniques: [...state.allSelectedTechniques],
    frontTechniquePercentages: { ...state.allTechniquePercentages },
  })),
  applyAllSettingsToBack: () => set((state) => ({
    backHasBorders: state.allHasBorders,
    backBorderSize: state.allBorderSize,
    backNeckType: state.allNeckType,
    backNeckDesignNumber: state.allNeckDesignNumber,
    backNeckType2: state.allNeckType2,
    backNeckType2DesignNumber: state.allNeckType2DesignNumber,
    backHasFillWork: state.allHasFillWork,
    backCoverage: state.allCoverage,
    backHasMotifs: state.allHasMotifs,
    backMotifSizeX: state.allMotifSizeX,
    backMotifSizeY: state.allMotifSizeY,
    backMotifCount: state.allMotifCount,
    backSelectedTechniques: [...state.allSelectedTechniques],
    backTechniquePercentages: { ...state.allTechniquePercentages },
  })),
  applyAllSettingsToHands: () => set((state) => ({
    handsHasBorders: state.allHasBorders,
    handsBorderSize: state.allBorderSize,
    handsNeckType: state.allNeckType,
    handsNeckDesignNumber: state.allNeckDesignNumber,
    handsSelectedDesign: state.allNeckType,
    handsHasFillWork: state.allHasFillWork,
    handsCoverage: state.allCoverage,
    handsHasMotifs: state.allHasMotifs,
    handsMotifSizeX: state.allMotifSizeX,
    handsMotifSizeY: state.allMotifSizeY,
    handsMotifCount: state.allMotifCount,
    handsSelectedTechniques: [...state.allSelectedTechniques],
    handsTechniquePercentages: { ...state.allTechniquePercentages },
  })),
}));