import { motion } from "framer-motion";
import {
  LineChart,
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
  return (
    <ChartCard
      title="Performance Trend"
      subtitle="Your coursework scores over time"
      delay={delay}
    >
      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
          <div>
            <p className="text-sm text-muted-foreground">Current Score</p>
            <p className="text-3xl font-bold text-foreground">{currentScore}%</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            improvement >= 0 
              ? "bg-success/10 text-success" 
              : "bg-destructive/10 text-destructive"
          }`}>
            {improvement >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="font-medium">{improvement >= 0 ? "+" : ""}{improvement}%</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--border))" 
                vertical={false}
              />
              <XAxis 
                dataKey="week" 
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <YAxis 
                domain={[60, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-lg)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#scoreGradient)"
                name="Your Score"
              />
              <Line
                type="monotone"
                dataKey="average"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Class Average"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Your Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-muted-foreground" style={{ borderStyle: "dashed" }} />
            <span className="text-muted-foreground">Class Average</span>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};
