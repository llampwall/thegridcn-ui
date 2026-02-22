"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface PanelModalProps {
  title: string
  icon?: React.ReactNode
  badge?: number | string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

/** Full-screen modal overlay for expanded panel content */
export function PanelModal({ title, icon, badge, open, onClose, children }: PanelModalProps) {
  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative h-[80vh] w-[80vw] border border-primary/40 bg-card/95 backdrop-blur-md animate-in slide-in-from-bottom-2 fade-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD corner brackets */}
        <div className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-primary" />
        <div className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-primary" />
        <div className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-primary" />

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/20 px-4 py-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            <span className="font-display text-xs tracking-[0.15em] text-primary">{title}</span>
            {badge !== undefined && (
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/20 px-1 font-mono text-[9px] text-primary">
                {badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex size-6 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-40px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
