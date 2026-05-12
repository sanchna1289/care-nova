import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Leaf, Pill, AlertCircle, Bell, Stethoscope, FlaskConical } from "lucide-react";
import { analyzeSymptoms, loadSymptoms } from "@/lib/symptoms";

export const Route = createFileRoute("/result/mild")({
  component: Mild,
});

function Mild() {
  const result = useMemo(() => analyzeSymptoms(loadSymptoms()), []);
  const remedies = result.remedies.length ? result.remedies : ["Rest 7–8 hrs and hydrate well", "Light, easy-to-digest meals", "Monitor for any worsening"];
  const otc = result.otc.length ? result.otc : [{ name: "Paracetamol 500mg", dose: "Every 6 hrs as needed" }];
  const labels = result.found.map((f) => f.label).join(", ") || "general mild symptoms";

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="Mild condition" subtitle="You can manage this at home" back="/analysis" />
      <div className="px-6 space-y-4 pb-6">
        <div className="rounded-2xl bg-success/10 border border-success/30 p-4 flex items-start gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-success mt-1.5" />
          <div>
            <p className="font-semibold text-sm">Reassuring news</p>
            <p className="text-xs text-muted-foreground mt-0.5">Personalized care plan for: {labels}.</p>
          </div>
        </div>

        <Section title="Home remedies" icon={Leaf}>
          {remedies.map((t) => <Bullet key={t}>{t}</Bullet>)}
        </Section>

        <Section title="Suggested OTC" icon={Pill}>
          {otc.map((m) => (
            <div key={m.name} className="flex items-start justify-between gap-2 text-sm">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.dose}</p>
              </div>
              <Link to="/reminders" className="text-xs text-primary font-semibold whitespace-nowrap">+ Remind</Link>
            </div>
          ))}
        </Section>

        {result.tests.length > 0 && (
          <Section title="Optional tests" icon={FlaskConical}>
            {result.tests.slice(0, 3).map((t) => <Bullet key={t}>{t}</Bullet>)}
          </Section>
        )}

        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Allergy alert</p>
            <p className="text-xs text-muted-foreground">Penicillin avoided in your suggestions. Flagged on your profile.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link to="/reminders" className="rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
            <Bell className="h-4 w-4" /> Set reminders
          </Link>
          <Link to="/appointment" className="rounded-2xl bg-gradient-primary text-primary-foreground py-3.5 text-sm font-semibold flex items-center justify-center gap-2 shadow-soft">
            <Stethoscope className="h-4 w-4" /> Talk to doctor
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div className="rounded-2xl bg-card border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <p className="font-semibold text-sm">{title}</p>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-primary mt-1">•</span>
      <span className="text-foreground/80">{children}</span>
    </div>
  );
}
