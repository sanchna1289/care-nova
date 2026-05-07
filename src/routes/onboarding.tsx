import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition";

function Onboarding() {
  const [name, setName] = useState("Asha Kumari");
  const [age, setAge] = useState("28");
  const [gender, setGender] = useState("Female");
  const [weight, setWeight] = useState("58");
  const [height, setHeight] = useState("162");
  const [allergies, setAllergies] = useState("Penicillin");
  const [conditions, setConditions] = useState("Mild asthma");
  const [bpl, setBpl] = useState("BPL-KA-2841-9921");

  const bmi = useMemo(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!w || !h) return null;
    return (w / (h * h)).toFixed(1);
  }, [weight, height]);

  const bmiCat = bmi
    ? +bmi < 18.5 ? "Underweight" : +bmi < 25 ? "Healthy" : +bmi < 30 ? "Overweight" : "Obese"
    : "";

  return (
    <MobileShell hideTabs>
      <ScreenHeader title="Health profile" subtitle="Helps us personalize every recommendation" back="/" />
      <div className="px-6 space-y-4 pb-8">
        <Field label="Full name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Age"><input className={inputCls} value={age} onChange={(e) => setAge(e.target.value)} /></Field>
          <Field label="Gender">
            <select className={inputCls} value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Female</option><option>Male</option><option>Other</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Weight (kg)"><input className={inputCls} value={weight} onChange={(e) => setWeight(e.target.value)} /></Field>
          <Field label="Height (cm)"><input className={inputCls} value={height} onChange={(e) => setHeight(e.target.value)} /></Field>
        </div>

        {bmi && (
          <div className="rounded-2xl bg-gradient-primary text-primary-foreground p-4 shadow-soft flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Your BMI</p>
              <p className="text-3xl font-bold">{bmi}</p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-background/20 text-xs font-semibold">{bmiCat}</span>
          </div>
        )}

        <Field label="Allergies"><input className={inputCls} value={allergies} onChange={(e) => setAllergies(e.target.value)} /></Field>
        <Field label="Existing conditions"><input className={inputCls} value={conditions} onChange={(e) => setConditions(e.target.value)} /></Field>
        <Field label="BPL / Ration card ID"><input className={inputCls} value={bpl} onChange={(e) => setBpl(e.target.value)} /></Field>

        <Link
          to="/home"
          className="block bg-gradient-primary text-primary-foreground rounded-2xl py-4 text-center font-semibold shadow-soft mt-4"
        >
          Save & Continue
        </Link>
      </div>
    </MobileShell>
  );
}
