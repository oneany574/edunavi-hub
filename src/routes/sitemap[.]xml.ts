import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { colleges } from "@/lib/edufinder-data";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "daily" | "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/colleges", changefreq: "daily", priority: "0.9" },
          { path: "/courses", changefreq: "weekly", priority: "0.8" },
          { path: "/exams", changefreq: "weekly", priority: "0.8" },
          { path: "/compare", changefreq: "monthly", priority: "0.7" },
          { path: "/college-predictor", changefreq: "monthly", priority: "0.7" },
          { path: "/scholarships", changefreq: "weekly", priority: "0.7" },
          { path: "/articles", changefreq: "weekly", priority: "0.7" },
          { path: "/reviews", changefreq: "weekly", priority: "0.6" },
          { path: "/questions", changefreq: "weekly", priority: "0.6" },
          ...colleges.map((c) => ({
            path: `/colleges/${c.slug}`,
            changefreq: "weekly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
