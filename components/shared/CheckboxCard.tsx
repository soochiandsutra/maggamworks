"use client";

import { ReactNode } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface CheckboxCardProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function CheckboxCard({
  id,
  checked,
  onCheckedChange,
  label,
  children,
  className = "",
  disabled = false
}: CheckboxCardProps) {
  return (
    <Card className={`relative cursor-pointer p-4 ring-1 border-border ring-border/30 hover:border-primary/30 hover:bg-primary/2 transition-all ${className}`}>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        className="absolute right-4 top-4 h-5 w-5"
        disabled={disabled}
      />
      <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
        {label}
      </Label>
      {children && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </Card>
  );
}
