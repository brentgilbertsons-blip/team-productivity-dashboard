'use client';

import { useEffect, useState } from 'react';
import { healthCheck } from '@/lib/api-client';
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
        setError('Failed to connect to backend');
        setStatus('Error');
      }
    };

    checkHealth();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Team Productivity Dashboard</h1>
      <p style={{ color: error ? 'red' : 'green' }}>
        {error ? `⚠️ ${error}` : `✅ ${status}`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Current Velocity</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>48 <span style={{ fontSize: '14px' }}>points</span></p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Avg Cycle Time</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>5.2 <span style={{ fontSize: '14px' }}>days</span></p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <h3>Team Health</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold' }}>8.5 <span style={{ fontSize: '14px' }}>/10</span></p>
        </div>
      </div>

      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px' }}>
        <h2>Velocity Trend</h2>
        <VelocityChart />
      </div>
    </div>
  );
}
