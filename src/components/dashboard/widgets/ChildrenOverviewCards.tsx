import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import MessageIcon from "@mui/icons-material/Message";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const childrenData = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "E",
    grade: "Grade 8",
    enrollmentStatus: "Active",
    currentCourse: "Advanced Mathematics",
    courseProgress: 72,
    averageScore: 88,
    scoreTrend: "up",
    upcomingSessions: 3,
    color: "#7c3aed",
  },
  {
    id: 2,
    name: "Liam Johnson",
    avatar: "L",
    grade: "Grade 5",
    enrollmentStatus: "Active",
    currentCourse: "Science Fundamentals",
    courseProgress: 45,
    averageScore: 76,
    scoreTrend: "down",
    upcomingSessions: 2,
    color: "#059669",
  },
  {
    id: 3,
    name: "Sophie Johnson",
    avatar: "S",
    grade: "Grade 10",
    enrollmentStatus: "Active",
    currentCourse: "English Literature",
    courseProgress: 89,
    averageScore: 92,
    scoreTrend: "up",
    upcomingSessions: 4,
    color: "#db2777",
  },
];

export const ChildrenOverviewCards = () => {
  const theme = useTheme();

  const getScoreColor = (score: number) => {
    if (score >= 85) return theme.palette.success.main;
    if (score >= 70) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Grid container spacing={3}>
      {childrenData.map((child, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={child.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card
              sx={{
                height: "100%",
                position: "relative",
                overflow: "visible",
                "&:hover": {
                  boxShadow: `0 12px 32px ${alpha(child.color, 0.2)}`,
                  transform: "translateY(-4px)",
                },
                transition: "all 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  borderRadius: "12px 12px 0 0",
                  background: child.color,
                },
              }}
            >
              <CardContent sx={{ pt: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: alpha(child.color, 0.15),
                      color: child.color,
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      mr: 2,
                    }}
                  >
                    {child.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {child.grade}
                    </Typography>
                  </Box>
                  <Chip
                    label={child.enrollmentStatus}
                    size="small"
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: theme.palette.success.main,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2.5,
                    p: 2,
                    bgcolor: alpha(child.color, 0.04),
                    borderRadius: 2,
                    border: `1px solid ${alpha(child.color, 0.1)}`,
                  }}
                >
                  <SchoolIcon sx={{ color: child.color, mr: 1.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {child.currentCourse}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={child.courseProgress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: alpha(child.color, 0.15),
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 4,
                          bgcolor: child.color,
                        },
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ ml: 2, fontWeight: 700, color: child.color }}
                  >
                    {child.courseProgress}%
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ textAlign: "center", flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: getScoreColor(child.averageScore) }}
                      >
                        {child.averageScore}%
                      </Typography>
                      {child.scoreTrend === "up" ? (
                        <TrendingUpIcon sx={{ color: "success.main", ml: 0.5, fontSize: 20 }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: "error.main", ml: 0.5, fontSize: 20 }} />
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Avg. Score
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 1,
                      height: 40,
                      bgcolor: "divider",
                    }}
                  />
                  <Box sx={{ textAlign: "center", flex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
                      {child.upcomingSessions}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Upcoming
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 1,
                      height: 40,
                      bgcolor: "divider",
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 0.5, flex: 1, justifyContent: "center" }}>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: alpha(child.color, 0.1),
                        color: child.color,
                        "&:hover": { bgcolor: alpha(child.color, 0.2) },
                      }}
                    >
                      <CalendarTodayIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                      }}
                    >
                      <MessageIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};
