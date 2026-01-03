import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Calendar, Bell, CreditCard, RefreshCw } from "lucide-react";

export const SchedulingSection = () => {
  return (
    <SectionWrapper id="scheduling" className="bg-background">
      {/* Calendar grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      
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
              SCHEDULING & PAYMENTS
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6"
            >
              Simple Scheduling.{" "}
              <span className="text-primary">Secure Payments.</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Book lessons, manage your calendar, and handle payments 
              seamlessly—all in one place with enterprise-grade security.
            </motion.p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Calendar, title: "Smart Calendar", desc: "Sync with iCal, Google Calendar" },
                { icon: Bell, title: "Auto Reminders", desc: "Never miss a class again" },
                { icon: CreditCard, title: "Stripe Payments", desc: "Secure, hassle-free billing" },
                { icon: RefreshCw, title: "Subscriptions", desc: "Flexible monthly plans" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Calendar mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-6 border border-border shadow-xl">
              {/* Calendar header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-foreground">January 2026</h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">←</button>
                  <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">→</button>
                </div>
              </div>
              
              {/* Days header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 3;
                  const isCurrentMonth = day >= 1 && day <= 31;
                  const hasClass = [5, 8, 12, 15, 19, 22, 26].includes(day);
                  const isToday = day === 15;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.01 }}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm relative ${
                        !isCurrentMonth
                          ? "text-muted-foreground/30"
                          : isToday
                          ? "bg-primary text-primary-foreground font-bold"
                          : hasClass
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {isCurrentMonth ? day : day > 0 ? day : 31 + day}
                      {hasClass && !isToday && (
                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Upcoming class */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-12 rounded-full bg-primary" />
                  <div>
                    <p className="font-semibold text-foreground">SAT Math Practice</p>
                    <p className="text-sm text-muted-foreground">Today, 4:00 PM - 5:00 PM</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 text-xs font-semibold text-success bg-success/10 rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Payment success badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-success text-success-foreground px-4 py-3 rounded-xl shadow-lg flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-semibold">Payment Successful</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SchedulingSection;
