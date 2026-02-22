"use client"

import { cn } from "@/lib/utils"
import { Flame, CheckCircle, ListChecks, Dumbbell, TrendingUp, TrendingDown, Trophy, Star } from "lucide-react"

interface ProgressStat {
  icon: React.ReactNode
  value: string | number
  label: string
  trend: "up" | "down" | "neutral"
  trendValue?: string
}

const stats: ProgressStat[] = [
  { icon: <Flame className="size-4" />, value: 45, label: "Longest Streak", trend: "up", trendValue: "+3" },
  { icon: <CheckCircle className="size-4" />, value: "78%", label: "Weekly Habits", trend: "up", trendValue: "+5%" },
  { icon: <ListChecks className="size-4" />, value: 14, label: "Directives Done", trend: "down", trendValue: "-2" },
  { icon: <Dumbbell className="size-4" />, value: 3, label: "Workout Days", trend: "neutral" },
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

function StatTile({ stat, compact = false }: { stat: ProgressStat; compact?: boolean }) {
  return (
    <div className={cn(
      "flex flex-col items-center rounded border border-border/30 bg-muted/20 text-center",
      compact ? "gap-0.5 px-2 py-1.5" : "gap-1 px-3 py-2"
    )}>
      <span className="text-primary">{stat.icon}</span>
      <div className="flex items-center gap-1">
        <span className={cn(
          "font-display font-bold text-foreground",
          compact ? "text-sm" : "text-lg"
        )}>
          {stat.value}
        </span>
        {stat.trend !== "neutral" && (
          <span className={cn(
            "flex items-center text-[9px]",
            stat.trend === "up" ? "text-green-400" : "text-red-400"
          )}>
            {stat.trend === "up" ? <TrendingUp className="size-2.5" /> : <TrendingDown className="size-2.5" />}
            {stat.trendValue}
          </span>
        )}
      </div>
      <span className="font-mono text-[9px] text-muted-foreground">{stat.label}</span>
    </div>
  )
}

export function ProgressCompact() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <StatTile key={i} stat={stat} compact />
      ))}
    </div>
  )
}

export function ProgressExpanded() {
  return (
    <div className="space-y-3">
      {/* Headline stats */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map((stat, i) => (
          <StatTile key={i} stat={stat} />
        ))}
      </div>

      {/* Two columns: streak leaderboard + weekly chart */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Streak leaderboard */}
        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <Trophy className="size-3 text-primary" />
            <span className="font-display text-[10px] tracking-wider text-primary">STREAK LEADERBOARD</span>
          </div>
          <div className="space-y-1">
            {streakLeaderboard.map((item, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-xs">
                <span className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded text-[9px] font-bold",
                  i === 0 ? "bg-accent/20 text-accent" : "bg-muted/30 text-muted-foreground"
                )}>
                  {i + 1}
                </span>
                <span className="truncate text-[11px] text-foreground/90">{item.habit}</span>
                <span className="ml-auto flex items-center gap-0.5 text-[10px] text-accent">
                  <Flame className="size-2.5" />{item.streak}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly completion chart (bar chart) */}
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
                      "absolute bottom-0 w-full rounded-t transition-all",
                      day.rate >= 80 ? "bg-primary/60" : day.rate >= 50 ? "bg-accent/40" : "bg-muted/40"
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
            <div key={i} className="space-y-1 rounded border border-border/30 bg-muted/10 p-2">
              <div className="flex items-center gap-1 font-mono text-[10px] text-foreground/90">
                <span className="text-primary">{m.icon}</span>
                {m.title}
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-muted/30">
                <div
                  className="h-full rounded-full bg-primary/60 transition-all"
                  style={{ width: `${m.progress}%` }}
                />
              </div>
              <div className="text-right font-mono text-[8px] text-muted-foreground">{m.progress}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
