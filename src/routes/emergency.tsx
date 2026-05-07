import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { AlertTriangle, MapPin, Phone, Ambulance } from "lucide-react";

export const Route = createFileRoute("/emergency")({
  component: Emergency,
});

function Emergency() {
  return (
    <MobileShell hideTabs>
      <div className="bg-gradient-emergency text-emergency-foreground min-h-screen px-6 pt-12 pb-10">
        <Link to="/analysis" className="text-xs opacity-80">← Back</Link>

        <div className="flex flex-col items-center mt-8">
          <div className="relative h-40 w-40 rounded-full bg-emergency-foreground/10 flex items-center justify-center animate-emergency-pulse">
            <div className="absolute inset-4 rounded-full bg-emergency-foreground/15" />
            <AlertTriangle className="relative h-16 w-16" strokeWidth={1.8} />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] opacity-80">Emergency detected</p>
          <h1 className="text-3xl font-bold mt-2 text-center leading-tight">Connecting you to nearest hospital</h1>
        </div>

        <div className="mt-8 rounded-3xl bg-emergency-foreground/10 backdrop-blur p-5 space-y-3">
          <Row icon={MapPin} title="Apollo Hospital" desc="2.4 km · ETA 7 mins" />
          <div className="h-px bg-emergency-foreground/20" />
          <Row icon={Ambulance} title="Ambulance dispatched" desc="Unit KA-05-AM-2241" />
          <div className="h-px bg-emergency-foreground/20" />
          <Row icon={Phone} title="ER team notified" desc="Dr. Verma standing by" />
        </div>

        <div className="mt-6 rounded-2xl bg-emergency-foreground/10 p-4 text-sm">
          <p className="font-semibold">Sharing with hospital</p>
          <ul className="mt-2 space-y-1 text-xs opacity-90">
            <li>• Vitals · BP, SpO₂, HR</li>
            <li>• Allergy: Penicillin</li>
            <li>• Condition: Mild asthma</li>
            <li>• Live GPS location</li>
          </ul>
        </div>

        <button className="mt-6 w-full bg-emergency-foreground text-emergency rounded-2xl py-4 font-bold shadow-soft active:scale-[0.98] transition">
          Send Emergency Alert
        </button>
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
