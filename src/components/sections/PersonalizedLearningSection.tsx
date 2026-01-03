import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { User, Route, FileCheck, Clock } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Instructor-Led Courses",
    description: "Learn from expert tutors with personalized attention and guidance",
  },
  {
    icon: Route,
    title: "Custom Learning Paths",
    description: "AI-generated curricula adapted to your goals and pace",
  },
  {
    icon: FileCheck,
    title: "Quizzes & Assignments",
    description: "Interactive assessments with immediate feedback",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Reschedule lessons anytime without penalties",
  },
];

export const PersonalizedLearningSection = () => {
  return (
    <SectionWrapper id="personalized-learning" className="bg-background">
      <GradientBackground variant="grid" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary mb-4"
          >
            PERSONALIZED LEARNING
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
          >
            Learning That{" "}
            <span className="text-primary">Adapts to You</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our intelligent platform analyzes your performance and learning patterns 
            to create a truly personalized educational experience.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-6 bg-card rounded-2xl border border-border/50 card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Learning path visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-card rounded-3xl border border-border shadow-lg"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            {["Assess", "Plan", "Learn", "Practice", "Master"].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                  index === 4 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}>
                  {index + 1}
                </div>
                <span className="font-semibold text-foreground hidden sm:inline">{step}</span>
                {index < 4 && (
                  <div className="w-8 lg:w-16 h-0.5 bg-border hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default PersonalizedLearningSection;
