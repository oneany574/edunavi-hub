import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/panel/module-page";
import { defaultFooterColumns, footerMeta, type FooterColumn } from "@/lib/panel-leads";

export const Route = createFileRoute("/admin/footer")({
  head: () => ({ meta: [{ title: "Footer builder · Admin" }] }),
  component: FooterBuilder,
});

function FooterBuilder() {
  const [columns, setColumns] = useState<FooterColumn[]>(defaultFooterColumns);
  const [tagline, setTagline] = useState(footerMeta.tagline);
  const [copyright, setCopyright] = useState(footerMeta.copyright);
  const [socials, setSocials] = useState(footerMeta.socials);

  const addColumn = () => {
    setColumns((p) => [...p, { id: `col-${Date.now()}`, heading: "New column", links: [] }]);
  };
  const removeColumn = (id: string) => setColumns((p) => p.filter((c) => c.id !== id));
  const updateColumn = (id: string, patch: Partial<FooterColumn>) =>
    setColumns((p) => p.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const addLink = (colId: string) =>
    setColumns((p) =>
      p.map((c) =>
        c.id === colId
          ? { ...c, links: [...c.links, { id: `l-${Date.now()}`, label: "New link", url: "/" }] }
          : c,
      ),
    );
  const removeLink = (colId: string, linkId: string) =>
    setColumns((p) => p.map((c) => (c.id === colId ? { ...c, links: c.links.filter((l) => l.id !== linkId) } : c)));
  const updateLink = (colId: string, linkId: string, patch: Partial<{ label: string; url: string }>) =>
    setColumns((p) =>
      p.map((c) =>
        c.id === colId ? { ...c, links: c.links.map((l) => (l.id === linkId ? { ...l, ...patch } : l)) } : c,
      ),
    );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Site structure"
        title="Footer builder"
        description="Compose the public-site footer — link columns, tagline, socials and legal copyright."
        actions={
          <>
            <Button variant="outline" size="sm">Preview</Button>
            <Button size="sm" className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
              <Save className="size-3.5" /> Publish
            </Button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Link columns</p>
                <Button variant="outline" size="sm" className="gap-1.5" onClick={addColumn}>
                  <Plus className="size-3.5" /> Add column
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {columns.map((col) => (
                  <div key={col.id} className="rounded-2xl border border-border bg-card p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground" />
                      <Input
                        value={col.heading}
                        onChange={(e) => updateColumn(col.id, { heading: e.target.value })}
                        className="h-8 border-0 bg-transparent px-1 text-sm font-bold uppercase tracking-widest focus-visible:ring-1"
                      />
                      <Button variant="ghost" size="icon" className="size-7 text-destructive" onClick={() => removeColumn(col.id)} aria-label="Remove column">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                    <ul className="space-y-2">
                      {col.links.map((link) => (
                        <li key={link.id} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                          <Input
                            value={link.label}
                            onChange={(e) => updateLink(col.id, link.id, { label: e.target.value })}
                            placeholder="Label"
                            className="h-8"
                          />
                          <Input
                            value={link.url}
                            onChange={(e) => updateLink(col.id, link.id, { url: e.target.value })}
                            placeholder="/url"
                            className="h-8 font-mono text-xs"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7 text-destructive"
                            onClick={() => removeLink(col.id, link.id)}
                            aria-label="Remove link"
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-3 gap-1.5 text-xs" onClick={() => addLink(col.id)}>
                      <Plus className="size-3.5" /> Add link
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Preview</p>
              <Separator className="my-4" />
              <div className="rounded-2xl bg-brand p-6 text-brand-foreground">
                <p className="font-display text-xl">EduFinder</p>
                <p className="mt-1 max-w-md text-xs text-brand-foreground/80">{tagline}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                  {columns.map((c) => (
                    <div key={c.id}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gold">{c.heading}</p>
                      <ul className="mt-3 space-y-1.5 text-xs">
                        {c.links.map((l) => (
                          <li key={l.id} className="text-brand-foreground/80 hover:text-brand-foreground">{l.label}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <Separator className="my-6 bg-brand-foreground/20" />
                <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-brand-foreground/70">
                  <span>{copyright}</span>
                  <span className="flex gap-3">
                    {socials.map((s) => (
                      <span key={s.label}>{s.label}</span>
                    ))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Brand block</p>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Textarea id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className="min-h-20" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="copyright">Copyright</Label>
                  <Input id="copyright" value={copyright} onChange={(e) => setCopyright(e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Social links</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => setSocials((p) => [...p, { label: "New", url: "https://" }])}
                >
                  <Plus className="size-3.5" /> Add
                </Button>
              </div>
              <Separator className="my-4" />
              <ul className="space-y-2">
                {socials.map((s, i) => (
                  <li key={i} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2">
                    <Input
                      value={s.label}
                      onChange={(e) =>
                        setSocials((prev) => prev.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))
                      }
                      className="h-8"
                    />
                    <Input
                      value={s.url}
                      onChange={(e) =>
                        setSocials((prev) => prev.map((x, idx) => (idx === i ? { ...x, url: e.target.value } : x)))
                      }
                      className="h-8 font-mono text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 text-destructive"
                      onClick={() => setSocials((prev) => prev.filter((_, idx) => idx !== i))}
                      aria-label="Remove social"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
