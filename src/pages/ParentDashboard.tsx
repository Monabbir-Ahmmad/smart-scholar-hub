import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { theme } from "@/theme/muiTheme";
import { ParentSidebar } from "@/components/dashboard/ParentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ParentStatsCards } from "@/components/dashboard/widgets/ParentStatsCards";
import { ChildrenOverviewWidget } from "@/components/dashboard/widgets/ChildrenOverviewWidget";
import { ChildrenUpcomingSessionsWidget } from "@/components/dashboard/widgets/ChildrenUpcomingSessionsWidget";
import { PerformanceComparisonChart } from "@/components/dashboard/widgets/PerformanceComparisonChart";
import { ChildrenAttendanceSummary } from "@/components/dashboard/widgets/ChildrenAttendanceSummary";
import { BillingPaymentTable } from "@/components/dashboard/widgets/BillingPaymentTable";

const ParentDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <ParentSidebar />
        <Box sx={{ flex: 1, ml: "260px" }}>
          <DashboardHeader
            title="Parent Dashboard"
            subtitle="Monitor your children's progress and manage their education"
          />
          <Box sx={{ p: 3 }}>
            {/* Stats Cards */}
            <ParentStatsCards delay={0} />

            {/* Row 1: Children Overview & Upcoming Sessions */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, mt: 3 }}>
              <ChildrenOverviewWidget delay={0.2} />
              <ChildrenUpcomingSessionsWidget delay={0.3} />
            </Box>

            {/* Row 2: Performance Comparison & Attendance */}
            <Box sx={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 3, mt: 3 }}>
              <PerformanceComparisonChart delay={0.4} />
              <ChildrenAttendanceSummary delay={0.5} />
            </Box>

            {/* Row 3: Billing & Payments */}
            <Box sx={{ mt: 3 }}>
              <BillingPaymentTable delay={0.6} />
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ParentDashboard;
