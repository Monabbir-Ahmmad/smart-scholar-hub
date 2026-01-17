import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { theme } from "@/theme/muiTheme";
import { ParentSidebar } from "@/components/dashboard/ParentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ChildrenOverviewCards } from "@/components/dashboard/widgets/ChildrenOverviewCards";
import { AllChildrenSessionsList } from "@/components/dashboard/widgets/AllChildrenSessionsList";
import { PerformanceComparisonChart } from "@/components/dashboard/widgets/PerformanceComparisonChart";
import { FamilyAttendanceSummary } from "@/components/dashboard/widgets/FamilyAttendanceSummary";
import { BillingPaymentTable } from "@/components/dashboard/widgets/BillingPaymentTable";

const ParentDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        <ParentSidebar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <DashboardHeader
            title="Parent Dashboard"
            subtitle="Monitor your children's educational progress"
          />

          <Grid container spacing={3}>
            {/* Children Overview Cards */}
            <Grid size={12}>
              <ChildrenOverviewCards />
            </Grid>

            {/* Upcoming Sessions & Performance Comparison */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <AllChildrenSessionsList />
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              <PerformanceComparisonChart />
            </Grid>

            {/* Attendance Summary */}
            <Grid size={12}>
              <FamilyAttendanceSummary />
            </Grid>

            {/* Billing & Payment Table */}
            <Grid size={12}>
              <BillingPaymentTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ParentDashboard;
