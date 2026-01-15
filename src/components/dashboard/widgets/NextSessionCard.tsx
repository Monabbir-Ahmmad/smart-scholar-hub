import { motion } from "framer-motion";
import { Video, Clock, User, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, addHours } from "date-fns";

const nextSession = {
  title: "Advanced Calculus - Integration Techniques",
  teacher: "Dr. Sarah Chen",
  scheduledAt: addHours(new Date(), 2),
  duration: 60,
  meetingLink: "https://meet.example.com/session-123",
  courseTitle: "Advanced Mathematics",
};

interface NextSessionCardProps {
  delay?: number;
}

export const NextSessionCard = ({ delay = 0 }: NextSessionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary p-6 text-primary-foreground"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Video className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium opacity-90">Next Session</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Clock className="w-4 h-4" />
            <span>In 2 hours</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-1">{nextSession.title}</h3>
          <p className="text-sm opacity-80">{nextSession.courseTitle}</p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 opacity-70" />
            <span>{nextSession.teacher}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 opacity-70" />
            <span>{format(nextSession.scheduledAt, "h:mm a")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 opacity-70" />
            <span>{nextSession.duration} min</span>
          </div>
        </div>

        <Button 
          className="w-full bg-white text-primary hover:bg-white/90 font-semibold group"
        >
          Join Session
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};
