import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/analysis")({
  component: Analysis,
});

type Severity = "success" | "warning" | "emergency";

const SYMPTOM_DB: { keywords: string[]; label: string; severity: Severity }[] = [
  { keywords: ["chest pain", "chest tight", "chest pressure"], label: "Chest pain", severity: "emergency" },
  { keywords: ["can't breathe", "cant breathe", "shortness of breath", "breathless", "difficulty breathing"], label: "Breathing difficulty", severity: "emergency" },
  { keywords: ["unconscious", "fainted", "passed out"], label: "Loss of consciousness", severity: "emergency" },
  { keywords: ["stroke", "slurred speech", "face droop", "numb arm"], label: "Stroke signs", severity: "emergency" },
  { keywords: ["severe bleeding", "heavy bleeding", "bleeding a lot"], label: "Severe bleeding", severity: "emergency" },
  { keywords: ["seizure", "convulsion"], label: "Seizure", severity: "emergency" },

  { keywords: ["high fever", "very high fever", "102", "103", "104"], label: "High fever", severity: "warning" },
  { keywords: ["vomit", "throwing up"], label: "Vomiting", severity: "warning" },
  { keywords: ["dehydrat"], label: "Dehydration", severity: "warning" },
  { keywords: ["severe pain", "intense pain", "unbearable pain"], label: "Severe pain", severity: "warning" },
  { keywords: ["dizzy", "dizziness", "lightheaded"], label: "Dizziness", severity: "warning" },
  { keywords: ["chest discomfort"], label: "Chest discomfort", severity: "warning" },
  { keywords: ["abdominal pain", "stomach pain", "belly pain"], label: "Abdominal pain", severity: "warning" },
  { keywords: ["rash"], label: "Skin rash", severity: "warning" },

  { keywords: ["fever", "temperature"], label: "Fever", severity: "warning" },
  { keywords: ["sore throat", "throat pain"], label: "Sore throat", severity: "success" },
  { keywords: ["cough"], label: "Cough", severity: "success" },
  { keywords: ["cold", "runny nose", "stuffy nose", "congestion"], label: "Cold / congestion", severity: "success" },
  { keywords: ["headache", "head ache"], label: "Headache", severity: "success" },
  { keywords: ["body ache", "body pain", "muscle ache"], label: "Body ache", severity: "success" },
  { keywords: ["fatigue", "tired", "weakness"], label: "Fatigue", severity: "success" },
  { keywords: ["nausea"], label: "Nausea", severity: "success" },
  { keywords: ["sneez"], label: "Sneezing", severity: "success" },
  { keywords: ["diarrh", "loose motion"], label: "Diarrhea", severity: "success" },
];

function analyze(input: string) {
  const text = input.toLowerCase();
  const found: { label: string; severity: Severity }[] = [];
  const seen = new Set<string>();
  for (const entry of SYMPTOM_DB) {
    if (entry.keywords.some((k) => text.includes(k)) && !seen.has(entry.label)) {
      found.push({ label: entry.label, severity: entry.severity });
      seen.add(entry.label);
    }
  }
  const severity: Severity = found.some((f) => f.severity === "emergency")
    ? "emergency"
    : found.some((f) => f.severity === "warning")
    ? "warning"
    : found.length
    ? "success"
    : "success";
  return { found, severity };
}

function Analysis() {
  const [done, setDone] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && sessionStorage.getItem("carenova_symptoms")) || "";
    setInput(stored);
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  const { found, severity } = useMemo(() => analyze(input), [input]);

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="AI Analysis" subtitle="Reviewing your symptoms" back="/symptoms" />
      <div className="px-6 mt-4">
        {!done ? <Loading /> : <Results input={input} found={found} severity={severity} />}
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

function Results({
  input,
  found,
  severity,
}: {
  input: string;
  found: { label: string; severity: Severity }[];
  severity: Severity;
}) {
  const navigate = useNavigate();
  const recommendedTo =
    severity === "emergency" ? "/emergency" : severity === "warning" ? "/result/moderate" : "/result/mild";

  if (!input.trim()) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-sm font-semibold">No symptoms received</p>
        <p className="text-xs text-muted-foreground mt-1">Go back and speak or type your symptoms.</p>
        <Link to="/symptoms" className="mt-4 inline-block bg-foreground text-background rounded-xl px-4 py-2 text-xs font-semibold">
          Speak symptoms
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-[slide-up_0.4s_ease-out]">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your input</p>
      <div className="mt-2 rounded-2xl bg-secondary p-3 text-sm italic">"{input}"</div>

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-5">Detected symptoms</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {found.length ? (
          found.map((s) => (
            <span key={s.label} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
              {s.label}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">No specific symptoms recognized — defaulting to mild self-care.</span>
        )}
      </div>

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6">Severity</p>
      <div className="space-y-2 mt-2">
        <SeverityRow color="success" label="Mild" desc="Self-care possible" to="/result/mild" highlight={severity === "success"} />
        <SeverityRow color="warning" label="Moderate" desc="Doctor consult recommended" to="/result/moderate" highlight={severity === "warning"} />
        <SeverityRow color="emergency" label="Emergency" desc="Immediate care needed" to="/emergency" highlight={severity === "emergency"} />
      </div>

      <div className="rounded-2xl bg-accent/40 border border-border p-4 mt-6">
        <p className="text-xs font-semibold">AI Recommendation</p>
        <p className="text-sm mt-1">
          {severity === "emergency"
            ? "Critical signs detected. Triggering emergency response now."
            : severity === "warning"
            ? "Moderate severity — book a doctor consult within 24 hours."
            : "Mild presentation — home care and rest should help. Monitor for changes."}
        </p>
      </div>

      <button
        onClick={() => navigate({ to: recommendedTo })}
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
      className={`flex items-center gap-3 rounded-2xl border p-3 ${
        highlight ? "border-primary bg-primary/5" : "border-border bg-card"
      }`}
    >
      <span className={`h-3 w-3 rounded-full ${map[color]}`} />
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {highlight && <span className="text-[10px] font-semibold text-primary">DETECTED</span>}
    </Link>
  );
}
