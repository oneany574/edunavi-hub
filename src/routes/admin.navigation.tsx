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
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import { streams } from "@/lib/edufinder-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/navigation")({
  head: () => ({ meta: [{ title: "Navigation builder · Admin" }] }),
  component: NavigationBuilder,
});

type Path = { top: number; child?: number };

function findPath(nav: NavItem[], id: string): Path | null {
  for (let i = 0; i < nav.length; i++) {
    if (nav[i].id === id) return { top: i };
    const kids = nav[i].children ?? [];
    for (let j = 0; j < kids.length; j++) if (kids[j].id === id) return { top: i, child: j };
  }
  return null;
}
const flatten = (nav: NavItem[]) => nav.flatMap((n) => [n, ...(n.children ?? [])]);
const newId = () => `n-${Math.random().toString(36).slice(2, 8)}`;

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
  const undo = () =>
    setHistory((h) => {
      if (!h.length) return h;
      setNav(h[h.length - 1]);
      return h.slice(0, -1);
    });
  const reset = () => {
    commit(defaultHeaderNav);
    toast.success("Navigation reset to default");
  };
  const publish = () => toast.success("Navigation published to edufinder.com");

  const selected = useMemo(() => flatten(nav).find((n) => n.id === selectedId) ?? nav[0], [nav, selectedId]);
  const selectedPath = useMemo(() => findPath(nav, selected.id), [nav, selected.id]);

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
  };
  const addChild = (parentId: string) => {
    const item: NavItem = { id: newId(), label: "New child", url: "/", visible: true };
    commit(nav.map((n) => (n.id === parentId ? { ...n, children: [...(n.children ?? []), item] } : n)));
    setSelectedId(item.id);
  };
  const remove = (id: string) => {
    commit(nav.filter((n) => n.id !== id).map((n) => ({ ...n, children: n.children?.filter((c) => c.id !== id) })));
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
  const promote = (id: string) => {
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
    const path = findPath(nav, id);
    if (!path || path.child !== undefined || path.top === 0) return;
    const item = nav[path.top];
    if (item.children?.length) {
      toast.error("This link has children — nest or delete them first");
      return;
    }
    const prev = nav[path.top - 1];
    const next = nav.filter((_, i) => i !== path.top).map((n, i) =>
      i === path.top - 1 ? { ...n, children: [...(prev.children ?? []), { ...item, mega: false }] } : n,
    );
    commit(next);
  };

  // ---------- DnD ----------
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleTopDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = nav.findIndex((n) => n.id === active.id);
    const to = nav.findIndex((n) => n.id === over.id);
    if (from === -1 || to === -1) return;
    commit(arrayMove(nav, from, to));
  };

  const handleChildDragEnd = (parentId: string) => (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    commit(
      nav.map((n) => {
        if (n.id !== parentId || !n.children) return n;
        const from = n.children.findIndex((c) => c.id === active.id);
        const to = n.children.findIndex((c) => c.id === over.id);
        if (from === -1 || to === -1) return n;
        return { ...n, children: arrayMove(n.children, from, to) };
      }),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site structure"
        title="Navigation builder"
        description="Design the public site header. Drag to reorder, nest into dropdowns, toggle mega menus and CTAs, and preview exactly how the header renders on desktop and mobile."
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
          <Card className="border-border">
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
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search links…" className="h-9 pl-8" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={addTop}>
                    <Plus className="size-3.5" /> Link
                  </Button>
                </div>
                <div className="flex items-center justify-between px-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>Drag to reorder · {nav.length} top-level</span>
                  <span>{flatten(nav).length} total</span>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleTopDragEnd}>
                  <SortableContext items={nav.map((n) => n.id)} strategy={verticalListSortingStrategy}>
                    <ul className="space-y-1">
                      {nav.map((item) => (
                        <SortableTopItem
                          key={item.id}
                          item={item}
                          query={query}
                          selectedId={selectedId}
                          onSelect={setSelectedId}
                          onAddChild={addChild}
                          onRemove={remove}
                          onDuplicate={duplicate}
                          onToggleVisible={(id, v) => update(id, { visible: v })}
                          onChildDragEnd={handleChildDragEnd(item.id)}
                          sensors={sensors}
                        />
                      ))}
                    </ul>
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Edit link</p>
                    <h3 className="font-display mt-1 text-xl">{selected.label}</h3>
                  </div>
                  <Badge variant="secondary" className="text-[10px]">
                    {selectedPath?.child === undefined ? "Top-level" : "Child"}
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
                      <Input id="nav-url" value={selected.url} onChange={(e) => update(selected.id, { url: e.target.value })} className="pl-8 font-mono-tight text-xs" placeholder="/route or https://…" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nav-badge">Badge (optional)</Label>
                    <Input id="nav-badge" value={selected.badge ?? ""} onChange={(e) => update(selected.id, { badge: e.target.value || undefined })} placeholder="e.g. New, AI, Free" />
                  </div>

                  <Toggle label="Visible in header" hint="Hidden links stay in the tree but don't render publicly" icon={selected.visible === false ? EyeOff : Eye} checked={selected.visible !== false} onChange={(v) => update(selected.id, { visible: v })} />
                  <Toggle label="Open in new tab" hint={`Adds target="_blank" rel="noopener"`} icon={ExternalLink} checked={!!selected.newTab} onChange={(v) => update(selected.id, { newTab: v })} />
                  <Toggle label="Highlight as CTA" hint="Renders as a solid brand button" icon={Sparkles} checked={!!selected.cta} onChange={(v) => update(selected.id, { cta: v })} />
                  {selectedPath?.child === undefined && (
                    <Toggle label="Mega dropdown" hint="Show the streams grid panel on hover" icon={Layers} checked={!!selected.mega} onChange={(v) => update(selected.id, { mega: v })} />
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
                    <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={() => remove(selected.id)}>
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
              <p className="mt-4 text-xs text-muted-foreground">The mobile drawer mirrors the header tree. Hide items via the eye icon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="panels" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-6 text-sm text-muted-foreground">
              Panel navigation (Admin, College, Counselor) is managed by product engineering and is read-only.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ---------- inspector toggle ----------
function Toggle({
  label, hint, icon: Icon, checked, onChange,
}: { label: string; hint: string; icon: React.ComponentType<{ className?: string }>; checked: boolean; onChange: (v: boolean) => void }) {
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

// ---------- sortable rows ----------
function SortableTopItem({
  item, query, selectedId, onSelect, onAddChild, onRemove, onDuplicate, onToggleVisible, onChildDragEnd, sensors,
}: {
  item: NavItem;
  query: string;
  selectedId: string;
  onSelect: (id: string) => void;
  onAddChild: (id: string) => void;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onToggleVisible: (id: string, v: boolean) => void;
  onChildDragEnd: (e: DragEndEvent) => void;
  sensors: ReturnType<typeof useSensors>;
}) {
  const [open, setOpen] = useState(true);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  const children = item.children ?? [];
  const q = query.toLowerCase();
  const matchesSelf = !q || item.label.toLowerCase().includes(q);
  const filteredChildren = q ? children.filter((c) => c.label.toLowerCase().includes(q)) : children;
  if (q && !matchesSelf && filteredChildren.length === 0) return null;

  return (
    <li ref={setNodeRef} style={style}>
      <Row
        item={item}
        depth={0}
        active={selectedId === item.id}
        dragHandleProps={{ ...attributes, ...listeners }}
        hasChildren={children.length > 0}
        open={open}
        onToggleOpen={() => setOpen((o) => !o)}
        onSelect={() => onSelect(item.id)}
        onAddChild={() => onAddChild(item.id)}
        onRemove={() => onRemove(item.id)}
        onDuplicate={() => onDuplicate(item.id)}
        onToggleVisible={() => onToggleVisible(item.id, item.visible === false)}
      />
      {children.length > 0 && open && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onChildDragEnd}>
          <SortableContext items={filteredChildren.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <ul className="mt-1 space-y-1">
              {filteredChildren.map((c) => (
                <SortableChildItem
                  key={c.id}
                  item={c}
                  active={selectedId === c.id}
                  onSelect={() => onSelect(c.id)}
                  onRemove={() => onRemove(c.id)}
                  onDuplicate={() => onDuplicate(c.id)}
                  onToggleVisible={() => onToggleVisible(c.id, c.visible === false)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </li>
  );
}

function SortableChildItem({
  item, active, onSelect, onRemove, onDuplicate, onToggleVisible,
}: {
  item: NavItem;
  active: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onToggleVisible: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 };
  return (
    <li ref={setNodeRef} style={style}>
      <Row
        item={item}
        depth={1}
        active={active}
        dragHandleProps={{ ...attributes, ...listeners }}
        hasChildren={false}
        open={false}
        onToggleOpen={() => {}}
        onSelect={onSelect}
        onAddChild={() => {}}
        onRemove={onRemove}
        onDuplicate={onDuplicate}
        onToggleVisible={onToggleVisible}
      />
    </li>
  );
}

function Row({
  item, depth, active, dragHandleProps, hasChildren, open, onToggleOpen,
  onSelect, onAddChild, onRemove, onDuplicate, onToggleVisible,
}: {
  item: NavItem;
  depth: number;
  active: boolean;
  dragHandleProps: React.HTMLAttributes<HTMLButtonElement>;
  hasChildren: boolean;
  open: boolean;
  onToggleOpen: () => void;
  onSelect: () => void;
  onAddChild: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onToggleVisible: () => void;
}) {
  const hidden = item.visible === false;
  return (
    <div
      className={`group flex items-center gap-2 rounded-lg border px-2 py-2 transition-colors ${
        active ? "border-brand bg-brand/5" : "border-transparent hover:bg-secondary/60"
      } ${hidden ? "opacity-60" : ""}`}
      style={{ paddingLeft: 8 + depth * 20 }}
    >
      <button
        type="button"
        {...dragHandleProps}
        aria-label="Drag"
        className="grid size-5 shrink-0 cursor-grab place-items-center text-muted-foreground active:cursor-grabbing"
      >
        <GripVertical className="size-3.5" />
      </button>
      {hasChildren ? (
        <button className="grid size-5 place-items-center rounded hover:bg-secondary" onClick={onToggleOpen} aria-label="Toggle">
          {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
        </button>
      ) : (
        <span className="size-5" />
      )}
      <button className="min-w-0 flex-1 text-left" onClick={onSelect}>
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-semibold">{item.label}</p>
          {item.badge && <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">{item.badge}</Badge>}
          {item.cta && <Badge className="h-4 bg-brand px-1.5 text-[9px] text-brand-foreground">CTA</Badge>}
          {item.mega && <Badge variant="outline" className="h-4 px-1.5 text-[9px]">Mega</Badge>}
          {item.newTab && <ExternalLink className="size-3 text-muted-foreground" />}
        </div>
        <p className="truncate font-mono-tight text-[10px] text-muted-foreground">{item.url}</p>
      </button>
      <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <IconBtn label={hidden ? "Show" : "Hide"} onClick={onToggleVisible}>
          {hidden ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
        </IconBtn>
        <IconBtn label="Duplicate" onClick={onDuplicate}><Copy className="size-3.5" /></IconBtn>
        {depth === 0 && <IconBtn label="Add child" onClick={onAddChild}><Plus className="size-3.5" /></IconBtn>}
        <IconBtn label="Remove" onClick={onRemove} destructive><Trash2 className="size-3.5" /></IconBtn>
      </div>
    </div>
  );
}

function IconBtn({ children, onClick, label, destructive }: { children: React.ReactNode; onClick: () => void; label: string; destructive?: boolean }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label}
      className={`grid size-6 place-items-center rounded text-xs hover:bg-secondary ${destructive ? "text-destructive" : "text-muted-foreground"}`}>
      {children}
    </button>
  );
}

// ---------- previews ----------
function visibleItems(nav: NavItem[]) {
  return nav.filter((n) => n.visible !== false).map((n) => ({ ...n, children: n.children?.filter((c) => c.visible !== false) }));
}

function DesktopPreview({ nav }: { nav: NavItem[] }) {
  const items = visibleItems(nav);
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-background shadow-sm">
      {/* Announcement bar to match real site */}
      <div className="rounded-t-2xl bg-brand px-6 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-foreground">
        <span className="inline-flex items-center gap-1.5"><Sparkles className="size-3 text-gold" /> Admissions 2027 are open</span>
      </div>
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">
              <GraduationCap className="size-5" />
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">EduFinder</span>
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
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold text-brand-foreground">
                    {item.label}
                  </span>
                ) : (
                  <span className="inline-flex cursor-default items-center gap-1 rounded-full px-3 py-2 text-xs font-medium text-foreground/80 hover:bg-secondary">
                    {item.label}
                    {item.badge && <span className="ml-1 rounded bg-gold/20 px-1 text-[9px] font-bold text-gold-foreground">{item.badge}</span>}
                    {item.children?.length ? <ChevronDown className="size-3 opacity-60" /> : null}
                  </span>
                )}

                {item.children?.length && hovered === item.id && (
                  <div
                    className={`absolute left-1/2 top-full z-20 -translate-x-1/2 pt-3 ${item.mega ? "w-[560px]" : "w-60"}`}
                  >
                    {item.mega ? (
                      <div className="rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-brand/10">
                        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Browse by stream</p>
                        <div className="grid grid-cols-2 gap-1">
                          {streams.slice(0, 6).map((s) => (
                            <div key={s.slug} className="flex items-start gap-2.5 rounded-2xl p-2.5 hover:bg-secondary">
                              <div className="mt-1 size-1.5 rounded-full bg-academic" />
                              <div className="min-w-0">
                                <p className="truncate text-xs font-semibold">{s.name}</p>
                                <p className="truncate text-[10px] text-muted-foreground">{s.blurb}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 border-t border-border pt-3">
                          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            {item.label} links
                          </p>
                          <div className="grid grid-cols-2 gap-0.5">
                            {item.children.map((c) => (
                              <div key={c.id} className="flex items-center justify-between rounded-md px-2 py-1.5 text-[11px] hover:bg-secondary">
                                <span className="truncate">{c.label}</span>
                                {c.badge && <span className="rounded bg-secondary px-1 text-[9px] font-bold">{c.badge}</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-border bg-card p-2 shadow-xl">
                        <p className="mb-1 px-2 pt-1 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
                        {item.children.map((c) => (
                          <div key={c.id} className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-secondary">
                            <span className="truncate">{c.label}</span>
                            {c.badge && <span className="rounded bg-secondary px-1 text-[9px] font-bold">{c.badge}</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3 text-[11px] text-muted-foreground">
            <Search className="size-3" /> Search
          </span>
          <span className="rounded-full bg-brand px-4 py-2 text-[11px] font-semibold text-brand-foreground">Join free</span>
        </div>
      </div>
    </div>
  );
}

function MobilePreview({ nav }: { nav: NavItem[] }) {
  const items = visibleItems(nav);
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="mx-auto w-[340px] overflow-hidden rounded-[32px] border-4 border-foreground/80 bg-background shadow-xl">
      <div className="flex h-8 items-center justify-center bg-foreground/80 text-[10px] text-background">edufinder.com</div>
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
      <div className="max-h-[440px] space-y-0.5 overflow-y-auto p-3">
        {items.map((item) => {
          const open = openId === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() => setOpenId(open ? null : item.id)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm ${item.cta ? "bg-brand font-semibold text-brand-foreground" : "hover:bg-secondary"}`}
              >
                <span className="flex items-center gap-2">
                  {item.label}
                  {item.badge && (
                    <span className={`rounded px-1 text-[9px] font-bold ${item.cta ? "bg-brand-foreground/20" : "bg-gold/20 text-gold-foreground"}`}>
                      {item.badge}
                    </span>
                  )}
                </span>
                {item.children?.length ? <ChevronDown className={`size-3.5 opacity-60 transition-transform ${open ? "rotate-180" : ""}`} /> : null}
              </button>
              {item.children?.length && open ? (
                <div className="ml-3 space-y-0.5 border-l border-border pl-3">
                  {item.children.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary">
                      <span>{c.label}</span>
                      {c.badge && <span className="rounded bg-secondary px-1 text-[9px] font-bold">{c.badge}</span>}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
