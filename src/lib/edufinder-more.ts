// Mock tests + consultancies data (UI-only mocks)

export type MockQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: number; // index of correct option
  explain?: string;
};

export type MockTest = {
  slug: string;
  title: string;
  exam: string; // e.g. IELTS, SAT, PTE
  category: "English Proficiency" | "Graduate Tests" | "Undergraduate Tests" | "Engineering";
  durationMin: number;
  totalQuestions: number;
  difficulty: "Easy" | "Moderate" | "Hard";
  free: true;
  attempts: number;
  rating: number;
  summary: string;
  syllabus: string[];
  questions: MockQuestion[];
  heroAccent: string;
};

const q = (id: string, prompt: string, options: string[], answer: number, explain?: string): MockQuestion => ({
  id, prompt, options, answer, explain,
});

export const mockTests: MockTest[] = [
  {
    slug: "ielts-academic-full-mock",
    title: "IELTS Academic — Full Mock",
    exam: "IELTS",
    category: "English Proficiency",
    durationMin: 30,
    totalQuestions: 8,
    difficulty: "Moderate",
    free: true,
    attempts: 24831,
    rating: 4.7,
    summary: "A condensed practice set covering Reading, Listening comprehension cues, and Writing task familiarity.",
    syllabus: ["Reading — matching headings", "Listening — form completion", "Grammar in context", "Academic vocabulary"],
    heroAccent: "from-brand to-academic",
    questions: [
      q("q1", "Choose the closest meaning of ‘ubiquitous’.", ["Rare", "Everywhere", "Ancient", "Hidden"], 1, "‘Ubiquitous’ means present everywhere."),
      q("q2", "In IELTS Academic Reading, ‘skimming’ is best used to…", ["Memorise details", "Find specific numbers", "Get the gist of a passage", "Translate paragraphs"], 2),
      q("q3", "Which sentence is grammatically correct?", ["She don’t like coffee.", "She doesn’t likes coffee.", "She doesn’t like coffee.", "She not like coffee."], 2),
      q("q4", "The Listening section lasts approximately…", ["20 minutes", "30 minutes", "45 minutes", "60 minutes"], 1),
      q("q5", "Task 1 of Academic Writing asks candidates to…", ["Write an essay", "Describe a chart / diagram", "Write a letter", "Summarise an article"], 1),
      q("q6", "Antonym of ‘abundant’ is:", ["Plentiful", "Scarce", "Common", "Vast"], 1),
      q("q7", "Which is a discourse marker for contrast?", ["Furthermore", "However", "Therefore", "Similarly"], 1),
      q("q8", "IELTS bands range from…", ["1 – 6", "0 – 9", "1 – 10", "0 – 100"], 1),
    ],
  },
  {
    slug: "pte-practice-diagnostic",
    title: "PTE Academic — Diagnostic",
    exam: "PTE",
    category: "English Proficiency",
    durationMin: 20,
    totalQuestions: 6,
    difficulty: "Easy",
    free: true,
    attempts: 18220,
    rating: 4.6,
    summary: "Warm up with quick PTE-style items across speaking (read aloud cues), reading and writing.",
    syllabus: ["Read Aloud pacing", "Reorder Paragraphs", "Multiple choice", "Fill in the blanks"],
    heroAccent: "from-academic to-brand",
    questions: [
      q("p1", "Choose the best word: The findings were ___ with earlier studies.", ["consistent", "consist", "consisting", "consisted"], 0),
      q("p2", "Reorder: (1) Then it cools. (2) Water is heated. (3) Steam forms. Correct sequence:", ["1-2-3", "2-3-1", "3-2-1", "2-1-3"], 1),
      q("p3", "Synonym of ‘mitigate’:", ["Increase", "Reduce", "Ignore", "Freeze"], 1),
      q("p4", "Which is a proper noun?", ["city", "London", "river", "park"], 1),
      q("p5", "Choose the correct passive: They build houses.", ["Houses are built.", "Houses build.", "Houses were build.", "Houses are build."], 0),
      q("p6", "The PTE scoring range is:", ["0-90", "10-90", "1-100", "0-9"], 1),
    ],
  },
  {
    slug: "sat-quant-warmup",
    title: "SAT — Quant Warmup",
    exam: "SAT",
    category: "Undergraduate Tests",
    durationMin: 25,
    totalQuestions: 6,
    difficulty: "Moderate",
    free: true,
    attempts: 14082,
    rating: 4.5,
    summary: "Algebra, ratios and data analysis questions modelled on the digital SAT format.",
    syllabus: ["Linear equations", "Ratios & proportions", "Data interpretation", "Word problems"],
    heroAccent: "from-brand via-academic to-brand",
    questions: [
      q("s1", "If 3x + 6 = 18, x = ?", ["2", "3", "4", "6"], 2),
      q("s2", "Ratio 2 : 5 equals which fraction?", ["1/2", "2/7", "2/5", "5/7"], 2),
      q("s3", "Slope of a line through (0,0) and (2,4):", ["1", "2", "0.5", "4"], 1),
      q("s4", "Mean of 4, 8, 12:", ["6", "8", "10", "12"], 1),
      q("s5", "If a = 3, b = 4, then √(a²+b²) = ?", ["5", "6", "7", "12"], 0),
      q("s6", "20% of 250 = ?", ["25", "40", "50", "60"], 2),
    ],
  },
  {
    slug: "gre-verbal-basics",
    title: "GRE — Verbal Basics",
    exam: "GRE",
    category: "Graduate Tests",
    durationMin: 20,
    totalQuestions: 5,
    difficulty: "Hard",
    free: true,
    attempts: 9124,
    rating: 4.4,
    summary: "Text-completion and sentence-equivalence style items at GRE difficulty.",
    syllabus: ["Text completion", "Sentence equivalence", "Advanced vocab"],
    heroAccent: "from-academic to-brand",
    questions: [
      q("g1", "Choose the word closest to ‘loquacious’:", ["Silent", "Talkative", "Angry", "Confused"], 1),
      q("g2", "The scientist was ___ , rarely admitting error.", ["humble", "obstinate", "gracious", "meek"], 1),
      q("g3", "‘Ephemeral’ most nearly means:", ["Everlasting", "Short-lived", "Bright", "Ancient"], 1),
      q("g4", "Antonym of ‘candid’:", ["Frank", "Direct", "Evasive", "Open"], 2),
      q("g5", "Choose synonym pair: ‘frugal’ / ‘parsimonious’", ["Different", "Synonyms", "Antonyms", "Unrelated"], 1),
    ],
  },
];

export function getMockTest(slug: string) {
  return mockTests.find((t) => t.slug === slug);
}

// ------------------ Consultancies ------------------

export type Consultancy = {
  slug: string;
  name: string;
  tagline: string;
  city: string;
  country: string;
  founded: number;
  rating: number;
  reviews: number;
  studentsPlaced: number;
  successRate: number;
  services: string[];
  destinations: string[];
  languages: string[];
  fees: "Free counselling" | "Paid packages" | "Free + Premium";
  verified: boolean;
  claimed: boolean;
  about: string;
  process: { step: string; detail: string }[];
  team: { name: string; role: string; initials: string }[];
  testimonials: { name: string; university: string; quote: string }[];
  contact: { email: string; phone: string; website: string };
  heroAccent: string;
};

export const consultancies: Consultancy[] = [
  {
    slug: "atlas-global-education",
    name: "Atlas Global Education",
    tagline: "Ivy League & Russell Group admissions specialists",
    city: "Mumbai",
    country: "India",
    founded: 2011,
    rating: 4.8,
    reviews: 1284,
    studentsPlaced: 6420,
    successRate: 92,
    services: ["Profile evaluation", "SOP & LOR editing", "Visa guidance", "Scholarship strategy", "Test prep"],
    destinations: ["USA", "UK", "Canada", "Australia"],
    languages: ["English", "Hindi", "Marathi"],
    fees: "Free + Premium",
    verified: true,
    claimed: true,
    about:
      "Atlas Global Education is a boutique consultancy that has helped 6,000+ students secure admits to top-100 universities worldwide since 2011.",
    process: [
      { step: "Discovery call", detail: "Free 30-min profile review with a senior counsellor." },
      { step: "University shortlist", detail: "Data-driven list of ambitious, target and safe universities." },
      { step: "Application build", detail: "Essay coaching, LOR strategy, and interview mock sessions." },
      { step: "Visa & pre-departure", detail: "End-to-end visa filing, banking, housing." },
    ],
    team: [
      { name: "Priya Menon", role: "Founder", initials: "PM" },
      { name: "Arjun Kapoor", role: "Head of Admissions", initials: "AK" },
      { name: "Neha Rao", role: "Visa Lead", initials: "NR" },
    ],
    testimonials: [
      { name: "Isha S.", university: "Cornell University", quote: "The essay feedback loop was intense — every draft got sharper." },
      { name: "Rahul V.", university: "UCL", quote: "They found scholarships I didn’t know existed. Saved £18k." },
    ],
    contact: { email: "hello@atlasglobal.edu", phone: "+91 22 4000 1234", website: "https://atlasglobal.example" },
    heroAccent: "from-brand via-academic to-brand",
  },
  {
    slug: "northstar-study-abroad",
    name: "Northstar Study Abroad",
    tagline: "Canada & Australia visa experts",
    city: "Delhi",
    country: "India",
    founded: 2015,
    rating: 4.6,
    reviews: 812,
    studentsPlaced: 3210,
    successRate: 88,
    services: ["Profile evaluation", "University shortlisting", "Visa filing", "Post-arrival support"],
    destinations: ["Canada", "Australia", "New Zealand"],
    languages: ["English", "Hindi", "Punjabi"],
    fees: "Free counselling",
    verified: true,
    claimed: false,
    about:
      "Northstar focuses on Commonwealth destinations with a 90%+ visa success rate and a dedicated Canadian PR advisory desk.",
    process: [
      { step: "Free counselling", detail: "Understand your goals, budget and timeline." },
      { step: "Application", detail: "Shortlist, apply and manage deadlines." },
      { step: "Visa filing", detail: "SDS/Direct Stream expertise for Canada." },
      { step: "Landing support", detail: "Airport pickup and accommodation for the first week." },
    ],
    team: [
      { name: "Simran Gill", role: "Founder", initials: "SG" },
      { name: "Vikas Malhotra", role: "Visa Advisor", initials: "VM" },
    ],
    testimonials: [
      { name: "Karan D.", university: "University of Toronto", quote: "Visa cleared in 21 days. Zero stress." },
    ],
    contact: { email: "info@northstar.example", phone: "+91 11 4567 8900", website: "https://northstar.example" },
    heroAccent: "from-academic to-brand",
  },
  {
    slug: "meridian-consultants",
    name: "Meridian Consultants",
    tagline: "Europe-focused graduate admissions",
    city: "Bengaluru",
    country: "India",
    founded: 2018,
    rating: 4.7,
    reviews: 512,
    studentsPlaced: 1840,
    successRate: 90,
    services: ["Profile evaluation", "SOP editing", "Scholarship strategy", "Language coaching"],
    destinations: ["Germany", "Netherlands", "France", "Sweden"],
    languages: ["English", "German (basic)"],
    fees: "Paid packages",
    verified: false,
    claimed: false,
    about:
      "Meridian specialises in Europe — tuition-free public universities, DAAD scholarships, and English-taught Master’s.",
    process: [
      { step: "Diagnostic", detail: "Free 45-min profile review." },
      { step: "Country strategy", detail: "Right-fit country + programme mix." },
      { step: "Applications", detail: "APS, uni-assist, and direct portals." },
      { step: "Language + visa", detail: "Basic German + blocked account guidance." },
    ],
    team: [
      { name: "Ananya Iyer", role: "Founder", initials: "AI" },
      { name: "Rohan Bhat", role: "Europe Lead", initials: "RB" },
    ],
    testimonials: [
      { name: "Deepak M.", university: "TU Munich", quote: "Tuition-free MSc, DAAD stipend — dream setup." },
    ],
    contact: { email: "hello@meridian.example", phone: "+91 80 4123 5670", website: "https://meridian.example" },
    heroAccent: "from-brand to-academic",
  },
];

export function getConsultancy(slug: string) {
  return consultancies.find((c) => c.slug === slug);
}
