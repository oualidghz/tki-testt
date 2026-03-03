export interface Question {
  id: string;
  textA: string;
  textB: string;
}

export interface ConflictStyle {
  id: string;
  name: string;
  color: string;
}

export interface TestResult {
  scores: Record<string, number>;
  percentages: Record<string, number>;
  dominantStyle: string;
  totalAnswers: number;
}

export const questions: Question[] = [
  {
    id: "q1",
    textA: "Je défends fermement mes positions.",
    textB: "Je cherche à trouver un terrain d'entente avec l'autre personne."
  },
  {
    id: "q2",
    textA: "J'évite de créer des tensions inutiles.",
    textB: "J'essaie de gagner ma position."
  },
  {
    id: "q3",
    textA: "Je propose un compromis acceptable.",
    textB: "Je fais valoir mes arguments avec conviction."
  },
  {
    id: "q4",
    textA: "Je cède pour préserver la relation.",
    textB: "J'insiste pour obtenir ce que je veux."
  },
  {
    id: "q5",
    textA: "Je travaille avec l'autre pour trouver une solution créative.",
    textB: "Je m'adapte aux besoins de l'autre."
  },
  {
    id: "q6",
    textA: "Je préfère ne pas m'impliquer dans le conflit.",
    textB: "Je défends mes intérêts avec détermination."
  },
  {
    id: "q7",
    textA: "Je cherche une solution qui satisfait les deux parties.",
    textB: "Je m'affirme pour faire prévaloir mon point de vue."
  },
  {
    id: "q8",
    textA: "Je laisse tomber pour éviter la confrontation.",
    textB: "Je collabore activement pour résoudre le problème."
  },
  {
    id: "q9",
    textA: "Je propose une solution intermédiaire.",
    textB: "Je travaille ensemble pour une solution gagnant-gagnant."
  },
  {
    id: "q10",
    textA: "Je privilégie l'harmonie plutôt que mes propres intérêts.",
    textB: "Je pousse pour obtenir gain de cause."
  },
  {
    id: "q11",
    textA: "Je me retire du conflit.",
    textB: "Je m'engage pleinement dans la recherche d'une solution commune."
  },
  {
    id: "q12",
    textA: "Je cherche un juste milieu.",
    textB: "Je défends ma position avec fermeté."
  },
  {
    id: "q13",
    textA: "Je coopère pour trouver la meilleure solution possible.",
    textB: "Je m'assure que mes besoins sont satisfaits."
  },
  {
    id: "q14",
    textA: "Je fais des concessions pour maintenir la paix.",
    textB: "Je me bats pour mes convictions."
  },
  {
    id: "q15",
    textA: "Je recherche une solution mutuellement bénéfique.",
    textB: "J'évite d'entrer dans le débat."
  }
];

export const answerMapping: Record<string, Record<'A' | 'B', string>> = {
  q1: { A: "competition", B: "collaboration" },
  q2: { A: "evitement", B: "competition" },
  q3: { A: "compromis", B: "competition" },
  q4: { A: "accommodement", B: "competition" },
  q5: { A: "collaboration", B: "accommodement" },
  q6: { A: "evitement", B: "competition" },
  q7: { A: "collaboration", B: "competition" },
  q8: { A: "evitement", B: "collaboration" },
  q9: { A: "compromis", B: "collaboration" },
  q10: { A: "accommodement", B: "competition" },
  q11: { A: "evitement", B: "collaboration" },
  q12: { A: "compromis", B: "competition" },
  q13: { A: "collaboration", B: "competition" },
  q14: { A: "accommodement", B: "competition" },
  q15: { A: "collaboration", B: "evitement" }
};

export const conflictStyles: ConflictStyle[] = [
  {
    id: "competition",
    name: "Compétition",
    color: "#3b82f6"
  },
  {
    id: "collaboration",
    name: "Collaboration",
    color: "#10b981"
  },
  {
    id: "compromis",
    name: "Compromis",
    color: "#f59e0b"
  },
  {
    id: "evitement",
    name: "Évitement",
    color: "#8b5cf6"
  },
  {
    id: "accommodement",
    name: "Accommodement",
    color: "#06b6d4"
  }
];

export const interpretationTexts: Record<string, string> = {
  competition: "Vous avez un style affirmé et orienté vers les résultats. Vous privilégiez l'efficacité et la défense de vos intérêts.",
  collaboration: "Vous recherchez des solutions gagnant-gagnant et valorisez la coopération et la communication approfondie.",
  compromis: "Vous adoptez une approche équilibrée en recherchant des solutions intermédiaires satisfaisantes pour chacun.",
  evitement: "Vous préférez réduire les tensions et éviter les confrontations directes lorsque cela est possible.",
  accommodement: "Vous privilégiez la relation et l'harmonie, parfois au détriment de vos propres intérêts."
};
