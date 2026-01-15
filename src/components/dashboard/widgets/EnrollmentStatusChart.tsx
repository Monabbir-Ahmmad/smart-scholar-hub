import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export const EnrollmentStatusChart = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const data = [
    { name: "Active", value: 245, color: theme.palette.success.main },
    { name: "Pending", value: 85, color: theme.palette.warning.main },
    { name: "Completed", value: 180, color: theme.palette.primary.main },
    { name: "Cancelled", value: 32, color: theme.palette.error.main },
  ];

  return (
    <ChartCard
      title="Enrollment Status"
      subtitle="Current enrollment distribution"
      delay={delay}
    >
      <Box sx={{ height: 300, width: "100%" }}>
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
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
