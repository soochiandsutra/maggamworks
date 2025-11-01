"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
  title: string;
  description?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({
  title,
  description,
  icon,
  children,
  className = ""
}: SectionWrapperProps) {
  return (
    <div className={`grid gap-4 ${className}`}>
      <h3 className="font-semibold mb-3 flex items-center gap-2 text-base">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-2">
          {description}
        </p>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
