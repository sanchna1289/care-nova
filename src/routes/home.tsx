import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { Mic, Calendar, AlertTriangle, Building2, Activity, FlaskConical, Bell, Pill } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: Home,
});

function Home() {
  return (
    <MobileShell>
      <div className="px-6 pt-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Good morning</p>
            <h1 className="text-2xl font-bold tracking-tight">Asha 👋</h1>
          </div>
          <div className="h-11 w-11 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">A</div>
        </div>

        <Link
          to="/symptoms"
          className="mt-6 block relative overflow-hidden rounded-3xl bg-gradient-primary p-6 shadow-soft active:scale-[0.99] transition"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-glow/40 blur-2xl" />
          <div className="relative">
            <p className="text-primary-foreground/80 text-xs font-medium">Voice-first AI</p>
            <h2 className="text-primary-foreground text-xl font-bold mt-1">Tap to speak symptoms</h2>
            <div className="mt-4 inline-flex items-center gap-2 bg-background/20 backdrop-blur rounded-full px-3 py-2">
              <Mic className="h-4 w-4 text-primary-foreground" />
              <span className="text-xs text-primary-foreground font-medium">Start now</span>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <QuickAction to="/appointment" icon={Calendar} label="Doctor" tone="soft" />
          <QuickAction to="/tests" icon={FlaskConical} label="Tests" tone="soft" />
          <QuickAction to="/reminders" icon={Bell} label="Reminders" tone="soft" />
          <QuickAction to="/emergency" icon={AlertTriangle} label="SOS" tone="emergency" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <QuickAction to="/hospital" icon={Building2} label="Hospital view" tone="soft" wide />
          <QuickAction to="/reminders" icon={Pill} label="My medications" tone="soft" wide />
        </div>

        <h3 className="mt-7 mb-3 text-sm font-semibold tracking-tight">Today's vitals</h3>
        <div className="rounded-2xl bg-card border border-border shadow-card p-4">
          <div className="flex items-center justify-between">
            <Vital label="Heart rate" value="72" unit="bpm" />
            <Vital label="SpO₂" value="98" unit="%" />
            <Vital label="Steps" value="4.2k" unit="" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-success" /> All metrics within normal range
          </div>
        </div>

        <h3 className="mt-7 mb-3 text-sm font-semibold tracking-tight">Recent activity</h3>
        <div className="space-y-2">
          {[
            { t: "Mild headache logged", d: "Yesterday · home remedies sent" },
            { t: "Dr. Mehta consultation", d: "2 days ago · video call" },
          ].map((r) => (
            <div key={r.t} className="rounded-2xl bg-card border border-border p-4">
              <p className="text-sm font-medium">{r.t}</p>
              <p className="text-xs text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

function QuickAction({ to, icon: Icon, label, tone, wide }: any) {
  const tones: Record<string, string> = {
    primary: "bg-card border-border",
    soft: "bg-card border-border",
    emergency: "bg-emergency/10 border-emergency/30",
  };
  const iconCls: Record<string, string> = {
    primary: "text-primary bg-primary/10",
    soft: "text-primary bg-primary/10",
    emergency: "text-emergency bg-emergency/15",
  };
  return (
    <Link to={to} className={`rounded-2xl border ${tones[tone]} ${wide ? "p-4" : "p-3"} shadow-card`}>
      <div className={`h-9 w-9 rounded-xl ${iconCls[tone]} flex items-center justify-center mb-2`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className={`${wide ? "text-sm" : "text-xs"} font-semibold`}>{label}</p>
    </Link>
  );
}

function Vital({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-xl font-bold mt-0.5">{value}<span className="text-xs text-muted-foreground font-normal ml-0.5">{unit}</span></p>
    </div>
  );
}
