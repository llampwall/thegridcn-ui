"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, X } from "lucide-react"

interface OperatorPanelProps {
  id: string
  title: string
  badge?: number | string
  icon?: React.ReactNode
  expanded: boolean
  onToggle: (id: string) => void
  compactContent: React.ReactNode
  expandedContent: React.ReactNode
  className?: string
}

export function OperatorPanel({
  id,
  title,
  badge,
  icon,
  expanded,
  onToggle,
  compactContent,
  expandedContent,
  className,
}: OperatorPanelProps) {
  return (
    <div
      data-panel={id}
      className={cn(
        "relative border border-primary/30 bg-card/80 backdrop-blur-sm transition-all duration-300",
        expanded && "col-span-full border-primary/50 glow-sm",
        !expanded && "hover:border-primary/50",
        className
      )}
    >
      {/* Corner brackets */}
      <div className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-primary" />
      <div className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-primary" />
      <div className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-primary" />
      <div className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-primary" />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header */}
      <button
        onClick={() => onToggle(id)}
        className="relative flex w-full cursor-pointer items-center justify-between border-b border-primary/20 px-3 py-1.5 transition-colors hover:bg-primary/5"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <span className="font-display text-[10px] tracking-[0.15em] text-primary">
            {title}
          </span>
          {badge !== undefined && (
            <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/20 px-1 font-mono text-[9px] text-primary">
              {badge}
            </span>
          )}
        </div>
        <span className="text-primary/60">
          {expanded ? (
            <X className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </span>
      </button>

      {/* Content */}
      <div className="relative">
        {expanded ? (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200 p-3">
            {expandedContent}
          </div>
        ) : (
          <div className="p-3">{compactContent}</div>
        )}
      </div>
    </div>
  )
}
