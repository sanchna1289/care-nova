import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Calendar, Video, Leaf, Star } from "lucide-react";

export const Route = createFileRoute("/result/moderate")({
  component: Moderate,
});

const doctors = [
  { name: "Dr. Rohan Mehta", spec: "General Physician", rating: 4.9, exp: "12 yrs", slot: "Today · 4:30 PM" },
  { name: "Dr. Priya Iyer", spec: "ENT Specialist", rating: 4.8, exp: "9 yrs", slot: "Today · 6:00 PM" },
];

function Moderate() {
  return (
    <MobileShell hideTabs>
      <ScreenHeader title="Moderate condition" subtitle="Doctor consultation recommended" back="/analysis" />
      <div className="px-6 space-y-3">
        <Option icon={Calendar} title="Book in-person visit" desc="Nearest clinic 1.2 km" to="/appointment" tone="primary" />
        <Option icon={Video} title="Video consultation" desc="Available in 15 mins" to="/appointment" />
        <Option icon={Leaf} title="Get remedies instead" desc="Home care suggestions" to="/result/mild" />

        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 px-1">Recommended specialists</p>
        <div className="space-y-2">
          {doctors.map((d) => (
            <Link key={d.name} to="/appointment" className="block rounded-2xl bg-card border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {d.name.split(" ")[1][0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{d.name}</p>
                  <p className="text-xs text-muted-foreground">{d.spec} · {d.exp}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-semibold">
                    <Star className="h-3 w-3 fill-warning text-warning" /> {d.rating}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success font-medium">{d.slot}</span>
                <span className="text-xs text-primary font-semibold">Book →</span>
              </div>
            </Link>
          ))}
        </div>
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
