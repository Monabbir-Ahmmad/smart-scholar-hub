import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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

export const PerformanceDistribution = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const data = [
    { range: "0-50%", count: 45, color: theme.palette.error.main },
    { range: "51-70%", count: 120, color: theme.palette.warning.main },
    { range: "71-85%", count: 280, color: theme.palette.primary.main },
    { range: "86-95%", count: 185, color: theme.palette.success.main },
    { range: "96-100%", count: 95, color: theme.palette.success.main },
  ];

  const totalStudents = data.reduce((acc, item) => acc + item.count, 0);
  const avgPerformance = 78.5;

  return (
    <ChartCard
      title="Performance Distribution"
      subtitle="Coursework scores across all students"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {totalStudents} total submissions
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Avg: <Box component="span" sx={{ color: "primary.main" }}>{avgPerformance}%</Box>
          </Typography>
        </Box>

        <Box sx={{ height: 240, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="range"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
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
        </Box>
      </Box>
    </ChartCard>
  );
};
