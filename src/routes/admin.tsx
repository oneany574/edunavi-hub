import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, Building2, BookOpen, FileCheck2, ShieldAlert, Award, GraduationCap,
  Newspaper, Megaphone, Handshake, Globe2, BarChart3, Settings2, UserCircle2,
  Users, Bell, Compass, PanelBottom,
} from "lucide-react";
import { PanelShell, type PanelNavGroup } from "@/components/panel/panel-shell";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · EduFinder" }] }),
  component: AdminLayout,
});

const groups: PanelNavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
      { label: "Leads", to: "/admin/leads", icon: Users, badge: "1.2k" },
      { label: "Notifications", to: "/admin/notifications", icon: Bell, badge: "5" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Colleges", to: "/admin/colleges", icon: Building2, badge: "4.2k" },
      { label: "Courses", to: "/admin/courses", icon: BookOpen },
      { label: "Exams", to: "/admin/exams", icon: GraduationCap },
      { label: "Scholarships", to: "/admin/scholarships", icon: Award },
      { label: "Study Abroad", to: "/admin/study-abroad", icon: Globe2 },
      { label: "Consultancies", to: "/admin/consultancies", icon: Handshake },
    ],
  },
  {
    label: "Trust & content",
    items: [
      { label: "Claims", to: "/admin/claims", icon: FileCheck2, badge: "37" },
      { label: "Moderation", to: "/admin/moderation", icon: ShieldAlert, badge: "19" },
      { label: "Blogs & Articles", to: "/admin/blogs", icon: Newspaper },
      { label: "News", to: "/admin/news", icon: Megaphone },
    ],
  },
  {
    label: "Site builder",
    items: [
      { label: "Navigation", to: "/admin/navigation", icon: Compass },
      { label: "Footer", to: "/admin/footer", icon: PanelBottom },
    ],
  },
  {
    label: "Platform",
    items: [
      { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
      { label: "Settings", to: "/admin/settings", icon: Settings2 },
      { label: "My profile", to: "/admin/profile", icon: UserCircle2 },
    ],
  },
];

function AdminLayout() {
  return (
    <PanelShell
      brand="EduFinder Admin"
      brandBlurb="Control center"
      brandAccent="bg-brand"
      groups={groups}
      user={{ name: "Priya Kapoor", role: "Super admin", initials: "PK" }}
    >
      <BackToSite />
      <Outlet />
    </PanelShell>
  );
}

function BackToSite() {
  return (
    <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
      <Link to="/" className="hover:text-foreground">← Back to edufinder.com</Link>
      <span>·</span>
      <span>Environment: <span className="font-bold text-foreground">Production</span></span>
    </div>
  );
}
