"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface NumberInputProps {
  id: string;
  label: string;
  value: number | null;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
}

export function NumberInput({
  id,
  label,
  value,
  onChange,
  placeholder = "0.0",
  min = 0,
  step = 0.1,
  unit = "",
  disabled = false
}: NumberInputProps) {
  return (
    <Card className="p-4 ring-1 border-border ring-border/30">
      <div className="space-y-3">
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {unit && `(${unit})`}
        </Label>
        <Input
          id={id}
          type="number"
          min={min}
          step={step}
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          className="h-10 text-sm"
          disabled={disabled}
        />
      </div>
    </Card>
  );
}
