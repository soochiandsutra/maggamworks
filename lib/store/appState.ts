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

  // Front Section
  frontHasBorders: boolean;
  frontBorderSize: string;
  frontNeckType: string;
  frontNeckDesignNumber: string;
  frontHasFillWork: boolean;
  frontCoverage: string;
  frontHasMotifs: boolean;
  frontMotifSize: string;
  frontMotifCount: string;
  frontSelectedTechniques: string[];

  // Back Section
  backHasBorders: boolean;
  backBorderSize: string;
  backNeckType: string;
  backNeckDesignNumber: string;
  backHasFillWork: boolean;
  backCoverage: string;
  backHasMotifs: boolean;
  backMotifSize: string;
  backMotifCount: string;
  backSelectedTechniques: string[];

  // Hands Section
  handsHasBorders: boolean;
  handsBorderSize: string;
  handsHasFillWork: boolean;
  handsCoverage: string;
  handsHasMotifs: boolean;
  handsMotifSize: string;
  handsMotifCount: string;
  handsSelectedTechniques: string[];

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

  // Front Section setters
  setFrontHasBorders: (value: boolean) => void;
  setFrontBorderSize: (value: string) => void;
  setFrontNeckType: (value: string) => void;
  setFrontNeckDesignNumber: (value: string) => void;
  setFrontHasFillWork: (value: boolean) => void;
  setFrontCoverage: (value: string) => void;
  setFrontHasMotifs: (value: boolean) => void;
  setFrontMotifSize: (value: string) => void;
  setFrontMotifCount: (value: string) => void;
  setFrontSelectedTechniques: (techniques: string[]) => void;

  // Back Section setters
  setBackHasBorders: (value: boolean) => void;
  setBackBorderSize: (value: string) => void;
  setBackNeckType: (value: string) => void;
  setBackNeckDesignNumber: (value: string) => void;
  setBackHasFillWork: (value: boolean) => void;
  setBackCoverage: (value: string) => void;
  setBackHasMotifs: (value: boolean) => void;
  setBackMotifSize: (value: string) => void;
  setBackMotifCount: (value: string) => void;
  setBackSelectedTechniques: (techniques: string[]) => void;

  // Hands Section setters
  setHandsHasBorders: (value: boolean) => void;
  setHandsBorderSize: (value: string) => void;
  setHandsHasFillWork: (value: boolean) => void;
  setHandsCoverage: (value: string) => void;
  setHandsHasMotifs: (value: boolean) => void;
  setHandsMotifSize: (value: string) => void;
  setHandsMotifCount: (value: string) => void;
  setHandsSelectedTechniques: (techniques: string[]) => void;

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

  // Front Section
  frontHasBorders: false,
  frontBorderSize: '',
  frontNeckType: '',
  frontNeckDesignNumber: '',
  frontHasFillWork: false,
  frontCoverage: '',
  frontHasMotifs: false,
  frontMotifSize: '',
  frontMotifCount: '',
  frontSelectedTechniques: [],

  // Back Section
  backHasBorders: false,
  backBorderSize: '',
  backNeckType: '',
  backNeckDesignNumber: '',
  backHasFillWork: false,
  backCoverage: '',
  backHasMotifs: false,
  backMotifSize: '',
  backMotifCount: '',
  backSelectedTechniques: [],

  // Hands Section
  handsHasBorders: false,
  handsBorderSize: '',
  handsHasFillWork: false,
  handsCoverage: '',
  handsHasMotifs: false,
  handsMotifSize: '',
  handsMotifCount: '',
  handsSelectedTechniques: [],
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

  // Front Section setters
  setFrontHasBorders: (value) => set({ frontHasBorders: value }),
  setFrontBorderSize: (value) => set({ frontBorderSize: value }),
  setFrontNeckType: (value) => set({ frontNeckType: value }),
  setFrontNeckDesignNumber: (value) => set({ frontNeckDesignNumber: value }),
  setFrontHasFillWork: (value) => set({ frontHasFillWork: value }),
  setFrontCoverage: (value) => set({ frontCoverage: value }),
  setFrontHasMotifs: (value) => set({ frontHasMotifs: value }),
  setFrontMotifSize: (value) => set({ frontMotifSize: value }),
  setFrontMotifCount: (value) => set({ frontMotifCount: value }),
  setFrontSelectedTechniques: (techniques) => set({ frontSelectedTechniques: techniques }),

  // Back Section setters
  setBackHasBorders: (value) => set({ backHasBorders: value }),
  setBackBorderSize: (value) => set({ backBorderSize: value }),
  setBackNeckType: (value) => set({ backNeckType: value }),
  setBackNeckDesignNumber: (value) => set({ backNeckDesignNumber: value }),
  setBackHasFillWork: (value) => set({ backHasFillWork: value }),
  setBackCoverage: (value) => set({ backCoverage: value }),
  setBackHasMotifs: (value) => set({ backHasMotifs: value }),
  setBackMotifSize: (value) => set({ backMotifSize: value }),
  setBackMotifCount: (value) => set({ backMotifCount: value }),
  setBackSelectedTechniques: (techniques) => set({ backSelectedTechniques: techniques }),

  // Hands Section setters
  setHandsHasBorders: (value) => set({ handsHasBorders: value }),
  setHandsBorderSize: (value) => set({ handsBorderSize: value }),
  setHandsHasFillWork: (value) => set({ handsHasFillWork: value }),
  setHandsCoverage: (value) => set({ handsCoverage: value }),
  setHandsHasMotifs: (value) => set({ handsHasMotifs: value }),
  setHandsMotifSize: (value) => set({ handsMotifSize: value }),
  setHandsMotifCount: (value) => set({ handsMotifCount: value }),
  setHandsSelectedTechniques: (techniques) => set({ handsSelectedTechniques: techniques }),

  // Reset function
  resetAll: () => set(initialState),
}));