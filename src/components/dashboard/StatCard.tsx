import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useTheme, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

export const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  delay = 0,
}: StatCardProps) => {
  const theme = useTheme();

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return theme.palette.success.main;
      case "negative":
        return theme.palette.error.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card
        sx={{
          "&:hover": {
            boxShadow: theme.shadows[5],
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {title}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}>
                {value}
              </Typography>
              {change && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 500,
                    color: getChangeColor(),
                  }}
                >
                  {change}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon style={{ width: 24, height: 24 }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
