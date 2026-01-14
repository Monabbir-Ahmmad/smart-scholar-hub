import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  DollarSign,
  FileQuestion,
  Calendar,
  TrendingUp,
  CheckCircle
} from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { UserGrowthChart } from "@/components/dashboard/widgets/UserGrowthChart";
import { EnrollmentStatusChart } from "@/components/dashboard/widgets/EnrollmentStatusChart";
import { RevenueChart } from "@/components/dashboard/widgets/RevenueChart";
import { SessionCompletionChart } from "@/components/dashboard/widgets/SessionCompletionChart";
import { TopTeachersTable } from "@/components/dashboard/widgets/TopTeachersTable";
import { QuestionBankStats } from "@/components/dashboard/widgets/QuestionBankStats";
import { LessonContentStats } from "@/components/dashboard/widgets/LessonContentStats";
import { PerformanceDistribution } from "@/components/dashboard/widgets/PerformanceDistribution";
import { UnpaidBillsTable } from "@/components/dashboard/widgets/UnpaidBillsTable";
import { RecentActivityFeed } from "@/components/dashboard/widgets/RecentActivityFeed";

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12.5% from last month",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Active Enrollments",
    value: "542",
    change: "+8.2% from last month",
    changeType: "positive" as const,
    icon: GraduationCap,
  },
  {
    title: "Sessions This Month",
    value: "1,284",
    change: "+15.3% from last month",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Revenue This Month",
    value: "$32,840",
    change: "+22.1% from last month",
    changeType: "positive" as const,
    icon: DollarSign,
  },
  {
    title: "Question Bank",
    value: "3,640",
    change: "+156 this week",
    changeType: "positive" as const,
    icon: FileQuestion,
  },
  {
    title: "Completion Rate",
    value: "94.2%",
    change: "+2.1% from last month",
    changeType: "positive" as const,
    icon: CheckCircle,
  },
  {
    title: "Lessons Created",
    value: "248",
    change: "+12 this week",
    changeType: "positive" as const,
    icon: BookOpen,
  },
  {
    title: "Avg. Performance",
    value: "78.5%",
    change: "+3.2% improvement",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="ml-64 transition-all duration-300">
        <DashboardHeader 
          title="Admin Dashboard" 
          subtitle="Welcome back! Here's what's happening today."
        />
        
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                {...stat}
                delay={index * 0.05}
              />
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserGrowthChart delay={0.2} />
            <RevenueChart delay={0.25} />
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <EnrollmentStatusChart delay={0.3} />
            <SessionCompletionChart delay={0.35} />
            <PerformanceDistribution delay={0.4} />
          </div>

          {/* Content Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuestionBankStats delay={0.45} />
            <LessonContentStats delay={0.5} />
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TopTeachersTable delay={0.55} />
            <UnpaidBillsTable delay={0.6} />
            <RecentActivityFeed delay={0.65} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
