import { createFileRoute } from "@tanstack/react-router";
import { AdminDetail } from "@/components/panel/detail-page";
import type { EntityDetail } from "@/lib/panel-detail-data";

const profile: EntityDetail = {
  entity: "profile",
  slug: "priya-kapoor",
  eyebrow: "Admin profile",
  title: "Priya Kapoor",
  subtitle: "Super admin · Trust & Safety · Bengaluru HQ",
  status: "Active",
  hero: [
    { label: "Role", value: "Super admin" },
    { label: "Team", value: "Trust & Safety" },
    { label: "Joined", value: "Mar 12, 2023" },
    { label: "Last active", value: "2 minutes ago" },
  ],
  summary:
    "Priya leads Trust & Safety for EduFinder. She oversees the college & consultancy claim pipeline, moderation queues, and platform policy. Reports to the COO.",
  sections: [
    {
      title: "Contact",
      fields: [
        { label: "Work email", value: "priya.kapoor@edufinder.com" },
        { label: "Personal email", value: "priya.k@gmail.com" },
        { label: "Phone", value: "+91 98456 12034" },
        { label: "Slack", value: "@priya" },
      ],
    },
    {
      title: "Permissions",
      bullets: [
        "Manage colleges, courses, exams, scholarships",
        "Approve/reject all claim requests",
        "Moderate reviews, Q&A and articles",
        "View platform analytics & revenue",
        "Manage user roles (super-admin only)",
      ],
    },
    {
      title: "Security",
      fields: [
        { label: "2FA", value: "Enabled · Authenticator app" },
        { label: "Passkey", value: "1 device (MacBook Pro)" },
        { label: "Sessions", value: "3 active" },
        { label: "Last password change", value: "48 days ago" },
      ],
    },
    {
      title: "Preferences",
      fields: [
        { label: "Language", value: "English (IN)" },
        { label: "Timezone", value: "Asia/Kolkata (IST)" },
        { label: "Notifications", value: "Email + Slack digest (daily 9am)" },
        { label: "Theme", value: "System" },
      ],
    },
  ],
  meta: [
    { label: "Employee ID", value: "EF-0142" },
    { label: "Manager", value: "Vikram Rao (COO)" },
    { label: "Direct reports", value: "6" },
    { label: "Country", value: "India" },
    { label: "Office", value: "Bengaluru HQ · Floor 4" },
  ],
  related: [
    {
      title: "Recent actions",
      items: [
        { kind: "Claim", name: "Approved BITS Pilani — Hyd" },
        { kind: "Moderation", name: "Removed review on MIT Manipal" },
        { kind: "College", name: "Edited IIT Bombay profile" },
      ],
    },
    {
      title: "Team",
      items: [
        { kind: "Admin", name: "Ravi Sethi", hint: "Moderator" },
        { kind: "Admin", name: "Ananya Iyer", hint: "Claims reviewer" },
        { kind: "Admin", name: "Karthik N.", hint: "Content editor" },
      ],
    },
  ],
  timeline: [
    { at: "2 min ago", actor: "Priya Kapoor", event: "Logged in from Bengaluru (Chrome / macOS)" },
    { at: "1 hour ago", actor: "System", event: "2FA challenge passed" },
    { at: "Yesterday", actor: "Priya Kapoor", event: "Approved 4 claims, edited 2 college pages" },
    { at: "3 days ago", actor: "System", event: "Role: Super admin — permissions unchanged" },
  ],
};

export const Route = createFileRoute("/admin/profile")({
  head: () => ({ meta: [{ title: "My profile · Admin" }] }),
  component: () => <AdminDetail backTo="/admin" backLabel="Back to dashboard" detail={profile} />,
});
