import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LayoutDashboard, Users, BookOpen, BarChart2 } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Admin Dashboards",
    description: "Comprehensive overview of all platform activities",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Role-based access control and permissions",
  },
  {
    icon: BookOpen,
    title: "Content Creation",
    description: "Build courses, exams, and question banks",
  },
  {
    icon: BarChart2,
    title: "Analytics & Insights",
    description: "Track engagement, revenue, and performance",
  },
];

export const AdminSection = () => {
  return (
    <SectionWrapper id="admin" className="bg-muted/30">
      {/* Node network background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="nodes" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="2" className="fill-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nodes)" />
        <line x1="50" y1="50" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="250" y1="50" x2="150" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="bg-card rounded-3xl p-6 border border-border shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Platform Overview</h3>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </div>
                <div className="px-3 py-1 text-xs font-semibold text-success bg-success/10 rounded-full">
                  +12.5%
                </div>
              </div>
              
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Active Users", value: 12847, suffix: "", color: "primary" },
                  { label: "Revenue", value: 284, prefix: "$", suffix: "K", color: "success" },
                  { label: "Sessions", value: 45623, suffix: "", color: "secondary" },
                  { label: "Completion", value: 94, suffix: "%", color: "accent" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-muted/50 rounded-xl"
                  >
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">
                      <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                    </p>
                  </motion.div>
                ))}
              </div>
              
              {/* Mini chart */}
              <div className="h-32 flex items-end gap-1">
                {[40, 55, 45, 65, 75, 60, 80, 70, 85, 90, 75, 95].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                    className={`flex-1 rounded-t ${i === 11 ? "gradient-bg" : "bg-primary/20"}`}
                  />
                ))}
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
              ADMIN & PLATFORM CONTROL
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
            >
              Powerful Tools{" "}
              <span className="gradient-text">Behind the Scenes</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Our comprehensive admin dashboard gives you complete control 
              over every aspect of your educational platform.
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
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

export default AdminSection;
