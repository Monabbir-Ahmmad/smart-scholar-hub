import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";

const drawerWidth = 260;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/parent" },
  { text: "My Children", icon: <PeopleIcon />, path: "/parent/children" },
  { text: "Sessions", icon: <EventIcon />, path: "/parent/sessions" },
  { text: "Performance", icon: <AssessmentIcon />, path: "/parent/performance" },
  { text: "Billing", icon: <ReceiptIcon />, path: "/parent/billing" },
  { text: "Messages", icon: <MessageIcon />, path: "/parent/messages" },
];

export const ParentSidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "primary.main" }}>
          EduPlatform
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Parent Portal
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  "& .MuiListItemIcon-root": {
                    color: "primary.contrastText",
                  },
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => navigate("/parent/settings")}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")} sx={{ borderRadius: 2 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
