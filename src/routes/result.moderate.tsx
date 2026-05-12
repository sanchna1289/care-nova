import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Calendar, Video, FlaskConical, Star, Pill, Bell } from "lucide-react";
import { analyzeSymptoms, loadSymptoms } from "@/lib/symptoms";

export const Route = createFileRoute("/result/moderate")({
  component: Moderate,
});

const allDoctors = [
  { name: "Dr. Rohan Mehta", spec: "General Physician", rating: 4.9, exp: "12 yrs", slot: "Today · 4:30 PM" },
  { name: "Dr. Priya Iyer", spec: "ENT Specialist", rating: 4.8, exp: "9 yrs", slot: "Today · 6:00 PM" },
  { name: "Dr. Arjun Rao", spec: "Cardiologist", rating: 4.9, exp: "15 yrs", slot: "Tomorrow · 10:00 AM" },
  { name: "Dr. Neha Shah", spec: "Pulmonologist", rating: 4.7, exp: "11 yrs", slot: "Today · 7:30 PM" },
  { name: "Dr. Kavya R", spec: "Gastroenterologist", rating: 4.8, exp: "10 yrs", slot: "Tomorrow · 11:00 AM" },
  { name: "Dr. Sameer Khan", spec: "Neurologist", rating: 4.9, exp: "14 yrs", slot: "Tomorrow · 9:00 AM" },
  { name: "Dr. Anita Roy", spec: "Dermatologist", rating: 4.8, exp: "8 yrs", slot: "Today · 5:00 PM" },
];

function Moderate() {
  const result = useMemo(() => analyzeSymptoms(loadSymptoms()), []);
  const recommended = allDoctors.find((d) => d.spec === result.specialist) || allDoctors[0];
  const others = allDoctors.filter((d) => d.name !== recommended.name).slice(0, 2);
  const labels = result.found.map((f) => f.label).join(", ") || "your symptoms";

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="Moderate condition" subtitle="Doctor consultation recommended" back="/analysis" />
      <div className="px-6 space-y-3 pb-6">
        <div className="rounded-2xl bg-warning/10 border border-warning/40 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">AI Recommendation</p>
          <p className="text-sm font-semibold mt-1">Consult a {result.specialist} within 24 hrs</p>
          <p className="text-xs text-muted-foreground mt-1">Based on: {labels}</p>
        </div>

        <Option icon={Calendar} title="Book in-person visit" desc="Nearest clinic 1.2 km" to="/appointment" tone="primary" />
        <Option icon={Video} title="Video consultation" desc="Available in 15 mins" to="/appointment" />
        <Option icon={FlaskConical} title={`Book tests (${result.tests.length})`} desc="Diagnostic recommendations" to="/tests" />

        {result.otc.length > 0 && (
          <div className="rounded-2xl bg-card border border-border p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Pill className="h-4 w-4 text-primary" />
              </div>
              <p className="font-semibold text-sm">Interim medications</p>
            </div>
            <div className="space-y-2">
              {result.otc.map((m) => (
                <div key={m.name} className="flex items-start justify-between gap-2 text-sm">
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.dose}</p>
                  </div>
                  <Link to="/reminders" className="text-xs text-primary font-semibold flex items-center gap-1 whitespace-nowrap">
                    <Bell className="h-3 w-3" /> Remind
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4 px-1">Recommended for you</p>
        {[recommended, ...others].map((d) => (
          <Link key={d.name} to="/appointment" className="block rounded-2xl bg-card border border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-semibold">
                {d.name.split(" ")[1][0]}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.spec} · {d.exp}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold">
                <Star className="h-3 w-3 fill-warning text-warning" /> {d.rating}
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">{d.slot}</span>
              <span className="text-xs text-primary font-semibold">Book →</span>
            </div>
          </Link>
        ))}
      </div>
    </MobileShell>
  );
}

function Option({ icon: Icon, title, desc, to, tone }: any) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl border p-4 ${
        tone === "primary" ? "bg-gradient-primary border-transparent text-primary-foreground shadow-soft" : "bg-card border-border"
      }`}
    >
      <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${tone === "primary" ? "bg-background/20" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className={`text-xs ${tone === "primary" ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{desc}</p>
      </div>
      <span className="text-lg">›</span>
    </Link>
  );
}
