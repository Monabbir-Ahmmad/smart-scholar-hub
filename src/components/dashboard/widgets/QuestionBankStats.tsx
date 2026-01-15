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

export const QuestionBankStats = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const subjectData = [
    { subject: "Math", questions: 850, sets: 42, color: theme.palette.primary.main },
    { subject: "Physics", questions: 620, sets: 35, color: theme.palette.secondary.main },
    { subject: "Chemistry", questions: 540, sets: 28, color: theme.palette.success.main },
    { subject: "Biology", questions: 480, sets: 25, color: theme.palette.warning.main },
    { subject: "English", questions: 390, sets: 22, color: theme.palette.primary.main },
    { subject: "History", questions: 280, sets: 18, color: theme.palette.secondary.main },
  ];

  const difficultyBreakdown = [
    { level: "Easy", count: 1240, color: theme.palette.success.main },
    { level: "Medium", count: 1580, color: theme.palette.warning.main },
    { level: "Hard", count: 820, color: theme.palette.error.main },
  ];

  const totalQuestions = subjectData.reduce((acc, item) => acc + item.questions, 0);
  const totalSets = subjectData.reduce((acc, item) => acc + item.sets, 0);

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
