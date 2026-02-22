"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import {
  Smartphone,
  Mail,
  Pin,
  CheckCircle,
  ArrowRight,
  Maximize2,
  MessageSquare,
} from "lucide-react"

interface CommItem {
  source: "sms" | "email"
  sender: string
  preview: string
  time: string
  unread?: boolean
  caroline?: boolean
}

const sourceIcon = {
  sms: <Smartphone className="size-2.5" />,
  email: <Mail className="size-2.5" />,
}
const sourceColor = {
  sms: "text-green-400",
  email: "text-blue-400",
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

function CommRow({ item, compact = false }: { item: CommItem; compact?: boolean }) {
  return (
    <div className={cn(
      "group border-b border-primary/[0.06] py-1.5 px-3 transition-colors hover:bg-primary/5",
      item.caroline && "border-l-2 border-l-purple-500",
      item.unread && "bg-primary/[0.02]"
    )}>
      <div className="flex items-center gap-1.5">
        <span className={cn("shrink-0", sourceColor[item.source])}>{sourceIcon[item.source]}</span>
        <span className={cn(
          "text-[11px] text-foreground/90",
          item.unread ? "font-semibold" : "font-normal"
        )}>
          {item.sender}
        </span>
        {item.unread && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
        <span className="ml-auto font-mono text-[9px] tabular-nums text-muted-foreground/50">{item.time}</span>
      </div>
      <p className="mt-0.5 truncate font-mono text-[10px] leading-tight text-muted-foreground/70">
        {item.preview}
      </p>
      {!compact && (
        <div className="mt-0.5 hidden items-center gap-1 group-hover:flex">
          <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground hover:bg-primary/10 hover:text-primary">
            <CheckCircle className="size-2" /> Done
          </button>
          <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground hover:bg-primary/10 hover:text-primary">
            <Pin className="size-2" /> Pin
          </button>
          <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground hover:bg-primary/10 hover:text-primary">
            <ArrowRight className="size-2" /> Task
          </button>
        </div>
      )}
    </div>
  )
}

/** Comms inline panel */
export function CommsPanel({ onExpand }: { onExpand: () => void }) {
  const unread = commsData.filter((c) => c.unread).length

  return (
    <div className="flex h-full flex-col">
      <UplinkHeader
        leftText="COMMS"
        variant="cyan"
        rightText={
          <button onClick={onExpand} className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
            <span>EXPAND</span>
            <Maximize2 className="size-2.5" />
          </button>
        }
      />

      {/* Unread count strip */}
      <div className="flex items-center gap-2 border-b border-cyan-500/10 bg-cyan-500/5 px-3 py-1 font-mono text-[9px]">
        <MessageSquare className="size-2.5 text-cyan-400" />
        <span className="text-cyan-400">{unread} unread</span>
        <span className="text-muted-foreground/40">|</span>
        <span className="text-muted-foreground/50">{commsData.length} total</span>
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {commsData.slice(0, 5).map((item, i) => (
          <CommRow key={i} item={item} compact />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-primary/10 px-3 py-1">
        <span className="font-mono text-[8px] text-muted-foreground/40">
          +{commsData.length - 5} more
        </span>
        <div className="flex items-end gap-0.5">
          {[4, 3, 2, 1].map((h) => (
            <div key={h} className="w-1 rounded-t bg-cyan-500/40" style={{ height: h * 3 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Expanded ── */
export function CommsExpanded() {
  return (
    <div className="space-y-0">
      <div className="mb-3 flex items-center gap-3 font-mono text-[10px]">
        <span className="text-cyan-400">{commsData.filter((c) => c.unread).length} unread</span>
        <span className="text-muted-foreground/40">|</span>
        <span className="text-muted-foreground">{commsData.length} messages</span>
      </div>
      {commsData.map((item, i) => (
        <CommRow key={i} item={item} />
      ))}
    </div>
  )
}
