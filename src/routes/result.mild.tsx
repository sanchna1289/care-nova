import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Leaf, Pill, AlertCircle, Bookmark, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/result/mild")({
  component: Mild,
});

function Mild() {
  return (
    <MobileShell hideTabs>
      <ScreenHeader title="Mild condition" subtitle="You can manage this at home" back="/analysis" />
      <div className="px-6 space-y-4">
        <div className="rounded-2xl bg-success/10 border border-success/30 p-4 flex items-start gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-success mt-1.5" />
          <div>
            <p className="font-semibold text-sm">Reassuring news</p>
            <p className="text-xs text-muted-foreground mt-0.5">Symptoms suggest a mild viral cold. Rest and hydration usually resolve this in 2–3 days.</p>
          </div>
        </div>

        <Section title="Home remedies" icon={Leaf}>
          {["Warm water with honey & ginger — 3x daily", "Steam inhalation, 10 mins twice a day", "Saltwater gargle for sore throat", "Rest 7–8 hrs and hydrate well"].map((t) => (
            <Bullet key={t}>{t}</Bullet>
          ))}
        </Section>

        <Section title="Suggested OTC" icon={Pill}>
          <Bullet>Paracetamol 500mg — for fever, every 6 hrs</Bullet>
          <Bullet>Lozenges — for throat relief</Bullet>
        </Section>

        <div className="rounded-2xl border border-warning/40 bg-warning/10 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Allergy alert</p>
            <p className="text-xs text-muted-foreground">Penicillin avoided in your suggestions. We've flagged this on your profile.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button className="rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold flex items-center justify-center gap-2">
            <Bookmark className="h-4 w-4" /> Save advice
          </button>
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
