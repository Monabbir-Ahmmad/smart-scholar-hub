import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  delay?: number;
}

export const ChartCard = ({
  title,
  subtitle,
  children,
  action,
  delay = 0,
}: ChartCardProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          "&:hover": {
            boxShadow: theme.shadows[5],
          },
        }}
      >
        <CardHeader
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 1,
          }}
          title={
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography variant="h6" sx={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  {title}
                </Typography>
                {subtitle && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {subtitle}
                  </Typography>
                )}
              </Box>
              {action}
            </Box>
          }
        />
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
};
