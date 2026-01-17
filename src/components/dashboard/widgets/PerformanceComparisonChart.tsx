import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartCard } from "../ChartCard";

const performanceData = [
  {
    subject: "Mathematics",
    Emma: 92,
    Liam: 78,
    Sophie: 88,
  },
  {
    subject: "Science",
    Emma: 85,
    Liam: 82,
    Sophie: 79,
  },
  {
    subject: "English",
    Emma: 88,
    Liam: 71,
    Sophie: 95,
  },
  {
    subject: "History",
    Emma: 76,
    Liam: 68,
    Sophie: 90,
  },
  {
    subject: "Arts",
    Emma: 91,
    Liam: 85,
    Sophie: 94,
  },
];

const childColors = {
  Emma: "#7c3aed",
  Liam: "#059669",
  Sophie: "#db2777",
};

export const PerformanceComparisonChart = () => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Performance Comparison"
      subtitle="Average scores by subject across all children"
    >
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={performanceData} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
              vertical={false}
            />
            <XAxis
              dataKey="subject"
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
                boxShadow: theme.shadows[3],
              }}
              labelStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
              formatter={(value: number) => [`${value}%`, ""]}
            />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              iconType="circle"
            />
            <Bar
              dataKey="Emma"
              fill={childColors.Emma}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Liam"
              fill={childColors.Liam}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Sophie"
              fill={childColors.Sophie}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mt: 2 }}>
        {Object.entries(childColors).map(([name, color]) => (
          <Box key={name} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color }}>
              {Math.round(
                performanceData.reduce(
                  (acc, curr) => acc + (curr[name as keyof typeof curr] as number),
                  0
                ) / performanceData.length
              )}
              %
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {name}'s Avg
            </Typography>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
