// Leads + Notifications + Navigation/Footer builder data.

import type { Row, Status } from "./panel-data";

export const adminLeadsRows: Row[] = [
  { name: "Ananya Sharma", email: "ananya.s@gmail.com", phone: "+91 98200 12345", interest: "B.Tech CSE", source: "Website", assignedTo: "Priya K.", score: 92, status: "Active" as Status },
  { name: "Rahul Verma", email: "rahul.v@yahoo.in", phone: "+91 90045 88123", interest: "MBA Marketing", source: "Google Ads", assignedTo: "Neha D.", score: 78, status: "Active" as Status },
  { name: "Meera Iyer", email: "meera.iyer@outlook.com", phone: "+91 98450 30022", interest: "Study in UK", source: "Instagram", assignedTo: "Vikram P.", score: 85, status: "Pending" as Status },
  { name: "Kunal Bhatia", email: "kunal.b@gmail.com", phone: "+91 87654 32100", interest: "MBBS Abroad", source: "Referral", assignedTo: "Sana R.", score: 66, status: "Pending" as Status },
  { name: "Priya Nair", email: "priya.nair@icloud.com", phone: "+91 99000 11223", interest: "IELTS Coaching", source: "Facebook", assignedTo: "Unassigned", score: 54, status: "Draft" as Status },
  { name: "Aditya Rao", email: "aditya.rao@gmail.com", phone: "+91 88800 54321", interest: "GRE Prep", source: "Website", assignedTo: "Priya K.", score: 71, status: "Active" as Status },
  { name: "Sneha Kapoor", email: "sneha.k@hotmail.com", phone: "+91 90909 21212", interest: "M.Des Interaction", source: "Organic Search", assignedTo: "Neha D.", score: 88, status: "Approved" as Status },
  { name: "Farhan Qureshi", email: "farhan.q@gmail.com", phone: "+91 98111 43210", interest: "Study in Canada", source: "Consultancy", assignedTo: "Vikram P.", score: 47, status: "Rejected" as Status },
];

export type LeadDetail = {
  slug: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  interest: string;
  budget: string;
  intake: string;
  source: string;
  assignedTo: string;
  score: number;
  status: Status;
  createdAt: string;
  notes: string;
  timeline: { at: string; actor: string; event: string }[];
  activities: { kind: "call" | "email" | "note" | "meeting"; at: string; body: string }[];
  documents: { name: string; size: string; uploadedAt: string }[];
};

export const leadDetails: Record<string, LeadDetail> = {
  "ananya-sharma": {
    slug: "ananya-sharma",
    name: "Ananya Sharma",
    email: "ananya.s@gmail.com",
    phone: "+91 98200 12345",
    location: "Mumbai, Maharashtra",
    interest: "B.Tech Computer Science",
    budget: "₹8–12L / year",
    intake: "August 2026",
    source: "Website · College Predictor",
    assignedTo: "Priya Kapoor",
    score: 92,
    status: "Active",
    createdAt: "12 Feb 2026",
    notes:
      "Scored 98.7 percentile in JEE Main. Interested in IIT Bombay, BITS Pilani and IIIT Hyderabad. Parents supportive, no financial constraints.",
    timeline: [
      { at: "Just now", actor: "Priya K.", event: "Marked qualified — scheduled counseling session" },
      { at: "1h ago", actor: "System", event: "Score jumped to 92 (JEE result linked)" },
      { at: "2d ago", actor: "Priya K.", event: "First call · 22 min · high intent" },
      { at: "3d ago", actor: "System", event: "Lead created from College Predictor result" },
    ],
    activities: [
      { kind: "call", at: "2 days ago", body: "22 min discovery call. Confirmed CSE preference. Wants campus visit for IIT-B." },
      { kind: "email", at: "3 days ago", body: "Sent college shortlist PDF (IIT-B, BITS, IIIT-H, IIIT-B, NIT Trichy)." },
      { kind: "note", at: "3 days ago", body: "Parents will join next call. Prefers Mumbai/Bangalore." },
    ],
    documents: [
      { name: "JEE Main Scorecard.pdf", size: "412 KB", uploadedAt: "1 day ago" },
      { name: "Class 12 Marksheet.pdf", size: "1.1 MB", uploadedAt: "2 days ago" },
    ],
  },
  "rahul-verma": {
    slug: "rahul-verma",
    name: "Rahul Verma",
    email: "rahul.v@yahoo.in",
    phone: "+91 90045 88123",
    location: "Gurugram, Haryana",
    interest: "MBA — Marketing",
    budget: "₹18–24L total",
    intake: "July 2026",
    source: "Google Ads · MBA Landing",
    assignedTo: "Neha Dutta",
    score: 78,
    status: "Active",
    createdAt: "18 Feb 2026",
    notes:
      "3.5 years work-ex in FMCG (HUL). CAT 96.4 percentile. Targeting IIM A/B/C, ISB YLP.",
    timeline: [
      { at: "2h ago", actor: "Neha D.", event: "Sent GD-PI prep resources" },
      { at: "1d ago", actor: "Neha D.", event: "Second call · 35 min · interview prep" },
      { at: "5d ago", actor: "System", event: "Lead assigned to Neha D." },
    ],
    activities: [
      { kind: "meeting", at: "Yesterday", body: "Zoom call — reviewed profile, discussed college shortlist." },
      { kind: "email", at: "5 days ago", body: "Welcome email + IIM cutoffs 2026 report." },
    ],
    documents: [
      { name: "CAT Scorecard 2025.pdf", size: "298 KB", uploadedAt: "5 days ago" },
      { name: "CV — Rahul Verma.pdf", size: "182 KB", uploadedAt: "5 days ago" },
    ],
  },
  "meera-iyer": {
    slug: "meera-iyer",
    name: "Meera Iyer",
    email: "meera.iyer@outlook.com",
    phone: "+91 98450 30022",
    location: "Bangalore, Karnataka",
    interest: "MS Data Science — UK",
    budget: "£25–35k tuition",
    intake: "September 2026",
    source: "Instagram · Reel CTA",
    assignedTo: "Vikram P.",
    score: 85,
    status: "Pending",
    createdAt: "24 Feb 2026",
    notes: "IELTS 7.5. Targeting UCL, Imperial, Edinburgh. Needs help with SOP and scholarships.",
    timeline: [
      { at: "6h ago", actor: "Vikram P.", event: "Shared UCL SOP template" },
      { at: "2d ago", actor: "Vikram P.", event: "Intro call · 18 min" },
    ],
    activities: [
      { kind: "note", at: "6 hours ago", body: "Strong candidate for Chevening Scholarship. Deadline Nov 5." },
      { kind: "call", at: "2 days ago", body: "Confirmed IELTS score, discussed timeline for Sep 2026 intake." },
    ],
    documents: [{ name: "IELTS TRF.pdf", size: "521 KB", uploadedAt: "2 days ago" }],
  },
};

export const getLeadDetail = (slug: string): LeadDetail | undefined => leadDetails[slug];

// ---------- NOTIFICATIONS ----------
export type NotificationKind = "claim" | "lead" | "review" | "content" | "payment" | "system";

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  at: string;
  read: boolean;
  href?: string;
};

export const notifications: NotificationItem[] = [
  { id: "n1", kind: "lead", title: "New high-intent lead", body: "Ananya Sharma requested a counseling session for B.Tech CSE.", at: "2 min ago", read: false, href: "/admin/leads/ananya-sharma" },
  { id: "n2", kind: "claim", title: "College claim submitted", body: "MIT Manipal — Dr. R. Kumar uploaded verification documents.", at: "18 min ago", read: false, href: "/admin/claims" },
  { id: "n3", kind: "review", title: "Review flagged for moderation", body: "3 reports on review of IIM Bangalore by anon_9021.", at: "1 hour ago", read: false, href: "/admin/moderation" },
  { id: "n4", kind: "payment", title: "Payout processed", body: "₹1,24,500 sent to Career Mosaic Consultancy.", at: "3 hours ago", read: true, href: "/admin/consultancies" },
  { id: "n5", kind: "content", title: "Article published", body: "'GRE vs GMAT 2027' by Rahul is now live.", at: "5 hours ago", read: true, href: "/admin/blogs" },
  { id: "n6", kind: "system", title: "MEA import completed", body: "14 colleges auto-approved from the government feed.", at: "Yesterday", read: true },
  { id: "n7", kind: "lead", title: "Lead assignment update", body: "Vikram P. accepted 4 new UK study-abroad leads.", at: "Yesterday", read: true, href: "/admin/leads" },
  { id: "n8", kind: "claim", title: "Consultancy claim approved", body: "Edwise International is now a verified partner.", at: "2 days ago", read: true, href: "/admin/consultancies" },
  { id: "n9", kind: "review", title: "Bulk review sync", body: "128 new Google reviews imported for verified colleges.", at: "3 days ago", read: true },
  { id: "n10", kind: "system", title: "Backup completed", body: "Weekly database snapshot stored to cold storage.", at: "4 days ago", read: true },
];

// ---------- NAVIGATION BUILDER ----------
export type NavItem = {
  id: string;
  label: string;
  url: string;
  newTab?: boolean;
  cta?: boolean;
  mega?: boolean;
  badge?: string;
  visible?: boolean;
  children?: NavItem[];
};

export const defaultHeaderNav: NavItem[] = [
  {
    id: "colleges",
    label: "Colleges",
    url: "/colleges",
    mega: true,
    visible: true,
    children: [
      { id: "colleges-all", label: "All colleges", url: "/colleges", visible: true },
      { id: "colleges-compare", label: "Compare colleges", url: "/compare", visible: true },
      { id: "colleges-predictor", label: "College predictor", url: "/college-predictor", visible: true, badge: "AI" },
    ],
  },
  {
    id: "courses",
    label: "Courses",
    url: "/courses",
    visible: true,
    children: [
      { id: "courses-all", label: "All courses", url: "/courses", visible: true },
      { id: "courses-ug", label: "Undergraduate", url: "/courses", visible: true },
      { id: "courses-pg", label: "Postgraduate", url: "/courses", visible: true },
    ],
  },
  { id: "exams", label: "Exams", url: "/exams", visible: true },
  { id: "mock-tests", label: "Mock Tests", url: "/mock-tests", visible: true, badge: "Free" },
  { id: "study-abroad", label: "Study Abroad", url: "/study-abroad", visible: true },
  { id: "consultancies", label: "Consultancies", url: "/consultancies", visible: true },
  { id: "news", label: "News", url: "/news", visible: true },
  { id: "predictor", label: "Predictor", url: "/college-predictor", visible: true, cta: true },
];

// ---------- FOOTER BUILDER ----------
export type FooterColumn = { id: string; heading: string; links: { id: string; label: string; url: string }[] };

export const defaultFooterColumns: FooterColumn[] = [
  {
    id: "company",
    heading: "Company",
    links: [
      { id: "about", label: "About", url: "/about" },
      { id: "team", label: "Team", url: "/team" },
      { id: "careers", label: "Careers", url: "/careers" },
      { id: "press", label: "Press", url: "/press" },
    ],
  },
  {
    id: "discover",
    heading: "Discover",
    links: [
      { id: "colleges", label: "Colleges", url: "/colleges" },
      { id: "courses", label: "Courses", url: "/courses" },
      { id: "exams", label: "Exams", url: "/exams" },
      { id: "scholarships", label: "Scholarships", url: "/scholarships" },
    ],
  },
  {
    id: "prepare",
    heading: "Prepare",
    links: [
      { id: "mock", label: "Mock tests", url: "/mock-tests" },
      { id: "prep", label: "Exam prep", url: "/exam-prep" },
      { id: "counseling", label: "Counseling", url: "/counseling" },
      { id: "qna", label: "Q&A", url: "/questions" },
    ],
  },
  {
    id: "legal",
    heading: "Legal",
    links: [
      { id: "privacy", label: "Privacy", url: "/privacy" },
      { id: "terms", label: "Terms", url: "/terms" },
      { id: "claim", label: "Claim your college", url: "/claim-college" },
    ],
  },
];

export const footerMeta = {
  tagline: "India's most trusted education finder — colleges, courses, careers.",
  copyright: "© 2026 EduFinder Technologies Pvt Ltd.",
  socials: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "YouTube", url: "https://youtube.com" },
    { label: "X (Twitter)", url: "https://x.com" },
  ],
};
