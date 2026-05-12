import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Ambulance, MapPin, Phone, Clock, User, Activity } from "lucide-react";

export const Route = createFileRoute("/ambulance")({
  component: AmbulanceTrack,
});

function AmbulanceTrack() {
  const [eta, setEta] = useState(7);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const t = setInterval(() => {
      setEta((e) => (e > 1 ? e - 1 : e));
      setProgress((p) => Math.min(95, p + 7));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <MobileShell hideTabs>
      <div className="bg-gradient-emergency text-emergency-foreground px-6 pt-12 pb-8">
        <Link to="/emergency" className="text-xs opacity-80">← Back</Link>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] opacity-80">Ambulance dispatched</p>
        <h1 className="text-2xl font-bold mt-1">Help is on the way</h1>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-16 w-16 rounded-2xl bg-emergency-foreground/15 flex items-center justify-center animate-emergency-pulse">
            <Ambulance className="h-8 w-8" />
          </div>
          <div>
            <p className="text-3xl font-bold">{eta} <span className="text-base font-normal opacity-80">min ETA</span></p>
            <p className="text-xs opacity-80">Unit KA-05-AM-2241 · 2.4 km</p>
          </div>
        </div>
        <div className="mt-5 h-2 rounded-full bg-emergency-foreground/20 overflow-hidden">
          <div className="h-full bg-emergency-foreground transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] opacity-80">
          <span>Dispatched</span><span>En route</span><span>Arriving</span>
        </div>
      </div>

      <div className="px-6 -mt-4 space-y-3 pb-6">
        <div className="rounded-2xl bg-card border border-border p-4 shadow-card">
          <p className="text-sm font-semibold">Paramedic crew</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Vikram & team</p>
              <p className="text-xs text-muted-foreground">Advanced life support · 4 yrs</p>
            </div>
            <button className="h-9 w-9 rounded-full bg-success text-success-foreground flex items-center justify-center">
              <Phone className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <p className="text-sm font-semibold mb-2">Live status</p>
          <div className="space-y-2 text-xs">
            <Step ok icon={Activity} label="Patient vitals shared with ER" />
            <Step ok icon={MapPin} label="Live location streaming to crew" />
            <Step icon={Clock} label="Hospital prepping bay 4 — ETA aligned" />
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-4">
          <p className="text-sm font-semibold">Destination</p>
          <p className="text-sm mt-1">Apollo Hospital · Indiranagar</p>
          <p className="text-xs text-muted-foreground">Dr. Verma & trauma team standing by</p>
        </div>

        <Link to="/hospital" className="block w-full bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-sm font-semibold text-center shadow-soft">
          View hospital dashboard
        </Link>
      </div>
    </MobileShell>
  );
}

function Step({ ok, icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-6 w-6 rounded-full flex items-center justify-center ${ok ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
        <Icon className="h-3 w-3" />
      </span>
      <span className={ok ? "" : "text-muted-foreground"}>{label}</span>
    </div>
  );
}
