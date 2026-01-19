import { useState, useEffect, useMemo } from "react";
import { useTheme, alpha } from "@mui/material/styles";
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
  Cell
} from "recharts";
import { getWeeklySessionLoad, type WeeklySessionData } from "@/services";

export const WeeklySessionLoad = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [weeklyData, setWeeklyData] = useState<WeeklySessionData[]>([]);

  useEffect(() => {
    getWeeklySessionLoad().then(setWeeklyData);
  }, []);

  const todayIndex = new Date().getDay();
  const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1; // Adjust for Mon-Sun array

  const { totalSessions, totalHours } = useMemo(() => {
    return {
      totalSessions: weeklyData.reduce((acc, d) => acc + d.sessions, 0),
      totalHours: weeklyData.reduce((acc, d) => acc + d.hours, 0),
    };
  }, [weeklyData]);

  return (
    <ChartCard
      title="Weekly Session Load"
      subtitle="Sessions scheduled per day"
      delay={delay}
    >
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
            {totalSessions}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total sessions this week
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
            {totalHours}h
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total teaching hours
          </Typography>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={weeklyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme.palette.divider}
            vertical={false}
          />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: theme.shadows[3],
            }}
            formatter={(value: number, name: string) => [
              `${value} ${name === "sessions" ? "sessions" : "hours"}`,
              name === "sessions" ? "Sessions" : "Hours"
            ]}
          />
          <Bar 
            dataKey="sessions" 
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          >
            {weeklyData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={index === adjustedTodayIndex 
                  ? theme.palette.primary.main 
                  : alpha(theme.palette.primary.main, 0.3)
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
