import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
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
import { getSubjectMastery, type SubjectMasteryData } from "@/services";

interface SubjectMasteryRadarProps {
  delay?: number;
}

export const SubjectMasteryRadar = ({ delay = 0 }: SubjectMasteryRadarProps) => {
  const theme = useTheme();
  const [masteryData, setMasteryData] = useState<SubjectMasteryData[]>([]);

  useEffect(() => {
    getSubjectMastery().then(setMasteryData);
  }, []);

  const { averageScore, strongestSubject, weakestSubject } = useMemo(() => {
    if (masteryData.length === 0) {
      return {
        averageScore: 0,
        strongestSubject: { subject: "N/A", score: 0 },
        weakestSubject: { subject: "N/A", score: 0 },
      };
    }
    const avg = Math.round(
      masteryData.reduce((sum, item) => sum + item.score, 0) / masteryData.length
    );
    const strongest = masteryData.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );
    const weakest = masteryData.reduce((prev, current) =>
      prev.score < current.score ? prev : current
    );
    return { averageScore: avg, strongestSubject: strongest, weakestSubject: weakest };
  }, [masteryData]);

  return (
    <ChartCard
      title="Subject Mastery"
      subtitle="Performance across all subjects"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Radar Chart */}
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={masteryData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid 
                stroke={theme.palette.divider}
                strokeDasharray="3 3"
              />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ 
                  fill: theme.palette.text.secondary, 
                  fontSize: 11,
                  fontWeight: 500 
                }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]}
                tick={{ fill: theme.palette.text.secondary, fontSize: 10 }}
                tickCount={5}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 12,
                  boxShadow: theme.shadows[5],
                }}
                formatter={(value: number) => [`${value}%`, "Mastery"]}
              />
              <Radar
                name="Mastery"
                dataKey="score"
                stroke={theme.palette.primary.main}
                strokeWidth={2}
                fill={theme.palette.primary.main}
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1.5 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3 }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.muted, 0.5),
                textAlign: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", color: "primary.main", mb: 0.5 }}>
                <Target style={{ width: 16, height: 16 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
                {averageScore}%
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Average
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.4 }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.success.main, 0.1),
                textAlign: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", color: "success.main", mb: 0.5 }}>
                <Star style={{ width: 16, height: 16 }} />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
                {strongestSubject.subject}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {strongestSubject.score}% Best
              </Typography>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
          >
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.warning.main, 0.1),
                textAlign: "center",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", color: "warning.main", mb: 0.5 }}>
                <Target style={{ width: 16, height: 16 }} />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
                {weakestSubject.subject}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {weakestSubject.score}% Focus
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </ChartCard>
  );
};
