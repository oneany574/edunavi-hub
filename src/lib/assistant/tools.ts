// Tool definitions (sent to the model) and their browser-side executors over the session store.
import type { Row } from "@/lib/panel-data";
import { collectionNames, getCollection, setCollection, type CollectionName } from "./store";

export const WRITE_TOOLS = new Set(["create_record", "update_records", "delete_records"]);

const collection = { type: "string", enum: collectionNames, description: "Collection name" };
const filters = {
  type: "array",
  description: "All filters must match (AND). Use [] for none.",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["field", "op", "value"],
    properties: {
      field: { type: "string" },
      op: { type: "string", enum: ["eq", "neq", "contains", "gt", "gte", "lt", "lte"] },
      value: { type: "string", description: "Compared as number when both sides are numeric" },
    },
  },
};

export const toolDefinitions = [
  {
    type: "function" as const,
    name: "describe_collections",
    description: "List every collection with its record count, field names and a sample record.",
    strict: true,
    parameters: { type: "object", additionalProperties: false, properties: {}, required: [] },
  },
  {
    type: "function" as const,
    name: "query_records",
    description: "Search records in a collection with filters, sorting and a limit.",
    strict: true,
    parameters: {
      type: "object", additionalProperties: false,
      required: ["collection", "filters", "sortBy", "sortDir", "limit"],
      properties: {
        collection, filters,
        sortBy: { type: ["string", "null"] },
        sortDir: { type: "string", enum: ["asc", "desc"] },
        limit: { type: "integer", description: "Max rows, 1-100" },
      },
    },
  },
  {
    type: "function" as const,
    name: "aggregate_records",
    description: "Group and aggregate records (count, sum, avg, min, max).",
    strict: true,
    parameters: {
      type: "object", additionalProperties: false,
      required: ["collection", "filters", "groupBy", "metric", "field"],
      properties: {
        collection, filters,
        groupBy: { type: ["string", "null"] },
        metric: { type: "string", enum: ["count", "sum", "avg", "min", "max"] },
        field: { type: ["string", "null"], description: "Numeric field for sum/avg/min/max" },
      },
    },
  },
  {
    type: "function" as const,
    name: "create_record",
    description: "Create a record. Requires admin confirmation. Use the collection's existing field names.",
    strict: true,
    parameters: {
      type: "object", additionalProperties: false, required: ["collection", "recordJson"],
      properties: { collection, recordJson: { type: "string", description: "JSON object of field values" } },
    },
  },
  {
    type: "function" as const,
    name: "update_records",
    description: "Update records matching filters. Requires admin confirmation.",
    strict: true,
    parameters: {
      type: "object", additionalProperties: false, required: ["collection", "filters", "changesJson"],
      properties: { collection, filters, changesJson: { type: "string", description: "JSON object of fields to set" } },
    },
  },
  {
    type: "function" as const,
    name: "delete_records",
    description: "Delete records matching filters. Requires admin confirmation.",
    strict: true,
    parameters: {
      type: "object", additionalProperties: false, required: ["collection", "filters"],
      properties: { collection, filters },
    },
  },
];

type Filter = { field: string; op: string; value: string };

const num = (v: unknown) => (typeof v === "number" ? v : Number(String(v).replace(/[^0-9.-]/g, "")));
const isNum = (v: unknown) => String(v).trim() !== "" && !Number.isNaN(num(v));

export function matches(row: Row, f: Filter): boolean {
  const cell = row[f.field];
  if (cell === undefined) return false;
  const a = String(cell).toLowerCase();
  const b = f.value.toLowerCase();
  const numeric = typeof cell === "number" && isNum(f.value);
  switch (f.op) {
    case "eq": return numeric ? num(cell) === num(f.value) : a === b;
    case "neq": return numeric ? num(cell) !== num(f.value) : a !== b;
    case "contains": return a.includes(b);
    case "gt": return num(cell) > num(f.value);
    case "gte": return num(cell) >= num(f.value);
    case "lt": return num(cell) < num(f.value);
    case "lte": return num(cell) <= num(f.value);
    default: return false;
  }
}

const filterRows = (rows: Row[], fs: Filter[]) => rows.filter((r) => fs.every((f) => matches(r, f)));

function checkCollection(name: unknown): CollectionName {
  if (!collectionNames.includes(name as CollectionName)) throw new Error(`Unknown collection: ${String(name)}`);
  return name as CollectionName;
}

function parseObject(json: string): Row {
  const v: unknown = JSON.parse(json);
  if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("Expected a JSON object");
  return v as Row;
}

/** Short human summary of a pending write, for the confirmation card. */
export function describeWrite(name: string, args: Record<string, unknown>): string {
  const c = String(args["collection"]);
  const fs = (args["filters"] as Filter[] | undefined) ?? [];
  const where = fs.map((f) => `${f.field} ${f.op} "${f.value}"`).join(" and ") || "all records";
  if (name === "create_record") return `Create a new record in ${c}`;
  if (name === "update_records") {
    const n = filterRows(getCollection(checkCollection(c)), fs).length;
    return `Update ${n} record(s) in ${c} where ${where}`;
  }
  const n = filterRows(getCollection(checkCollection(c)), fs).length;
  return `Delete ${n} record(s) from ${c} where ${where}`;
}

export function runTool(name: string, args: Record<string, unknown>, confirmed = false): unknown {
  if (WRITE_TOOLS.has(name) && !confirmed) throw new Error("Explicit confirmation is required for sample-data changes");
  if (name === "describe_collections") {
    return collectionNames.map((c) => {
      const rows = getCollection(c);
      return { collection: c, count: rows.length, fields: Object.keys(rows[0] ?? {}), sample: rows[0] };
    });
  }
  const c = checkCollection(args["collection"]);
  const fs = (args["filters"] as Filter[] | undefined) ?? [];
  const rows = getCollection(c);
  switch (name) {
    case "query_records": {
      let out = filterRows(rows, fs);
      const sortBy = args["sortBy"] as string | null;
      if (sortBy) {
        const dir = args["sortDir"] === "desc" ? -1 : 1;
        out = [...out].sort((x, y) => {
          const a = x[sortBy], b = y[sortBy];
          return (isNum(a) && isNum(b) ? num(a) - num(b) : String(a).localeCompare(String(b))) * dir;
        });
      }
      const limit = Math.min(100, Math.max(1, Number(args["limit"]) || 20));
      return { total: out.length, rows: out.slice(0, limit) };
    }
    case "aggregate_records": {
      const metric = String(args["metric"]);
      const field = args["field"] as string | null;
      const groupBy = args["groupBy"] as string | null;
      const groups = new Map<string, Row[]>();
      for (const r of filterRows(rows, fs)) {
        const k = groupBy ? String(r[groupBy]) : "all";
        groups.set(k, [...(groups.get(k) ?? []), r]);
      }
      return [...groups].map(([group, rs]) => {
        const vals = field ? rs.map((r) => num(r[field])).filter((v) => !Number.isNaN(v)) : [];
        const value =
          metric === "count" ? rs.length
          : metric === "sum" ? vals.reduce((a, b) => a + b, 0)
          : metric === "avg" ? (vals.length ? +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(2) : null)
          : metric === "min" ? (vals.length ? Math.min(...vals) : null)
          : (vals.length ? Math.max(...vals) : null);
        return { group, value };
      });
    }
    case "create_record": {
      const rec = parseObject(String(args["recordJson"]));
      setCollection(c, [rec, ...rows]);
      return { created: rec };
    }
    case "update_records": {
      const changes = parseObject(String(args["changesJson"]));
      let n = 0;
      setCollection(c, rows.map((r) => (fs.every((f) => matches(r, f)) ? (n++, { ...r, ...changes }) : r)));
      return { updated: n };
    }
    case "delete_records": {
      const keep = rows.filter((r) => !fs.every((f) => matches(r, f)));
      setCollection(c, keep);
      return { deleted: rows.length - keep.length };
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
