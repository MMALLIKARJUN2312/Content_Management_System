import Badge from "@/components/ui/Badge";
import Container from "@/components/Container";
import StandardCard from "@/components/StandardCard";
import { getJSON } from "@/lib/api";

export default async function StandardsPage() {
  let standards = [];
  let loadError = false;

  try {
    const data = await getJSON('/standards');
    standards = data?.standards || [];
  } catch {
    loadError = true;
  }

  return (
    <main id="main-content" className="flex-1">
      <Container className="flex flex-col gap-4 py-16">
        <Badge tone="brand">✓ Standards</Badge>
        <h1 className="font-display text-5xl italic text-ink-900">RenewCred Standards</h1>
        <p className="max-w-xl text-ink-500">
          Explore the open, versioned standards behind every RenewCred climate credit.
        </p>

        <div className="mt-6">
          {loadError && (
            <p className="text-sm text-red-600">
              Unable to load standards right now. Please try again shortly.
            </p>
          )}
          {!loadError && standards.length === 0 && (
            <p className="text-sm text-ink-500">No standards published yet.</p>
          )}
          {!loadError && standards.map((standard) => <StandardCard key={standard._id} standard={standard} />)}
        </div>
      </Container>
    </main>
  );
}
