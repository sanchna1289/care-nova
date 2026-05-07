import { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Stethoscope, Calendar, Shield, User } from "lucide-react";

const tabs = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/symptoms", icon: Stethoscope, label: "Symptoms" },
  { to: "/appointment", icon: Calendar, label: "Visits" },
  { to: "/benefits", icon: Shield, label: "Schemes" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function MobileShell({ children, hideTabs = false }: { children: ReactNode; hideTabs?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-gradient-soft flex justify-center">
      <div className="relative w-full max-w-[440px] min-h-screen bg-background shadow-card flex flex-col">
        <div className="flex-1 pb-24 animate-[fade-in_0.4s_ease-out]">{children}</div>
        {!hideTabs && (
          <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] border-t border-border bg-card/95 backdrop-blur-xl px-2 py-2 z-50">
            <div className="flex justify-between items-center">
              {tabs.map((t) => {
                const active = path.startsWith(t.to);
                const Icon = t.icon;
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl transition-colors"
                  >
                    <Icon className={`h-5 w-5 transition-colors ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {t.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}

export function ScreenHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: string }) {
  return (
    <div className="px-6 pt-12 pb-4">
      {back && (
        <Link to={back} className="text-xs text-muted-foreground mb-2 inline-flex items-center gap-1">
          ← Back
        </Link>
      )}
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}
