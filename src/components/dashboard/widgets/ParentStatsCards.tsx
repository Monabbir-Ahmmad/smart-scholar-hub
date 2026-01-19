import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Users, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { getParentStats, type ParentStats } from "@/services";

export const ParentStatsCards = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [parentStats, setParentStats] = useState<ParentStats | null>(null);

  useEffect(() => {
    getParentStats().then(setParentStats);
  }, []);

  const stats = useMemo(() => {
    if (!parentStats) return [];
    return [
      {
        title: "Children",
        value: parentStats.totalChildren.toString(),
        subtitle: "Active enrollments",
        icon: Users,
        color: "#4CAF50",
        change: null,
      },
      {
        title: "Upcoming Sessions",
        value: parentStats.upcomingSessions.toString(),
        subtitle: "This week",
        icon: Calendar,
        color: "#2196F3",
        change: "+3 from last week",
        changeType: "positive" as const,
      },
      {
        title: "Average Score",
        value: `${parentStats.averageScore}%`,
        subtitle: "All children",
        icon: TrendingUp,
        color: "#FF9800",
        change: "+4% this month",
        changeType: "positive" as const,
      },
      {
        title: "Outstanding",
        value: `$${parentStats.outstandingBalance}`,
        subtitle: `${parentStats.pendingInvoices} invoices pending`,
        icon: DollarSign,
        color: "#f44336",
        change: "Due this week",
        changeType: "negative" as const,
      },
    ];
  }, [parentStats]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + index * 0.1 }}
        >
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: `1px solid ${theme.palette.divider}`,
              "&:hover": {
                boxShadow: theme.shadows[4],
              },
              transition: "all 0.2s ease",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                  {stat.title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {stat.subtitle}
                </Typography>
                {stat.change && (
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 1,
                      color:
                        stat.changeType === "positive"
                          ? "success.main"
                          : stat.changeType === "negative"
                          ? "error.main"
                          : "text.secondary",
                      fontWeight: 500,
                    }}
                  >
                    {stat.change}
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha(stat.color, 0.1),
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <stat.icon size={24} />
              </Box>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};
