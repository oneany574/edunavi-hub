import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Check, CheckCheck, FileCheck2, MessageSquare, Newspaper, Settings2, Users, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/panel/module-page";
import { notifications, type NotificationKind } from "@/lib/panel-leads";

export const Route = createFileRoute("/admin/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Admin" }] }),
  component: NotificationsPage,
});

const kindMeta: Record<NotificationKind, { icon: typeof Bell; tone: string; label: string }> = {
  claim: { icon: FileCheck2, tone: "bg-brand/10 text-brand", label: "Claim" },
  lead: { icon: Users, tone: "bg-success/15 text-success", label: "Lead" },
  review: { icon: MessageSquare, tone: "bg-destructive/15 text-destructive", label: "Moderation" },
  content: { icon: Newspaper, tone: "bg-academic/10 text-academic", label: "Content" },
  payment: { icon: Wallet, tone: "bg-gold-soft text-brand", label: "Payment" },
  system: { icon: Settings2, tone: "bg-muted text-muted-foreground", label: "System" },
};

function NotificationsPage() {
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Everything happening across colleges, leads, moderation, payments and platform events."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <CheckCheck className="size-3.5" /> Mark all read
            </Button>
            <Button size="sm" className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
              <Settings2 className="size-3.5" /> Preferences
            </Button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Badge className="border-0 bg-brand text-brand-foreground">{unread} unread</Badge>
        {(Object.keys(kindMeta) as NotificationKind[]).map((k) => {
          const count = notifications.filter((n) => n.kind === k).length;
          return (
            <Badge key={k} variant="outline" className="gap-1">
              {kindMeta[k].label} · {count}
            </Badge>
          );
        })}
      </div>

      <Card className="border-border">
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {notifications.map((n) => {
              const meta = kindMeta[n.kind];
              const Icon = meta.icon;
              const Row = (
                <div className={`flex items-start gap-4 p-4 transition-colors hover:bg-secondary/40 ${!n.read ? "bg-brand/[0.03]" : ""}`}>
                  <div className={`mt-0.5 grid size-10 shrink-0 place-items-center rounded-full ${meta.tone}`}>
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold">{n.title}</p>
                      <span className="shrink-0 text-[10px] text-muted-foreground">{n.at}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{meta.label}</Badge>
                      {!n.read && <span className="size-1.5 rounded-full bg-brand" aria-label="Unread" />}
                    </div>
                  </div>
                  {!n.read && (
                    <Button variant="ghost" size="icon" className="size-7 shrink-0" aria-label="Mark read">
                      <Check className="size-3.5" />
                    </Button>
                  )}
                </div>
              );
              return (
                <li key={n.id}>
                  {n.href ? <Link to={n.href}>{Row}</Link> : Row}
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
