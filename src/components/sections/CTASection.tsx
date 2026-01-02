import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/GradientBackground";
import { ArrowRight, MessageSquare } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <GradientBackground variant="mesh" />
      
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 w-full rotate-180">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-muted/50"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              Start Your Learning{" "}
              <span className="gradient-text">Journey Today</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Everything you need to learn, practice, and succeed—on one powerful platform. 
              Join thousands of students achieving their academic goals.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" className="group">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline" size="xl" className="group">
                <MessageSquare className="w-5 h-5 text-primary" />
                Request a Demo
              </Button>
            </div>
          </motion.div>
          
          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 pt-8 border-t border-border/30"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              {[
                "No credit card required",
                "Free 14-day trial",
                "Cancel anytime",
              ].map((text, i) => (
                <div key={text} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
