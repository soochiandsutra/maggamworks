// Time constants in minutes
export const STANDARD_START_TIME = 40; // mins (for fitting cloth and marking)

// Work type base times (in minutes per unit area, based on actual measurements)
export const WORK_TYPE_BASE_TIMES = {
  'challa-work': 12,        // Challa work - 12 mins
  'paani-work': 9.5,        // Paani work - 9.5 mins
  'chambu-filling': 7,      // Chambu filling - 7 mins
  'cutdana-filling': 7,     // Cutdana filling - 7 mins
  'lavangam-kuttu': 7.5,    // Lavangam kuttu - 7.5 mins
  'thread-filling': 8,      // Thread filling - 8 mins
  'zardosi-chain-stitch': 14, // Zardosi chain stitch - 14 mins
  'thread-knot-work': 21,   // Thread knot work - 21 mins
  'mirror-work': 7,         // Mirror - 7 mins
  'zarkan': 27,             // Zarkan - 27 mins
  'thread-roses': 30,       // Thread roses - 30 mins
  'zardosi-rose': 27,       // Zardosi rose - 27 mins
} as const;

// Technique time multipliers (relative multipliers for complexity)
export const TECHNIQUE_MULTIPLIERS = {
  'embroidery': 1.3,
  'applique': 1.2,
  'patchwork': 1.4,
  'beading': 1.5,
  'sequins': 1.6,
  'mirror-work': 1.4,
  'zari': 1.3,
  'thread-work': 1.2,
  'none': 1.0
} as const;

export type WorkType = keyof typeof WORK_TYPE_BASE_TIMES;
export type TechniqueType = keyof typeof TECHNIQUE_MULTIPLIERS;
