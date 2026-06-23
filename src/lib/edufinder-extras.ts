// Extra data: scholarships, Q&A community, study abroad destinations.

export type Scholarship = {
  slug: string;
  name: string;
  provider: string;
  type: "Merit" | "Need" | "Merit + Need" | "Diversity" | "Athletic" | "Research";
  level: "UG" | "PG" | "Doctorate" | "Any";
  country: string;
  region: "Global" | "Asia" | "Europe" | "Americas" | "Africa" | "Oceania";
  amount: string;
  amountUSD: number;
  coverage: string[];
  deadline: string;
  applicationsOpen: string;
  awardsPerYear: number;
  acceptanceRate: number;
  renewable: boolean;
  streams: string[];
  eligibility: string[];
  documents: string[];
  process: { step: string; detail: string }[];
  about: string;
  tags: string[];
  heroAccent: string;
  url?: string;
  contact?: { email: string; phone?: string };
};

export const scholarships: Scholarship[] = [
  {
    slug: "northgate-merit-fellowship",
    name: "Northgate Merit Fellowship",
    provider: "Northgate Institute of Technology",
    type: "Merit",
    level: "UG",
    country: "United States",
    region: "Americas",
    amount: "$45,000 / yr",
    amountUSD: 45000,
    coverage: ["Full tuition", "Housing stipend", "Research grant"],
    deadline: "2026-01-15",
    applicationsOpen: "2025-09-01",
    awardsPerYear: 60,
    acceptanceRate: 4.2,
    renewable: true,
    streams: ["engineering", "science"],
    eligibility: [
      "Admitted to a Northgate UG program",
      "Top 5% of high-school class",
      "SAT 1500+ or ACT 34+",
      "Demonstrated research or project portfolio",
    ],
    documents: ["Transcripts", "Two recommendation letters", "Research portfolio", "Personal essay"],
    process: [
      { step: "Apply to Northgate UG", detail: "Submit your Common App and tick the fellowship box." },
      { step: "Portfolio review", detail: "Faculty panel screens portfolios in December." },
      { step: "Finalist interview", detail: "30-minute virtual interview in early January." },
      { step: "Award notification", detail: "Decisions emailed by mid-February." },
    ],
    about:
      "The flagship Northgate fellowship recognises undergraduates who pair top-tier academics with original research or building. Recipients join a tight cohort with paid summer labs.",
    tags: ["Full tuition", "Renewable", "Research"],
    heroAccent: "from-brand to-academic",
    contact: { email: "fellowships@northgate.edu" },
  },
  {
    slug: "global-women-in-stem",
    name: "Global Women in STEM Award",
    provider: "Pacific Global University Foundation",
    type: "Diversity",
    level: "UG",
    country: "Singapore",
    region: "Asia",
    amount: "$20,000 / yr",
    amountUSD: 20000,
    coverage: ["50% tuition", "Mentorship", "Industry internship"],
    deadline: "2026-02-28",
    applicationsOpen: "2025-10-15",
    awardsPerYear: 120,
    acceptanceRate: 12,
    renewable: true,
    streams: ["engineering", "science"],
    eligibility: [
      "Self-identifying woman applicant",
      "Pursuing UG in STEM",
      "Minimum 85% in qualifying exams",
    ],
    documents: ["Transcripts", "Statement of purpose", "Two recommendations"],
    process: [
      { step: "Submit online form", detail: "Single application via PGU portal." },
      { step: "Essay round", detail: "1,000-word essay on a STEM problem you'd tackle." },
      { step: "Mentor match", detail: "Awarded students paired with an industry mentor." },
    ],
    about:
      "PGU's most popular award, designed to broaden STEM access and pair recipients with mentors at Grab, DBS, and Bytedance.",
    tags: ["Mentorship", "Internship"],
    heroAccent: "from-academic to-gold",
    contact: { email: "stem-awards@pgu.edu.sg" },
  },
  {
    slug: "westmere-mba-leaders",
    name: "Westmere MBA Future Leaders Scholarship",
    provider: "Royal Westmere Business School",
    type: "Merit + Need",
    level: "PG",
    country: "United Kingdom",
    region: "Europe",
    amount: "£35,000",
    amountUSD: 44000,
    coverage: ["50% tuition", "Career coaching"],
    deadline: "2026-03-31",
    applicationsOpen: "2025-09-01",
    awardsPerYear: 25,
    acceptanceRate: 6,
    renewable: false,
    streams: ["management"],
    eligibility: [
      "Admitted to Westmere full-time MBA",
      "5+ years of leadership experience",
      "Demonstrated financial need",
    ],
    documents: ["MBA application", "GMAT/GRE", "Two essays", "Financial disclosure"],
    process: [
      { step: "Apply to MBA", detail: "Tick the scholarship box on round 1 or 2." },
      { step: "Essays", detail: "Two 500-word essays on leadership & impact." },
      { step: "Panel interview", detail: "30-minute interview with alumni & faculty." },
    ],
    about:
      "A capstone award for incoming MBAs with a track record of leadership and a clear plan to use the degree for outsized impact.",
    tags: ["Half tuition", "Coaching"],
    heroAccent: "from-brand to-gold",
    contact: { email: "scholarships@westmere.ac.uk" },
  },
  {
    slug: "alban-design-portfolio-prize",
    name: "Alban Design Portfolio Prize",
    provider: "Alban College of Design",
    type: "Merit",
    level: "UG",
    country: "Italy",
    region: "Europe",
    amount: "€12,000",
    amountUSD: 13000,
    coverage: ["Tuition discount", "Studio kit"],
    deadline: "2026-04-15",
    applicationsOpen: "2025-11-01",
    awardsPerYear: 40,
    acceptanceRate: 18,
    renewable: true,
    streams: ["design", "arts"],
    eligibility: ["Submitted strong portfolio (12-piece minimum)", "Admitted to Alban UG"],
    documents: ["Portfolio PDF", "Artist statement", "Letter of intent"],
    process: [
      { step: "Portfolio upload", detail: "Submit a 12-piece portfolio in PDF." },
      { step: "Studio review", detail: "Faculty critique your work in March." },
    ],
    about: "A portfolio-first prize that rewards original visual thinking over grades alone.",
    tags: ["Portfolio-based", "Renewable"],
    heroAccent: "from-gold to-academic",
    contact: { email: "portfolio@albandesign.it" },
  },
  {
    slug: "marlowe-medical-need-grant",
    name: "Marlowe Medical Need-Based Grant",
    provider: "Marlowe Medical College Trust",
    type: "Need",
    level: "UG",
    country: "India",
    region: "Asia",
    amount: "₹4,00,000",
    amountUSD: 4800,
    coverage: ["Tuition support", "Books"],
    deadline: "2026-05-31",
    applicationsOpen: "2025-12-01",
    awardsPerYear: 90,
    acceptanceRate: 32,
    renewable: true,
    streams: ["medical"],
    eligibility: [
      "Admitted to MBBS at Marlowe",
      "Household income below ₹8 LPA",
      "NEET-UG score in 90th percentile",
    ],
    documents: ["Income certificate", "NEET scorecard", "Statement of need"],
    process: [
      { step: "Income verification", detail: "Submit certified income documents." },
      { step: "Interview", detail: "Brief panel interview to confirm need and intent." },
    ],
    about:
      "A need-based grant that has supported 800+ medical students since 1998, ensuring talent isn't priced out of medicine.",
    tags: ["Need-based", "Renewable"],
    heroAccent: "from-brand to-academic",
    contact: { email: "grants@marlowemedical.in" },
  },
  {
    slug: "ironwood-athletic-excellence",
    name: "Ironwood Athletic Excellence Award",
    provider: "Ironwood State University",
    type: "Athletic",
    level: "UG",
    country: "United States",
    region: "Americas",
    amount: "$18,000 / yr",
    amountUSD: 18000,
    coverage: ["Tuition", "Training kit", "Travel"],
    deadline: "2026-02-01",
    applicationsOpen: "2025-08-01",
    awardsPerYear: 150,
    acceptanceRate: 22,
    renewable: true,
    streams: ["engineering", "science", "arts", "management"],
    eligibility: ["State or national-level competitor", "Admitted to Ironwood UG"],
    documents: ["Athletic résumé", "Coach recommendation", "Video reel"],
    process: [
      { step: "Tryout", detail: "Attend an on-campus or virtual tryout." },
      { step: "Coach evaluation", detail: "Coach panel matches you to a varsity team." },
    ],
    about: "Generous athletic awards across 18 varsity sports, with team-tier support packages.",
    tags: ["Athletic", "Renewable", "Travel"],
    heroAccent: "from-academic to-brand",
    contact: { email: "athletics@ironwood.edu" },
  },
  {
    slug: "midhurst-public-interest-law",
    name: "Midhurst Public Interest Law Bursary",
    provider: "Midhurst School of Law",
    type: "Need",
    level: "PG",
    country: "United Kingdom",
    region: "Europe",
    amount: "£15,000",
    amountUSD: 19000,
    coverage: ["Tuition", "Clinic placement"],
    deadline: "2026-03-15",
    applicationsOpen: "2025-10-01",
    awardsPerYear: 30,
    acceptanceRate: 14,
    renewable: false,
    streams: ["law"],
    eligibility: ["Pursuing LLM at Midhurst", "Commitment to public interest law", "Need-tested"],
    documents: ["LLM admit letter", "Statement of intent", "Clinic plan"],
    process: [
      { step: "Submit plan", detail: "Outline your public-interest project." },
      { step: "Clinic interview", detail: "Match with a Midhurst legal-aid clinic." },
    ],
    about: "Backed by alumni, this bursary keeps the public-interest pipeline open at Midhurst.",
    tags: ["Public interest", "Clinic"],
    heroAccent: "from-brand to-gold",
    contact: { email: "bursary@midhurstlaw.ac.uk" },
  },
  {
    slug: "open-science-research-grant",
    name: "Open Science Research Grant",
    provider: "EduFinder Foundation",
    type: "Research",
    level: "Doctorate",
    country: "Global",
    region: "Global",
    amount: "$30,000",
    amountUSD: 30000,
    coverage: ["Research stipend", "Conference travel", "Open-access fees"],
    deadline: "2026-06-30",
    applicationsOpen: "2025-11-15",
    awardsPerYear: 50,
    acceptanceRate: 8,
    renewable: true,
    streams: ["science", "engineering"],
    eligibility: [
      "Enrolled in a PhD program globally",
      "Research aligned with open-science principles",
      "Commitment to pre-register methods",
    ],
    documents: ["Research proposal", "CV", "Two academic references"],
    process: [
      { step: "Proposal", detail: "5-page proposal with reproducibility plan." },
      { step: "Peer review", detail: "Double-blind review by three reviewers." },
      { step: "Open commitment", detail: "Sign the open-data, open-method pledge." },
    ],
    about:
      "A flagship grant that funds reproducible, openly published research — across any discipline that values transparency.",
    tags: ["Open science", "Global"],
    heroAccent: "from-academic to-gold",
    contact: { email: "grants@edufinder.foundation" },
  },
];

export function getScholarship(slug: string): Scholarship | undefined {
  return scholarships.find((s) => s.slug === slug);
}

// ───────────── Community Q&A ─────────────

export type QAAnswer = {
  id: string;
  author: string;
  role: string;
  badge?: "Counselor" | "Alumni" | "Current student" | "Admissions";
  body: string;
  upvotes: number;
  postedAt: string;
  accepted?: boolean;
};

export type QAQuestion = {
  id: string;
  slug: string;
  title: string;
  body: string;
  author: string;
  authorBadge?: string;
  category: "Admissions" | "Exams" | "Placements" | "Scholarships" | "Study Abroad" | "Campus Life";
  tags: string[];
  postedAt: string;
  views: number;
  votes: number;
  solved: boolean;
  answers: QAAnswer[];
};

export const qaQuestions: QAQuestion[] = [
  {
    id: "q1",
    slug: "jee-mains-april-vs-january-which-is-easier",
    title: "JEE Mains April vs January — which attempt is actually easier?",
    body: "I'm planning my JEE Mains attempts. Friends say January is easier because the paper is calmer, but coaches insist April lets you peak. What's the real difference and which should I prioritise for a CS seat at a top NIT?",
    author: "Rahul S.",
    authorBadge: "Aspirant",
    category: "Exams",
    tags: ["JEE Mains", "NIT", "Strategy"],
    postedAt: "2025-09-18T10:24:00Z",
    views: 12480,
    votes: 84,
    solved: true,
    answers: [
      {
        id: "a1",
        author: "Ankit Verma",
        role: "Senior counselor, Allen",
        badge: "Counselor",
        body: "There is no statistically 'easier' session. NTA normalises percentiles across sessions. Treat January as a diagnostic — see your real percentile, fix weak chapters, and use April as your peak attempt. Most top NIT CS seats go to candidates with 99.5+ percentile, which is achievable in either window.",
        upvotes: 312,
        postedAt: "2025-09-18T11:00:00Z",
        accepted: true,
      },
      {
        id: "a2",
        author: "Sara P.",
        role: "BTech CSE @ NIT Trichy",
        badge: "Current student",
        body: "I jumped from 97.4 in January to 99.6 in April just by getting comfortable with the interface. Use January to neutralise exam-day nerves. Don't waste April on revision-only — attempt 4 full mocks the last 10 days.",
        upvotes: 187,
        postedAt: "2025-09-18T14:18:00Z",
      },
    ],
  },
  {
    id: "q2",
    slug: "is-mbbs-from-russia-recognised-in-india",
    title: "Is an MBBS from Russia really recognised by NMC in India?",
    body: "I have offers from two universities in Russia at roughly ₹25L total. Is the degree NMC-listed, and will I still need to clear FMGE before I can practice in India?",
    author: "Priya M.",
    authorBadge: "Aspirant",
    category: "Study Abroad",
    tags: ["MBBS", "Russia", "FMGE", "NMC"],
    postedAt: "2025-10-02T07:45:00Z",
    views: 9210,
    votes: 56,
    solved: true,
    answers: [
      {
        id: "a3",
        author: "Dr. R. Pillai",
        role: "MBBS, FMGE-cleared",
        badge: "Alumni",
        body: "Check that the specific university is in the WDOMS list and on NMC's recognised list — not just the country. Yes, you must clear FMGE (or NExT once it rolls in) to practice. Verify clinical exposure: ask alumni how many real patient hours you'll log, that's the single biggest predictor of FMGE success.",
        upvotes: 224,
        postedAt: "2025-10-02T09:10:00Z",
        accepted: true,
      },
    ],
  },
  {
    id: "q3",
    slug: "mba-without-work-ex-worth-it",
    title: "Is doing an MBA right after graduation worth it?",
    body: "Final-year engineering student here. I have a decent CAT score but no full-time work experience. Will I get value out of a top MBA or should I work 2-3 years first?",
    author: "Devansh K.",
    authorBadge: "Aspirant",
    category: "Admissions",
    tags: ["MBA", "CAT", "Work experience"],
    postedAt: "2025-08-22T16:00:00Z",
    views: 18420,
    votes: 142,
    solved: false,
    answers: [
      {
        id: "a4",
        author: "Megha R.",
        role: "Admissions, Westmere",
        badge: "Admissions",
        body: "Top global MBAs explicitly want 3-5 years of experience because peer learning is half the value. Indian PGDMs (IIMs, ISB YLP) have fresher pipelines if you want to go straight through. Pick the format that matches your peer cohort.",
        upvotes: 198,
        postedAt: "2025-08-22T18:30:00Z",
      },
    ],
  },
  {
    id: "q4",
    slug: "how-to-fund-masters-in-germany",
    title: "How do students actually fund a Master's in Germany?",
    body: "Tuition is famously low at public universities, but living costs in Munich are not. How do current students cover ~€1,000/month? DAAD? Part-time work? Family?",
    author: "Anaya G.",
    authorBadge: "Aspirant",
    category: "Scholarships",
    tags: ["Germany", "DAAD", "Funding"],
    postedAt: "2025-09-05T12:00:00Z",
    views: 7340,
    votes: 71,
    solved: false,
    answers: [
      {
        id: "a5",
        author: "Lukas B.",
        role: "MSc @ TUM",
        badge: "Current student",
        body: "Realistic mix: DAAD or Deutschland-Stipendium covers ~€300, HiWi (student assistant) jobs add €450-600/month, the rest from savings or family. Munich is the hardest city — Berlin / Aachen / Karlsruhe stretch the same euro 30% further.",
        upvotes: 154,
        postedAt: "2025-09-05T14:00:00Z",
      },
    ],
  },
  {
    id: "q5",
    slug: "campus-placements-cse-vs-ai-ml-branch",
    title: "Will an AI/ML branch get better placements than core CSE in 2027?",
    body: "Most colleges are launching AI/ML B.Tech programs. Recruiters still seem to hire from CSE pools. Is it worth picking AI/ML over CSE at a slightly higher-ranked college?",
    author: "Karan A.",
    authorBadge: "Aspirant",
    category: "Placements",
    tags: ["CSE", "AI/ML", "Placements"],
    postedAt: "2025-10-12T09:30:00Z",
    views: 5210,
    votes: 39,
    solved: false,
    answers: [
      {
        id: "a6",
        author: "Neha T.",
        role: "Placement head, NIT cohort",
        badge: "Counselor",
        body: "Most recruiters open roles to 'CSE & allied' which includes AI/ML, so packages are broadly similar. CSE is safer because it's universally recognised. Pick AI/ML only if the curriculum is genuinely different — not a re-skinned CSE syllabus.",
        upvotes: 102,
        postedAt: "2025-10-12T11:00:00Z",
      },
    ],
  },
  {
    id: "q6",
    slug: "best-time-to-visit-uk-campuses",
    title: "When's the best time to visit UK university campuses?",
    body: "Planning a campus tour across Oxford, LSE, and Edinburgh in 2026. Should we go during open days, term, or summer?",
    author: "Ishaan B.",
    authorBadge: "Parent",
    category: "Campus Life",
    tags: ["UK", "Campus visit", "Open day"],
    postedAt: "2025-09-29T15:10:00Z",
    views: 3120,
    votes: 22,
    solved: false,
    answers: [
      {
        id: "a7",
        author: "Olivia M.",
        role: "Outreach, UK Russell Group",
        badge: "Admissions",
        body: "Official open days (Sept-Oct) give you student panels and faculty access, but it's crowded. Visiting during term (Feb-March) is best to see real campus life. Avoid summer — campuses are largely empty.",
        upvotes: 64,
        postedAt: "2025-09-29T18:30:00Z",
      },
    ],
  },
];

export function getQuestion(slug: string): QAQuestion | undefined {
  return qaQuestions.find((q) => q.slug === slug);
}

// ───────────── Study Abroad ─────────────

export type Destination = {
  slug: string;
  country: string;
  flag: string; // emoji
  tagline: string;
  region: "Asia" | "Europe" | "Americas" | "Oceania";
  costIndex: "$" | "$$" | "$$$" | "$$$$";
  liveCostMonthly: string;
  tuitionRange: string;
  popularExams: string[];
  intakes: string[];
  topUniversities: string[];
  postStudyWork: string;
  workWhileStudying: string;
  visaProcessing: string;
  highlights: string[];
  heroAccent: string;
  internationalStudents: string;
  englishTaught: boolean;
};

export const destinations: Destination[] = [
  {
    slug: "united-states",
    country: "United States",
    flag: "🇺🇸",
    tagline: "Research, scale, and the world's deepest alumni networks.",
    region: "Americas",
    costIndex: "$$$$",
    liveCostMonthly: "$1,500 – $2,800",
    tuitionRange: "$25k – $58k / yr",
    popularExams: ["SAT", "ACT", "GRE", "GMAT", "TOEFL", "IELTS"],
    intakes: ["Fall (Aug)", "Spring (Jan)"],
    topUniversities: ["MIT", "Stanford", "Northgate IT", "Ironwood State"],
    postStudyWork: "OPT: 12 mo (36 mo for STEM)",
    workWhileStudying: "20 hrs / week on-campus",
    visaProcessing: "F-1: 4 – 8 weeks",
    highlights: ["STEM OPT extension", "Largest scholarship pool", "Strong R&D funding"],
    heroAccent: "from-brand to-academic",
    internationalStudents: "1.06M",
    englishTaught: true,
  },
  {
    slug: "united-kingdom",
    country: "United Kingdom",
    flag: "🇬🇧",
    tagline: "1-year master's, global brand, fast post-study pathway.",
    region: "Europe",
    costIndex: "$$$",
    liveCostMonthly: "£900 – £1,800",
    tuitionRange: "£18k – £45k / yr",
    popularExams: ["UCAT", "BMAT", "IELTS", "GMAT"],
    intakes: ["September", "January"],
    topUniversities: ["Oxford", "LSE", "Westmere Business", "Midhurst Law"],
    postStudyWork: "Graduate route: 24 mo",
    workWhileStudying: "20 hrs / week (term)",
    visaProcessing: "Student visa: 3 weeks",
    highlights: ["1-year master's", "Russell Group network", "Healthcare access (NHS)"],
    heroAccent: "from-brand to-gold",
    internationalStudents: "680k",
    englishTaught: true,
  },
  {
    slug: "canada",
    country: "Canada",
    flag: "🇨🇦",
    tagline: "Friendly visa, PR pathway, strong public universities.",
    region: "Americas",
    costIndex: "$$$",
    liveCostMonthly: "C$1,200 – C$2,000",
    tuitionRange: "C$20k – C$45k / yr",
    popularExams: ["IELTS", "TOEFL", "GRE", "GMAT"],
    intakes: ["Fall", "Winter", "Summer"],
    topUniversities: ["Toronto", "UBC", "McGill", "Waterloo"],
    postStudyWork: "PGWP: up to 3 yrs",
    workWhileStudying: "24 hrs / week (term)",
    visaProcessing: "Study permit: 8 – 12 weeks",
    highlights: ["PR pathway", "Co-op programs", "Affordable healthcare"],
    heroAccent: "from-academic to-brand",
    internationalStudents: "1.04M",
    englishTaught: true,
  },
  {
    slug: "germany",
    country: "Germany",
    flag: "🇩🇪",
    tagline: "Tuition-free public universities and a strong job market.",
    region: "Europe",
    costIndex: "$$",
    liveCostMonthly: "€800 – €1,200",
    tuitionRange: "€0 – €1,500 / yr (public)",
    popularExams: ["TestDaF", "IELTS", "GRE"],
    intakes: ["Winter (Oct)", "Summer (Apr)"],
    topUniversities: ["TUM", "RWTH Aachen", "LMU Munich", "TU Berlin"],
    postStudyWork: "18 mo job-seeker visa",
    workWhileStudying: "120 full / 240 half days",
    visaProcessing: "Student visa: 6 – 12 weeks",
    highlights: ["Public unis tuition-free", "Strong engineering pipeline", "Mittelstand jobs"],
    heroAccent: "from-academic to-gold",
    internationalStudents: "470k",
    englishTaught: false,
  },
  {
    slug: "australia",
    country: "Australia",
    flag: "🇦🇺",
    tagline: "Group of Eight, post-study work, easy lifestyle.",
    region: "Oceania",
    costIndex: "$$$",
    liveCostMonthly: "A$1,500 – A$2,500",
    tuitionRange: "A$22k – A$50k / yr",
    popularExams: ["IELTS", "PTE", "GMAT"],
    intakes: ["February", "July"],
    topUniversities: ["Melbourne", "Sydney", "ANU", "UNSW"],
    postStudyWork: "Subclass 485: 2 – 4 yrs",
    workWhileStudying: "48 hrs / fortnight",
    visaProcessing: "Subclass 500: 4 – 8 weeks",
    highlights: ["Group of Eight research", "PR-friendly", "Strong AI & mining schools"],
    heroAccent: "from-gold to-brand",
    internationalStudents: "740k",
    englishTaught: true,
  },
  {
    slug: "singapore",
    country: "Singapore",
    flag: "🇸🇬",
    tagline: "Asia's research hub with global salaries.",
    region: "Asia",
    costIndex: "$$$",
    liveCostMonthly: "S$1,200 – S$2,200",
    tuitionRange: "S$17k – S$40k / yr",
    popularExams: ["SAT", "GRE", "GMAT", "IELTS"],
    intakes: ["August", "January"],
    topUniversities: ["NUS", "NTU", "Pacific Global U", "SMU"],
    postStudyWork: "Long-Term Pass: 12 mo",
    workWhileStudying: "16 hrs / week (term)",
    visaProcessing: "Student pass: 4 weeks",
    highlights: ["Asia HQs hire on-campus", "Bilingual exposure", "Top QS ranks"],
    heroAccent: "from-academic to-gold",
    internationalStudents: "92k",
    englishTaught: true,
  },
  {
    slug: "ireland",
    country: "Ireland",
    flag: "🇮🇪",
    tagline: "Europe's tech gateway with a friendly post-study stay-back.",
    region: "Europe",
    costIndex: "$$$",
    liveCostMonthly: "€1,000 – €1,800",
    tuitionRange: "€10k – €25k / yr",
    popularExams: ["IELTS", "TOEFL", "GRE"],
    intakes: ["September", "January"],
    topUniversities: ["Trinity College Dublin", "UCD", "University of Limerick"],
    postStudyWork: "Stay-back: 24 mo",
    workWhileStudying: "20 hrs / week (term)",
    visaProcessing: "Stamp 2: 4 – 6 weeks",
    highlights: ["Big-tech EU HQs", "Strong pharma sector", "English-speaking EU"],
    heroAccent: "from-brand to-academic",
    internationalStudents: "35k",
    englishTaught: true,
  },
  {
    slug: "netherlands",
    country: "Netherlands",
    flag: "🇳🇱",
    tagline: "English-taught masters, design + tech, biking distance.",
    region: "Europe",
    costIndex: "$$",
    liveCostMonthly: "€900 – €1,500",
    tuitionRange: "€8k – €20k / yr",
    popularExams: ["IELTS", "TOEFL", "GMAT"],
    intakes: ["September", "February"],
    topUniversities: ["TU Delft", "University of Amsterdam", "Erasmus", "Eindhoven"],
    postStudyWork: "Orientation year: 12 mo",
    workWhileStudying: "16 hrs / week",
    visaProcessing: "MVV: 4 – 8 weeks",
    highlights: ["English-taught masters", "Strong design schools", "Liveable cities"],
    heroAccent: "from-gold to-academic",
    internationalStudents: "122k",
    englishTaught: true,
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
