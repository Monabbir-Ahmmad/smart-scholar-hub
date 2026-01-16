import { useTheme, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ChartCard } from "../ChartCard";
import { MessageCircle, Calendar, TrendingUp, TrendingDown } from "lucide-react";

const students = [
  { 
    name: "Alex Thompson", 
    course: "Advanced Mathematics", 
    progress: 78, 
    sessions: 12, 
    avgScore: 85,
    trend: "up",
    status: "active"
  },
  { 
    name: "Sarah Johnson", 
    course: "Physics Fundamentals", 
    progress: 92, 
    sessions: 18, 
    avgScore: 91,
    trend: "up",
    status: "active"
  },
  { 
    name: "Michael Chen", 
    course: "Chemistry 101", 
    progress: 45, 
    sessions: 6, 
    avgScore: 72,
    trend: "down",
    status: "at-risk"
  },
  { 
    name: "Emma Wilson", 
    course: "Biology Basics", 
    progress: 65, 
    sessions: 10, 
    avgScore: 78,
    trend: "up",
    status: "active"
  },
  { 
    name: "James Lee", 
    course: "English Literature", 
    progress: 88, 
    sessions: 15, 
    avgScore: 88,
    trend: "up",
    status: "active"
  },
];

export const StudentManagementTable = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return theme.palette.success.main;
      case "at-risk":
        return theme.palette.warning.main;
      case "inactive":
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <ChartCard
      title="Student Management"
      subtitle="Active students and their enrollment progress"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {students.map((student) => (
          <Box 
            key={student.name} 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              transition: "background-color 0.2s",
              "&:hover": {
                bgcolor: alpha(theme.palette.primary.main, 0.04),
              }
            }}
          >
            <Avatar
              sx={{
                width: 44,
                height: 44,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            >
              {student.name.split(" ").map(n => n[0]).join("")}
            </Avatar>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {student.name}
                </Typography>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: getStatusColor(student.status),
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={student.course}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.7rem",
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: "secondary.main",
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ width: 120, display: { xs: "none", md: "block" } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Progress
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {student.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={student.progress}
                sx={{
                  height: 6,
                  borderRadius: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  "& .MuiLinearProgress-bar": {
                    bgcolor: student.progress > 70 ? "success.main" : student.progress > 40 ? "warning.main" : "error.main",
                  }
                }}
              />
            </Box>

            <Box sx={{ textAlign: "center", width: 60, display: { xs: "none", sm: "block" } }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {student.avgScore}%
                </Typography>
                {student.trend === "up" ? (
                  <TrendingUp style={{ width: 14, height: 14, color: theme.palette.success.main }} />
                ) : (
                  <TrendingDown style={{ width: 14, height: 14, color: theme.palette.error.main }} />
                )}
              </Box>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Avg Score
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Schedule Session">
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <Calendar style={{ width: 16, height: 16 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Message">
                <IconButton size="small" sx={{ color: "text.secondary" }}>
                  <MessageCircle style={{ width: 16, height: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
