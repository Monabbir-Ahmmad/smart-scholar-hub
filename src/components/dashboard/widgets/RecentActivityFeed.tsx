import { ChartCard } from "../ChartCard";
import { 
  UserPlus, 
  BookOpen, 
  CheckCircle, 
  CreditCard,
  FileQuestion,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    type: "user_registered",
    message: "New student registered: Emma Thompson",
    time: "2 minutes ago",
    icon: UserPlus,
    color: "text-primary bg-primary/10"
  },
  {
    type: "session_completed",
    message: "Session completed: Advanced Physics with Dr. Chen",
    time: "15 minutes ago",
    icon: CheckCircle,
    color: "text-success bg-success/10"
  },
  {
    type: "payment_received",
    message: "Payment received: $450 from Garcia Family",
    time: "32 minutes ago",
    icon: CreditCard,
    color: "text-success bg-success/10"
  },
  {
    type: "question_added",
    message: "42 new questions added to Chemistry bank",
    time: "1 hour ago",
    icon: FileQuestion,
    color: "text-secondary bg-secondary/10"
  },
  {
    type: "course_enrolled",
    message: "New enrollment: SAT Prep Course",
    time: "2 hours ago",
    icon: GraduationCap,
    color: "text-primary bg-primary/10"
  },
  {
    type: "lesson_created",
    message: "New lesson: Organic Chemistry Fundamentals",
    time: "3 hours ago",
    icon: BookOpen,
    color: "text-accent bg-accent/10"
  },
];

export const RecentActivityFeed = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="Recent Activity"
      subtitle="Platform-wide activity feed"
      delay={delay}
    >
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", activity.color)}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};
