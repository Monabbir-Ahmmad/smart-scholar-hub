import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PaymentIcon from "@mui/icons-material/Payment";
import { ChartCard } from "../ChartCard";

const invoicesData = [
  {
    id: "INV-2024-001",
    child: "Emma",
    description: "Advanced Mathematics - January",
    amount: 250,
    dueDate: "Jan 25, 2024",
    status: "pending",
  },
  {
    id: "INV-2024-002",
    child: "Liam",
    description: "Science Fundamentals - January",
    amount: 200,
    dueDate: "Jan 28, 2024",
    status: "pending",
  },
  {
    id: "INV-2024-003",
    child: "Sophie",
    description: "English Literature - January",
    amount: 275,
    dueDate: "Feb 01, 2024",
    status: "pending",
  },
  {
    id: "INV-2023-045",
    child: "Emma",
    description: "Physics Lab - December",
    amount: 150,
    dueDate: "Dec 20, 2023",
    status: "paid",
  },
  {
    id: "INV-2023-044",
    child: "Sophie",
    description: "Creative Writing - December",
    amount: 180,
    dueDate: "Dec 18, 2023",
    status: "paid",
  },
];

const paymentsData = [
  {
    id: "PAY-2024-001",
    invoiceId: "INV-2023-045",
    child: "Emma",
    amount: 150,
    date: "Dec 19, 2023",
    method: "Credit Card",
  },
  {
    id: "PAY-2024-002",
    invoiceId: "INV-2023-044",
    child: "Sophie",
    amount: 180,
    date: "Dec 17, 2023",
    method: "Bank Transfer",
  },
  {
    id: "PAY-2024-003",
    invoiceId: "INV-2023-040",
    child: "Liam",
    amount: 200,
    date: "Dec 10, 2023",
    method: "Credit Card",
  },
  {
    id: "PAY-2024-004",
    invoiceId: "INV-2023-038",
    child: "Emma",
    amount: 250,
    date: "Nov 28, 2023",
    method: "Credit Card",
  },
];

export const BillingPaymentTable = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const pendingTotal = invoicesData
    .filter((inv) => inv.status === "pending")
    .reduce((acc, inv) => acc + inv.amount, 0);

  const getStatusChip = (status: string) => {
    switch (status) {
      case "paid":
        return <Chip label="Paid" color="success" size="small" />;
      case "pending":
        return <Chip label="Pending" color="warning" size="small" />;
      case "overdue":
        return <Chip label="Overdue" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <ChartCard
      title="Billing & Payments"
      subtitle="Manage invoices and payment history"
      action={
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="caption" color="text.secondary">
              Outstanding
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "warning.main" }}>
              ${pendingTotal}
            </Typography>
          </Box>
          <Button variant="contained" startIcon={<PaymentIcon />} size="small">
            Pay Now
          </Button>
        </Box>
      }
    >
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        sx={{ mb: 2, borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Invoices" />
        <Tab label="Payment History" />
      </Tabs>

      {activeTab === 0 && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Invoice #</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Child</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoicesData.map((invoice) => (
                <TableRow
                  key={invoice.id}
                  sx={{
                    "&:hover": { bgcolor: "action.hover" },
                    bgcolor:
                      invoice.status === "pending" ? "warning.light" : "transparent",
                    opacity: invoice.status === "pending" ? 1 : 0.7,
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {invoice.id}
                    </Typography>
                  </TableCell>
                  <TableCell>{invoice.child}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${invoice.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{getStatusChip(invoice.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {activeTab === 1 && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Payment #</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Invoice</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Child</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  Amount
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Method</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentsData.map((payment) => (
                <TableRow key={payment.id} sx={{ "&:hover": { bgcolor: "action.hover" } }}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {payment.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {payment.invoiceId}
                    </Typography>
                  </TableCell>
                  <TableCell>{payment.child}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "success.main" }}>
                      ${payment.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip label={payment.method} size="small" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </ChartCard>
  );
};
