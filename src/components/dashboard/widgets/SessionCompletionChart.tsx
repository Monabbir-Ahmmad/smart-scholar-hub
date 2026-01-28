import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getSessionCompletionData, type SessionCompletionData } from "@/services";

export const SessionCompletionChart = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [data, setData] = useState<SessionCompletionData[]>([]);

  useEffect(() => {
    getSessionCompletionData().then(setData);
  }, []);

  return (
    <ChartCard
      title="Session Completion Rate"
      subtitle="Weekly completion percentage"
      delay={delay}
    >
      <Box sx={{ height: 300, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis
              dataKey="week"
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
            />
            <YAxis
              domain={[70, 100]}
              tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
              formatter={(value: number) => [`${value}%`, "Completion Rate"]}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={theme.palette.success.main}
              strokeWidth={3}
              dot={{ fill: theme.palette.success.main, strokeWidth: 2 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </ChartCard>
  );
};
