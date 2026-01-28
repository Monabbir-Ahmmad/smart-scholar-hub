import { useState, useEffect } from "react";
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
import { getUserGrowthData, type UserGrowthData } from "@/services";

export const UserGrowthChart = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [data, setData] = useState<UserGrowthData[]>([]);

  useEffect(() => {
    getUserGrowthData().then(setData);
  }, []);

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
