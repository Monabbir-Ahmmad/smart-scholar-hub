import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

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
                "&:hover": {
                  boxShadow: theme.shadows[6],
                  transform: "translateY(-4px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      bgcolor: "primary.main",
                      fontSize: "1.5rem",
                      mr: 2,
                    }}
                  >
                    {child.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {child.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {child.grade}
                    </Typography>
                  </Box>
                  <Chip
                    label={child.enrollmentStatus}
                    color="success"
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    p: 1.5,
                    bgcolor: "action.hover",
                    borderRadius: 2,
                  }}
                >
                  <SchoolIcon sx={{ color: "primary.main", mr: 1 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {child.currentCourse}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={child.courseProgress}
                      sx={{ mt: 0.5, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ ml: 1, fontWeight: 600, color: "primary.main" }}
                  >
                    {child.courseProgress}%
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ textAlign: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, color: getScoreColor(child.averageScore) }}
                      >
                        {child.averageScore}%
                      </Typography>
                      {child.scoreTrend === "up" ? (
                        <TrendingUpIcon sx={{ color: "success.main", ml: 0.5 }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: "error.main", ml: 0.5 }} />
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Avg. Score
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
                      {child.upcomingSessions}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Upcoming
                    </Typography>
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
