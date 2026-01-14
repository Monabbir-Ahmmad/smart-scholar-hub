import { ChartCard } from "../ChartCard";
import { BookOpen, FileText, Video, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const contentTypes = [
  { 
    type: "Lessons", 
    count: 248, 
    icon: BookOpen, 
    color: "bg-primary/10 text-primary",
    change: "+12 this week"
  },
  { 
    type: "Coursework", 
    count: 186, 
    icon: ClipboardList, 
    color: "bg-secondary/10 text-secondary",
    change: "+8 this week"
  },
  { 
    type: "Assessments", 
    count: 94, 
    icon: FileText, 
    color: "bg-success/10 text-success",
    change: "+5 this week"
  },
  { 
    type: "Resources", 
    count: 312, 
    icon: Video, 
    color: "bg-accent/10 text-accent",
    change: "+18 this week"
  },
];

const recentLessons = [
  { title: "Advanced Calculus: Integration", subject: "Mathematics", duration: "45 min" },
  { title: "Organic Chemistry Basics", subject: "Chemistry", duration: "60 min" },
  { title: "Quantum Physics Introduction", subject: "Physics", duration: "50 min" },
];

export const LessonContentStats = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="Course Content"
      subtitle="Lessons, coursework & learning materials"
      delay={delay}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {contentTypes.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + index * 0.1 }}
              className="p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3`}>
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-sm font-medium text-foreground">{item.type}</p>
              <p className="text-xs text-muted-foreground">{item.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Recently Added Lessons</h4>
          {recentLessons.map((lesson) => (
            <div
              key={lesson.title}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{lesson.title}</p>
                  <p className="text-xs text-muted-foreground">{lesson.subject}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{lesson.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};
