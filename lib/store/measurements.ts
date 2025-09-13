import { create } from 'zustand';

interface MeasurementState {
  // Size measurements
  chestSize: string;
  armholeRound: string;
  handLength: string;
  handRound: string;

  // Actions
  setChestSize: (value: string) => void;
  setArmholeRound: (value: string) => void;
  setHandLength: (value: string) => void;
  setHandRound: (value: string) => void;
  resetMeasurements: () => void;
}

const initialState = {
  chestSize: '',
  armholeRound: '',
  handLength: '',
  handRound: '',
};

export const useMeasurementStore = create<MeasurementState>((set) => ({
  ...initialState,

  setChestSize: (value) => set({ chestSize: value }),
  setArmholeRound: (value) => set({ armholeRound: value }),
  setHandLength: (value) => set({ handLength: value }),
  setHandRound: (value) => set({ handRound: value }),

  resetMeasurements: () => set(initialState),
}));