import { useState, useEffect } from "react";
import { useTheme, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import { getTopTeachers, type TopTeacherData } from "@/services";

export const TopTeachersTable = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [teachers, setTeachers] = useState<TopTeacherData[]>([]);

  useEffect(() => {
    getTopTeachers().then(setTeachers);
  }, []);

  return (
    <ChartCard
      title="Top Teachers"
      subtitle="By completed sessions this month"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {teachers.map((teacher, index) => (
          <Box key={teacher.name} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "text.secondary", width: 16 }}
            >
              {index + 1}
            </Typography>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              {teacher.name.split(" ").map(n => n[0]).join("")}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                >
                  {teacher.name}
                </Typography>
                <Chip
                  label={teacher.subject}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: "0.75rem",
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: "secondary.main",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={teacher.completion}
                  sx={{
                    flex: 1,
                    height: 6,
                    borderRadius: 1,
                    bgcolor: theme.palette.muted,
                  }}
                />
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {teacher.completion}%
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {teacher.sessions}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                sessions
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
