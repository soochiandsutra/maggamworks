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
  selectedDesign?: string;
}

export interface CalculationState {
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
}

export interface CalculationResult {
  totalTime: number;
  breakdown: {
    all: SectionTimeBreakdown;
    front: SectionTimeBreakdown;
    back: SectionTimeBreakdown;
    hands: SectionTimeBreakdown;
  };
  estimatedCost: number;
  hourlyRate: number;
}

export interface SectionTimeBreakdown {
  borders: number;
  fillWork: number;
  motifs: number;
  total: number;
}
