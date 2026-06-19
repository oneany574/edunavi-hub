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
  { slug: "btech-computer-science", name: "BTech in Computer Science", level: "UG", durationMonths: 48, stream: "engineering", mode: "Full-time", feesRange: "$12k – $54k / yr", description: "Foundational CS, systems, AI, software engineering with strong industry exposure.", collegesOffering: 1_240, relatedExams: ["JEE Main", "SAT"] },
  { slug: "mba-general", name: "Master of Business Administration", level: "PG", durationMonths: 24, stream: "management", mode: "Full-time", feesRange: "$22k – $78k / yr", description: "General management with electives in finance, strategy, marketing and product.", collegesOffering: 980, relatedExams: ["GMAT", "GRE", "CAT"] },
  { slug: "mbbs", name: "Bachelor of Medicine, MBBS", level: "UG", durationMonths: 66, stream: "medical", mode: "Full-time", feesRange: "$1.4M – $2.2M INR / total", description: "Pre-clinical, clinical, and rotational training across all major specialties.", collegesOffering: 540, relatedExams: ["NEET-UG"] },
  { slug: "ba-llb-hons", name: "BA LLB (Hons.)", level: "UG", durationMonths: 60, stream: "law", mode: "Full-time", feesRange: "£22k – £30k / yr", description: "Integrated five-year law program covering substantive and procedural law.", collegesOffering: 410, relatedExams: ["LSAT", "CLAT"] },
  { slug: "msc-data-science", name: "MSc in Data Science", level: "PG", durationMonths: 18, stream: "science", mode: "Full-time", feesRange: "$24k – $52k / yr", description: "Applied statistics, machine learning, and production analytics.", collegesOffering: 720, relatedExams: ["GRE"] },
  { slug: "bdes-product-design", name: "BDes in Product Design", level: "UG", durationMonths: 48, stream: "design", mode: "Full-time", feesRange: "$18k – $28k / yr", description: "Form, function, materials, and human-centered design across industries.", collegesOffering: 310, relatedExams: ["Portfolio Review"] },
];

export const exams: Exam[] = [
  { slug: "sat", name: "SAT", fullName: "Scholastic Assessment Test", conductingBody: "College Board", level: "International", applicationOpens: "Jul 12, 2026", applicationCloses: "Aug 23, 2026", examDate: "Oct 04, 2026", resultDate: "Oct 25, 2026", stream: "All", registrationStatus: "Open", difficulty: "Moderate" },
  { slug: "gre", name: "GRE", fullName: "Graduate Record Examination", conductingBody: "ETS", level: "International", applicationOpens: "Year-round", applicationCloses: "—", examDate: "Flexible", resultDate: "T+15 days", stream: "All", registrationStatus: "Open", difficulty: "High" },
  { slug: "gmat", name: "GMAT", fullName: "Graduate Management Admission Test", conductingBody: "GMAC", level: "International", applicationOpens: "Year-round", applicationCloses: "—", examDate: "Flexible", resultDate: "T+20 days", stream: "Management", registrationStatus: "Open", difficulty: "High" },
  { slug: "jee-main", name: "JEE Main", fullName: "Joint Entrance Examination — Main", conductingBody: "NTA", level: "National", applicationOpens: "Nov 01, 2026", applicationCloses: "Nov 30, 2026", examDate: "Jan 24, 2027", resultDate: "Feb 12, 2027", stream: "Engineering", registrationStatus: "Upcoming", difficulty: "Very High" },
  { slug: "neet-ug", name: "NEET-UG", fullName: "National Eligibility cum Entrance Test", conductingBody: "NTA", level: "National", applicationOpens: "Feb 04, 2027", applicationCloses: "Mar 04, 2027", examDate: "May 02, 2027", resultDate: "Jun 14, 2027", stream: "Medical", registrationStatus: "Upcoming", difficulty: "Very High" },
  { slug: "cuet", name: "CUET", fullName: "Common University Entrance Test", conductingBody: "NTA", level: "National", applicationOpens: "Feb 01, 2027", applicationCloses: "Mar 10, 2027", examDate: "May 15, 2027", resultDate: "Jun 30, 2027", stream: "All", registrationStatus: "Upcoming", difficulty: "Moderate" },
  { slug: "lsat", name: "LSAT", fullName: "Law School Admission Test", conductingBody: "LSAC", level: "International", applicationOpens: "Year-round", applicationCloses: "—", examDate: "Multiple windows", resultDate: "T+21 days", stream: "Law", registrationStatus: "Open", difficulty: "High" },
  { slug: "clat", name: "CLAT", fullName: "Common Law Admission Test", conductingBody: "Consortium of NLUs", level: "National", applicationOpens: "Aug 01, 2026", applicationCloses: "Oct 30, 2026", examDate: "Dec 06, 2026", resultDate: "Dec 22, 2026", stream: "Law", registrationStatus: "Closing soon", difficulty: "High" },
];

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
