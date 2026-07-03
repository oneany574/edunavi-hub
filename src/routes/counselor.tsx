import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, CalendarClock, Users, User2, MessageSquare, Wallet, FileCheck2, Star } from "lucide-react";
import { PanelShell, type PanelNavGroup } from "@/components/panel/panel-shell";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/counselor")({
  head: () => ({ meta: [{ title: "Counselor panel · EduFinder" }] }),
  component: CounselorLayout,
});

const groups: PanelNavGroup[] = [
  { label: "Overview", items: [{ label: "Dashboard", to: "/counselor", icon: LayoutDashboard }] },
  {
    label: "Work",
    items: [
      { label: "Sessions", to: "/counselor/sessions", icon: CalendarClock, badge: "4" },
      { label: "My students", to: "/counselor/students", icon: Users },
      { label: "Messages", to: "/counselor/messages", icon: MessageSquare, badge: "2" },
      { label: "Reviews", to: "/counselor/reviews", icon: Star },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Profile", to: "/counselor/profile", icon: User2 },
      { label: "Earnings & payouts", to: "/counselor/earnings", icon: Wallet },
      { label: "Consultancy claim", to: "/counselor/claim", icon: FileCheck2 },
    ],
  },
];

function CounselorLayout() {
  return (
    <PanelShell
      brand="Sneha Rao"
      brandBlurb="Independent counselor · US/UK MS"
      brandAccent="bg-gold"
      groups={groups}
      user={{ name: "Sneha Rao", role: "Counselor · Verified", initials: "SR" }}
    >
      <div className="mb-4 flex items-center gap-2 text-xs">
        <Link to="/" className="text-muted-foreground hover:text-foreground">← Back to edufinder.com</Link>
        <span className="text-muted-foreground">·</span>
        <Badge className="border-0 bg-gold-soft text-brand">Independent · 4.9★</Badge>
      </div>
      <Outlet />
    </PanelShell>
  );
}
