import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { ChartCard } from "../ChartCard";
import { BookOpen, FileText, Video, ClipboardList } from "lucide-react";

const recentLessons = [
  { title: "Advanced Calculus: Integration", subject: "Mathematics", duration: "45 min" },
  { title: "Organic Chemistry Basics", subject: "Chemistry", duration: "60 min" },
  { title: "Quantum Physics Introduction", subject: "Physics", duration: "50 min" },
];

export const LessonContentStats = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const contentTypes = [
    { 
      type: "Lessons", 
      count: 248, 
      icon: BookOpen, 
      color: theme.palette.primary.main,
      change: "+12 this week"
    },
    { 
      type: "Coursework", 
      count: 186, 
      icon: ClipboardList, 
      color: theme.palette.secondary.main,
      change: "+8 this week"
    },
    { 
      type: "Assessments", 
      count: 94, 
      icon: FileText, 
      color: theme.palette.success.main,
      change: "+5 this week"
    },
    { 
      type: "Resources", 
      count: 312, 
      icon: Video, 
      color: theme.palette.warning.main,
      change: "+18 this week"
    },
  ];

  return (
    <ChartCard
      title="Course Content"
      subtitle="Lessons, coursework & learning materials"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {contentTypes.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + index * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 3,
                  "&:hover": {
                    boxShadow: theme.shadows[3],
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: alpha(item.color, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.5,
                  }}
                >
                  <item.icon style={{ width: 20, height: 20, color: item.color }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {item.count}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                  {item.type}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {item.change}
                </Typography>
              </Card>
            </motion.div>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "text.secondary" }}>
            Recently Added Lessons
          </Typography>
          {recentLessons.map((lesson) => (
            <Box
              key={lesson.title}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.muted, 0.5),
                transition: "background-color 0.2s",
                "&:hover": {
                  bgcolor: theme.palette.muted,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookOpen style={{ width: 16, height: 16, color: theme.palette.primary.main }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {lesson.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {lesson.subject}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {lesson.duration}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </ChartCard>
  );
};
