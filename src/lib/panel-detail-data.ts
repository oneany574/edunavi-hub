// Rich detail records for the admin detail pages.
// Each entity has a slug (derived from the first column of the list row)
// and a fully-populated real-world record with related entities.

import {
  adminBlogsRows,
  adminClaimsRows,
  adminCollegesRows,
  adminConsultanciesRows,
  adminCoursesRows,
  adminExamsRows,
  adminNewsRows,
  adminScholarshipsRows,
  adminStudyAbroadRows,
  type Row,
  type Status,
} from "./panel-data";

export const slugify = (s: string | number) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export type DetailField = { label: string; value: string };
export type DetailSection = { title: string; fields?: DetailField[]; body?: string; bullets?: string[] };
export type DetailRelation = { kind: string; name: string; hint?: string; href?: string };
export type DetailTimeline = { at: string; actor: string; event: string };

export type EntityDetail = {
  entity: string;
  slug: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  status: Status;
  hero: DetailField[];
  summary: string;
  sections: DetailSection[];
  meta: DetailField[];
  related: { title: string; items: DetailRelation[] }[];
  timeline: DetailTimeline[];
};

// ---------- COLLEGES ----------
const collegeDetails: Record<string, Partial<EntityDetail>> = {
  "indian-institute-of-technology-bombay": {
    subtitle: "IIT-B · Powai, Mumbai · Institute of National Importance",
    summary:
      "Founded in 1958, IIT Bombay is India's premier engineering institute, ranked #3 in NIRF 2026. Home to 11,000+ students, 700+ faculty and a 550-acre lakeside campus in Powai.",
    hero: [
      { label: "NIRF Rank", value: "#3 Engineering" },
      { label: "Established", value: "1958" },
      { label: "Type", value: "Public · Autonomous" },
      { label: "Campus", value: "550 acres · Powai" },
    ],
    sections: [
      {
        title: "About",
        body: "IIT Bombay offers 60+ degree programs across engineering, science, design, humanities and management. Its Startup incubator SINE has spawned 200+ ventures.",
      },
      {
        title: "Placements 2025",
        fields: [
          { label: "Highest CTC", value: "₹3.7 Cr (Intl.)" },
          { label: "Average CTC", value: "₹23.5 LPA" },
          { label: "Placement rate", value: "84.2%" },
          { label: "Recruiters", value: "394" },
        ],
      },
      {
        title: "Fees & seats",
        fields: [
          { label: "B.Tech tuition", value: "₹2.25L / year" },
          { label: "M.Tech tuition", value: "₹50k / year" },
          { label: "UG intake", value: "1,360" },
          { label: "Hostel fee", value: "₹32,000 / sem" },
        ],
      },
      {
        title: "Accreditations",
        bullets: ["NAAC A++ (CGPA 3.69)", "NBA accredited (all UG streams)", "Institute of Eminence — MoE", "MHRD Innovation Cell rank #1"],
      },
    ],
    related: [
      {
        title: "Top courses",
        items: [
          { kind: "Course", name: "B.Tech Computer Science", hint: "120 seats · JEE Advanced" },
          { kind: "Course", name: "M.Tech AI & ML", hint: "45 seats · GATE" },
          { kind: "Course", name: "MBA (SJMSOM)", hint: "120 seats · CAT" },
        ],
      },
      {
        title: "Recognised exams",
        items: [
          { kind: "Exam", name: "JEE Advanced" },
          { kind: "Exam", name: "GATE" },
          { kind: "Exam", name: "CAT" },
        ],
      },
      {
        title: "Scholarships offered",
        items: [
          { kind: "Scholarship", name: "MCM (Merit-cum-Means)", hint: "₹1000/mo + tuition waiver" },
          { kind: "Scholarship", name: "Institute Free Studentship", hint: "For SC/ST" },
        ],
      },
    ],
  },
  "bits-pilani": {
    subtitle: "Birla Institute of Technology & Science · Deemed University",
    summary:
      "Established 1964. Four campuses (Pilani, Goa, Hyderabad, Dubai) with 17,000+ students. Known for the 'Practice School' industry-immersion model.",
    hero: [
      { label: "NIRF Rank", value: "#20 Overall" },
      { label: "Established", value: "1964" },
      { label: "Type", value: "Private · Deemed" },
      { label: "Campuses", value: "4" },
    ],
  },
};

// ---------- COURSES ----------
const courseDetails: Record<string, Partial<EntityDetail>> = {
  "b-tech-computer-science": {
    subtitle: "Bachelor of Technology in Computer Science & Engineering",
    summary:
      "A 4-year, 8-semester undergraduate program covering algorithms, systems, AI/ML, distributed computing and software engineering. Offered by 812 colleges across India.",
    hero: [
      { label: "Duration", value: "4 years · 8 sem" },
      { label: "Credits", value: "160" },
      { label: "Median fees", value: "₹4.2L / yr" },
      { label: "Median salary", value: "₹9.6 LPA" },
    ],
    sections: [
      {
        title: "Eligibility",
        bullets: [
          "10+2 with Physics, Chemistry & Mathematics (min 75% aggregate)",
          "Valid JEE Main / JEE Advanced / State CET score",
          "Age: 17-25 for general category",
        ],
      },
      {
        title: "Core syllabus",
        bullets: [
          "Sem 1-2: Calculus, Programming in C, Digital Logic, Physics",
          "Sem 3-4: DSA, DBMS, OS, Computer Organization",
          "Sem 5-6: Algorithms, Networks, Compiler Design, AI",
          "Sem 7-8: Electives, Capstone project, Internship (24 wk)",
        ],
      },
      {
        title: "Career pathways",
        fields: [
          { label: "Software Engineer", value: "₹6-32 LPA" },
          { label: "ML Engineer", value: "₹10-40 LPA" },
          { label: "Product Manager", value: "₹15-45 LPA" },
          { label: "PhD / MS abroad", value: "Fully funded routes" },
        ],
      },
    ],
    related: [
      {
        title: "Top colleges",
        items: [
          { kind: "College", name: "IIT Bombay", hint: "JEE Adv · Rank ≤ 500" },
          { kind: "College", name: "BITS Pilani", hint: "BITSAT · 350+" },
          { kind: "College", name: "IIIT Hyderabad", hint: "UGEE / JEE Main" },
        ],
      },
      {
        title: "Admission exams",
        items: [
          { kind: "Exam", name: "JEE Main" },
          { kind: "Exam", name: "JEE Advanced" },
          { kind: "Exam", name: "BITSAT" },
        ],
      },
      {
        title: "Scholarships",
        items: [
          { kind: "Scholarship", name: "Reliance Foundation UG Scholars" },
          { kind: "Scholarship", name: "OP Jindal Merit" },
        ],
      },
    ],
  },
};

// ---------- EXAMS ----------
const examDetails: Record<string, Partial<EntityDetail>> = {
  "jee-main-2027-session-1": {
    subtitle: "Joint Entrance Examination (Main) — conducted by NTA",
    summary:
      "Computer-based, 3-hour exam gating admissions to NITs, IIITs, GFTIs and BITSAT-like private tests. Session 1 window: Jan 24 – Feb 01, 2027.",
    hero: [
      { label: "Registrations", value: "9.84L (2027 est.)" },
      { label: "Conducting body", value: "NTA" },
      { label: "Application fee", value: "₹1,000 (Gen)" },
      { label: "Result", value: "Feb 12, 2027" },
    ],
    sections: [
      {
        title: "Structure",
        bullets: [
          "Paper 1 (BE/BTech): 75 questions — Physics, Chemistry, Math",
          "Paper 2A (BArch): Aptitude + Drawing",
          "Duration: 180 minutes · Marks: 300",
          "Marking: +4 correct, -1 wrong, 0 unattempted",
        ],
      },
      {
        title: "Key dates",
        fields: [
          { label: "Application opens", value: "Nov 01, 2026" },
          { label: "Application closes", value: "Nov 30, 2026" },
          { label: "Admit card", value: "Jan 15, 2027" },
          { label: "Exam window", value: "Jan 24 – Feb 01" },
        ],
      },
    ],
    related: [
      {
        title: "Accepting colleges",
        items: [
          { kind: "College", name: "NIT Trichy" },
          { kind: "College", name: "IIIT Hyderabad" },
          { kind: "College", name: "BITS Pilani (via BITSAT)" },
        ],
      },
      {
        title: "Prep resources",
        items: [
          { kind: "Prep", name: "JEE Main Mock Series (10)" },
          { kind: "Prep", name: "PYQ 2019-2026" },
        ],
      },
    ],
  },
};

// ---------- SCHOLARSHIPS ----------
const scholarshipDetails: Record<string, Partial<EntityDetail>> = {
  "reliance-foundation-ug-scholars": {
    subtitle: "Reliance Foundation Undergraduate Scholarship 2026-27",
    summary:
      "Merit-cum-means scholarship of up to ₹2,00,000 per year for the full duration of the UG program, awarded to 5,000 first-year students annually.",
    hero: [
      { label: "Award", value: "Up to ₹2L / year" },
      { label: "Awards", value: "5,000 seats" },
      { label: "Applicants (2026)", value: "12,820" },
      { label: "Deadline", value: "Oct 31, 2026" },
    ],
    sections: [
      {
        title: "Eligibility",
        bullets: [
          "Indian national in year 1 of any UG program",
          "12th board score ≥ 60% (or CGPA equivalent)",
          "Household income ≤ ₹15 LPA",
          "No parallel Reliance Foundation scholarship",
        ],
      },
      {
        title: "Selection process",
        bullets: [
          "Online application + document upload",
          "Aptitude assessment (60 min · online)",
          "Personal interview (video call)",
          "Final award list · Jan 2027",
        ],
      },
    ],
    related: [
      {
        title: "Eligible colleges",
        items: [
          { kind: "College", name: "All UGC-recognised UG institutions" },
        ],
      },
    ],
  },
};

// ---------- STUDY ABROAD ----------
const studyAbroadDetails: Record<string, Partial<EntityDetail>> = {
  "united-kingdom": {
    subtitle: "Study Abroad — United Kingdom",
    summary:
      "The UK hosts 148 partner universities on EduFinder with 22,000+ international programs. 2-year Graduate Route visa lets students stay after graduation.",
    hero: [
      { label: "Universities", value: "148" },
      { label: "Avg. tuition", value: "£22,000 / yr" },
      { label: "Living cost", value: "£12,000 / yr" },
      { label: "Visa", value: "Student + Graduate Route" },
    ],
    sections: [
      {
        title: "Popular intakes",
        bullets: ["September (main)", "January (secondary)", "May (limited PG)"],
      },
      {
        title: "Language requirements",
        fields: [
          { label: "IELTS", value: "6.5 overall (6.0 each)" },
          { label: "PTE Academic", value: "62 overall" },
          { label: "TOEFL iBT", value: "88 overall" },
          { label: "Duolingo", value: "115 (select unis)" },
        ],
      },
      {
        title: "Cost breakdown (yearly)",
        fields: [
          { label: "Tuition (UG)", value: "£15,000 – £30,000" },
          { label: "Tuition (PG)", value: "£17,000 – £45,000" },
          { label: "Accommodation", value: "£6,500 – £9,500" },
          { label: "Health surcharge", value: "£776 / year" },
        ],
      },
    ],
    related: [
      {
        title: "Top universities",
        items: [
          { kind: "University", name: "University of Oxford" },
          { kind: "University", name: "Imperial College London" },
          { kind: "University", name: "University of Edinburgh" },
        ],
      },
      {
        title: "Scholarships",
        items: [
          { kind: "Scholarship", name: "Chevening (UK Govt)" },
          { kind: "Scholarship", name: "Commonwealth Scholarship" },
        ],
      },
      {
        title: "Consultancies",
        items: [
          { kind: "Consultancy", name: "Edwise International" },
          { kind: "Consultancy", name: "IDP Education" },
        ],
      },
    ],
  },
};

// ---------- CONSULTANCIES ----------
const consultancyDetails: Record<string, Partial<EntityDetail>> = {
  "career-mosaic": {
    subtitle: "Career Mosaic · Bengaluru · Study abroad specialist",
    summary:
      "Founded 2011. 24 in-house counselors covering 12 destinations. 3,200+ students placed to date with 92% visa success rate on file.",
    hero: [
      { label: "Rating", value: "4.6 / 5" },
      { label: "Counselors", value: "24" },
      { label: "Countries", value: "12" },
      { label: "Success rate", value: "92%" },
    ],
    sections: [
      {
        title: "Services",
        bullets: [
          "University shortlisting & profile evaluation",
          "SOP / LOR / essay editing",
          "IELTS · PTE · Duolingo prep",
          "Visa filing & mock interviews",
          "Pre-departure & accommodation",
        ],
      },
      {
        title: "Fee model",
        fields: [
          { label: "Discovery call", value: "Free · 30 min" },
          { label: "Full package", value: "₹75,000 (1 country)" },
          { label: "Add-on country", value: "₹20,000" },
          { label: "Visa-only service", value: "₹25,000" },
        ],
      },
      {
        title: "Partner universities",
        bullets: ["Deakin (AU)", "Coventry (UK)", "SFU (CA)", "TU Munich (DE)"],
      },
    ],
    related: [
      {
        title: "Team leads",
        items: [
          { kind: "Counselor", name: "Sunita Bhatt", hint: "Founder · 14 yrs" },
          { kind: "Counselor", name: "Arjun Ravi", hint: "US / Canada lead" },
        ],
      },
      {
        title: "Destinations",
        items: [
          { kind: "Destination", name: "United Kingdom" },
          { kind: "Destination", name: "Canada" },
          { kind: "Destination", name: "Germany" },
        ],
      },
    ],
  },
};

// ---------- BLOGS ----------
const blogDetails: Record<string, Partial<EntityDetail>> = {
  "how-to-pick-a-stream-after-12th": {
    subtitle: "By Rhea Menon · Career · 8-min read",
    summary:
      "A decision framework across interests, aptitude, market demand and financial feasibility — with three worked examples from real students.",
    hero: [
      { label: "Views", value: "24,102" },
      { label: "Read time", value: "8 min" },
      { label: "Reactions", value: "312" },
      { label: "Comments", value: "48" },
    ],
    sections: [
      {
        title: "Article outline",
        bullets: [
          "The four-quadrant self-assessment",
          "Aptitude tests worth your time",
          "5-year job market signals (2027 outlook)",
          "Talking to parents about non-STEM streams",
          "Worked examples: Aditi, Rohan, Fatima",
        ],
      },
      {
        title: "SEO metadata",
        fields: [
          { label: "Slug", value: "/blog/how-to-pick-a-stream-after-12th" },
          { label: "Meta title", value: "How to pick a stream after 12th (2027)" },
          { label: "Canonical", value: "edufinder.com" },
          { label: "Schema", value: "Article + BreadcrumbList" },
        ],
      },
    ],
    related: [
      { title: "Related articles", items: [
        { kind: "Blog", name: "GRE vs GMAT — 2027 decision guide" },
        { kind: "Blog", name: "10 questions to ask on your campus visit" },
      ]},
    ],
  },
};

// ---------- NEWS ----------
const newsDetails: Record<string, Partial<EntityDetail>> = {
  "josaa-counselling-opens-july-2": {
    subtitle: "Admissions · EduFinder Desk · 2h ago",
    summary:
      "The Joint Seat Allocation Authority (JoSAA) 2027 counselling opens July 2 with a common seat allocation across 121 institutes: 23 IITs, 32 NITs, 26 IIITs and 40 GFTIs.",
    hero: [
      { label: "Institutes", value: "121" },
      { label: "Rounds", value: "6" },
      { label: "Seats", value: "60,000+" },
      { label: "Fee", value: "₹35,000 refundable" },
    ],
    sections: [
      {
        title: "Key dates",
        fields: [
          { label: "Registration opens", value: "Jul 02" },
          { label: "Choice filling", value: "Jul 02 – Jul 10" },
          { label: "Round 1 result", value: "Jul 15" },
          { label: "Round 6 close", value: "Aug 26" },
        ],
      },
      {
        title: "What's new in 2027",
        bullets: [
          "Female supernumerary seats extended to all IITs",
          "Consolidated fee token accepted across all rounds",
          "Live seat matrix on JoSAA portal (auto-refresh)",
        ],
      },
    ],
    related: [
      { title: "Related news", items: [
        { kind: "News", name: "UGC releases model MoU for dual degrees" },
        { kind: "Exam", name: "JEE Main 2027 (Session 1)" },
      ]},
    ],
  },
};

// ---------- CLAIMS ----------
const claimDetails: Record<string, Partial<EntityDetail>> = {
  "mit-manipal": {
    subtitle: "College claim · Manipal Institute of Technology",
    summary:
      "Requester Dr. R. Kumar submitted a college-ownership claim on behalf of Manipal Institute of Technology. Currently in the Documents review stage.",
    hero: [
      { label: "Stage", value: "Documents (3/5)" },
      { label: "Submitted", value: "2 days ago" },
      { label: "Requester", value: "Dr. R. Kumar" },
      { label: "Assigned", value: "Trust team · Ananya" },
    ],
    sections: [
      {
        title: "Verification checklist",
        bullets: [
          "✅ Identity (Aadhaar last-4: 2418, DigiLocker verified)",
          "✅ Institutional email confirmed (reg@manipal.edu)",
          "🟡 Documents: 2/3 uploaded (AICTE, UGC letter pending)",
          "⬜ Admin review",
          "⬜ Approval & portal handover",
        ],
      },
      {
        title: "Uploaded documents",
        fields: [
          { label: "Registrar authorisation letter", value: "PDF · 214 KB · verified" },
          { label: "AICTE approval 2026", value: "PDF · 1.8 MB · verified" },
          { label: "UGC 12(B) recognition", value: "Awaiting upload" },
        ],
      },
      {
        title: "Requester details",
        fields: [
          { label: "Name", value: "Dr. R. Kumar" },
          { label: "Role", value: "Registrar" },
          { label: "Email", value: "reg@manipal.edu" },
          { label: "Phone", value: "+91 820 292 3123" },
        ],
      },
    ],
    related: [
      { title: "Entity being claimed", items: [
        { kind: "College", name: "Manipal Institute of Technology" },
      ]},
      { title: "Related claims", items: [
        { kind: "Claim", name: "BITS Pilani — Hyd" },
        { kind: "Claim", name: "SRM AP" },
      ]},
    ],
  },
};

// ---------- Generic builders ----------
type EntityKey =
  | "colleges"
  | "courses"
  | "exams"
  | "scholarships"
  | "study-abroad"
  | "consultancies"
  | "blogs"
  | "news"
  | "claims";

const entityConfig: Record<EntityKey, {
  eyebrow: string;
  rows: Row[];
  primaryKey: string;
  overrides: Record<string, Partial<EntityDetail>>;
}> = {
  colleges: { eyebrow: "College", rows: adminCollegesRows, primaryKey: "name", overrides: collegeDetails },
  courses: { eyebrow: "Course", rows: adminCoursesRows, primaryKey: "title", overrides: courseDetails },
  exams: { eyebrow: "Exam", rows: adminExamsRows, primaryKey: "name", overrides: examDetails },
  scholarships: { eyebrow: "Scholarship", rows: adminScholarshipsRows, primaryKey: "name", overrides: scholarshipDetails },
  "study-abroad": { eyebrow: "Destination", rows: adminStudyAbroadRows, primaryKey: "destination", overrides: studyAbroadDetails },
  consultancies: { eyebrow: "Consultancy", rows: adminConsultanciesRows, primaryKey: "name", overrides: consultancyDetails },
  blogs: { eyebrow: "Article", rows: adminBlogsRows, primaryKey: "title", overrides: blogDetails },
  news: { eyebrow: "News", rows: adminNewsRows, primaryKey: "title", overrides: newsDetails },
  claims: { eyebrow: "Claim", rows: adminClaimsRows, primaryKey: "entity", overrides: claimDetails },
};

function baseTimeline(entity: string, title: string): DetailTimeline[] {
  return [
    { at: "3 min ago", actor: "System", event: `${entity} auto-refreshed from source feed` },
    { at: "2 hours ago", actor: "Priya Kapoor", event: `Edited ${title}` },
    { at: "Yesterday", actor: "Ravi (moderator)", event: "Approved 1 pending edit" },
    { at: "3 days ago", actor: "System", event: `${entity} created via admin import` },
  ];
}

export function getEntityDetail(entityKey: EntityKey, slug: string): EntityDetail | null {
  const cfg = entityConfig[entityKey];
  if (!cfg) return null;
  const row = cfg.rows.find((r) => slugify(r[cfg.primaryKey] as string) === slug);
  if (!row) return null;

  const title = String(row[cfg.primaryKey]);
  const override = cfg.overrides[slug] ?? {};
  const status = (row.status as Status) ?? "Active";

  // Meta from all row fields not shown in hero
  const meta: DetailField[] = Object.entries(row)
    .filter(([k]) => k !== cfg.primaryKey)
    .map(([k, v]) => ({ label: k.charAt(0).toUpperCase() + k.slice(1), value: String(v) }));

  return {
    entity: entityKey,
    slug,
    eyebrow: cfg.eyebrow,
    title,
    subtitle: override.subtitle ?? `${cfg.eyebrow} record · slug ${slug}`,
    status,
    hero:
      override.hero ??
      meta.slice(0, 4).map((f) => ({ label: f.label, value: f.value })),
    summary:
      override.summary ??
      `${title} is a ${cfg.eyebrow.toLowerCase()} record maintained in the EduFinder admin catalog. Extend the summary here with editorial context, positioning and audience notes.`,
    sections: override.sections ?? [
      { title: "Overview", body: `Curated details for ${title}. Populate this section with editorial notes.` },
      { title: "Metadata", fields: meta },
    ],
    meta,
    related: override.related ?? [
      { title: "Related", items: [
        { kind: cfg.eyebrow, name: "Sibling record A" },
        { kind: cfg.eyebrow, name: "Sibling record B" },
      ]},
    ],
    timeline: baseTimeline(cfg.eyebrow, title),
  };
}

export const entityKeys = Object.keys(entityConfig) as EntityKey[];
export type { EntityKey };
