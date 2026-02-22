"use client"

import { cn } from "@/lib/utils"
import {
  Flame,
  CheckCircle,
  ListChecks,
  Dumbbell,
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Star,
} from "lucide-react"

/* ─── data ─── */
interface ProgressStat {
  icon: React.ReactNode
  value: string | number
  label: string
  trend: "up" | "down" | "neutral"
  trendValue?: string
}

const stats: ProgressStat[] = [
  { icon: <Flame className="size-3.5" />, value: 45, label: "Longest Streak", trend: "up", trendValue: "+3" },
  { icon: <CheckCircle className="size-3.5" />, value: "78%", label: "Weekly Habits", trend: "up", trendValue: "+5%" },
  { icon: <ListChecks className="size-3.5" />, value: 14, label: "Directives Done", trend: "up", trendValue: "+2" },
  { icon: <Dumbbell className="size-3.5" />, value: 3, label: "Workout Days", trend: "neutral" },
]

const streakLeaderboard = [
  { habit: "Morning meditation", streak: 45, best: 45 },
  { habit: "Read 30 min", streak: 38, best: 42 },
  { habit: "8 glasses water", streak: 22, best: 30 },
  { habit: "No phone before 8am", streak: 18, best: 25 },
  { habit: "Walk 10k steps", streak: 12, best: 21 },
]

const weeklyCompletion = [
  { day: "Mon", rate: 90 },
  { day: "Tue", rate: 80 },
  { day: "Wed", rate: 100 },
  { day: "Thu", rate: 70 },
  { day: "Fri", rate: 85 },
  { day: "Sat", rate: 60 },
  { day: "Sun", rate: 0 },
]

const milestones = [
  { title: "50-day streak", progress: 90, icon: <Flame className="size-3" /> },
  { title: "100 directives", progress: 72, icon: <ListChecks className="size-3" /> },
  { title: "30 workout days", progress: 40, icon: <Dumbbell className="size-3" /> },
]

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up") return <TrendingUp className="size-2.5" />
  if (trend === "down") return <TrendingDown className="size-2.5" />
  return <Minus className="size-2.5" />
}

/* ═══════════════════════════ COMPACT ═══════════════════════════ */
export function ProgressCompact() {
  return (
    <div className="grid h-full grid-cols-4 gap-1.5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center gap-0.5 border border-border/20 bg-muted/5 px-1 py-1 text-center"
        >
          <span className="text-primary/80">{s.icon}</span>
          <span className="font-display text-base font-bold leading-none text-foreground">{s.value}</span>
          <span className="font-mono text-[7px] leading-tight text-muted-foreground/50">{s.label}</span>
          <span
            className={cn(
              "flex items-center gap-0.5 font-mono text-[9px] leading-none",
              s.trend === "up" && "text-green-400",
              s.trend === "down" && "text-red-400",
              s.trend === "neutral" && "text-muted-foreground/50"
            )}
          >
            <TrendIcon trend={s.trend} />
            {s.trendValue ?? "= same"}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════ EXPANDED ═══════════════════════════ */
export function ProgressExpanded() {
  return (
    <div className="space-y-4">
      {/* Headline stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1 border border-border/20 bg-muted/5 px-3 py-2 text-center">
            <span className="text-primary">{s.icon}</span>
            <span className="font-display text-xl font-bold text-foreground">{s.value}</span>
            <span className="font-mono text-[9px] text-muted-foreground">{s.label}</span>
            <span
              className={cn(
                "flex items-center gap-0.5 font-mono text-[10px]",
                s.trend === "up" && "text-green-400",
                s.trend === "down" && "text-red-400",
                s.trend === "neutral" && "text-muted-foreground"
              )}
            >
              <TrendIcon trend={s.trend} />
              {s.trendValue ?? "= same"}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Streak leaderboard */}
        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <Trophy className="size-3 text-primary" />
            <span className="font-display text-[10px] tracking-wider text-primary">STREAK LEADERBOARD</span>
          </div>
          <div className="space-y-1">
            {streakLeaderboard.map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-xs">
                <span
                  className={cn(
                    "flex size-4 shrink-0 items-center justify-center rounded text-[9px] font-bold",
                    i === 0 ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"
                  )}
                >
                  {i + 1}
                </span>
                <span className="truncate text-[11px] text-foreground/90">{item.habit}</span>
                <span className="ml-auto flex items-center gap-0.5 text-[10px] text-accent">
                  <Flame className="size-2.5" />
                  {item.streak}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly completion chart */}
        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <Star className="size-3 text-primary" />
            <span className="font-display text-[10px] tracking-wider text-primary">WEEKLY COMPLETION</span>
          </div>
          <div className="flex items-end gap-1.5">
            {weeklyCompletion.map((day, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
                <div className="relative h-16 w-full">
                  <div
                    className={cn(
                      "absolute bottom-0 w-full transition-all",
                      day.rate >= 80 ? "bg-primary/50" : day.rate >= 50 ? "bg-accent/30" : "bg-muted/30"
                    )}
                    style={{ height: `${Math.max(day.rate, 4)}%` }}
                  />
                </div>
                <span className="font-mono text-[8px] text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="mb-1.5 font-display text-[10px] tracking-wider text-primary">MILESTONES</div>
        <div className="grid grid-cols-3 gap-2">
          {milestones.map((m, i) => (
            <div key={i} className="space-y-1 border border-border/20 bg-muted/5 p-2">
              <div className="flex items-center gap-1 font-mono text-[10px] text-foreground/90">
                <span className="text-primary">{m.icon}</span>
                {m.title}
              </div>
              <div className="relative h-1.5 overflow-hidden bg-muted/20">
                <div className="h-full bg-primary/50 transition-all" style={{ width: `${m.progress}%` }} />
              </div>
              <div className="text-right font-mono text-[8px] text-muted-foreground">{m.progress}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
