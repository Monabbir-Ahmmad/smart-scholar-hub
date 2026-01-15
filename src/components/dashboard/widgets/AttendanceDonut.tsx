import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "../ChartCard";
import { CheckCircle, XCircle, Clock } from "lucide-react";

const attendanceData = [
  { name: "Attended", value: 42, color: "hsl(var(--success))" },
  { name: "Missed", value: 3, color: "hsl(var(--destructive))" },
  { name: "Rescheduled", value: 5, color: "hsl(var(--accent))" },
];

const totalSessions = attendanceData.reduce((sum, item) => sum + item.value, 0);
const attendanceRate = Math.round((attendanceData[0].value / totalSessions) * 100);

interface AttendanceDonutProps {
  delay?: number;
}

export const AttendanceDonut = ({ delay = 0 }: AttendanceDonutProps) => {
  return (
    <ChartCard
      title="Session Attendance"
      subtitle="Your attendance record"
      delay={delay}
    >
      <div className="flex items-center gap-6">
        {/* Donut Chart */}
        <div className="relative w-36 h-36">
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
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{attendanceRate}%</span>
            <span className="text-xs text-muted-foreground">Rate</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {attendanceData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-semibold text-foreground">{item.value}</span>
            </motion.div>
          ))}
          
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Sessions</span>
              <span className="font-bold text-foreground">{totalSessions}</span>
            </div>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};
