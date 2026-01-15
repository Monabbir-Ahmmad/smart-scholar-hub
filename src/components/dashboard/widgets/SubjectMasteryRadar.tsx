import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartCard } from "../ChartCard";
import { Target, Star } from "lucide-react";

const masteryData = [
  { subject: "Mathematics", score: 85, fullMark: 100 },
  { subject: "Physics", score: 72, fullMark: 100 },
  { subject: "Chemistry", score: 68, fullMark: 100 },
  { subject: "English", score: 90, fullMark: 100 },
  { subject: "Biology", score: 78, fullMark: 100 },
  { subject: "History", score: 82, fullMark: 100 },
];

const averageScore = Math.round(
  masteryData.reduce((sum, item) => sum + item.score, 0) / masteryData.length
);

const strongestSubject = masteryData.reduce((prev, current) => 
  prev.score > current.score ? prev : current
);

const weakestSubject = masteryData.reduce((prev, current) => 
  prev.score < current.score ? prev : current
);

interface SubjectMasteryRadarProps {
  delay?: number;
}

export const SubjectMasteryRadar = ({ delay = 0 }: SubjectMasteryRadarProps) => {
  return (
    <ChartCard
      title="Subject Mastery"
      subtitle="Performance across all subjects"
      delay={delay}
    >
      <div className="space-y-4">
        {/* Radar Chart */}
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={masteryData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid 
                stroke="hsl(var(--border))" 
                strokeDasharray="3 3"
              />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ 
                  fill: "hsl(var(--muted-foreground))", 
                  fontSize: 11,
                  fontWeight: 500 
                }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                tickCount={5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-lg)",
                }}
                formatter={(value: number) => [`${value}%`, "Mastery"]}
              />
              <Radar
                name="Mastery"
                dataKey="score"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3 }}
            className="p-3 rounded-xl bg-muted/50 text-center"
          >
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Target className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4 }}
            className="p-3 rounded-xl bg-success/10 text-center"
          >
            <div className="flex items-center justify-center gap-1 text-success mb-1">
              <Star className="w-4 h-4" />
            </div>
            <p className="text-lg font-bold text-foreground">{strongestSubject.subject}</p>
            <p className="text-xs text-muted-foreground">{strongestSubject.score}% Best</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
            className="p-3 rounded-xl bg-accent/10 text-center"
          >
            <div className="flex items-center justify-center gap-1 text-accent mb-1">
              <Target className="w-4 h-4" />
            </div>
            <p className="text-lg font-bold text-foreground">{weakestSubject.subject}</p>
            <p className="text-xs text-muted-foreground">{weakestSubject.score}% Focus</p>
          </motion.div>
        </div>
      </div>
    </ChartCard>
  );
};
