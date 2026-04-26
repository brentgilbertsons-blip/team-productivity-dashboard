'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { sprint: 'Sprint 1', velocity: 32 },
  { sprint: 'Sprint 2', velocity: 40 },
  { sprint: 'Sprint 3', velocity: 45 },
  { sprint: 'Sprint 4', velocity: 48 },
  { sprint: 'Sprint 5', velocity: 52 },
  { sprint: 'Sprint 6', velocity: 48 },
];

export default function VelocityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="sprint" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#e2e8f0' }}
        />
        <Line
          type="monotone"
          dataKey="velocity"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={{ fill: '#3b82f6', r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
