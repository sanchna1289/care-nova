import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Mic, Keyboard, Languages } from "lucide-react";

export const Route = createFileRoute("/symptoms")({
  component: Symptoms,
});

function Symptoms() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const submit = () => navigate({ to: "/analysis" });

  return (
    <MobileShell>
      <ScreenHeader title="Speak your symptoms" subtitle="Use your voice in any language" />
      <div className="px-6 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
          <Languages className="h-3 w-3" /> English · ಕನ್ನಡ · हिन्दी
        </div>

        <button
          onClick={() => { setListening(true); setTimeout(submit, 1800); }}
          className="relative h-48 w-48 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow active:scale-95 transition"
        >
          <div className="absolute inset-3 rounded-full bg-background/10 backdrop-blur" />
          <Mic className="relative h-20 w-20 text-primary-foreground" strokeWidth={1.5} />
        </button>

        <p className="mt-6 text-sm font-medium text-foreground">
          {listening ? "Listening…" : "Tap to speak"}
        </p>

        <div className="mt-4 flex items-end gap-1 h-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-primary"
              style={{
                height: `${30 + Math.sin(i) * 30 + (listening ? 30 : 0)}%`,
                animation: listening ? `wave 1s ease-in-out ${i * 0.06}s infinite` : "none",
              }}
            />
          ))}
        </div>

        <div className="w-full mt-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Keyboard className="h-3.5 w-3.5" /> Or type instead
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. I have a fever and sore throat since morning…"
            rows={3}
            className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Link
            to="/analysis"
            className="mt-3 block bg-foreground text-background rounded-2xl py-3.5 text-center text-sm font-semibold"
          >
            Analyze symptoms
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
