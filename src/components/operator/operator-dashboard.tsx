"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PanelModal } from "./operator-panel"
import { ScheduleRail } from "./panels/schedule-panel"
import { DirectivesPanel } from "./panels/directives-panel"
import { CommsPanel } from "./panels/comms-panel"
import { HealthPanel } from "./panels/health-panel"
import { ProgressPanel } from "./panels/progress-panel"
import { ScheduleExpanded } from "./panels/schedule-panel"
import { DirectivesExpanded } from "./panels/directives-panel"
import { CommsExpanded } from "./panels/comms-panel"
import { HealthExpanded } from "./panels/health-panel"
import { ProgressExpanded } from "./panels/progress-panel"
import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay"
import { StatusBar } from "@/components/thegridcn/status-bar"
import {
  Calendar,
  MessageSquare,
  Target,
  Heart,
  TrendingUp,
} from "lucide-react"

type PanelId = "schedule" | "comms" | "directives" | "health" | "progress"

/* ── Live Clock ────────────────────────────────────── */
function LiveClock() {
  const [now, setNow] = React.useState(new Date())

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const day = now.toLocaleDateString("en-US", { weekday: "long" })
  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const dayProgress = ((now.getHours() * 60 + now.getMinutes()) / 1440) * 100

  return (
    <div className="flex flex-col items-center justify-center py-3 lg:py-4">
      {/* Big time */}
      <div className="font-mono text-5xl font-light tracking-wider text-primary glow-text lg:text-7xl">
        {time}
      </div>
      {/* Day */}
      <div className="mt-1 font-display text-lg tracking-[0.3em] text-foreground/90 lg:text-xl">
        {day.toUpperCase()}
      </div>
      {/* Date */}
      <div className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
        {date.toUpperCase()}
      </div>
      {/* Day progress bar */}
      <div className="mt-3 w-full max-w-xs">
        <div className="relative h-1 overflow-hidden rounded-full bg-muted/40">
          <div
            className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all"
            style={{ width: `${dayProgress}%` }}
          />
          <div
            className="absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 bg-primary glow-sm"
            style={{ left: `${dayProgress}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[8px] tracking-widest text-muted-foreground/50">
          <span>00:00</span>
          <span className="text-primary/70">{Math.round(dayProgress)}% OF DAY</span>
          <span>23:59</span>
        </div>
      </div>
    </div>
  )
}

export function OperatorDashboard() {
  const [modalPanel, setModalPanel] = React.useState<PanelId | null>(null)

  const openPanel = React.useCallback((id: string) => {
    setModalPanel(id as PanelId)
  }, [])

  const closePanel = React.useCallback(() => {
    setModalPanel(null)
  }, [])

  const modalConfig: Record<
    PanelId,
    { title: string; icon: React.ReactNode; badge?: number | string; content: React.ReactNode }
  > = {
    schedule: {
      title: "SCHEDULE",
      icon: <Calendar className="size-4" />,
      badge: 9,
      content: <ScheduleExpanded />,
    },
    directives: {
      title: "DIRECTIVES",
      icon: <Target className="size-4" />,
      badge: 7,
      content: <DirectivesExpanded />,
    },
    comms: {
      title: "COMMS",
      icon: <MessageSquare className="size-4" />,
      badge: 7,
      content: <CommsExpanded />,
    },
    health: {
      title: "HEALTH",
      icon: <Heart className="size-4" />,
      content: <HealthExpanded />,
    },
    progress: {
      title: "PROGRESS",
      icon: <TrendingUp className="size-4" />,
      content: <ProgressExpanded />,
    },
  }

  const activeModal = modalPanel ? modalConfig[modalPanel] : null

  return (
    <div
      className="flex h-dvh flex-col overflow-hidden bg-background"
      data-theme="ares"
      data-tron-intensity="medium"
    >
      {/* Subtle scan overlay on the whole page */}
      <GridScanOverlay gridSize={80} scanSpeed={12} className="z-0" />

      {/* ════════ MAIN LAYOUT ════════
          Left: Schedule rail (full height, narrow)
          Right: Everything else stacked
      */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* ── LEFT: Schedule Rail ── */}
        <div className="hidden w-[220px] shrink-0 border-r border-primary/20 lg:block xl:w-[260px]">
          <ScheduleRail onExpand={() => openPanel("schedule")} />
        </div>

        {/* ── RIGHT: Main content area ── */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* ── ROW 1: Clock Hero ── */}
          <div className="relative shrink-0 border-b border-primary/20 bg-card/40">
            <LiveClock />
            {/* Accent glow line */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          </div>

          {/* ── ROW 2: Main grid (the meat) ── */}
          <div className="flex flex-1 overflow-hidden">

            {/* LEFT COLUMN: Directives (big) + Comms (compact) */}
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Directives -- takes ~65% of this column */}
              <div className="flex-[3] overflow-hidden border-b border-primary/20">
                <DirectivesPanel onExpand={() => openPanel("directives")} />
              </div>
              {/* Comms -- takes ~35% */}
              <div className="flex-[2] overflow-hidden">
                <CommsPanel onExpand={() => openPanel("comms")} />
              </div>
            </div>

            {/* RIGHT COLUMN: Progress (big, rewarding) + Health */}
            <div className="flex w-[280px] shrink-0 flex-col overflow-hidden border-l border-primary/20 xl:w-[340px]">
              {/* Progress -- top, visually dominant */}
              <div className="flex-[3] overflow-hidden border-b border-primary/20">
                <ProgressPanel onExpand={() => openPanel("progress")} />
              </div>
              {/* Health -- bottom strip */}
              <div className="flex-[2] overflow-hidden">
                <HealthPanel onExpand={() => openPanel("health")} />
              </div>
            </div>
          </div>

          {/* ── FOOTER STATUS BAR ── */}
          <StatusBar
            variant="default"
            className="shrink-0 border-t border-primary/20 bg-card/40 py-1"
            leftContent={
              <div className="flex items-center gap-3 font-mono text-[8px] tracking-wider">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  ALL SYSTEMS NOMINAL
                </span>
                <span className="text-muted-foreground/40">|</span>
                <span className="text-primary/60">ARES PROTOCOL ACTIVE</span>
              </div>
            }
            rightContent={
              <span className="font-mono text-[8px] tracking-wider text-muted-foreground/40">
                OPERATOR v2.0
              </span>
            }
          />
        </div>
      </div>

      {/* Mobile schedule toggle (visible on small screens) */}
      <button
        onClick={() => openPanel("schedule")}
        className="fixed bottom-4 left-4 z-30 flex size-10 items-center justify-center rounded-full border border-primary/50 bg-card/90 text-primary backdrop-blur-sm glow-sm lg:hidden"
        aria-label="Open schedule"
      >
        <Calendar className="size-4" />
      </button>

      {/* ════════ MODAL OVERLAY ════════ */}
      <PanelModal
        title={activeModal?.title ?? ""}
        icon={activeModal?.icon}
        badge={activeModal?.badge}
        open={modalPanel !== null}
        onClose={closePanel}
      >
        {activeModal?.content}
      </PanelModal>
    </div>
  )
}
