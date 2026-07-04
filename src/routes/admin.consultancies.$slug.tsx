import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminDetail } from "@/components/panel/detail-page";
import { getEntityDetail } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/consultancies/$slug")({
  loader: ({ params }) => {
    const d = getEntityDetail("consultancies", params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Consultancy"} · Admin` }] }),
  component: () => {
    const d = Route.useLoaderData();
    return <AdminDetail backTo="/admin/consultancies" backLabel="All consultancies" detail={d} />;
  },
});
