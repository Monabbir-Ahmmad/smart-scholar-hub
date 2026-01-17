import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartCard } from "../ChartCard";

const attendanceData = [
  { name: "Completed", value: 45, color: "#22c55e" },
  { name: "Missed", value: 5, color: "#ef4444" },
  { name: "Cancelled", value: 3, color: "#f59e0b" },
  { name: "Upcoming", value: 12, color: "#3b82f6" },
];

const childAttendance = [
  { name: "Emma", completed: 18, missed: 1, cancelled: 1, rate: 95 },
  { name: "Liam", completed: 12, missed: 3, cancelled: 1, rate: 80 },
  { name: "Sophie", completed: 15, missed: 1, cancelled: 1, rate: 88 },
];

export const FamilyAttendanceSummary = () => {
  const theme = useTheme();

  const totalSessions = attendanceData.reduce((acc, curr) => acc + curr.value, 0);
  const completedRate = Math.round(
    (attendanceData[0].value / (totalSessions - attendanceData[3].value)) * 100
  );

  return (
    <ChartCard title="Attendance Summary" subtitle="Family session attendance overview">
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <Box sx={{ width: { xs: "100%", md: "50%" }, height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                }}
                formatter={(value: number) => [`${value} sessions`, ""]}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ textAlign: "center", mt: -6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main" }}>
              {completedRate}%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Completion Rate
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            By Child
          </Typography>
          {childAttendance.map((child) => (
            <Box
              key={child.name}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.5,
                mb: 1,
                bgcolor: "action.hover",
                borderRadius: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {child.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {child.completed} completed • {child.missed} missed • {child.cancelled} cancelled
                </Typography>
              </Box>
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  bgcolor:
                    child.rate >= 90
                      ? "success.light"
                      : child.rate >= 80
                      ? "warning.light"
                      : "error.light",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color:
                      child.rate >= 90
                        ? "success.dark"
                        : child.rate >= 80
                        ? "warning.dark"
                        : "error.dark",
                  }}
                >
                  {child.rate}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </ChartCard>
  );
};
