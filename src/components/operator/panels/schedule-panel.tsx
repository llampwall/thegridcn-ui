"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { Countdown } from "@/components/thegridcn/countdown"
import { Calendar, ChevronRight, Maximize2, MapPin, Video, Clock } from "lucide-react"

/* ── Schedule data keyed by hour ── */
const SCHEDULE: Record<number, { title: string; tag?: string; tagColor?: string; location?: string }[]> = {
  6:  [{ title: "Wake + cold shower", tag: "RITUAL", tagColor: "text-cyan-400" }],
  7:  [{ title: "Breakfast + supplements", tag: "HEALTH", tagColor: "text-green-400" }],
  8:  [{ title: "Deep work: GridCN v2", tag: "DEV", tagColor: "text-primary" }],
  9:  [{ title: "Continued: GridCN v2", tag: "DEV", tagColor: "text-primary" }],
  10: [{ title: "Standup w/ team", tag: "MEETING", tagColor: "text-amber-400", location: "Zoom" }],
  11: [{ title: "Code review + PRs", tag: "DEV", tagColor: "text-primary" }],
  12: [{ title: "Lunch + walk", tag: "HEALTH", tagColor: "text-green-400" }],
  13: [{ title: "Design system docs", tag: "DEV", tagColor: "text-primary" }],
  14: [{ title: "Dentist appointment", tag: "APPT", tagColor: "text-amber-400", location: "Dr. Kim" }],
  15: [{ title: "Gym: Push day", tag: "HEALTH", tagColor: "text-green-400" }],
  16: [{ title: "Open block" }],
  17: [{ title: "Dinner prep: Tikka masala", tag: "HEALTH", tagColor: "text-green-400" }],
  18: [{ title: "Side project time", tag: "DEV", tagColor: "text-primary" }],
  19: [{ title: "Read / decompress", tag: "RITUAL", tagColor: "text-cyan-400" }],
  20: [{ title: "Journal + plan tomorrow", tag: "RITUAL", tagColor: "text-cyan-400" }],
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6)

function formatHour(h: number) {
  if (h === 0 || h === 24) return "12a"
  if (h < 12) return `${h}a`
  if (h === 12) return "12p"
  return `${h - 12}p`
}

/* ── Next-up countdown ── */
function NextEventCountdown() {
  const [now, setNow] = React.useState(new Date())

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  const currentHour = now.getHours()
  const nextHour = HOURS.find((h) => h > currentHour && SCHEDULE[h])
  if (!nextHour || !SCHEDULE[nextHour]) return null

  const mins = (nextHour - currentHour) * 60 - now.getMinutes()
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const value = h > 0 ? `${h}h ${m}m` : `${m}m`

  return (
    <div className="px-3 py-2 border-b border-primary/10">
      <Countdown
        value={value}
        label="NEXT"
        variant={mins <= 15 ? "warning" : "default"}
        className="text-[10px]"
      />
      <div className="mt-0.5 font-mono text-[10px] text-foreground/70 pl-1 truncate">
        {SCHEDULE[nextHour][0].title}
      </div>
    </div>
  )
}

/** Full-height schedule rail */
export function ScheduleRail({ onExpand }: { onExpand: () => void }) {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const currentHourRef = React.useRef<HTMLDivElement>(null)
  const [currentHour, setCurrentHour] = React.useState(new Date().getHours())

  React.useEffect(() => {
    const id = setInterval(() => setCurrentHour(new Date().getHours()), 60_000)
    return () => clearInterval(id)
  }, [])

  React.useEffect(() => {
    if (currentHourRef.current) {
      currentHourRef.current.scrollIntoView({ block: "center", behavior: "instant" })
    }
  }, [])

  return (
    <div className="flex h-full flex-col bg-card/30">
      <UplinkHeader
        leftText="SCHEDULE"
        rightText={
          <button
            onClick={onExpand}
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <span>EXPAND</span>
            <Maximize2 className="size-2.5" />
          </button>
        }
      />

      <NextEventCountdown />

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none">
        {HOURS.map((hour) => {
          const events = SCHEDULE[hour]
          const isCurrent = hour === currentHour
          const isPast = hour < currentHour

          return (
            <div
              key={hour}
              ref={isCurrent ? currentHourRef : undefined}
              className={cn(
                "relative border-b border-primary/[0.06] px-3 py-1.5 transition-all",
                isCurrent && "bg-primary/10 border-primary/20",
                isPast && "opacity-35"
              )}
            >
              {isCurrent && (
                <div className="absolute left-0 top-0 h-full w-[3px] bg-primary glow-sm" />
              )}

              <div className={cn(
                "font-mono text-[10px] tracking-wider",
                isCurrent ? "text-primary font-bold" : "text-muted-foreground/50"
              )}>
                {formatHour(hour)}
              </div>

              {events ? events.map((ev, i) => (
                <div key={i} className="mt-0.5 flex items-start gap-1.5">
                  <ChevronRight className={cn("size-2.5 mt-0.5 shrink-0", isCurrent ? "text-primary" : "text-muted-foreground/30")} />
                  <div className="flex-1 min-w-0">
                    <div className={cn(
                      "text-[11px] leading-tight truncate",
                      isCurrent ? "text-foreground font-medium" : "text-foreground/60"
                    )}>
                      {ev.title}
                    </div>
                    <div className="flex items-center gap-2">
                      {ev.tag && (
                        <span className={cn("font-mono text-[7px] tracking-widest", ev.tagColor || "text-muted-foreground/40")}>
                          {ev.tag}
                        </span>
                      )}
                      {ev.location && (
                        <span className="font-mono text-[7px] text-muted-foreground/40">{ev.location}</span>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="mt-0.5 font-mono text-[8px] text-muted-foreground/20 italic">--</div>
              )}
            </div>
          )
        })}
      </div>

      <div className="h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
    </div>
  )
}

/* ── Expanded (modal) ── */
export function ScheduleExpanded() {
  const currentHour = new Date().getHours()
  const allHours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <Calendar className="size-4 text-primary" />
        <span className="font-display text-sm tracking-[0.15em] text-primary">FULL DAY VIEW</span>
        <span className="font-mono text-[10px] text-muted-foreground">SAT, FEB 21 2026</span>
      </div>
      <div className="space-y-0">
        {allHours.map((hour) => {
          const events = SCHEDULE[hour]
          const isCurrent = hour === currentHour
          const isPast = hour < currentHour
          return (
            <div
              key={hour}
              className={cn(
                "flex gap-4 border-b border-primary/10 py-2 px-2",
                isCurrent && "bg-primary/10 rounded",
                isPast && "opacity-35"
              )}
            >
              <div className={cn(
                "w-12 shrink-0 font-mono text-xs tracking-wider text-right",
                isCurrent ? "text-primary font-bold" : "text-muted-foreground/50"
              )}>
                {formatHour(hour)}
              </div>
              <div className="flex-1">
                {events ? events.map((ev, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={cn("text-sm", isCurrent ? "text-foreground font-medium" : "text-foreground/60")}>
                      {ev.title}
                    </span>
                    {ev.tag && (
                      <span className={cn("font-mono text-[9px] tracking-widest", ev.tagColor || "text-muted-foreground")}>
                        {ev.tag}
                      </span>
                    )}
                    {ev.location && (
                      <span className="font-mono text-[9px] text-muted-foreground/50">{ev.location}</span>
                    )}
                  </div>
                )) : (
                  <span className="text-xs text-muted-foreground/20 italic">--</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
