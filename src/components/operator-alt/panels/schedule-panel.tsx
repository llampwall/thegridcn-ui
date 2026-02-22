"use client"

import { cn } from "@/lib/utils"
import { Calendar, MapPin, Video, Clock } from "lucide-react"

interface EventItem {
  time: string
  title: string
  location?: string
  category: "health" | "work" | "personal" | "caroline"
  icon?: React.ReactNode
}

const categoryColors: Record<string, string> = {
  health: "bg-red-500",
  work: "bg-blue-500",
  personal: "bg-green-500",
  caroline: "bg-purple-500",
}

const categoryDotBorder: Record<string, string> = {
  health: "ring-red-500/30",
  work: "ring-blue-500/30",
  personal: "ring-green-500/30",
  caroline: "ring-purple-500/30",
}

const todayEvents: EventItem[] = [
  { time: "10:30", title: "Dentist", location: "Dr. Kim's", category: "health" },
  { time: "13:00", title: "Deep work block", category: "work" },
  { time: "15:00", title: "1:1 with Alex", location: "Meet", category: "work", icon: <Video className="size-2.5" /> },
  { time: "18:30", title: "Dinner w/ Caroline", location: "Home", category: "caroline" },
]

const tomorrowEvents: EventItem[] = [
  { time: "08:00", title: "Gym - Push Day", category: "health" },
  { time: "11:00", title: "Sprint Planning", location: "Zoom", category: "work", icon: <Video className="size-2.5" /> },
]

function EventRow({ event }: { event: EventItem }) {
  return (
    <div className="flex items-center gap-1.5 py-[3px] font-mono text-[11px] leading-tight">
      <div
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full ring-1",
          categoryColors[event.category],
          categoryDotBorder[event.category]
        )}
      />
      <span className="w-9 shrink-0 text-[10px] tabular-nums text-muted-foreground">{event.time}</span>
      <span className="truncate text-foreground/90">{event.title}</span>
      {event.location && (
        <span className="ml-auto hidden items-center gap-0.5 text-[9px] text-muted-foreground/60 xl:flex">
          {event.icon || <MapPin className="size-2" />}
          {event.location}
        </span>
      )}
    </div>
  )
}

export function ScheduleCompact() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-0">
        {todayEvents.map((event, i) => (
          <EventRow key={i} event={event} />
        ))}

        <div className="my-1.5 flex items-center gap-2">
          <span className="h-px flex-1 bg-border/20" />
          <span className="font-mono text-[7px] tracking-widest text-muted-foreground/50">TOMORROW</span>
          <span className="h-px flex-1 bg-border/20" />
        </div>

        {tomorrowEvents.map((event, i) => (
          <EventRow key={i} event={event} />
        ))}
      </div>

      <div className="mt-auto flex items-center gap-1 border-t border-border/10 pt-1.5 font-mono text-[9px]">
        <Clock className="size-2.5 text-green-400" />
        <span className="text-green-400">2 free hours</span>
        <span className="ml-auto text-muted-foreground/50">+4 more</span>
      </div>
    </div>
  )
}

export function ScheduleExpanded() {
  const allToday: EventItem[] = [
    ...todayEvents,
    { time: "16:30", title: "Grocery run", location: "Tesco", category: "personal" },
    { time: "20:00", title: "Movie night", location: "Home", category: "caroline" },
  ]
  const allTomorrow: EventItem[] = [
    ...tomorrowEvents,
    { time: "14:00", title: "Walk in the park", category: "personal" },
    { time: "16:00", title: "Code review", category: "work" },
    { time: "19:00", title: "Dinner with Mum", location: "Home", category: "personal" },
  ]

  return (
    <div className="space-y-4">
      {/* Today */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="size-3 text-primary" />
          <span className="font-display text-[10px] tracking-wider text-primary">TODAY</span>
          <span className="font-mono text-[10px] text-muted-foreground">Saturday, Feb 21</span>
        </div>
        <div className="space-y-0.5">
          {allToday.map((event, i) => (
            <div key={i} className="flex items-center gap-2 border-b border-border/10 py-1.5 font-mono text-xs last:border-0">
              <div className={cn("h-2 w-2 shrink-0 rounded-full", categoryColors[event.category])} />
              <span className="w-10 shrink-0 tabular-nums text-[10px] text-muted-foreground">{event.time}</span>
              <span className="truncate text-foreground/90">{event.title}</span>
              {event.location && (
                <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                  {event.icon || <MapPin className="size-2.5" />}
                  {event.location}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 font-mono text-[10px]">
          <Clock className="size-3 text-green-400" />
          <span className="text-green-400">2 free hours remaining</span>
        </div>
      </div>

      {/* Tomorrow */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="size-3 text-muted-foreground" />
          <span className="font-display text-[10px] tracking-wider text-muted-foreground">TOMORROW</span>
          <span className="font-mono text-[10px] text-muted-foreground">Sunday, Feb 22</span>
        </div>
        <div className="space-y-0.5">
          {allTomorrow.map((event, i) => (
            <div key={i} className="flex items-center gap-2 border-b border-border/10 py-1.5 font-mono text-xs last:border-0">
              <div className={cn("h-2 w-2 shrink-0 rounded-full", categoryColors[event.category])} />
              <span className="w-10 shrink-0 tabular-nums text-[10px] text-muted-foreground">{event.time}</span>
              <span className="truncate text-foreground/90">{event.title}</span>
              {event.location && (
                <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                  <MapPin className="size-2.5" />
                  {event.location}
                </span>
              )}
            </div>
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
