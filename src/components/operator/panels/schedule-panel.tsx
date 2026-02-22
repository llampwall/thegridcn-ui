"use client"

import { cn } from "@/lib/utils"
import { Calendar, MapPin, Clock, Video } from "lucide-react"

interface EventItem {
  time: string
  title: string
  location?: string
  category: "health" | "work" | "personal" | "social"
  conflict?: boolean
  icon?: React.ReactNode
}

const categoryColors: Record<string, string> = {
  health: "bg-green-500",
  work: "bg-blue-500",
  personal: "bg-amber-500",
  social: "bg-pink-500",
}

const todayEvents: EventItem[] = [
  { time: "10:30", title: "Dentist", location: "Dr. Kim's", category: "health" },
  { time: "13:00", title: "Deep work block", category: "work" },
  { time: "15:00", title: "1:1 with Alex", location: "Meet", category: "work", icon: <Video className="size-3" /> },
  { time: "16:30", title: "Grocery run", location: "Tesco", category: "personal" },
  { time: "18:00", title: "Gym - Push Day", location: "PureGym", category: "health" },
  { time: "19:30", title: "Dinner with Mum", location: "Home", category: "social" },
]

const tomorrowEvents: EventItem[] = [
  { time: "09:00", title: "Sprint Planning", location: "Zoom", category: "work", icon: <Video className="size-3" /> },
  { time: "11:00", title: "Code review", category: "work" },
  { time: "14:00", title: "Walk in the park", category: "personal" },
]

function EventRow({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 font-mono text-xs",
      compact ? "py-0.5" : "py-1.5 border-b border-border/20 last:border-0"
    )}>
      <div className={cn("h-1.5 w-1.5 shrink-0 rounded-full", categoryColors[event.category])} />
      <span className="w-10 shrink-0 text-[10px] text-muted-foreground">{event.time}</span>
      <span className="truncate text-foreground/90">{event.title}</span>
      {event.location && !compact && (
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
          {event.icon || <MapPin className="size-2.5" />}
          {event.location}
        </span>
      )}
      {compact && event.location && (
        <span className="text-[10px] text-muted-foreground">{"·"} {event.location}</span>
      )}
    </div>
  )
}

export function ScheduleCompact() {
  return (
    <div className="space-y-1">
      {todayEvents.slice(0, 3).map((event, i) => (
        <EventRow key={i} event={event} compact />
      ))}
      <div className="flex items-center justify-between pt-1">
        <span className="font-mono text-[10px] text-accent">2 free hours</span>
        <span className="font-mono text-[10px] text-muted-foreground">
          +{todayEvents.length - 3 + tomorrowEvents.length} more today/tmrw
        </span>
      </div>
    </div>
  )
}

export function ScheduleExpanded() {
  return (
    <div className="space-y-3">
      {/* Today */}
      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <Calendar className="size-3 text-primary" />
          <span className="font-display text-[10px] tracking-wider text-primary">TODAY</span>
          <span className="font-mono text-[10px] text-muted-foreground">Saturday, Feb 21</span>
        </div>
        <div className="space-y-0">
          {todayEvents.map((event, i) => (
            <EventRow key={i} event={event} />
          ))}
        </div>
        <div className="mt-1.5 flex items-center gap-2 font-mono text-[10px]">
          <Clock className="size-3 text-accent" />
          <span className="text-accent">2 free hours remaining</span>
        </div>
      </div>

      {/* Tomorrow */}
      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <Calendar className="size-3 text-muted-foreground" />
          <span className="font-display text-[10px] tracking-wider text-muted-foreground">TOMORROW</span>
          <span className="font-mono text-[10px] text-muted-foreground">Sunday, Feb 22</span>
        </div>
        <div className="space-y-0">
          {tomorrowEvents.map((event, i) => (
            <EventRow key={i} event={event} />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 border-t border-border/20 pt-2">
        {Object.entries(categoryColors).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1">
            <div className={cn("h-1.5 w-1.5 rounded-full", color)} />
            <span className="font-mono text-[9px] capitalize text-muted-foreground">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
