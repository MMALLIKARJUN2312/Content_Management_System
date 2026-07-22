import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/Container";

export default function Home() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="flex flex-col items-start gap-6 py-24">
        <Badge tone="brand">✓ Standards</Badge>
        <h1 className="max-w-2xl font-display text-5xl italic text-ink-900">
          Pure climate intelligence, backed by open standards.
        </h1>
        <p className="max-w-xl text-ink-500">
          Explore the certified standards behind every RenewCred credit — versioned,
          transparent, and open to public consultation.
        </p>
        <Button as={Link} href="/standards">
          View Standards
        </Button>
      </Container>
    </main>
  );
}
