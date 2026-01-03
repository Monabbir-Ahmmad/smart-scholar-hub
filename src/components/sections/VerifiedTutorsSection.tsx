import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { BadgeCheck, GraduationCap, ClipboardCheck, Award } from "lucide-react";

const steps = [
  {
    icon: GraduationCap,
    title: "Subject Expertise",
    description: "Tutors specialize in specific subjects with proven knowledge",
  },
  {
    icon: ClipboardCheck,
    title: "Qualification Exam",
    description: "Every tutor passes rigorous subject-specific assessments",
  },
  {
    icon: BadgeCheck,
    title: "Admin Review",
    description: "Teaching demos and credentials verified by our team",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Only top performers earn verified tutor status",
  },
];

export const VerifiedTutorsSection = () => {
  return (
    <SectionWrapper id="verified-tutors" className="bg-muted/30">
      <GradientBackground variant="dots" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-semibold text-primary mb-4"
          >
            VERIFIED TUTORS
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
          >
            Learn from{" "}
            <span className="text-primary">Verified Subject Experts</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Our rigorous verification process ensures you're learning from 
            qualified, experienced educators who are passionate about teaching.
          </motion.p>
        </div>
        
        {/* Certification steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-6 border border-border card-shadow hover:card-shadow-hover transition-all duration-300 relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.15, type: "spring" }}
                    className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-5"
                  >
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  
                  <div className="text-center">
                    <span className="inline-block text-xs font-bold text-primary mb-2">STEP {index + 1}</span>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {/* Step number connector */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.15 }}
                    className="hidden lg:flex absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-primary items-center justify-center z-20 -translate-y-1/2"
                  >
                    <span className="text-xs font-bold text-primary-foreground">→</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 bg-card rounded-3xl border border-border shadow-lg"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Verified Tutors" },
              { value: "98%", label: "Student Satisfaction" },
              { value: "50+", label: "Subjects Covered" },
              { value: "100K+", label: "Lessons Delivered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <p className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default VerifiedTutorsSection;
