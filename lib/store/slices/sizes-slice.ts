import { StateCreator } from 'zustand';

export interface SizesSlice {
  // Size measurements
  chestSize: string;
  armholeRound: string;
  handLength: string;
  handRound: string;

  // Size actions
  setChestSize: (size: string) => void;
  setArmholeRound: (round: string) => void;
  setHandLength: (length: string) => void;
  setHandRound: (round: string) => void;
}

export const createSizesSlice: StateCreator<SizesSlice> = (set) => ({
  // Initial state
  chestSize: '36',
  armholeRound: '14',
  handLength: '18',
  handRound: '8',

  // Actions
  setChestSize: (size) => set({ chestSize: size }),
  setArmholeRound: (round) => set({ armholeRound: round }),
  setHandLength: (length) => set({ handLength: length }),
  setHandRound: (round) => set({ handRound: round }),
});
