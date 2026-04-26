'use client';

import { useEffect, useState } from 'react';
import { healthCheck } from '@/lib/api-client';
import MetricsCard from '@/components/MetricsCard';
import VelocityChart from '@/components/VelocityChart';

export default function DashboardPage() {
  const [status, setStatus] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await healthCheck();
        setStatus(`Backend Connected - Status: ${response.status}`);
      } catch (err) {
        setError('Failed to connect to backend. Make sure it\'s running on port 3001.');
        setStatus('Error');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Team Productivity Dashboard</h1>
          <p className="mt-2 text-slate-300">Real-time team metrics from GitHub</p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-lg bg-slate-700 p-4">
          <p className={`text-sm font-medium ${error ? 'text-red-300' : 'text-green-300'}`}>
            {error ? `⚠️ ${error}` : `✅ ${status}`}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricsCard
            title="Current Velocity"
            value="48"
            unit="points"
            trend="+12%"
            description="Story points this sprint"
          />
          <MetricsCard
            title="Avg Cycle Time"
            value="5.2"
            unit="days"
            trend="-8%"
            description="Days from start to done"
          />
          <MetricsCard
            title="Team Health"
            value="8.5"
            unit="/10"
            trend="+3%"
            description="Overall team performance"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Velocity Trend</h2>
            <VelocityChart />
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Cycle Time Distribution</h2>
            <div className="flex h-64 items-center justify-center text-slate-400">
              <p>Chart coming soon</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-slate-700 bg-slate-800 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Blocked Items</h2>
          <div className="space-y-3">
            <div className="rounded border border-red-900/50 bg-red-900/10 p-3">
              <p className="font-medium text-red-300">Waiting for design approval</p>
              <p className="text-sm text-red-200">Blocked for 2 days</p>
            </div>
            <div className="rounded border border-yellow-900/50 bg-yellow-900/10 p-3">
              <p className="font-medium text-yellow-300">Waiting for API implementation</p>
              <p className="text-sm text-yellow-200">Blocked for 1 day</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
