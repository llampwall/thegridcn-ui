"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { UplinkHeader } from "@/components/thegridcn/uplink-header"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dumbbell,
  UtensilsCrossed,
  ShoppingCart,
  CheckSquare,
  Flame,
  Maximize2,
  Droplets,
  Moon,
  Footprints,
  ChevronLeft,
  ChevronRight,
  Check,
  Trophy,
  TrendingUp,
} from "lucide-react"

/* ══════════════════════════════════════════════════════════════════════════
   WORKOUT PROGRAM DATA (from the spreadsheet)
   ══════════════════════════════════════════════════════════════════════════ */

type WorkoutDay = "push" | "pull" | "legs" | "upper" | "cardio"

interface Exercise {
  name: string
  sets: number
  reps: string // e.g. "8-10" or "12-15"
  category?: string
}

interface SetLog {
  weight: number | null
  reps: number | null
  done: boolean
}

const PROGRAM: Record<WorkoutDay, { label: string; exercises: Exercise[] }> = {
  push: {
    label: "PUSH",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", category: "Chest" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", category: "Chest" },
      { name: "Overhead Press", sets: 4, reps: "8-10", category: "Shoulders" },
      { name: "Cable Flyes", sets: 3, reps: "12-15", category: "Chest" },
      { name: "Lateral Raises", sets: 4, reps: "12-15", category: "Shoulders" },
      { name: "Tricep Pushdowns", sets: 3, reps: "10-12", category: "Triceps" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "10-12", category: "Triceps" },
    ],
  },
  pull: {
    label: "PULL",
    exercises: [
      { name: "Deadlift", sets: 4, reps: "6-8", category: "Back" },
      { name: "Pull-Ups", sets: 4, reps: "8-10", category: "Back" },
      { name: "Barbell Rows", sets: 4, reps: "8-10", category: "Back" },
      { name: "Face Pulls", sets: 3, reps: "15-20", category: "Rear Delts" },
      { name: "Dumbbell Curls", sets: 3, reps: "10-12", category: "Biceps" },
      { name: "Hammer Curls", sets: 3, reps: "10-12", category: "Biceps" },
    ],
  },
  legs: {
    label: "LEGS",
    exercises: [
      { name: "Squats", sets: 4, reps: "8-10", category: "Quads" },
      { name: "Romanian Deadlift", sets: 4, reps: "10-12", category: "Hamstrings" },
      { name: "Leg Press", sets: 3, reps: "10-12", category: "Quads" },
      { name: "Leg Curls", sets: 3, reps: "12-15", category: "Hamstrings" },
      { name: "Leg Extensions", sets: 3, reps: "12-15", category: "Quads" },
      { name: "Standing Calf Raises", sets: 4, reps: "15-20", category: "Calves" },
    ],
  },
  upper: {
    label: "UPPER",
    exercises: [
      { name: "Incline Bench Press", sets: 4, reps: "8-10", category: "Chest" },
      { name: "Seated Cable Row", sets: 4, reps: "10-12", category: "Back" },
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12", category: "Shoulders" },
      { name: "Lat Pulldown", sets: 3, reps: "10-12", category: "Back" },
      { name: "Cable Crossovers", sets: 3, reps: "12-15", category: "Chest" },
      { name: "EZ Bar Curls", sets: 3, reps: "10-12", category: "Biceps" },
      { name: "Skull Crushers", sets: 3, reps: "10-12", category: "Triceps" },
    ],
  },
  cardio: {
    label: "VR CARDIO + CORE",
    exercises: [
      { name: "Beat Saber / Synth Riders", sets: 1, reps: "30-45 min", category: "Cardio" },
      { name: "Planks", sets: 3, reps: "60s", category: "Core" },
      { name: "Russian Twists", sets: 3, reps: "20", category: "Core" },
      { name: "Leg Raises", sets: 3, reps: "15", category: "Core" },
      { name: "Mountain Climbers", sets: 3, reps: "30", category: "Core" },
    ],
  },
}

// Demo data for current week's progress
const DEMO_LOGS: Record<string, SetLog[]> = {
  "push-Bench Press": [
    { weight: 80, reps: 10, done: true },
    { weight: 80, reps: 9, done: true },
    { weight: 80, reps: 8, done: true },
    { weight: 80, reps: 8, done: true },
  ],
  "push-Incline Dumbbell Press": [
    { weight: 28, reps: 12, done: true },
    { weight: 28, reps: 11, done: true },
    { weight: 28, reps: 10, done: true },
  ],
  "push-Overhead Press": [
    { weight: 40, reps: 10, done: true },
    { weight: 40, reps: 9, done: true },
    { weight: 40, reps: 8, done: false },
    { weight: null, reps: null, done: false },
  ],
}

/* ══════════════════════════════════════════════════════════════════════════
   OTHER DATA (meals, grocery, habits)
   ══════════════════════════════════════════════════════════════════════════ */

const todayMeals = [
  { meal: "Breakfast", item: "Oats + banana + protein shake", cals: 520, done: true },
  { meal: "Lunch", item: "Turkey wrap + mixed salad", cals: 650, done: true },
  { meal: "Snack", item: "Greek yogurt + almonds", cals: 280, done: false },
  { meal: "Dinner", item: "Chicken tikka masala + rice", cals: 720, prep: "40m", done: false },
]

const groceryItems = [
  { item: "Chicken breast (1kg)", checked: true },
  { item: "Basmati rice", checked: true },
  { item: "Greek yogurt", checked: true },
  { item: "Bananas x6", checked: false },
  { item: "Oat milk", checked: false },
  { item: "Almonds (200g)", checked: false },
  { item: "Mixed salad bag", checked: false },
  { item: "Wraps (8pk)", checked: false },
  { item: "Turkey slices", checked: false },
  { item: "Protein powder", checked: false },
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

/* ══════════════════════════════════════════════════════════════════════════
   VITALS BAR
   ══════════════════════════════════════════════════════════════════════════ */

function VitalsBar() {
  const vitals = [
    { icon: <Droplets className="size-2.5" />, label: "WATER", value: "5/8", color: "text-blue-400" },
    { icon: <Footprints className="size-2.5" />, label: "STEPS", value: "6.2k", color: "text-green-400" },
    { icon: <UtensilsCrossed className="size-2.5" />, label: "CALS", value: "1170", color: "text-amber-400" },
    { icon: <Moon className="size-2.5" />, label: "SLEEP", value: "7h12m", color: "text-purple-400" },
  ]

  return (
    <div className="flex items-center gap-3 px-3 py-1.5">
      {vitals.map((v, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className={v.color}>{v.icon}</span>
          <div className="flex flex-col">
            <span className="font-mono text-[7px] tracking-widest text-muted-foreground/50">{v.label}</span>
            <span className={cn("font-mono text-[10px] font-bold tabular-nums", v.color)}>{v.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   HEALTH PANEL (compact inline)
   ══════════════════════════════════════════════════════════════════════════ */

export function HealthPanel({ onExpand }: { onExpand: () => void }) {
  const currentDay: WorkoutDay = "push" // Demo: today is push day
  const program = PROGRAM[currentDay]
  const totalExercises = program.exercises.length
  const completedExercises = 3 // Demo value

  const habitsDone = habits.filter((h) => h.done).length

  return (
    <div className="flex h-full flex-col">
      <UplinkHeader
        leftText="HEALTH"
        rightText={
          <button onClick={onExpand} className="flex items-center gap-1 hover:text-primary transition-colors">
            <span>EXPAND</span>
            <Maximize2 className="size-2.5" />
          </button>
        }
      />

      {/* Vitals strip */}
      <VitalsBar />

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Compact info grid */}
      <div className="grid flex-1 grid-cols-3 gap-px overflow-hidden bg-primary/[0.06]">
        {/* Workout */}
        <div className="flex flex-col items-center justify-center bg-card/60 px-2 py-2">
          <Dumbbell className="size-3.5 text-primary" />
          <span className="mt-1 font-display text-[7px] tracking-widest text-primary">{program.label}</span>
          <span className="font-mono text-lg font-bold leading-none text-foreground">{completedExercises}/{totalExercises}</span>
          <span className="font-mono text-[7px] text-muted-foreground/50">exercises</span>
        </div>

        {/* Meals */}
        <div className="flex flex-col items-center justify-center bg-card/60 px-2 py-2">
          <UtensilsCrossed className="size-3.5 text-amber-400" />
          <span className="mt-1 font-display text-[7px] tracking-widest text-amber-400">DINNER</span>
          <span className="font-mono text-xs font-bold leading-none text-foreground">Tikka</span>
          <span className="font-mono text-[7px] text-muted-foreground/50">40m prep</span>
        </div>

        {/* Habits */}
        <div className="flex flex-col items-center justify-center bg-card/60 px-2 py-2">
          <CheckSquare className="size-3.5 text-green-400" />
          <span className="mt-1 font-display text-[7px] tracking-widest text-green-400">HABITS</span>
          <span className="font-mono text-lg font-bold leading-none text-foreground">{habitsDone}/{habits.length}</span>
          <div className="mt-0.5 flex items-center gap-0.5 font-mono text-[7px] text-accent">
            <Flame className="size-2" />5d
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   WORKOUT TRACKER (expanded)
   ══════════════════════════════════════════════════════════════════════════ */

function WorkoutTracker() {
  const [selectedDay, setSelectedDay] = React.useState<WorkoutDay>("push")
  const [currentWeek, setCurrentWeek] = React.useState(3) // Demo: week 3 of 8
  const [logs, setLogs] = React.useState<Record<string, SetLog[]>>(DEMO_LOGS)

  const program = PROGRAM[selectedDay]
  const days: WorkoutDay[] = ["push", "pull", "legs", "upper", "cardio"]

  // Calculate completion stats
  const getExerciseCompletion = (exerciseName: string) => {
    const key = `${selectedDay}-${exerciseName}`
    const exerciseLogs = logs[key] || []
    const completedSets = exerciseLogs.filter((s) => s.done).length
    return completedSets
  }

  const totalSets = program.exercises.reduce((acc, ex) => acc + ex.sets, 0)
  const completedSets = program.exercises.reduce((acc, ex) => acc + getExerciseCompletion(ex.name), 0)
  const progressPercent = Math.round((completedSets / totalSets) * 100)

  // Toggle set completion
  const toggleSet = (exerciseName: string, setIndex: number) => {
    const key = `${selectedDay}-${exerciseName}`
    const current = logs[key] || Array.from({ length: PROGRAM[selectedDay].exercises.find(e => e.name === exerciseName)!.sets }, () => ({ weight: null, reps: null, done: false }))
    const updated = [...current]
    updated[setIndex] = { ...updated[setIndex], done: !updated[setIndex].done }
    setLogs({ ...logs, [key]: updated })
  }

  // Update weight/reps
  const updateSet = (exerciseName: string, setIndex: number, field: "weight" | "reps", value: number | null) => {
    const key = `${selectedDay}-${exerciseName}`
    const exercise = PROGRAM[selectedDay].exercises.find(e => e.name === exerciseName)!
    const current = logs[key] || Array.from({ length: exercise.sets }, () => ({ weight: null, reps: null, done: false }))
    const updated = [...current]
    updated[setIndex] = { ...updated[setIndex], [field]: value }
    setLogs({ ...logs, [key]: updated })
  }

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Header with week selector and progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Week selector */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentWeek((w) => Math.max(1, w - 1))}
              className="flex size-6 items-center justify-center rounded border border-primary/30 text-primary transition-colors hover:bg-primary/10 disabled:opacity-30"
              disabled={currentWeek === 1}
            >
              <ChevronLeft className="size-3" />
            </button>
            <div className="flex flex-col items-center px-2">
              <span className="font-mono text-[8px] tracking-widest text-muted-foreground">WEEK</span>
              <span className="font-mono text-lg font-bold text-primary">{currentWeek}</span>
              <span className="font-mono text-[8px] text-muted-foreground/50">of 8</span>
            </div>
            <button
              onClick={() => setCurrentWeek((w) => Math.min(8, w + 1))}
              className="flex size-6 items-center justify-center rounded border border-primary/30 text-primary transition-colors hover:bg-primary/10 disabled:opacity-30"
              disabled={currentWeek === 8}
            >
              <ChevronRight className="size-3" />
            </button>
          </div>

          {/* Progress ring */}
          <div className="relative flex items-center gap-2">
            <svg className="size-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" className="stroke-muted/30" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeDasharray={`${progressPercent} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] font-bold text-primary">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 font-mono text-[10px]">
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">SETS</span>
            <span className="text-base font-bold text-foreground">{completedSets}/{totalSets}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground">EXERCISES</span>
            <span className="text-base font-bold text-foreground">{program.exercises.filter(e => getExerciseCompletion(e.name) === e.sets).length}/{program.exercises.length}</span>
          </div>
        </div>
      </div>

      {/* Day selector pills */}
      <div className="flex gap-1">
        {days.map((day) => {
          const isActive = day === selectedDay
          const dayProgram = PROGRAM[day]
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={cn(
                "flex-1 rounded border px-2 py-1.5 font-display text-[9px] tracking-widest transition-all",
                isActive
                  ? "border-primary bg-primary/20 text-primary glow-sm"
                  : "border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {dayProgram.label}
            </button>
          )
        })}
      </div>

      {/* Exercise list */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-1 scrollbar-none">
        {program.exercises.map((exercise, exIdx) => {
          const key = `${selectedDay}-${exercise.name}`
          const exerciseLogs = logs[key] || Array.from({ length: exercise.sets }, () => ({ weight: null, reps: null, done: false }))
          const completedCount = exerciseLogs.filter((s) => s.done).length
          const isComplete = completedCount === exercise.sets

          return (
            <div
              key={exercise.name}
              className={cn(
                "rounded border p-2 transition-all",
                isComplete
                  ? "border-green-500/40 bg-green-500/5"
                  : "border-primary/20 bg-card/40"
              )}
            >
              {/* Exercise header */}
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] text-muted-foreground/50">{String(exIdx + 1).padStart(2, "0")}</span>
                  <span className={cn(
                    "font-mono text-xs font-medium",
                    isComplete ? "text-green-400" : "text-foreground"
                  )}>
                    {exercise.name}
                  </span>
                  {isComplete && <Check className="size-3 text-green-400" />}
                </div>
                <div className="flex items-center gap-2 font-mono text-[9px]">
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                    {exercise.sets} x {exercise.reps}
                  </span>
                  <span className="text-muted-foreground/50">{exercise.category}</span>
                </div>
              </div>

              {/* Sets grid */}
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                  const setLog = exerciseLogs[setIdx] || { weight: null, reps: null, done: false }
                  return (
                    <div
                      key={setIdx}
                      className={cn(
                        "flex flex-col gap-1 rounded border p-1.5 transition-all",
                        setLog.done
                          ? "border-green-500/40 bg-green-500/10"
                          : "border-muted/30 bg-muted/5"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[8px] text-muted-foreground">SET {setIdx + 1}</span>
                        <button
                          onClick={() => toggleSet(exercise.name, setIdx)}
                          className={cn(
                            "flex size-4 items-center justify-center rounded-sm border transition-colors",
                            setLog.done
                              ? "border-green-500 bg-green-500/20 text-green-400"
                              : "border-muted-foreground/30 hover:border-primary/50"
                          )}
                        >
                          {setLog.done && <Check className="size-2.5" />}
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          placeholder="kg"
                          value={setLog.weight ?? ""}
                          onChange={(e) => updateSet(exercise.name, setIdx, "weight", e.target.value ? Number(e.target.value) : null)}
                          className="w-full rounded border border-muted/30 bg-background/50 px-1 py-0.5 font-mono text-[10px] text-foreground placeholder:text-muted-foreground/30 focus:border-primary/50 focus:outline-none"
                        />
                        <input
                          type="number"
                          placeholder="reps"
                          value={setLog.reps ?? ""}
                          onChange={(e) => updateSet(exercise.name, setIdx, "reps", e.target.value ? Number(e.target.value) : null)}
                          className="w-full rounded border border-muted/30 bg-background/50 px-1 py-0.5 font-mono text-[10px] text-foreground placeholder:text-muted-foreground/30 focus:border-primary/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Week progress bar */}
      <div className="mt-2 border-t border-primary/20 pt-2">
        <div className="mb-1 flex items-center justify-between font-mono text-[8px]">
          <span className="text-muted-foreground">8-WEEK PROGRAM PROGRESS</span>
          <span className="text-primary">{Math.round((currentWeek / 8) * 100)}%</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all",
                i < currentWeek
                  ? "bg-primary"
                  : i === currentWeek - 1
                  ? "bg-primary glow-sm"
                  : "bg-muted/30"
              )}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[7px] text-muted-foreground/40">
          <span>WK 1</span>
          <span className="flex items-center gap-1 text-primary/60">
            <Trophy className="size-2" /> FINISH
          </span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   HEALTH EXPANDED (full modal view)
   ══════════════════════════════════════════════════════════════════════════ */

export function HealthExpanded() {
  return (
    <Tabs defaultValue="workout" className="flex h-full flex-col gap-2">
      <TabsList className="h-8 w-full shrink-0 bg-muted/30">
        <TabsTrigger value="workout" className="h-7 text-[10px]">
          <Dumbbell className="mr-1 size-3" />Workout
        </TabsTrigger>
        <TabsTrigger value="meals" className="h-7 text-[10px]">
          <UtensilsCrossed className="mr-1 size-3" />Meals
        </TabsTrigger>
        <TabsTrigger value="grocery" className="h-7 text-[10px]">
          <ShoppingCart className="mr-1 size-3" />Grocery
        </TabsTrigger>
        <TabsTrigger value="habits" className="h-7 text-[10px]">
          <CheckSquare className="mr-1 size-3" />Habits
        </TabsTrigger>
      </TabsList>

      <TabsContent value="workout" className="flex-1 overflow-hidden">
        <WorkoutTracker />
      </TabsContent>

      <TabsContent value="meals" className="max-h-[calc(100%-48px)] overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">{"TODAY'S MEALS"}</span>
          <span className="text-muted-foreground">{todayMeals.reduce((a, m) => a + m.cals, 0)} cal total</span>
        </div>
        <div className="space-y-1">
          {todayMeals.map((m, i) => (
            <div key={i} className={cn(
              "flex items-center gap-2 border-l-2 py-1.5 pl-2 font-mono text-xs",
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

      <TabsContent value="grocery" className="max-h-[calc(100%-48px)] overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">GROCERY LIST</span>
          <span className="text-muted-foreground">{groceryItems.filter(g => g.checked).length}/{groceryItems.length} checked</span>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
          {groceryItems.map((g, i) => (
            <div key={i} className="flex items-center gap-1.5 font-mono text-xs">
              <span className={cn("size-2.5 shrink-0 rounded-sm border", g.checked ? "border-green-500 bg-green-500/20" : "border-muted-foreground/30")} />
              <span className={cn("truncate text-[10px]", g.checked ? "text-muted-foreground line-through" : "text-foreground/90")}>{g.item}</span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="habits" className="max-h-[calc(100%-48px)] overflow-y-auto">
        <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
          <span className="text-primary">DAILY HABITS</span>
          <span className="flex items-center gap-1 text-accent"><Flame className="size-3" /> 5-day streak</span>
        </div>
        <div className="space-y-0.5">
          {habits.map((h, i) => (
            <div key={i} className="flex items-center gap-2 font-mono text-xs">
              <span className={cn("size-3 shrink-0 rounded-sm border", h.done ? "border-green-500 bg-green-500/20" : "border-muted-foreground/30")} />
              <span className={cn("text-[11px]", h.done ? "text-muted-foreground line-through" : "text-foreground/90")}>{h.name}</span>
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
