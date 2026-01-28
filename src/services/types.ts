/**
 * Types for dashboard data based on MongoDB schemas from SCHEMA_SUMMARY.md
 */

// User related types
export interface UserGrowthData {
  month: string;
  students: number;
  teachers: number;
  parents: number;
}

export interface UserStats {
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  monthlyChange: number;
}

// Revenue and Billing types
export interface RevenueData {
  month: string;
  billed: number;
  paid: number;
}

export interface BillSummary {
  id: string;
  student: string;
  amount: number;
  dueDate: string;
  status: 'unpaid' | 'paid' | 'overdue' | 'payment-in-progress' | 'cancelled' | 'refunded' | 'partially-paid';
  daysOverdue: number;
  billType: string;
}

export interface RevenueStats {
  totalRevenue: number;
  paidAmount: number;
  pendingAmount: number;
  monthlyChange: number;
}

// Enrollment types
export interface EnrollmentStatusData {
  name: string;
  value: number;
  status: string;
}

export interface EnrollmentStats {
  totalEnrollments: number;
  activeEnrollments: number;
  pendingEnrollments: number;
  completedEnrollments: number;
  monthlyChange: number;
}

// Session types
export interface SessionCompletionData {
  week: string;
  rate: number;
  completed: number;
  total: number;
}

export interface SessionStats {
  totalSessions: number;
  completedSessions: number;
  cancelledSessions: number;
  rescheduledSessions: number;
  completionRate: number;
}

export interface WeeklySessionData {
  day: string;
  sessions: number;
  hours: number;
}

export interface UpcomingSession {
  id: string;
  title: string;
  teacher: string;
  student: string;
  scheduledAt: string;
  duration: number;
  status: string;
  meetingLink?: string;
}

// Question Bank types
export interface QuestionBankSubjectData {
  subject: string;
  questions: number;
  sets: number;
}

export interface QuestionDifficultyData {
  level: string;
  count: number;
}

export interface QuestionBankStats {
  totalQuestions: number;
  totalSets: number;
  bySubject: QuestionBankSubjectData[];
  byDifficulty: QuestionDifficultyData[];
}

// Performance types
export interface PerformanceDistributionData {
  range: string;
  count: number;
}

export interface PerformanceTrendData {
  week: string;
  score: number;
  average: number;
}

export interface SubjectMasteryData {
  subject: string;
  score: number;
  fullMark: number;
}

export interface StudentPerformanceStats {
  averageScore: number;
  totalSubmissions: number;
  improvement: number;
  bySubject: SubjectMasteryData[];
}

// Course types
export interface CourseProgress {
  id: string;
  title: string;
  teacher: string;
  progress: number;
  completedSessions: number;
  totalSessions: number;
  status: 'in_progress' | 'completed' | 'upcoming';
  category: string;
}

export interface CourseModuleStats {
  totalCourses: number;
  activeCourses: number;
  totalLessons: number;
}

// Teacher types
export interface TopTeacherData {
  name: string;
  subject: string;
  sessions: number;
  rating: number;
  completion: number;
  studentCount: number;
}

export interface TeacherStats {
  activeStudents: number;
  sessionsThisMonth: number;
  averageStudentScore: number;
  teachingHours: number;
}

// Parent types
export interface ChildOverview {
  id: string;
  name: string;
  grade: string;
  activeEnrollments: number;
  averageScore: number;
  upcomingSessions: number;
  attendanceRate: number;
}

export interface ParentStats {
  totalChildren: number;
  upcomingSessions: number;
  averageScore: number;
  outstandingBalance: number;
  pendingInvoices: number;
}

// Attendance types
export interface AttendanceData {
  name: string;
  value: number;
}

export interface AttendanceStats {
  attended: number;
  missed: number;
  rescheduled: number;
  totalSessions: number;
  attendanceRate: number;
}

// Assignment types
export interface UpcomingAssignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  type: 'assignment' | 'exam';
  status: 'pending' | 'submitted' | 'graded';
  priority: 'low' | 'medium' | 'high';
}

// Lesson types
export interface LessonContentStats {
  totalLessons: number;
  bySubject: { subject: string; count: number }[];
  recentlyCreated: number;
}

// Recent Activity types
export interface RecentActivity {
  id: string;
  type: 'enrollment' | 'payment' | 'session' | 'coursework' | 'user';
  description: string;
  timestamp: string;
  user?: string;
}

// Coursework Result types
export interface RecentResult {
  id: string;
  coursework: string;
  type: 'assignment' | 'exam';
  score: number;
  maxScore: number;
  completedAt: string;
  subject: string;
}

// Student Performance Heatmap types
export interface StudentPerformanceHeatmapData {
  studentName: string;
  studentId: string;
  subjects: { [subject: string]: number };
}
