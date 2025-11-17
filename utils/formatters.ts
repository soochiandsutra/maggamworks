export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  return `${hours}h ${mins}m`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDimensions = (length: number, width?: number): string => {
  if (width !== undefined) {
    return `${length} × ${width} inches`;
  }
  return `${length} inches`;
};
