import { useTheme, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ChartCard } from "../ChartCard";
import { Video, Clock, ChevronRight } from "lucide-react";

const upcomingSessions = [
  { 
    student: "Alex Thompson", 
    lesson: "Calculus: Applications",
    date: "Today",
    time: "3:00 PM",
    duration: "60 min",
    isToday: true
  },
  { 
    student: "Sarah Johnson", 
    lesson: "Thermodynamics",
    date: "Today",
    time: "5:00 PM",
    duration: "45 min",
    isToday: true
  },
  { 
    student: "Emma Wilson", 
    lesson: "Genetics",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "60 min",
    isToday: false
  },
  { 
    student: "James Lee", 
    lesson: "Poetry Analysis",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: "45 min",
    isToday: false
  },
  { 
    student: "Michael Chen", 
    lesson: "Organic Chemistry",
    date: "Jan 18",
    time: "11:00 AM",
    duration: "60 min",
    isToday: false
  },
];

export const UpcomingSessionsCalendar = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Upcoming Sessions"
      subtitle="Your scheduled sessions"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {upcomingSessions.map((session, index) => (
          <Box 
            key={index} 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: session.isToday 
                ? alpha(theme.palette.primary.main, 0.08)
                : alpha(theme.palette.background.default, 0.5),
              border: `1px solid ${session.isToday ? alpha(theme.palette.primary.main, 0.2) : theme.palette.divider}`,
              transition: "all 0.2s",
              "&:hover": {
                bgcolor: session.isToday 
                  ? alpha(theme.palette.primary.main, 0.12)
                  : alpha(theme.palette.primary.main, 0.04),
              }
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: session.isToday ? "primary.main" : alpha(theme.palette.primary.main, 0.1),
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  fontWeight: 600, 
                  color: session.isToday ? "primary.contrastText" : "primary.main",
                  lineHeight: 1.2,
                }}
              >
                {session.date === "Today" ? "NOW" : session.date.split(" ")[0]}
              </Typography>
              {session.date !== "Today" && session.date !== "Tomorrow" && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontSize: "0.6rem",
                    color: session.isToday ? "primary.contrastText" : "text.secondary",
                  }}
                >
                  {session.date.split(" ")[1]}
                </Typography>
              )}
            </Box>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {session.lesson}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  sx={{
                    width: 18,
                    height: 18,
                    bgcolor: alpha(theme.palette.secondary.main, 0.2),
                    color: "secondary.main",
                    fontSize: "0.6rem",
                  }}
                >
                  {session.student.split(" ").map(n => n[0]).join("")}
                </Avatar>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {session.student}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
              <Clock style={{ width: 14, height: 14 }} />
              <Typography variant="caption">
                {session.time}
              </Typography>
            </Box>

            {session.isToday && (
              <Button
                variant="contained"
                size="small"
                startIcon={<Video style={{ width: 14, height: 14 }} />}
                sx={{
                  height: 32,
                  fontSize: "0.75rem",
                  textTransform: "none",
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: theme.shadows[2],
                  }
                }}
              >
                Join
              </Button>
            )}

            {!session.isToday && (
              <ChevronRight style={{ width: 18, height: 18, color: theme.palette.text.secondary }} />
            )}
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
