import { ChartCard } from "../ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", billed: 12500, paid: 11200 },
  { month: "Feb", billed: 15800, paid: 14500 },
  { month: "Mar", billed: 18200, paid: 16800 },
  { month: "Apr", billed: 22400, paid: 20100 },
  { month: "May", billed: 28600, paid: 25400 },
  { month: "Jun", billed: 32800, paid: 29200 },
];

export const RevenueChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Monthly billing vs payments"
      delay={delay}
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Bar dataKey="billed" name="Billed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="paid" name="Paid" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};
