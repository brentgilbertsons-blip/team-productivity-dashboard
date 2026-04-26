interface MetricsCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  description?: string;
}

export default function MetricsCard({
  title,
  value,
  unit,
  trend,
  description,
}: MetricsCardProps) {
  const isPositiveTrend = trend?.startsWith('+');

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-800 p-6 transition-all hover:border-slate-600 hover:bg-slate-750">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-sm font-medium text-slate-300">{title}</h3>
        {trend && (
          <span
            className={`text-xs font-semibold ${
              isPositiveTrend ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        {unit && <span className="text-sm text-slate-400">{unit}</span>}
      </div>

      {description && (
        <p className="text-xs text-slate-400">{description}</p>
      )}
    </div>
  );
}
