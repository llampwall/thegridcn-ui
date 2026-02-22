"use client"

import { cn } from "@/lib/utils"
import { Smartphone, Mail, Pin, CheckCircle, ArrowRight } from "lucide-react"

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

function CommRow({ item, expanded }: { item: CommItem; expanded?: boolean }) {
  const src = sourceConfig[item.source]
  return (
    <div
      className={cn(
        "group border-b border-border/10 py-1.5 last:border-0",
        item.caroline && "border-l-2 border-l-purple-500/50 pl-2"
      )}
    >
      <div className="flex items-center gap-1.5">
        <span className={cn("font-mono text-[9px]", src.color)}>{src.icon}</span>
        <span className="text-[11px] font-medium text-foreground/90">{item.sender}</span>
        {item.unread && (
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_3px_var(--primary)]" />
        )}
        <span className="ml-auto font-mono text-[9px] tabular-nums text-muted-foreground/50">{item.time}</span>
      </div>
      <p className="mt-0.5 truncate font-mono text-[10px] leading-tight text-muted-foreground/70">{item.preview}</p>

      {/* Actions: hover-only in compact, always visible in expanded */}
      <div className={cn("mt-0.5 items-center gap-1", expanded ? "flex" : "hidden group-hover:flex")}>
        <ActionButton icon={<CheckCircle className="size-2.5" />} label="Done" />
        <ActionButton icon={<Pin className="size-2.5" />} label="Pin" />
        <ActionButton icon={<ArrowRight className="size-2.5" />} label="Directive" />
      </div>
    </div>
  )
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-0.5 rounded px-1 py-px font-mono text-[8px] text-muted-foreground/50 transition-colors hover:bg-primary/10 hover:text-primary">
      {icon} {label}
    </button>
  )
}

/* ═══════════════════════════ COMPACT ═══════════════════════════ */
export function CommsCompact() {
  const unreadCount = commsData.filter((c) => c.unread).length
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-0">
        {commsData.slice(0, 4).map((item, i) => (
          <CommRow key={i} item={item} />
        ))}
      </div>
      <div className="mt-auto pt-1.5 text-right">
        <span className="font-mono text-[9px] text-muted-foreground/50">
          +{commsData.length - 4} more ({unreadCount} unread)
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════ EXPANDED ═══════════════════════════ */
export function CommsExpanded() {
  return (
    <div className="space-y-1">
      {commsData.map((item, i) => (
        <CommRow key={i} item={item} expanded />
      ))}
    </div>
  )
}
