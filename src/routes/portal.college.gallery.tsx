import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PrimaryAction } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Play } from "lucide-react";

export const Route = createFileRoute("/portal/college/gallery")({ component: Gallery });

const items = [
  { title: "Convocation 2026", type: "Album", assets: 42, hue: "from-brand to-academic" },
  { title: "Central Library", type: "Photo", assets: 8, hue: "from-academic to-brand" },
  { title: "Sports Complex tour", type: "Video", assets: 1, hue: "from-gold to-brand" },
  { title: "Placement Day highlights", type: "Album", assets: 26, hue: "from-brand to-gold" },
  { title: "Campus drone flyover", type: "Video", assets: 1, hue: "from-academic to-gold" },
  { title: "New AI Research Wing", type: "Album", assets: 18, hue: "from-brand to-academic" },
];

function Gallery() {
  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Gallery"
        description="Curated photos, videos and campus tours that appear on your public college page."
        actions={<PrimaryAction label="Upload media" />}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <Card key={g.title} className="overflow-hidden">
            <div className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${g.hue}`}>
              {g.type === "Video" ? <Play className="size-10 text-white/90" /> : <ImageIcon className="size-10 text-white/90" />}
              <Badge className="absolute left-3 top-3 border-0 bg-black/40 text-white backdrop-blur">{g.type}</Badge>
            </div>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-semibold">{g.title}</p>
                <p className="text-[11px] text-muted-foreground">{g.assets} asset{g.assets > 1 ? "s" : ""}</p>
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold uppercase">Live</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
