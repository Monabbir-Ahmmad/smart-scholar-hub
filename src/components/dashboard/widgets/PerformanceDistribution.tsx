import { useState, useEffect, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getPerformanceDistribution, type PerformanceDistributionData } from "@/services";

export const PerformanceDistribution = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [rawData, setRawData] = useState<PerformanceDistributionData[]>([]);

  useEffect(() => {
    getPerformanceDistribution().then(setRawData);
  }, []);

  const data = useMemo(() => {
    const colorMap: Record<string, string> = {
      "0-50%": theme.palette.error.main,
      "51-70%": theme.palette.warning.main,
      "71-85%": theme.palette.primary.main,
      "86-95%": theme.palette.success.main,
      "96-100%": theme.palette.success.main,
    };
    return rawData.map(item => ({
      ...item,
      color: colorMap[item.range] || theme.palette.grey[500],
    }));
  }, [rawData, theme]);

  const totalStudents = data.reduce((acc, item) => acc + item.count, 0);
  const avgPerformance = 78.5;

  return (
    <ChartCard
      title="Performance Distribution"
      subtitle="Coursework scores across all students"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {totalStudents} total submissions
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Avg: <Box component="span" sx={{ color: "primary.main" }}>{avgPerformance}%</Box>
          </Typography>
        </Box>

        <Box sx={{ height: 240, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis
                dataKey="range"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              />
              <YAxis tick={{ fill: theme.palette.text.secondary, fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 8,
                }}
                formatter={(value: number) => [`${value} students`, "Count"]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </ChartCard>
  );
};
