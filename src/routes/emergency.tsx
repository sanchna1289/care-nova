import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { MobileShell } from "@/components/MobileShell";
import { AlertTriangle, MapPin, Phone, Ambulance, FlaskConical } from "lucide-react";
import { analyzeSymptoms, loadSymptoms } from "@/lib/symptoms";

export const Route = createFileRoute("/emergency")({
  component: Emergency,
});

function Emergency() {
  const result = useMemo(() => analyzeSymptoms(loadSymptoms()), []);
  const condition = result.found.find((f) => f.severity === "emergency")?.label || "Critical condition";
  const tests = result.tests.slice(0, 4);

  return (
    <MobileShell hideTabs>
      <div className="bg-gradient-emergency text-emergency-foreground min-h-screen px-6 pt-12 pb-10">
        <Link to="/analysis" className="text-xs opacity-80">← Back</Link>

        <div className="flex flex-col items-center mt-6">
          <div className="relative h-36 w-36 rounded-full bg-emergency-foreground/10 flex items-center justify-center animate-emergency-pulse">
            <div className="absolute inset-4 rounded-full bg-emergency-foreground/15" />
            <AlertTriangle className="relative h-14 w-14" strokeWidth={1.8} />
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.3em] opacity-80">Emergency detected</p>
          <h1 className="text-2xl font-bold mt-2 text-center leading-tight">{condition}</h1>
          <p className="text-xs opacity-90 mt-1 text-center">Connecting you to nearest hospital</p>
        </div>

        <div className="mt-6 rounded-3xl bg-emergency-foreground/10 backdrop-blur p-5 space-y-3">
          <Row icon={MapPin} title="Apollo Hospital" desc="2.4 km · ETA 7 mins" />
          <div className="h-px bg-emergency-foreground/20" />
          <Row icon={Ambulance} title="Ambulance dispatched" desc="Unit KA-05-AM-2241" />
          <div className="h-px bg-emergency-foreground/20" />
          <Row icon={Phone} title="ER team notified" desc={`${result.specialist} standing by`} />
        </div>

        {tests.length > 0 && (
          <div className="mt-4 rounded-2xl bg-emergency-foreground/10 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FlaskConical className="h-4 w-4" /> ER preparing
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {tests.map((t) => (
                <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-emergency-foreground/20 font-medium">{t}</span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 rounded-2xl bg-emergency-foreground/10 p-4 text-sm">
          <p className="font-semibold">Sharing with hospital</p>
          <ul className="mt-2 space-y-1 text-xs opacity-90">
            <li>• Vitals · BP, SpO₂, HR</li>
            <li>• Symptoms: {result.found.map((f) => f.label).join(", ") || "as reported"}</li>
            <li>• Allergy: Penicillin</li>
            <li>• Live GPS location</li>
          </ul>
        </div>

        <Link to="/ambulance" className="mt-5 block w-full bg-emergency-foreground text-emergency rounded-2xl py-4 font-bold shadow-soft text-center active:scale-[0.98] transition">
          Track ambulance live
        </Link>
        <Link to="/hospital" className="mt-3 block text-center text-xs opacity-80 underline">
          View hospital dashboard →
        </Link>
      </div>
    </MobileShell>
  );
}

function Row({ icon: Icon, title, desc }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-emergency-foreground/15 flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs opacity-80">{desc}</p>
      </div>
    </div>
  );
}
