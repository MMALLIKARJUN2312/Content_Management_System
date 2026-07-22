import Badge from "@/components/ui/Badge";
import Container from "@/components/Container";

export default function StandardsPage() {
  return (
    <main className="flex-1">
      <Container className="flex flex-col gap-4 py-16">
        <Badge tone="brand">✓ Standards</Badge>
        <h1 className="font-display text-5xl italic text-ink-900">RenewCred Standards</h1>
        <p className="max-w-xl text-ink-500">
          Standards listing — coming in Phase 5 (Core Features), once the backend API
          serves real content.
        </p>
      </Container>
    </main>
  );
}
