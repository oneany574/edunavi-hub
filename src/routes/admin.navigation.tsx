import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  GraduationCap,
  GripVertical,
  Layers,
  Link2,
  Monitor,
  Plus,
  RotateCcw,
  Save,
  Search,
  Smartphone,
  Sparkles,
  Trash2,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/panel/module-page";
import { defaultHeaderNav, type NavItem } from "@/lib/panel-leads";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/navigation")({
  head: () => ({ meta: [{ title: "Navigation builder · Admin" }] }),
  component: NavigationBuilder,
});

// ---------- helpers ----------
type Path = { top: number; child?: number };

function findPath(nav: NavItem[], id: string): Path | null {
  for (let i = 0; i < nav.length; i++) {
    if (nav[i].id === id) return { top: i };
    const kids = nav[i].children ?? [];
    for (let j = 0; j < kids.length; j++) {
      if (kids[j].id === id) return { top: i, child: j };
    }
  }
  return null;
}

function flatten(nav: NavItem[]): NavItem[] {
  return nav.flatMap((n) => [n, ...(n.children ?? [])]);
}

function newId(prefix = "n") {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function NavigationBuilder() {
  const [nav, setNav] = useState<NavItem[]>(defaultHeaderNav);
  const [selectedId, setSelectedId] = useState<string>(defaultHeaderNav[0].id);
  const [history, setHistory] = useState<NavItem[][]>([]);
  const [preview, setPreview] = useState<"desktop" | "mobile">("desktop");
  const [query, setQuery] = useState("");

  const commit = (next: NavItem[]) => {
    setHistory((h) => [...h.slice(-19), nav]);
    setNav(next);
  };

  const undo = () => {
    setHistory((h) => {
      if (!h.length) return h;
      const prev = h[h.length - 1];
      setNav(prev);
      return h.slice(0, -1);
    });
  };

  const reset = () => {
    commit(defaultHeaderNav);
    toast.success("Navigation reset to default");
  };

  const publish = () => toast.success("Navigation published to edufinder.com");

  const selected = useMemo(() => flatten(nav).find((n) => n.id === selectedId) ?? nav[0], [nav, selectedId]);
  const selectedPath = useMemo(() => findPath(nav, selected.id), [nav, selected.id]);

  // ---------- mutations ----------
  const update = (id: string, patch: Partial<NavItem>) => {
    commit(
      nav.map((n) => {
        if (n.id === id) return { ...n, ...patch };
        return { ...n, children: n.children?.map((c) => (c.id === id ? { ...c, ...patch } : c)) };
      }),
    );
  };

  const addTop = () => {
    const item: NavItem = { id: newId(), label: "New link", url: "/", visible: true };
    commit([...nav, item]);
    setSelectedId(item.id);
    toast("Top-level link added");
  };

  const addChild = (parentId: string) => {
    const item: NavItem = { id: newId(), label: "New child", url: "/", visible: true };
    commit(
      nav.map((n) => (n.id === parentId ? { ...n, children: [...(n.children ?? []), item] } : n)),
    );
    setSelectedId(item.id);
  };

  const remove = (id: string) => {
    commit(
      nav
        .filter((n) => n.id !== id)
        .map((n) => ({ ...n, children: n.children?.filter((c) => c.id !== id) })),
    );
    if (selectedId === id) setSelectedId(nav[0]?.id ?? "");
  };

  const duplicate = (id: string) => {
    const path = findPath(nav, id);
    if (!path) return;
    if (path.child === undefined) {
      const src = nav[path.top];
      const copy: NavItem = { ...src, id: newId(), label: `${src.label} copy`, children: src.children?.map((c) => ({ ...c, id: newId() })) };
      const next = [...nav];
      next.splice(path.top + 1, 0, copy);
      commit(next);
      setSelectedId(copy.id);
    } else {
      const parent = nav[path.top];
      const src = parent.children![path.child];
      const copy: NavItem = { ...src, id: newId(), label: `${src.label} copy` };
      const kids = [...parent.children!];
      kids.splice(path.child + 1, 0, copy);
      commit(nav.map((n, i) => (i === path.top ? { ...n, children: kids } : n)));
      setSelectedId(copy.id);
    }
  };

  const move = (id: string, dir: -1 | 1) => {
    const path = findPath(nav, id);
    if (!path) return;
    if (path.child === undefined) {
      const idx = path.top;
      const to = idx + dir;
      if (to < 0 || to >= nav.length) return;
      const next = [...nav];
      [next[idx], next[to]] = [next[to], next[idx]];
      commit(next);
    } else {
      const parent = nav[path.top];
      const kids = [...parent.children!];
      const idx = path.child;
      const to = idx + dir;
      if (to < 0 || to >= kids.length) return;
      [kids[idx], kids[to]] = [kids[to], kids[idx]];
      commit(nav.map((n, i) => (i === path.top ? { ...n, children: kids } : n)));
    }
  };

  const promote = (id: string) => {
    // move child up to top level
    const path = findPath(nav, id);
    if (!path || path.child === undefined) return;
    const parent = nav[path.top];
    const item = parent.children![path.child];
    const kids = parent.children!.filter((_, i) => i !== path.child);
    const next = nav.map((n, i) => (i === path.top ? { ...n, children: kids } : n));
    next.splice(path.top + 1, 0, item);
    commit(next);
  };

  const demote = (id: string) => {
    // nest under previous top-level sibling
    const path = findPath(nav, id);
    if (!path || path.child !== undefined || path.top === 0) return;
    const item = nav[path.top];
    if (item.children?.length) {
      toast.error("Nest sub-links first before demoting");
      return;
    }
    const prev = nav[path.top - 1];
    const next = nav.filter((_, i) => i !== path.top).map((n, i) =>
      i === path.top - 1 ? { ...n, children: [...(prev.children ?? []), { ...item, mega: false }] } : n,
    );
    commit(next);
  };

  // ---------- filter ----------
  const filtered = query
    ? nav
        .map((n) => ({
          ...n,
          children: n.children?.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())),
        }))
        .filter(
          (n) => n.label.toLowerCase().includes(query.toLowerCase()) || (n.children && n.children.length > 0),
        )
    : nav;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site structure"
        title="Navigation builder"
        description="Design the public site header. Reorder, nest into dropdowns, toggle mega menus and CTAs, and preview exactly how the header will render on desktop and mobile."
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={undo} disabled={!history.length}>
              <Undo2 className="size-3.5" /> Undo
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5" onClick={reset}>
              <RotateCcw className="size-3.5" /> Reset
            </Button>
            <Button size="sm" className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90" onClick={publish}>
              <Save className="size-3.5" /> Publish
            </Button>
          </>
        }
      />

      <Tabs defaultValue="header">
        <TabsList>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="mobile">Mobile drawer</TabsTrigger>
          <TabsTrigger value="panels">Panels</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="mt-4 space-y-6">
          {/* Live preview */}
          <Card className="border-border overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-2">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Live preview</p>
                <Badge variant="outline" className="h-5 text-[10px]">edufinder.com</Badge>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-border bg-background p-0.5">
                <button
                  onClick={() => setPreview("desktop")}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${preview === "desktop" ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}
                >
                  <Monitor className="size-3" /> Desktop
                </button>
                <button
                  onClick={() => setPreview("mobile")}
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${preview === "mobile" ? "bg-brand text-brand-foreground" : "text-muted-foreground"}`}
                >
                  <Smartphone className="size-3" /> Mobile
                </button>
              </div>
            </div>
            <div className="bg-muted/30 p-6">
              {preview === "desktop" ? <DesktopPreview nav={nav} /> : <MobilePreview nav={nav} />}
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            {/* Tree */}
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search links…"
                      className="h-9 pl-8"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={addTop}>
                    <Plus className="size-3.5" /> Link
                  </Button>
                </div>

                <div className="flex items-center justify-between px-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Menu tree · {nav.length} top-level</span>
                  <span>{flatten(nav).length} total</span>
                </div>

                <ul className="space-y-1">
                  {filtered.map((item) => (
                    <NavTreeItem
                      key={item.id}
                      item={item}
                      nav={nav}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      onAddChild={addChild}
                      onRemove={remove}
                      onDuplicate={duplicate}
                      onMove={move}
                      onToggleVisible={(id, v) => update(id, { visible: v })}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <li className="grid place-items-center rounded-xl border border-dashed border-border py-10 text-sm text-muted-foreground">
                      No links match "{query}"
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Inspector */}
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Edit link</p>
                    <h3 className="font-display mt-1 text-xl">{selected.label}</h3>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {selectedPath?.child === undefined ? "Top-level" : "Child link"}
                  </Badge>
                </div>
                <Separator className="my-4" />

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="nav-label">Label</Label>
                    <Input id="nav-label" value={selected.label} onChange={(e) => update(selected.id, { label: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nav-url">Destination URL</Label>
                    <div className="relative">
                      <Link2 className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="nav-url"
                        value={selected.url}
                        onChange={(e) => update(selected.id, { url: e.target.value })}
                        className="pl-8 font-mono-tight text-xs"
                        placeholder="/route or https://…"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nav-badge">Badge (optional)</Label>
                    <Input
                      id="nav-badge"
                      value={selected.badge ?? ""}
                      onChange={(e) => update(selected.id, { badge: e.target.value || undefined })}
                      placeholder="e.g. New, AI, Free"
                    />
                  </div>

                  <Toggle
                    label="Visible in header"
                    hint="Hidden links stay in the tree but do not render publicly"
                    icon={selected.visible === false ? EyeOff : Eye}
                    checked={selected.visible !== false}
                    onChange={(v) => update(selected.id, { visible: v })}
                  />
                  <Toggle
                    label="Open in new tab"
                    hint={`Adds target="_blank" rel="noopener"`}
                    icon={ExternalLink}
                    checked={!!selected.newTab}
                    onChange={(v) => update(selected.id, { newTab: v })}
                  />
                  <Toggle
                    label="Highlight as CTA"
                    hint="Styles the link as a solid brand button"
                    icon={Sparkles}
                    checked={!!selected.cta}
                    onChange={(v) => update(selected.id, { cta: v })}
                  />
                  {selectedPath?.child === undefined && (
                    <Toggle
                      label="Mega dropdown"
                      hint="Show child links inside a large panel on hover"
                      icon={Layers}
                      checked={!!selected.mega}
                      onChange={(v) => update(selected.id, { mega: v })}
                    />
                  )}

                  <Separator />

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => duplicate(selected.id)}>
                      <Copy className="size-3.5" /> Duplicate
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => addChild(selected.id)}>
                      <Plus className="size-3.5" /> Sub-link
                    </Button>
                    {selectedPath?.child !== undefined ? (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => promote(selected.id)}>
                        <ChevronsUpDown className="size-3.5" /> Promote
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="gap-1.5" onClick={() => demote(selected.id)}>
                        <ChevronsUpDown className="size-3.5" /> Nest
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 text-destructive hover:text-destructive"
                      onClick={() => remove(selected.id)}
                    >
                      <Trash2 className="size-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-6">
              <MobilePreview nav={nav} />
              <p className="mt-4 text-xs text-muted-foreground">
                The mobile drawer mirrors the header tree above. Hide items via the eye icon to remove them from mobile only.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="panels" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Panel navigation (Admin, College, Counselor) is managed by product engineering and is read-only in the builder.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------- inspector toggle ----------
function Toggle({
  label,
  hint,
  icon: Icon,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3">
      <div className="flex items-start gap-2.5">
        <div className="mt-0.5 grid size-7 place-items-center rounded-lg bg-background">
          <Icon className="size-3.5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-xs text-muted-foreground">{hint}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

// ---------- tree item ----------
function NavTreeItem({
  item,
  nav,
  selectedId,
  onSelect,
  onAddChild,
  onRemove,
  onDuplicate,
  onMove,
  onToggleVisible,
  depth = 0,
}: {
  item: NavItem;
  nav: NavItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddChild: (id: string) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onToggleVisible: (id: string, v: boolean) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const active = selectedId === item.id;
  const hidden = item.visible === false;

  return (
    <li>
      <div
        className={`group flex items-center gap-2 rounded-lg border px-2 py-2 transition-colors ${
          active ? "border-brand bg-brand/5" : "border-transparent hover:bg-secondary/60"
        } ${hidden ? "opacity-60" : ""}`}
        style={{ paddingLeft: 8 + depth * 20 }}
      >
        <GripVertical className="size-3.5 shrink-0 cursor-grab text-muted-foreground" />
        {hasChildren ? (
          <button
            className="grid size-5 place-items-center rounded hover:bg-secondary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle"
          >
            {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </button>
        ) : (
          <span className="size-5" />
        )}
        <button className="min-w-0 flex-1 text-left" onClick={() => onSelect(item.id)}>
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold">{item.label}</p>
            {item.badge && <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">{item.badge}</Badge>}
            {item.cta && <Badge className="h-4 bg-brand px-1.5 text-[9px] text-brand-foreground">CTA</Badge>}
            {item.mega && <Badge variant="outline" className="h-4 px-1.5 text-[9px]">Mega</Badge>}
            {item.newTab && <ExternalLink className="size-3 text-muted-foreground" />}
          </div>
          <p className="truncate font-mono-tight text-[10px] text-muted-foreground">{item.url}</p>
        </button>
        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
          <IconBtn label="Move up" onClick={() => onMove(item.id, -1)}>↑</IconBtn>
          <IconBtn label="Move down" onClick={() => onMove(item.id, 1)}>↓</IconBtn>
          <IconBtn label={hidden ? "Show" : "Hide"} onClick={() => onToggleVisible(item.id, hidden)}>
            {hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </IconBtn>
          <IconBtn label="Duplicate" onClick={() => onDuplicate(item.id)}>
            <Copy className="size-3.5" />
          </IconBtn>
          {depth === 0 && (
            <IconBtn label="Add child" onClick={() => onAddChild(item.id)}>
              <Plus className="size-3.5" />
            </IconBtn>
          )}
          <IconBtn label="Remove" onClick={() => onRemove(item.id)} destructive>
            <Trash2 className="size-3.5" />
          </IconBtn>
        </div>
      </div>
      {hasChildren && open && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((c) => (
            <NavTreeItem
              key={c.id}
              item={c}
              nav={nav}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddChild={onAddChild}
              onRemove={onRemove}
              onDuplicate={onDuplicate}
              onMove={onMove}
              onToggleVisible={onToggleVisible}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  destructive,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid size-6 place-items-center rounded text-xs hover:bg-secondary ${
        destructive ? "text-destructive" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

// ---------- previews ----------
function visibleItems(nav: NavItem[]) {
  return nav
    .filter((n) => n.visible !== false)
    .map((n) => ({ ...n, children: n.children?.filter((c) => c.visible !== false) }));
}

function DesktopPreview({ nav }: { nav: NavItem[] }) {
  const items = visibleItems(nav);
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground">
              <GraduationCap className="size-4" />
            </div>
            <span className="font-display text-lg font-semibold">EduFinder</span>
          </div>
          <nav className="flex items-center gap-0.5">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.cta ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1.5 text-xs font-semibold text-brand-foreground">
                    {item.label}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium text-foreground/80 hover:bg-secondary">
                    {item.label}
                    {item.badge && (
                      <span className="ml-0.5 rounded bg-gold/20 px-1 text-[9px] font-bold text-gold-foreground">
                        {item.badge}
                      </span>
                    )}
                    {item.children?.length ? <ChevronDown className="size-3 opacity-60" /> : null}
                  </span>
                )}

                {item.children?.length && hovered === item.id && (
                  <div
                    className={`absolute left-0 top-full z-10 pt-2 ${item.mega ? "w-[420px]" : "w-56"}`}
                  >
                    <div className="rounded-xl border border-border bg-card p-2 shadow-lg">
                      <p className="mb-1 px-2 pt-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                        {item.mega ? `Browse ${item.label.toLowerCase()}` : item.label}
                      </p>
                      <div className={item.mega ? "grid grid-cols-2 gap-0.5" : "flex flex-col"}>
                        {item.children.map((c) => (
                          <div
                            key={c.id}
                            className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-foreground hover:bg-secondary"
                          >
                            <span className="truncate">{c.label}</span>
                            {c.badge && (
                              <span className="rounded bg-secondary px-1 text-[9px] font-bold">
                                {c.badge}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground">Log in</span>
          <span className="rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-semibold text-brand-foreground">Join free</span>
        </div>
      </div>
    </div>
  );
}

function MobilePreview({ nav }: { nav: NavItem[] }) {
  const items = visibleItems(nav);
  return (
    <div className="mx-auto w-[340px] overflow-hidden rounded-[32px] border-4 border-foreground/80 bg-background shadow-xl">
      <div className="flex h-8 items-center justify-center bg-foreground/80 text-[10px] text-background">
        edufinder.com
      </div>
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-lg bg-brand text-brand-foreground">
            <GraduationCap className="size-3.5" />
          </div>
          <span className="font-display text-sm font-semibold">EduFinder</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="h-0.5 w-4 rounded bg-foreground" />
          <span className="h-0.5 w-4 rounded bg-foreground" />
        </div>
      </div>
      <div className="max-h-[400px] space-y-0.5 overflow-y-auto p-3">
        {items.map((item) => (
          <div key={item.id}>
            <div
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm ${
                item.cta ? "bg-brand text-brand-foreground font-semibold" : "hover:bg-secondary"
              }`}
            >
              <span className="flex items-center gap-2">
                {item.label}
                {item.badge && (
                  <span className={`rounded px-1 text-[9px] font-bold ${item.cta ? "bg-brand-foreground/20" : "bg-gold/20 text-gold-foreground"}`}>
                    {item.badge}
                  </span>
                )}
              </span>
              {item.children?.length ? <ChevronDown className="size-3.5 opacity-60" /> : null}
            </div>
            {item.children?.length ? (
              <div className="ml-3 space-y-0.5 border-l border-border pl-3">
                {item.children.map((c) => (
                  <div key={c.id} className="rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary">
                    {c.label}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
