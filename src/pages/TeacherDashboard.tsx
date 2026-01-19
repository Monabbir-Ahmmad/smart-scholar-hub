import { 
  LayoutDashboard,
  Users, 
  Calendar, 
  History, 
  BarChart3, 
  FileText,
  Settings,
  HelpCircle
} from "lucide-react";
import { DashboardSidebar, MenuItem } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TeacherStatsCards } from "@/components/dashboard/widgets/TeacherStatsCards";
import { StudentManagementTable } from "@/components/dashboard/widgets/StudentManagementTable";
import { SessionHistoryTable } from "@/components/dashboard/widgets/SessionHistoryTable";
import { UpcomingSessionsCalendar } from "@/components/dashboard/widgets/UpcomingSessionsCalendar";
import { StudentPerformanceHeatmap } from "@/components/dashboard/widgets/StudentPerformanceHeatmap";
import { WeeklySessionLoad } from "@/components/dashboard/widgets/WeeklySessionLoad";

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/teacher" },
  { label: "My Students", icon: Users, path: "/teacher/students" },
  { label: "Schedule", icon: Calendar, path: "/teacher/schedule" },
  { label: "Session History", icon: History, path: "/teacher/history" },
  { label: "Performance", icon: BarChart3, path: "/teacher/performance" },
  { label: "Coursework", icon: FileText, path: "/teacher/coursework" },
];

const bottomItems: MenuItem[] = [
  { label: "Settings", icon: Settings, path: "/teacher/settings" },
  { label: "Help Center", icon: HelpCircle, path: "/teacher/help" },
];

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar 
        menuItems={menuItems}
        bottomItems={bottomItems}
        title="EduPlatform"
      />
      
      <div className="ml-64 transition-all duration-300">
        <DashboardHeader 
          title="Teacher Dashboard" 
          subtitle="Manage your students and track their progress"
          userName="Dr. Chen"
          userInitials="DC"
        />
        
        <main className="p-6 space-y-6">
          {/* Stats Row */}
          <TeacherStatsCards delay={0.1} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingSessionsCalendar delay={0.15} />
            <WeeklySessionLoad delay={0.2} />
          </div>

          {/* Student Management - Full Width */}
          <StudentManagementTable delay={0.25} />

          {/* Performance Heatmap - Full Width */}
          <StudentPerformanceHeatmap delay={0.3} />

          {/* Session History */}
          <SessionHistoryTable delay={0.35} />
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
