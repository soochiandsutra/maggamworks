
// Coverage area calculations (approximate square inches based on garment measurements)
export function calculateCoverageArea(chestSize: number, section: string): number {
  const size = parseFloat(String(chestSize)) || 36; // default to 36 inches

  switch (section.toLowerCase()) {
    case 'front':
      return size * 8; // Front panel area
    case 'back':
      return size * 10; // Back panel area (slightly larger)
    case 'hands':
      return size * 1.5; // Sleeve area
    case 'all':
    default:
      return size * 20; // Total garment area
  }
}

export function calculateBorderLength(chestSize: number, section: string): number {
  const size = parseFloat(String(chestSize)) || 36;

  switch (section.toLowerCase()) {
    case 'front':
      return size * 2 + 16; // Front perimeter
    case 'back':
      return size * 2 + 16; // Back perimeter
    case 'hands':
      return size * 1.5; // Sleeve length
    case 'all':
    default:
      return (size * 4) + 32; // Total perimeter
  }
}
