import { useTheme, alpha } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const sessions = [
  { 
    student: "Alex Thompson", 
    lesson: "Calculus: Derivatives",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "60 min",
    status: "completed"
  },
  { 
    student: "Sarah Johnson", 
    lesson: "Newton's Laws of Motion",
    date: "2024-01-15",
    time: "2:00 PM",
    duration: "45 min",
    status: "completed"
  },
  { 
    student: "Michael Chen", 
    lesson: "Chemical Bonding",
    date: "2024-01-14",
    time: "11:00 AM",
    duration: "60 min",
    status: "missed"
  },
  { 
    student: "Emma Wilson", 
    lesson: "Cell Biology",
    date: "2024-01-14",
    time: "3:00 PM",
    duration: "45 min",
    status: "completed"
  },
  { 
    student: "James Lee", 
    lesson: "Shakespeare Analysis",
    date: "2024-01-13",
    time: "4:00 PM",
    duration: "60 min",
    status: "cancelled"
  },
  { 
    student: "Alex Thompson", 
    lesson: "Calculus: Integration",
    date: "2024-01-12",
    time: "10:00 AM",
    duration: "60 min",
    status: "completed"
  },
];

export const SessionHistoryTable = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { 
          color: theme.palette.success.main, 
          bgcolor: alpha(theme.palette.success.main, 0.1),
          icon: CheckCircle,
          label: "Completed"
        };
      case "missed":
        return { 
          color: theme.palette.error.main, 
          bgcolor: alpha(theme.palette.error.main, 0.1),
          icon: XCircle,
          label: "Missed"
        };
      case "cancelled":
        return { 
          color: theme.palette.warning.main, 
          bgcolor: alpha(theme.palette.warning.main, 0.1),
          icon: AlertCircle,
          label: "Cancelled"
        };
      default:
        return { 
          color: theme.palette.text.secondary, 
          bgcolor: theme.palette.muted,
          icon: Clock,
          label: status
        };
    }
  };

  return (
    <ChartCard
      title="Session History"
      subtitle="Recent teaching sessions"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {sessions.map((session, index) => {
          const statusConfig = getStatusConfig(session.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <Box 
              key={index} 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 2,
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.default, 0.5),
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                }}
              >
                {session.student.split(" ").map(n => n[0]).join("")}
              </Avatar>
              
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
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {session.student}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "right", display: { xs: "none", sm: "block" } }}>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {session.date}
                </Typography>
                <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                  {session.time} • {session.duration}
                </Typography>
              </Box>

              <Chip
                icon={<StatusIcon style={{ width: 14, height: 14 }} />}
                label={statusConfig.label}
                size="small"
                sx={{
                  height: 26,
                  fontSize: "0.7rem",
                  bgcolor: statusConfig.bgcolor,
                  color: statusConfig.color,
                  "& .MuiChip-icon": {
                    color: statusConfig.color,
                  }
                }}
              />
            </Box>
          );
        })}
      </Box>
    </ChartCard>
  );
};
