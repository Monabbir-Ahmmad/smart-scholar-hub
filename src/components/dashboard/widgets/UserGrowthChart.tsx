import { ChartCard } from "../ChartCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", students: 120, teachers: 15, parents: 80 },
  { month: "Feb", students: 180, teachers: 22, parents: 120 },
  { month: "Mar", students: 250, teachers: 28, parents: 165 },
  { month: "Apr", students: 320, teachers: 35, parents: 210 },
  { month: "May", students: 410, teachers: 42, parents: 275 },
  { month: "Jun", students: 520, teachers: 48, parents: 340 },
];

export const UserGrowthChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="User Growth"
      subtitle="Monthly user registrations by role"
      delay={delay}
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="students"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              name="Students"
            />
            <Area
              type="monotone"
              dataKey="teachers"
              stackId="1"
              stroke="hsl(var(--secondary))"
              fill="hsl(var(--secondary))"
              fillOpacity={0.6}
              name="Teachers"
            />
            <Area
              type="monotone"
              dataKey="parents"
              stackId="1"
              stroke="hsl(var(--accent))"
              fill="hsl(var(--accent))"
              fillOpacity={0.6}
              name="Parents"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};
