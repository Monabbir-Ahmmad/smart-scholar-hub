import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BookOpen, CheckCircle } from "lucide-react";
import { ChartCard } from "../ChartCard";

interface Course {
  id: string;
  title: string;
  teacher: string;
  progress: number;
  completedSessions: number;
  totalSessions: number;
  status: "in_progress" | "completed" | "upcoming";
  colorKey: "primary" | "secondary" | "success" | "warning";
}

interface CourseProgressWidgetProps {
  delay?: number;
}

export const CourseProgressWidget = ({ delay = 0 }: CourseProgressWidgetProps) => {
  const theme = useTheme();

  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced Mathematics",
      teacher: "Dr. Sarah Chen",
      progress: 75,
      completedSessions: 15,
      totalSessions: 20,
      status: "in_progress",
      colorKey: "primary",
    },
    {
      id: "2",
      title: "Physics Fundamentals",
      teacher: "Prof. James Wilson",
      progress: 60,
      completedSessions: 12,
      totalSessions: 20,
      status: "in_progress",
      colorKey: "secondary",
    },
    {
      id: "3",
      title: "English Literature",
      teacher: "Ms. Emily Parker",
      progress: 90,
      completedSessions: 18,
      totalSessions: 20,
      status: "in_progress",
      colorKey: "success",
    },
    {
      id: "4",
      title: "Chemistry Basics",
      teacher: "Dr. Michael Brown",
      progress: 45,
      completedSessions: 9,
      totalSessions: 20,
      status: "in_progress",
      colorKey: "warning",
    },
  ];

  const getColor = (colorKey: Course["colorKey"]) => {
    return theme.palette[colorKey].main;
  };

  return (
    <ChartCard
      title="Course Progress"
      subtitle="Your active course enrollments"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {courses.map((course, index) => {
          const color = getColor(course.colorKey);
          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1, duration: 0.4 }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.muted, 0.5),
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: theme.palette.muted,
                  },
                  "&:hover .course-title": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(color, 0.2),
                      }}
                    >
                      <BookOpen style={{ width: 20, height: 20, color }} />
                    </Box>
                    <Box>
                      <Typography
                        className="course-title"
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          transition: "color 0.2s",
                        }}
                      >
                        {course.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {course.teacher}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary", fontSize: "0.875rem" }}>
                    <CheckCircle style={{ width: 16, height: 16 }} />
                    <span>{course.completedSessions}/{course.totalSessions}</span>
                  </Box>
                </Box>
                
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      Progress
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                      {course.progress}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      height: 8,
                      bgcolor: theme.palette.muted,
                      borderRadius: 1,
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ delay: delay + index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        height: "100%",
                        borderRadius: 4,
                        backgroundColor: color,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </ChartCard>
  );
};
