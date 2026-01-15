import { useTheme, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ChartCard } from "../ChartCard";
import { AlertTriangle, Clock, Send } from "lucide-react";

const bills = [
  { 
    id: "INV-2024-001",
    student: "Alex Johnson",
    amount: 450,
    dueDate: "2024-01-15",
    status: "overdue",
    daysOverdue: 12
  },
  { 
    id: "INV-2024-002",
    student: "Maria Garcia",
    amount: 320,
    dueDate: "2024-01-18",
    status: "overdue",
    daysOverdue: 9
  },
  { 
    id: "INV-2024-003",
    student: "James Wilson",
    amount: 580,
    dueDate: "2024-01-25",
    status: "due_soon",
    daysOverdue: 0
  },
  { 
    id: "INV-2024-004",
    student: "Sophie Chen",
    amount: 275,
    dueDate: "2024-01-28",
    status: "due_soon",
    daysOverdue: 0
  },
];

const totalOverdue = bills
  .filter(b => b.status === "overdue")
  .reduce((acc, b) => acc + b.amount, 0);

export const UnpaidBillsTable = ({ delay = 0 }: { delay?: number }) => {
  const theme = useTheme();

  return (
    <ChartCard
      title="Outstanding Bills"
      subtitle={`$${totalOverdue.toLocaleString()} overdue`}
      delay={delay}
      action={
        <Button
          size="small"
          variant="outlined"
          startIcon={<Send style={{ width: 16, height: 16 }} />}
        >
          Send Reminders
        </Button>
      }
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {bills.map((bill) => (
          <Box
            key={bill.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 1.5,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              transition: "background-color 0.2s",
              "&:hover": {
                bgcolor: alpha(theme.palette.muted, 0.5),
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: bill.status === "overdue" 
                    ? alpha(theme.palette.error.main, 0.1)
                    : alpha(theme.palette.warning.main, 0.1),
                }}
              >
                {bill.status === "overdue" ? (
                  <AlertTriangle style={{ width: 20, height: 20, color: theme.palette.error.main }} />
                ) : (
                  <Clock style={{ width: 20, height: 20, color: theme.palette.warning.main }} />
                )}
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {bill.student}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {bill.id}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                ${bill.amount}
              </Typography>
              <Chip
                label={bill.status === "overdue" 
                  ? `${bill.daysOverdue} days overdue`
                  : "Due soon"
                }
                size="small"
                color={bill.status === "overdue" ? "error" : "default"}
                sx={{
                  height: 22,
                  fontSize: "0.75rem",
                  ...(bill.status !== "overdue" && {
                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                    color: theme.palette.secondary.main,
                  }),
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
};
