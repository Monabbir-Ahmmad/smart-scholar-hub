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

const weeklyData = [
  { day: "Mon", sessions: 4, hours: 4 },
  { day: "Tue", sessions: 6, hours: 5.5 },
  { day: "Wed", sessions: 3, hours: 2.5 },
  { day: "Thu", sessions: 5, hours: 4.5 },
  { day: "Fri", sessions: 7, hours: 6 },
  { day: "Sat", sessions: 2, hours: 1.5 },
  { day: "Sun", sessions: 0, hours: 0 },
];

export const WeeklySessionLoad = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const todayIndex = new Date().getDay();
  const adjustedTodayIndex = todayIndex === 0 ? 6 : todayIndex - 1; // Adjust for Mon-Sun array

  return (
    <ChartCard
      title="Weekly Session Load"
      subtitle="Sessions scheduled per day"
      delay={delay}
    >
      <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
            27
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Total sessions this week
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main" }}>
            24h
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
