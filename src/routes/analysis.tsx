import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/analysis")({
  component: Analysis,
});

function Analysis() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="AI Analysis" subtitle="Reviewing your symptoms" back="/symptoms" />
      <div className="px-6 mt-4">
        {!done ? <Loading /> : <Results />}
      </div>
    </MobileShell>
  );
}

function Loading() {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
      </div>
      <p className="mt-6 font-semibold">Analyzing symptoms…</p>
      <p className="text-xs text-muted-foreground mt-1">Cross-checking 12,000+ medical references</p>
      <div className="mt-6 space-y-1.5 text-xs text-muted-foreground w-full max-w-xs">
        {["Voice transcribed", "Symptoms parsed", "Severity classification…"].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin text-primary" style={{ animationDelay: `${i * 0.2}s` }} />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function Results() {
  const navigate = useNavigate();
  return (
    <div className="animate-[slide-up_0.4s_ease-out]">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Detected symptoms</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {["Fever 100.8°F", "Sore throat", "Mild fatigue", "Body ache"].map((s) => (
          <span key={s} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">{s}</span>
        ))}
      </div>

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6">Severity</p>
      <div className="space-y-2 mt-2">
        <SeverityRow color="success" label="Mild" desc="Self-care possible" to="/result/mild" />
        <SeverityRow color="warning" label="Moderate" desc="Doctor consult recommended" to="/result/moderate" highlight />
        <SeverityRow color="emergency" label="Emergency" desc="Immediate care needed" to="/emergency" />
      </div>

      <div className="rounded-2xl bg-accent/40 border border-border p-4 mt-6">
        <p className="text-xs font-semibold">AI Recommendation</p>
        <p className="text-sm mt-1">Likely viral upper respiratory infection. Moderate severity — booking a doctor consult is advised within 24 hours.</p>
      </div>

      <button
        onClick={() => navigate({ to: "/result/moderate" })}
        className="mt-4 w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 font-semibold shadow-soft"
      >
        See recommended actions
      </button>
    </div>
  );
}

function SeverityRow({ color, label, desc, to, highlight }: any) {
  const map: Record<string, string> = {
    success: "bg-success",
    warning: "bg-warning",
    emergency: "bg-emergency",
  };
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-2xl border p-3 ${highlight ? "border-primary bg-primary/5" : "border-border bg-card"}`}
    >
      <span className={`h-3 w-3 rounded-full ${map[color]}`} />
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {highlight && <span className="text-[10px] font-semibold text-primary">SELECTED</span>}
    </Link>
  );
}
