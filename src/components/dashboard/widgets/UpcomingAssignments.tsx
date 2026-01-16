import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Clock, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { ChartCard } from "../ChartCard";
import { format, formatDistanceToNow, addDays, addHours } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  type: "quiz" | "homework" | "exam" | "project";
  dueDate: Date;
  status: "pending" | "in_progress" | "submitted";
  priority: "low" | "medium" | "high";
}

const now = new Date();

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Calculus Integration Quiz",
    subject: "Mathematics",
    type: "quiz",
    dueDate: addHours(now, 5),
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    title: "Physics Lab Report",
    subject: "Physics",
    type: "homework",
    dueDate: addDays(now, 1),
    status: "in_progress",
    priority: "high",
  },
  {
    id: "3",
    title: "Shakespeare Essay",
    subject: "English",
    type: "homework",
    dueDate: addDays(now, 3),
    status: "pending",
    priority: "medium",
  },
  {
    id: "4",
    title: "Chemistry Mid-term",
    subject: "Chemistry",
    type: "exam",
    dueDate: addDays(now, 5),
    status: "pending",
    priority: "high",
  },
  {
    id: "5",
    title: "History Research Project",
    subject: "History",
    type: "project",
    dueDate: addDays(now, 7),
    status: "in_progress",
    priority: "medium",
  },
];

interface UpcomingAssignmentsProps {
  delay?: number;
}

export const UpcomingAssignments = ({ delay = 0 }: UpcomingAssignmentsProps) => {
  const theme = useTheme();

  const getTypeColor = (type: Assignment["type"]) => {
    switch (type) {
      case "quiz":
        return { bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main };
      case "homework":
        return { bgcolor: alpha(theme.palette.secondary.main, 0.1), color: theme.palette.secondary.main };
      case "exam":
        return { bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main };
      case "project":
        return { bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main };
    }
  };

  const getPriorityBorderColor = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "high":
        return theme.palette.error.main;
      case "medium":
        return theme.palette.warning.main;
      case "low":
        return theme.palette.success.main;
    }
  };

  const getStatusIcon = (status: Assignment["status"]) => {
    switch (status) {
      case "pending":
        return <Clock style={{ width: 16, height: 16, color: theme.palette.text.secondary }} />;
      case "in_progress":
        return <AlertCircle style={{ width: 16, height: 16, color: theme.palette.warning.main }} />;
      case "submitted":
        return <CheckCircle2 style={{ width: 16, height: 16, color: theme.palette.success.main }} />;
    }
  };

  return (
    <ChartCard
      title="Upcoming Assignments"
      subtitle="Deadlines and coursework to complete"
      delay={delay}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.08, duration: 0.4 }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.muted, 0.5),
                borderLeft: `4px solid ${getPriorityBorderColor(assignment.priority)}`,
                transition: "background-color 0.2s",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: theme.palette.muted,
                },
                "&:hover .assignment-title": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, flex: 1 }}>
                  <Box sx={{ mt: 0.25 }}>
                    {getStatusIcon(assignment.status)}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      className="assignment-title"
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        transition: "color 0.2s",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {assignment.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {assignment.subject}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={assignment.type}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "0.75rem",
                    ...getTypeColor(assignment.type),
                  }}
                />
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5, fontSize: "0.875rem" }}>
                <Calendar style={{ width: 16, height: 16, color: theme.palette.text.secondary }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {format(assignment.dueDate, "MMM d, yyyy 'at' h:mm a")}
                </Typography>
                <Box
                  sx={{
                    fontSize: "0.75rem",
                    px: 1,
                    py: 0.25,
                    borderRadius: 10,
                    bgcolor: theme.palette.muted,
                    color: "text.secondary",
                  }}
                >
                  {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </ChartCard>
  );
};
