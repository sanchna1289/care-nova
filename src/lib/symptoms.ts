export type Severity = "success" | "warning" | "emergency";

export interface SymptomEntry {
  keywords: string[];
  label: string;
  severity: Severity;
  remedies: string[];
  otc: { name: string; dose: string }[];
  tests: string[];
  specialist: string;
}

export const SYMPTOM_DB: SymptomEntry[] = [
  {
    keywords: ["chest pain", "chest tight", "chest pressure", "heart pain"],
    label: "Chest pain",
    severity: "emergency",
    remedies: ["Sit upright, loosen tight clothing", "Stay calm — do not exert", "Chew an aspirin if available and not allergic"],
    otc: [{ name: "Aspirin 300mg", dose: "Chew once if no allergy" }],
    tests: ["12-lead ECG", "Troponin blood test", "Chest X-ray", "Blood pressure"],
    specialist: "Cardiologist",
  },
  {
    keywords: ["breathless", "breathing difficulty", "shortness of breath", "can't breathe", "cant breathe"],
    label: "Breathing difficulty",
    severity: "emergency",
    remedies: ["Sit upright, lean slightly forward", "Use prescribed inhaler immediately", "Open windows for fresh air"],
    otc: [{ name: "Salbutamol inhaler", dose: "2 puffs as needed" }],
    tests: ["SpO₂ pulse oximetry", "Peak flow", "Chest X-ray", "Arterial blood gas"],
    specialist: "Pulmonologist",
  },
  {
    keywords: ["unconscious", "fainted", "passed out", "blackout"],
    label: "Loss of consciousness",
    severity: "emergency",
    remedies: ["Lay flat, elevate legs 12 inches", "Check breathing and pulse", "Do not give food or water"],
    otc: [],
    tests: ["ECG", "Blood glucose", "CT brain", "Electrolytes panel"],
    specialist: "Emergency physician",
  },
  {
    keywords: ["stroke", "slurred speech", "face droop", "numb arm", "weakness one side"],
    label: "Stroke signs",
    severity: "emergency",
    remedies: ["Note time symptoms started", "Keep patient still and calm", "Do not give aspirin without medical advice"],
    otc: [],
    tests: ["CT brain (urgent)", "MRI brain", "Carotid doppler", "Coagulation profile"],
    specialist: "Neurologist",
  },
  {
    keywords: ["severe bleeding", "heavy bleeding", "bleeding a lot"],
    label: "Severe bleeding",
    severity: "emergency",
    remedies: ["Apply firm direct pressure", "Elevate the wound above heart", "Do not remove embedded objects"],
    otc: [],
    tests: ["Hemoglobin / CBC", "Blood typing & cross-match", "Coagulation profile"],
    specialist: "Trauma surgeon",
  },
  {
    keywords: ["seizure", "convulsion", "fits"],
    label: "Seizure",
    severity: "emergency",
    remedies: ["Clear area of hard objects", "Cushion the head", "Turn to side after shaking stops"],
    otc: [],
    tests: ["EEG", "MRI brain", "Electrolytes", "Blood glucose"],
    specialist: "Neurologist",
  },
  {
    keywords: ["labor pain", "labour pain", "contractions", "water broke"],
    label: "Labor pain",
    severity: "emergency",
    remedies: ["Time contractions", "Stay hydrated", "Travel to maternity ward immediately"],
    otc: [],
    tests: ["Fetal heart monitoring", "Cervical exam", "Ultrasound"],
    specialist: "Obstetrician",
  },

  {
    keywords: ["high fever", "very high fever", "102", "103", "104"],
    label: "High fever",
    severity: "warning",
    remedies: ["Tepid sponge bath", "Hydrate with ORS every 30 min", "Light cotton clothing"],
    otc: [{ name: "Paracetamol 650mg", dose: "Every 6 hrs (max 4/day)" }],
    tests: ["CBC", "Malaria / Dengue NS1", "Urine routine", "Typhoid IgM"],
    specialist: "General Physician",
  },
  {
    keywords: ["vomit", "throwing up"],
    label: "Vomiting",
    severity: "warning",
    remedies: ["Sip ORS slowly", "Avoid solid food for 4 hrs", "Ginger tea may help"],
    otc: [{ name: "Ondansetron 4mg", dose: "On vomiting episode" }],
    tests: ["Electrolytes", "Urine ketones"],
    specialist: "General Physician",
  },
  {
    keywords: ["dehydrat"],
    label: "Dehydration",
    severity: "warning",
    remedies: ["ORS every 15 min", "Coconut water", "Avoid caffeine and alcohol"],
    otc: [{ name: "ORS sachet", dose: "Dissolve in 1L water" }],
    tests: ["Electrolytes", "Urine specific gravity"],
    specialist: "General Physician",
  },
  {
    keywords: ["dizzy", "dizziness", "lightheaded", "sweating"],
    label: "Dizziness",
    severity: "warning",
    remedies: ["Sit or lie down immediately", "Drink water with a pinch of salt", "Avoid sudden head movements"],
    otc: [],
    tests: ["BP (lying & standing)", "Blood glucose", "Hemoglobin"],
    specialist: "General Physician",
  },
  {
    keywords: ["abdominal pain", "stomach pain", "belly pain"],
    label: "Abdominal pain",
    severity: "warning",
    remedies: ["Warm compress on abdomen", "Light bland diet", "Avoid spicy / oily food"],
    otc: [{ name: "Drotaverine 80mg", dose: "Twice daily after food" }],
    tests: ["Abdominal ultrasound", "CBC", "Liver function test"],
    specialist: "Gastroenterologist",
  },
  {
    keywords: ["rash"],
    label: "Skin rash",
    severity: "warning",
    remedies: ["Cool compress", "Avoid scratching", "Loose cotton clothing"],
    otc: [{ name: "Cetirizine 10mg", dose: "Once at night" }],
    tests: ["Allergy panel", "CBC"],
    specialist: "Dermatologist",
  },

  {
    keywords: ["fever", "temperature"],
    label: "Fever",
    severity: "warning",
    remedies: ["Hydrate frequently", "Rest 8 hrs", "Light meals"],
    otc: [{ name: "Paracetamol 500mg", dose: "Every 6 hrs as needed" }],
    tests: ["CBC", "Malaria smear"],
    specialist: "General Physician",
  },
  {
    keywords: ["sore throat", "throat pain"],
    label: "Sore throat",
    severity: "success",
    remedies: ["Warm saltwater gargle 3x/day", "Steam inhalation 10 min", "Honey + warm water"],
    otc: [{ name: "Lozenges", dose: "Every 3 hrs" }],
    tests: ["Throat swab if persistent >5 days"],
    specialist: "ENT Specialist",
  },
  {
    keywords: ["cough"],
    label: "Cough",
    severity: "success",
    remedies: ["Honey + ginger tea", "Steam inhalation", "Avoid cold drinks"],
    otc: [{ name: "Dextromethorphan syrup", dose: "10ml at night" }],
    tests: ["Chest X-ray if >2 weeks"],
    specialist: "Pulmonologist",
  },
  {
    keywords: ["cold", "runny nose", "stuffy nose", "congestion"],
    label: "Cold / congestion",
    severity: "success",
    remedies: ["Steam inhalation 2x/day", "Vitamin C rich foods", "Warm fluids hourly"],
    otc: [{ name: "Cetirizine 10mg", dose: "Once at night" }],
    tests: [],
    specialist: "General Physician",
  },
  {
    keywords: ["headache", "head ache", "migraine"],
    label: "Headache",
    severity: "success",
    remedies: ["Rest in a dark quiet room", "Cold compress on forehead", "Hydrate well"],
    otc: [{ name: "Ibuprofen 400mg", dose: "After food, twice daily" }],
    tests: ["BP check", "Eye check if recurring"],
    specialist: "Neurologist",
  },
  {
    keywords: ["body ache", "body pain", "muscle ache"],
    label: "Body ache",
    severity: "success",
    remedies: ["Warm bath", "Gentle stretching", "Adequate sleep"],
    otc: [{ name: "Paracetamol 500mg", dose: "Twice daily" }],
    tests: [],
    specialist: "General Physician",
  },
  {
    keywords: ["fatigue", "tired", "weakness"],
    label: "Fatigue",
    severity: "success",
    remedies: ["8 hrs sleep", "Iron rich diet", "20 min walk"],
    otc: [{ name: "Multivitamin", dose: "Once after breakfast" }],
    tests: ["Hemoglobin", "Vitamin B12 / D3", "Thyroid TSH"],
    specialist: "General Physician",
  },
  {
    keywords: ["nausea"],
    label: "Nausea",
    severity: "success",
    remedies: ["Sip ginger tea", "Eat dry crackers", "Avoid strong smells"],
    otc: [{ name: "Domperidone 10mg", dose: "Before meals" }],
    tests: [],
    specialist: "General Physician",
  },
  {
    keywords: ["sneez"],
    label: "Sneezing",
    severity: "success",
    remedies: ["Avoid dust / pollen", "Steam inhalation", "Wear mask outdoors"],
    otc: [{ name: "Levocetirizine 5mg", dose: "Once at night" }],
    tests: [],
    specialist: "ENT Specialist",
  },
  {
    keywords: ["diarrh", "loose motion"],
    label: "Diarrhea",
    severity: "warning",
    remedies: ["ORS after each loose stool", "Banana, rice, curd", "Avoid milk and oily food"],
    otc: [{ name: "Loperamide 2mg", dose: "After each loose stool" }],
    tests: ["Stool routine", "Electrolytes"],
    specialist: "Gastroenterologist",
  },
];

export interface AnalysisResult {
  found: SymptomEntry[];
  severity: Severity;
  remedies: string[];
  otc: { name: string; dose: string }[];
  tests: string[];
  specialist: string;
}

export function analyzeSymptoms(input: string): AnalysisResult {
  const text = (input || "").toLowerCase();
  const found: SymptomEntry[] = [];
  const seen = new Set<string>();
  for (const entry of SYMPTOM_DB) {
    if (entry.keywords.some((k) => text.includes(k)) && !seen.has(entry.label)) {
      found.push(entry);
      seen.add(entry.label);
    }
  }
  const severity: Severity = found.some((f) => f.severity === "emergency")
    ? "emergency"
    : found.some((f) => f.severity === "warning")
    ? "warning"
    : "success";

  const remedies = Array.from(new Set(found.flatMap((f) => f.remedies)));
  const otcMap = new Map<string, { name: string; dose: string }>();
  found.flatMap((f) => f.otc).forEach((m) => otcMap.set(m.name, m));
  const tests = Array.from(new Set(found.flatMap((f) => f.tests)));
  const specialist = found[0]?.specialist || "General Physician";

  return { found, severity, remedies, otc: Array.from(otcMap.values()), tests, specialist };
}

export function loadSymptoms(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem("carenova_symptoms") || "";
}
