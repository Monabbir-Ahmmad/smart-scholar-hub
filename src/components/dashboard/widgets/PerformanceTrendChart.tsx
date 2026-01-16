import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { ChartCard } from "../ChartCard";
import { TrendingUp, TrendingDown } from "lucide-react";

const performanceData = [
  { week: "W1", score: 72, average: 68 },
  { week: "W2", score: 68, average: 69 },
  { week: "W3", score: 75, average: 70 },
  { week: "W4", score: 78, average: 71 },
  { week: "W5", score: 82, average: 72 },
  { week: "W6", score: 79, average: 72 },
  { week: "W7", score: 85, average: 73 },
  { week: "W8", score: 88, average: 74 },
  { week: "W9", score: 84, average: 74 },
  { week: "W10", score: 91, average: 75 },
  { week: "W11", score: 89, average: 76 },
  { week: "W12", score: 94, average: 77 },
];

const currentScore = performanceData[performanceData.length - 1].score;
const previousScore = performanceData[performanceData.length - 2].score;
const improvement = currentScore - previousScore;

interface PerformanceTrendChartProps {
  delay?: number;
}

export const PerformanceTrendChart = ({ delay = 0 }: PerformanceTrendChartProps) => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Performance Trend"
      subtitle="Your coursework scores over time"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Summary Stats */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.muted, 0.5),
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Current Score
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              {currentScore}%
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: 10,
              bgcolor: improvement >= 0 
                ? alpha(theme.palette.success.main, 0.1)
                : alpha(theme.palette.error.main, 0.1),
              color: improvement >= 0 
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {improvement >= 0 ? (
              <TrendingUp style={{ width: 16, height: 16 }} />
            ) : (
              <TrendingDown style={{ width: 16, height: 16 }} />
            )}
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {improvement >= 0 ? "+" : ""}{improvement}%
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={theme.palette.divider}
                vertical={false}
              />
              <XAxis 
                dataKey="week" 
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={false}
              />
              <YAxis 
                domain={[60, 100]}
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                axisLine={{ stroke: theme.palette.divider }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 12,
                  boxShadow: theme.shadows[5],
                }}
                labelStyle={{ color: theme.palette.text.primary, fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                fill="url(#scoreGradient)"
                name="Your Score"
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke={theme.palette.text.secondary}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Class Average"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: "primary.main" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Your Score
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 12, height: 2, bgcolor: "text.secondary", borderStyle: "dashed" }} />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Class Average
            </Typography>
          </Box>
        </Box>
      </Box>
    </ChartCard>
  );
};
