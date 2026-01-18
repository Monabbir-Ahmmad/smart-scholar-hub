import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { theme } from "@/theme/muiTheme";
import { ParentSidebar } from "@/components/dashboard/ParentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ParentStatsCards } from "@/components/dashboard/widgets/ParentStatsCards";
import { ChildrenOverviewCards } from "@/components/dashboard/widgets/ChildrenOverviewCards";
import { AllChildrenSessionsList } from "@/components/dashboard/widgets/AllChildrenSessionsList";
import { PerformanceComparisonChart } from "@/components/dashboard/widgets/PerformanceComparisonChart";
import { FamilyAttendanceSummary } from "@/components/dashboard/widgets/FamilyAttendanceSummary";
import { BillingPaymentTable } from "@/components/dashboard/widgets/BillingPaymentTable";

const ParentDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#F8FAFC" }}>
        <ParentSidebar />
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <DashboardHeader
            title="Parent Dashboard"
            subtitle="Monitor your children's educational progress"
          />

          <Grid container spacing={3}>
            {/* Summary Stats */}
            <Grid size={12}>
              <ParentStatsCards />
            </Grid>

            {/* Section Title */}
            <Grid size={12}>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                Your Children
              </Typography>
            </Grid>

            {/* Children Overview Cards */}
            <Grid size={12}>
              <ChildrenOverviewCards />
            </Grid>

            {/* Section Title */}
            <Grid size={12}>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
                Schedule & Performance
              </Typography>
            </Grid>

            {/* Upcoming Sessions & Performance Comparison */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <AllChildrenSessionsList />
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              <PerformanceComparisonChart />
            </Grid>

            {/* Section Title */}
            <Grid size={12}>
              <Typography variant="h6" sx={{ fontWeight: 700, mt: 2 }}>
                Attendance & Billing
              </Typography>
            </Grid>

            {/* Attendance Summary */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <FamilyAttendanceSummary />
            </Grid>

            {/* Billing & Payment Table */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <BillingPaymentTable />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ParentDashboard;
