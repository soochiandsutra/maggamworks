"use client";

import { Badge } from "@/components/ui/badge";

interface StateValueDisplayProps {
  label: string;
  value: unknown;
}

export function StateValueDisplay({ label, value }: StateValueDisplayProps) {
  const renderValue = () => {
    if (typeof value === 'boolean') {
      return (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? "true" : "false"}
        </Badge>
      );
    }
    if (typeof value === 'string' && value === '') {
      return <span className="text-muted-foreground italic">empty</span>;
    }
    if (typeof value === 'object' && value !== null) {
      return <span className="font-mono text-sm">{JSON.stringify(value)}</span>;
    }
    return <span className="font-mono">{String(value)}</span>;
  };

  return (
    <div className="flex justify-between">
      <span className="font-medium">{label}:</span>
      {renderValue()}
    </div>
  );
}
