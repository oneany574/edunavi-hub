import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PageHeader } from "@/components/panel/module-page";
import { defaultHeaderNav, type NavItem } from "@/lib/panel-leads";

export const Route = createFileRoute("/admin/navigation")({
  head: () => ({ meta: [{ title: "Navigation builder · Admin" }] }),
  component: NavigationBuilder,
});

function NavigationBuilder() {
  const [nav, setNav] = useState<NavItem[]>(defaultHeaderNav);
  const [selectedId, setSelectedId] = useState<string>(defaultHeaderNav[0].id);

  const flat: NavItem[] = nav.flatMap((n) => [n, ...(n.children ?? [])]);
  const selected = flat.find((n) => n.id === selectedId) ?? nav[0];

  const update = (id: string, patch: Partial<NavItem>) => {
    setNav((prev) =>
      prev.map((n) => {
        if (n.id === id) return { ...n, ...patch };
        return { ...n, children: n.children?.map((c) => (c.id === id ? { ...c, ...patch } : c)) };
      }),
    );
  };

  const addTop = () => {
    const id = `n-${Date.now()}`;
    setNav((p) => [...p, { id, label: "New link", url: "/" }]);
    setSelectedId(id);
  };

  const addChild = (parentId: string) => {
    const id = `n-${Date.now()}`;
    setNav((p) =>
      p.map((n) => (n.id === parentId ? { ...n, children: [...(n.children ?? []), { id, label: "New child", url: "/" }] } : n)),
    );
    setSelectedId(id);
  };

  const remove = (id: string) => {
    setNav((p) =>
      p.filter((n) => n.id !== id).map((n) => ({ ...n, children: n.children?.filter((c) => c.id !== id) })),
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site structure"
        title="Navigation builder"
        description="Design the public site header. Drag to reorder, nest to create dropdowns, edit label + URL on the right."
        actions={
          <>
            <Button variant="outline" size="sm">Preview</Button>
            <Button size="sm" className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
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

        <TabsContent value="header" className="mt-4">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Menu tree</p>
                  <Button variant="outline" size="sm" className="gap-1.5" onClick={addTop}>
                    <Plus className="size-3.5" /> Top-level link
                  </Button>
                </div>
                <ul className="space-y-1">
                  {nav.map((item) => (
                    <NavTreeItem
                      key={item.id}
                      item={item}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      onAddChild={addChild}
                      onRemove={remove}
                    />
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Edit link</p>
                <h3 className="font-display mt-1 text-xl">{selected.label}</h3>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="nav-label">Label</Label>
                    <Input id="nav-label" value={selected.label} onChange={(e) => update(selected.id, { label: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nav-url">URL</Label>
                    <Input id="nav-url" value={selected.url} onChange={(e) => update(selected.id, { url: e.target.value })} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3">
                    <div>
                      <p className="text-sm font-semibold">Open in new tab</p>
                      <p className="text-xs text-muted-foreground">Adds target="_blank" rel="noopener"</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-3">
                    <div>
                      <p className="text-sm font-semibold">Highlight as CTA</p>
                      <p className="text-xs text-muted-foreground">Styles the link as a solid button</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mobile" className="mt-4">
          <Card className="border-border">
            <CardContent className="p-6 text-sm text-muted-foreground">
              The mobile drawer inherits the header structure by default. Toggle per-item visibility once your team ships the mobile-specific overrides.
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

function NavTreeItem({
  item,
  selectedId,
  onSelect,
  onAddChild,
  onRemove,
  depth = 0,
}: {
  item: NavItem;
  selectedId: string;
  onSelect: (id: string) => void;
  onAddChild: (id: string) => void;
  onRemove: (id: string) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const active = selectedId === item.id;
  return (
    <li>
      <div
        className={`group flex items-center gap-2 rounded-lg border px-2 py-2 ${active ? "border-brand bg-brand/5" : "border-transparent hover:bg-secondary/60"}`}
        style={{ paddingLeft: 8 + depth * 20 }}
      >
        <GripVertical className="size-3.5 shrink-0 cursor-grab text-muted-foreground" />
        {hasChildren ? (
          <button className="grid size-5 place-items-center rounded hover:bg-secondary" onClick={() => setOpen((o) => !o)} aria-label="Toggle">
            {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
          </button>
        ) : (
          <span className="size-5" />
        )}
        <button className="min-w-0 flex-1 text-left" onClick={() => onSelect(item.id)}>
          <p className="truncate text-sm font-semibold">{item.label}</p>
          <p className="truncate text-[10px] text-muted-foreground">{item.url}</p>
        </button>
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="ghost" size="icon" className="size-7" onClick={() => onAddChild(item.id)} aria-label="Add child">
            <Plus className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => onRemove(item.id)} aria-label="Remove">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
      {hasChildren && open && (
        <ul className="mt-1 space-y-1">
          {item.children!.map((c) => (
            <NavTreeItem
              key={c.id}
              item={c}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddChild={onAddChild}
              onRemove={onRemove}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
