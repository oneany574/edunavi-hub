import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminDetail } from "@/components/panel/detail-page";
import { getEntityDetail } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/exams/$slug")({
  loader: ({ params }) => {
    const d = getEntityDetail("exams", params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.title ?? "Exam"} · Admin` }] }),
  component: () => {
    const d = Route.useLoaderData();
    return <AdminDetail backTo="/admin/exams" backLabel="All exams" detail={d} />;
  },
});
