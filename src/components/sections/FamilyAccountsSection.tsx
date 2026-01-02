import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Users, CreditCard, LineChart, Bell, User } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Family Accounts",
    description: "Manage multiple students under one or two parent accounts",
  },
  {
    icon: CreditCard,
    title: "Unified Payments",
    description: "Single billing for all family members' courses and sessions",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Monitor attendance, grades, and exam results at a glance",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated alerts for upcoming classes, exams, and reports",
  },
  {
    icon: User,
    title: "Solo Student Support",
    description: "Independent students can manage their own accounts too",
  },
];

export const FamilyAccountsSection = () => {
  return (
    <SectionWrapper id="family-accounts" className="bg-background">
      {/* Background illustration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
        <svg viewBox="0 0 400 300" className="w-full max-w-4xl h-auto">
          <circle cx="200" cy="120" r="40" className="fill-primary" />
          <circle cx="120" cy="200" r="30" className="fill-secondary" />
          <circle cx="280" cy="200" r="30" className="fill-secondary" />
          <path d="M200 160 L200 200 M200 200 L150 260 M200 200 L250 260" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="150" cy="260" r="20" className="fill-accent" />
          <circle cx="250" cy="260" r="20" className="fill-accent" />
        </svg>
      </div>
      
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
              FAMILY & PARENT ACCOUNTS
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
            >
              Built for Students.{" "}
              <span className="gradient-text">Trusted by Parents.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Our family-centric platform gives parents full visibility and control 
              while empowering students to take ownership of their education.
            </motion.p>
            
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-6 border border-border shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Family Dashboard</h3>
                  <p className="text-sm text-muted-foreground">The Johnson Family</p>
                </div>
                <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              
              {/* Family members */}
              <div className="space-y-3 mb-6">
                {[
                  { name: "Emma Johnson", role: "Student", progress: 85 },
                  { name: "Michael Johnson", role: "Student", progress: 72 },
                ].map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 bg-muted/50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
                        <div>
                          <p className="font-medium text-foreground text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-primary">{member.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${member.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        className="h-full gradient-bg rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                {[
                  { label: "Classes", value: "24" },
                  { label: "Exams", value: "8" },
                  { label: "Hours", value: "156" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FamilyAccountsSection;
