import { useMemo } from 'react';
import { useAppStateStore } from '@/lib/store/appState';
import { calculateTime } from '@/server/calculations';
import type { CalculationResult } from '@/server/calculations/types';

export function useCalculations(): CalculationResult {
  const store = useAppStateStore();

  return useMemo(() => {
    // Transform store state to calculation state format
    const calculationState = {
      chestSize: store.chestSize,
      armholeRound: store.armholeRound,
      handLength: store.handLength,
      handRound: store.handRound,
      all: store.all,
      front: store.front,
      back: store.back,
      hands: store.hands,
    };

    return calculateTime(calculationState);
  }, [store]);
}
