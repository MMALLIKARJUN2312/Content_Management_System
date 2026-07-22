import Card from "@/components/ui/Card";

const STATS = [
  { label: "Standards", value: "4" },
  { label: "Certified versions", value: "4" },
  { label: "In public consultation", value: "1" },
  { label: "Drafts", value: "0" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
        <p className="text-sm text-ink-500">Overview of the content you manage.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-ink-500">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-ink-900">{stat.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
