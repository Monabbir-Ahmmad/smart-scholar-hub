import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { getEnrollmentStatusData, type EnrollmentStatusData } from "@/services";

export const EnrollmentStatusChart = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [rawData, setRawData] = useState<EnrollmentStatusData[]>([]);

  useEffect(() => {
    getEnrollmentStatusData().then(setRawData);
  }, []);

  // Map colors based on status name
  const data = useMemo(() => {
    const colorMap: Record<string, string> = {
      "In Progress": theme.palette.success.main,
      "Pending Approval": theme.palette.warning.main,
      "Completed": theme.palette.primary.main,
      "Cancelled": theme.palette.error.main,
    };
    return rawData.map(item => ({
      ...item,
      color: colorMap[item.name] || theme.palette.grey[500],
    }));
  }, [rawData, theme]);

  return (
    <ChartCard
      title="Enrollment Status"
      subtitle="Current enrollment distribution"
      delay={delay}
    >
      <Box sx={{ height: 300, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
