"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Calendar,
  MessageSquare,
  Target,
  Heart,
  TrendingUp,
  X,
  Clock,
  AlertTriangle,
  Flame,
  UtensilsCrossed,
  Code,
} from "lucide-react"
import { ScheduleCompact, ScheduleExpanded } from "./panels/schedule-panel"
import { DirectivesCompact, DirectivesExpanded } from "./panels/directives-panel"
import { CommsCompact, CommsExpanded } from "./panels/comms-panel"
import { HealthCompact, HealthExpanded } from "./panels/health-panel"
import { ProgressCompact, ProgressExpanded } from "./panels/progress-panel"

/* ─────────────────────────────── types ─────────────────────────────── */
type PanelId = "schedule" | "comms" | "directives" | "health" | "progress"

/* ─────────────────────────── brief strip data ─────────────────────── */
const briefItems: {
  icon: React.ReactNode
  label: string
  critical?: boolean
  panelId?: PanelId
}[] = [
  { icon: <Clock className="size-3" />, label: "18:49 Sat, Feb 21", panelId: "schedule" },
  { icon: <Calendar className="size-3" />, label: "Dentist in 2h 15m", panelId: "schedule" },
  { icon: <AlertTriangle className="size-3" />, label: "3 overdue", critical: true, panelId: "directives" },
  { icon: <Flame className="size-3" />, label: "5-day workout streak", panelId: "health" },
  { icon: <UtensilsCrossed className="size-3" />, label: "Dinner: Tikka masala", panelId: "health" },
  { icon: <Code className="size-3" />, label: "3 dev tasks, 1 pipeline", panelId: "directives" },
]

/* ────────────────────────── corner brackets ────────────────────────── */
function Corners({ size = "h-3 w-3", weight = "border-l-2 border-t-2" }: { size?: string; weight?: string }) {
  return (
    <>
      <div className={cn("absolute -left-px -top-px", size, weight, "border-primary")} />
      <div className={cn("absolute -right-px -top-px", size, weight.replace("border-l", "border-r"), "border-primary")} />
      <div className={cn("absolute -bottom-px -left-px", size, weight.replace("border-t", "border-b"), "border-primary")} />
      <div className={cn("absolute -bottom-px -right-px", size, weight.replace("border-l", "border-r").replace("border-t", "border-b"), "border-primary")} />
    </>
  )
}

/* ──────────────────────── subtle grid overlay ─────────────────────── */
function GridOverlay({ opacity = "opacity-[0.02]" }: { opacity?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", opacity)}
      style={{
        backgroundImage:
          "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    />
  )
}

/* ─────────────────────── panel frame (reusable) ───────────────────── */
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
  id: PanelId
  title: string
  icon: React.ReactNode
  badge?: number | string
  children: React.ReactNode
  onHeaderClick: (id: PanelId) => void
  className?: string
  hero?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden border border-primary/20 bg-card/70 backdrop-blur-sm transition-all duration-200 hover:border-primary/40",
        hero && "glow-sm border-primary/30 bg-card/80",
        className
      )}
    >
      <Corners />
      <GridOverlay />

      {/* Header */}
      <button
        onClick={() => onHeaderClick(id)}
        className={cn(
          "relative z-10 flex w-full shrink-0 cursor-pointer items-center justify-between border-b border-primary/15 px-3 py-1.5 transition-colors hover:bg-primary/5",
          hero && "bg-primary/[0.03]"
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-primary">{icon}</span>
          <span className="font-display text-[9px] tracking-[0.15em] text-primary">{title}</span>
          {badge !== undefined && (
            <span className="inline-flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary/15 px-1 font-mono text-[8px] text-primary">
              {badge}
            </span>
          )}
        </div>
        <span className="font-mono text-[7px] tracking-wider text-muted-foreground/50">
          {"[ EXPAND ]"}
        </span>
      </button>

      {/* Body */}
      <div className="relative z-10 flex-1 overflow-hidden px-2.5 py-2">{children}</div>
    </div>
  )
}

/* ───────────────────────── modal overlay ───────────────────────────── */
function PanelModal({
  title,
  icon,
  badge,
  open,
  onClose,
  children,
}: {
  title: string
  icon?: React.ReactNode
  badge?: number | string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="relative h-[80vh] w-[80vw] max-w-[1400px] border border-primary/30 bg-card/95 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-2 fade-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corners */}
        <div className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-primary" />
        <div className="absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 border-primary" />
        <div className="absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-primary" />

        <GridOverlay />

        {/* Modal header */}
        <div className="relative z-10 flex items-center justify-between border-b border-primary/20 px-4 py-2">
          <div className="flex items-center gap-2">
            {icon && <span className="text-primary">{icon}</span>}
            <span className="font-display text-xs tracking-[0.15em] text-primary">{title}</span>
            {badge !== undefined && (
              <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/15 px-1 font-mono text-[9px] text-primary">
                {badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex size-6 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="relative z-10 h-[calc(100%-40px)] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  )
}

/* ══════════════════════════ MAIN DASHBOARD ══════════════════════════ */
export function OperatorAltDashboard() {
  const [modalPanel, setModalPanel] = React.useState<PanelId | null>(null)

  const openPanel = React.useCallback((id: PanelId) => setModalPanel(id), [])
  const closePanel = React.useCallback(() => setModalPanel(null), [])

  const modalConfig: Record<
    PanelId,
    { title: string; icon: React.ReactNode; badge?: number | string; content: React.ReactNode }
  > = {
    schedule: { title: "SCHEDULE", icon: <Calendar className="size-4" />, badge: 9, content: <ScheduleExpanded /> },
    directives: { title: "DIRECTIVES", icon: <Target className="size-4" />, badge: 7, content: <DirectivesExpanded /> },
    comms: { title: "COMMS", icon: <MessageSquare className="size-4" />, badge: 7, content: <CommsExpanded /> },
    health: { title: "HEALTH", icon: <Heart className="size-4" />, content: <HealthExpanded /> },
    progress: { title: "PROGRESS", icon: <TrendingUp className="size-4" />, content: <ProgressExpanded /> },
  }

  const activeModal = modalPanel ? modalConfig[modalPanel] : null

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background" data-theme="ares" data-tron-intensity="medium">
      {/* Full-screen grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── 1. BRIEF STRIP  40px ── */}
      <header className="relative z-10 h-10 shrink-0 border-b border-primary/25 bg-card/50 backdrop-blur-sm">
        <div className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-primary" />
        <div className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-primary" />

        <div className="flex h-full items-center gap-1 px-3">
          <span className="mr-2 hidden font-display text-[8px] tracking-[0.2em] text-primary sm:inline">
            {"TODAY'S BRIEF"}
          </span>
          <span className="mr-2 hidden h-3 w-px bg-primary/30 sm:inline-block" />

          <div className="flex flex-1 items-center gap-3 overflow-x-auto scrollbar-none sm:gap-4">
            {briefItems.map((item, i) => (
              <button
                key={i}
                onClick={() => item.panelId && openPanel(item.panelId)}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-1.5 font-mono text-[10px] tracking-wide transition-colors hover:text-primary",
                  item.critical ? "animate-pulse text-destructive" : "text-foreground/70"
                )}
              >
                <span className={cn(item.critical && "text-destructive")}>{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom accent glow */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </header>

      {/* ── 2. MAIN COCKPIT AREA ── */}
      <div className="relative z-10 flex flex-1 flex-col gap-1.5 overflow-hidden p-1.5 lg:gap-2 lg:p-2">

        {/* ─── Middle row: Schedule 20% | Directives 45% | Comms 35% ─── */}
        <div className="flex flex-1 flex-col gap-1.5 lg:flex-row lg:gap-2">
          {/* SCHEDULE — narrow left rail */}
          <HUDPanel
            id="schedule"
            title="SCHEDULE"
            icon={<Calendar className="size-3" />}
            badge={9}
            onHeaderClick={openPanel}
            className="order-2 lg:order-1 lg:w-[20%]"
          >
            <ScheduleCompact />
          </HUDPanel>

          {/* DIRECTIVES — hero center panel */}
          <HUDPanel
            id="directives"
            title="DIRECTIVES"
            icon={<Target className="size-3" />}
            badge={7}
            onHeaderClick={openPanel}
            className="order-1 lg:order-2 lg:w-[45%]"
            hero
          >
            <DirectivesCompact />
          </HUDPanel>

          {/* COMMS — right rail */}
          <HUDPanel
            id="comms"
            title="COMMS"
            icon={<MessageSquare className="size-3" />}
            badge={7}
            onHeaderClick={openPanel}
            className="order-3 lg:w-[35%]"
          >
            <CommsCompact />
          </HUDPanel>
        </div>

        {/* ─── Bottom bar: Health 60% | Progress 40%  ~120px ─── */}
        <div className="flex shrink-0 flex-col gap-1.5 lg:h-[120px] lg:flex-row lg:gap-2">
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

      {/* ── 3. FOOTER STATUS BAR  ~20px ── */}
      <footer className="relative z-10 shrink-0 border-t border-primary/15 bg-card/30 px-3 py-0.5">
        <div className="flex items-center justify-between font-mono text-[8px] tracking-wider text-muted-foreground">
          <span>OPERATOR v1.0</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_4px_theme(colors.green.500)]" />
              ALL SYSTEMS NOMINAL
            </span>
            <span className="text-primary/50">ARES PROTOCOL</span>
          </div>
        </div>
      </footer>

      {/* ── 4. MODAL ── */}
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
