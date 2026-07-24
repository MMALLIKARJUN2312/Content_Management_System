import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-start gap-4 px-6 py-24">
        <Badge>404</Badge>
        <h1 className="text-2xl font-semibold text-ink-900">Page not found</h1>
        <p className="max-w-md text-sm text-ink-500">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button as={Link} href="/dashboard">
          Go to Dashboard
        </Button>
      </div>
    </main>
  );
}
