import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  GraduationCap,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

export interface DashboardSidebarProps {
  menuItems: MenuItem[];
  bottomItems?: MenuItem[];
  title?: string;
  homeRoute?: string;
}

export const DashboardSidebar = ({ 
  menuItems, 
  bottomItems = [],
  title = "EduPlatform",
  homeRoute = "/"
}: DashboardSidebarProps) => {
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
            <Link to={homeRoute} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
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
                {title}
              </Typography>
            </Link>
          )}
          {collapsed && (
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                bgcolor: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
              }}
            >
              <GraduationCap style={{ width: 20, height: 20, color: theme.palette.primary.contrastText }} />
            </Box>
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
                      bgcolor: isActive ? "primary.main" : theme.palette.action.hover,
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

        {/* Bottom Items */}
        {bottomItems.length > 0 && (
          <Box sx={{ p: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
            {bottomItems.map((item) => {
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
                      color: isActive ? "text.primary" : "text.secondary",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: theme.palette.action.hover,
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
                </Link>
              );
            })}
          </Box>
        )}

        {/* Logout */}
        <Box sx={{ p: 1.5, borderTop: bottomItems.length === 0 ? `1px solid ${theme.palette.divider}` : "none" }}>
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
                  bgcolor: theme.palette.action.hover,
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
