import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { FileText, BarChart3, CheckCircle, Download } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "SAT, ACT, AP, GED & More",
    description: "Comprehensive practice exams for all major standardized tests",
  },
  {
    icon: CheckCircle,
    title: "Automated Grading",
    description: "Instant feedback with detailed explanations",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Track progress with detailed score breakdowns",
  },
  {
    icon: Download,
    title: "PDF Reports",
    description: "Exportable reports for college applications",
  },
];

export const ExamPrepSection = () => {
  return (
    <SectionWrapper id="exam-prep" className="bg-muted/30">
      <GradientBackground variant="dots" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-sm font-semibold text-primary mb-4"
            >
              EXAM PREPARATION
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
            >
              Ace Every Exam with{" "}
              <span className="gradient-text">Confidence</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Our AI-powered platform adapts to your learning style, 
              identifying weak areas and providing targeted practice to 
              maximize your score improvements.
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
              {/* Mock score chart */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Your SAT Progress</h3>
                <div className="flex items-end gap-2 h-40">
                  {[65, 72, 68, 78, 82, 75, 88, 92].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                      className="flex-1 rounded-t-md gradient-bg"
                    />
                  ))}
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    <AnimatedCounter target={1420} suffix="" />
                  </div>
                  <p className="text-xs text-muted-foreground">Current Score</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">
                    +<AnimatedCounter target={180} />
                  </div>
                  <p className="text-xs text-muted-foreground">Improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    <AnimatedCounter target={94} suffix="%" />
                  </div>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              Top 5% Score
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExamPrepSection;
