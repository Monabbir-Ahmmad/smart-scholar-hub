import { ChartCard } from "../ChartCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  return (
    <ChartCard
      title="Outstanding Bills"
      subtitle={`$${totalOverdue.toLocaleString()} overdue`}
      delay={delay}
      action={
        <Button size="sm" variant="outline" className="gap-2">
          <Send className="h-4 w-4" />
          Send Reminders
        </Button>
      }
    >
      <div className="space-y-3">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                bill.status === "overdue" ? "bg-destructive/10" : "bg-accent/10"
              }`}>
                {bill.status === "overdue" ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <Clock className="h-5 w-5 text-accent" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{bill.student}</p>
                <p className="text-xs text-muted-foreground">{bill.id}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">${bill.amount}</p>
              <Badge 
                variant={bill.status === "overdue" ? "destructive" : "secondary"}
                className="text-xs"
              >
                {bill.status === "overdue" 
                  ? `${bill.daysOverdue} days overdue`
                  : "Due soon"
                }
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};
