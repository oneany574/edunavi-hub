// Demo data for EduFinder. Static, in-memory — swap for real data later.

export type Stream = {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
  collegeCount: number;
};

export type College = {
  slug: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  ownership: "Private" | "Public" | "Deemed" | "Autonomous";
  established: number;
  rating: number;
  ratingCount: number;
  ranking: number;
  rankingLabel: string;
  feesMin: number;
  feesMax: number;
  feesCurrency: "USD" | "INR" | "GBP";
  avgPackage: number;
  highestPackage: number;
  examsAccepted: string[];
  streams: string[];
  courseCount: number;
  claimed: boolean;
  facilities: string[];
  about: string;
  heroAccent: string; // tailwind-friendly gradient label
  placementRate: number;
  studentRatio: string;
  internationalShare: number;
  placementTrend: { year: number; package: number }[];
  feeBreakdown: { label: string; amount: number }[];
  ratingDistribution: { stars: number; pct: number }[];
  topRecruiters: string[];
  similar: string[];
};

export type Course = {
  slug: string;
  name: string;
  shortName: string;
  level: "UG" | "PG" | "Diploma" | "Doctorate";
  durationMonths: number;
  stream: string;
  mode: "Full-time" | "Online" | "Hybrid";
  feesRange: string;
  feesMin: number;
  feesMax: number;
  feesCurrency: "USD" | "INR" | "GBP";
  description: string;
  longDescription: string;
  collegesOffering: number;
  relatedExams: string[];
  heroAccent: string;
  rating: number;
  ratingCount: number;
  studentsEnrolled: string;
  eligibility: string[];
  careerPaths: { role: string; salary: string }[];
  curriculum: { term: string; topics: string[] }[];
  avgSalary: string;
  highestSalary: string;
  topRecruiters: string[];
  topColleges: string[];
  skills: string[];
  whyChoose: string[];
};

export type Exam = {
  slug: string;
  name: string;
  fullName: string;
  conductingBody: string;
  level: "National" | "International" | "State";
  applicationOpens: string;
  applicationCloses: string;
  examDate: string;
  resultDate: string;
  stream: string;
  registrationStatus: "Open" | "Closing soon" | "Closed" | "Upcoming";
  difficulty: "Moderate" | "High" | "Very High";
  about?: string;
  modeOfExam?: string;
  durationMinutes?: number;
  totalMarks?: number;
  questionCount?: number;
  registrationFee?: string;
  attemptsPerYear?: number;
  syllabus?: { subject: string; topics: string[] }[];
  pattern?: { section: string; questions: number; marks: number; duration: string }[];
  eligibility?: string[];
  importantDates?: { label: string; date: string }[];
  participatingColleges?: string[];
  prepTips?: string[];
  heroAccent?: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
  author: string;
};

export type Review = {
  id: string;
  collegeSlug: string;
  author: string;
  course: string;
  year: number;
  rating: number;
  title: string;
  body: string;
  verified: boolean;
};

export type CourseReview = {
  id: string;
  courseSlug: string;
  author: string;
  authorEmail?: string;
  collegeSlug?: string;
  graduationYear: number;
  rating: number;
  ratings: {
    teaching: number;
    curriculum: number;
    careerOutcomes: number;
    valueForMoney: number;
  };
  title: string;
  body: string;
  pros?: string;
  cons?: string;
  recommend: boolean;
  helpfulCount: number;
  reportedCount: number;
  verified: boolean;
  language: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected" | "flagged";
  moderationNotes?: string;
  moderatedBy?: string;
  moderatedAt?: string;
};

export const streams: Stream[] = [
  { slug: "engineering", name: "Engineering", icon: "Cpu", blurb: "BTech, MTech, AI, CS, Mech, Civil", collegeCount: 4_280 },
  { slug: "management", name: "Management", icon: "BriefcaseBusiness", blurb: "MBA, BBA, PGDM, Executive", collegeCount: 2_140 },
  { slug: "medical", name: "Medical", icon: "Stethoscope", blurb: "MBBS, BDS, Pharma, Nursing", collegeCount: 1_605 },
  { slug: "design", name: "Design", icon: "Palette", blurb: "Product, UX, Fashion, Graphic", collegeCount: 612 },
  { slug: "law", name: "Law", icon: "Scale", blurb: "BA LLB, LLM, Corporate, Civil", collegeCount: 880 },
  { slug: "science", name: "Sciences", icon: "FlaskConical", blurb: "BSc, MSc, Research, Data", collegeCount: 1_910 },
  { slug: "arts", name: "Arts & Humanities", icon: "BookOpen", blurb: "BA, MA, Literature, Psychology", collegeCount: 2_350 },
  { slug: "media", name: "Media & Comm", icon: "Clapperboard", blurb: "Journalism, Film, Mass Comm", collegeCount: 540 },
];

export const colleges: College[] = [
  {
    slug: "northgate-institute-of-technology",
    name: "Northgate Institute of Technology",
    shortName: "NIT Northgate",
    city: "Boston",
    country: "United States",
    ownership: "Private",
    established: 1924,
    rating: 4.8,
    ratingCount: 2841,
    ranking: 7,
    rankingLabel: "Global Engineering",
    feesMin: 38000,
    feesMax: 54000,
    feesCurrency: "USD",
    avgPackage: 142_000,
    highestPackage: 410_000,
    examsAccepted: ["SAT", "GRE", "TOEFL"],
    streams: ["engineering", "science"],
    courseCount: 86,
    claimed: true,
    facilities: ["Research Labs", "Innovation Hub", "On-campus Housing", "Library 24/7", "Sports Complex", "Health Center"],
    about:
      "A century-old engineering powerhouse known for its rigorous undergraduate program and outsized influence on the deep-tech startup ecosystem. Northgate balances foundational science with applied research.",
    heroAccent: "from-brand to-academic",
    placementRate: 96,
    studentRatio: "1:8",
    internationalShare: 28,
    placementTrend: [
      { year: 2021, package: 118_000 },
      { year: 2022, package: 126_000 },
      { year: 2023, package: 134_000 },
      { year: 2024, package: 142_000 },
      { year: 2025, package: 151_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 38000 },
      { label: "Housing", amount: 9000 },
      { label: "Meals", amount: 4500 },
      { label: "Books & Supplies", amount: 1200 },
      { label: "Personal", amount: 1800 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 64 },
      { stars: 4, pct: 24 },
      { stars: 3, pct: 8 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 1 },
    ],
    topRecruiters: ["Stripe", "OpenAI", "Anthropic", "SpaceX", "Goldman Sachs", "McKinsey"],
    similar: ["pacific-global-university", "alban-college-of-design", "royal-westmere-business"],
  },
  {
    slug: "pacific-global-university",
    name: "Pacific Global University",
    shortName: "PGU",
    city: "Singapore",
    country: "Singapore",
    ownership: "Public",
    established: 1968,
    rating: 4.7,
    ratingCount: 1920,
    ranking: 14,
    rankingLabel: "Asia Pacific",
    feesMin: 24000,
    feesMax: 36000,
    feesCurrency: "USD",
    avgPackage: 98_000,
    highestPackage: 220_000,
    examsAccepted: ["SAT", "GRE", "IELTS"],
    streams: ["engineering", "management", "science"],
    courseCount: 124,
    claimed: true,
    facilities: ["Smart Classrooms", "Maker Lab", "International Hostel", "Sports", "Career Hub"],
    about:
      "Multi-disciplinary global university with strong industry ties across South-East Asia and one of the most international student bodies in the region.",
    heroAccent: "from-academic to-gold",
    placementRate: 92,
    studentRatio: "1:11",
    internationalShare: 35,
    placementTrend: [
      { year: 2021, package: 78_000 },
      { year: 2022, package: 84_000 },
      { year: 2023, package: 90_000 },
      { year: 2024, package: 98_000 },
      { year: 2025, package: 104_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 24000 },
      { label: "Housing", amount: 6500 },
      { label: "Meals", amount: 3000 },
      { label: "Insurance", amount: 800 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 58 },
      { stars: 4, pct: 27 },
      { stars: 3, pct: 10 },
      { stars: 2, pct: 4 },
      { stars: 1, pct: 1 },
    ],
    topRecruiters: ["Shopee", "Grab", "DBS", "Bytedance", "PwC", "Bain"],
    similar: ["northgate-institute-of-technology", "alban-college-of-design", "ironwood-state-university"],
  },
  {
    slug: "royal-westmere-business",
    name: "Royal Westmere Business School",
    shortName: "Westmere Business",
    city: "London",
    country: "United Kingdom",
    ownership: "Private",
    established: 1903,
    rating: 4.9,
    ratingCount: 1184,
    ranking: 3,
    rankingLabel: "European MBA",
    feesMin: 62000,
    feesMax: 78000,
    feesCurrency: "GBP",
    avgPackage: 165_000,
    highestPackage: 380_000,
    examsAccepted: ["GMAT", "GRE", "IELTS"],
    streams: ["management"],
    courseCount: 22,
    claimed: true,
    facilities: ["Bloomberg Lab", "Boutique Library", "Alumni Club", "Executive Suites"],
    about:
      "One of Europe's most selective business schools, known for finance, strategy and a famously tight cohort culture. Heritage building, modern pedagogy.",
    heroAccent: "from-brand to-gold",
    placementRate: 99,
    studentRatio: "1:6",
    internationalShare: 71,
    placementTrend: [
      { year: 2021, package: 138_000 },
      { year: 2022, package: 145_000 },
      { year: 2023, package: 152_000 },
      { year: 2024, package: 165_000 },
      { year: 2025, package: 178_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 62000 },
      { label: "Materials", amount: 2400 },
      { label: "Career Services", amount: 1200 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 78 },
      { stars: 4, pct: 17 },
      { stars: 3, pct: 4 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 0 },
    ],
    topRecruiters: ["McKinsey", "BCG", "Bain", "JP Morgan", "Goldman Sachs", "BlackRock"],
    similar: ["northgate-institute-of-technology", "pacific-global-university", "midhurst-school-of-law"],
  },
  {
    slug: "alban-college-of-design",
    name: "Alban College of Design",
    shortName: "Alban Design",
    city: "Milan",
    country: "Italy",
    ownership: "Private",
    established: 1947,
    rating: 4.6,
    ratingCount: 612,
    ranking: 9,
    rankingLabel: "World Design",
    feesMin: 18000,
    feesMax: 26000,
    feesCurrency: "USD",
    avgPackage: 64_000,
    highestPackage: 145_000,
    examsAccepted: ["Portfolio Review", "IELTS"],
    streams: ["design", "arts"],
    courseCount: 31,
    claimed: false,
    facilities: ["Print Studio", "3D Workshop", "Material Library", "Exhibition Hall"],
    about:
      "An atelier-style design school known for product, communication, and fashion design. Faculty includes practicing designers from Milan's leading studios.",
    heroAccent: "from-gold to-academic",
    placementRate: 88,
    studentRatio: "1:9",
    internationalShare: 48,
    placementTrend: [
      { year: 2021, package: 48_000 },
      { year: 2022, package: 54_000 },
      { year: 2023, package: 58_000 },
      { year: 2024, package: 64_000 },
      { year: 2025, package: 70_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 18000 },
      { label: "Studio Fees", amount: 2400 },
      { label: "Materials", amount: 1500 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 52 },
      { stars: 4, pct: 31 },
      { stars: 3, pct: 11 },
      { stars: 2, pct: 4 },
      { stars: 1, pct: 2 },
    ],
    topRecruiters: ["Prada", "Pininfarina", "IDEO", "Frog Design", "Apple"],
    similar: ["pacific-global-university", "northgate-institute-of-technology", "ironwood-state-university"],
  },
  {
    slug: "ironwood-state-university",
    name: "Ironwood State University",
    shortName: "Ironwood State",
    city: "Austin",
    country: "United States",
    ownership: "Public",
    established: 1881,
    rating: 4.4,
    ratingCount: 4210,
    ranking: 28,
    rankingLabel: "US Public",
    feesMin: 12000,
    feesMax: 22000,
    feesCurrency: "USD",
    avgPackage: 86_000,
    highestPackage: 280_000,
    examsAccepted: ["SAT", "ACT", "GRE"],
    streams: ["engineering", "science", "arts", "management"],
    courseCount: 210,
    claimed: true,
    facilities: ["Sports Stadium", "Research Park", "20+ Hostels", "Cinema", "Hospital"],
    about:
      "A sprawling public research university with a deep academic catalog, strong sports culture and one of the largest alumni networks in the southern US.",
    heroAccent: "from-academic to-brand",
    placementRate: 89,
    studentRatio: "1:14",
    internationalShare: 18,
    placementTrend: [
      { year: 2021, package: 68_000 },
      { year: 2022, package: 74_000 },
      { year: 2023, package: 80_000 },
      { year: 2024, package: 86_000 },
      { year: 2025, package: 92_000 },
    ],
    feeBreakdown: [
      { label: "Tuition (In-State)", amount: 12000 },
      { label: "Housing", amount: 7800 },
      { label: "Meals", amount: 4200 },
      { label: "Books", amount: 1100 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 48 },
      { stars: 4, pct: 32 },
      { stars: 3, pct: 13 },
      { stars: 2, pct: 5 },
      { stars: 1, pct: 2 },
    ],
    topRecruiters: ["Dell", "Indeed", "Tesla", "Deloitte", "Accenture"],
    similar: ["northgate-institute-of-technology", "pacific-global-university", "marlowe-medical-college"],
  },
  {
    slug: "midhurst-school-of-law",
    name: "Midhurst School of Law",
    shortName: "Midhurst Law",
    city: "Edinburgh",
    country: "United Kingdom",
    ownership: "Autonomous",
    established: 1856,
    rating: 4.7,
    ratingCount: 540,
    ranking: 5,
    rankingLabel: "European Law",
    feesMin: 22000,
    feesMax: 30000,
    feesCurrency: "GBP",
    avgPackage: 92_000,
    highestPackage: 210_000,
    examsAccepted: ["LSAT", "IELTS"],
    streams: ["law"],
    courseCount: 18,
    claimed: false,
    facilities: ["Moot Court", "Law Library", "Legal Aid Clinic"],
    about:
      "Historic UK law school with deep links to chambers in London and Edinburgh. Strong in constitutional, corporate, and international law.",
    heroAccent: "from-brand to-academic",
    placementRate: 94,
    studentRatio: "1:7",
    internationalShare: 32,
    placementTrend: [
      { year: 2021, package: 72_000 },
      { year: 2022, package: 78_000 },
      { year: 2023, package: 85_000 },
      { year: 2024, package: 92_000 },
      { year: 2025, package: 99_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 22000 },
      { label: "Library Access", amount: 600 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 60 },
      { stars: 4, pct: 28 },
      { stars: 3, pct: 8 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 1 },
    ],
    topRecruiters: ["Clifford Chance", "Linklaters", "Allen & Overy", "Slaughter and May"],
    similar: ["royal-westmere-business", "northgate-institute-of-technology", "ironwood-state-university"],
  },
  {
    slug: "marlowe-medical-college",
    name: "Marlowe Medical College",
    shortName: "Marlowe Medical",
    city: "Bangalore",
    country: "India",
    ownership: "Deemed",
    established: 1972,
    rating: 4.5,
    ratingCount: 1420,
    ranking: 11,
    rankingLabel: "Indian Medical",
    feesMin: 1_400_000,
    feesMax: 2_200_000,
    feesCurrency: "INR",
    avgPackage: 1_800_000,
    highestPackage: 4_800_000,
    examsAccepted: ["NEET-UG", "NEET-PG"],
    streams: ["medical", "science"],
    courseCount: 42,
    claimed: true,
    facilities: ["Teaching Hospital", "Cadaver Lab", "Simulation Center", "Research Wing"],
    about:
      "Leading deemed medical university known for clinical excellence, attached teaching hospital, and a strong residency placement track record.",
    heroAccent: "from-academic to-gold",
    placementRate: 97,
    studentRatio: "1:6",
    internationalShare: 12,
    placementTrend: [
      { year: 2021, package: 1_200_000 },
      { year: 2022, package: 1_400_000 },
      { year: 2023, package: 1_600_000 },
      { year: 2024, package: 1_800_000 },
      { year: 2025, package: 2_000_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 1_400_000 },
      { label: "Hostel", amount: 180_000 },
      { label: "Lab Fees", amount: 60_000 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 55 },
      { stars: 4, pct: 30 },
      { stars: 3, pct: 10 },
      { stars: 2, pct: 4 },
      { stars: 1, pct: 1 },
    ],
    topRecruiters: ["Apollo Hospitals", "Fortis", "Manipal", "AIIMS Residency"],
    similar: ["ironwood-state-university", "pacific-global-university", "northgate-institute-of-technology"],
  },
  {
    slug: "harborline-arts-conservatory",
    name: "Harborline Arts Conservatory",
    shortName: "Harborline Arts",
    city: "Vancouver",
    country: "Canada",
    ownership: "Private",
    established: 1995,
    rating: 4.3,
    ratingCount: 410,
    ranking: 18,
    rankingLabel: "North American Arts",
    feesMin: 20000,
    feesMax: 28000,
    feesCurrency: "USD",
    avgPackage: 58_000,
    highestPackage: 120_000,
    examsAccepted: ["Portfolio Review", "IELTS"],
    streams: ["arts", "media", "design"],
    courseCount: 24,
    claimed: false,
    facilities: ["Concert Hall", "Recording Studio", "Black Box Theatre"],
    about:
      "A boutique conservatory blending performing arts, media, and design. Small studios, working professional faculty, deep ties to Vancouver's film industry.",
    heroAccent: "from-gold to-brand",
    placementRate: 82,
    studentRatio: "1:8",
    internationalShare: 41,
    placementTrend: [
      { year: 2021, package: 42_000 },
      { year: 2022, package: 48_000 },
      { year: 2023, package: 52_000 },
      { year: 2024, package: 58_000 },
      { year: 2025, package: 64_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 20000 },
      { label: "Studio Time", amount: 1800 },
      { label: "Materials", amount: 900 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 44 },
      { stars: 4, pct: 36 },
      { stars: 3, pct: 14 },
      { stars: 2, pct: 4 },
      { stars: 1, pct: 2 },
    ],
    topRecruiters: ["Lionsgate", "EA", "Hootsuite", "CBC"],
    similar: ["alban-college-of-design", "pacific-global-university", "ironwood-state-university"],
  },
  {
    slug: "stellar-institute-of-sciences",
    name: "Stellar Institute of Sciences",
    shortName: "SIS",
    city: "Zurich",
    country: "Switzerland",
    ownership: "Public",
    established: 1855,
    rating: 4.9,
    ratingCount: 980,
    ranking: 2,
    rankingLabel: "Global Sciences",
    feesMin: 1500,
    feesMax: 2200,
    feesCurrency: "USD",
    avgPackage: 118_000,
    highestPackage: 260_000,
    examsAccepted: ["GRE", "TOEFL"],
    streams: ["science", "engineering"],
    courseCount: 96,
    claimed: true,
    facilities: ["Particle Lab", "Quantum Center", "Mountain Observatory", "International Hostels"],
    about:
      "World-renowned research institute with Nobel-laureate faculty and exceptionally low tuition for international students. Heavy emphasis on doctoral research.",
    heroAccent: "from-academic to-brand",
    placementRate: 95,
    studentRatio: "1:7",
    internationalShare: 53,
    placementTrend: [
      { year: 2021, package: 92_000 },
      { year: 2022, package: 100_000 },
      { year: 2023, package: 108_000 },
      { year: 2024, package: 118_000 },
      { year: 2025, package: 128_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 1500 },
      { label: "Student Services", amount: 200 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 72 },
      { stars: 4, pct: 22 },
      { stars: 3, pct: 4 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
    topRecruiters: ["Google", "DeepMind", "Roche", "Novartis", "ABB"],
    similar: ["northgate-institute-of-technology", "pacific-global-university", "royal-westmere-business"],
  },
  {
    slug: "claremont-policy-school",
    name: "Claremont Policy School",
    shortName: "Claremont Policy",
    city: "Washington DC",
    country: "United States",
    ownership: "Private",
    established: 1968,
    rating: 4.5,
    ratingCount: 320,
    ranking: 6,
    rankingLabel: "Public Policy",
    feesMin: 42000,
    feesMax: 52000,
    feesCurrency: "USD",
    avgPackage: 96_000,
    highestPackage: 180_000,
    examsAccepted: ["GRE", "TOEFL"],
    streams: ["arts", "management"],
    courseCount: 16,
    claimed: false,
    facilities: ["Policy Lab", "Capitol Internship Bridge", "Library"],
    about:
      "A focused policy school with a faculty of practitioners and deep ties to federal agencies, think tanks, and global NGOs.",
    heroAccent: "from-brand to-academic",
    placementRate: 91,
    studentRatio: "1:9",
    internationalShare: 24,
    placementTrend: [
      { year: 2021, package: 78_000 },
      { year: 2022, package: 84_000 },
      { year: 2023, package: 90_000 },
      { year: 2024, package: 96_000 },
      { year: 2025, package: 102_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 42000 },
      { label: "Research Travel", amount: 2400 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 58 },
      { stars: 4, pct: 28 },
      { stars: 3, pct: 9 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 2 },
    ],
    topRecruiters: ["World Bank", "UNDP", "Brookings", "RAND", "Boston Consulting"],
    similar: ["royal-westmere-business", "midhurst-school-of-law", "ironwood-state-university"],
  },
  {
    slug: "varun-tech-university",
    name: "Varun Tech University",
    shortName: "VTU",
    city: "Hyderabad",
    country: "India",
    ownership: "Private",
    established: 2001,
    rating: 4.2,
    ratingCount: 2210,
    ranking: 22,
    rankingLabel: "India Engineering",
    feesMin: 320_000,
    feesMax: 480_000,
    feesCurrency: "INR",
    avgPackage: 1_200_000,
    highestPackage: 6_500_000,
    examsAccepted: ["JEE Main", "CUET", "VITEEE"],
    streams: ["engineering", "management"],
    courseCount: 64,
    claimed: true,
    facilities: ["AI Lab", "Maker Space", "Innovation Centre", "Sports Arena", "Hostels"],
    about:
      "Fast-growing private engineering university with a strong placement pipeline into product companies, a modern campus, and entrepreneurship support.",
    heroAccent: "from-gold to-academic",
    placementRate: 90,
    studentRatio: "1:15",
    internationalShare: 6,
    placementTrend: [
      { year: 2021, package: 700_000 },
      { year: 2022, package: 850_000 },
      { year: 2023, package: 1_000_000 },
      { year: 2024, package: 1_200_000 },
      { year: 2025, package: 1_400_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 320_000 },
      { label: "Hostel", amount: 110_000 },
      { label: "Mess", amount: 55_000 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 38 },
      { stars: 4, pct: 38 },
      { stars: 3, pct: 16 },
      { stars: 2, pct: 6 },
      { stars: 1, pct: 2 },
    ],
    topRecruiters: ["Amazon", "Microsoft", "Razorpay", "Zoho", "TCS", "Infosys"],
    similar: ["marlowe-medical-college", "ironwood-state-university", "pacific-global-university"],
  },
  {
    slug: "lakeside-school-of-media",
    name: "Lakeside School of Media",
    shortName: "Lakeside Media",
    city: "Sydney",
    country: "Australia",
    ownership: "Private",
    established: 1989,
    rating: 4.4,
    ratingCount: 480,
    ranking: 12,
    rankingLabel: "Asia-Pac Media",
    feesMin: 22000,
    feesMax: 30000,
    feesCurrency: "USD",
    avgPackage: 72_000,
    highestPackage: 150_000,
    examsAccepted: ["Portfolio Review", "IELTS"],
    streams: ["media", "arts"],
    courseCount: 28,
    claimed: false,
    facilities: ["Newsroom", "Broadcast Studio", "VR Lab"],
    about:
      "Hands-on school of journalism, film, and digital media with an internship-first curriculum and a tight industry network in Sydney and Melbourne.",
    heroAccent: "from-academic to-gold",
    placementRate: 85,
    studentRatio: "1:10",
    internationalShare: 38,
    placementTrend: [
      { year: 2021, package: 52_000 },
      { year: 2022, package: 58_000 },
      { year: 2023, package: 64_000 },
      { year: 2024, package: 72_000 },
      { year: 2025, package: 78_000 },
    ],
    feeBreakdown: [
      { label: "Tuition", amount: 22000 },
      { label: "Equipment", amount: 1600 },
    ],
    ratingDistribution: [
      { stars: 5, pct: 46 },
      { stars: 4, pct: 34 },
      { stars: 3, pct: 13 },
      { stars: 2, pct: 5 },
      { stars: 1, pct: 2 },
    ],
    topRecruiters: ["ABC News", "Canva", "Atlassian", "Netflix ANZ"],
    similar: ["harborline-arts-conservatory", "alban-college-of-design", "pacific-global-university"],
  },
];

export const courses: Course[] = [
  {
    slug: "btech-computer-science",
    name: "Bachelor of Technology in Computer Science",
    shortName: "BTech CSE",
    level: "UG", durationMonths: 48, stream: "engineering", mode: "Full-time",
    feesRange: "$12k – $54k / yr", feesMin: 12000, feesMax: 54000, feesCurrency: "USD",
    description: "Foundational CS, systems, AI, and software engineering with strong industry exposure.",
    longDescription: "A four-year undergraduate program covering algorithms, operating systems, distributed computing, AI/ML, and applied software engineering. Heavy lab work, summer internships, and a capstone project shipped with an industry partner.",
    collegesOffering: 1240, relatedExams: ["JEE Main", "SAT", "CUET"],
    heroAccent: "from-brand to-academic",
    rating: 4.7, ratingCount: 18420, studentsEnrolled: "240k+",
    eligibility: ["10+2 with PCM, min 75%", "Valid entrance score (JEE/SAT)", "English proficiency for intl. students"],
    careerPaths: [
      { role: "Software Engineer", salary: "$95k – $180k" },
      { role: "ML / AI Engineer", salary: "$120k – $260k" },
      { role: "Product Engineer", salary: "$110k – $210k" },
      { role: "Systems / Infra Engineer", salary: "$130k – $240k" },
      { role: "Founder / Early-stage", salary: "Equity-based" },
    ],
    curriculum: [
      { term: "Year 1", topics: ["Discrete Math", "Programming in C/Python", "Digital Logic", "Linear Algebra", "Intro to CS"] },
      { term: "Year 2", topics: ["Data Structures", "Algorithms", "Computer Organization", "Operating Systems", "Databases"] },
      { term: "Year 3", topics: ["Networks", "Compilers", "Machine Learning", "Software Engineering", "Electives"] },
      { term: "Year 4", topics: ["Distributed Systems", "Advanced AI", "Capstone Project", "Industry Internship", "Electives"] },
    ],
    avgSalary: "$118k", highestSalary: "$410k",
    topRecruiters: ["Stripe", "Google", "OpenAI", "Anthropic", "Meta", "Microsoft", "Goldman Sachs"],
    topColleges: ["northgate-institute-of-technology", "pacific-global-university", "ironwood-state-university", "varun-tech-university"],
    skills: ["Algorithms", "System Design", "Python", "ML", "Cloud", "Distributed Systems"],
    whyChoose: [
      "Highest median package across all UG streams",
      "Globally portable skill set",
      "Pathway to PG specializations (AI, Security, Robotics)",
    ],
  },
  {
    slug: "mba-general",
    name: "Master of Business Administration",
    shortName: "MBA",
    level: "PG", durationMonths: 24, stream: "management", mode: "Full-time",
    feesRange: "$22k – $78k / yr", feesMin: 22000, feesMax: 78000, feesCurrency: "USD",
    description: "General management with electives in finance, strategy, marketing and product.",
    longDescription: "A two-year graduate program blending core management foundations with deep electives, a summer internship, and a global immersion. Built around case-based learning, live consulting projects, and a famously engaged alumni network.",
    collegesOffering: 980, relatedExams: ["GMAT", "GRE", "CAT"],
    heroAccent: "from-academic to-gold",
    rating: 4.6, ratingCount: 9620, studentsEnrolled: "120k+",
    eligibility: ["Bachelor's degree (any discipline)", "2+ years work experience (preferred)", "GMAT 650+ / GRE 320+"],
    careerPaths: [
      { role: "Management Consultant", salary: "$165k – $230k" },
      { role: "Product Manager", salary: "$140k – $240k" },
      { role: "Investment Banking Associate", salary: "$175k – $300k" },
      { role: "Strategy Lead", salary: "$130k – $220k" },
      { role: "Founder", salary: "Equity-based" },
    ],
    curriculum: [
      { term: "Term 1", topics: ["Microeconomics", "Financial Accounting", "Marketing", "Statistics", "Org Behavior"] },
      { term: "Term 2", topics: ["Corporate Finance", "Operations", "Strategy", "Data Analytics", "Leadership"] },
      { term: "Summer", topics: ["Internship", "Industry Project"] },
      { term: "Term 3 & 4", topics: ["Electives", "Global Immersion", "Capstone Consulting", "Career Bootcamp"] },
    ],
    avgSalary: "$165k", highestSalary: "$380k",
    topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan", "Amazon", "Google"],
    topColleges: ["royal-westmere-business", "pacific-global-university", "ironwood-state-university"],
    skills: ["Strategy", "Finance", "Leadership", "Operations", "Negotiation"],
    whyChoose: [
      "Career pivot enabler — function, industry, or geography",
      "Most powerful alumni network of any degree",
      "Compressed two years vs. a decade of on-the-job learning",
    ],
  },
  {
    slug: "mbbs",
    name: "Bachelor of Medicine, Bachelor of Surgery",
    shortName: "MBBS",
    level: "UG", durationMonths: 66, stream: "medical", mode: "Full-time",
    feesRange: "₹14L – ₹22L / yr", feesMin: 1_400_000, feesMax: 2_200_000, feesCurrency: "INR",
    description: "Pre-clinical, clinical, and rotational training across all major specialties.",
    longDescription: "A 5.5-year integrated medical degree including a 12-month rotating internship. Curriculum spans anatomy and physiology through clinical rotations across surgery, internal medicine, pediatrics, OB/GYN, and community health.",
    collegesOffering: 540, relatedExams: ["NEET-UG"],
    heroAccent: "from-academic to-brand",
    rating: 4.8, ratingCount: 6240, studentsEnrolled: "90k+",
    eligibility: ["10+2 with PCB, min 50%", "Qualifying NEET-UG score", "Minimum age: 17"],
    careerPaths: [
      { role: "Junior Resident", salary: "₹6L – ₹12L" },
      { role: "Specialist (post-PG)", salary: "₹18L – ₹45L" },
      { role: "Consultant Surgeon", salary: "₹40L – ₹1.2Cr" },
      { role: "Medical Researcher", salary: "₹12L – ₹30L" },
    ],
    curriculum: [
      { term: "Year 1", topics: ["Anatomy", "Physiology", "Biochemistry"] },
      { term: "Year 2", topics: ["Pathology", "Pharmacology", "Microbiology", "Forensic Med"] },
      { term: "Year 3", topics: ["Community Medicine", "ENT", "Ophthalmology"] },
      { term: "Year 4", topics: ["Medicine", "Surgery", "OB/GYN", "Pediatrics"] },
      { term: "Internship", topics: ["12-month rotation across departments"] },
    ],
    avgSalary: "₹18L", highestSalary: "₹48L",
    topRecruiters: ["Apollo Hospitals", "Fortis", "Manipal", "AIIMS", "Medanta"],
    topColleges: ["marlowe-medical-college", "ironwood-state-university"],
    skills: ["Clinical Diagnosis", "Patient Care", "Surgical Basics", "Public Health"],
    whyChoose: [
      "Direct license to practice medicine",
      "Foundation for any clinical specialty",
      "Deeply meaningful, deeply demanding",
    ],
  },
  {
    slug: "ba-llb-hons",
    name: "BA LLB (Hons.)",
    shortName: "BA LLB",
    level: "UG", durationMonths: 60, stream: "law", mode: "Full-time",
    feesRange: "£22k – £30k / yr", feesMin: 22000, feesMax: 30000, feesCurrency: "GBP",
    description: "Integrated five-year law program covering substantive and procedural law.",
    longDescription: "A five-year integrated honors program combining liberal arts foundations with substantive and procedural law. Moot court, internships at chambers, and clinic-based legal aid work form the core experiential spine.",
    collegesOffering: 410, relatedExams: ["LSAT", "CLAT"],
    heroAccent: "from-brand to-gold",
    rating: 4.5, ratingCount: 3120, studentsEnrolled: "45k+",
    eligibility: ["10+2 with min 55%", "Qualifying LSAT/CLAT score", "English proficiency"],
    careerPaths: [
      { role: "Corporate Lawyer", salary: "£60k – £140k" },
      { role: "Litigation Counsel", salary: "£45k – £180k" },
      { role: "In-house Legal", salary: "£70k – £130k" },
      { role: "Judicial Services", salary: "Govt. pay scale" },
    ],
    curriculum: [
      { term: "Year 1", topics: ["Political Science", "Economics", "Legal Methods", "English"] },
      { term: "Year 2", topics: ["Contract Law", "Torts", "Constitutional Law", "Criminal Law"] },
      { term: "Year 3", topics: ["Property Law", "Family Law", "Evidence", "Procedure"] },
      { term: "Year 4", topics: ["Corporate Law", "IP", "Tax", "Electives"] },
      { term: "Year 5", topics: ["International Law", "Clinic", "Moots", "Dissertation"] },
    ],
    avgSalary: "£92k", highestSalary: "£210k",
    topRecruiters: ["Clifford Chance", "Linklaters", "Allen & Overy", "Slaughter and May"],
    topColleges: ["midhurst-school-of-law"],
    skills: ["Legal Research", "Drafting", "Advocacy", "Negotiation"],
    whyChoose: [
      "Direct bar eligibility on graduation",
      "Broad exit-options across corporate, litigation, policy",
      "Heritage curriculum with modern clinical training",
    ],
  },
  {
    slug: "msc-data-science",
    name: "MSc in Data Science",
    shortName: "MSc Data Science",
    level: "PG", durationMonths: 18, stream: "science", mode: "Full-time",
    feesRange: "$24k – $52k / yr", feesMin: 24000, feesMax: 52000, feesCurrency: "USD",
    description: "Applied statistics, machine learning, and production analytics.",
    longDescription: "A 1.5-year STEM-designated master's combining applied statistics, modern ML, and production data engineering. Capstone is built with an industry sponsor and reviewed by a hiring panel.",
    collegesOffering: 720, relatedExams: ["GRE", "GATE"],
    heroAccent: "from-academic to-gold",
    rating: 4.6, ratingCount: 7240, studentsEnrolled: "60k+",
    eligibility: ["Bachelor's in CS/Math/Stats/Engg", "Strong programming background", "GRE quant 165+ (preferred)"],
    careerPaths: [
      { role: "Data Scientist", salary: "$130k – $220k" },
      { role: "ML Engineer", salary: "$140k – $260k" },
      { role: "Applied Researcher", salary: "$150k – $300k" },
      { role: "Analytics Lead", salary: "$120k – $200k" },
    ],
    curriculum: [
      { term: "Term 1", topics: ["Probability", "Stat Inference", "Python for DS", "SQL"] },
      { term: "Term 2", topics: ["ML", "Deep Learning", "Data Engineering", "Experimentation"] },
      { term: "Term 3", topics: ["Electives (NLP, CV, RL)", "Capstone", "Industry Project"] },
    ],
    avgSalary: "$148k", highestSalary: "$310k",
    topRecruiters: ["Anthropic", "OpenAI", "Meta", "Stripe", "Bytedance", "Two Sigma"],
    topColleges: ["northgate-institute-of-technology", "pacific-global-university", "ironwood-state-university"],
    skills: ["Python", "PyTorch", "SQL", "Stats", "Experimentation", "MLOps"],
    whyChoose: [
      "STEM-designated — strong work visa pathways",
      "Highest tech ROI for non-CS undergrads",
      "Specialization options across NLP/CV/RL",
    ],
  },
  {
    slug: "bdes-product-design",
    name: "Bachelor of Design in Product Design",
    shortName: "BDes Product",
    level: "UG", durationMonths: 48, stream: "design", mode: "Full-time",
    feesRange: "$18k – $28k / yr", feesMin: 18000, feesMax: 28000, feesCurrency: "USD",
    description: "Form, function, materials, and human-centered design across industries.",
    longDescription: "A four-year studio-based program covering industrial design fundamentals, materials and manufacturing, ergonomics, and human-centered research. Heavy emphasis on portfolio output and live client projects.",
    collegesOffering: 310, relatedExams: ["Portfolio Review", "UCEED"],
    heroAccent: "from-gold to-academic",
    rating: 4.5, ratingCount: 2810, studentsEnrolled: "32k+",
    eligibility: ["10+2 (any stream)", "Portfolio review", "Design aptitude test"],
    careerPaths: [
      { role: "Product Designer", salary: "$70k – $140k" },
      { role: "Industrial Designer", salary: "$65k – $130k" },
      { role: "UX Designer", salary: "$80k – $160k" },
      { role: "Design Researcher", salary: "$75k – $135k" },
    ],
    curriculum: [
      { term: "Year 1", topics: ["Design Foundations", "Sketching", "Materials", "Design History"] },
      { term: "Year 2", topics: ["Human Factors", "Prototyping", "CAD", "Studio I"] },
      { term: "Year 3", topics: ["Manufacturing", "Design Research", "Studio II", "Internship"] },
      { term: "Year 4", topics: ["Capstone", "Portfolio", "Business of Design"] },
    ],
    avgSalary: "$92k", highestSalary: "$180k",
    topRecruiters: ["IDEO", "Frog", "Apple", "Pininfarina", "Dyson"],
    topColleges: ["alban-college-of-design", "harborline-arts-conservatory"],
    skills: ["Sketching", "CAD", "Prototyping", "User Research", "Materials"],
    whyChoose: [
      "Cross-industry mobility — consumer, mobility, medical",
      "Portfolio is the credential, not the GPA",
      "Studio culture beats lecture culture",
    ],
  },
  {
    slug: "btech-ai-ml",
    name: "BTech in Artificial Intelligence & ML",
    shortName: "BTech AI/ML",
    level: "UG", durationMonths: 48, stream: "engineering", mode: "Full-time",
    feesRange: "$14k – $58k / yr", feesMin: 14000, feesMax: 58000, feesCurrency: "USD",
    description: "Specialized AI/ML undergraduate degree with deep math and applied ML.",
    longDescription: "A four-year program with rigorous math foundations, modern deep learning, and applied AI across vision, language, and robotics. Includes a research thesis or industry capstone.",
    collegesOffering: 410, relatedExams: ["JEE Main", "SAT"],
    heroAccent: "from-brand to-gold",
    rating: 4.7, ratingCount: 5410, studentsEnrolled: "48k+",
    eligibility: ["10+2 PCM, 80%+", "JEE/SAT score", "Programming background helpful"],
    careerPaths: [
      { role: "AI/ML Engineer", salary: "$130k – $280k" },
      { role: "Research Engineer", salary: "$160k – $350k" },
      { role: "Applied Scientist", salary: "$170k – $400k" },
    ],
    curriculum: [
      { term: "Year 1", topics: ["Linear Algebra", "Calculus", "Programming", "Probability"] },
      { term: "Year 2", topics: ["Algorithms", "ML Foundations", "Optimization", "DBMS"] },
      { term: "Year 3", topics: ["Deep Learning", "NLP", "Vision", "Reinforcement Learning"] },
      { term: "Year 4", topics: ["Thesis/Capstone", "MLOps", "AI Ethics", "Electives"] },
    ],
    avgSalary: "$162k", highestSalary: "$450k",
    topRecruiters: ["OpenAI", "Anthropic", "DeepMind", "Meta AI", "Nvidia"],
    topColleges: ["northgate-institute-of-technology", "varun-tech-university", "pacific-global-university"],
    skills: ["Deep Learning", "PyTorch", "Math", "Research", "MLOps"],
    whyChoose: [
      "Hottest segment of the engineering job market",
      "Direct path to research labs",
      "Strong founder pipeline",
    ],
  },
  {
    slug: "ba-economics-hons",
    name: "BA (Hons.) in Economics",
    shortName: "BA Economics",
    level: "UG", durationMonths: 36, stream: "arts", mode: "Full-time",
    feesRange: "$10k – $32k / yr", feesMin: 10000, feesMax: 32000, feesCurrency: "USD",
    description: "Rigorous training in micro, macro, econometrics and policy.",
    longDescription: "A three-year honors program with deep training in micro, macro, and econometrics, plus electives in development, behavioral, and financial economics. A foundational degree for finance, consulting, policy, and PhD pathways.",
    collegesOffering: 870, relatedExams: ["SAT", "CUET"],
    heroAccent: "from-academic to-brand",
    rating: 4.4, ratingCount: 4120, studentsEnrolled: "70k+",
    eligibility: ["10+2 with Math", "SAT/CUET score", "English proficiency"],
    careerPaths: [
      { role: "Investment Analyst", salary: "$90k – $160k" },
      { role: "Consultant", salary: "$110k – $180k" },
      { role: "Policy Researcher", salary: "$70k – $120k" },
      { role: "Data Analyst", salary: "$85k – $140k" },
    ],
    curriculum: [
      { term: "Year 1", topics: ["Micro I", "Macro I", "Math for Econ", "Stats"] },
      { term: "Year 2", topics: ["Econometrics", "Intl. Trade", "Public Finance", "Electives"] },
      { term: "Year 3", topics: ["Advanced Topics", "Thesis", "Electives", "Internship"] },
    ],
    avgSalary: "$98k", highestSalary: "$210k",
    topRecruiters: ["Goldman Sachs", "World Bank", "McKinsey", "RBI", "Brookings"],
    topColleges: ["ironwood-state-university", "pacific-global-university"],
    skills: ["Econometrics", "Stata/R", "Policy Analysis", "Writing"],
    whyChoose: [
      "Broadest exit-options of any liberal arts degree",
      "Pre-MBA / pre-PhD launchpad",
      "Strong quantitative spine",
    ],
  },
  {
    slug: "mdes-ux",
    name: "MDes in User Experience Design",
    shortName: "MDes UX",
    level: "PG", durationMonths: 24, stream: "design", mode: "Full-time",
    feesRange: "$22k – $34k / yr", feesMin: 22000, feesMax: 34000, feesCurrency: "USD",
    description: "Research-led UX with interaction, systems, and service design.",
    longDescription: "A two-year graduate program combining design research, interaction craft, and systems thinking. Studio-based, with an industry-sponsored capstone and a strong portfolio at the end.",
    collegesOffering: 240, relatedExams: ["Portfolio Review"],
    heroAccent: "from-gold to-brand",
    rating: 4.6, ratingCount: 1840, studentsEnrolled: "18k+",
    eligibility: ["Bachelor's (any)", "Portfolio review", "Statement of intent"],
    careerPaths: [
      { role: "Senior UX Designer", salary: "$130k – $220k" },
      { role: "Product Designer", salary: "$140k – $240k" },
      { role: "Design Lead", salary: "$170k – $300k" },
    ],
    curriculum: [
      { term: "Term 1", topics: ["Design Research", "Interaction Foundations", "Visual Systems"] },
      { term: "Term 2", topics: ["Service Design", "Prototyping", "Design Strategy"] },
      { term: "Term 3", topics: ["Studio", "Industry Capstone", "Portfolio"] },
    ],
    avgSalary: "$152k", highestSalary: "$295k",
    topRecruiters: ["Apple", "Google", "Airbnb", "Figma", "Stripe"],
    topColleges: ["alban-college-of-design", "harborline-arts-conservatory"],
    skills: ["Research", "Prototyping", "Systems", "Figma", "Writing"],
    whyChoose: [
      "Fastest route to senior product design roles",
      "Portfolio is the credential",
      "Cross-disciplinary by design",
    ],
  },
  {
    slug: "llm-corporate",
    name: "LLM in Corporate & Commercial Law",
    shortName: "LLM Corporate",
    level: "PG", durationMonths: 12, stream: "law", mode: "Full-time",
    feesRange: "£26k – £38k / yr", feesMin: 26000, feesMax: 38000, feesCurrency: "GBP",
    description: "One-year specialization in M&A, securities, and corporate governance.",
    longDescription: "A focused one-year master's covering M&A, securities regulation, corporate governance, and cross-border deal structuring. Built for practitioners pivoting into the corporate practice or moving across jurisdictions.",
    collegesOffering: 180, relatedExams: ["LSAT", "IELTS"],
    heroAccent: "from-brand to-academic",
    rating: 4.5, ratingCount: 920, studentsEnrolled: "8k+",
    eligibility: ["LLB or equivalent", "IELTS 7.0+", "Statement of purpose"],
    careerPaths: [
      { role: "M&A Associate", salary: "£90k – £160k" },
      { role: "Corporate Counsel", salary: "£85k – £150k" },
      { role: "Compliance Lead", salary: "£75k – £130k" },
    ],
    curriculum: [
      { term: "Term 1", topics: ["Corporate Law", "Securities", "Contract Theory"] },
      { term: "Term 2", topics: ["M&A", "Governance", "International Commercial Law"] },
      { term: "Term 3", topics: ["Dissertation", "Electives"] },
    ],
    avgSalary: "£118k", highestSalary: "£220k",
    topRecruiters: ["Clifford Chance", "Latham", "Allen & Overy", "Linklaters"],
    topColleges: ["midhurst-school-of-law", "royal-westmere-business"],
    skills: ["Deal Structuring", "Drafting", "Regulatory Analysis", "Due Diligence"],
    whyChoose: [
      "Compressed pivot into corporate practice",
      "International credibility",
      "Strong recruiter pipeline",
    ],
  },
  {
    slug: "executive-mba",
    name: "Executive MBA",
    shortName: "EMBA",
    level: "PG", durationMonths: 18, stream: "management", mode: "Hybrid",
    feesRange: "$65k – $120k / total", feesMin: 65000, feesMax: 120000, feesCurrency: "USD",
    description: "Part-time MBA for senior professionals balancing work and study.",
    longDescription: "A hybrid 18-month program for working senior managers. Weekend modules, global immersions, and a cohort of operators averaging 12+ years of experience. Designed to upgrade strategic, financial, and leadership range without leaving the workforce.",
    collegesOffering: 320, relatedExams: ["GMAT", "EA"],
    heroAccent: "from-academic to-gold",
    rating: 4.7, ratingCount: 1620, studentsEnrolled: "14k+",
    eligibility: ["8+ years of work experience", "Senior management role", "GMAT 600+ or Executive Assessment"],
    careerPaths: [
      { role: "VP / Director", salary: "$220k – $400k" },
      { role: "GM / Country Head", salary: "$250k – $500k" },
      { role: "Strategy Officer", salary: "$240k – $450k" },
    ],
    curriculum: [
      { term: "Module 1", topics: ["Strategy", "Finance", "Leadership"] },
      { term: "Module 2", topics: ["Operations", "Marketing", "Negotiation"] },
      { term: "Module 3", topics: ["Global Immersion", "Capstone", "Electives"] },
    ],
    avgSalary: "$245k", highestSalary: "$520k",
    topRecruiters: ["Internal promotion", "Board roles", "PE firms"],
    topColleges: ["royal-westmere-business", "pacific-global-university"],
    skills: ["Strategy", "Capital Allocation", "Executive Leadership"],
    whyChoose: [
      "Keep your job, upgrade your range",
      "Peer cohort is the curriculum",
      "Promotion pipeline within current employer",
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getStream(slug: string): Stream | undefined {
  return streams.find((s) => s.slug === slug);
}

export const exams: Exam[] = [
  {
    slug: "sat", name: "SAT", fullName: "Scholastic Assessment Test", conductingBody: "College Board",
    level: "International", applicationOpens: "Jul 12, 2026", applicationCloses: "Aug 23, 2026",
    examDate: "Oct 04, 2026", resultDate: "Oct 25, 2026", stream: "All",
    registrationStatus: "Open", difficulty: "Moderate",
    about: "A standardized digital admissions test accepted by 1,800+ universities worldwide. Adaptive, two-section format covering Reading & Writing and Math.",
    modeOfExam: "Computer-based (Digital SAT)", durationMinutes: 134, totalMarks: 1600,
    questionCount: 98, registrationFee: "$68", attemptsPerYear: 7,
    heroAccent: "from-brand to-academic",
    syllabus: [
      { subject: "Reading & Writing", topics: ["Information & Ideas", "Craft & Structure", "Expression of Ideas", "Standard English Conventions"] },
      { subject: "Math", topics: ["Algebra", "Advanced Math", "Problem Solving & Data Analysis", "Geometry & Trigonometry"] },
    ],
    pattern: [
      { section: "Reading & Writing", questions: 54, marks: 800, duration: "64 min" },
      { section: "Math", questions: 44, marks: 800, duration: "70 min" },
    ],
    eligibility: ["No minimum age", "No academic prerequisites", "International students welcome"],
    importantDates: [
      { label: "Registration opens", date: "Jul 12, 2026" },
      { label: "Registration closes", date: "Aug 23, 2026" },
      { label: "Exam date", date: "Oct 04, 2026" },
      { label: "Result declaration", date: "Oct 25, 2026" },
    ],
    participatingColleges: ["northgate-institute-of-technology", "pacific-global-university", "ironwood-state-university"],
    prepTips: ["Take 4+ full-length adaptive mocks", "Master a desmos-friendly calculator workflow", "Read long-form journalism daily for RW section"],
  },
  {
    slug: "gre", name: "GRE", fullName: "Graduate Record Examination", conductingBody: "ETS",
    level: "International", applicationOpens: "Year-round", applicationCloses: "—",
    examDate: "Flexible", resultDate: "T+15 days", stream: "All",
    registrationStatus: "Open", difficulty: "High",
    about: "A graduate-level entrance test accepted by most master's and doctoral programs globally. Year-round computer-based testing.",
    modeOfExam: "Computer-based", durationMinutes: 118, totalMarks: 340,
    questionCount: 54, registrationFee: "$220", attemptsPerYear: 5,
    heroAccent: "from-academic to-gold",
    syllabus: [
      { subject: "Verbal Reasoning", topics: ["Reading Comprehension", "Text Completion", "Sentence Equivalence"] },
      { subject: "Quantitative Reasoning", topics: ["Arithmetic", "Algebra", "Geometry", "Data Analysis"] },
      { subject: "Analytical Writing", topics: ["Analyze an Issue task"] },
    ],
    pattern: [
      { section: "Analytical Writing", questions: 1, marks: 6, duration: "30 min" },
      { section: "Verbal Reasoning", questions: 27, marks: 170, duration: "41 min" },
      { section: "Quantitative Reasoning", questions: 27, marks: 170, duration: "47 min" },
    ],
    eligibility: ["Bachelor's degree or in final year", "No age restriction"],
    importantDates: [
      { label: "Window", date: "Year-round" },
      { label: "Score validity", date: "5 years" },
    ],
    participatingColleges: ["northgate-institute-of-technology", "stellar-institute-of-sciences", "claremont-policy-school"],
    prepTips: ["Build a 1,500-word vocab base", "Drill quant under timed conditions", "Use ETS PowerPrep for calibration"],
  },
  {
    slug: "gmat", name: "GMAT", fullName: "Graduate Management Admission Test", conductingBody: "GMAC",
    level: "International", applicationOpens: "Year-round", applicationCloses: "—",
    examDate: "Flexible", resultDate: "T+20 days", stream: "Management",
    registrationStatus: "Open", difficulty: "High",
    about: "The flagship business-school entrance test. The Focus Edition is shorter and section-adaptive.",
    modeOfExam: "Computer-adaptive", durationMinutes: 135, totalMarks: 805,
    questionCount: 64, registrationFee: "$275", attemptsPerYear: 5,
    heroAccent: "from-brand to-gold",
    syllabus: [
      { subject: "Quantitative Reasoning", topics: ["Algebra", "Arithmetic", "Word Problems"] },
      { subject: "Verbal Reasoning", topics: ["Reading Comprehension", "Critical Reasoning"] },
      { subject: "Data Insights", topics: ["Data Sufficiency", "Multi-source Reasoning", "Graphics Interpretation"] },
    ],
    pattern: [
      { section: "Quantitative", questions: 21, marks: 90, duration: "45 min" },
      { section: "Verbal", questions: 23, marks: 90, duration: "45 min" },
      { section: "Data Insights", questions: 20, marks: 90, duration: "45 min" },
    ],
    eligibility: ["18+ years", "Bachelor's degree recommended"],
    importantDates: [
      { label: "Booking window", date: "Year-round" },
      { label: "Score validity", date: "5 years" },
    ],
    participatingColleges: ["royal-westmere-business", "pacific-global-university", "claremont-policy-school"],
    prepTips: ["Master Data Sufficiency logic early", "Time per question matters more than question count", "Use Official Guide problem sets"],
  },
  {
    slug: "jee-main", name: "JEE Main", fullName: "Joint Entrance Examination — Main", conductingBody: "NTA",
    level: "National", applicationOpens: "Nov 01, 2026", applicationCloses: "Nov 30, 2026",
    examDate: "Jan 24, 2027", resultDate: "Feb 12, 2027", stream: "Engineering",
    registrationStatus: "Upcoming", difficulty: "Very High",
    about: "India's largest engineering entrance test. Gateway to NITs, IIITs, and JEE Advanced for IITs.",
    modeOfExam: "Computer-based", durationMinutes: 180, totalMarks: 300,
    questionCount: 75, registrationFee: "₹1,000", attemptsPerYear: 2,
    heroAccent: "from-academic to-brand",
    syllabus: [
      { subject: "Physics", topics: ["Mechanics", "Electrodynamics", "Optics", "Modern Physics"] },
      { subject: "Chemistry", topics: ["Physical", "Organic", "Inorganic"] },
      { subject: "Mathematics", topics: ["Calculus", "Algebra", "Coordinate Geometry", "Vectors"] },
    ],
    pattern: [
      { section: "Physics", questions: 25, marks: 100, duration: "60 min" },
      { section: "Chemistry", questions: 25, marks: 100, duration: "60 min" },
      { section: "Mathematics", questions: 25, marks: 100, duration: "60 min" },
    ],
    eligibility: ["10+2 with PCM", "75% in board exams (relaxation for reserved)", "No age limit (from 2024)"],
    importantDates: [
      { label: "Session 1 application", date: "Nov 01 – Nov 30, 2026" },
      { label: "Session 1 exam", date: "Jan 24 – Feb 01, 2027" },
      { label: "Session 2 exam", date: "Apr 03 – Apr 10, 2027" },
      { label: "Result", date: "Feb 12 / Apr 25, 2027" },
    ],
    participatingColleges: ["varun-tech-university"],
    prepTips: ["NCERT first, coaching material later", "Mock test every weekend for the last 4 months", "PYQs across 10 years are non-negotiable"],
  },
  {
    slug: "neet-ug", name: "NEET-UG", fullName: "National Eligibility cum Entrance Test", conductingBody: "NTA",
    level: "National", applicationOpens: "Feb 04, 2027", applicationCloses: "Mar 04, 2027",
    examDate: "May 02, 2027", resultDate: "Jun 14, 2027", stream: "Medical",
    registrationStatus: "Upcoming", difficulty: "Very High",
    about: "Single entrance test for all MBBS, BDS, AYUSH and veterinary admissions in India.",
    modeOfExam: "Pen & paper (OMR)", durationMinutes: 200, totalMarks: 720,
    questionCount: 180, registrationFee: "₹1,700", attemptsPerYear: 1,
    heroAccent: "from-brand to-academic",
    syllabus: [
      { subject: "Physics", topics: ["Mechanics", "Thermodynamics", "Optics", "Modern Physics"] },
      { subject: "Chemistry", topics: ["Physical", "Organic", "Inorganic"] },
      { subject: "Biology", topics: ["Botany", "Zoology", "Human Physiology", "Genetics & Evolution"] },
    ],
    pattern: [
      { section: "Physics", questions: 45, marks: 180, duration: "50 min" },
      { section: "Chemistry", questions: 45, marks: 180, duration: "50 min" },
      { section: "Biology", questions: 90, marks: 360, duration: "100 min" },
    ],
    eligibility: ["10+2 with PCB, min 50%", "Minimum age 17", "Indian / OCI / NRI candidates"],
    importantDates: [
      { label: "Application opens", date: "Feb 04, 2027" },
      { label: "Application closes", date: "Mar 04, 2027" },
      { label: "Exam date", date: "May 02, 2027" },
      { label: "Result", date: "Jun 14, 2027" },
    ],
    participatingColleges: ["marlowe-medical-college"],
    prepTips: ["NCERT Biology cover-to-cover", "Daily 90 MCQs across all 3 subjects", "Revise rather than learn new in last 30 days"],
  },
  {
    slug: "cuet", name: "CUET", fullName: "Common University Entrance Test", conductingBody: "NTA",
    level: "National", applicationOpens: "Feb 01, 2027", applicationCloses: "Mar 10, 2027",
    examDate: "May 15, 2027", resultDate: "Jun 30, 2027", stream: "All",
    registrationStatus: "Upcoming", difficulty: "Moderate",
    about: "Common admission test for central universities across UG programs in arts, science, and commerce.",
    modeOfExam: "Computer-based", durationMinutes: 195, totalMarks: 800,
    questionCount: 160, registrationFee: "₹1,000", attemptsPerYear: 1,
    heroAccent: "from-gold to-academic",
    eligibility: ["10+2 from a recognized board", "Subject-specific eligibility per program"],
    importantDates: [
      { label: "Application", date: "Feb 01 – Mar 10, 2027" },
      { label: "Exam window", date: "May 15 – Jun 03, 2027" },
      { label: "Result", date: "Jun 30, 2027" },
    ],
    participatingColleges: [],
    prepTips: ["Pick 3-4 strong subject papers", "Don't ignore the language section", "Past CUET sample sets are the best reference"],
  },
  {
    slug: "lsat", name: "LSAT", fullName: "Law School Admission Test", conductingBody: "LSAC",
    level: "International", applicationOpens: "Year-round", applicationCloses: "—",
    examDate: "Multiple windows", resultDate: "T+21 days", stream: "Law",
    registrationStatus: "Open", difficulty: "High",
    about: "The standardized admissions test for JD programs across the US, Canada, and a growing list of global law schools.",
    modeOfExam: "Computer-based / Online proctored", durationMinutes: 175, totalMarks: 180,
    questionCount: 76, registrationFee: "$238", attemptsPerYear: 5,
    heroAccent: "from-academic to-gold",
    eligibility: ["No formal eligibility", "Recommended for prospective JD applicants"],
    importantDates: [{ label: "Test windows", date: "Aug, Oct, Nov, Jan, Feb, Apr, Jun" }],
    participatingColleges: ["midhurst-school-of-law"],
    prepTips: ["Drill logic games daily", "Diagram reading-comprehension passages", "Use PrepTests 70+ for highest fidelity"],
  },
  {
    slug: "clat", name: "CLAT", fullName: "Common Law Admission Test", conductingBody: "Consortium of NLUs",
    level: "National", applicationOpens: "Aug 01, 2026", applicationCloses: "Oct 30, 2026",
    examDate: "Dec 06, 2026", resultDate: "Dec 22, 2026", stream: "Law",
    registrationStatus: "Closing soon", difficulty: "High",
    about: "The entrance test for India's National Law Universities at both UG and PG levels.",
    modeOfExam: "Pen & paper", durationMinutes: 120, totalMarks: 120,
    questionCount: 120, registrationFee: "₹4,000", attemptsPerYear: 1,
    heroAccent: "from-brand to-gold",
    eligibility: ["10+2 with min 45%", "No age limit"],
    importantDates: [
      { label: "Registration", date: "Aug 01 – Oct 30, 2026" },
      { label: "Exam", date: "Dec 06, 2026" },
      { label: "Result", date: "Dec 22, 2026" },
    ],
    participatingColleges: ["midhurst-school-of-law"],
    prepTips: ["Daily editorial reading (The Hindu)", "Master legal reasoning principles", "Sectional speed > overall speed"],
  },
];

export function getExam(slug: string): Exam | undefined {
  return exams.find((e) => e.slug === slug);
}

export const articles: Article[] = [
  { slug: "best-bca-colleges-2026", title: "The 25 best undergraduate computing programs of 2026", excerpt: "Where rigor, placements, and student culture genuinely overlap — based on five years of placement data.", category: "Rankings", readMinutes: 8, publishedAt: "2026-04-12", author: "Editorial Team" },
  { slug: "how-to-pick-mba", title: "How to pick the right MBA when every brochure looks the same", excerpt: "A practical decision framework built around ROI, network access, and elective depth.", category: "Guides", readMinutes: 11, publishedAt: "2026-03-29", author: "Anika Roy" },
  { slug: "scholarships-2026", title: "12 fully-funded scholarships worth applying to this fall", excerpt: "From Rhodes to lesser-known European endowments, here's where the real money lives.", category: "Scholarships", readMinutes: 7, publishedAt: "2026-04-02", author: "Marco Bellini" },
  { slug: "neet-prep-changes", title: "What NEET aspirants need to know about the 2027 syllabus changes", excerpt: "The MCC restructured weightages. Here's how to recalibrate your prep plan.", category: "Exams", readMinutes: 6, publishedAt: "2026-04-09", author: "Dr. K. Iyer" },
];

export const reviews: Review[] = [
  { id: "r1", collegeSlug: "northgate-institute-of-technology", author: "Priya S.", course: "BTech, CSE", year: 2025, rating: 5, title: "Worth every dollar of the tuition", body: "Faculty access is unreal, the research labs run round the clock, and recruiters actually fight over students. The dorms could be better.", verified: true },
  { id: "r2", collegeSlug: "northgate-institute-of-technology", author: "Daniel R.", course: "MS, ECE", year: 2024, rating: 4, title: "Rigorous but fair", body: "Heavy coursework but the support system is solid. Career office helped me land interviews at three FAANG companies.", verified: true },
  { id: "r3", collegeSlug: "pacific-global-university", author: "Mei L.", course: "MBA", year: 2025, rating: 5, title: "Global cohort, global outcomes", body: "Easily the most international cohort I've ever been part of. Strategy electives are exceptional.", verified: true },
  { id: "r4", collegeSlug: "royal-westmere-business", author: "James W.", course: "Executive MBA", year: 2024, rating: 5, title: "Tight cohort, lifelong network", body: "The cohort size is tiny on purpose. You leave with 60 people who genuinely show up for you for the rest of your career.", verified: true },
  { id: "r5", collegeSlug: "alban-college-of-design", author: "Sofia G.", course: "MDes, Product", year: 2025, rating: 4, title: "Atelier model done right", body: "Studios are intense and you learn directly from working Milanese designers. Expect to spend a lot of personal money on materials.", verified: true },
];

export const courseReviews: CourseReview[] = [
  {
    id: "cr1", courseSlug: "btech-computer-science", author: "Priya S.", collegeSlug: "northgate-institute-of-technology",
    graduationYear: 2025, rating: 5,
    ratings: { teaching: 5, curriculum: 5, careerOutcomes: 5, valueForMoney: 4 },
    title: "Best decision I've made", body: "The curriculum has aged remarkably well. By the time I finished, I had shipped real distributed systems and contributed to two research papers.",
    pros: "Faculty access, lab culture, recruiter pipeline", cons: "Tuition is steep without aid",
    recommend: true, helpfulCount: 142, reportedCount: 0, verified: true, language: "en",
    submittedAt: "2025-08-14T09:22:00Z", status: "approved", moderatedBy: "moderator-12", moderatedAt: "2025-08-14T11:00:00Z",
  },
  {
    id: "cr2", courseSlug: "btech-computer-science", author: "Aarav M.", collegeSlug: "varun-tech-university",
    graduationYear: 2024, rating: 4,
    ratings: { teaching: 4, curriculum: 4, careerOutcomes: 5, valueForMoney: 5 },
    title: "Outstanding ROI", body: "Came in with average JEE rank, left with a top-tier offer. The placement cell pushes you hard and the AI/ML electives are world-class.",
    pros: "Placements, modern electives", cons: "Older labs need an upgrade",
    recommend: true, helpfulCount: 89, reportedCount: 0, verified: true, language: "en",
    submittedAt: "2024-12-02T15:10:00Z", status: "approved",
  },
  {
    id: "cr3", courseSlug: "mba-general", author: "Mei L.", collegeSlug: "pacific-global-university",
    graduationYear: 2025, rating: 5,
    ratings: { teaching: 5, curriculum: 4, careerOutcomes: 5, valueForMoney: 4 },
    title: "Network is the curriculum", body: "Two years that compressed a decade of learning. The cohort and alumni network alone justify the sticker price.",
    pros: "Cohort quality, global immersion", cons: "Heavy reading load",
    recommend: true, helpfulCount: 64, reportedCount: 0, verified: true, language: "en",
    submittedAt: "2025-06-30T10:00:00Z", status: "approved",
  },
  {
    id: "cr4", courseSlug: "mbbs", author: "Dr. R. Pillai", collegeSlug: "marlowe-medical-college",
    graduationYear: 2023, rating: 5,
    ratings: { teaching: 5, curriculum: 5, careerOutcomes: 5, valueForMoney: 4 },
    title: "Clinical exposure from day one", body: "The attached teaching hospital means you see real patients early. Workload is brutal but the residency pipeline is unmatched.",
    pros: "Clinical depth, residency placement", cons: "Brutal hours",
    recommend: true, helpfulCount: 51, reportedCount: 0, verified: true, language: "en",
    submittedAt: "2023-09-12T08:00:00Z", status: "approved",
  },
  {
    id: "cr5", courseSlug: "msc-data-science", author: "Anonymous", graduationYear: 2025, rating: 4,
    ratings: { teaching: 4, curriculum: 5, careerOutcomes: 4, valueForMoney: 4 },
    title: "Strong technical, weaker industry bridge", body: "Curriculum is rigorous and modern, but the career services lag the technical strength. Self-driven students do extremely well.",
    pros: "Modern ML stack, research-grade rigor", cons: "Career office needs more recruiters",
    recommend: true, helpfulCount: 38, reportedCount: 1, verified: false, language: "en",
    submittedAt: "2025-07-19T13:45:00Z", status: "approved",
  },
];

export function getCourseReviews(courseSlug: string): CourseReview[] {
  return courseReviews.filter((r) => r.courseSlug === courseSlug && r.status === "approved");
}


export type FAQ = { q: string; a: string };
export const faqs: FAQ[] = [
  { q: "Is EduFinder free for students?", a: "Yes. Search, comparisons, the predictor, and all student tools are free. We're funded by verified institutions, never by manipulated rankings." },
  { q: "How does the college predictor work?", a: "It uses last five years of admission data — your scores and profile are matched against historical cutoffs and acceptance bands to produce a calibrated probability." },
  { q: "Can colleges edit their own pages?", a: "Once verified, claimed colleges can update their profile, courses, fees, and respond to reviews. All updates go through an editorial review." },
  { q: "Are the reviews verified?", a: "Reviews tagged 'Verified Student' are written by users who confirmed enrollment via institutional email. Anonymous reviews are clearly labeled and weighted differently." },
  { q: "Do you cover international colleges?", a: "Yes — over 4,000 institutions across 38 countries, with detailed fee, exam, and placement data normalized for comparison." },
];

export const heroStats = [
  { value: "4,280+", label: "Colleges indexed" },
  { value: "120+", label: "Entrance exams tracked" },
  { value: "$2.4B", label: "Scholarships listed" },
  { value: "1.2M", label: "Students guided" },
];

export const popularSearches = [
  "Top engineering colleges",
  "MBA in London",
  "STEM scholarships",
  "NEET 2027",
  "CUET cutoffs",
  "Design schools Europe",
];

export function getCollege(slug: string): College | undefined {
  return colleges.find((c) => c.slug === slug);
}

export function formatFees(c: College): string {
  const sym = c.feesCurrency === "USD" ? "$" : c.feesCurrency === "GBP" ? "£" : "₹";
  const fmt = (n: number) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(0)}k` : `${n}`;
  return `${sym}${fmt(c.feesMin)} – ${sym}${fmt(c.feesMax)} / yr`;
}

export function formatPackage(c: College): string {
  const sym = c.feesCurrency === "INR" ? "₹" : "$";
  const fmt = (n: number) =>
    n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${(n / 1_000).toFixed(0)}k`;
  return `${sym}${fmt(c.avgPackage)}`;
}
