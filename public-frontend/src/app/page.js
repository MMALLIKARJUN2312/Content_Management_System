import { Search, Zap, Flame, Wind, Sun } from "lucide-react";
import Badge from "@/components/ui/Badge";
import StatusPill from "@/components/ui/StatusPill";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Skeleton from "@/components/ui/Skeleton";
import Spinner from "@/components/ui/Spinner";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-16">
      <div className="space-y-3">
        <Badge tone="brand">✓ Standards</Badge>
        <h1 className="font-display text-5xl italic text-ink-900">RenewCred Standards</h1>
        <p className="max-w-xl text-ink-500">
          Design system preview — typography, colors, and reusable UI primitives.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button>Registry</Button>
        <Button variant="outline">Read more</Button>
        <Button variant="ghost">Contact Us</Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <StatusPill status="certified" />
        <StatusPill status="public_consultation" />
        <StatusPill status="draft" />
      </div>

      <Input icon={Search} placeholder="Search" className="max-w-xs" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { icon: Zap, title: "EV" },
          { icon: Flame, title: "Biochar" },
          { icon: Wind, title: "Methane" },
          { icon: Sun, title: "Renewable Energy" },
        ].map(({ icon: Icon, title }) => (
          <Card key={title} className="flex items-center justify-between p-5">
            <span className="flex items-center gap-2 font-medium text-ink-900">
              <Icon className="h-4 w-4 text-brand-600" />
              {title}
            </span>
            <a href="#" className="text-sm text-ink-500 underline">
              Read more
            </a>
          </Card>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Spinner />
        <Skeleton className="h-4 w-40" />
      </div>
    </main>
  );
}
