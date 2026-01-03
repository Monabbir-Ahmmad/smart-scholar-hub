import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users, Award, TrendingUp, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  backLink?: { to: string; label: string };
  variant?: "signin" | "signup" | "forgot" | "reset";
}

const floatingIcons = [
  { Icon: BookOpen, delay: 0, x: "10%", y: "20%" },
  { Icon: Users, delay: 0.5, x: "75%", y: "15%" },
  { Icon: Award, delay: 1, x: "85%", y: "60%" },
  { Icon: TrendingUp, delay: 1.5, x: "15%", y: "70%" },
  { Icon: Sparkles, delay: 2, x: "60%", y: "80%" },
];

const contentVariants = {
  signin: {
    title: "Welcome Back!",
    subtitle: "Continue your learning journey",
    features: [
      "Access personalized learning paths",
      "Track your progress across all courses",
      "Connect with verified tutors",
    ],
  },
  signup: {
    title: "Start Learning Today",
    subtitle: "Join thousands of successful students",
    features: [
      "Expert-led courses and tutoring",
      "Comprehensive exam preparation",
      "Family-friendly account management",
    ],
  },
  forgot: {
    title: "Don't Worry",
    subtitle: "We'll help you get back on track",
    features: [
      "Quick and secure password reset",
      "Check your email for instructions",
      "Back to learning in no time",
    ],
  },
  reset: {
    title: "Almost There",
    subtitle: "Create a new secure password",
    features: [
      "Choose a strong, unique password",
      "Your account security matters",
      "Ready to continue learning",
    ],
  },
};

export const AuthLayout = ({ children, backLink, variant = "signin" }: AuthLayoutProps) => {
  const content = contentVariants[variant];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Animated Illustration Section */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] bg-primary/5 relative overflow-hidden">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          {/* Large floating circles */}
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-primary/10"
            style={{ top: "-10%", left: "-10%" }}
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 45, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-secondary/10"
            style={{ bottom: "10%", right: "-5%" }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-48 h-48 rounded-full bg-accent/15"
            style={{ top: "40%", right: "20%" }}
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute w-12 h-12 rounded-xl bg-background shadow-lg flex items-center justify-center"
            style={{ left: x, top: y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0],
            }}
            transition={{
              opacity: { delay: delay, duration: 0.5 },
              scale: { delay: delay, duration: 0.5 },
              y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>
        ))}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">E</span>
              </div>
              <span className="text-2xl font-bold text-foreground">EduPlatform</span>
            </Link>

            {/* Headline */}
            <motion.h1
              className="text-4xl xl:text-5xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {content.title}
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {content.subtitle}
            </motion.p>

            {/* Features */}
            <div className="space-y-4">
              {content.features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <motion.svg
                      className="w-4 h-4 text-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </div>
                  <span className="text-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              className="mt-12 p-6 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 max-w-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-4 h-4 text-accent fill-accent"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </motion.svg>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic mb-3">
                "This platform transformed how my kids learn. The tutors are amazing and the progress tracking keeps everyone motivated!"
              </p>
              <p className="text-sm font-medium text-foreground">Sarah M., Parent</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-20 py-12 relative">
        {/* Mobile Logo */}
        <Link to="/" className="lg:hidden inline-flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">E</span>
          </div>
          <span className="text-xl font-bold text-foreground">EduPlatform</span>
        </Link>

        {/* Back Link */}
        {backLink && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              to={backLink.to}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLink.label}
            </Link>
          </motion.div>
        )}

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto lg:mx-0"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
