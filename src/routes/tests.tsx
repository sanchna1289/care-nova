import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { FlaskConical, Clock, MapPin, Check } from "lucide-react";
import { analyzeSymptoms, loadSymptoms } from "@/lib/symptoms";

export const Route = createFileRoute("/tests")({
  component: Tests,
});

function Tests() {
  const result = useMemo(() => analyzeSymptoms(loadSymptoms()), []);
  const tests = result.tests.length ? result.tests : ["CBC (Complete Blood Count)", "Vitamin D3", "Thyroid TSH"];
  const urgency = result.severity === "emergency" ? "Within 1 hour" : result.severity === "warning" ? "Today" : "Within a week";

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="Diagnostic tests" subtitle="AI-recommended based on your symptoms" back="/analysis" />
      <div className="px-6 space-y-4 pb-6">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-5 shadow-soft">
          <div className="flex items-center gap-2 text-xs opacity-90"><Clock className="h-3.5 w-3.5" /> Suggested timing</div>
          <p className="text-2xl font-bold mt-1">{urgency}</p>
          <p className="text-xs opacity-90 mt-1">{tests.length} tests · Apollo Diagnostics, 1.8 km</p>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Recommended panel</p>
          </div>
          <div className="space-y-2">
            {tests.map((t, i) => (
              <div key={t} className="flex items-center justify-between text-sm border-b last:border-0 border-border py-2">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span>{t}</span>
                </div>
                <Check className="h-4 w-4 text-success" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <p className="text-sm font-semibold">Sample collection</p>
          <div className="mt-2 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Home collection · Tomorrow 7:00–9:00 AM</div>
            <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-primary" /> Reports in 6–8 hrs via app</div>
          </div>
        </div>

        <Link to="/appointment" className="block rounded-2xl bg-gradient-primary text-primary-foreground py-4 text-sm font-semibold text-center shadow-soft">
          Confirm test booking
        </Link>
      </div>
    </MobileShell>
  );
}
