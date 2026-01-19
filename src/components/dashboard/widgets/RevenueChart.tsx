import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
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
  Legend,
} from "recharts";
import { getRevenueData, type RevenueData } from "@/services";

export const RevenueChart = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [data, setData] = useState<RevenueData[]>([]);

  useEffect(() => {
    getRevenueData().then(setData);
  }, []);

  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Monthly billing vs payments"
      delay={delay}
    >
      <Box sx={{ height: 300, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="month"
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Legend />
            <Bar
              dataKey="billed"
              name="Billed"
              fill={theme.palette.primary.main}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="paid"
              name="Paid"
              fill={theme.palette.success.main}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
