import { motion } from "framer-motion";
import { FileText, Clock, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { ChartCard } from "../ChartCard";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow, addDays, addHours } from "date-fns";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  type: "quiz" | "homework" | "exam" | "project";
  dueDate: Date;
  status: "pending" | "in_progress" | "submitted";
  priority: "low" | "medium" | "high";
}

const now = new Date();

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Calculus Integration Quiz",
    subject: "Mathematics",
    type: "quiz",
    dueDate: addHours(now, 5),
    status: "pending",
    priority: "high",
  },
  {
    id: "2",
    title: "Physics Lab Report",
    subject: "Physics",
    type: "homework",
    dueDate: addDays(now, 1),
    status: "in_progress",
    priority: "high",
  },
  {
    id: "3",
    title: "Shakespeare Essay",
    subject: "English",
    type: "homework",
    dueDate: addDays(now, 3),
    status: "pending",
    priority: "medium",
  },
  {
    id: "4",
    title: "Chemistry Mid-term",
    subject: "Chemistry",
    type: "exam",
    dueDate: addDays(now, 5),
    status: "pending",
    priority: "high",
  },
  {
    id: "5",
    title: "History Research Project",
    subject: "History",
    type: "project",
    dueDate: addDays(now, 7),
    status: "in_progress",
    priority: "medium",
  },
];

const getTypeStyles = (type: Assignment["type"]) => {
  switch (type) {
    case "quiz":
      return "bg-primary/10 text-primary";
    case "homework":
      return "bg-secondary/10 text-secondary";
    case "exam":
      return "bg-destructive/10 text-destructive";
    case "project":
      return "bg-success/10 text-success";
  }
};

const getPriorityStyles = (priority: Assignment["priority"]) => {
  switch (priority) {
    case "high":
      return "border-l-destructive";
    case "medium":
      return "border-l-accent";
    case "low":
      return "border-l-success";
  }
};

const getStatusIcon = (status: Assignment["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4 text-muted-foreground" />;
    case "in_progress":
      return <AlertCircle className="w-4 h-4 text-accent" />;
    case "submitted":
      return <CheckCircle2 className="w-4 h-4 text-success" />;
  }
};

interface UpcomingAssignmentsProps {
  delay?: number;
}

export const UpcomingAssignments = ({ delay = 0 }: UpcomingAssignmentsProps) => {
  return (
    <ChartCard
      title="Upcoming Assignments"
      subtitle="Deadlines and coursework to complete"
      delay={delay}
    >
      <div className="space-y-3">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + index * 0.08, duration: 0.4 }}
            className={`p-4 rounded-xl bg-muted/50 border-l-4 ${getPriorityStyles(assignment.priority)} hover:bg-muted transition-colors group cursor-pointer`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="mt-0.5">
                  {getStatusIcon(assignment.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {assignment.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
              </div>
              <Badge variant="secondary" className={getTypeStyles(assignment.type)}>
                {assignment.type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mt-3 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {format(assignment.dueDate, "MMM d, yyyy 'at' h:mm a")}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {formatDistanceToNow(assignment.dueDate, { addSuffix: true })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </ChartCard>
  );
};
