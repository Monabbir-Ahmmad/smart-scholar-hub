import { ChartCard } from "../ChartCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "W1", rate: 85 },
  { week: "W2", rate: 88 },
  { week: "W3", rate: 82 },
  { week: "W4", rate: 91 },
  { week: "W5", rate: 89 },
  { week: "W6", rate: 94 },
  { week: "W7", rate: 92 },
  { week: "W8", rate: 96 },
];

export const SessionCompletionChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="Session Completion Rate"
      subtitle="Weekly completion percentage"
      delay={delay}
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="week" className="text-xs" />
            <YAxis className="text-xs" domain={[70, 100]} tickFormatter={(value) => `${value}%`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Completion Rate"]}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--success))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--success))", strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};
