import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminLeadsRows } from "@/lib/panel-leads";
import { slugify } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({ meta: [{ title: "Leads · Admin" }] }),
  component: () => (
    <ListModule
      eyebrow="CRM"
      title="Leads management"
      description="Every enquiry from the website, ads, socials and partner consultancies — tracked from first touch to enrollment."
      primaryLabel="Add lead"
      kpis={[
        { label: "Open leads", value: "1,284", delta: "+92 this week", trend: "up" },
        { label: "Qualified", value: "412", delta: "+18%", trend: "up" },
        { label: "Avg. response", value: "24 min", delta: "-8 min", trend: "down", hint: "SLA: 45 min" },
        { label: "Conversion", value: "9.2%", delta: "+1.1pp", trend: "up" },
      ]}
      rows={adminLeadsRows}
      getEditHref={(row) => `/admin/leads/${slugify(row.name as string)}`}
    />
  ),
});
