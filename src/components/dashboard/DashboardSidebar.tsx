import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileQuestion,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Enrollments", icon: GraduationCap, path: "/admin/enrollments" },
  { label: "Courses", icon: BookOpen, path: "/admin/courses" },
  { label: "Question Bank", icon: FileQuestion, path: "/admin/questions" },
  { label: "Sessions", icon: Calendar, path: "/admin/sessions" },
  { label: "Billing", icon: CreditCard, path: "/admin/billing" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const theme = useTheme();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        height: "100%",
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        zIndex: 40,
        transition: "width 0.3s ease",
        width: collapsed ? 64 : 256,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
          {!collapsed && (
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap style={{ width: 20, height: 20, color: theme.palette.primary.contrastText }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "text.primary" }}>
                EduPlatform
              </Typography>
            </Link>
          )}
          <IconButton
            onClick={() => setCollapsed(!collapsed)}
            size="small"
            sx={{ width: 32, height: 32 }}
          >
            {collapsed ? (
              <ChevronRight style={{ width: 16, height: 16 }} />
            ) : (
              <ChevronLeft style={{ width: 16, height: 16 }} />
            )}
          </IconButton>
        </Box>

        {/* Navigation */}
        <Box component="nav" sx={{ flex: 1, p: 1.5 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1.25,
                    borderRadius: 2,
                    mb: 0.5,
                    transition: "all 0.2s",
                    bgcolor: isActive ? "primary.main" : "transparent",
                    color: isActive ? "primary.contrastText" : "text.secondary",
                    "&:hover": {
                      bgcolor: isActive ? "primary.main" : theme.palette.muted,
                      color: isActive ? "primary.contrastText" : "text.primary",
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
              </Link>
            );
          })}
        </Box>

        {/* Logout */}
        <Box sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                borderRadius: 2,
                color: "text.secondary",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: theme.palette.muted,
                  color: "text.primary",
                },
              }}
            >
              <LogOut style={{ width: 20, height: 20, flexShrink: 0 }} />
              {!collapsed && (
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Back to Home
                </Typography>
              )}
            </Box>
          </Link>
        </Box>
      </Box>
    </motion.aside>
  );
};
