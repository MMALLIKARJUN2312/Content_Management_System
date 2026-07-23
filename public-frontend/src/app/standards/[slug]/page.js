import { notFound } from "next/navigation";
import { getJSON } from "@/lib/api";
import StandardDetailClient from "@/components/StandardDetailClient";
import Container from "@/components/Container";

export default async function StandardDetailPage({ params }) {
  const { slug } = await params;

  let data;
  try {
    data = await getJSON(`/standards/${slug}`);
  } catch {
    return (
      <main id="main-content" className="flex-1">
        <Container className="py-16">
          <p className="text-sm text-red-600">
            Unable to load this standard right now. Please try again shortly.
          </p>
        </Container>
      </main>
    );
  }

  if (!data) notFound();

  const { standard, versions, defaultVersionId } = data;

  let initialVersion = null;
  if (defaultVersionId) {
    try {
      initialVersion = (await getJSON(`/standards/${slug}/versions/${defaultVersionId}`))?.version || null;
    } catch {
      initialVersion = null;
    }
  }

  return <StandardDetailClient standard={standard} versions={versions} initialVersion={initialVersion} />;
}
