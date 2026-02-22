"use client"

import { cn } from "@/lib/utils"
import {
  Smartphone,
  Mail,
  Pin,
  CheckCircle,
  ArrowRight,
} from "lucide-react"

interface CommItem {
  source: "sms" | "email"
  sender: string
  preview: string
  time: string
  unread?: boolean
  caroline?: boolean
}

const sourceConfig = {
  sms: { icon: <Smartphone className="size-2.5" />, badge: "TG", color: "text-green-400" },
  email: { icon: <Mail className="size-2.5" />, badge: "Mail", color: "text-blue-400" },
}

const commsData: CommItem[] = [
  { source: "sms", sender: "Caroline", preview: "Hey can you pick up milk on the way home?", time: "2m", unread: true, caroline: true },
  { source: "email", sender: "Alex T.", preview: "RE: Sprint goals - I think we should prioritize the auth module first", time: "15m", unread: true },
  { source: "sms", sender: "Mum", preview: "Are we still on for lunch tomorrow?", time: "32m", unread: true },
  { source: "email", sender: "HR Team", preview: "Benefits enrollment reminder - deadline March 1st", time: "1h" },
  { source: "sms", sender: "Dev Channel", preview: "Pipeline #482 passed - deploying to staging", time: "1h", unread: true },
  { source: "email", sender: "Amazon", preview: "Your package has shipped - arriving Tuesday", time: "2h" },
  { source: "sms", sender: "James", preview: "Fancy a round of golf next weekend?", time: "3h", unread: true },
]

export function CommsCompact() {
  const unreadCount = commsData.filter((c) => c.unread).length
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-0">
        {commsData.slice(0, 4).map((item, i) => {
          const src = sourceConfig[item.source]
          return (
            <div
              key={i}
              className={cn(
                "group border-b border-border/10 py-1.5 last:border-0",
                item.caroline && "border-l-2 border-l-purple-500 pl-2"
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className={cn("font-mono text-[9px]", src.color)}>{src.icon}</span>
                <span className="text-[11px] font-semibold text-foreground/90">{item.sender}</span>
                {item.unread && (
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                )}
                <span className="ml-auto font-mono text-[9px] text-muted-foreground">{item.time}</span>
              </div>
              <p className="mt-0.5 truncate font-mono text-[10px] leading-tight text-muted-foreground">
                {item.preview}
              </p>
              {/* Hover actions */}
              <div className="mt-0.5 hidden items-center gap-1 group-hover:flex">
                <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <CheckCircle className="size-2.5" /> Done
                </button>
                <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <Pin className="size-2.5" /> Pin
                </button>
                <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                  <ArrowRight className="size-2.5" /> Directive
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-1.5 text-right">
        <span className="font-mono text-[9px] text-muted-foreground">
          +{commsData.length - 4} more ({unreadCount} unread)
        </span>
      </div>
    </div>
  )
}

export function CommsExpanded() {
  return (
    <div className="space-y-1">
      {commsData.map((item, i) => {
        const src = sourceConfig[item.source]
        return (
          <div
            key={i}
            className={cn(
              "group border-b border-border/10 py-2 last:border-0",
              item.caroline && "border-l-2 border-l-purple-500 pl-2"
            )}
          >
            <div className="flex items-center gap-2">
              <span className={cn("font-mono text-[9px]", src.color)}>{src.icon}</span>
              <span className="text-xs font-semibold text-foreground/90">{item.sender}</span>
              {item.unread && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              )}
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">{item.time}</span>
            </div>
            <p className="mt-1 font-mono text-[11px] leading-snug text-muted-foreground">
              {item.preview}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <button className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <CheckCircle className="size-3" /> Done
              </button>
              <button className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <Pin className="size-3" /> Pin
              </button>
              <button className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <ArrowRight className="size-3" /> Directive
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
