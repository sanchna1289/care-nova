import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Check, Calendar, Video, FileText, MapPin } from "lucide-react";

export const Route = createFileRoute("/appointment")({
  component: Appointment,
});

function Appointment() {
  return (
    <MobileShell>
      <ScreenHeader title="Appointment confirmed" subtitle="We've shared your summary with the doctor" />
      <div className="px-6">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-5 shadow-soft relative overflow-hidden">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-glow/40 blur-2xl" />
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-background/20 flex items-center justify-center mb-3">
              <Check className="h-6 w-6" strokeWidth={3} />
            </div>
            <p className="text-xs opacity-80">Confirmation #CN-29481</p>
            <h2 className="text-xl font-bold mt-1">You're booked with Dr. Mehta</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Mini icon={Calendar} label="Today" value="4:30 PM" />
              <Mini icon={Video} label="Mode" value="Video call" />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center font-semibold">RM</div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Dr. Rohan Mehta</p>
              <p className="text-xs text-muted-foreground">General Physician · MBBS, MD · 12 yrs</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> Apollo Clinic, Indiranagar
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-card border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <p className="text-sm font-semibold">Shared with doctor</p>
          </div>
          <ul className="space-y-1.5 text-xs text-foreground/80">
            <li>• Symptoms: Fever, sore throat, fatigue</li>
            <li>• AI severity: Moderate</li>
            <li>• Allergies: Penicillin</li>
            <li>• Conditions: Mild asthma</li>
            <li>• BMI: 22.1 (Healthy)</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <button className="rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold">Reschedule</button>
          <Link to="/home" className="rounded-2xl bg-foreground text-background py-3.5 text-sm font-semibold text-center">Done</Link>
        </div>
      </div>
    </MobileShell>
  );
}

function Mini({ icon: Icon, label, value }: any) {
  return (
    <div className="rounded-2xl bg-background/15 backdrop-blur p-3">
      <Icon className="h-4 w-4 opacity-80" />
      <p className="text-[10px] opacity-80 mt-2 uppercase tracking-wider">{label}</p>
      <p className="font-semibold text-sm">{value}</p>
    </div>
  );
}
