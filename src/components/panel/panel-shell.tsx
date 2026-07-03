import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, LogOut, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type PanelNavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
};

export type PanelNavGroup = {
  label: string;
  items: PanelNavItem[];
};

type Props = {
  brand: string;
  brandBlurb: string;
  brandAccent?: string;
  groups: PanelNavGroup[];
  user: { name: string; role: string; initials: string };
  children: ReactNode;
};

export function PanelShell({ brand, brandBlurb, brandAccent = "bg-brand", groups, user, children }: Props) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-secondary/30">
        <PanelSidebar brand={brand} brandBlurb={brandBlurb} brandAccent={brandAccent} groups={groups} user={user} />
        <div className="flex min-w-0 flex-1 flex-col">
          <PanelTopBar user={user} />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function PanelSidebar({ brand, brandBlurb, brandAccent, groups, user }: Omit<Props, "children">) {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (to: string) => pathname === to || (to !== "/" && pathname.startsWith(to + "/"));
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className={`grid size-9 shrink-0 place-items-center rounded-xl ${brandAccent} text-brand-foreground font-display text-lg`}>
            {brand[0]}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{brand}</p>
              <p className="truncate text-[11px] text-muted-foreground">{brandBlurb}</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest">
              {g.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={item.label}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="size-4" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px] font-bold">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <Avatar className="size-8">
            <AvatarFallback className="bg-academic text-xs font-bold text-white">{user.initials}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold">{user.name}</p>
              <p className="truncate text-[10px] text-muted-foreground">{user.role}</p>
            </div>
          )}
          {!collapsed && (
            <Button variant="ghost" size="icon" className="size-7">
              <LogOut className="size-3.5" />
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function PanelTopBar({ user }: { user: Props["user"] }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur md:px-8">
      <SidebarTrigger />
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search anything…" className="h-9 pl-9" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
        </Button>
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-2 py-1 sm:flex">
          <Avatar className="size-6">
            <AvatarFallback className="bg-academic text-[10px] font-bold text-white">{user.initials}</AvatarFallback>
          </Avatar>
          <span className="pr-2 text-xs font-bold">{user.name}</span>
        </div>
      </div>
    </header>
  );
}
