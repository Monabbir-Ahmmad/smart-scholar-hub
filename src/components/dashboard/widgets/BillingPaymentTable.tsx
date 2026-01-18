import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import { ChartCard } from "../ChartCard";
import { Download, CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react";

const invoices = [
  {
    id: "INV-2024-001",
    child: "Emma",
    description: "January 2024 - Mathematics Tutoring",
    amount: 450,
    dueDate: "2024-01-25",
    status: "paid",
    paidDate: "2024-01-20",
  },
  {
    id: "INV-2024-002",
    child: "Liam",
    description: "January 2024 - English Literature",
    amount: 350,
    dueDate: "2024-01-28",
    status: "pending",
    paidDate: null,
  },
  {
    id: "INV-2024-003",
    child: "Olivia",
    description: "January 2024 - Physics & Chemistry",
    amount: 600,
    dueDate: "2024-01-20",
    status: "overdue",
    paidDate: null,
  },
  {
    id: "INV-2024-004",
    child: "Emma",
    description: "December 2023 - Mathematics Tutoring",
    amount: 450,
    dueDate: "2023-12-25",
    status: "paid",
    paidDate: "2023-12-22",
  },
];

const payments = [
  {
    id: "PAY-001",
    invoiceId: "INV-2024-001",
    child: "Emma",
    amount: 450,
    method: "Credit Card",
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: "PAY-002",
    invoiceId: "INV-2023-012",
    child: "Olivia",
    amount: 600,
    method: "Bank Transfer",
    date: "2023-12-28",
    status: "completed",
  },
  {
    id: "PAY-003",
    invoiceId: "INV-2023-011",
    child: "Liam",
    amount: 350,
    method: "Credit Card",
    date: "2023-12-15",
    status: "completed",
  },
];

const getStatusConfig = (status: string, theme: any) => {
  switch (status) {
    case "paid":
    case "completed":
      return {
        color: theme.palette.success.main,
        bgcolor: alpha(theme.palette.success.main, 0.1),
        icon: CheckCircle,
        label: status === "paid" ? "Paid" : "Completed",
      };
    case "pending":
      return {
        color: theme.palette.warning.main,
        bgcolor: alpha(theme.palette.warning.main, 0.1),
        icon: Clock,
        label: "Pending",
      };
    case "overdue":
      return {
        color: theme.palette.error.main,
        bgcolor: alpha(theme.palette.error.main, 0.1),
        icon: AlertCircle,
        label: "Overdue",
      };
    default:
      return {
        color: theme.palette.text.secondary,
        bgcolor: alpha(theme.palette.divider, 0.1),
        icon: Clock,
        label: status,
      };
  }
};

export const BillingPaymentTable = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const totalDue = invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <ChartCard
      title="Billing & Payments"
      subtitle={`Total due: $${totalDue.toLocaleString()}`}
      delay={delay}
      action={
        <Button
          variant="contained"
          size="small"
          startIcon={<CreditCard size={16} />}
          sx={{
            textTransform: "none",
            bgcolor: "success.main",
            "&:hover": { bgcolor: "success.dark" },
          }}
        >
          Pay Now
        </Button>
      }
    >
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{
          mb: 2,
          "& .MuiTab-root": {
            textTransform: "none",
            minWidth: 100,
          },
        }}
      >
        <Tab label="Invoices" />
        <Tab label="Payment History" />
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {invoices.map((invoice, index) => {
            const statusConfig = getStatusConfig(invoice.status, theme);
            const StatusIcon = statusConfig.icon;
            return (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + index * 0.05 }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.success.main, 0.02),
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {invoice.id}
                        </Typography>
                        <Chip
                          label={invoice.child}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: "primary.main",
                          }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {invoice.description}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Due: {invoice.dueDate}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        ${invoice.amount}
                      </Typography>
                      <Chip
                        icon={<StatusIcon size={14} />}
                        label={statusConfig.label}
                        size="small"
                        sx={{
                          bgcolor: statusConfig.bgcolor,
                          color: statusConfig.color,
                          "& .MuiChip-icon": { color: "inherit" },
                        }}
                      />
                      <IconButton size="small">
                        <Download size={18} />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {payments.map((payment, index) => {
            const statusConfig = getStatusConfig(payment.status, theme);
            const StatusIcon = statusConfig.icon;
            return (
              <motion.div
                key={payment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + index * 0.05 }}
              >
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.success.main, 0.02),
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {payment.id}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          for {payment.invoiceId}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {payment.child} • {payment.method}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {payment.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "success.main" }}>
                        ${payment.amount}
                      </Typography>
                      <Chip
                        icon={<StatusIcon size={14} />}
                        label={statusConfig.label}
                        size="small"
                        sx={{
                          bgcolor: statusConfig.bgcolor,
                          color: statusConfig.color,
                          "& .MuiChip-icon": { color: "inherit" },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      )}
    </ChartCard>
  );
};
