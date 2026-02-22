"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dumbbell, UtensilsCrossed, ShoppingCart, CheckSquare, Flame } from "lucide-react"

const workoutExercises = [
  { name: "Bench Press", sets: "4x8", weight: "80kg", done: true },
  { name: "Overhead Press", sets: "3x10", weight: "40kg", done: true },
  { name: "Incline Dumbbell Press", sets: "3x12", weight: "28kg", done: false },
  { name: "Lateral Raises", sets: "3x15", weight: "10kg", done: false },
  { name: "Tricep Pushdowns", sets: "3x12", weight: "25kg", done: false },
]

const todayMeals = [
  { meal: "Breakfast", item: "Oats + banana + protein shake", cals: 520, done: true },
  { meal: "Lunch", item: "Turkey wrap + mixed salad", cals: 650, done: true },
  { meal: "Snack", item: "Greek yogurt + almonds", cals: 280, done: false },
  { meal: "Dinner", item: "Chicken tikka masala + rice", cals: 720, prep: "40m", done: false },
]

const groceryItems = [
  { item: "Chicken breast (1kg)", checked: true },
  { item: "Basmati rice", checked: true },
  { item: "Greek yogurt (500g)", checked: true },
  { item: "Bananas x6", checked: false },
  { item: "Oat milk", checked: false },
  { item: "Almonds (200g)", checked: false },
  { item: "Mixed salad bag", checked: false },
  { item: "Wraps (pack of 8)", checked: false },
  { item: "Turkey slices", checked: false },
  { item: "Protein powder", checked: false },
  { item: "Tikka masala sauce", checked: false },
  { item: "Broccoli", checked: false },
  { item: "Eggs (12)", checked: false },
  { item: "Olive oil", checked: false },
]

const habits = [
  { name: "Morning meditation", done: true, streak: 12 },
  { name: "8 glasses water", done: true, streak: 5 },
  { name: "Read 30 min", done: true, streak: 8 },
  { name: "No phone before 8am", done: true, streak: 5 },
  { name: "Walk 10k steps", done: true, streak: 3 },
  { name: "Journal", done: true, streak: 5 },
  { name: "Cold shower", done: false, streak: 2 },
  { name: "Stretch routine", done: false, streak: 0 },
  { name: "Vitamins", done: false, streak: 4 },
  { name: "Sleep by 11pm", done: false, streak: 1 },
]

/** 4 mini-tiles in the bottom bar -- icon + label + 2 status lines */
export function HealthCompact() {
  const workoutDone = workoutExercises.filter((e) => e.done).length
  const groceryChecked = groceryItems.filter((g) => g.checked).length
  const habitsDone = habits.filter((h) => h.done).length

  const tiles = [
    {
      icon: <Dumbbell className="size-3.5" />,
      label: "WORKOUT",
      line1: "Push Day",
      line2: `${workoutDone}/${workoutExercises.length} done`,
      active: true,
    },
    {
      icon: <UtensilsCrossed className="size-3.5" />,
      label: "MEALS",
      line1: "Tikka Masala",
      line2: "40m prep",
    },
    {
      icon: <ShoppingCart className="size-3.5" />,
      label: "GROCERY",
      line1: `${groceryItems.length} items`,
      line2: `${groceryChecked} checked`,
    },
    {
      icon: <CheckSquare className="size-3.5" />,
      label: "HABITS",
      line1: `${habitsDone}/${habits.length} done`,
      line2: (
        <span className="flex items-center gap-0.5">
          <Flame className="size-2.5 text-accent" />
          5 streak
        </span>
      ),
    },
  ]

  return (
    <div className="grid h-full grid-cols-4 gap-2">
      {tiles.map((t, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 border border-border/30 bg-muted/10 px-1 py-1 text-center",
            t.active && "border-primary/50"
          )}
        >
          <span className="text-primary">{t.icon}</span>
          <span className="font-display text-[7px] tracking-widest text-primary">{t.label}</span>
          <span className="font-mono text-[10px] leading-tight text-foreground/90">{t.line1}</span>
          <span className="font-mono text-[9px] leading-tight text-muted-foreground">{t.line2}</span>
        </div>
      ))}
    </div>
  )
}

export function HealthExpanded() {
  return (
    <Tabs defaultValue="workout" className="gap-2">
      <TabsList className="h-7 w-full bg-muted/30">
        <TabsTrigger value="workout" className="h-6 text-[10px]">
          <Dumbbell className="mr-1 size-3" />Workout
        </TabsTrigger>
        <TabsTrigger value="meals" className="h-6 text-[10px]">
          <UtensilsCrossed className="mr-1 size-3" />Meals
        </TabsTrigger>
        <TabsTrigger value="grocery" className="h-6 text-[10px]">
          <ShoppingCart className="mr-1 size-3" />Grocery
        </TabsTrigger>
        <TabsTrigger value="habits" className="h-6 text-[10px]">
          <CheckSquare className="mr-1 size-3" />Habits
        </TabsTrigger>
      </TabsList>

      <TabsContent value="workout" className="max-h-64 overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">PUSH DAY</span>
          <span className="text-muted-foreground">{workoutExercises.filter(e => e.done).length}/{workoutExercises.length} complete</span>
        </div>
        <div className="space-y-1">
          {workoutExercises.map((ex, i) => (
            <div key={i} className={cn(
              "flex items-center gap-2 border-l-2 py-1 pl-2 font-mono text-xs",
              ex.done ? "border-l-green-500 text-muted-foreground" : "border-l-primary/30 text-foreground/90"
            )}>
              <span className={cn("size-3 shrink-0 rounded-sm border", ex.done ? "border-green-500 bg-green-500/20" : "border-muted-foreground/30")} />
              <span className={cn(ex.done && "line-through")}>{ex.name}</span>
              <span className="ml-auto text-[9px] text-muted-foreground">{ex.sets}</span>
              <span className="text-[9px] text-muted-foreground">{ex.weight}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="meals" className="max-h-64 overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">{"TODAY'S MEALS"}</span>
          <span className="text-muted-foreground">{todayMeals.reduce((a, m) => a + m.cals, 0)} cal total</span>
        </div>
        <div className="space-y-1">
          {todayMeals.map((m, i) => (
            <div key={i} className={cn(
              "flex items-center gap-2 border-l-2 py-1 pl-2 font-mono text-xs",
              m.done ? "border-l-green-500 text-muted-foreground" : "border-l-accent/30 text-foreground/90"
            )}>
              <span className="w-14 shrink-0 text-[9px] font-semibold uppercase text-primary">{m.meal}</span>
              <span className="truncate">{m.item}</span>
              <span className="ml-auto shrink-0 text-[9px] text-muted-foreground">{m.cals} cal</span>
              {m.prep && <span className="shrink-0 text-[9px] text-accent">{m.prep}</span>}
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="grocery" className="max-h-64 overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">GROCERY LIST</span>
          <span className="text-muted-foreground">{groceryItems.filter(g => g.checked).length}/{groceryItems.length} checked</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {groceryItems.map((g, i) => (
            <div key={i} className="flex items-center gap-1.5 font-mono text-xs">
              <span className={cn(
                "size-2.5 shrink-0 rounded-sm border",
                g.checked ? "border-green-500 bg-green-500/20" : "border-muted-foreground/30"
              )} />
              <span className={cn(
                "truncate text-[10px]",
                g.checked ? "text-muted-foreground line-through" : "text-foreground/90"
              )}>{g.item}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="habits" className="max-h-64 overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">DAILY HABITS</span>
          <span className="flex items-center gap-1 text-accent">
            <Flame className="size-3" /> 5-day streak
          </span>
        </div>
        <div className="space-y-0.5">
          {habits.map((h, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-xs">
              <span className={cn(
                "size-3 shrink-0 rounded-sm border",
                h.done ? "border-green-500 bg-green-500/20" : "border-muted-foreground/30"
              )} />
              <span className={cn(
                "text-[11px]",
                h.done ? "text-muted-foreground line-through" : "text-foreground/90"
              )}>{h.name}</span>
              {h.streak > 0 && (
                <span className="ml-auto flex items-center gap-0.5 text-[9px] text-accent">
                  <Flame className="size-2.5" />{h.streak}
                </span>
              )}
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
