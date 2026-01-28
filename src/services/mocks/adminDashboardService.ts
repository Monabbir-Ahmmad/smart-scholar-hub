/**
 * Admin Dashboard Mock Services
 * 
 * These services provide mock data for the admin dashboard.
 * Each function includes the corresponding Mongoose query as a comment
 * for backend implementation reference.
 */

import type {
  UserGrowthData,
  UserStats,
  RevenueData,
  RevenueStats,
  EnrollmentStatusData,
  EnrollmentStats,
  SessionCompletionData,
  SessionStats,
  QuestionBankStats,
  PerformanceDistributionData,
  TopTeacherData,
  BillSummary,
  LessonContentStats,
  RecentActivity,
} from '../types';

/**
 * Get monthly user growth data by role
 * 
 * Mongoose Query:
 * ```javascript
 * // Monthly user registrations by role
 * const userGrowth = await User.aggregate([
 *   {
 *     $match: {
 *       createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: {
 *         month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
 *         role: "$role"
 *       },
 *       count: { $sum: 1 }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: "$_id.month",
 *       roles: {
 *         $push: { role: "$_id.role", count: "$count" }
 *       }
 *     }
 *   },
 *   { $sort: { _id: 1 } }
 * ]);
 * ```
 */
export async function getUserGrowthData(): Promise<UserGrowthData[]> {
  // Mock data simulating 6 months of user registrations
  return [
    { month: "Aug", students: 120, teachers: 15, parents: 80 },
    { month: "Sep", students: 180, teachers: 22, parents: 120 },
    { month: "Oct", students: 250, teachers: 28, parents: 165 },
    { month: "Nov", students: 320, teachers: 35, parents: 210 },
    { month: "Dec", students: 410, teachers: 42, parents: 275 },
    { month: "Jan", students: 520, teachers: 48, parents: 340 },
  ];
}

/**
 * Get overall user statistics
 * 
 * Mongoose Query:
 * ```javascript
 * // User counts by role
 * const userStats = await User.aggregate([
 *   {
 *     $facet: {
 *       total: [{ $count: "count" }],
 *       byRole: [
 *         { $group: { _id: "$role", count: { $sum: 1 } } }
 *       ],
 *       thisMonth: [
 *         {
 *           $match: {
 *             createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
 *           }
 *         },
 *         { $count: "count" }
 *       ],
 *       lastMonth: [
 *         {
 *           $match: {
 *             createdAt: {
 *               $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
 *               $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
 *             }
 *           }
 *         },
 *         { $count: "count" }
 *       ]
 *     }
 *   }
 * ]);
 * ```
 */
export async function getUserStats(): Promise<UserStats> {
  return {
    totalUsers: 2847,
    totalStudents: 1820,
    totalTeachers: 190,
    totalParents: 837,
    monthlyChange: 12.5,
  };
}

/**
 * Get monthly revenue data (billed vs paid)
 * 
 * Mongoose Query:
 * ```javascript
 * // Monthly revenue - billed amount
 * const billedByMonth = await Bill.aggregate([
 *   {
 *     $match: {
 *       label: "income",
 *       createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
 *       billed: { $sum: "$totalPrice" },
 *       paid: {
 *         $sum: {
 *           $cond: [{ $eq: ["$status", "paid"] }, "$totalPrice", 0]
 *         }
 *       }
 *     }
 *   },
 *   { $sort: { _id: 1 } }
 * ]);
 * ```
 */
export async function getRevenueData(): Promise<RevenueData[]> {
  return [
    { month: "Aug", billed: 12500, paid: 11200 },
    { month: "Sep", billed: 15800, paid: 14500 },
    { month: "Oct", billed: 18200, paid: 16800 },
    { month: "Nov", billed: 22400, paid: 20100 },
    { month: "Dec", billed: 28600, paid: 25400 },
    { month: "Jan", billed: 32800, paid: 29200 },
  ];
}

/**
 * Get overall revenue statistics
 * 
 * Mongoose Query:
 * ```javascript
 * // Revenue summary for current month
 * const revenueStats = await Bill.aggregate([
 *   {
 *     $match: {
 *       label: "income",
 *       createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: null,
 *       totalBilled: { $sum: "$totalPrice" },
 *       totalPaid: { $sum: "$paidAmount" },
 *       paidCount: {
 *         $sum: { $cond: [{ $eq: ["$status", "paid"] }, 1, 0] }
 *       }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getRevenueStats(): Promise<RevenueStats> {
  return {
    totalRevenue: 32840,
    paidAmount: 29200,
    pendingAmount: 3640,
    monthlyChange: 22.1,
  };
}

/**
 * Get enrollment status distribution
 * 
 * Mongoose Query:
 * ```javascript
 * // Enrollment distribution by status
 * // Note: status is an array field, so we use $unwind
 * const enrollmentStatus = await CourseEnrollment.aggregate([
 *   { $unwind: "$status" },
 *   {
 *     $group: {
 *       _id: "$status",
 *       count: { $sum: 1 }
 *     }
 *   },
 *   {
 *     $project: {
 *       status: "$_id",
 *       count: 1,
 *       _id: 0
 *     }
 *   }
 * ]);
 * 
 * // Alternative: Get unique enrollments by most recent status
 * const enrollmentByLatestStatus = await CourseEnrollment.aggregate([
 *   {
 *     $project: {
 *       latestStatus: { $arrayElemAt: ["$status", -1] }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: "$latestStatus",
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getEnrollmentStatusData(): Promise<EnrollmentStatusData[]> {
  return [
    { name: "In Progress", value: 245, status: "course-in-progress" },
    { name: "Pending Approval", value: 85, status: "parent-approval-pending" },
    { name: "Completed", value: 180, status: "completed" },
    { name: "Cancelled", value: 32, status: "cancelled" },
  ];
}

/**
 * Get enrollment statistics
 * 
 * Mongoose Query:
 * ```javascript
 * // Enrollment counts
 * const enrollmentStats = await CourseEnrollment.aggregate([
 *   {
 *     $facet: {
 *       total: [{ $count: "count" }],
 *       active: [
 *         { $match: { status: { $in: ["course-in-progress"] } } },
 *         { $count: "count" }
 *       ],
 *       pending: [
 *         {
 *           $match: {
 *             status: {
 *               $in: [
 *                 "parent-approval-pending",
 *                 "teacher-assignment-pending",
 *                 "schedule-submission-pending"
 *               ]
 *             }
 *           }
 *         },
 *         { $count: "count" }
 *       ],
 *       thisMonth: [
 *         { $match: { createdAt: { $gte: new Date(new Date().setDate(1)) } } },
 *         { $count: "count" }
 *       ]
 *     }
 *   }
 * ]);
 * ```
 */
export async function getEnrollmentStats(): Promise<EnrollmentStats> {
  return {
    totalEnrollments: 542,
    activeEnrollments: 245,
    pendingEnrollments: 85,
    completedEnrollments: 180,
    monthlyChange: 8.2,
  };
}

/**
 * Get session completion rate data over time
 * 
 * Mongoose Query:
 * ```javascript
 * // Weekly session completion rates
 * const sessionCompletion = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       scheduledAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 2)) }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: { $week: "$scheduledAt" },
 *       total: { $sum: 1 },
 *       completed: {
 *         $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
 *       }
 *     }
 *   },
 *   {
 *     $project: {
 *       week: "$_id",
 *       rate: {
 *         $multiply: [{ $divide: ["$completed", "$total"] }, 100]
 *       },
 *       completed: 1,
 *       total: 1
 *     }
 *   },
 *   { $sort: { week: 1 } }
 * ]);
 * ```
 */
export async function getSessionCompletionData(): Promise<SessionCompletionData[]> {
  return [
    { week: "W1", rate: 85, completed: 145, total: 171 },
    { week: "W2", rate: 88, completed: 158, total: 180 },
    { week: "W3", rate: 82, completed: 139, total: 170 },
    { week: "W4", rate: 91, completed: 168, total: 185 },
    { week: "W5", rate: 89, completed: 160, total: 180 },
    { week: "W6", rate: 94, completed: 178, total: 189 },
    { week: "W7", rate: 92, completed: 172, total: 187 },
    { week: "W8", rate: 96, completed: 185, total: 193 },
  ];
}

/**
 * Get session statistics
 * 
 * Mongoose Query:
 * ```javascript
 * // Session statistics
 * const sessionStats = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       scheduledAt: { $gte: new Date(new Date().setDate(1)) }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: "$status",
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * 
 * // Calculate completion rate
 * const completionRate = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       status: { $in: ["completed", "cancelled", "skipped"] }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: null,
 *       total: { $sum: 1 },
 *       completed: {
 *         $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
 *       }
 *     }
 *   },
 *   {
 *     $project: {
 *       rate: { $multiply: [{ $divide: ["$completed", "$total"] }, 100] }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getSessionStats(): Promise<SessionStats> {
  return {
    totalSessions: 1284,
    completedSessions: 1210,
    cancelledSessions: 45,
    rescheduledSessions: 29,
    completionRate: 94.2,
  };
}

/**
 * Get question bank statistics
 * 
 * Mongoose Query:
 * ```javascript
 * // Questions by subject
 * const questionsBySubject = await Question.aggregate([
 *   { $match: { hidden: { $ne: true } } },
 *   {
 *     $group: {
 *       _id: "$subject",
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * 
 * // Questions by difficulty
 * const questionsByDifficulty = await Question.aggregate([
 *   { $match: { hidden: { $ne: true } } },
 *   {
 *     $group: {
 *       _id: "$difficulty",
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * 
 * // Question sets by subject
 * const questionSetsBySubject = await QuestionSet.aggregate([
 *   { $match: { hidden: { $ne: true } } },
 *   {
 *     $group: {
 *       _id: "$subject",
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getQuestionBankStats(): Promise<QuestionBankStats> {
  return {
    totalQuestions: 3640,
    totalSets: 170,
    bySubject: [
      { subject: "Math", questions: 850, sets: 42 },
      { subject: "Physics", questions: 620, sets: 35 },
      { subject: "Chemistry", questions: 540, sets: 28 },
      { subject: "Biology", questions: 480, sets: 25 },
      { subject: "English", questions: 390, sets: 22 },
      { subject: "History", questions: 280, sets: 18 },
    ],
    byDifficulty: [
      { level: "Easy", count: 1240 },
      { level: "Medium", count: 1580 },
      { level: "Hard", count: 820 },
    ],
  };
}

/**
 * Get lesson content statistics
 * 
 * Mongoose Query:
 * ```javascript
 * // Lessons by subject
 * const lessonsBySubject = await LessonPlan.aggregate([
 *   {
 *     $group: {
 *       _id: "$subject",
 *       count: { $sum: 1 }
 *     }
 *   }
 * ]);
 * 
 * // Recently created lessons (this week)
 * const recentLessons = await LessonPlan.countDocuments({
 *   createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
 * });
 * 
 * // Total lessons
 * const totalLessons = await LessonPlan.countDocuments();
 * ```
 */
export async function getLessonContentStats(): Promise<LessonContentStats> {
  return {
    totalLessons: 248,
    bySubject: [
      { subject: "Math", count: 62 },
      { subject: "Physics", count: 48 },
      { subject: "Chemistry", count: 42 },
      { subject: "Biology", count: 38 },
      { subject: "English", count: 35 },
      { subject: "History", count: 23 },
    ],
    recentlyCreated: 12,
  };
}

/**
 * Get student performance distribution
 * 
 * Mongoose Query:
 * ```javascript
 * // Performance distribution from coursework results
 * const performanceDistribution = await CourseworkResult.aggregate([
 *   { $unwind: "$sections" },
 *   { $unwind: "$sections.submissions" },
 *   {
 *     $group: {
 *       _id: "$_id",
 *       totalQuestions: { $sum: 1 },
 *       correctAnswers: {
 *         $sum: { $cond: ["$sections.submissions.isCorrect", 1, 0] }
 *       }
 *     }
 *   },
 *   {
 *     $project: {
 *       percentage: {
 *         $multiply: [{ $divide: ["$correctAnswers", "$totalQuestions"] }, 100]
 *       }
 *     }
 *   },
 *   {
 *     $bucket: {
 *       groupBy: "$percentage",
 *       boundaries: [0, 51, 71, 86, 96, 101],
 *       default: "Other",
 *       output: { count: { $sum: 1 } }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getPerformanceDistribution(): Promise<PerformanceDistributionData[]> {
  return [
    { range: "0-50%", count: 45 },
    { range: "51-70%", count: 120 },
    { range: "71-85%", count: 280 },
    { range: "86-95%", count: 185 },
    { range: "96-100%", count: 95 },
  ];
}

/**
 * Get top performing teachers
 * 
 * Mongoose Query:
 * ```javascript
 * // Top teachers by completed sessions this month
 * const topTeachers = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       status: "completed",
 *       scheduledAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: "$teacher",
 *       sessionsCompleted: { $sum: 1 }
 *     }
 *   },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "_id",
 *       foreignField: "_id",
 *       as: "teacherInfo"
 *     }
 *   },
 *   { $unwind: "$teacherInfo" },
 *   {
 *     $lookup: {
 *       from: "courseenrollments",
 *       let: { teacherId: "$_id" },
 *       pipeline: [
 *         { $match: { $expr: { $eq: ["$teacher", "$$teacherId"] } } },
 *         { $match: { status: { $in: ["course-in-progress"] } } },
 *         { $group: { _id: null, count: { $sum: 1 } } }
 *       ],
 *       as: "studentCount"
 *     }
 *   },
 *   {
 *     $project: {
 *       name: { $concat: ["$teacherInfo.firstName", " ", "$teacherInfo.lastName"] },
 *       sessions: "$sessionsCompleted",
 *       studentCount: { $ifNull: [{ $arrayElemAt: ["$studentCount.count", 0] }, 0] }
 *     }
 *   },
 *   { $sort: { sessions: -1 } },
 *   { $limit: 5 }
 * ]);
 * ```
 */
export async function getTopTeachers(): Promise<TopTeacherData[]> {
  return [
    { name: "Dr. Sarah Chen", subject: "Mathematics", sessions: 142, rating: 4.9, completion: 98, studentCount: 28 },
    { name: "Prof. James Wilson", subject: "Physics", sessions: 128, rating: 4.8, completion: 96, studentCount: 24 },
    { name: "Ms. Emily Rodriguez", subject: "Chemistry", sessions: 115, rating: 4.9, completion: 97, studentCount: 22 },
    { name: "Mr. David Kim", subject: "Biology", sessions: 98, rating: 4.7, completion: 94, studentCount: 18 },
    { name: "Dr. Lisa Thompson", subject: "English", sessions: 87, rating: 4.8, completion: 95, studentCount: 16 },
  ];
}

/**
 * Get unpaid/overdue bills
 * 
 * Mongoose Query:
 * ```javascript
 * // Unpaid and overdue bills
 * const unpaidBills = await Bill.aggregate([
 *   {
 *     $match: {
 *       status: { $in: ["unpaid", "overdue", "partially-paid"] },
 *       label: "income"
 *     }
 *   },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "billedTo",
 *       foreignField: "_id",
 *       as: "userInfo"
 *     }
 *   },
 *   { $unwind: "$userInfo" },
 *   {
 *     $project: {
 *       id: { $toString: "$_id" },
 *       student: { $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"] },
 *       amount: "$totalPrice",
 *       dueDate: { $dateToString: { format: "%Y-%m-%d", date: "$dueDate" } },
 *       status: 1,
 *       billType: "$type",
 *       daysOverdue: {
 *         $cond: {
 *           if: { $lt: ["$dueDate", new Date()] },
 *           then: {
 *             $divide: [{ $subtract: [new Date(), "$dueDate"] }, 1000 * 60 * 60 * 24]
 *           },
 *           else: 0
 *         }
 *       }
 *     }
 *   },
 *   { $sort: { daysOverdue: -1 } },
 *   { $limit: 10 }
 * ]);
 * ```
 */
export async function getUnpaidBills(): Promise<BillSummary[]> {
  return [
    {
      id: "INV-2024-001",
      student: "Alex Johnson",
      amount: 450,
      dueDate: "2024-01-15",
      status: "overdue",
      daysOverdue: 12,
      billType: "lesson-fee",
    },
    {
      id: "INV-2024-002",
      student: "Maria Garcia",
      amount: 320,
      dueDate: "2024-01-18",
      status: "overdue",
      daysOverdue: 9,
      billType: "enrollment-fee",
    },
    {
      id: "INV-2024-003",
      student: "James Wilson",
      amount: 580,
      dueDate: "2024-01-25",
      status: "unpaid",
      daysOverdue: 0,
      billType: "lesson-fee",
    },
    {
      id: "INV-2024-004",
      student: "Sophie Chen",
      amount: 275,
      dueDate: "2024-01-28",
      status: "unpaid",
      daysOverdue: 0,
      billType: "exam-fee",
    },
  ];
}

/**
 * Get recent platform activity
 * 
 * Mongoose Query:
 * ```javascript
 * // Recent activity - This would typically be a separate Activity collection
 * // or aggregated from multiple collections
 * 
 * // Recent enrollments
 * const recentEnrollments = await CourseEnrollment.find()
 *   .sort({ createdAt: -1 })
 *   .limit(5)
 *   .populate('student', 'firstName lastName')
 *   .populate('courseModule', 'title');
 * 
 * // Recent payments
 * const recentPayments = await Invoice.find({ status: "payment-confirmed" })
 *   .sort({ updatedAt: -1 })
 *   .limit(5)
 *   .populate('paidBy', 'firstName lastName');
 * 
 * // Recent session completions
 * const recentSessions = await EnrolledSession.find({ status: "completed" })
 *   .sort({ endedAt: -1 })
 *   .limit(5)
 *   .populate('student', 'firstName lastName');
 * ```
 */
export async function getRecentActivity(): Promise<RecentActivity[]> {
  return [
    {
      id: "1",
      type: "enrollment",
      description: "New enrollment: SAT Math Prep",
      timestamp: "2024-01-27T10:30:00Z",
      user: "Alex Johnson",
    },
    {
      id: "2",
      type: "payment",
      description: "Payment received: $450",
      timestamp: "2024-01-27T09:15:00Z",
      user: "Maria Garcia",
    },
    {
      id: "3",
      type: "session",
      description: "Session completed: Advanced Algebra",
      timestamp: "2024-01-27T08:00:00Z",
      user: "Dr. Sarah Chen",
    },
    {
      id: "4",
      type: "coursework",
      description: "Exam submitted: SAT Practice Test #5",
      timestamp: "2024-01-26T16:45:00Z",
      user: "James Wilson",
    },
    {
      id: "5",
      type: "user",
      description: "New teacher registered",
      timestamp: "2024-01-26T14:20:00Z",
      user: "Prof. Michael Lee",
    },
  ];
}
