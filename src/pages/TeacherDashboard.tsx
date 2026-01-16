import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { TeacherSidebar } from "@/components/dashboard/TeacherSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TeacherStatsCards } from "@/components/dashboard/widgets/TeacherStatsCards";
import { StudentManagementTable } from "@/components/dashboard/widgets/StudentManagementTable";
import { SessionHistoryTable } from "@/components/dashboard/widgets/SessionHistoryTable";
import { UpcomingSessionsCalendar } from "@/components/dashboard/widgets/UpcomingSessionsCalendar";
import { StudentPerformanceHeatmap } from "@/components/dashboard/widgets/StudentPerformanceHeatmap";
import { WeeklySessionLoad } from "@/components/dashboard/widgets/WeeklySessionLoad";

const TeacherDashboard = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <TeacherSidebar />
      
      <Box sx={{ ml: { xs: 0, md: "256px" }, transition: "margin 0.3s" }}>
        <DashboardHeader 
          title="Teacher Dashboard" 
          subtitle="Manage your students and track their progress"
        />
        
        <Box component="main" sx={{ p: 3 }}>
          {/* Stats Row */}
          <Box sx={{ mb: 3 }}>
            <TeacherStatsCards delay={0.1} />
          </Box>

          {/* Main Content Grid */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 3, mb: 3 }}>
            <UpcomingSessionsCalendar delay={0.15} />
            <WeeklySessionLoad delay={0.2} />
          </Box>

          {/* Student Management - Full Width */}
          <Box sx={{ mb: 3 }}>
            <StudentManagementTable delay={0.25} />
          </Box>

          {/* Performance Heatmap - Full Width */}
          <Box sx={{ mb: 3 }}>
            <StudentPerformanceHeatmap delay={0.3} />
          </Box>

          {/* Session History */}
          <Box>
            <SessionHistoryTable delay={0.35} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherDashboard;
