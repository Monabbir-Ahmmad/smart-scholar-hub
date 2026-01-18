import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { ChartCard } from "../ChartCard";
import { Clock, Video, MapPin } from "lucide-react";

const upcomingSessions = [
  {
    id: 1,
    child: "Emma",
    childAvatar: "E",
    subject: "Mathematics",
    teacher: "Mr. David Chen",
    date: "Today",
    time: "4:00 PM",
    duration: "1 hour",
    type: "online",
    isToday: true,
  },
  {
    id: 2,
    child: "Liam",
    childAvatar: "L",
    subject: "English Literature",
    teacher: "Ms. Sarah Wilson",
    date: "Tomorrow",
    time: "3:30 PM",
    duration: "45 min",
    type: "in-person",
    isToday: false,
  },
  {
    id: 3,
    child: "Olivia",
    childAvatar: "O",
    subject: "Physics",
    teacher: "Dr. James Miller",
    date: "Wed, Jan 20",
    time: "5:00 PM",
    duration: "1 hour",
    type: "online",
    isToday: false,
  },
  {
    id: 4,
    child: "Emma",
    childAvatar: "E",
    subject: "Chemistry",
    teacher: "Ms. Lisa Brown",
    date: "Thu, Jan 21",
    time: "4:30 PM",
    duration: "1 hour",
    type: "online",
    isToday: false,
  },
  {
    id: 5,
    child: "Liam",
    childAvatar: "L",
    subject: "Mathematics",
    teacher: "Mr. David Chen",
    date: "Fri, Jan 22",
    time: "3:00 PM",
    duration: "1 hour",
    type: "in-person",
    isToday: false,
  },
];

export const ChildrenUpcomingSessionsWidget = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Upcoming Sessions"
      subtitle="All children's scheduled sessions"
      delay={delay}
      action={
        <Button size="small" sx={{ textTransform: "none" }}>
          View Calendar
        </Button>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {upcomingSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.05 }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: session.isToday
                  ? alpha(theme.palette.success.main, 0.05)
                  : "transparent",
                border: `1px solid ${
                  session.isToday
                    ? alpha(theme.palette.success.main, 0.3)
                    : theme.palette.divider
                }`,
                "&:hover": {
                  bgcolor: alpha(theme.palette.success.main, 0.05),
                },
                transition: "all 0.2s ease",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: alpha(theme.palette.success.main, 0.1),
                      color: "success.main",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {session.childAvatar}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {session.subject}
                      </Typography>
                      {session.isToday && (
                        <Chip
                          label="Today"
                          size="small"
                          sx={{
                            height: 20,
                            bgcolor: "success.main",
                            color: "white",
                            fontSize: "0.7rem",
                          }}
                        />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {session.child} • {session.teacher}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {session.date}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, justifyContent: "flex-end" }}>
                      <Clock size={12} style={{ color: theme.palette.text.secondary }} />
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {session.time} ({session.duration})
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    icon={
                      session.type === "online" ? (
                        <Video size={12} />
                      ) : (
                        <MapPin size={12} />
                      )
                    }
                    label={session.type === "online" ? "Online" : "In-person"}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor:
                        session.type === "online"
                          ? theme.palette.info.main
                          : theme.palette.warning.main,
                      color:
                        session.type === "online"
                          ? theme.palette.info.main
                          : theme.palette.warning.main,
                      "& .MuiChip-icon": {
                        color: "inherit",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </ChartCard>
  );
};
