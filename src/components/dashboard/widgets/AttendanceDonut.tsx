import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "../ChartCard";

interface AttendanceDonutProps {
  delay?: number;
}

export const AttendanceDonut = ({ delay = 0 }: AttendanceDonutProps) => {
  const theme = useTheme();

  const attendanceData = [
    { name: "Attended", value: 42, color: theme.palette.success.main },
    { name: "Missed", value: 3, color: theme.palette.error.main },
    { name: "Rescheduled", value: 5, color: theme.palette.warning.main },
  ];

  const totalSessions = attendanceData.reduce((sum, item) => sum + item.value, 0);
  const attendanceRate = Math.round((attendanceData[0].value / totalSessions) * 100);

  return (
    <ChartCard
      title="Session Attendance"
      subtitle="Your attendance record"
      delay={delay}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Donut Chart */}
        <Box sx={{ position: "relative", width: 144, height: 144 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary" }}>
              {attendanceRate}%
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Rate
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {attendanceData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: item.color,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {item.name}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {item.value}
                </Typography>
              </Box>
            </motion.div>
          ))}
          
          <Box sx={{ pt: 1, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Total Sessions
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
                {totalSessions}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChartCard>
  );
};
