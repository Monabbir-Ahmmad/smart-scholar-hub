import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Grid from "@mui/material/Grid";

const statsData = [
  {
    title: "Children Enrolled",
    value: "3",
    subtitle: "All active",
    icon: PeopleIcon,
    color: "#3B82F6",
    trend: null,
  },
  {
    title: "Upcoming Sessions",
    value: "9",
    subtitle: "This week",
    icon: EventIcon,
    color: "#8B5CF6",
    trend: "+2 from last week",
  },
  {
    title: "Avg. Performance",
    value: "85%",
    subtitle: "Across all subjects",
    icon: TrendingUpIcon,
    color: "#10B981",
    trend: "+3% improvement",
  },
  {
    title: "Outstanding Bills",
    value: "$725",
    subtitle: "3 pending invoices",
    icon: ReceiptIcon,
    color: "#F59E0B",
    trend: null,
  },
];

export const ParentStatsCards = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: "100%",
                  background: `linear-gradient(135deg, ${alpha(stat.color, 0.05)} 0%, ${alpha(stat.color, 0.02)} 100%)`,
                  borderLeft: `4px solid ${stat.color}`,
                  "&:hover": {
                    boxShadow: `0 8px 24px ${alpha(stat.color, 0.15)}`,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          fontWeight: 500,
                          mb: 0.5,
                        }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: stat.color,
                          lineHeight: 1.2,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          display: "block",
                          mt: 0.5,
                        }}
                      >
                        {stat.subtitle}
                      </Typography>
                      {stat.trend && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "success.main",
                            fontWeight: 600,
                            display: "block",
                            mt: 1,
                          }}
                        >
                          {stat.trend}
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: alpha(stat.color, 0.1),
                      }}
                    >
                      <IconComponent sx={{ fontSize: 24, color: stat.color }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};
