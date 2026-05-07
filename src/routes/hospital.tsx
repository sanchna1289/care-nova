import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Activity, Bed, Users } from "lucide-react";

export const Route = createFileRoute("/hospital")({
  component: Hospital,
});

const patients = [
  { name: "Asha Kumari", sym: "Chest pain, breathlessness", sev: "emergency", time: "ETA 5 min", status: "Incoming" },
  { name: "Ravi Sharma", sym: "Severe abdominal pain", sev: "emergency", time: "Arrived 09:42", status: "Preparing" },
  { name: "Meera Joshi", sym: "Fever 102°F, dizziness", sev: "warning", time: "10:15 AM", status: "Ready" },
  { name: "Suresh Patil", sym: "Sore throat, fatigue", sev: "success", time: "10:30 AM", status: "Ready" },
];

function Hospital() {
  return (
    <MobileShell>
      <ScreenHeader title="Hospital control" subtitle="Apollo Hospital · ER Dashboard" />
      <div className="px-6">
        <div className="grid grid-cols-3 gap-2">
          <Stat icon={Activity} label="Active" value="12" />
          <Stat icon={Bed} label="Beds free" value="08" />
          <Stat icon={Users} label="On duty" value="24" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-semibold">Incoming patients</p>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emergency">
            <span className="h-2 w-2 rounded-full bg-emergency animate-pulse" /> LIVE
          </span>
        </div>

        <div className="space-y-2 mt-3">
          {patients.map((p) => (
            <PatientCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </MobileShell>
  );
}

function Stat({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3">
      <Icon className="h-4 w-4 text-primary" />
      <p className="text-xl font-bold mt-2">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}

function PatientCard({ name, sym, sev, time, status }: any) {
  const sevMap: Record<string, string> = {
    emergency: "bg-emergency text-emergency-foreground",
    warning: "bg-warning text-warning-foreground",
    success: "bg-success text-success-foreground",
  };
  const statusMap: Record<string, string> = {
    Incoming: "bg-emergency/10 text-emergency",
    Preparing: "bg-warning/15 text-warning-foreground",
    Ready: "bg-success/10 text-success",
  };
  return (
    <div className={`rounded-2xl bg-card border p-4 ${sev === "emergency" ? "border-emergency/40" : "border-border"} shadow-card`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm truncate">{name}</p>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${sevMap[sev]}`}>{sev}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{sym}</p>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded-full whitespace-nowrap ${statusMap[status]}`}>
          {status}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{time}</span>
        <button className="text-primary font-semibold">View profile →</button>
      </div>
    </div>
  );
}
