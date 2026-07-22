import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6">
      <Card className="w-full max-w-sm p-8">
        <Link href="/" className="mb-8 flex items-center gap-1.5 text-lg font-semibold">
          <CheckCircle2 className="h-4 w-4 text-brand-500" />
          <span className="text-ink-900">Renew</span>
          <span className="text-brand-500">Cred</span>
        </Link>

        <h1 className="text-xl font-semibold text-ink-900">Admin login</h1>
        <p className="mt-1 text-sm text-ink-500">Sign in to manage RenewCred content.</p>

        <form className="mt-6 flex flex-col gap-4">
          <Input id="email" label="Email" type="email" placeholder="you@renewcred.com" />
          <Input id="password" label="Password" type="password" placeholder="••••••••" />
          <Button type="submit" className="mt-2 w-full">
            Sign in
          </Button>
        </form>
      </Card>
    </main>
  );
}
