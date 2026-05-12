import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Bell, Pill, Plus, Check } from "lucide-react";
import { analyzeSymptoms, loadSymptoms } from "@/lib/symptoms";

export const Route = createFileRoute("/reminders")({
  component: Reminders,
});

const defaultTimes = ["08:00", "14:00", "20:00"];

function Reminders() {
  const result = useMemo(() => analyzeSymptoms(loadSymptoms()), []);
  const baseMeds = result.otc.length ? result.otc : [{ name: "Paracetamol 500mg", dose: "After food" }];
  const [reminders, setReminders] = useState(
    baseMeds.map((m, i) => ({ ...m, time: defaultTimes[i % defaultTimes.length], on: true })),
  );
  const followUps = [
    { title: "Follow-up consult", desc: "Dr. Mehta · in 3 days" },
    { title: result.tests[0] ? `${result.tests[0]} report review` : "Hydration check-in", desc: "Tomorrow · 10:00 AM" },
  ];

  return (
    <MobileShell>
      <ScreenHeader title="Medication reminders" subtitle="Stay on track with your care plan" />
      <div className="px-6 space-y-4 pb-6">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-5 shadow-soft">
          <div className="flex items-center gap-2 text-xs opacity-90"><Bell className="h-3.5 w-3.5" /> Active reminders</div>
          <p className="text-3xl font-bold mt-1">{reminders.filter((r) => r.on).length}</p>
          <p className="text-xs opacity-90 mt-1">Next: {reminders.find((r) => r.on)?.name} at {reminders.find((r) => r.on)?.time}</p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">Today's medication</p>
            <button className="text-xs text-primary font-semibold flex items-center gap-1"><Plus className="h-3 w-3" /> Add</button>
          </div>
          <div className="space-y-3">
            {reminders.map((r, i) => (
              <div key={r.name} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Pill className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.dose} · {r.time}</p>
                </div>
                <button
                  onClick={() => setReminders((prev) => prev.map((x, idx) => idx === i ? { ...x, on: !x.on } : x))}
                  className={`h-6 w-11 rounded-full relative transition ${r.on ? "bg-primary" : "bg-muted"}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition ${r.on ? "left-5" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <p className="text-sm font-semibold mb-3">Follow-ups</p>
          <div className="space-y-2">
            {followUps.map((f) => (
              <div key={f.title} className="flex items-center gap-3 text-sm">
                <span className="h-7 w-7 rounded-lg bg-success/15 text-success flex items-center justify-center"><Check className="h-3.5 w-3.5" /></span>
                <div className="flex-1">
                  <p className="font-medium">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notification preview</p>
          <div className="mt-2 rounded-xl bg-background border border-border p-3 shadow-card">
            <div className="flex items-center gap-2">
              <Bell className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-semibold">CareNova</p>
              <span className="text-[10px] text-muted-foreground ml-auto">now</span>
            </div>
            <p className="text-sm mt-1">Time to take {reminders[0]?.name} — {reminders[0]?.dose}</p>
          </div>
        </div>

        <Link to="/home" className="block text-center text-xs text-muted-foreground">Done</Link>
      </div>
    </MobileShell>
  );
}
