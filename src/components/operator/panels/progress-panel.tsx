"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { Radar } from "@/components/thegridcn/radar"
import { Stat } from "@/components/thegridcn/stat"
import {
  Flame,
  CheckCircle,
  ListChecks,
  Dumbbell,
  TrendingUp,
  Trophy,
  Star,
  Maximize2,
  Zap,
} from "lucide-react"

/* ── Data ── */
const streaks = [
  { habit: "Morning meditation", streak: 45, best: 45, isPersonalBest: true },
  { habit: "Read 30 min", streak: 38, best: 42, isPersonalBest: false },
  { habit: "8 glasses water", streak: 22, best: 30, isPersonalBest: false },
  { habit: "No phone before 8am", streak: 18, best: 25, isPersonalBest: false },
  { habit: "Walk 10k steps", streak: 12, best: 21, isPersonalBest: false },
]

const weekDays = [
  { day: "M", done: 9, total: 10 },
  { day: "T", done: 8, total: 10 },
  { day: "W", done: 10, total: 10 },
  { day: "T", done: 7, total: 10 },
  { day: "F", done: 9, total: 10 },
  { day: "S", done: 6, total: 10 },
  { day: "S", done: 0, total: 10 },
]

const milestones = [
  { title: "50-day streak", progress: 90, icon: <Flame className="size-3" /> },
  { title: "100 directives", progress: 72, icon: <ListChecks className="size-3" /> },
  { title: "30 gym sessions", progress: 40, icon: <Dumbbell className="size-3" /> },
]

/* ── SVG ring chart ── */
function RingChart({
  value,
  max,
  size = 80,
  strokeWidth = 6,
  label,
  sublabel,
  className,
}: {
  value: number
  max: number
  size?: number
  strokeWidth?: number
  label: string
  sublabel?: string
  className?: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.min(value / max, 1)
  const offset = circumference * (1 - pct)

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
          style={{ filter: "drop-shadow(0 0 4px var(--glow))" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-mono text-lg font-bold text-primary glow-text">{Math.round(pct * 100)}%</span>
      </div>
      <span className="mt-1 font-mono text-[8px] tracking-widest text-foreground/70">{label}</span>
      {sublabel && <span className="font-mono text-[7px] text-muted-foreground/50">{sublabel}</span>}
    </div>
  )
}

/** Progress panel -- visually rewarding, top-right of dashboard */
export function ProgressPanel({ onExpand }: { onExpand: () => void }) {
  const todayDone = 7
  const todayTotal = 10

  return (
    <div className="flex h-full flex-col">
      <UplinkHeader
        leftText="PROGRESS"
        variant="green"
        rightText={
          <button onClick={onExpand} className="flex items-center gap-1 hover:text-green-400 transition-colors">
            <span>EXPAND</span>
            <Maximize2 className="size-2.5" />
          </button>
        }
      />

      <div className="flex flex-1 flex-col overflow-hidden px-3 py-2">
        {/* Ring chart + today's score */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <RingChart value={todayDone} max={todayTotal} size={72} strokeWidth={5} label="TODAY" />
          </div>
          <div className="flex-1 space-y-1.5">
            <Stat label="STREAK" value={45} unit="days" direction="up" />
            <Stat label="HABITS" value="78%" direction="up" />
            <Stat label="TASKS" value="14" direction="neutral" />
          </div>
        </div>

        {/* Separator */}
        <div className="my-2 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

        {/* Mini streak leaderboard */}
        <div className="flex-1 overflow-hidden">
          <div className="mb-1 flex items-center gap-1">
            <Flame className="size-2.5 text-accent" />
            <span className="font-mono text-[8px] tracking-widest text-foreground/60">TOP STREAKS</span>
          </div>
          <div className="space-y-0.5">
            {streaks.slice(0, 4).map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 font-mono text-[10px]">
                <span className={cn(
                  "w-3 text-right text-[9px]",
                  i === 0 ? "text-accent font-bold" : "text-muted-foreground/50"
                )}>
                  {i + 1}
                </span>
                <span className="flex-1 truncate text-foreground/70">{s.habit}</span>
                <span className={cn(
                  "flex items-center gap-0.5 tabular-nums",
                  s.isPersonalBest ? "text-accent" : "text-foreground/50"
                )}>
                  {s.isPersonalBest && <Zap className="size-2" />}
                  {s.streak}d
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Week dots */}
        <div className="mt-auto flex justify-between pt-2">
          {weekDays.map((d, i) => {
            const pct = d.done / d.total
            return (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <div
                  className={cn(
                    "size-4 rounded-full border transition-all flex items-center justify-center",
                    pct === 1
                      ? "bg-green-500/30 border-green-500/60 glow-sm"
                      : pct > 0
                        ? "bg-primary/20 border-primary/40"
                        : "bg-muted/20 border-muted/30"
                  )}
                  style={
                    pct > 0 && pct < 1
                      ? {
                          background: `conic-gradient(var(--primary) ${pct * 360}deg, transparent ${pct * 360}deg)`,
                          opacity: 0.6,
                        }
                      : undefined
                  }
                >
                  {pct === 1 && <CheckCircle className="size-2.5 text-green-400" />}
                </div>
                <span className={cn(
                  "font-mono text-[7px]",
                  i === weekDays.length - 1 ? "text-muted-foreground/30" : "text-muted-foreground/50"
                )}>
                  {d.day}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Expanded ── */
export function ProgressExpanded() {
  return (
    <div className="space-y-5">
      {/* Hero stats row */}
      <div className="flex items-center justify-around">
        <div className="relative">
          <RingChart value={7} max={10} size={100} strokeWidth={7} label="TODAY" sublabel="7 of 10 done" />
        </div>
        <div className="relative">
          <RingChart value={49} max={70} size={100} strokeWidth={7} label="THIS WEEK" sublabel="49 of 70 done" />
        </div>
        <div className="space-y-2">
          <Stat label="LONGEST STREAK" value={45} unit="days" direction="up" />
          <Stat label="WEEKLY HABITS" value="78%" direction="up" />
          <Stat label="DIRECTIVES DONE" value={14} direction="up" />
          <Stat label="WORKOUT DAYS" value={3} direction="neutral" />
        </div>
      </div>

      {/* Radar for fun -- targets are habit completion */}
      <div className="flex items-center gap-6">
        <Radar
          size={160}
          sweepSpeed={4}
          targets={[
            { x: 30, y: 20, label: "MED" },
            { x: 70, y: 25, label: "READ" },
            { x: 25, y: 60, label: "H2O" },
            { x: 75, y: 70, label: "WALK" },
            { x: 50, y: 40, label: "GYM" },
          ]}
          className="shrink-0"
        />
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Trophy className="size-4 text-accent" />
            <span className="font-display text-sm tracking-wider text-primary">STREAK LEADERBOARD</span>
          </div>
          <div className="space-y-1.5">
            {streaks.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold",
                  i === 0 ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"
                )}>
                  {i + 1}
                </span>
                <span className="flex-1 truncate font-mono text-xs text-foreground/80">{s.habit}</span>
                <div className="flex items-center gap-1">
                  {s.isPersonalBest && <Zap className="size-3 text-accent" />}
                  <span className="font-mono text-xs text-accent">{s.streak}</span>
                  <span className="font-mono text-[9px] text-muted-foreground/50">/ {s.best}</span>
                </div>
                <div className="w-16 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                  <div className="h-full bg-accent/60 rounded-full" style={{ width: `${(s.streak / s.best) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly bar chart */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Star className="size-3 text-primary" />
          <span className="font-display text-xs tracking-wider text-primary">WEEKLY COMPLETION</span>
        </div>
        <div className="flex items-end gap-2">
          {weekDays.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[9px] text-foreground/60">{Math.round((d.done / d.total) * 100)}%</span>
              <div className="relative h-20 w-full rounded-t overflow-hidden bg-muted/20">
                <div
                  className={cn(
                    "absolute bottom-0 w-full rounded-t transition-all",
                    d.done === d.total ? "bg-green-500/50" : d.done > 0 ? "bg-primary/40" : "bg-muted/10"
                  )}
                  style={{ height: `${(d.done / d.total) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="mb-2 font-display text-xs tracking-wider text-primary">MILESTONES</div>
        <div className="grid grid-cols-3 gap-3">
          {milestones.map((m, i) => (
            <div key={i} className="space-y-1.5 border border-border/30 bg-muted/10 p-3">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/90">
                <span className="text-primary">{m.icon}</span>
                {m.title}
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-muted/30">
                <div
                  className="h-full rounded-full bg-primary/60 transition-all"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
              <div className="text-right font-mono text-[9px] text-muted-foreground">{m.progress}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
