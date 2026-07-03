import { useMemo, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, MoreHorizontal, Plus, Search, SlidersHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Kpi, Row, Status } from "@/lib/panel-data";

const statusStyles: Record<Status, string> = {
  Active: "bg-success/15 text-success",
  Pending: "bg-gold-soft text-brand",
  Rejected: "bg-destructive/15 text-destructive",
  Draft: "bg-muted text-muted-foreground",
  Published: "bg-academic/10 text-academic",
  Flagged: "bg-destructive/15 text-destructive",
  Approved: "bg-success/15 text-success",
  Suspended: "bg-muted text-muted-foreground",
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{eyebrow}</p>
        )}
        <h1 className="font-display mt-1 text-3xl leading-tight tracking-tight md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((k) => (
        <Card key={k.label} className="border-border">
          <CardContent className="p-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k.label}</p>
            <p className="font-display mt-2 text-3xl leading-none">{k.value}</p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
              {k.trend === "up" && <ArrowUp className="size-3 text-success" />}
              {k.trend === "down" && <ArrowDown className="size-3 text-destructive" />}
              <span className={k.trend === "up" ? "text-success" : k.trend === "down" ? "text-destructive" : "text-muted-foreground"}>
                {k.delta}
              </span>
              {k.hint && <span className="ml-auto text-muted-foreground">{k.hint}</span>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

type DataTableProps = {
  rows: Row[];
  actions?: (row: Row) => { label: string; destructive?: boolean }[];
  searchable?: boolean;
  primaryKey?: string;
};

export function DataTable({ rows, actions, searchable = true, primaryKey }: DataTableProps) {
  const [q, setQ] = useState("");
  const columns = useMemo(() => (rows[0] ? Object.keys(rows[0]) : []), [rows]);

  const filtered = useMemo(() => {
    if (!q) return rows;
    const needle = q.toLowerCase();
    return rows.filter((r) => Object.values(r).some((v) => String(v).toLowerCase().includes(needle)));
  }, [rows, q]);

  return (
    <Card className="border-border">
      <CardContent className="p-0">
        {searchable && (
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Filter rows…"
                className="h-9 pl-9"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <SlidersHorizontal className="size-3.5" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="ml-auto gap-1.5">
              <Download className="size-3.5" /> Export
            </Button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left">
                {columns.map((c) => (
                  <th key={c} className="px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {c}
                  </th>
                ))}
                {actions && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={String(row[primaryKey ?? columns[0]]) + i} className="border-b border-border/60 last:border-0 hover:bg-secondary/40">
                  {columns.map((c) => (
                    <td key={c} className="px-4 py-3 align-top">
                      {isStatus(row[c]) ? (
                        <Badge className={`${statusStyles[row[c] as Status]} border-0 font-semibold`}>
                          {row[c]}
                        </Badge>
                      ) : (
                        <span className={c === columns[0] ? "font-semibold text-foreground" : "text-foreground/80"}>
                          {row[c]}
                        </span>
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-7">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions(row).map((a, idx) => (
                            <div key={a.label}>
                              {idx > 0 && a.destructive && <DropdownMenuSeparator />}
                              <DropdownMenuItem className={a.destructive ? "text-destructive" : ""}>
                                {a.label}
                              </DropdownMenuItem>
                            </div>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-muted-foreground" colSpan={columns.length + (actions ? 1 : 0)}>
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function isStatus(v: unknown): v is Status {
  return typeof v === "string" && ["Active", "Pending", "Rejected", "Draft", "Published", "Flagged", "Approved", "Suspended"].includes(v);
}

export function PrimaryAction({ label, icon: Icon = Plus }: { label: string; icon?: typeof Plus }) {
  return (
    <Button className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
      <Icon className="size-4" /> {label}
    </Button>
  );
}

/** Standardised list module: KPIs (optional) + header + table with default actions. */
export function ListModule({
  eyebrow,
  title,
  description,
  primaryLabel = "Add new",
  kpis,
  rows,
  rowActions = () => [
    { label: "View" },
    { label: "Edit" },
    { label: "Delete", destructive: true },
  ],
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  kpis?: Kpi[];
  rows: Row[];
  rowActions?: (row: Row) => { label: string; destructive?: boolean }[];
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={<PrimaryAction label={primaryLabel} />}
      />
      {kpis && <KpiGrid items={kpis} />}
      <DataTable rows={rows} actions={rowActions} />
    </>
  );
}
