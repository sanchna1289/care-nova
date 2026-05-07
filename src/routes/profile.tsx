import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Edit3, Languages, Bell, FileText, LogOut, Building2 } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <MobileShell>
      <ScreenHeader title="Profile" />
      <div className="px-6">
        <div className="rounded-3xl bg-card border border-border p-5 shadow-card flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">A</div>
          <div className="flex-1">
            <p className="font-bold text-lg">Asha Kumari</p>
            <p className="text-xs text-muted-foreground">28 yrs · Female · BMI 22.1</p>
            <p className="text-[10px] text-success font-semibold mt-1">● BPL verified</p>
          </div>
          <Link to="/onboarding" className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center">
            <Edit3 className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="Visits" value="08" />
          <Stat label="Reports" value="14" />
          <Stat label="Schemes" value="04" />
        </div>

        <div className="mt-4 rounded-2xl bg-card border border-border divide-y divide-border">
          <Item icon={Languages} label="Language" right="English" />
          <Item icon={Bell} label="Notifications" right="On" />
          <Item icon={FileText} label="Medical records" right="" />
          <Link to="/hospital"><Item icon={Building2} label="Hospital portal view" right="" /></Link>
          <Item icon={LogOut} label="Sign out" right="" danger />
        </div>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value }: any) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3 text-center">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}
function Item({ icon: Icon, label, right, danger }: any) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon className={`h-4 w-4 ${danger ? "text-emergency" : "text-primary"}`} />
      <p className={`flex-1 text-sm font-medium ${danger ? "text-emergency" : ""}`}>{label}</p>
      {right && <span className="text-xs text-muted-foreground">{right}</span>}
      <span className="text-muted-foreground">›</span>
    </div>
  );
}
