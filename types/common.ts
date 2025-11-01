export interface SectionProps {
  activeSecondaryTab?: string;
}

export interface CheckboxCardData {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export interface NumberInputData {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  step?: number;
  unit?: string;
}

export interface StateValue {
  label: string;
  value: unknown;
}

export type SectionType = 'all' | 'front' | 'back' | 'hands';
export type SecondaryTabType = 'neck' | 'borders' | 'motifs' | 'fill-work' | 'others' | 'overview' | 'size';
