"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { BriefStrip } from "./brief-strip"
import { PanelModal } from "./operator-panel"
import { ScheduleCompact, ScheduleExpanded } from "./panels/schedule-panel"
import { CommsCompact, CommsExpanded } from "./panels/comms-panel"
import {
  DirectivesCompact,
  DirectivesExpanded,
} from "./panels/directives-panel"
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

/** Reusable HUD-style panel frame */
function HUDPanel({
  id,
  title,
  icon,
  badge,
  children,
  onHeaderClick,
  className,
  hero,
}: {
  id: string
  title: string
  icon: React.ReactNode
  badge?: number | string
  children: React.ReactNode
  onHeaderClick: (id: string) => void
  className?: string
  hero?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col border border-primary/30 bg-card/80 backdrop-blur-sm transition-all duration-200 hover:border-primary/50",
        hero && "glow-sm border-primary/40",
        className
      )}
    >
      {/* Corner brackets */}
      <div className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-primary" />
      <div className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-primary" />
      <div className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-primary" />
      <div className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-primary" />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Header (clickable) */}
      <button
        onClick={() => onHeaderClick(id)}
        className="relative flex w-full shrink-0 cursor-pointer items-center justify-between border-b border-primary/20 px-2.5 py-1 transition-colors hover:bg-primary/5"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-primary">{icon}</span>
          <span className="font-display text-[9px] tracking-[0.15em] text-primary">{title}</span>
          {badge !== undefined && (
            <span className="inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary/20 px-1 font-mono text-[8px] text-primary">
              {badge}
            </span>
          )}
        </div>
        <span className="font-mono text-[8px] text-muted-foreground/60">EXPAND</span>
      </button>

      {/* Content */}
      <div className="relative flex-1 overflow-hidden p-2">{children}</div>
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

  const handleBriefClick = React.useCallback(
    (panelId: string) => {
      setModalPanel(panelId as PanelId)
    },
    []
  )

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
      {/* Background grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Brief Strip -- 40px fixed top */}
      <BriefStrip onItemClick={handleBriefClick} />

      {/* ======= MAIN COCKPIT GRID ======= */}
      {/* Desktop: 3 col asymmetric (20% / 45% / 35%) + bottom bar */}
      {/* Mobile: stacked vertically */}
      <div className="relative flex flex-1 flex-col overflow-hidden p-1.5 lg:p-2">
        {/* --- TOP ROW: Schedule | Directives (hero) | Comms --- */}
        <div className="flex flex-1 flex-col gap-1.5 lg:flex-row lg:gap-2">
          {/* SCHEDULE -- narrow left rail */}
          <HUDPanel
            id="schedule"
            title="SCHEDULE"
            icon={<Calendar className="size-3" />}
            badge={9}
            onHeaderClick={openPanel}
            className="lg:w-[20%]"
          >
            <ScheduleCompact />
          </HUDPanel>

          {/* DIRECTIVES -- hero center panel, widest */}
          <HUDPanel
            id="directives"
            title="DIRECTIVES"
            icon={<Target className="size-3" />}
            badge={7}
            onHeaderClick={openPanel}
            className="lg:w-[45%]"
            hero
          >
            <DirectivesCompact />
          </HUDPanel>

          {/* COMMS -- right rail */}
          <HUDPanel
            id="comms"
            title="COMMS"
            icon={<MessageSquare className="size-3" />}
            badge={7}
            onHeaderClick={openPanel}
            className="lg:w-[35%]"
          >
            <CommsCompact />
          </HUDPanel>
        </div>

        {/* --- BOTTOM BAR: Health (60%) | Progress (40%) --- */}
        <div className="mt-1.5 flex h-[120px] shrink-0 flex-col gap-1.5 lg:mt-2 lg:flex-row lg:gap-2">
          <HUDPanel
            id="health"
            title="HEALTH"
            icon={<Heart className="size-3" />}
            onHeaderClick={openPanel}
            className="lg:w-[60%]"
          >
            <HealthCompact />
          </HUDPanel>

          <HUDPanel
            id="progress"
            title="PROGRESS"
            icon={<TrendingUp className="size-3" />}
            onHeaderClick={openPanel}
            className="lg:w-[40%]"
          >
            <ProgressCompact />
          </HUDPanel>
        </div>
      </div>

      {/* ======= FOOTER STATUS BAR ======= */}
      <div className="relative shrink-0 border-t border-primary/20 bg-card/40 px-3 py-0.5">
        <div className="flex items-center justify-between font-mono text-[8px] tracking-wider text-muted-foreground">
          <span>OPERATOR v1.0</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              ALL SYSTEMS NOMINAL
            </span>
            <span className="text-primary/60">ARES PROTOCOL</span>
          </div>
        </div>
      </div>

      {/* ======= MODAL OVERLAY ======= */}
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
