"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { TimelineBar } from "@/components/thegridcn/timeline-bar"
import { Plus, Clock, Eye, EyeOff, ChevronRight, Target, AlertTriangle, Maximize2 } from "lucide-react"

type Priority = "critical" | "high" | "medium" | "low"
type Category = "finance" | "health" | "home" | "shopping" | "social" | "personal" | "work"

interface Directive {
  title: string
  priority: Priority
  category: Category
  staleDays: number
  dueDate?: string
  completed?: boolean
}

const priorityConfig: Record<Priority, { label: string; dotColor: string; badgeColor: string }> = {
  critical: { label: "CRIT", dotColor: "bg-red-500", badgeColor: "bg-red-500/20 text-red-400 border-red-500/30" },
  high: { label: "HIGH", dotColor: "bg-orange-500", badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  medium: { label: "MED", dotColor: "bg-amber-500", badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  low: { label: "LOW", dotColor: "bg-muted-foreground/40", badgeColor: "bg-muted/30 text-muted-foreground border-muted/30" },
}

const categoryLabels: Record<Category, string> = {
  finance: "FIN", health: "HLT", home: "HME",
  shopping: "SHP", social: "SOC", personal: "PER", work: "WRK",
}

function staleBorder(days: number) {
  if (days >= 15) return "border-l-red-500/80"
  if (days >= 8) return "border-l-orange-500/60"
  if (days >= 4) return "border-l-amber-500/40"
  return "border-l-transparent"
}

const directives: Directive[] = [
  { title: "File tax return", priority: "critical", category: "finance", staleDays: 18, dueDate: "Feb 28" },
  { title: "Renew car insurance", priority: "high", category: "finance", staleDays: 5 },
  { title: "Fix kitchen tap leak", priority: "medium", category: "home", staleDays: 12 },
  { title: "Return Amazon package", priority: "medium", category: "shopping", staleDays: 3, dueDate: "Feb 25" },
  { title: "Call Mum re: birthday", priority: "high", category: "social", staleDays: 2 },
  { title: "Plan anniversary dinner", priority: "high", category: "personal", staleDays: 0, dueDate: "Mar 12" },
  { title: "Get Caroline's present", priority: "medium", category: "personal", staleDays: 1 },
]

const completedDirectives: Directive[] = [
  { title: "Pay electricity bill", priority: "medium", category: "finance", staleDays: 0, completed: true },
  { title: "Dentist appointment booked", priority: "high", category: "health", staleDays: 0, completed: true },
  { title: "Weekly grocery order", priority: "low", category: "shopping", staleDays: 0, completed: true },
]

const sorted = [...directives].sort((a, b) => {
  const pOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 }
  return pOrder[a.priority] - pOrder[b.priority] || b.staleDays - a.staleDays
})

/** Directives inline panel */
export function DirectivesPanel({ onExpand }: { onExpand: () => void }) {
  const overdue = directives.filter((d) => d.staleDays >= 8).length
  const critical = directives.filter((d) => d.priority === "critical").length

  return (
    <div className="flex h-full flex-col">
      <UplinkHeader
        leftText="DIRECTIVES"
        variant="amber"
        rightText={
          <button onClick={onExpand} className="flex items-center gap-1 hover:text-amber-400 transition-colors">
            <span>EXPAND</span>
            <Maximize2 className="size-2.5" />
          </button>
        }
      />

      {/* Alert strip */}
      {(overdue > 0 || critical > 0) && (
        <div className="flex items-center gap-2 border-b border-red-500/20 bg-red-500/5 px-3 py-1 font-mono text-[9px]">
          <AlertTriangle className="size-3 text-red-400 animate-pulse" />
          <span className="text-red-400">{overdue} overdue</span>
          <span className="text-muted-foreground/40">|</span>
          <span className="text-red-400">{critical} critical</span>
          <span className="ml-auto text-muted-foreground/40">{directives.length} total</span>
        </div>
      )}

      {/* Directive list */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {sorted.map((d, i) => {
          const pc = priorityConfig[d.priority]
          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-2 border-b border-primary/[0.06] border-l-2 px-3 py-1.5 transition-all hover:bg-primary/5",
                staleBorder(d.staleDays),
                d.staleDays >= 15 && "glow-pulse"
              )}
            >
              <div className={cn("size-1.5 shrink-0 rounded-full", pc.dotColor)} />
              <span className="flex-1 truncate font-mono text-[11px] text-foreground/80">{d.title}</span>
              <span className={cn(
                "shrink-0 rounded border px-1 py-px font-mono text-[7px] font-bold tracking-wider",
                pc.badgeColor
              )}>
                {pc.label}
              </span>
              {d.staleDays > 0 && (
                <span className="shrink-0 font-mono text-[9px] tabular-nums text-muted-foreground/50">{d.staleDays}d</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Completion timeline */}
      <div className="border-t border-primary/10 px-3 py-1.5">
        <TimelineBar
          markers={[
            { id: "3", position: 30, active: true },
            { id: "7", position: 70 },
          ]}
          progress={30}
          leftLabel="3 DONE"
          rightLabel="7 REMAINING"
          className="text-[8px]"
        />
      </div>
    </div>
  )
}

/* ── Expanded ── */
export function DirectivesExpanded() {
  const [showCompleted, setShowCompleted] = React.useState(false)

  const grouped = sorted.reduce((acc, d) => {
    if (!acc[d.category]) acc[d.category] = []
    acc[d.category].push(d)
    return acc
  }, {} as Record<string, Directive[]>)

  return (
    <div className="space-y-4">
      {/* Header stats */}
      <div className="flex items-center gap-4 font-mono text-[10px]">
        <span className="text-foreground/90">{directives.length} open</span>
        <span className="text-destructive">{directives.filter((d) => d.staleDays >= 8).length} overdue</span>
        <span className="text-amber-400">{directives.filter((d) => d.staleDays >= 4 && d.staleDays < 8).length} stale</span>
        <button className="ml-auto flex items-center gap-1 rounded border border-primary/30 px-2 py-0.5 text-primary hover:bg-primary/10">
          <Plus className="size-3" />
          Add
        </button>
      </div>

      {/* Category groups */}
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <div className="mb-1.5 flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
              {categoryLabels[cat as Category]} - {cat}
            </span>
            <span className="h-px flex-1 bg-border/20" />
            <span className="font-mono text-[9px] text-muted-foreground">{items.length}</span>
          </div>
          <div className="space-y-0.5">
            {items.map((d, i) => {
              const pc = priorityConfig[d.priority]
              return (
                <div key={i} className="group flex items-center">
                  <div className={cn(
                    "flex flex-1 items-center gap-2 border-l-2 py-1.5 pl-3 font-mono text-xs",
                    staleBorder(d.staleDays),
                    d.staleDays >= 15 && "glow-pulse"
                  )}>
                    <div className={cn("size-2 shrink-0 rounded-full", pc.dotColor)} />
                    <span className="truncate text-foreground/80">{d.title}</span>
                    <span className={cn("ml-auto shrink-0 rounded border px-1 py-px text-[8px] font-bold", pc.badgeColor)}>
                      {pc.label}
                    </span>
                    {d.staleDays > 0 && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">{d.staleDays}d</span>
                    )}
                    {d.dueDate && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">{d.dueDate}</span>
                    )}
                  </div>
                  <button className="hidden shrink-0 px-1 text-muted-foreground hover:text-primary group-hover:block">
                    <Clock className="size-3" />
                  </button>
                  <button className="hidden shrink-0 px-1 text-muted-foreground hover:text-primary group-hover:block">
                    <ChevronRight className="size-3" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Completed */}
      <button
        onClick={() => setShowCompleted(!showCompleted)}
        className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground hover:text-primary"
      >
        {showCompleted ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
        {showCompleted ? "Hide" : "Show"} completed ({completedDirectives.length})
      </button>

      {showCompleted && (
        <div className="space-y-0.5 opacity-50">
          {completedDirectives.map((d, i) => (
            <div key={i} className="flex items-center gap-2 border-l-2 border-l-green-500/30 py-1 pl-3 font-mono text-xs">
              <div className="size-2 shrink-0 rounded-full bg-green-500" />
              <span className="truncate text-muted-foreground line-through">{d.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
