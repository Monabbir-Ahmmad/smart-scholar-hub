import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Award,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";
import { StudentSidebar } from "@/components/dashboard/StudentSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { CourseProgressWidget } from "@/components/dashboard/widgets/CourseProgressWidget";
import { PerformanceTrendChart } from "@/components/dashboard/widgets/PerformanceTrendChart";
import { SubjectMasteryRadar } from "@/components/dashboard/widgets/SubjectMasteryRadar";
import { UpcomingAssignments } from "@/components/dashboard/widgets/UpcomingAssignments";
import { NextSessionCard } from "@/components/dashboard/widgets/NextSessionCard";
import { AttendanceDonut } from "@/components/dashboard/widgets/AttendanceDonut";
import { RecentResultsWidget } from "@/components/dashboard/widgets/RecentResultsWidget";

const stats = [
  {
    title: "Active Courses",
    value: "4",
    change: "2 in progress",
    changeType: "neutral" as const,
    icon: BookOpen,
  },
  {
    title: "Sessions Completed",
    value: "42",
    change: "+8 this month",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Average Score",
    value: "85%",
    change: "+5% from last month",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    title: "Assignments Due",
    value: "5",
    change: "2 urgent",
    changeType: "negative" as const,
    icon: Clock,
  },
  {
    title: "Study Streak",
    value: "12 days",
    change: "Personal best!",
    changeType: "positive" as const,
    icon: Award,
  },
  {
    title: "Goals Achieved",
    value: "8/10",
    change: "This semester",
    changeType: "positive" as const,
    icon: Target,
  },
];

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />
      
      <div className="ml-64 transition-all duration-300">
        <DashboardHeader 
          title="Welcome back, Alex!" 
          subtitle="Here's your learning progress for today."
        />
        
        <main className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.title}
                {...stat}
                delay={index * 0.05}
              />
            ))}
          </div>

          {/* Next Session + Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NextSessionCard delay={0.15} />
            </div>
            <AttendanceDonut delay={0.2} />
          </div>

          {/* Course Progress + Performance Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CourseProgressWidget delay={0.25} />
            <PerformanceTrendChart delay={0.3} />
          </div>

          {/* Subject Mastery + Upcoming Assignments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SubjectMasteryRadar delay={0.35} />
            <UpcomingAssignments delay={0.4} />
          </div>

          {/* Recent Results */}
          <div className="grid grid-cols-1 gap-6">
            <RecentResultsWidget delay={0.45} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
