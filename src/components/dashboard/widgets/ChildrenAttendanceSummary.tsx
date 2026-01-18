import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartCard } from "../ChartCard";

const childrenAttendance = [
  { name: "Emma", attended: 47, missed: 3, total: 50 },
  { name: "Liam", attended: 35, missed: 5, total: 40 },
  { name: "Olivia", attended: 58, missed: 2, total: 60 },
];

const aggregatedData = [
  {
    name: "Attended",
    value: childrenAttendance.reduce((sum, c) => sum + c.attended, 0),
    color: "#4CAF50",
  },
  {
    name: "Missed",
    value: childrenAttendance.reduce((sum, c) => sum + c.missed, 0),
    color: "#f44336",
  },
];

const totalSessions = aggregatedData.reduce((sum, d) => sum + d.value, 0);
const attendanceRate = Math.round((aggregatedData[0].value / totalSessions) * 100);

export const ChildrenAttendanceSummary = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Attendance Summary"
      subtitle="All children combined"
      delay={delay}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <Box sx={{ width: 200, height: 200, position: "relative" }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {aggregatedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                }}
                formatter={(value: number, name: string) => [
                  `${value} sessions`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "success.main" }}>
              {attendanceRate}%
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Overall
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
            By Child
          </Typography>
          {childrenAttendance.map((child) => {
            const rate = Math.round((child.attended / child.total) * 100);
            return (
              <Box key={child.name} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="body2">{child.name}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {rate}%
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(theme.palette.divider, 0.3),
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${rate}%`,
                      height: "100%",
                      borderRadius: 4,
                      bgcolor:
                        rate >= 90
                          ? "success.main"
                          : rate >= 80
                          ? "warning.main"
                          : "error.main",
                      transition: "width 0.5s ease",
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {child.attended} of {child.total} sessions
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 2,
          pt: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: "center",
        }}
      >
        {aggregatedData.map((item) => (
          <Box key={item.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: item.color,
              }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.name}: {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
