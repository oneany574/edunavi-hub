import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminDetail } from "@/components/panel/detail-page";
import { getEntityDetail } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/study-abroad/$slug")({
  loader: ({ params }) => {
    const d = getEntityDetail("study-abroad", params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Destination"} · Admin` }] }),
  component: () => {
    const d = Route.useLoaderData();
    return <AdminDetail backTo="/admin/study-abroad" backLabel="All destinations" detail={d} />;
  },
});
