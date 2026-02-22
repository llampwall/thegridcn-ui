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
  completed?: boolean
}

const priorityConfig: Record<Priority, { dot: string; label: string }> = {
  critical: { dot: "bg-red-500", label: "CRIT" },
  high: { dot: "bg-orange-500", label: "HIGH" },
  medium: { dot: "bg-amber-500", label: "MED" },
  low: { dot: "bg-muted-foreground", label: "LOW" },
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

function getStalenessClass(days: number): string {
  if (days >= 15) return "border-l-red-500 bg-red-500/5"
  if (days >= 8) return "border-l-orange-500 bg-orange-500/5"
  if (days >= 4) return "border-l-amber-500 bg-amber-500/5"
  return "border-l-muted-foreground/30"
}

const directives: Directive[] = [
  { title: "File tax return", priority: "critical", category: "finance", staleDays: 18 },
  { title: "Fix kitchen tap", priority: "medium", category: "home", staleDays: 12 },
  { title: "Call Mum re: birthday", priority: "high", category: "social", staleDays: 2 },
  { title: "Book eye test", priority: "high", category: "health", staleDays: 9 },
  { title: "Renew car insurance", priority: "critical", category: "finance", staleDays: 5 },
  { title: "Order new running shoes", priority: "low", category: "shopping", staleDays: 3 },
  { title: "Update CV", priority: "medium", category: "work", staleDays: 14 },
  { title: "Set up standing order", priority: "medium", category: "finance", staleDays: 7 },
  { title: "Plan weekend trip", priority: "low", category: "personal", staleDays: 1 },
  { title: "Reply to landlord email", priority: "high", category: "home", staleDays: 4 },
  { title: "Meditation challenge", priority: "low", category: "personal", staleDays: 0 },
]

const completedDirectives: Directive[] = [
  { title: "Pay electricity bill", priority: "medium", category: "finance", staleDays: 0, completed: true },
  { title: "Dentist appointment booked", priority: "high", category: "health", staleDays: 0, completed: true },
  { title: "Weekly grocery order", priority: "low", category: "shopping", staleDays: 0, completed: true },
]

function DirectiveRow({ directive, compact = false }: { directive: Directive; compact?: boolean }) {
  const config = priorityConfig[directive.priority]
  return (
    <div className={cn(
      "flex items-center gap-2 border-l-2 font-mono text-xs",
      compact ? "py-0.5 pl-2" : "py-1.5 pl-2",
      directive.completed ? "border-l-green-500/30 opacity-50" : getStalenessClass(directive.staleDays),
      directive.staleDays >= 15 && !directive.completed && "glow-pulse"
    )}>
      <span className={cn("h-2 w-2 shrink-0 rounded-full", directive.completed ? "bg-green-500" : config.dot)} />
      <span className={cn(
        "truncate",
        directive.completed ? "text-muted-foreground line-through" : "text-foreground/90"
      )}>
        {directive.title}
      </span>
      {!compact && !directive.completed && (
        <span className="ml-auto shrink-0 text-[9px] text-muted-foreground">
          {config.label} {directive.staleDays > 0 && `· ${directive.staleDays}d`}
        </span>
      )}
    </div>
  )
}

export function DirectivesCompact() {
  const overdue = directives.filter(d => d.staleDays >= 8).length
  const critical = directives.filter(d => d.priority === "critical").length
  const stale = directives.filter(d => d.staleDays >= 4).length

  // Category counts
  const cats = directives.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sorted = [...directives].sort((a, b) => {
    const pOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 }
    return pOrder[a.priority] - pOrder[b.priority] || b.staleDays - a.staleDays
  })

  return (
    <div className="space-y-1.5">
      <div className="font-mono text-[10px] text-muted-foreground">
        <span className="text-destructive">{overdue} overdue</span>
        {" · "}
        <span className="text-red-400">{critical} critical</span>
        {" · "}
        <span className="text-amber-400">{stale} stale</span>
      </div>
      {sorted.slice(0, 3).map((d, i) => (
        <DirectiveRow key={i} directive={d} compact />
      ))}
      <div className="flex items-center justify-between pt-0.5">
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
  const sorted = [...directives].sort((a, b) => {
    const pOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 }
    return pOrder[a.priority] - pOrder[b.priority] || b.staleDays - a.staleDays
  })

  // Group by category
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
            {items.map((d, i) => (
              <div key={i} className="group flex items-center">
                <div className="flex-1">
                  <DirectiveRow directive={d} />
                </div>
                <button className="hidden shrink-0 px-1 text-muted-foreground transition-colors hover:text-primary group-hover:block">
                  <Clock className="size-3" />
                </button>
                <button className="hidden shrink-0 px-1 text-muted-foreground transition-colors hover:text-primary group-hover:block">
                  <ChevronRight className="size-3" />
                </button>
              </div>
            ))}
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
            <DirectiveRow key={i} directive={d} />
          ))}
        </div>
      )}
    </div>
  )
}
