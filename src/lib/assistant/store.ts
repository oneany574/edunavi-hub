// Session-scoped data store for admin panel collections. Seeds from dummy rows;
// changes (from the AI assistant or elsewhere) persist in sessionStorage only.
import { useSyncExternalStore } from "react";
import type { Row } from "@/lib/panel-data";
import {
  adminCollegesRows, adminCoursesRows, adminClaimsRows, adminModerationRows,
  adminScholarshipsRows, adminExamsRows, adminBlogsRows, adminNewsRows,
  adminConsultanciesRows, adminStudyAbroadRows,
} from "@/lib/panel-data";
import { adminLeadsRows } from "@/lib/panel-leads";

export const seeds = {
  colleges: adminCollegesRows,
  courses: adminCoursesRows,
  claims: adminClaimsRows,
  moderation: adminModerationRows,
  scholarships: adminScholarshipsRows,
  exams: adminExamsRows,
  blogs: adminBlogsRows,
  news: adminNewsRows,
  consultancies: adminConsultanciesRows,
  studyAbroad: adminStudyAbroadRows,
  leads: adminLeadsRows,
} satisfies Record<string, Row[]>;

export type CollectionName = keyof typeof seeds;
export const collectionNames = Object.keys(seeds) as CollectionName[];

const KEY = "edufinder-admin-data";
type Data = Record<CollectionName, Row[]>;

function fresh(): Data {
  const d = {} as Data;
  for (const k of collectionNames) d[k] = seeds[k].map((r) => ({ ...r }));
  return d;
}

let data: Data | null = null;
const listeners = new Set<() => void>();

function load(): Data {
  if (data) return data;
  data = fresh();
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) data = { ...data, ...(JSON.parse(raw) as Partial<Data>) };
    } catch { /* ignore corrupt storage */ }
  }
  return data;
}

export function hydrateSessionData() {
  data = null;
  load();
  listeners.forEach((l) => l());
}

export function getCollection(name: CollectionName): Row[] {
  return load()[name];
}

export function setCollection(name: CollectionName, rows: Row[]) {
  const d = load();
  data = { ...d, [name]: rows };
  if (typeof window !== "undefined") sessionStorage.setItem(KEY, JSON.stringify(data));
  listeners.forEach((l) => l());
}

export function resetData() {
  data = fresh();
  if (typeof window !== "undefined") sessionStorage.removeItem(KEY);
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Returns live rows when `rows` is one of the seeded collections; otherwise returns `rows` unchanged. */
export function useLiveRows(rows: Row[]): Row[] {
  const name = collectionNames.find((k) => seeds[k] === rows);
  return useSyncExternalStore(
    subscribe,
    () => (name ? getCollection(name) : rows),
    () => rows,
  );
}
