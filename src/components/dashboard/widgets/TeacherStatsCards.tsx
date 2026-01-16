import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Users, Calendar, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    title: "Active Students",
    value: "24",
    change: "+3 this month",
    icon: Users,
    color: "primary" as const,
  },
  {
    title: "Sessions This Month",
    value: "48",
    change: "8 remaining",
    icon: Calendar,
    color: "secondary" as const,
  },
  {
    title: "Avg. Student Score",
    value: "82.5%",
    change: "+4.2% improvement",
    icon: TrendingUp,
    color: "success" as const,
  },
  {
    title: "Teaching Hours",
    value: "36h",
    change: "This month",
    icon: Clock,
    color: "warning" as const,
  },
];

export const TeacherStatsCards = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const getColor = (colorName: string) => {
    switch (colorName) {
      case "primary":
        return theme.palette.primary.main;
      case "secondary":
        return theme.palette.secondary.main;
      case "success":
        return theme.palette.success.main;
      case "warning":
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", lg: "repeat(4, 1fr)" }, gap: 2 }}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + index * 0.05, duration: 0.4 }}
        >
          <Box
            sx={{
              p: 2.5,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              transition: "all 0.2s",
              "&:hover": {
                boxShadow: theme.shadows[4],
                borderColor: alpha(getColor(stat.color), 0.3),
              }
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: alpha(getColor(stat.color), 0.1),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <stat.icon style={{ width: 20, height: 20, color: getColor(stat.color) }} />
              </Box>
            </Box>
            
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              {stat.value}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 0.5 }}>
              {stat.title}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: getColor(stat.color),
                fontWeight: 500,
              }}
            >
              {stat.change}
            </Typography>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};
