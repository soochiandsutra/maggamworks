export interface SectionState {
  hasBorders: boolean | null;
  borderSize: number | null;
  hasBlouseBottom: boolean | null;
  blouseBottomSize: number | null;
  neckStyle: string;
  hasFillWork: boolean | null;
  coverage: number | null;
  hasMotifs: boolean | null;
  motifSizeX: number | null;
  motifSizeY: number | null;
  motifCount: string | null;
  selectedTechniques: string[] | null;
  techniquePercentages: Record<string, number> | null;
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
