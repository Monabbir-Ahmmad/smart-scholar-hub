import { useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import { Bell, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

const notifications = [
  {
    title: "New user registered",
    description: "Emma Thompson joined as a student",
  },
  {
    title: "Payment received",
    description: "$450 from Garcia Family",
  },
  {
    title: "Session completed",
    description: "Advanced Physics with Dr. Chen",
  },
];

export const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  const theme = useTheme();
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);

  const handleNotificationOpen = (event: MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleProfileOpen = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        height: 64,
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        position: "sticky",
        top: 0,
        zIndex: 30,
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "text.primary" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Search */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <TextField
            placeholder="Search..."
            size="small"
            sx={{ width: 256 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ width: 16, height: 16, color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Notifications */}
        <IconButton onClick={handleNotificationOpen} sx={{ position: "relative" }}>
          <Badge
            badgeContent={3}
            color="primary"
            sx={{
              "& .MuiBadge-badge": {
                fontSize: "0.75rem",
                height: 20,
                minWidth: 20,
              },
            }}
          >
            <Bell style={{ width: 20, height: 20 }} />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 320, mt: 1 },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          <Divider />
          {notifications.map((notification, index) => (
            <MenuItem
              key={index}
              onClick={handleNotificationClose}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 0.5,
                py: 1.5,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {notification.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {notification.description}
              </Typography>
            </MenuItem>
          ))}
        </Menu>

        {/* Profile */}
        <IconButton onClick={handleProfileOpen} sx={{ gap: 1, borderRadius: 2, px: 1 }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            AD
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              display: { xs: "none", md: "inline" },
              color: "text.primary",
            }}
          >
            Admin
          </Typography>
        </IconButton>
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { mt: 1 },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              My Account
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
          <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileClose}>Sign out</MenuItem>
        </Menu>
      </Box>
    </motion.header>
  );
};
