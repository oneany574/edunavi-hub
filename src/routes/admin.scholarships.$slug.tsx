import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminDetail } from "@/components/panel/detail-page";
import { getEntityDetail } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/scholarships/$slug")({
  loader: ({ params }) => {
    const d = getEntityDetail("scholarships", params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Scholarship"} · Admin` }] }),
  component: () => {
    const d = Route.useLoaderData();
    return <AdminDetail backTo="/admin/scholarships" backLabel="All scholarships" detail={d} />;
  },
});
