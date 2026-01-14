import { ChartCard } from "../ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Active", value: 245, color: "hsl(var(--success))" },
  { name: "Pending", value: 85, color: "hsl(var(--accent))" },
  { name: "Completed", value: 180, color: "hsl(var(--primary))" },
  { name: "Cancelled", value: 32, color: "hsl(var(--destructive))" },
];

export const EnrollmentStatusChart = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="Enrollment Status"
      subtitle="Current enrollment distribution"
      delay={delay}
    >
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};
