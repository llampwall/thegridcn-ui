"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { BriefStrip } from "./brief-strip"
import { OperatorPanel } from "./operator-panel"
import { ScheduleCompact, ScheduleExpanded } from "./panels/schedule-panel"
import { CommsCompact, CommsExpanded } from "./panels/comms-panel"
import { DirectivesCompact, DirectivesExpanded } from "./panels/directives-panel"
import { HealthCompact, HealthExpanded } from "./panels/health-panel"
import { ProgressCompact, ProgressExpanded } from "./panels/progress-panel"
import {
  Calendar,
  MessageSquare,
  Target,
  Heart,
  TrendingUp,
} from "lucide-react"

type PanelId = "schedule" | "comms" | "directives" | "health" | "progress"

interface PanelConfig {
  id: PanelId
  title: string
  badge?: number | string
  icon: React.ReactNode
  compact: React.ReactNode
  expanded: React.ReactNode
}

const panels: PanelConfig[] = [
  {
    id: "schedule",
    title: "SCHEDULE",
    badge: 9,
    icon: <Calendar className="size-3.5" />,
    compact: <ScheduleCompact />,
    expanded: <ScheduleExpanded />,
  },
  {
    id: "comms",
    title: "COMMS",
    badge: 7,
    icon: <MessageSquare className="size-3.5" />,
    compact: <CommsCompact />,
    expanded: <CommsExpanded />,
  },
  {
    id: "directives",
    title: "DIRECTIVES",
    badge: 11,
    icon: <Target className="size-3.5" />,
    compact: <DirectivesCompact />,
    expanded: <DirectivesExpanded />,
  },
  {
    id: "health",
    title: "HEALTH",
    badge: undefined,
    icon: <Heart className="size-3.5" />,
    compact: <HealthCompact />,
    expanded: <HealthExpanded />,
  },
  {
    id: "progress",
    title: "PROGRESS",
    badge: undefined,
    icon: <TrendingUp className="size-3.5" />,
    compact: <ProgressCompact />,
    expanded: <ProgressExpanded />,
  },
]

export function OperatorDashboard() {
  const [expandedPanel, setExpandedPanel] = React.useState<PanelId | null>(null)

  const handleToggle = React.useCallback((id: string) => {
    setExpandedPanel((prev) => (prev === id ? null : (id as PanelId)))
  }, [])

  const handleBriefClick = React.useCallback((panelId: string) => {
    setExpandedPanel(panelId as PanelId)
  }, [])

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background" data-theme="ares" data-tron-intensity="medium">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Brief Strip */}
      <BriefStrip onItemClick={handleBriefClick} />

      {/* Panel Grid */}
      <div className={cn(
        "relative flex-1 p-2 transition-all duration-300 sm:p-3",
        expandedPanel ? "overflow-y-auto" : "overflow-hidden"
      )}>
        <div className={cn(
          "grid h-full gap-2 sm:gap-3",
          expandedPanel
            ? "grid-cols-1"
            : "grid-cols-2 grid-rows-[1fr_1fr_1fr] lg:grid-cols-3 lg:grid-rows-[1fr_1fr]"
        )}>
          {panels.map((panel) => {
            const isExpanded = expandedPanel === panel.id
            const isHidden = expandedPanel !== null && expandedPanel !== panel.id

            if (isHidden) return null

            return (
              <OperatorPanel
                key={panel.id}
                id={panel.id}
                title={panel.title}
                badge={panel.badge}
                icon={panel.icon}
                expanded={isExpanded}
                onToggle={handleToggle}
                compactContent={panel.compact}
                expandedContent={panel.expanded}
                className={cn(
                  panel.id === "progress" && !expandedPanel && "col-span-2 lg:col-span-1"
                )}
              />
            )
          })}
        </div>
      </div>

      {/* Bottom status line */}
      <div className="relative border-t border-primary/20 bg-card/40 px-3 py-1">
        <div className="flex items-center justify-between font-mono text-[9px] tracking-wider text-muted-foreground">
          <span>OPERATOR v1.0</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              ALL SYSTEMS NOMINAL
            </span>
            <span>ARES PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
