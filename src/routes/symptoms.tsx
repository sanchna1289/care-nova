import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Mic, Keyboard, Languages, Square } from "lucide-react";

export const Route = createFileRoute("/symptoms")({
  component: Symptoms,
});

function Symptoms() {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const [lang, setLang] = useState("en-US");
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SR =
      (typeof window !== "undefined" &&
        ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)) ||
      null;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = lang;

    rec.onresult = (event: any) => {
      let finalText = "";
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) finalText += res[0].transcript;
        else interim += res[0].transcript;
      }
      setText((prev) => (finalText ? (prev + " " + finalText).trim() : prev) + (interim ? " " + interim : ""));
    };
    rec.onerror = (e: any) => {
      if (e.error === "not-allowed") setError("Microphone permission denied.");
      else if (e.error === "no-speech") setError("Didn't catch that — try again.");
      else setError("Voice error: " + e.error);
      setListening(false);
    };
    rec.onend = () => setListening(false);

    recognitionRef.current = rec;
    return () => {
      try { rec.stop(); } catch {}
    };
  }, [lang]);

  const start = () => {
    setError(null);
    setText((t) => t.replace(/\s+$/, ""));
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      // already started
    }
  };
  const stop = () => {
    try { recognitionRef.current?.stop(); } catch {}
    setListening(false);
  };

  const submit = () => {
    if (!text.trim()) {
      setError("Please speak or type your symptoms first.");
      return;
    }
    sessionStorage.setItem("carenova_symptoms", text.trim());
    navigate({ to: "/analysis" });
  };

  return (
    <MobileShell>
      <ScreenHeader title="Speak your symptoms" subtitle="Use your voice in any language" />
      <div className="px-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <Languages className="h-3 w-3 text-muted-foreground" />
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-xs bg-secondary rounded-full px-3 py-1.5 font-medium"
          >
            <option value="en-US">English</option>
            <option value="kn-IN">ಕನ್ನಡ</option>
            <option value="hi-IN">हिन्दी</option>
          </select>
        </div>

        <button
          onClick={listening ? stop : start}
          disabled={!supported}
          className={`relative h-44 w-44 rounded-full flex items-center justify-center transition active:scale-95 ${
            listening ? "bg-emergency animate-emergency-pulse" : "bg-gradient-primary animate-pulse-glow"
          } ${!supported ? "opacity-50" : ""}`}
        >
          <div className="absolute inset-3 rounded-full bg-background/10 backdrop-blur" />
          {listening ? (
            <Square className="relative h-16 w-16 text-emergency-foreground" fill="currentColor" />
          ) : (
            <Mic className="relative h-20 w-20 text-primary-foreground" strokeWidth={1.5} />
          )}
        </button>

        <p className="mt-5 text-sm font-medium">
          {!supported ? "Voice not supported — type below" : listening ? "Listening… tap to stop" : "Tap to speak"}
        </p>

        <div className="mt-3 flex items-end gap-1 h-8">
          {Array.from({ length: 18 }).map((_, i) => (
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

        <div className="w-full mt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Keyboard className="h-3.5 w-3.5" /> Transcript / type to edit
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. I have a fever and sore throat since morning…"
            rows={4}
            className="w-full rounded-2xl border border-input bg-card px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {error && <p className="text-xs text-emergency mt-2">{error}</p>}
          <button
            onClick={submit}
            className="mt-3 w-full bg-foreground text-background rounded-2xl py-3.5 text-sm font-semibold"
          >
            Analyze symptoms
          </button>
          <Link to="/home" className="block mt-2 text-center text-xs text-muted-foreground">Cancel</Link>
        </div>
      </div>
    </MobileShell>
  );
}
