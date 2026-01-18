import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import { ChartCard } from "../ChartCard";
import { BookOpen, TrendingUp, Calendar, MoreVertical } from "lucide-react";

const children = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "E",
    grade: "Grade 8",
    enrolledCourses: 3,
    avgScore: 87,
    nextSession: "Today, 4:00 PM",
    attendance: 94,
    trend: "up",
  },
  {
    id: 2,
    name: "Liam Johnson",
    avatar: "L",
    grade: "Grade 5",
    enrolledCourses: 2,
    avgScore: 79,
    nextSession: "Tomorrow, 3:30 PM",
    attendance: 88,
    trend: "up",
  },
  {
    id: 3,
    name: "Olivia Johnson",
    avatar: "O",
    grade: "Grade 10",
    enrolledCourses: 4,
    avgScore: 92,
    nextSession: "Wed, 5:00 PM",
    attendance: 96,
    trend: "up",
  },
];

export const ChildrenOverviewWidget = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  return (
    <ChartCard title="My Children" subtitle="Quick overview of all children" delay={delay}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.1 }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
                "&:hover": {
                  bgcolor: alpha(theme.palette.success.main, 0.02),
                  borderColor: alpha(theme.palette.success.main, 0.3),
                },
                transition: "all 0.2s ease",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: "success.main",
                      fontWeight: 600,
                    }}
                  >
                    {child.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {child.grade}
                    </Typography>
                  </Box>
                </Box>
                <IconButton size="small">
                  <MoreVertical size={18} />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BookOpen size={16} style={{ color: theme.palette.text.secondary }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {child.enrolledCourses} Courses
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <TrendingUp size={16} style={{ color: theme.palette.success.main }} />
                  <Typography variant="body2" sx={{ color: "success.main", fontWeight: 500 }}>
                    {child.avgScore}% Avg
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Calendar size={16} style={{ color: theme.palette.text.secondary }} />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {child.nextSession}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", minWidth: 80 }}>
                  Attendance
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={child.attendance}
                  sx={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                      bgcolor: "success.main",
                    },
                  }}
                />
                <Chip
                  label={`${child.attendance}%`}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    color: "success.main",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </ChartCard>
  );
};
