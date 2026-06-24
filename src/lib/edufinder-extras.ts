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

// ───────────── Destination detail extras ─────────────

export type DestinationDetail = {
  overview: string;
  whyStudy: string[];
  costBreakdown: { label: string; value: string }[];
  scholarships: { name: string; coverage: string; deadline: string }[];
  topCities: { name: string; vibe: string; costIndex: string }[];
  visaSteps: { step: string; detail: string }[];
  faqs: { q: string; a: string }[];
};

export const destinationDetails: Record<string, DestinationDetail> = {
  "united-states": {
    overview:
      "The US hosts the world's largest pool of international students with 1,000+ accredited universities. Research funding tops $90B/yr and STEM OPT lets graduates work for up to 36 months without a sponsor change.",
    whyStudy: [
      "Largest scholarship pool worldwide",
      "STEM OPT: 36 months post-study work",
      "Flexible curricula with majors + minors",
      "Strong campus recruiting from FAANG, banks, consulting",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "$25k – $58k" },
      { label: "Tuition (PG)", value: "$30k – $70k" },
      { label: "Housing", value: "$800 – $1,800 / mo" },
      { label: "Food", value: "$300 – $600 / mo" },
      { label: "Health insurance", value: "$1,500 – $3,000 / yr" },
    ],
    scholarships: [
      { name: "Fulbright Foreign Student Program", coverage: "Full tuition + stipend", deadline: "May 2026" },
      { name: "Northgate Merit Fellowship", coverage: "Full tuition + housing", deadline: "Jan 15, 2026" },
      { name: "Ironwood Athletic Award", coverage: "$18k / yr", deadline: "Feb 1, 2026" },
    ],
    topCities: [
      { name: "Boston", vibe: "Academia, biotech, history", costIndex: "$$$$" },
      { name: "San Francisco Bay", vibe: "Tech, startup density", costIndex: "$$$$" },
      { name: "New York", vibe: "Finance, media, creative", costIndex: "$$$$" },
      { name: "Austin", vibe: "Music, tech, livable", costIndex: "$$$" },
    ],
    visaSteps: [
      { step: "Receive I-20", detail: "University issues I-20 after enrollment deposit." },
      { step: "Pay SEVIS fee", detail: "$350 SEVIS I-901 fee via FMJfee.com." },
      { step: "Book DS-160 interview", detail: "Complete DS-160 form, pay $185 visa fee, schedule at US consulate." },
      { step: "Visa interview", detail: "Bring I-20, financials, SOP. Most decisions same-day." },
    ],
    faqs: [
      { q: "Can I work off-campus on F-1?", a: "Not in the first year. CPT and OPT unlock paid internships and full-time roles after." },
      { q: "Do I need SAT for grad school?", a: "No. PG admits use GRE/GMAT plus undergrad transcripts." },
      { q: "How early should I apply?", a: "12 months before intake for Fall, especially for funding." },
    ],
  },
  "united-kingdom": {
    overview:
      "The UK packs a 3-year bachelor's and a 1-year master's, with the Graduate Route giving 24 months of post-study work. Russell Group universities dominate global rankings and have strong city placement.",
    whyStudy: [
      "1-year master's — fast and focused",
      "Graduate Route: 24 months post-study work",
      "NHS healthcare for student-visa holders",
      "Strong creative + finance recruiting",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "£18k – £35k" },
      { label: "Tuition (PG)", value: "£20k – £45k" },
      { label: "Housing (London)", value: "£900 – £1,800 / mo" },
      { label: "Housing (outside)", value: "£550 – £1,000 / mo" },
      { label: "IHS health surcharge", value: "£776 / yr" },
    ],
    scholarships: [
      { name: "Chevening Scholarship", coverage: "Full tuition + stipend", deadline: "Nov 2025" },
      { name: "Westmere MBA Future Leaders", coverage: "£35,000", deadline: "Mar 31, 2026" },
      { name: "Commonwealth Scholarship", coverage: "Full ride", deadline: "Dec 2025" },
    ],
    topCities: [
      { name: "London", vibe: "Finance, fashion, fintech", costIndex: "$$$$" },
      { name: "Edinburgh", vibe: "Compact, historic, livable", costIndex: "$$$" },
      { name: "Manchester", vibe: "Music, sport, affordable", costIndex: "$$" },
      { name: "Cambridge", vibe: "Research, deep-tech", costIndex: "$$$" },
    ],
    visaSteps: [
      { step: "Receive CAS", detail: "University issues Confirmation of Acceptance for Studies." },
      { step: "Pay IHS + visa fee", detail: "£776/yr IHS plus £490 visa fee." },
      { step: "Submit biometrics", detail: "Book a UKVCAS appointment in your city." },
      { step: "Decision in 3 weeks", detail: "Standard processing; priority is 5 working days for £500 extra." },
    ],
    faqs: [
      { q: "Can my partner come along?", a: "Dependents are allowed only for PG research and government-sponsored students from 2024." },
      { q: "Is the Graduate Route extendable?", a: "It's a one-time 24-month visa (36 for PhDs). After that, you switch to a Skilled Worker visa." },
      { q: "Are January intakes worth it?", a: "Yes for one-year master's, especially if you missed the September window." },
    ],
  },
  canada: {
    overview:
      "Canada is the easiest English-speaking country to convert study into PR. PGWP gives up to 3 years of open work; Express Entry rewards Canadian education and work experience.",
    whyStudy: [
      "PGWP: 3 years open work permit",
      "PR pathway via Express Entry / PNP",
      "Co-op programs built into degrees",
      "Affordable public healthcare provinces",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "C$20k – C$40k" },
      { label: "Tuition (PG)", value: "C$22k – C$45k" },
      { label: "Housing", value: "C$600 – C$1,400 / mo" },
      { label: "Food + transit", value: "C$500 – C$800 / mo" },
      { label: "GIC requirement", value: "C$20,635 (SDS)" },
    ],
    scholarships: [
      { name: "Vanier CGS (PhD)", coverage: "C$50,000 / yr", deadline: "Nov 2025" },
      { name: "Lester B. Pearson", coverage: "Full ride at U of T", deadline: "Nov 30, 2025" },
      { name: "UBC International Scholars", coverage: "Full tuition + living", deadline: "Dec 1, 2025" },
    ],
    topCities: [
      { name: "Toronto", vibe: "Finance, fintech, diverse", costIndex: "$$$$" },
      { name: "Vancouver", vibe: "Nature, film, sustainability", costIndex: "$$$$" },
      { name: "Montréal", vibe: "Bilingual, AI cluster, cheap rent", costIndex: "$$" },
      { name: "Waterloo", vibe: "Tech corridor, co-op heaven", costIndex: "$$" },
    ],
    visaSteps: [
      { step: "Receive LoA + pay deposit", detail: "Letter of Acceptance from a DLI is mandatory." },
      { step: "Buy GIC + first year tuition", detail: "Required under the Student Direct Stream for faster processing." },
      { step: "Apply for study permit", detail: "Online via IRCC; biometrics at VFS." },
      { step: "Decision in 8–12 weeks", detail: "SDS turnaround is often 20 days for eligible countries." },
    ],
    faqs: [
      { q: "Is PGWP renewable?", a: "No. It's one-time, length = program length, max 3 years." },
      { q: "Can my spouse work?", a: "Yes — open work permit available while you study." },
      { q: "Which province has the best PR odds?", a: "Ontario, BC, and Atlantic provinces have the most generous PNP streams for graduates." },
    ],
  },
  germany: {
    overview:
      "Germany offers tuition-free public universities and Europe's strongest engineering job market. The 18-month job-seeker visa after graduation is the most generous in the EU.",
    whyStudy: [
      "Public universities are tuition-free",
      "18-month post-study job-seeker visa",
      "Strong Mittelstand + DAX hiring pipeline",
      "Low cost outside Munich",
    ],
    costBreakdown: [
      { label: "Tuition (public)", value: "€0 – €1,500 / yr" },
      { label: "Tuition (private)", value: "€10k – €25k / yr" },
      { label: "Blocked account", value: "€11,904 / yr required" },
      { label: "Housing (non-Munich)", value: "€350 – €700 / mo" },
      { label: "Health insurance", value: "~€110 / mo" },
    ],
    scholarships: [
      { name: "DAAD Scholarship", coverage: "€850 – €1,200 / mo", deadline: "Varies" },
      { name: "Deutschland-Stipendium", coverage: "€300 / mo", deadline: "University-specific" },
      { name: "Heinrich Böll Foundation", coverage: "Full stipend", deadline: "Mar / Sep 2026" },
    ],
    topCities: [
      { name: "Berlin", vibe: "Startups, art, affordable", costIndex: "$$" },
      { name: "Munich", vibe: "BMW, Siemens, premium", costIndex: "$$$" },
      { name: "Aachen", vibe: "RWTH engineering hub", costIndex: "$$" },
      { name: "Hamburg", vibe: "Media, port, livable", costIndex: "$$$" },
    ],
    visaSteps: [
      { step: "Open blocked account", detail: "Deposit €11,904 via Expatrio, Fintiba, or Deutsche Bank." },
      { step: "Apply at German consulate", detail: "Book early — slots fill 6–8 weeks out in India." },
      { step: "Health insurance", detail: "TK or AOK statutory insurance arrangement letter required." },
      { step: "Visa decision", detail: "6–12 weeks. Enter Germany within 90 days of issue." },
    ],
    faqs: [
      { q: "Do I need German?", a: "English-taught masters exist, but B1 German doubles your job options." },
      { q: "Is the job-seeker visa extendable?", a: "Once you find a job, you switch to a work residence permit; EU Blue Card after." },
      { q: "Are private unis worth it?", a: "For MBA / business — often yes. For STEM, public is the gold standard." },
    ],
  },
  australia: {
    overview:
      "Australia's Group of Eight universities lead the southern hemisphere in research. The Subclass 485 graduate visa offers 2–4 years of post-study work, and PR pathways favour regional graduates.",
    whyStudy: [
      "Group of Eight global research leaders",
      "485 visa: 2–4 years post-study work",
      "Regional PR points uplift",
      "Strong mining, AI, healthcare hiring",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "A$22k – A$48k" },
      { label: "Tuition (PG)", value: "A$25k – A$50k" },
      { label: "Housing", value: "A$800 – A$1,800 / mo" },
      { label: "OSHC health cover", value: "A$650 / yr" },
      { label: "Living bond", value: "A$29,710 / yr (proof)" },
    ],
    scholarships: [
      { name: "Australia Awards", coverage: "Full ride + stipend", deadline: "Apr 2026" },
      { name: "Melbourne Graduate Research", coverage: "Tuition + stipend", deadline: "Oct 2025" },
      { name: "ANU Chancellor's Scholarship", coverage: "A$25,000 / yr", deadline: "Nov 2025" },
    ],
    topCities: [
      { name: "Melbourne", vibe: "Coffee, arts, livable", costIndex: "$$$" },
      { name: "Sydney", vibe: "Finance, harbor, premium", costIndex: "$$$$" },
      { name: "Brisbane", vibe: "Sun, sport, value", costIndex: "$$" },
      { name: "Adelaide", vibe: "Regional PR points, affordable", costIndex: "$$" },
    ],
    visaSteps: [
      { step: "Receive CoE", detail: "Confirmation of Enrolment from your university." },
      { step: "OSHC + GTE statement", detail: "Genuine Temporary Entrant essay is mandatory." },
      { step: "Health check", detail: "Bupa medical at empanelled clinics." },
      { step: "Subclass 500 visa", detail: "Online via ImmiAccount; 4–8 weeks typical." },
    ],
    faqs: [
      { q: "Does regional study really help PR?", a: "Yes — extra 5 points on the PR test and an extra year of 485 visa." },
      { q: "How many hours can I work?", a: "48 hours per fortnight during term, unlimited in breaks." },
      { q: "Is PTE accepted?", a: "Yes — PTE, IELTS, TOEFL, and Cambridge all accepted by every Go8 university." },
    ],
  },
  singapore: {
    overview:
      "Singapore's NUS and NTU sit in the global top 20, and the city hosts Asian HQs for Google, Meta, ByteDance, and the big banks. Salaries for grads rival the US west coast in PPP terms.",
    whyStudy: [
      "Asian HQ hiring on campus",
      "Top-20 QS universities (NUS, NTU)",
      "Bilingual exposure (English-medium)",
      "Safe, compact, well-connected",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "S$17k – S$40k" },
      { label: "Tuition (PG)", value: "S$30k – S$60k" },
      { label: "Housing", value: "S$800 – S$1,800 / mo" },
      { label: "Food", value: "S$300 – S$500 / mo" },
      { label: "Tuition grant bond", value: "3 yrs work in SG (optional)" },
    ],
    scholarships: [
      { name: "MOE Tuition Grant", coverage: "~50% tuition", deadline: "Auto-applied" },
      { name: "Global Women in STEM (PGU)", coverage: "50% tuition + mentor", deadline: "Feb 28, 2026" },
      { name: "ASEAN Scholarship", coverage: "Full ride", deadline: "Jun 2026" },
    ],
    topCities: [
      { name: "Singapore (One Country)", vibe: "Finance, biotech, govt-tech", costIndex: "$$$" },
    ],
    visaSteps: [
      { step: "IPA letter", detail: "ICA issues In-Principle Approval after enrollment." },
      { step: "Medical + photo", detail: "Submit at ICA on arrival." },
      { step: "Collect Student Pass", detail: "Issued within 4 weeks of arrival." },
    ],
    faqs: [
      { q: "Is the tuition grant mandatory?", a: "No — but it cuts tuition by ~50% in exchange for 3 years of SG-based work after graduation." },
      { q: "Can I extend stay after grad?", a: "1-year Long-Term Visit Pass; convert to Employment Pass once you secure a role." },
      { q: "Best month to apply?", a: "12 months before August intake; January intake is smaller and competitive." },
    ],
  },
  ireland: {
    overview:
      "Ireland is the English-speaking EU base for Google, Meta, Stripe, and Pfizer. A 24-month stay-back makes Dublin a leading destination for STEM and pharma graduates.",
    whyStudy: [
      "EU HQs of Google, Meta, LinkedIn",
      "24-month stay-back visa",
      "English-taught EU degrees",
      "Pharma + medical device cluster",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "€10k – €25k" },
      { label: "Tuition (PG)", value: "€12k – €30k" },
      { label: "Housing (Dublin)", value: "€900 – €1,800 / mo" },
      { label: "Housing (other)", value: "€500 – €1,000 / mo" },
    ],
    scholarships: [
      { name: "Government of Ireland Scholarships", coverage: "€10,000", deadline: "Mar 2026" },
      { name: "Trinity Global Excellence", coverage: "€5,000 – €10,000", deadline: "Jun 2026" },
    ],
    topCities: [
      { name: "Dublin", vibe: "Big-tech EU HQs", costIndex: "$$$$" },
      { name: "Cork", vibe: "Pharma, livable, port", costIndex: "$$" },
      { name: "Galway", vibe: "Med-tech, west coast", costIndex: "$$" },
    ],
    visaSteps: [
      { step: "Receive offer + pay", detail: "Acceptance letter + tuition deposit." },
      { step: "Visa application", detail: "AVATS online + €60 fee." },
      { step: "Stamp 2 at airport", detail: "Register with immigration after arrival." },
    ],
    faqs: [
      { q: "Is Ireland really cheaper than UK?", a: "Tuition is similar; Dublin rent is on par with London — outside Dublin, much cheaper." },
      { q: "Can I work full-time after grad?", a: "Yes, on the Third Level Graduate Stay-back; convert to Critical Skills Permit for long-term." },
    ],
  },
  netherlands: {
    overview:
      "The Netherlands offers Europe's largest catalogue of English-taught master's programs and a 12-month orientation year for grads. Strong in design, AI, and engineering.",
    whyStudy: [
      "Largest English-taught EU catalogue",
      "12-month orientation year visa",
      "TU Delft, Eindhoven for engineering",
      "Liveable cities, biking culture",
    ],
    costBreakdown: [
      { label: "Tuition (UG)", value: "€8k – €15k" },
      { label: "Tuition (PG)", value: "€12k – €20k" },
      { label: "Housing", value: "€500 – €1,200 / mo" },
      { label: "Health insurance", value: "~€130 / mo" },
    ],
    scholarships: [
      { name: "Holland Scholarship", coverage: "€5,000 one-time", deadline: "Feb 2026" },
      { name: "Orange Tulip Scholarship", coverage: "Tuition discount", deadline: "Varies" },
    ],
    topCities: [
      { name: "Amsterdam", vibe: "Creative, finance, fintech", costIndex: "$$$$" },
      { name: "Delft", vibe: "Engineering, compact", costIndex: "$$" },
      { name: "Eindhoven", vibe: "ASML, deep-tech", costIndex: "$$" },
      { name: "Rotterdam", vibe: "Port, architecture, value", costIndex: "$$" },
    ],
    visaSteps: [
      { step: "University sponsors MVV", detail: "Dutch university handles immigration paperwork." },
      { step: "Submit documents", detail: "Passport, financials, diploma, English score." },
      { step: "MVV sticker", detail: "Collect at Dutch embassy after approval." },
    ],
    faqs: [
      { q: "Is Dutch needed?", a: "Not for English programs, but B1 Dutch helps post-study employment outside big-tech." },
      { q: "How hard is housing?", a: "Very. Apply 6+ months early or use university housing where offered." },
    ],
  },
};

export function getDestinationDetail(slug: string): DestinationDetail | undefined {
  return destinationDetails[slug];
}

// ───────────── Exam Prep ─────────────

export type ExamPrep = {
  slug: string;
  name: string;
  fullName: string;
  category: "English Proficiency" | "Standardised Admissions" | "Graduate Tests" | "Subject Tests";
  acceptedBy: string;
  duration: string;
  feeRange: string;
  scoreRange: string;
  validity: string;
  format: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  sections: { name: string; details: string; duration: string }[];
  tips: string[];
  practiceTests: number;
  mockSeries: number;
  resources: { title: string; type: "Video" | "PDF" | "Mock" | "Live class" }[];
  topScorers: { name: string; score: string; story: string }[];
  heroAccent: string;
  tagline: string;
};

export const examPreps: ExamPrep[] = [
  {
    slug: "pte-practice",
    name: "PTE Academic",
    fullName: "Pearson Test of English Academic",
    category: "English Proficiency",
    acceptedBy: "Accepted by 3,000+ universities & all Australian visas",
    duration: "2 hours (computer-based)",
    feeRange: "₹15,900 / $200",
    scoreRange: "10 – 90",
    validity: "2 years",
    format: "Computer-delivered, AI-scored",
    difficulty: 3,
    sections: [
      { name: "Speaking & Writing", details: "Read aloud, repeat sentence, essay", duration: "54 – 67 min" },
      { name: "Reading", details: "Multiple choice, re-order, fill blanks", duration: "29 – 30 min" },
      { name: "Listening", details: "Summarise, fill blanks, highlight", duration: "30 – 43 min" },
    ],
    tips: [
      "Speak at a steady pace — AI penalises hesitation more than accent.",
      "Re-order paragraphs: anchor by the topic sentence first.",
      "Write essays in 5 paragraphs of 50–60 words each — predictable scoring.",
      "Use templates for Repeat Sentence and Describe Image.",
    ],
    practiceTests: 18,
    mockSeries: 6,
    resources: [
      { title: "PTE template playbook", type: "PDF" },
      { title: "Full-length scored mock 1", type: "Mock" },
      { title: "Speaking pacing masterclass", type: "Video" },
      { title: "Saturday live correction", type: "Live class" },
    ],
    topScorers: [
      { name: "Aanya R.", score: "89 / 90", story: "Cracked 79+ in all sections in 21 days using only templates and 4 full mocks." },
      { name: "Vihan M.", score: "85 / 90", story: "Went from 65 to 85 by switching from IELTS prep — same vocab, different exam." },
    ],
    heroAccent: "from-brand to-academic",
    tagline: "AI-scored, computer-based, results in 48 hours.",
  },
  {
    slug: "ielts-practice",
    name: "IELTS Academic",
    fullName: "International English Language Testing System — Academic",
    category: "English Proficiency",
    acceptedBy: "11,000+ organisations including UK Visas, Canadian PR, Australian unis",
    duration: "2 hours 45 minutes",
    feeRange: "₹17,000 / $250",
    scoreRange: "0 – 9 band",
    validity: "2 years",
    format: "Paper or computer; in-person speaking",
    difficulty: 3,
    sections: [
      { name: "Listening", details: "4 sections, 40 questions", duration: "30 min" },
      { name: "Reading", details: "3 long passages, 40 questions", duration: "60 min" },
      { name: "Writing", details: "Task 1 graph + Task 2 essay", duration: "60 min" },
      { name: "Speaking", details: "Face-to-face with examiner", duration: "11 – 14 min" },
    ],
    tips: [
      "In Task 1 writing, describe trends and overall patterns — don't list every number.",
      "Use linking phrases sparingly; band 7+ rewards range, not repetition.",
      "Speaking: develop answers in 3 sentences — direct, example, opinion.",
      "Reading: skim for keywords first, then read paragraphs in detail.",
    ],
    practiceTests: 24,
    mockSeries: 8,
    resources: [
      { title: "Cambridge IELTS 17 question bank", type: "PDF" },
      { title: "Writing Task 2 model essays (band 8+)", type: "PDF" },
      { title: "Speaking part 2 cue-card drills", type: "Video" },
      { title: "Weekly examiner Q&A", type: "Live class" },
    ],
    topScorers: [
      { name: "Sara P.", score: "Band 8.5", story: "From 7.0 to 8.5 in 6 weeks with focused writing feedback and 12 timed mocks." },
      { name: "Devansh K.", score: "Band 8.0", story: "Aced speaking by recording every answer and self-scoring against the rubric." },
    ],
    heroAccent: "from-academic to-gold",
    tagline: "The world's most-recognised English test — paper or computer.",
  },
  {
    slug: "sat-practice",
    name: "SAT",
    fullName: "Scholastic Assessment Test (Digital SAT)",
    category: "Standardised Admissions",
    acceptedBy: "US, Canada, Singapore undergrad admissions",
    duration: "2 hours 14 minutes (digital, adaptive)",
    feeRange: "$60 + regional fee",
    scoreRange: "400 – 1600",
    validity: "5 years",
    format: "Digital, multi-stage adaptive, Bluebook app",
    difficulty: 3,
    sections: [
      { name: "Reading & Writing", details: "Two 32-min modules, adaptive", duration: "64 min" },
      { name: "Math", details: "Two 35-min modules, calculator throughout", duration: "70 min" },
    ],
    tips: [
      "First module is medium difficulty — performance routes you to easy or hard module 2.",
      "Always answer — no negative marking on the digital SAT.",
      "Use Desmos calculator inside Bluebook; faster than scratch math.",
      "Reading: questions are now passage-by-passage, shorter, no double passages.",
    ],
    practiceTests: 16,
    mockSeries: 4,
    resources: [
      { title: "Khan Academy adaptive plan", type: "Video" },
      { title: "Digital SAT formula sheet", type: "PDF" },
      { title: "Bluebook full-length practice 1–4", type: "Mock" },
      { title: "Saturday Math marathon", type: "Live class" },
    ],
    topScorers: [
      { name: "Rahul S.", score: "1560 / 1600", story: "Scored 800 Math + 760 RW after 3 months on Khan + 6 Bluebook mocks." },
      { name: "Megha R.", score: "1530 / 1600", story: "Used the College Board question bank only — no paid prep." },
    ],
    heroAccent: "from-brand to-gold",
    tagline: "Digital, adaptive, and shorter than ever.",
  },
  {
    slug: "gre-practice",
    name: "GRE General",
    fullName: "Graduate Record Examination — General Test",
    category: "Graduate Tests",
    acceptedBy: "Most US, Canada, and global grad programs",
    duration: "1 hour 58 minutes (shorter GRE)",
    feeRange: "$220",
    scoreRange: "260 – 340 + 0 – 6 AWA",
    validity: "5 years",
    format: "Computer-delivered, multi-stage adaptive",
    difficulty: 4,
    sections: [
      { name: "Analytical Writing", details: "One issue task", duration: "30 min" },
      { name: "Verbal Reasoning", details: "Two sections, adaptive", duration: "41 min" },
      { name: "Quantitative", details: "Two sections, adaptive", duration: "47 min" },
    ],
    tips: [
      "Build a 500-word high-frequency vocab list and review for 15 min daily.",
      "Quant: practice problem-solving without the on-screen calculator first.",
      "AWA: pre-write 4 issue-task templates and adapt.",
      "Section 2 difficulty depends on section 1 performance — push hard early.",
    ],
    practiceTests: 12,
    mockSeries: 5,
    resources: [
      { title: "Magoosh vocab flashcards", type: "PDF" },
      { title: "ETS PowerPrep 1 + 2", type: "Mock" },
      { title: "Quant comparison strategy", type: "Video" },
      { title: "Weekly AWA grading", type: "Live class" },
    ],
    topScorers: [
      { name: "Anaya G.", score: "335 / 340", story: "170Q + 165V in 8 weeks; daily 30-question quant warm-ups were the key." },
    ],
    heroAccent: "from-academic to-brand",
    tagline: "Shorter GRE, same admissions weight.",
  },
  {
    slug: "gmat-practice",
    name: "GMAT Focus",
    fullName: "Graduate Management Admission Test — Focus Edition",
    category: "Graduate Tests",
    acceptedBy: "MBA and business master's worldwide",
    duration: "2 hours 15 minutes",
    feeRange: "$275",
    scoreRange: "205 – 805",
    validity: "5 years",
    format: "Computer-adaptive, all sections re-orderable",
    difficulty: 5,
    sections: [
      { name: "Quantitative", details: "21 questions, problem solving", duration: "45 min" },
      { name: "Verbal", details: "23 questions, reading + critical reasoning", duration: "45 min" },
      { name: "Data Insights", details: "20 questions, data sufficiency, graphs", duration: "45 min" },
    ],
    tips: [
      "Bookmark and review tool now lets you flag 3 questions per section — use it for guesses.",
      "Data Insights replaced IR + Data Sufficiency — practice with the official prep.",
      "Reorder sections by your strongest first to bank confidence.",
      "Treat 645+ as table stakes for top-25 MBAs.",
    ],
    practiceTests: 10,
    mockSeries: 6,
    resources: [
      { title: "Official GMAT Focus prep bundle", type: "Mock" },
      { title: "Data Insights playbook", type: "PDF" },
      { title: "Critical reasoning frameworks", type: "Video" },
      { title: "MBA admit Q&A", type: "Live class" },
    ],
    topScorers: [
      { name: "Karan A.", score: "725 / 805", story: "Cleared in 10 weeks while working — 2 hrs weeknight + 6 hrs weekend rhythm." },
    ],
    heroAccent: "from-brand to-academic",
    tagline: "Shorter, sharper — built for the modern MBA cycle.",
  },
  {
    slug: "toefl-practice",
    name: "TOEFL iBT",
    fullName: "Test of English as a Foreign Language — Internet-Based Test",
    category: "English Proficiency",
    acceptedBy: "12,000+ universities including 100% of US Ivy League",
    duration: "1 hour 56 minutes",
    feeRange: "$185 – $260",
    scoreRange: "0 – 120",
    validity: "2 years",
    format: "Internet-based, integrated tasks",
    difficulty: 3,
    sections: [
      { name: "Reading", details: "2 passages, 20 questions", duration: "35 min" },
      { name: "Listening", details: "Lectures + conversations", duration: "36 min" },
      { name: "Speaking", details: "4 tasks, recorded", duration: "16 min" },
      { name: "Writing", details: "Integrated + Academic discussion", duration: "29 min" },
    ],
    tips: [
      "Integrated tasks reward note-taking — practice a 2-column shorthand system.",
      "Speaking is recorded; aim for clean 45-second responses without filler words.",
      "Writing: the discussion task replaced independent essay — keep it 100–125 words.",
    ],
    practiceTests: 14,
    mockSeries: 4,
    resources: [
      { title: "Official Guide to the TOEFL 6e", type: "PDF" },
      { title: "ETS TPO mocks 1–5", type: "Mock" },
      { title: "Speaking shadowing drills", type: "Video" },
    ],
    topScorers: [
      { name: "Priya M.", score: "118 / 120", story: "All 30s except 28 in speaking; integrated tasks practised daily for a month." },
    ],
    heroAccent: "from-gold to-academic",
    tagline: "Trusted by Ivy League. Trusted by you.",
  },
  {
    slug: "jee-practice",
    name: "JEE Main",
    fullName: "Joint Entrance Examination — Main",
    category: "Subject Tests",
    acceptedBy: "NITs, IIITs, GFTIs, state engineering colleges + JEE Advanced gateway",
    duration: "3 hours",
    feeRange: "₹1,000",
    scoreRange: "0 – 300 / Percentile",
    validity: "Single admission cycle",
    format: "Computer-based, 2 sessions per year",
    difficulty: 5,
    sections: [
      { name: "Physics", details: "25 questions (20 MCQ + 5 NAT)", duration: "60 min" },
      { name: "Chemistry", details: "25 questions", duration: "60 min" },
      { name: "Mathematics", details: "25 questions", duration: "60 min" },
    ],
    tips: [
      "NCERT first — 35% of chemistry comes verbatim.",
      "Build a daily PYQ habit; the question pool repeats themes year-on-year.",
      "Maintain a mistakes notebook; revisit before every mock.",
      "Attempt April after using January as a diagnostic.",
    ],
    practiceTests: 60,
    mockSeries: 12,
    resources: [
      { title: "10-year PYQ chapter-wise", type: "PDF" },
      { title: "All-India test series", type: "Mock" },
      { title: "Daily problem of the day", type: "Video" },
      { title: "Doubts cleared live", type: "Live class" },
    ],
    topScorers: [
      { name: "Ankit V.", score: "99.98 %ile", story: "Top 200 AIR; built every concept off NCERT + HC Verma + 12 full mocks." },
    ],
    heroAccent: "from-academic to-gold",
    tagline: "India's most competitive engineering gateway.",
  },
];

export function getExamPrep(slug: string): ExamPrep | undefined {
  return examPreps.find((e) => e.slug === slug);
}

// ───────────── News & Updates ─────────────

export type NewsCategory =
  | "Admissions"
  | "Exam Updates"
  | "Policy"
  | "Scholarships"
  | "Rankings"
  | "Study Abroad";

export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: NewsCategory;
  source: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  heroAccent: string;
  pinned?: boolean;
};

export const newsItems: NewsItem[] = [
  {
    slug: "nta-announces-jee-main-2026-schedule",
    title: "NTA announces JEE Main 2026 schedule — January & April attempts",
    excerpt:
      "JEE Main 2026 will run in two sessions: 22 January – 4 February and 1 – 15 April. Registration opens November 7, 2025.",
    body: [
      "The National Testing Agency (NTA) has notified the JEE Main 2026 schedule. Session 1 will be held between 22 January and 4 February 2026, while Session 2 runs from 1 to 15 April 2026.",
      "Registration opens on 7 November 2025 on jeemain.nta.nic.in. Candidates can attempt either or both sessions; the better of the two normalised scores is considered for ranking.",
      "Key changes for 2026 include a revised question paper pattern with optional questions removed in Section B, and a tightened OMR-free fully computer-based format across all centres. Application fees remain ₹1,000 for general male candidates and ₹500 for SC/ST/PwD applicants.",
      "Counsellors recommend treating January as a diagnostic session, then peaking with focused revision before April — a strategy historically used by 99-percentile rankers.",
    ],
    category: "Exam Updates",
    source: "National Testing Agency",
    author: "EduFinder Newsdesk",
    publishedAt: "2025-10-26T08:30:00Z",
    readTime: "3 min",
    tags: ["JEE Main", "NTA", "2026 cycle"],
    heroAccent: "from-brand to-academic",
    pinned: true,
  },
  {
    slug: "uk-graduate-route-extended-2026",
    title: "UK confirms Graduate Route stays at 24 months through 2026",
    excerpt:
      "After a Migration Advisory Committee review, the UK government has retained the Graduate Route at 24 months for taught masters and 36 months for PhDs.",
    body: [
      "Following months of speculation, the Home Office has confirmed that the Graduate Route — the visa that allows international students to stay and work in the UK after graduation — will remain unchanged through the 2026 admissions cycle.",
      "The Migration Advisory Committee (MAC) had been asked to review whether the route was being misused, but the final review concluded it 'remains aligned with national interest, helping universities sustain teaching budgets and attract global talent'.",
      "For Indian students, the UK remains particularly attractive: 24 months of open work, no employer sponsorship needed, and access to the Skilled Worker visa as a follow-on.",
      "Universities UK welcomed the decision, noting that international tuition cross-subsidises domestic fees and research funding at most Russell Group institutions.",
    ],
    category: "Policy",
    source: "UK Home Office",
    author: "Olivia M.",
    publishedAt: "2025-10-22T14:00:00Z",
    readTime: "4 min",
    tags: ["UK", "Graduate Route", "Policy"],
    heroAccent: "from-brand to-gold",
  },
  {
    slug: "qs-world-rankings-2026-released",
    title: "QS World University Rankings 2026 — IIT Bombay enters global top 100",
    excerpt:
      "MIT keeps the #1 spot for the 13th year. IIT Bombay rises to #98, the first Indian institute in the global top 100.",
    body: [
      "Quacquarelli Symonds (QS) has released its 2026 World University Rankings, surveying 1,500 universities across 105 countries.",
      "MIT retains the global #1 position for an unbroken 13th year. Imperial College London moves to #2 (from #6 last year), with Stanford, Oxford, and Cambridge rounding out the top 5.",
      "IIT Bombay's jump from #118 to #98 marks the first time an Indian institute enters the global top 100, driven by higher employer reputation scores and a doubling of international research collaborations.",
      "Other Indian highlights include IIT Delhi (#142), IISc Bengaluru (#161), and IIT Madras (#180). Three new Indian universities entered the top 500 this year.",
    ],
    category: "Rankings",
    source: "QS Quacquarelli Symonds",
    author: "EduFinder Newsdesk",
    publishedAt: "2025-10-18T05:00:00Z",
    readTime: "5 min",
    tags: ["QS Rankings", "IIT Bombay", "Global"],
    heroAccent: "from-academic to-brand",
    pinned: true,
  },
  {
    slug: "germany-blocked-account-2026",
    title: "Germany raises blocked-account amount to €11,904 for 2026 intake",
    excerpt:
      "International students applying for a German student visa from January 2026 must demonstrate €11,904 in a blocked account — up from €11,208.",
    body: [
      "The German Federal Foreign Office has raised the blocked-account (Sperrkonto) requirement to €11,904 per year, effective for visas issued from 1 January 2026.",
      "The amount corresponds to €992 per month and reflects the updated BAföG cost of living rate. Students must transfer this amount to a recognised blocked-account provider (Expatrio, Fintiba, Coracle, Deutsche Bank) before the visa interview.",
      "Despite the increase, Germany remains one of the most affordable European destinations thanks to tuition-free public universities. Health insurance via TK or AOK remains around €110/month.",
      "Students should budget an additional 4–6 weeks for the blocked-account setup process when planning their visa timeline.",
    ],
    category: "Study Abroad",
    source: "Bundesregierung",
    author: "Lukas B.",
    publishedAt: "2025-10-12T09:15:00Z",
    readTime: "3 min",
    tags: ["Germany", "Visa", "Blocked account"],
    heroAccent: "from-academic to-gold",
  },
  {
    slug: "cuet-ug-2026-applications-open",
    title: "CUET UG 2026 applications open; 280 universities now participating",
    excerpt:
      "Common University Entrance Test for UG opens registration with 280 participating universities — including 8 new private deemed-to-be universities.",
    body: [
      "The National Testing Agency has opened CUET UG 2026 registration on cuet.nta.nic.in. The exam will be held between 1 and 20 May 2026 across 380 cities in India and 24 abroad.",
      "280 universities will accept CUET scores in 2026 — up from 245 last year. Newly added include 8 private deemed-to-be universities and 12 state universities, broadening the test's reach beyond central universities.",
      "The exam pattern remains a 60-question MCQ with optional 50 attempts per subject. Domain subjects, language tests, and a general test together form a maximum of 5 selectable papers per candidate.",
      "Applications close 28 December 2025. Late fee window: 29 – 31 December, with corrections allowed 2 – 4 January 2026.",
    ],
    category: "Admissions",
    source: "NTA / cuet.nta.nic.in",
    author: "EduFinder Newsdesk",
    publishedAt: "2025-10-08T11:45:00Z",
    readTime: "4 min",
    tags: ["CUET UG", "Undergrad", "NTA"],
    heroAccent: "from-brand to-academic",
  },
  {
    slug: "fulbright-india-2027-announced",
    title: "Fulbright-Nehru 2027 fellowships open — 100 awards announced",
    excerpt:
      "USIEF has opened the Fulbright-Nehru Master's and Doctoral fellowships for the 2027 cycle. Deadline: 15 May 2026.",
    body: [
      "The United States-India Educational Foundation (USIEF) has announced the 2027 cohort of Fulbright-Nehru fellowships. 100 awards are available across the Master's, Doctoral, and Postdoctoral tracks.",
      "Each Master's fellowship covers J-1 visa support, round-trip airfare, full tuition, monthly stipend, and accident & sickness coverage for up to two years.",
      "Eligible fields include arts & culture, environmental science, public health, public policy, urban planning, and women's studies. Applicants must hold an Indian passport and a 4-year bachelor's degree with at least 55%.",
      "Applications close on 15 May 2026 via usief.org.in. Shortlisted candidates will be interviewed in August 2026; awards announced by March 2027.",
    ],
    category: "Scholarships",
    source: "USIEF",
    author: "EduFinder Newsdesk",
    publishedAt: "2025-09-30T07:30:00Z",
    readTime: "4 min",
    tags: ["Fulbright", "USIEF", "Scholarships"],
    heroAccent: "from-gold to-academic",
  },
  {
    slug: "canada-cap-international-students",
    title: "Canada caps international study permits at 437,000 for 2026",
    excerpt:
      "IRCC has set a 437,000 cap on new international study permits for 2026, with provincial allocations tied to housing capacity.",
    body: [
      "Immigration, Refugees and Citizenship Canada (IRCC) has set the national cap for new international study permits at 437,000 for 2026 — a 10% reduction from the 2025 cap of 485,000.",
      "Each province has been allocated a quota tied to housing supply. Ontario receives the largest share at 141,000, followed by British Columbia at 83,000.",
      "Provincial Attestation Letters (PALs) remain mandatory for most study permit applications, with master's, doctoral, and K-12 students exempt.",
      "Counsellors expect intake competition to intensify, especially for popular Ontario and BC programs. Earlier applications and stronger SOPs will matter more than in previous cycles.",
    ],
    category: "Policy",
    source: "IRCC",
    author: "EduFinder Newsdesk",
    publishedAt: "2025-09-21T16:20:00Z",
    readTime: "5 min",
    tags: ["Canada", "Policy", "Study permits"],
    heroAccent: "from-brand to-gold",
  },
  {
    slug: "neet-pg-2026-conducted-shifts",
    title: "NEET PG 2026 to be held in two shifts on a single day",
    excerpt:
      "After last year's postponement chaos, NBE will hold NEET PG 2026 in two shifts on a single day with normalised scoring.",
    body: [
      "The National Board of Examinations (NBE) has notified that NEET PG 2026 will be conducted in two shifts on a single day — Sunday, 21 June 2026 — with normalised scoring across both shifts.",
      "The decision follows criticism of the 2024 postponement and last-minute centre changes. NBE has also doubled the centre count and increased computer capacity by 35%.",
      "The exam pattern remains a 200-question MCQ over 3.5 hours, with negative marking of -1 for every incorrect answer. Counselling is expected to begin by mid-July 2026.",
      "Aspirants are advised to register early; the application window will likely open in early March 2026.",
    ],
    category: "Exam Updates",
    source: "National Board of Examinations",
    author: "Dr. R. Pillai",
    publishedAt: "2025-09-14T10:00:00Z",
    readTime: "3 min",
    tags: ["NEET PG", "Medical", "2026"],
    heroAccent: "from-academic to-brand",
  },
];

export function getNewsItem(slug: string): NewsItem | undefined {
  return newsItems.find((n) => n.slug === slug);
}
