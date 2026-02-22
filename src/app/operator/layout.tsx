import type { Metadata, Viewport } from "next"

export const metadata: Metadata = {
  title: "Operator | Mission Control Dashboard",
  description: "Personal mission control dashboard with schedule, comms, directives, health, and progress tracking.",
}

export const viewport: Viewport = {
  themeColor: "#1a0000",
}

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
