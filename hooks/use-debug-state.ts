import { useAppStateStore } from '@/lib/store/appState';
import type { StateValue } from '@/types/common';

export function useDebugState() {
  const store = useAppStateStore();

  const getStateValues = (): Record<string, StateValue[]> => {
    return {
      sizes: [
        { label: 'chestSize', value: store.chestSize },
        { label: 'armholeRound', value: store.armholeRound },
        { label: 'handLength', value: store.handLength },
        { label: 'handRound', value: store.handRound },
      ],
      all: [
        { label: 'allHasBorders', value: store.all.hasBorders },
        { label: 'allBorderSize', value: store.all.borderSize },
        { label: 'allNeckType', value: store.all.neckType },
        { label: 'allNeckDesignNumber', value: store.all.neckDesignNumber },
        { label: 'allNeckType2', value: store.all.neckType2 },
        { label: 'allNeckType2DesignNumber', value: store.all.neckType2DesignNumber },
        { label: 'allHasFillWork', value: store.all.hasFillWork },
        { label: 'allCoverage', value: store.all.coverage },
        { label: 'allHasMotifs', value: store.all.hasMotifs },
        { label: 'allMotifSizeX', value: store.all.motifSizeX },
        { label: 'allMotifSizeY', value: store.all.motifSizeY },
        { label: 'allMotifCount', value: store.all.motifCount },
        { label: 'allSelectedTechniques', value: store.all.selectedTechniques },
        { label: 'allTechniquePercentages', value: store.all.techniquePercentages },
      ],
      front: [
        { label: 'frontHasBorders', value: store.front.hasBorders },
        { label: 'frontBorderSize', value: store.front.borderSize },
        { label: 'frontNeckType', value: store.front.neckType },
        { label: 'frontNeckDesignNumber', value: store.front.neckDesignNumber },
        { label: 'frontNeckType2', value: store.front.neckType2 },
        { label: 'frontNeckType2DesignNumber', value: store.front.neckType2DesignNumber },
        { label: 'frontHasFillWork', value: store.front.hasFillWork },
        { label: 'frontCoverage', value: store.front.coverage },
        { label: 'frontHasMotifs', value: store.front.hasMotifs },
        { label: 'frontMotifSizeX', value: store.front.motifSizeX },
        { label: 'frontMotifSizeY', value: store.front.motifSizeY },
        { label: 'frontMotifCount', value: store.front.motifCount },
        { label: 'frontSelectedTechniques', value: store.front.selectedTechniques },
        { label: 'frontTechniquePercentages', value: store.front.techniquePercentages },
      ],
      back: [
        { label: 'backHasBorders', value: store.back.hasBorders },
        { label: 'backBorderSize', value: store.back.borderSize },
        { label: 'backNeckType', value: store.back.neckType },
        { label: 'backNeckDesignNumber', value: store.back.neckDesignNumber },
        { label: 'backNeckType2', value: store.back.neckType2 },
        { label: 'backNeckType2DesignNumber', value: store.back.neckType2DesignNumber },
        { label: 'backHasFillWork', value: store.back.hasFillWork },
        { label: 'backCoverage', value: store.back.coverage },
        { label: 'backHasMotifs', value: store.back.hasMotifs },
        { label: 'backMotifSizeX', value: store.back.motifSizeX },
        { label: 'backMotifSizeY', value: store.back.motifSizeY },
        { label: 'backMotifCount', value: store.back.motifCount },
        { label: 'backSelectedTechniques', value: store.back.selectedTechniques },
        { label: 'backTechniquePercentages', value: store.back.techniquePercentages },
      ],
      hands: [
        { label: 'handsHasBorders', value: store.hands.hasBorders },
        { label: 'handsBorderSize', value: store.hands.borderSize },
        { label: 'handsNeckType', value: store.hands.neckType },
        { label: 'handsNeckDesignNumber', value: store.hands.neckDesignNumber },
        { label: 'handsSelectedDesign', value: store.hands.selectedDesign },
        { label: 'handsHasFillWork', value: store.hands.hasFillWork },
        { label: 'handsCoverage', value: store.hands.coverage },
        { label: 'handsHasMotifs', value: store.hands.hasMotifs },
        { label: 'handsMotifSizeX', value: store.hands.motifSizeX },
        { label: 'handsMotifSizeY', value: store.hands.motifSizeY },
        { label: 'handsMotifCount', value: store.hands.motifCount },
        { label: 'handsSelectedTechniques', value: store.hands.selectedTechniques },
        { label: 'handsTechniquePercentages', value: store.hands.techniquePercentages },
      ],
    };
  };

  return {
    stateValues: getStateValues(),
    totalProperties: Object.keys(store).length,
  };
}
