import { ChartCard } from "../ChartCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const teachers = [
  { name: "Dr. Sarah Chen", subject: "Mathematics", sessions: 142, rating: 4.9, completion: 98 },
  { name: "Prof. James Wilson", subject: "Physics", sessions: 128, rating: 4.8, completion: 96 },
  { name: "Ms. Emily Rodriguez", subject: "Chemistry", sessions: 115, rating: 4.9, completion: 97 },
  { name: "Mr. David Kim", subject: "Biology", sessions: 98, rating: 4.7, completion: 94 },
  { name: "Dr. Lisa Thompson", subject: "English", sessions: 87, rating: 4.8, completion: 95 },
];

export const TopTeachersTable = ({ delay = 0 }: { delay?: number }) => {
  return (
    <ChartCard
      title="Top Teachers"
      subtitle="By completed sessions this month"
      delay={delay}
    >
      <div className="space-y-4">
        {teachers.map((teacher, index) => (
          <div key={teacher.name} className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground w-4">
              {index + 1}
            </span>
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {teacher.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{teacher.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {teacher.subject}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Progress value={teacher.completion} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground">{teacher.completion}%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{teacher.sessions}</p>
              <p className="text-xs text-muted-foreground">sessions</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};
