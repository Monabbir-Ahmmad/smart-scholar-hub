import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
  const theme = useTheme();

  return (
    <ChartCard
      title="User Growth"
      subtitle="Monthly user registrations by role"
      delay={delay}
    >
      <Box sx={{ height: 300, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="month"
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
            />
            <Area
              type="monotone"
              dataKey="students"
              stackId="1"
              stroke={theme.palette.primary.main}
              fill={theme.palette.primary.main}
              fillOpacity={0.6}
              name="Students"
            />
            <Area
              type="monotone"
              dataKey="teachers"
              stackId="1"
              stroke={theme.palette.secondary.main}
              fill={theme.palette.secondary.main}
              fillOpacity={0.6}
              name="Teachers"
            />
            <Area
              type="monotone"
              dataKey="parents"
              stackId="1"
              stroke={theme.palette.warning.main}
              fill={theme.palette.warning.main}
              fillOpacity={0.6}
              name="Parents"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
