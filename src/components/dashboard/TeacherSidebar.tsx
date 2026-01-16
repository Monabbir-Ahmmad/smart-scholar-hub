import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { 
  Home, 
  Users, 
  Calendar, 
  History, 
  BarChart3, 
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  GraduationCap
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/teacher", active: true },
  { icon: Users, label: "My Students", href: "/teacher/students" },
  { icon: Calendar, label: "Schedule", href: "/teacher/schedule" },
  { icon: History, label: "Session History", href: "/teacher/history" },
  { icon: BarChart3, label: "Performance", href: "/teacher/performance" },
  { icon: FileText, label: "Coursework", href: "/teacher/coursework" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/teacher/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/teacher/help" },
  { icon: LogOut, label: "Sign Out", href: "/sign-in" },
];

export const TeacherSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        zIndex: 40,
        transition: "width 0.3s ease",
        width: collapsed ? 80 : 256,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GraduationCap style={{ width: 20, height: 20, color: theme.palette.primary.contrastText }} />
          </Box>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                Teacher
              </Typography>
            </motion.div>
          )}
        </Box>
        <IconButton
          onClick={() => setCollapsed(!collapsed)}
          size="small"
          sx={{ 
            width: 32, 
            height: 32,
            transition: "transform 0.2s",
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronLeft style={{ width: 16, height: 16, color: theme.palette.text.secondary }} />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box component="nav" sx={{ p: 1.5 }}>
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: 3,
                mb: 0.5,
                transition: "all 0.2s",
                bgcolor: item.active ? "primary.main" : "transparent",
                color: item.active ? "primary.contrastText" : "text.secondary",
                boxShadow: item.active ? theme.shadows[3] : "none",
                "&:hover": {
                  bgcolor: item.active ? "primary.main" : theme.palette.muted,
                  color: item.active ? "primary.contrastText" : "text.primary",
                },
              }}
            >
              <item.icon style={{ width: 20, height: 20, flexShrink: 0 }} />
              {!collapsed && (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          </a>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        {bottomItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: 3,
                mb: 0.5,
                color: "text.secondary",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: theme.palette.muted,
                  color: "text.primary",
                },
              }}
            >
              <item.icon style={{ width: 20, height: 20, flexShrink: 0 }} />
              {!collapsed && (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {item.label}
                </Typography>
              )}
            </Box>
          </a>
        ))}
      </Box>
    </motion.aside>
  );
};
