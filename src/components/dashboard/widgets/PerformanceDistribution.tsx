import { ChartCard } from "../ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { range: "0-50%", count: 45, color: "hsl(var(--destructive))" },
  { range: "51-70%", count: 120, color: "hsl(var(--accent))" },
  { range: "71-85%", count: 280, color: "hsl(var(--primary))" },
  { range: "86-95%", count: 185, color: "hsl(var(--success))" },
  { range: "96-100%", count: 95, color: "hsl(var(--success))" },
];

export const PerformanceDistribution = ({ delay = 0 }: { delay?: number }) => {
  const totalStudents = data.reduce((acc, item) => acc + item.count, 0);
  const avgPerformance = 78.5;

  return (
    <ChartCard
      title="Performance Distribution"
      subtitle="Coursework scores across all students"
      delay={delay}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {totalStudents} total submissions
          </span>
          <span className="font-medium">
            Avg: <span className="text-primary">{avgPerformance}%</span>
          </span>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="range" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value} students`, "Count"]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ChartCard>
  );
};
