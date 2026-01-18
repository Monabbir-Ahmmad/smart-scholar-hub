import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
import { ChartCard } from "../ChartCard";

const performanceData = [
  { subject: "Math", Emma: 92, Liam: 78, Olivia: 95 },
  { subject: "English", Emma: 85, Liam: 88, Olivia: 90 },
  { subject: "Science", Emma: 88, Liam: 72, Olivia: 94 },
  { subject: "History", Emma: 80, Liam: 85, Olivia: 88 },
  { subject: "Physics", Emma: 90, Liam: 75, Olivia: 96 },
];

const childrenColors = {
  Emma: "#4CAF50",
  Liam: "#2196F3",
  Olivia: "#FF9800",
};

export const PerformanceComparisonChart = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Performance Comparison"
      subtitle="Compare scores across subjects"
      delay={delay}
    >
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={performanceData} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={alpha(theme.palette.divider, 0.5)}
              vertical={false}
            />
            <XAxis
              dataKey="subject"
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
                boxShadow: theme.shadows[3],
              }}
              formatter={(value: number, name: string) => [`${value}%`, name]}
            />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              formatter={(value) => (
                <span style={{ color: theme.palette.text.primary, fontSize: 12 }}>
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="Emma"
              fill={childrenColors.Emma}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Liam"
              fill={childrenColors.Liam}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
            <Bar
              dataKey="Olivia"
              fill={childrenColors.Olivia}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Summary Stats */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 2,
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {Object.entries(childrenColors).map(([name, color]) => {
          const avgScore = Math.round(
            performanceData.reduce((sum, d) => sum + (d[name as keyof typeof d] as number), 0) /
              performanceData.length
          );
          return (
            <Box
              key={name}
              sx={{
                flex: 1,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(color, 0.1),
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {name}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color }}>
                {avgScore}%
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Average
              </Typography>
            </Box>
          );
        })}
      </Box>
    </ChartCard>
  );
};
