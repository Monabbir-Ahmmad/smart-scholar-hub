import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  Receipt,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/parent" },
  { icon: Users, label: "My Children", path: "/parent/children" },
  { icon: Calendar, label: "Sessions", path: "/parent/sessions" },
  { icon: TrendingUp, label: "Performance", path: "/parent/performance" },
  { icon: Receipt, label: "Billing", path: "/parent/billing" },
  { icon: MessageSquare, label: "Messages", path: "/parent/messages" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/parent/settings" },
  { icon: LogOut, label: "Logout", path: "/logout" },
];

export const ParentSidebar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          width: 260,
          height: "100vh",
          bgcolor: "background.paper",
          borderRight: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "1.25rem",
            }}
          >
            T
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              TutorFlow
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Parent Portal
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Main Menu */}
        <List sx={{ flex: 1, px: 2, py: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive(item.path)
                    ? alpha(theme.palette.success.main, 0.1)
                    : "transparent",
                  color: isActive(item.path)
                    ? "success.main"
                    : "text.secondary",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.success.main, 0.08),
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive(item.path)
                      ? "success.main"
                      : "text.secondary",
                  }}
                >
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: isActive(item.path) ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Bottom Menu */}
        <List sx={{ px: 2, py: 2 }}>
          {bottomItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  color: "text.secondary",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.success.main, 0.08),
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "text.secondary" }}>
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: "0.875rem" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </motion.div>
  );
};
