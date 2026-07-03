// Dummy data powering Admin, College Portal, and Counselor dashboards.

export type Status = "Active" | "Pending" | "Rejected" | "Draft" | "Published" | "Flagged" | "Approved" | "Suspended";

export type Row = Record<string, string | number | Status>;

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  hint?: string;
};

export type ActivityItem = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  kind: "claim" | "review" | "content" | "payment" | "system";
};

// ---------- ADMIN ----------
export const adminKpis: Kpi[] = [
  { label: "Total colleges", value: "4,218", delta: "+142 this month", trend: "up", hint: "Verified + unverified" },
  { label: "Active students", value: "128,904", delta: "+12.4%", trend: "up" },
  { label: "Pending claims", value: "37", delta: "12 urgent", trend: "flat", hint: "SLA: 2 business days" },
  { label: "Revenue (MRR)", value: "$284k", delta: "+8.1%", trend: "up" },
  { label: "Content flags", value: "19", delta: "-6 vs last week", trend: "down" },
  { label: "Counselor sessions", value: "1,204", delta: "+204 booked", trend: "up" },
];

export const adminActivity: ActivityItem[] = [
  { id: "a1", actor: "Ananya S.", action: "submitted claim for", target: "IIT Bombay", time: "3m", kind: "claim" },
  { id: "a2", actor: "Moderator R.", action: "removed review on", target: "MIT Manipal", time: "22m", kind: "review" },
  { id: "a3", actor: "Rahul (author)", action: "published article", target: "GRE vs GMAT 2027", time: "1h", kind: "content" },
  { id: "a4", actor: "Payments", action: "processed payout to", target: "Career Mosaic Consultancy", time: "2h", kind: "payment" },
  { id: "a5", actor: "System", action: "auto-approved 14 colleges via", target: "MEA import batch", time: "4h", kind: "system" },
  { id: "a6", actor: "Vikram P.", action: "flagged Q&A post in", target: "Study Abroad › UK", time: "6h", kind: "review" },
];

export const adminCollegesRows: Row[] = [
  { name: "Indian Institute of Technology, Bombay", city: "Mumbai", ownership: "Public", claimed: "Verified", courses: 128, rating: 4.7, status: "Active" as Status },
  { name: "BITS Pilani", city: "Pilani", ownership: "Private", claimed: "Verified", courses: 84, rating: 4.5, status: "Active" as Status },
  { name: "Manipal Institute of Technology", city: "Manipal", ownership: "Deemed", claimed: "Pending", courses: 62, rating: 4.3, status: "Pending" as Status },
  { name: "Symbiosis Institute of Business Mgmt.", city: "Pune", ownership: "Private", claimed: "Verified", courses: 24, rating: 4.4, status: "Active" as Status },
  { name: "Amrita Vishwa Vidyapeetham", city: "Coimbatore", ownership: "Deemed", claimed: "Unclaimed", courses: 96, rating: 4.2, status: "Active" as Status },
  { name: "IIM Ahmedabad", city: "Ahmedabad", ownership: "Public", claimed: "Verified", courses: 12, rating: 4.9, status: "Active" as Status },
  { name: "SRM University", city: "Chennai", ownership: "Private", claimed: "Verified", courses: 210, rating: 4.1, status: "Active" as Status },
  { name: "Anna University", city: "Chennai", ownership: "Public", claimed: "Unclaimed", courses: 180, rating: 4.0, status: "Draft" as Status },
];

export const adminCoursesRows: Row[] = [
  { title: "B.Tech Computer Science", level: "UG", stream: "Engineering", duration: "4 yrs", colleges: 812, status: "Published" as Status },
  { title: "MBA — Marketing", level: "PG", stream: "Management", duration: "2 yrs", colleges: 640, status: "Published" as Status },
  { title: "B.Sc Data Science", level: "UG", stream: "Science", duration: "3 yrs", colleges: 128, status: "Published" as Status },
  { title: "MBBS", level: "UG", stream: "Medical", duration: "5.5 yrs", colleges: 342, status: "Published" as Status },
  { title: "M.Des Interaction Design", level: "PG", stream: "Design", duration: "2 yrs", colleges: 26, status: "Draft" as Status },
  { title: "LL.B (Hons.)", level: "UG", stream: "Law", duration: "5 yrs", colleges: 74, status: "Published" as Status },
  { title: "B.Arch", level: "UG", stream: "Architecture", duration: "5 yrs", colleges: 96, status: "Published" as Status },
];

export const adminClaimsRows: Row[] = [
  { entity: "MIT Manipal", type: "College", requester: "Dr. R. Kumar", email: "reg@manipal.edu", submitted: "2d ago", stage: "Documents", status: "Pending" as Status },
  { entity: "Career Mosaic", type: "Consultancy", requester: "S. Bhatt", email: "s@careermosaic.in", submitted: "1d ago", stage: "Identity", status: "Pending" as Status },
  { entity: "BITS Pilani — Hyd", type: "College", requester: "P. Menon", email: "p.menon@bits.ac.in", submitted: "5h ago", stage: "Review", status: "Pending" as Status },
  { entity: "Edwise International", type: "Consultancy", requester: "V. Shah", email: "v@edwise.com", submitted: "3d ago", stage: "Approved", status: "Approved" as Status },
  { entity: "SRM AP", type: "College", requester: "K. Iyer", email: "kiyer@srmap.edu", submitted: "4d ago", stage: "Rejected", status: "Rejected" as Status },
];

export const adminModerationRows: Row[] = [
  { content: "Review on MIT Manipal", author: "student_2141", reason: "Abusive language", reports: 4, submitted: "1h", status: "Flagged" as Status },
  { content: "Q&A: 'JEE score for BITS'", author: "prep_ninja", reason: "Spam link", reports: 2, submitted: "3h", status: "Flagged" as Status },
  { content: "Article: 'SAT hacks 2027'", author: "coach_karan", reason: "Misleading", reports: 1, submitted: "1d", status: "Pending" as Status },
  { content: "Review on IIM Bangalore", author: "anon_9021", reason: "Off-topic", reports: 3, submitted: "2d", status: "Flagged" as Status },
];

export const adminScholarshipsRows: Row[] = [
  { name: "Reliance Foundation UG Scholars", provider: "Reliance Foundation", amount: "₹2L / yr", applicants: 12820, deadline: "Oct 31", status: "Published" as Status },
  { name: "Inlaks Shivdasani", provider: "Inlaks Foundation", amount: "$100k", applicants: 3401, deadline: "Mar 20", status: "Published" as Status },
  { name: "Chevening (UK)", provider: "UK Govt.", amount: "Full tuition", applicants: 22890, deadline: "Nov 07", status: "Published" as Status },
  { name: "OP Jindal Merit", provider: "JGU", amount: "50% waiver", applicants: 942, deadline: "Rolling", status: "Draft" as Status },
];

export const adminExamsRows: Row[] = [
  { name: "JEE Main 2027 (Session 1)", type: "Undergraduate", date: "Jan 24 – Feb 01", registrations: 984210, status: "Active" as Status },
  { name: "GATE 2027", type: "PG Engineering", date: "Feb 07 – Feb 15", registrations: 812903, status: "Active" as Status },
  { name: "CAT 2026", type: "MBA", date: "Nov 24", registrations: 340210, status: "Active" as Status },
  { name: "IELTS Academic", type: "English Proficiency", date: "Weekly", registrations: 128401, status: "Active" as Status },
  { name: "SAT (Digital)", type: "Undergraduate Intl.", date: "Monthly", registrations: 89210, status: "Active" as Status },
];

export const adminBlogsRows: Row[] = [
  { title: "How to pick a stream after 12th", author: "Rhea M.", category: "Career", views: 24102, published: "May 12", status: "Published" as Status },
  { title: "GRE vs GMAT — 2027 decision guide", author: "Rahul V.", category: "Exams", views: 18990, published: "Jun 02", status: "Published" as Status },
  { title: "Inside IIT Madras' new BS in Data Science", author: "Editorial", category: "College Life", views: 12401, published: "Jun 18", status: "Published" as Status },
  { title: "10 questions to ask on your campus visit", author: "Editorial", category: "Admissions", views: 0, published: "—", status: "Draft" as Status },
];

export const adminNewsRows: Row[] = [
  { title: "JoSAA counselling opens July 2", source: "EduFinder Desk", tag: "Admissions", published: "2h", status: "Published" as Status },
  { title: "IELTS revises writing band descriptors", source: "IDP", tag: "Exams", published: "6h", status: "Published" as Status },
  { title: "UGC releases model MoU for dual degrees", source: "UGC", tag: "Policy", published: "1d", status: "Published" as Status },
  { title: "Canada updates PGWP eligibility list", source: "IRCC", tag: "Study Abroad", published: "3d", status: "Published" as Status },
];

export const adminConsultanciesRows: Row[] = [
  { name: "Career Mosaic", city: "Bengaluru", countries: 12, counselors: 24, rating: 4.6, status: "Active" as Status },
  { name: "Edwise International", city: "Mumbai", countries: 18, counselors: 60, rating: 4.5, status: "Active" as Status },
  { name: "Krishna Consultants", city: "Nagpur", countries: 9, counselors: 14, rating: 4.3, status: "Pending" as Status },
  { name: "IDP Education", city: "Delhi", countries: 6, counselors: 82, rating: 4.4, status: "Active" as Status },
];

export const adminStudyAbroadRows: Row[] = [
  { destination: "United Kingdom", universities: 148, avgFees: "£22k", livingIndex: "High", trend: "▲ 12%", status: "Published" as Status },
  { destination: "United States", universities: 402, avgFees: "$38k", livingIndex: "High", trend: "▲ 6%", status: "Published" as Status },
  { destination: "Germany", universities: 96, avgFees: "€1.5k", livingIndex: "Medium", trend: "▲ 22%", status: "Published" as Status },
  { destination: "Canada", universities: 128, avgFees: "C$24k", livingIndex: "Medium", trend: "▼ 4%", status: "Published" as Status },
  { destination: "Australia", universities: 84, avgFees: "A$32k", livingIndex: "High", trend: "▲ 3%", status: "Published" as Status },
];

// ---------- COLLEGE PORTAL ----------
export const collegeKpis: Kpi[] = [
  { label: "Profile views", value: "24,802", delta: "+18% WoW", trend: "up" },
  { label: "Applications", value: "1,204", delta: "+112 new", trend: "up" },
  { label: "Brochure downloads", value: "3,401", delta: "+9%", trend: "up" },
  { label: "Rating", value: "4.5 / 5", delta: "+0.1", trend: "up", hint: "Across 812 reviews" },
];

export const collegeCoursesRows: Row[] = [
  { name: "B.Tech Computer Science", intake: 240, seatsLeft: 24, fees: "₹4.2L / yr", status: "Published" as Status },
  { name: "B.Tech Electronics", intake: 180, seatsLeft: 42, fees: "₹4.0L / yr", status: "Published" as Status },
  { name: "MBA — Analytics", intake: 60, seatsLeft: 8, fees: "₹9.8L / yr", status: "Published" as Status },
  { name: "M.Tech AI", intake: 40, seatsLeft: 12, fees: "₹3.2L / yr", status: "Draft" as Status },
];

export const collegeReviewsRows: Row[] = [
  { student: "Priya K.", program: "B.Tech CS", rating: 5, sentiment: "Positive", flagged: "No", status: "Published" as Status },
  { student: "Arjun M.", program: "MBA", rating: 4, sentiment: "Positive", flagged: "No", status: "Published" as Status },
  { student: "Anon.", program: "B.Tech ECE", rating: 2, sentiment: "Negative", flagged: "Yes", status: "Flagged" as Status },
  { student: "Neha T.", program: "M.Tech", rating: 5, sentiment: "Positive", flagged: "No", status: "Published" as Status },
];

export const collegeGalleryRows: Row[] = [
  { title: "Convocation 2026", type: "Album", assets: 42, uploaded: "Jun 10", status: "Published" as Status },
  { title: "Central Library", type: "Photo", assets: 8, uploaded: "May 04", status: "Published" as Status },
  { title: "Sports Complex tour", type: "Video", assets: 1, uploaded: "Apr 21", status: "Published" as Status },
  { title: "Placement Day highlights", type: "Album", assets: 26, uploaded: "Mar 12", status: "Draft" as Status },
];

export const collegeScholarshipsRows: Row[] = [
  { name: "Merit-cum-Means", coverage: "50% tuition", seats: 40, deadline: "Aug 15", status: "Published" as Status },
  { name: "Women in STEM", coverage: "₹1L / yr", seats: 25, deadline: "Aug 30", status: "Published" as Status },
  { name: "Sports Excellence", coverage: "Full waiver", seats: 8, deadline: "Sep 10", status: "Draft" as Status },
];

// ---------- COUNSELOR ----------
export const counselorKpis: Kpi[] = [
  { label: "Sessions this month", value: "38", delta: "+9", trend: "up" },
  { label: "Active students", value: "62", delta: "+12", trend: "up" },
  { label: "Rating", value: "4.9 / 5", delta: "132 reviews", trend: "flat" },
  { label: "Earnings (MTD)", value: "$4,820", delta: "Next payout Fri", trend: "up" },
];

export const counselorSessionsRows: Row[] = [
  { student: "Ananya S.", type: "Video · 45m", topic: "US MS shortlisting", when: "Today · 4:00 PM", status: "Active" as Status },
  { student: "Rohit B.", type: "Chat · 30m", topic: "SOP review", when: "Tomorrow · 11:00 AM", status: "Active" as Status },
  { student: "Meera D.", type: "Voice · 30m", topic: "GRE prep plan", when: "Fri · 6:30 PM", status: "Pending" as Status },
  { student: "Kabir V.", type: "Video · 60m", topic: "MBA profile eval", when: "Sat · 10:00 AM", status: "Active" as Status },
];

export const counselorStudentsRows: Row[] = [
  { name: "Ananya S.", goal: "MS CS · Fall '27", country: "USA", progress: "Shortlisting", nextStep: "Finalise 8 unis" },
  { name: "Rohit B.", goal: "MBA · Fall '27", country: "UK", progress: "Essays", nextStep: "Draft LBS essay 2" },
  { name: "Meera D.", goal: "MS DS · Fall '27", country: "Germany", progress: "Test prep", nextStep: "IELTS mock #3" },
];

export const counselorEarningsRows: Row[] = [
  { period: "This month", sessions: 38, gross: "$5,700", platformFee: "$880", net: "$4,820", status: "Active" as Status },
  { period: "May 2026", sessions: 42, gross: "$6,300", platformFee: "$945", net: "$5,355", status: "Approved" as Status },
  { period: "Apr 2026", sessions: 31, gross: "$4,650", platformFee: "$697", net: "$3,952", status: "Approved" as Status },
];
