import Badge from "@/components/ui/Badge";
import Container from "@/components/Container";
import StandardCard from "@/components/StandardCard";
import { getJSON } from "@/lib/api";

export default async function StandardsPage() {
  const data = await getJSON('/standards');
  const standards = data?.standards || [];

  return (
    <main className="flex-1">
      <Container className="flex flex-col gap-4 py-16">
        <Badge tone="brand">✓ Standards</Badge>
        <h1 className="font-display text-5xl italic text-ink-900">RenewCred Standards</h1>
        <p className="max-w-xl text-ink-500">
          Explore the open, versioned standards behind every RenewCred climate credit.
        </p>

        <div className="mt-6">
          {standards.length === 0 ? (
            <p className="text-sm text-ink-500">No standards published yet.</p>
          ) : (
            standards.map((standard) => <StandardCard key={standard._id} standard={standard} />)
          )}
        </div>
      </Container>
    </main>
  );
}
