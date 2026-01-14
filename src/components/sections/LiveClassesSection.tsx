import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { Video, PenTool, MessageSquare, CalendarPlus } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Real-Time Online Classes",
    description: "HD video with crystal-clear audio for immersive learning",
  },
  {
    icon: PenTool,
    title: "Collaborative Whiteboard",
    description: "Draw, annotate, and solve problems together in real-time",
  },
  {
    icon: MessageSquare,
    title: "Interactive Sessions",
    description: "Ask questions and get instant answers during class",
  },
  {
    icon: CalendarPlus,
    title: "Request Extra Lessons",
    description: "Need more help? Schedule additional sessions anytime",
  },
];

export const LiveClassesSection = () => {
  return (
    <SectionWrapper id="live-classes" className="bg-muted/30">
      <GradientBackground variant="mesh" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual - Whiteboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="bg-card rounded-3xl p-6 border border-border shadow-xl overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <div className="flex-1" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-lg bg-muted" />
                  ))}
                </div>
              </div>
              
              {/* Whiteboard content */}
              <div className="h-64 relative bg-muted/50 rounded-2xl p-4">
                {/* Animated drawing effect */}
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <motion.path
                    d="M 20 100 Q 100 30 200 100 T 380 100"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.text
                    x="50"
                    y="60"
                    className="fill-foreground text-sm font-medium"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                  >
                    y = sin(x)
                  </motion.text>
                  <motion.circle
                    cx="200"
                    cy="100"
                    r="6"
                    className="fill-secondary"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 2 }}
                  />
                </svg>
                
                {/* Cursor indicator */}
                <motion.div
                  animate={{ x: [0, 100, 50], y: [0, 50, 30] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-4 h-4 rounded-full bg-secondary shadow-lg"
                  style={{ top: "40%", left: "40%" }}
                />
              </div>
              
              {/* Participants */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary border-2 border-card"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">3 participants</span>
                <div className="flex-1" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-medium text-success">Live</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary mb-4"
            >
              LIVE CLASSES & WHITEBOARD
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
            >
              Learn Live with{" "}
              <span className="text-primary">Real Teachers</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Experience the power of real-time learning with our 
              interactive virtual classrooms and collaborative tools.
            </motion.p>
            
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/30 hover:bg-card hover:border-border transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LiveClassesSection;
