"use client"

import { cn } from "@/lib/utils"
import { Smartphone, Mail, MessageCircle, Pin, CheckCircle, ArrowRight } from "lucide-react"

interface CommItem {
  source: "sms" | "email" | "chat"
  sender: string
  preview: string
  time: string
  unread?: boolean
  priority?: boolean
}

const sourceIcons = {
  sms: <Smartphone className="size-3" />,
  email: <Mail className="size-3" />,
  chat: <MessageCircle className="size-3" />,
}

const sourceColors = {
  sms: "text-green-400 bg-green-500/10",
  email: "text-blue-400 bg-blue-500/10",
  chat: "text-purple-400 bg-purple-500/10",
}

const commsData: CommItem[] = [
  { source: "sms", sender: "Caroline", preview: "Hey can you pick up milk on the way home?", time: "2m", unread: true, priority: true },
  { source: "email", sender: "Alex T.", preview: "RE: Sprint goals - I think we should prioritize the auth module first", time: "15m", unread: true },
  { source: "sms", sender: "Mum", preview: "Are we still on for lunch tomorrow?", time: "32m", unread: true },
  { source: "email", sender: "HR Team", preview: "Benefits enrollment reminder - deadline March 1st", time: "1h" },
  { source: "chat", sender: "Dev Channel", preview: "Pipeline #482 passed - deploying to staging", time: "1h", unread: true },
  { source: "email", sender: "Amazon", preview: "Your package has shipped - arriving Tuesday", time: "2h" },
  { source: "sms", sender: "James", preview: "Fancy a round of golf next weekend?", time: "3h", unread: true },
]

function CommRow({ item, compact = false }: { item: CommItem; compact?: boolean }) {
  return (
    <div className={cn(
      "flex items-start gap-2 font-mono text-xs",
      compact ? "py-0.5" : "py-2 border-b border-border/20 last:border-0",
      item.priority && "bg-accent/5 -mx-1 px-1 rounded"
    )}>
      <span className={cn(
        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded",
        sourceColors[item.source]
      )}>
        {sourceIcons[item.source]}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "text-[11px] font-semibold",
            item.priority ? "text-accent" : "text-foreground/90"
          )}>
            {item.sender}
          </span>
          {item.unread && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          )}
          <span className="ml-auto shrink-0 text-[9px] text-muted-foreground">{item.time}</span>
        </div>
        <p className="truncate text-[10px] text-muted-foreground">{item.preview}</p>
      </div>
    </div>
  )
}

export function CommsCompact() {
  const unreadCount = commsData.filter(c => c.unread).length
  return (
    <div className="space-y-1">
      {commsData.slice(0, 3).map((item, i) => (
        <CommRow key={i} item={item} compact />
      ))}
      <div className="pt-1 text-right">
        <span className="font-mono text-[10px] text-muted-foreground">
          +{commsData.length - 3} more ({unreadCount} unread)
        </span>
      </div>
    </div>
  )
}

export function CommsExpanded() {
  return (
    <div className="space-y-1">
      {commsData.map((item, i) => (
        <div key={i} className="group relative">
          <CommRow item={item} />
          {!false && (
            <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-1 group-hover:flex">
              <button className="flex size-5 items-center justify-center rounded bg-card text-muted-foreground transition-colors hover:text-primary">
                <CheckCircle className="size-3" />
              </button>
              <button className="flex size-5 items-center justify-center rounded bg-card text-muted-foreground transition-colors hover:text-primary">
                <Pin className="size-3" />
              </button>
              <button className="flex size-5 items-center justify-center rounded bg-card text-muted-foreground transition-colors hover:text-primary">
                <ArrowRight className="size-3" />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
