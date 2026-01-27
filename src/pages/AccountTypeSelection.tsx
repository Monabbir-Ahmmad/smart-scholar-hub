import { Box, Typography, Container } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Users, GraduationCap, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/theme/muiTheme";

const accountTypes = [
  {
    id: "parent",
    title: "Parent",
    description: "Manage your family's schedule",
    icon: Users,
    route: "/parent",
    gradient: "from-primary to-secondary",
  },
  {
    id: "tutor",
    title: "Tutor",
    description: "Connect with students",
    icon: GraduationCap,
    route: "/teacher",
    gradient: "from-secondary to-accent",
  },
  {
    id: "student",
    title: "Student",
    description: "Join solo as a student",
    icon: UserCircle,
    route: "/student",
    gradient: "from-accent to-success",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const AccountTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        </div>

        <Container maxWidth="lg" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <Typography
              variant="h3"
              className="font-bold text-foreground mb-4"
              sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800 }}
            >
              Choose your account type
            </Typography>
            <Typography
              variant="h6"
              className="text-muted-foreground max-w-md mx-auto"
              sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 400 }}
            >
              Select the type of account you want to create
            </Typography>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {accountTypes.map((account) => {
              const IconComponent = account.icon;
              return (
                <motion.div
                  key={account.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(account.route)}
                  className="cursor-pointer group"
                >
                  <div className="relative bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${account.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    {/* Icon container */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${account.gradient} flex items-center justify-center mb-6 mx-auto shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </motion.div>

                    {/* Content */}
                    <Typography
                      variant="h5"
                      className="font-bold text-foreground text-center mb-2"
                      sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
                    >
                      {account.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="text-muted-foreground text-center"
                      sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {account.description}
                    </Typography>

                    {/* Arrow indicator */}
                    <motion.div 
                      className="mt-6 flex justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${account.gradient} text-primary-foreground text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        Get Started →
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Admin link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-12"
          >
            <Typography
              variant="body2"
              className="text-muted-foreground"
              sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Are you an administrator?{" "}
              <span
                onClick={() => navigate("/admin")}
                className="text-primary hover:underline cursor-pointer font-medium"
              >
                Sign in here
              </span>
            </Typography>
          </motion.div>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AccountTypeSelection;
