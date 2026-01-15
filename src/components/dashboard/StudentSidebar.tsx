import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  BookOpen, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/student", active: true },
  { icon: BookOpen, label: "My Courses", href: "/student/courses" },
  { icon: FileText, label: "Assignments", href: "/student/assignments" },
  { icon: Calendar, label: "Schedule", href: "/student/schedule" },
  { icon: TrendingUp, label: "Progress", href: "/student/progress" },
  { icon: Award, label: "Achievements", href: "/student/achievements" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/student/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/student/help" },
  { icon: LogOut, label: "Sign Out", href: "/sign-in" },
];

export const StudentSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg text-foreground"
            >
              Student
            </motion.span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ChevronLeft className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            collapsed && "rotate-180"
          )} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
              item.active 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </a>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border space-y-1">
        {bottomItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </a>
        ))}
      </div>
    </motion.aside>
  );
};
