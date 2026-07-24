import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="flex flex-col items-start gap-4 py-24">
        <Badge>404</Badge>
        <h1 className="font-display text-4xl italic text-ink-900">Page not found</h1>
        <p className="max-w-md text-ink-500">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button as={Link} href="/standards">
          Browse Standards
        </Button>
      </Container>
    </main>
  );
}
