import { 
  LayoutDashboard,
  Users,
  Calendar,
  TrendingUp,
  Receipt,
  MessageSquare,
  Settings,
  HelpCircle
} from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/theme/muiTheme";
import { DashboardSidebar, MenuItem } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ParentStatsCards } from "@/components/dashboard/widgets/ParentStatsCards";
import { ChildrenOverviewWidget } from "@/components/dashboard/widgets/ChildrenOverviewWidget";
import { ChildrenUpcomingSessionsWidget } from "@/components/dashboard/widgets/ChildrenUpcomingSessionsWidget";
import { PerformanceComparisonChart } from "@/components/dashboard/widgets/PerformanceComparisonChart";
import { ChildrenAttendanceSummary } from "@/components/dashboard/widgets/ChildrenAttendanceSummary";
import { BillingPaymentTable } from "@/components/dashboard/widgets/BillingPaymentTable";

const menuItems: MenuItem[] = [
  { label: "Overview", icon: LayoutDashboard, path: "/parent" },
  { label: "My Children", icon: Users, path: "/parent/children" },
  { label: "Sessions", icon: Calendar, path: "/parent/sessions" },
  { label: "Performance", icon: TrendingUp, path: "/parent/performance" },
  { label: "Billing", icon: Receipt, path: "/parent/billing" },
  { label: "Messages", icon: MessageSquare, path: "/parent/messages" },
];

const bottomItems: MenuItem[] = [
  { label: "Settings", icon: Settings, path: "/parent/settings" },
  { label: "Help Center", icon: HelpCircle, path: "/parent/help" },
];

const ParentDashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-background">
        <DashboardSidebar 
          menuItems={menuItems}
          bottomItems={bottomItems}
          title="EduPlatform"
        />
        
        <div className="ml-64 transition-all duration-300">
          <DashboardHeader
            title="Parent Dashboard"
            subtitle="Monitor your children's progress and manage their education"
            userName="Mrs. Garcia"
            userInitials="MG"
          />
          
          <main className="p-6 space-y-6">
            {/* Stats Cards */}
            <ParentStatsCards delay={0} />

            {/* Row 1: Children Overview & Upcoming Sessions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChildrenOverviewWidget delay={0.2} />
              <ChildrenUpcomingSessionsWidget delay={0.3} />
            </div>

            {/* Row 2: Performance Comparison & Attendance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PerformanceComparisonChart delay={0.4} />
              </div>
              <ChildrenAttendanceSummary delay={0.5} />
            </div>

            {/* Row 3: Billing & Payments */}
            <BillingPaymentTable delay={0.6} />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ParentDashboard;
