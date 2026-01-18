import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { ChartCard } from "../ChartCard";

const upcomingSessions = [
  {
    id: 1,
    child: "Emma",
    childAvatar: "E",
    subject: "Advanced Mathematics",
    teacher: "Dr. Smith",
    date: "Today",
    time: "3:00 PM",
    duration: "1 hour",
    isToday: true,
  },
  {
    id: 2,
    child: "Sophie",
    childAvatar: "S",
    subject: "English Literature",
    teacher: "Ms. Williams",
    date: "Today",
    time: "5:00 PM",
    duration: "1.5 hours",
    isToday: true,
  },
  {
    id: 3,
    child: "Liam",
    childAvatar: "L",
    subject: "Science Fundamentals",
    teacher: "Mr. Brown",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "1 hour",
    isToday: false,
  },
  {
    id: 4,
    child: "Emma",
    childAvatar: "E",
    subject: "Physics Lab",
    teacher: "Dr. Chen",
    date: "Jan 19",
    time: "2:00 PM",
    duration: "2 hours",
    isToday: false,
  },
  {
    id: 5,
    child: "Sophie",
    childAvatar: "S",
    subject: "Creative Writing",
    teacher: "Ms. Davis",
    date: "Jan 20",
    time: "4:00 PM",
    duration: "1 hour",
    isToday: false,
  },
  {
    id: 6,
    child: "Liam",
    childAvatar: "L",
    subject: "Mathematics",
    teacher: "Mr. Wilson",
    date: "Jan 20",
    time: "11:00 AM",
    duration: "1 hour",
    isToday: false,
  },
];

const childColors: Record<string, string> = {
  E: "#7c3aed",
  L: "#059669",
  S: "#db2777",
};

export const AllChildrenSessionsList = () => {
  const theme = useTheme();

  return (
    <ChartCard title="Upcoming Sessions" subtitle="All children's scheduled sessions">
      <Box sx={{ maxHeight: 420, overflowY: "auto", pr: 1 }}>
        <List sx={{ py: 0 }}>
          {upcomingSessions.map((session, index) => (
            <Box key={session.id}>
              <ListItem
                sx={{
                  px: 1.5,
                  py: 1.5,
                  bgcolor: session.isToday ? `${childColors[session.childAvatar]}10` : "transparent",
                  borderRadius: 2,
                  mb: 0.5,
                  border: session.isToday ? `1px solid ${childColors[session.childAvatar]}30` : "1px solid transparent",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: session.isToday ? `${childColors[session.childAvatar]}15` : "action.hover",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: childColors[session.childAvatar],
                      width: 44,
                      height: 44,
                      fontWeight: 700,
                    }}
                  >
                    {session.childAvatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {session.subject}
                      </Typography>
                      {session.isToday && (
                        <Chip
                          label="Today"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            bgcolor: childColors[session.childAvatar],
                            color: "white",
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {session.child} • {session.teacher}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EventIcon sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {session.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5, color: "text.secondary" }} />
                        <Typography variant="caption" color="text.secondary">
                          {session.time} ({session.duration})
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < upcomingSessions.length - 1 && <Divider component="li" sx={{ my: 0.5 }} />}
            </Box>
          ))}
        </List>
      </Box>
    </ChartCard>
  );
};
