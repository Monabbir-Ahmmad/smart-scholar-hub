import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
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
import { getQuestionBankStats, type QuestionBankStats as QuestionBankStatsType } from "@/services";

export const QuestionBankStats = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [stats, setStats] = useState<QuestionBankStatsType | null>(null);

  useEffect(() => {
    getQuestionBankStats().then(setStats);
  }, []);

  const subjectData = useMemo(() => {
    if (!stats) return [];
    const colorMap = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.primary.main,
      theme.palette.secondary.main,
    ];
    return stats.bySubject.map((item, index) => ({
      ...item,
      color: colorMap[index % colorMap.length],
    }));
  }, [stats, theme]);

  const difficultyBreakdown = useMemo(() => {
    if (!stats) return [];
    return [
      { level: "Easy", count: stats.byDifficulty.find(d => d.level === "Easy")?.count || 0, color: theme.palette.success.main },
      { level: "Medium", count: stats.byDifficulty.find(d => d.level === "Medium")?.count || 0, color: theme.palette.warning.main },
      { level: "Hard", count: stats.byDifficulty.find(d => d.level === "Hard")?.count || 0, color: theme.palette.error.main },
    ];
  }, [stats, theme]);

  const totalQuestions = stats?.totalQuestions || 0;
  const totalSets = stats?.totalSets || 0;

  return (
    <ChartCard
      title="Question Bank Overview"
      subtitle={`${totalQuestions.toLocaleString()} questions across ${totalSets} sets`}
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          {difficultyBreakdown.map((item) => (
            <Box key={item.level} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: item.color,
                }}
              />
              <Typography variant="body2">
                {item.level}: <strong>{item.count}</strong>
              </Typography>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ height: 220, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme.palette.divider}
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <YAxis
                dataKey="subject"
                type="category"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                }}
                formatter={(value: number, name: string) => [
                  `${value} ${name === "questions" ? "questions" : "sets"}`,
                  "",
                ]}
              />
              <Bar dataKey="questions" radius={[0, 4, 4, 0]}>
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            pt: 1,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {subjectData.slice(0, 3).map((item) => (
            <Box key={item.subject} sx={{ textAlign: "center" }}>
              <Chip
                label={item.subject}
                variant="outlined"
                size="small"
                sx={{ mb: 0.5 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {item.sets}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Question Sets
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </ChartCard>
  );
};
