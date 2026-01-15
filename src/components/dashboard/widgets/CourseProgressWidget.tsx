import { motion } from "framer-motion";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { ChartCard } from "../ChartCard";
import { Progress } from "@/components/ui/progress";

interface Course {
  id: string;
  title: string;
  teacher: string;
  progress: number;
  completedSessions: number;
  totalSessions: number;
  status: "in_progress" | "completed" | "upcoming";
  color: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Advanced Mathematics",
    teacher: "Dr. Sarah Chen",
    progress: 75,
    completedSessions: 15,
    totalSessions: 20,
    status: "in_progress",
    color: "hsl(var(--primary))",
  },
  {
    id: "2",
    title: "Physics Fundamentals",
    teacher: "Prof. James Wilson",
    progress: 60,
    completedSessions: 12,
    totalSessions: 20,
    status: "in_progress",
    color: "hsl(var(--secondary))",
  },
  {
    id: "3",
    title: "English Literature",
    teacher: "Ms. Emily Parker",
    progress: 90,
    completedSessions: 18,
    totalSessions: 20,
    status: "in_progress",
    color: "hsl(var(--success))",
  },
  {
    id: "4",
    title: "Chemistry Basics",
    teacher: "Dr. Michael Brown",
    progress: 45,
    completedSessions: 9,
    totalSessions: 20,
    status: "in_progress",
    color: "hsl(var(--accent))",
  },
];

interface CourseProgressWidgetProps {
  delay?: number;
}

export const CourseProgressWidget = ({ delay = 0 }: CourseProgressWidgetProps) => {
  return (
    <ChartCard
      title="Course Progress"
      subtitle="Your active course enrollments"
      delay={delay}
    >
      <div className="space-y-4">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.1, duration: 0.4 }}
            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${course.color}20` }}
                >
                  <BookOpen 
                    className="w-5 h-5" 
                    style={{ color: course.color }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{course.teacher}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4" />
                <span>{course.completedSessions}/{course.totalSessions}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-foreground">{course.progress}%</span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ delay: delay + index * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                  className="absolute h-full rounded-full"
                  style={{ backgroundColor: course.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
};
