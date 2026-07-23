'use client';

import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import { useGetAdminStatsQuery } from "@/store/api/standardsApi";

export default function DashboardPage() {
  const { data: stats, isLoading, isError } = useGetAdminStatsQuery();

  const STATS = [
    { label: "Standards", value: stats?.totalStandards ?? "—" },
    { label: "Certified versions", value: stats?.certified ?? "—" },
    { label: "In public consultation", value: stats?.publicConsultation ?? "—" },
    { label: "Drafts", value: stats?.draft ?? "—" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Dashboard</h1>
        <p className="text-sm text-ink-500">Overview of the content you manage.</p>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <Spinner size={16} /> Loading…
        </div>
      )}
      {isError && <p className="text-sm text-red-600">Failed to load dashboard stats.</p>}

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
