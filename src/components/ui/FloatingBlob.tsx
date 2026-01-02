import { motion } from "framer-motion";

interface FloatingBlobProps {
  className?: string;
  color?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;
}

const colorMap = {
  primary: "from-primary/20 to-primary/5",
  secondary: "from-secondary/20 to-secondary/5",
  accent: "from-accent/20 to-accent/5",
};

const sizeMap = {
  sm: "w-32 h-32",
  md: "w-64 h-64",
  lg: "w-96 h-96",
  xl: "w-[500px] h-[500px]",
};

export const FloatingBlob = ({
  className = "",
  color = "primary",
  size = "md",
  delay = 0,
}: FloatingBlobProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute rounded-full bg-gradient-radial ${colorMap[color]} ${sizeMap[size]} blur-3xl ${className}`}
      style={{
        animation: `float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default FloatingBlob;
