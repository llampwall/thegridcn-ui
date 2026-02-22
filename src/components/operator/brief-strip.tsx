"use client"

import { cn } from "@/lib/utils"
import {
  Clock,
  Calendar,
  AlertTriangle,
  Flame,
  UtensilsCrossed,
  Code,
} from "lucide-react"

interface BriefItem {
  icon: React.ReactNode
  label: string
  critical?: boolean
  panelId?: string
}

interface BriefStripProps {
  onItemClick?: (panelId: string) => void
}

const briefItems: BriefItem[] = [
  {
    icon: <Clock className="size-3" />,
    label: "18:49 Sat, Feb 21",
    panelId: "schedule",
  },
  {
    icon: <Calendar className="size-3" />,
    label: "Dentist in 2h 15m",
    panelId: "schedule",
  },
  {
    icon: <AlertTriangle className="size-3" />,
    label: "3 overdue",
    critical: true,
    panelId: "directives",
  },
  {
    icon: <Flame className="size-3" />,
    label: "5-day workout streak",
    panelId: "health",
  },
  {
    icon: <UtensilsCrossed className="size-3" />,
    label: "Dinner: Tikka masala",
    panelId: "health",
  },
  {
    icon: <Code className="size-3" />,
    label: "3 dev tasks, 1 pipeline",
    panelId: "directives",
  },
]

export function BriefStrip({ onItemClick }: BriefStripProps) {
  return (
    <div className="relative h-10 shrink-0 border-b border-primary/30 bg-card/60 backdrop-blur-sm">
      {/* Corner accents */}
      <div className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-primary" />
      <div className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-primary" />

      <div className="flex h-full items-center gap-1 px-3">
        <span className="mr-2 hidden font-display text-[8px] tracking-[0.2em] text-primary sm:inline">
          {"TODAY'S BRIEF"}
        </span>
        <span className="mr-2 hidden h-3 w-px bg-primary/40 sm:inline-block" />

        <div className="flex flex-1 items-center gap-3 overflow-x-auto scrollbar-none sm:gap-4">
          {briefItems.map((item, i) => (
            <button
              key={i}
              onClick={() => item.panelId && onItemClick?.(item.panelId)}
              className={cn(
                "flex shrink-0 cursor-pointer items-center gap-1.5 font-mono text-[10px] tracking-wide transition-colors hover:text-primary",
                item.critical
                  ? "animate-pulse text-destructive"
                  : "text-foreground/70"
              )}
            >
              <span className={cn(item.critical && "text-destructive")}>
                {item.icon}
              </span>
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom accent glow line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  )
}
