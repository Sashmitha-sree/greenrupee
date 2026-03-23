// ESG Questions — 20 questions across E, S, G categories
export const questions = [
  // ---- ENVIRONMENT (E) — max 30 pts ----
  {
    id: 1,
    category: 'E',
    categoryLabel: '🌱 Environment',
    text: 'What is your primary energy source?',
    options: [
      { label: 'Solar / Wind (Renewable)', points: 10 },
      { label: 'Mix of renewable & grid power', points: 7 },
      { label: 'Grid electricity only', points: 4 },
      { label: 'Diesel generator / Coal', points: 1 },
    ],
  },
  {
    id: 2,
    category: 'E',
    categoryLabel: '🌱 Environment',
    text: 'How do you manage solid waste from your business?',
    options: [
      { label: 'Separate, recycle & compost properly', points: 10 },
      { label: 'Partial recycling, rest to landfill', points: 6 },
      { label: 'Send everything to landfill', points: 2 },
      { label: 'No formal waste management', points: 0 },
    ],
  },
  {
    id: 3,
    category: 'E',
    categoryLabel: '🌱 Environment',
    text: 'Do you track and try to reduce your water usage?',
    options: [
      { label: 'Yes, we actively track and reduce', points: 5 },
      { label: 'Track but no active reduction plan', points: 3 },
      { label: 'No tracking at all', points: 0 },
    ],
  },
  {
    id: 4,
    category: 'E',
    categoryLabel: '🌱 Environment',
    text: 'How do you handle harmful chemicals or emissions?',
    options: [
      { label: 'Follow all regulations, certified safe disposal', points: 5 },
      { label: 'Partial compliance', points: 3 },
      { label: 'No chemical use (not applicable)', points: 5 },
      { label: 'Minimal or no compliance', points: 0 },
    ],
  },

  // ---- SOCIAL (S) — max 30 pts ----
  {
    id: 5,
    category: 'S',
    categoryLabel: '👥 Social',
    text: 'Do you pay all workers at or above minimum wage?',
    options: [
      { label: 'Yes, above minimum wage with benefits', points: 10 },
      { label: 'Yes, exactly at minimum wage', points: 7 },
      { label: 'Mostly yes, with some exceptions', points: 4 },
      { label: 'No fixed wages / informal arrangements', points: 0 },
    ],
  },
  {
    id: 6,
    category: 'S',
    categoryLabel: '👥 Social',
    text: 'What safety measures do you have for workers?',
    options: [
      { label: 'Full safety training, PPE, regular drills', points: 8 },
      { label: 'Basic safety gear provided', points: 5 },
      { label: 'Minimal safety measures', points: 2 },
      { label: 'None', points: 0 },
    ],
  },
  {
    id: 7,
    category: 'S',
    categoryLabel: '👥 Social',
    text: 'Do you employ women or people from disadvantaged backgrounds?',
    options: [
      { label: 'Yes, more than 40% workforce diversity', points: 7 },
      { label: 'Yes, 20–40% diverse workforce', points: 5 },
      { label: 'Some, under 20%', points: 3 },
      { label: 'No focus on diversity', points: 0 },
    ],
  },
  {
    id: 8,
    category: 'S',
    categoryLabel: '👥 Social',
    text: 'Do workers receive any training or skill development?',
    options: [
      { label: 'Yes, regular structured training', points: 5 },
      { label: 'Occasional on-the-job training', points: 3 },
      { label: 'No formal training', points: 0 },
    ],
  },

  // ---- GOVERNANCE (G) — max 40 pts ----
  {
    id: 9,
    category: 'G',
    categoryLabel: '🏢 Governance',
    text: 'Do you maintain regular financial records / accounts?',
    options: [
      { label: 'Yes, formal accounts with CA/auditor', points: 10 },
      { label: 'Yes, I maintain records myself (Tally etc.)', points: 7 },
      { label: 'Partial records', points: 3 },
      { label: 'No formal record-keeping', points: 0 },
    ],
  },
  {
    id: 10,
    category: 'G',
    categoryLabel: '🏢 Governance',
    text: 'Is your business registered with any government authority?',
    options: [
      { label: 'Yes — Udyam / GST / MSME registered', points: 10 },
      { label: 'Partially registered', points: 6 },
      { label: 'Registration in progress', points: 3 },
      { label: 'Not registered', points: 0 },
    ],
  },
  {
    id: 11,
    category: 'G',
    categoryLabel: '🏢 Governance',
    text: 'Do you have a documented business / ethics policy?',
    options: [
      { label: 'Yes, written and shared with team', points: 8 },
      { label: 'Informal unwritten guidelines', points: 4 },
      { label: 'No policy exists', points: 0 },
    ],
  },
  {
    id: 12,
    category: 'G',
    categoryLabel: '🏢 Governance',
    text: 'Do you pay taxes and comply with labour laws?',
    options: [
      { label: 'Full compliance, filed on time', points: 7 },
      { label: 'Mostly compliant, occasional delays', points: 4 },
      { label: 'Partial compliance', points: 2 },
      { label: 'Not compliant', points: 0 },
    ],
  },
  {
    id: 13,
    category: 'G',
    categoryLabel: '🏢 Governance',
    text: 'Do you have a process to handle customer complaints?',
    options: [
      { label: 'Yes, formal process with tracking', points: 5 },
      { label: 'Informal — we resolve when they arise', points: 3 },
      { label: 'No process', points: 0 },
    ],
  },
];

// Scoring thresholds
export const getGrade = (score) => {
  if (score >= 85) return { grade: 'AAA', label: 'Excellent', color: '#1b4332' };
  if (score >= 70) return { grade: 'AA',  label: 'Very Good', color: '#2d6a4f' };
  if (score >= 55) return { grade: 'A',   label: 'Good',      color: '#52b788' };
  if (score >= 40) return { grade: 'B',   label: 'Average',   color: '#e9c46a' };
  return                   { grade: 'C',   label: 'Needs Work',color: '#f4a261' };
};

// Calculate scores per category
export const calculateScores = (answers) => {
  let E = 0, S = 0, G = 0;
  const maxE = 30, maxS = 30, maxG = 40;

  answers.forEach(({ question, optionIndex }) => {
    const q = questions.find(q => q.id === question);
    if (!q) return;
    const pts = q.options[optionIndex]?.points ?? 0;
    if (q.category === 'E') E += pts;
    if (q.category === 'S') S += pts;
    if (q.category === 'G') G += pts;
  });

  // Normalize to out of 30/30/40
  const eScore = Math.min(E, maxE);
  const sScore = Math.min(S, maxS);
  const gScore = Math.min(G, maxG);
  const total = eScore + sScore + gScore;

  return { eScore, sScore, gScore, total, maxE, maxS, maxG };
};

// Generate personalized recommendations based on low areas
export const getRecommendations = (scores) => {
  const recos = [];

  const ePct = scores.eScore / scores.maxE;
  const sPct = scores.sScore / scores.maxS;
  const gPct = scores.gScore / scores.maxG;

  if (ePct < 0.5) {
    recos.push({
      iconName: 'sun',
      title: 'Switch to renewable energy',
      desc: 'Installing rooftop solar panels can reduce electricity bills by 30–50% and significantly boost your Environment score.',
      priority: 'high',
    });
    recos.push({
      iconName: 'recycle',
      title: 'Implement a waste segregation system',
      desc: 'Set up 3 bins — organic, recyclable, non-recyclable. Contact your local municipality for pickup partnerships.',
      priority: 'high',
    });
  } else if (ePct < 0.8) {
    recos.push({
      iconName: 'water',
      title: 'Track your water consumption',
      desc: 'Use a basic meter or app to track monthly water usage. Set reduction targets of 10% per year.',
      priority: 'mid',
    });
  }

  if (sPct < 0.5) {
    recos.push({
      iconName: 'hardhat',
      title: 'Provide worker safety gear (PPE)',
      desc: 'Helmets, gloves, masks — basic PPE reduces accidents and is mandatory under the Factories Act.',
      priority: 'high',
    });
    recos.push({
      iconName: 'money',
      title: 'Formalize wage structures',
      desc: 'Document all wages and ensure compliance with state minimum wage laws. This protects both you and your workers.',
      priority: 'high',
    });
  } else if (sPct < 0.8) {
    recos.push({
      iconName: 'book',
      title: 'Start a monthly skill training program',
      desc: 'Partner with local ITI or Skill India centers for free or subsidized worker training sessions.',
      priority: 'mid',
    });
  }

  if (gPct < 0.5) {
    recos.push({
      iconName: 'clipboard',
      title: 'Register on Udyam Portal (Free)',
      desc: 'Udyam registration is free, takes 10 minutes, and unlocks government schemes, lower loan rates & ESG credibility.',
      priority: 'high',
    });
    recos.push({
      iconName: 'invoice',
      title: 'Start maintaining digital accounts',
      desc: 'Use free tools like Vyapar app or Tally to record income/expenses. This is required for any bank loan.',
      priority: 'high',
    });
  } else if (gPct < 0.8) {
    recos.push({
      iconName: 'handshake',
      title: 'Document your business ethics policy',
      desc: 'Write a 1-page document covering: fair pay, no discrimination, customer honesty. Share it with your team.',
      priority: 'mid',
    });
  }

  if (recos.length === 0) {
    recos.push({
      iconName: 'trophy',
      title: 'Maintain your excellence',
      desc: 'Your ESG practices are excellent! Consider getting a third-party audit to officially certify your score.',
      priority: 'low',
    });
    recos.push({
      iconName: 'globe',
      title: 'Share your ESG story',
      desc: 'Publish your sustainability practices on your website and LinkedIn to attract ESG-conscious buyers globally.',
      priority: 'low',
    });
  }

  return recos;
};