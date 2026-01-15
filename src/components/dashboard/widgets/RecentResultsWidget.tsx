import { motion } from "framer-motion";
import { FileText, CheckCircle, Trophy, TrendingUp, TrendingDown } from "lucide-react";
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

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 75) return "text-primary";
  if (score >= 60) return "text-accent";
  return "text-destructive";
};

const getScoreBg = (score: number) => {
  if (score >= 90) return "bg-success/10";
  if (score >= 75) return "bg-primary/10";
  if (score >= 60) return "bg-accent/10";
  return "bg-destructive/10";
};

interface RecentResultsWidgetProps {
  delay?: number;
}

export const RecentResultsWidget = ({ delay = 0 }: RecentResultsWidgetProps) => {
  return (
    <ChartCard
      title="Recent Results"
      subtitle="Your latest coursework scores"
      delay={delay}
    >
      <div className="space-y-3">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.08, duration: 0.4 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
          >
            <div className={`p-2.5 rounded-lg ${getScoreBg(result.score)}`}>
              <FileText className={`w-5 h-5 ${getScoreColor(result.score)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {result.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{result.subject}</span>
                <span>•</span>
                <span>{result.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {result.trend === "up" && (
                <TrendingUp className="w-4 h-4 text-success" />
              )}
              {result.trend === "down" && (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
              <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
};
