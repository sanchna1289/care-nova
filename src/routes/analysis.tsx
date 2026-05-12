import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Loader2, Sparkles, Mic } from "lucide-react";
import { analyzeSymptoms, loadSymptoms, type Severity } from "@/lib/symptoms";

export const Route = createFileRoute("/analysis")({
  component: Analysis,
});

function Analysis() {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(loadSymptoms());
    const steps = [400, 900, 1500, 2100];
    const timers = steps.map((t, i) => setTimeout(() => setStep(i + 1), t));
    const final = setTimeout(() => setDone(true), 2300);
    return () => { timers.forEach(clearTimeout); clearTimeout(final); };
  }, []);

  const result = useMemo(() => analyzeSymptoms(input), [input]);

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="AI Analysis" subtitle="Reviewing your symptoms" back="/symptoms" />
      <div className="px-6 mt-4">
        {!done ? <Loading step={step} /> : <Results input={input} result={result} />}
      </div>
    </MobileShell>
  );
}

function Loading({ step }: { step: number }) {
  const stages = [
    "Voice transcribed",
    "Symptoms parsed",
    "Cross-checking 12,000+ medical references",
    "Severity classification",
  ];
  return (
    <div className="flex flex-col items-center py-12">
      <div className="relative h-36 w-36">
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-2xl animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <div className="absolute inset-3 rounded-full border-2 border-primary/10 border-b-primary-glow animate-spin" style={{ animationDuration: "3s", animationDirection: "reverse" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
      </div>
      <p className="mt-6 font-semibold">Analyzing speech…</p>
      <p className="text-xs text-muted-foreground mt-1">CareNova AI is reasoning over your symptoms</p>
      <div className="mt-6 space-y-2 text-xs w-full max-w-xs">
        {stages.map((s, i) => (
          <div key={s} className={`flex items-center gap-2 transition ${i < step ? "text-foreground" : i === step ? "text-primary" : "text-muted-foreground"}`}>
            {i < step ? (
              <span className="h-3 w-3 rounded-full bg-success flex items-center justify-center text-[8px] text-success-foreground">✓</span>
            ) : i === step ? (
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
            ) : (
              <span className="h-3 w-3 rounded-full border border-border" />
            )}
            <span>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Results({ input, result }: { input: string; result: ReturnType<typeof analyzeSymptoms> }) {
  const navigate = useNavigate();
  const recommendedTo =
    result.severity === "emergency" ? "/emergency" : result.severity === "warning" ? "/result/moderate" : "/result/mild";

  if (!input.trim()) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <Mic className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="text-sm font-semibold mt-3">No symptoms received</p>
        <p className="text-xs text-muted-foreground mt-1">Go back and speak or type your symptoms.</p>
        <Link to="/symptoms" className="mt-4 inline-block bg-foreground text-background rounded-xl px-4 py-2 text-xs font-semibold">
          Speak symptoms
        </Link>
      </div>
    );
  }

  const sevColor = result.severity === "emergency" ? "emergency" : result.severity === "warning" ? "warning" : "success";

  return (
    <div className="animate-[slide-up_0.4s_ease-out] pb-6">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your input</p>
      <div className="mt-2 rounded-2xl bg-secondary p-3 text-sm italic">"{input}"</div>

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-5">
        Detected symptoms · {result.found.length}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {result.found.length ? (
          result.found.map((s) => (
            <span
              key={s.label}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                s.severity === "emergency"
                  ? "bg-emergency/15 text-emergency"
                  : s.severity === "warning"
                  ? "bg-warning/20 text-warning-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {s.label}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">No specific symptoms recognized — defaulting to mild self-care.</span>
        )}
      </div>

      <div className={`mt-5 rounded-2xl p-4 border ${
        sevColor === "emergency" ? "bg-emergency/10 border-emergency/30" :
        sevColor === "warning" ? "bg-warning/10 border-warning/40" :
        "bg-success/10 border-success/30"
      }`}>
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Severity classification</p>
        <p className="text-lg font-bold mt-1 capitalize">{result.severity === "success" ? "Mild" : result.severity === "warning" ? "Moderate" : "Emergency"}</p>
        <p className="text-xs mt-1 opacity-80">
          {result.severity === "emergency"
            ? "Critical signs detected. Triggering emergency response now."
            : result.severity === "warning"
            ? "Moderate severity — book a doctor consult within 24 hours."
            : "Mild presentation — home care and rest should help."}
        </p>
      </div>

      {result.tests.length > 0 && (
        <>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6">Recommended tests</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {result.tests.slice(0, 6).map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
            ))}
          </div>
        </>
      )}

      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6">Suggested specialist</p>
      <div className="mt-2 rounded-2xl bg-card border border-border p-3 text-sm font-medium">{result.specialist}</div>

      <button
        onClick={() => navigate({ to: recommendedTo })}
        className="mt-6 w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 font-semibold shadow-soft"
      >
        See recommended actions
      </button>
    </div>
  );
}
