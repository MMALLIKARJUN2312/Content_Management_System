import { notFound } from "next/navigation";
import { getJSON } from "@/lib/api";
import StandardDetailClient from "@/components/StandardDetailClient";

export default async function StandardDetailPage({ params }) {
  const { slug } = await params;
  const data = await getJSON(`/standards/${slug}`);

  if (!data) notFound();

  const { standard, versions, defaultVersionId } = data;

  const initialVersion = defaultVersionId
    ? (await getJSON(`/standards/${slug}/versions/${defaultVersionId}`))?.version
    : null;

  return <StandardDetailClient standard={standard} versions={versions} initialVersion={initialVersion} />;
}
