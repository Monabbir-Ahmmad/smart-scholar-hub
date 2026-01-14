import { motion } from "framer-motion";

interface GradientBackgroundProps {
  variant?: "mesh" | "dots" | "grid" | "waves";
  className?: string;
}

export const GradientBackground = ({
  variant = "mesh",
  className = "",
}: GradientBackgroundProps) => {
  if (variant === "dots") {
    return (
      <div
        className={`absolute inset-0 opacity-[0.08] ${className}`}
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
    );
  }

  if (variant === "grid") {
    return (
      <div
        className={`absolute inset-0 opacity-[0.06] ${className}`}
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    );
  }

  if (variant === "waves") {
    return (
      <svg
        className={`absolute bottom-0 left-0 w-full h-32 opacity-10 ${className}`}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          fill="hsl(var(--primary))"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,208C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    );
  }

  // Default mesh - now using solid colors
  return (
    <div className={`absolute inset-0 ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-muted/50 blur-[100px]"
      />
    </div>
  );
};

export default GradientBackground;
