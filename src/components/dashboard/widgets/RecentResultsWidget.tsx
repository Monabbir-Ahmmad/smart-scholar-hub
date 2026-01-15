import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { FileText, TrendingUp, TrendingDown } from "lucide-react";
import { ChartCard } from "../ChartCard";

interface Result {
  id: string;
  title: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  trend: "up" | "down" | "same";
}

const results: Result[] = [
  {
    id: "1",
    title: "Algebra Quiz #5",
    subject: "Mathematics",
    score: 92,
    maxScore: 100,
    date: "Today",
    trend: "up",
  },
  {
    id: "2",
    title: "Mechanics Test",
    subject: "Physics",
    score: 78,
    maxScore: 100,
    date: "Yesterday",
    trend: "up",
  },
  {
    id: "3",
    title: "Vocabulary Assessment",
    subject: "English",
    score: 88,
    maxScore: 100,
    date: "2 days ago",
    trend: "same",
  },
  {
    id: "4",
    title: "Periodic Table Quiz",
    subject: "Chemistry",
    score: 65,
    maxScore: 100,
    date: "3 days ago",
    trend: "down",
  },
];

interface RecentResultsWidgetProps {
  delay?: number;
}

export const RecentResultsWidget = ({ delay = 0 }: RecentResultsWidgetProps) => {
  const theme = useTheme();

  const getScoreColor = (score: number) => {
    if (score >= 90) return theme.palette.success.main;
    if (score >= 75) return theme.palette.primary.main;
    if (score >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <ChartCard
      title="Recent Results"
      subtitle="Your latest coursework scores"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {results.map((result, index) => {
          const scoreColor = getScoreColor(result.score);
          return (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + index * 0.08, duration: 0.4 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.muted, 0.5),
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: theme.palette.muted,
                  },
                  "&:hover .result-title": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Box
                  sx={{
                    p: 1.25,
                    borderRadius: 2,
                    bgcolor: alpha(scoreColor, 0.1),
                  }}
                >
                  <FileText style={{ width: 20, height: 20, color: scoreColor }} />
                </Box>
                
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    className="result-title"
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: "text.primary",
                      transition: "color 0.2s",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {result.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary", fontSize: "0.875rem" }}>
                    <span>{result.subject}</span>
                    <span>•</span>
                    <span>{result.date}</span>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {result.trend === "up" && (
                    <TrendingUp style={{ width: 16, height: 16, color: theme.palette.success.main }} />
                  )}
                  {result.trend === "down" && (
                    <TrendingDown style={{ width: 16, height: 16, color: theme.palette.error.main }} />
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: scoreColor,
                    }}
                  >
                    {result.score}%
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </ChartCard>
  );
};
