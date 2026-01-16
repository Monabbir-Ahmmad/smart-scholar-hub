import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Video, Clock, User, ArrowRight, Calendar } from "lucide-react";
import { format, addHours } from "date-fns";

const nextSession = {
  title: "Advanced Calculus - Integration Techniques",
  teacher: "Dr. Sarah Chen",
  scheduledAt: addHours(new Date(), 2),
  duration: 60,
  meetingLink: "https://meet.example.com/session-123",
  courseTitle: "Advanced Mathematics",
};

interface NextSessionCardProps {
  delay?: number;
}

export const NextSessionCard = ({ delay = 0 }: NextSessionCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        padding: 24,
        color: theme.palette.primary.contrastText,
      }}
    >
      {/* Background Pattern */}
      <Box sx={{ position: "absolute", inset: 0, opacity: 0.1 }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 256,
            height: 256,
            bgcolor: "white",
            borderRadius: "50%",
            transform: "translate(50%, -50%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 192,
            height: 192,
            bgcolor: "white",
            borderRadius: "50%",
            transform: "translate(-50%, 50%)",
          }}
        />
      </Box>

      <Box sx={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                p: 1,
                bgcolor: alpha("#FFFFFF", 0.2),
                borderRadius: 2,
                backdropFilter: "blur(8px)",
                display: "flex",
              }}
            >
              <Video style={{ width: 20, height: 20 }} />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500, opacity: 0.9 }}>
              Next Session
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.875rem",
              bgcolor: alpha("#FFFFFF", 0.2),
              px: 1.5,
              py: 0.5,
              borderRadius: 10,
              backdropFilter: "blur(8px)",
            }}
          >
            <Clock style={{ width: 16, height: 16 }} />
            <span>In 2 hours</span>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
            {nextSession.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {nextSession.courseTitle}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, fontSize: "0.875rem" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <User style={{ width: 16, height: 16, opacity: 0.7 }} />
            <span>{nextSession.teacher}</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Calendar style={{ width: 16, height: 16, opacity: 0.7 }} />
            <span>{format(nextSession.scheduledAt, "h:mm a")}</span>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Clock style={{ width: 16, height: 16, opacity: 0.7 }} />
            <span>{nextSession.duration} min</span>
          </Box>
        </Box>

        <Button
          variant="contained"
          fullWidth
          endIcon={<ArrowRight style={{ width: 16, height: 16 }} />}
          sx={{
            bgcolor: "white",
            color: "primary.main",
            fontWeight: 600,
            "&:hover": {
              bgcolor: alpha("#FFFFFF", 0.9),
            },
          }}
        >
          Join Session
        </Button>
      </Box>
    </motion.div>
  );
};
