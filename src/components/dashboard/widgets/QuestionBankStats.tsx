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
import { Badge } from "@/components/ui/badge";

const subjectData = [
  { subject: "Math", questions: 850, sets: 42, color: "hsl(var(--primary))" },
  { subject: "Physics", questions: 620, sets: 35, color: "hsl(var(--secondary))" },
  { subject: "Chemistry", questions: 540, sets: 28, color: "hsl(var(--success))" },
  { subject: "Biology", questions: 480, sets: 25, color: "hsl(var(--accent))" },
  { subject: "English", questions: 390, sets: 22, color: "hsl(var(--primary))" },
  { subject: "History", questions: 280, sets: 18, color: "hsl(var(--secondary))" },
];

const difficultyBreakdown = [
  { level: "Easy", count: 1240, color: "bg-success" },
  { level: "Medium", count: 1580, color: "bg-accent" },
  { level: "Hard", count: 820, color: "bg-destructive" },
];

export const QuestionBankStats = ({ delay = 0 }: { delay?: number }) => {
  const totalQuestions = subjectData.reduce((acc, item) => acc + item.questions, 0);
  const totalSets = subjectData.reduce((acc, item) => acc + item.sets, 0);

  return (
    <ChartCard
      title="Question Bank Overview"
      subtitle={`${totalQuestions.toLocaleString()} questions across ${totalSets} sets`}
      delay={delay}
    >
      <div className="space-y-6">
        <div className="flex gap-4">
          {difficultyBreakdown.map((item) => (
            <div key={item.level} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm">
                {item.level}: <strong>{item.count}</strong>
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={subjectData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="subject" type="category" className="text-xs" width={70} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
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
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t">
          {subjectData.slice(0, 3).map((item) => (
            <div key={item.subject} className="text-center">
              <Badge variant="outline" className="mb-1">{item.subject}</Badge>
              <p className="text-lg font-bold">{item.sets}</p>
              <p className="text-xs text-muted-foreground">Question Sets</p>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};
