"use client"

import { cn } from "@/lib/utils"
import { Plus, Clock, Eye, EyeOff, ChevronRight } from "lucide-react"
import * as React from "react"

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

const priorityConfig: Record<Priority, { label: string; color: string }> = {
  critical: { label: "CRIT", color: "bg-red-500/20 text-red-400" },
  high: { label: "HIGH", color: "bg-orange-500/20 text-orange-400" },
  medium: { label: "MED", color: "bg-amber-500/20 text-amber-400" },
  low: { label: "LOW", color: "bg-muted text-muted-foreground" },
}

const categoryEmojis: Record<Category, string> = {
  finance: "$",
  health: "+",
  home: "H",
  shopping: "S",
  social: "P",
  personal: "L",
  work: "W",
}

function staleDotColor(days: number): string {
  if (days >= 15) return "bg-red-500"
  if (days >= 8) return "bg-orange-500"
  if (days >= 4) return "bg-amber-500"
  if (days >= 1) return "bg-yellow-500"
  return "bg-muted-foreground/40"
}

function staleBorderColor(days: number): string {
  if (days >= 15) return "border-l-red-500"
  if (days >= 8) return "border-l-orange-500"
  if (days >= 4) return "border-l-amber-500"
  return "border-l-muted-foreground/20"
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

export function DirectivesCompact() {
  const overdue = directives.filter(d => d.staleDays >= 8).length
  const critical = directives.filter(d => d.priority === "critical").length
  const stale = directives.filter(d => d.staleDays >= 4).length

  const cats = directives.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="flex h-full flex-col">
      {/* Stats line */}
      <div className="mb-1.5 font-mono text-[10px]">
        <span className="text-destructive">{overdue} overdue</span>
        {" · "}
        <span className="text-red-400">{critical} critical</span>
        {" · "}
        <span className="text-amber-400">{stale} stale</span>
      </div>

      {/* Single-line directive rows */}
      <div className="flex-1 space-y-0">
        {sorted.map((d, i) => {
          const pc = priorityConfig[d.priority]
          return (
            <div
              key={i}
              className={cn(
                "flex items-center gap-1.5 border-l-2 py-[3px] pl-2 font-mono text-[11px] leading-tight",
                staleBorderColor(d.staleDays),
                d.staleDays >= 15 && "glow-pulse"
              )}
            >
              <div className={cn("h-1.5 w-1.5 shrink-0 rounded-full", staleDotColor(d.staleDays))} />
              <span className="truncate text-foreground/90">{d.title}</span>
              <span className={cn("ml-auto shrink-0 rounded px-1 py-px text-[8px] font-bold", pc.color)}>
                {pc.label}
              </span>
              {d.staleDays > 0 && (
                <span className="shrink-0 text-[9px] text-muted-foreground">{d.staleDays}d</span>
              )}
              {d.dueDate && (
                <span className="shrink-0 text-[9px] text-muted-foreground">{d.dueDate}</span>
              )}
              <button className="shrink-0 text-[9px] text-muted-foreground transition-colors hover:text-primary">
                Defer
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer with category breakdown + add button */}
      <div className="mt-auto flex items-center justify-between border-t border-border/20 pt-1.5">
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(cats).map(([cat, count]) => (
            <span key={cat} className="font-mono text-[9px] text-muted-foreground">
              {categoryEmojis[cat as Category]}{count}
            </span>
          ))}
        </div>
        <button className="flex size-5 items-center justify-center rounded border border-primary/30 text-primary transition-colors hover:bg-primary/10">
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  )
}

export function DirectivesExpanded() {
  const [showCompleted, setShowCompleted] = React.useState(false)

  const grouped = sorted.reduce((acc, d) => {
    if (!acc[d.category]) acc[d.category] = []
    acc[d.category].push(d)
    return acc
  }, {} as Record<string, Directive[]>)

  return (
    <div className="space-y-3">
      {/* Stats bar */}
      <div className="flex items-center gap-3 font-mono text-[10px]">
        <span className="text-foreground/90">{directives.length} open</span>
        <span className="text-destructive">{directives.filter(d => d.staleDays >= 8).length} overdue</span>
        <span className="text-amber-400">{directives.filter(d => d.staleDays >= 4 && d.staleDays < 8).length} stale</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-1 rounded border border-primary/30 px-2 py-0.5 text-primary transition-colors hover:bg-primary/10">
            <Plus className="size-3" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Category groups */}
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <div className="mb-1 flex items-center gap-1.5">
            <span className="font-mono text-[9px] font-bold uppercase text-primary">
              {categoryEmojis[cat as Category]} {cat}
            </span>
            <span className="h-px flex-1 bg-border/30" />
          </div>
          <div className="space-y-0.5">
            {items.map((d, i) => {
              const pc = priorityConfig[d.priority]
              return (
                <div key={i} className="group flex items-center">
                  <div className={cn(
                    "flex flex-1 items-center gap-2 border-l-2 py-1.5 pl-2 font-mono text-xs",
                    staleBorderColor(d.staleDays),
                    d.staleDays >= 15 && "glow-pulse"
                  )}>
                    <div className={cn("h-2 w-2 shrink-0 rounded-full", staleDotColor(d.staleDays))} />
                    <span className="truncate text-foreground/90">{d.title}</span>
                    <span className={cn("ml-auto shrink-0 rounded px-1 py-px text-[8px] font-bold", pc.color)}>
                      {pc.label}
                    </span>
                    {d.staleDays > 0 && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">{d.staleDays}d stale</span>
                    )}
                    {d.dueDate && (
                      <span className="shrink-0 text-[10px] text-muted-foreground">{d.dueDate}</span>
                    )}
                  </div>
                  <button className="hidden shrink-0 px-1 text-muted-foreground transition-colors hover:text-primary group-hover:block">
                    <Clock className="size-3" />
                  </button>
                  <button className="hidden shrink-0 px-1 text-muted-foreground transition-colors hover:text-primary group-hover:block">
                    <ChevronRight className="size-3" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Show completed toggle */}
      <button
        onClick={() => setShowCompleted(!showCompleted)}
        className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
      >
        {showCompleted ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
        {showCompleted ? "Hide" : "Show"} completed ({completedDirectives.length})
      </button>

      {showCompleted && (
        <div className="space-y-0.5 opacity-60">
          {completedDirectives.map((d, i) => (
            <div key={i} className="flex items-center gap-2 border-l-2 border-l-green-500/30 py-1 pl-2 font-mono text-xs">
              <div className="h-2 w-2 shrink-0 rounded-full bg-green-500" />
              <span className="truncate text-muted-foreground line-through">{d.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
