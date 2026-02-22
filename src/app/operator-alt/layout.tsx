import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Operator Alt | Life Dashboard",
  description: "Alternate cockpit-style life management dashboard — Ares theme",
}

export default function OperatorAltLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
