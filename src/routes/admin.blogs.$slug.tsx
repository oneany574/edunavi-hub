import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminDetail } from "@/components/panel/detail-page";
import { getEntityDetail } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/blogs/$slug")({
  loader: ({ params }) => {
    const d = getEntityDetail("blogs", params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Article"} · Admin` }] }),
  component: () => {
    const d = Route.useLoaderData();
    return <AdminDetail backTo="/admin/blogs" backLabel="All articles" detail={d} />;
  },
});
