import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Sparkles, Shield, Users, Zap, Server, Lock } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Personalized Learning",
    description: "AI-driven paths that adapt to each student's unique needs",
  },
  {
    icon: Shield,
    title: "Verified Tutors",
    description: "Every instructor passes rigorous qualification exams",
  },
  {
    icon: Users,
    title: "Family-Friendly",
    description: "Parent controls and multi-student account management",
  },
  {
    icon: Zap,
    title: "Full Automation",
    description: "Scheduling, payments, and notifications run automatically",
  },
  {
    icon: Server,
    title: "Scalable Architecture",
    description: "Built to grow with thousands of concurrent users",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-level encryption and data protection standards",
  },
];

export const BenefitsSection = () => {
  return (
    <SectionWrapper id="benefits" className="bg-background">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary mb-4"
          >
            WHY CHOOSE US
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
          >
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            A complete learning ecosystem designed for modern education, 
            backed by cutting-edge technology.
          </motion.p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.08 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 bg-card rounded-2xl border border-border/50 card-shadow hover:card-shadow-hover transition-all duration-300 text-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6"
                >
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BenefitsSection;
