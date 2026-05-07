import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Activity, Heart, Mic, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CareNova — From symptoms to action instantly" },
      { name: "description", content: "Voice-first AI healthcare assistant for instant action." },
    ],
  }),
  component: Welcome,
});

const langs = [
  { code: "en", label: "English", native: "English" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
];

function Welcome() {
  const [lang, setLang] = useState("en");
  return (
    <MobileShell hideTabs>
      <div className="flex flex-col min-h-screen px-6 pt-16 pb-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-10 w-10 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-soft">
            <Heart className="h-5 w-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground leading-none">Welcome to</p>
            <h1 className="text-xl font-bold tracking-tight">CareNova</h1>
          </div>
        </div>

        <div className="relative my-8 flex justify-center">
          <div className="absolute inset-0 bg-gradient-glow blur-2xl" />
          <div className="relative h-56 w-56 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
            <div className="h-44 w-44 rounded-full bg-background/95 flex items-center justify-center">
              <div className="relative">
                <Mic className="h-20 w-20 text-primary" strokeWidth={1.5} />
                <Activity className="h-6 w-6 text-primary-glow absolute -top-2 -right-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">From symptoms<br />to action <span className="text-primary">instantly</span></h2>
          <p className="text-sm text-muted-foreground mt-3 px-4">Your voice-first AI healthcare companion</p>
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">Choose your language</p>
          <div className="grid grid-cols-3 gap-2">
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`p-3 rounded-2xl border transition-all ${
                  lang === l.code
                    ? "border-primary bg-primary/5 shadow-soft"
                    : "border-border bg-card"
                }`}
              >
                <div className="text-base font-semibold">{l.native}</div>
                <div className="text-[10px] text-muted-foreground">{l.label}</div>
              </button>
            ))}
          </div>
        </div>

        <Link
          to="/onboarding"
          className="mt-auto bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-center font-semibold shadow-soft active:scale-[0.98] transition-transform"
        >
          Get Started
        </Link>
        <p className="text-[10px] text-center text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <ShieldCheck className="h-3 w-3" /> HIPAA-grade privacy · End-to-end encrypted
        </p>
      </div>
    </MobileShell>
  );
}
