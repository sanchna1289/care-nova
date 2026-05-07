import { createFileRoute } from "@tanstack/react-router";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { ShieldCheck, BadgeCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/benefits")({
  component: Benefits,
});

const schemes = [
  { name: "Ayushman Bharat PM-JAY", cover: "₹5,00,000 / family / year", tag: "Eligible", desc: "Cashless secondary & tertiary care at empanelled hospitals." },
  { name: "Karnataka Arogya Karnataka", cover: "Free treatment up to ₹1.5L", tag: "Eligible", desc: "State scheme for BPL families across 1,500+ hospitals." },
  { name: "Janani Suraksha Yojana", cover: "₹1,400 cash assistance", tag: "Eligible", desc: "Maternity benefit for institutional delivery." },
  { name: "PM Jan Aushadhi", cover: "Up to 80% off medicines", tag: "Open", desc: "Generic medicines at Janaushadhi Kendras." },
];

function Benefits() {
  return (
    <MobileShell>
      <ScreenHeader title="Government schemes" subtitle="Personalized to your BPL profile" />
      <div className="px-6">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-5 shadow-soft">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            <p className="text-xs font-semibold uppercase tracking-wider opacity-90">Verified BPL</p>
          </div>
          <p className="mt-2 text-2xl font-bold">4 schemes match you</p>
          <p className="text-xs opacity-90 mt-1">Combined annual cover up to ₹6.5 Lakhs</p>
        </div>

        <div className="space-y-3 mt-4">
          {schemes.map((s) => (
            <div key={s.name} className="rounded-2xl bg-card border border-border p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{s.name}</p>
                  <p className="text-xs text-primary font-medium mt-0.5">{s.cover}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-success/10 text-success flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3" /> {s.tag}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{s.desc}</p>
              <button className="mt-3 text-xs font-semibold text-primary inline-flex items-center gap-1">
                Apply now <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </MobileShell>
  );
}
