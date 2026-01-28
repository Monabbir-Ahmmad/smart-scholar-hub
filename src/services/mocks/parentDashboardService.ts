/**
 * Parent Dashboard Mock Services
 * 
 * These services provide mock data for the parent dashboard.
 * Each function includes the corresponding Mongoose query as a comment
 * for backend implementation reference.
 */

import type {
  ParentStats,
  ChildOverview,
  UpcomingSession,
  PerformanceTrendData,
  AttendanceStats,
  BillSummary,
} from '../types';

/**
 * Get parent statistics
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', '_id');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * // Total children count
 * const totalChildren = childrenIds.length;
 * 
 * // Upcoming sessions for all children
 * const upcomingSessions = await EnrolledSession.countDocuments({
 *   student: { $in: childrenIds },
 *   scheduledAt: {
 *     $gte: new Date(),
 *     $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 *   },
 *   status: "not-started"
 * });
 * 
 * // Average score across all children
 * const avgScore = await CourseworkResult.aggregate([
 *   { $match: { examinee: { $in: childrenIds } } },
 *   { $unwind: "$sections" },
 *   { $unwind: "$sections.submissions" },
 *   {
 *     $group: {
 *       _id: null,
 *       total: { $sum: 1 },
 *       correct: { $sum: { $cond: ["$sections.submissions.isCorrect", 1, 0] } }
 *     }
 *   },
 *   {
 *     $project: {
 *       avgScore: { $multiply: [{ $divide: ["$correct", "$total"] }, 100] }
 *     }
 *   }
 * ]);
 * 
 * // Outstanding balance
 * const outstandingBills = await Bill.aggregate([
 *   {
 *     $match: {
 *       billedTo: { $in: childrenIds },
 *       status: { $in: ["unpaid", "overdue", "partially-paid"] },
 *       label: "income"
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: null,
 *       total: { $sum: "$totalPrice" },
 *       paid: { $sum: "$paidAmount" },
 *       count: { $sum: 1 }
 *     }
 *   },
 *   {
 *     $project: {
 *       outstanding: { $subtract: ["$total", { $ifNull: ["$paid", 0] }] },
 *       pendingInvoices: "$count"
 *     }
 *   }
 * ]);
 * ```
 */
export async function getParentStats(parentId?: string): Promise<ParentStats> {
  return {
    totalChildren: 3,
    upcomingSessions: 12,
    averageScore: 86,
    outstandingBalance: 950,
    pendingInvoices: 2,
  };
}

/**
 * Get children overview for parent
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', 'firstName lastName additionalInfo');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * // Get detailed info for each child
 * const childrenOverview = await Promise.all(
 *   family.children.map(async (child) => {
 *     // Active enrollments
 *     const activeEnrollments = await CourseEnrollment.countDocuments({
 *       student: child._id,
 *       status: { $in: ["course-in-progress"] }
 *     });
 * 
 *     // Average score
 *     const avgScore = await CourseworkResult.aggregate([
 *       { $match: { examinee: child._id } },
 *       { $unwind: "$sections" },
 *       { $unwind: "$sections.submissions" },
 *       {
 *         $group: {
 *           _id: null,
 *           total: { $sum: 1 },
 *           correct: { $sum: { $cond: ["$sections.submissions.isCorrect", 1, 0] } }
 *         }
 *       },
 *       {
 *         $project: {
 *           score: { $round: [{ $multiply: [{ $divide: ["$correct", "$total"] }, 100] }, 0] }
 *         }
 *       }
 *     ]);
 * 
 *     // Upcoming sessions
 *     const upcomingSessions = await EnrolledSession.countDocuments({
 *       student: child._id,
 *       scheduledAt: { $gte: new Date() },
 *       status: "not-started"
 *     });
 * 
 *     // Attendance rate
 *     const attendanceStats = await EnrolledSession.aggregate([
 *       { $match: { student: child._id, status: { $in: ["completed", "cancelled", "skipped"] } } },
 *       {
 *         $group: {
 *           _id: null,
 *           total: { $sum: 1 },
 *           attended: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } }
 *         }
 *       },
 *       {
 *         $project: {
 *           rate: { $round: [{ $multiply: [{ $divide: ["$attended", "$total"] }, 100] }, 0] }
 *         }
 *       }
 *     ]);
 * 
 *     return {
 *       id: child._id.toString(),
 *       name: `${child.firstName} ${child.lastName}`,
 *       grade: child.additionalInfo?.student?.grade || 'N/A',
 *       activeEnrollments,
 *       averageScore: avgScore[0]?.score || 0,
 *       upcomingSessions,
 *       attendanceRate: attendanceStats[0]?.rate || 0
 *     };
 *   })
 * );
 * ```
 */
export async function getChildrenOverview(parentId?: string): Promise<ChildOverview[]> {
  return [
    {
      id: "c1",
      name: "Emma Garcia",
      grade: "10th Grade",
      activeEnrollments: 3,
      averageScore: 88,
      upcomingSessions: 4,
      attendanceRate: 95,
    },
    {
      id: "c2",
      name: "Lucas Garcia",
      grade: "8th Grade",
      activeEnrollments: 2,
      averageScore: 82,
      upcomingSessions: 5,
      attendanceRate: 90,
    },
    {
      id: "c3",
      name: "Sofia Garcia",
      grade: "6th Grade",
      activeEnrollments: 2,
      averageScore: 91,
      upcomingSessions: 3,
      attendanceRate: 98,
    },
  ];
}

/**
 * Get upcoming sessions for all children
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', '_id firstName lastName');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * const upcomingSessions = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       student: { $in: childrenIds },
 *       scheduledAt: { $gte: new Date() },
 *       status: { $in: ["not-started"] }
 *     }
 *   },
 *   { $sort: { scheduledAt: 1 } },
 *   { $limit: 10 },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "student",
 *       foreignField: "_id",
 *       as: "studentInfo"
 *     }
 *   },
 *   { $unwind: "$studentInfo" },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "teacher",
 *       foreignField: "_id",
 *       as: "teacherInfo"
 *     }
 *   },
 *   { $unwind: "$teacherInfo" },
 *   {
 *     $lookup: {
 *       from: "coursesessions",
 *       localField: "session",
 *       foreignField: "_id",
 *       as: "sessionInfo"
 *     }
 *   },
 *   { $unwind: "$sessionInfo" },
 *   {
 *     $lookup: {
 *       from: "lessonplans",
 *       localField: "sessionInfo.lesson",
 *       foreignField: "_id",
 *       as: "lesson"
 *     }
 *   },
 *   { $unwind: { path: "$lesson", preserveNullAndEmptyArrays: true } },
 *   {
 *     $project: {
 *       id: { $toString: "$_id" },
 *       title: { $ifNull: ["$lesson.title", "$sessionInfo.title"] },
 *       student: { $concat: ["$studentInfo.firstName", " ", "$studentInfo.lastName"] },
 *       teacher: { $concat: ["$teacherInfo.firstName", " ", "$teacherInfo.lastName"] },
 *       scheduledAt: { $dateToString: { format: "%Y-%m-%dT%H:%M:%SZ", date: "$scheduledAt" } },
 *       duration: { $divide: [{ $subtract: ["$scheduledEndAt", "$scheduledAt"] }, 60000] },
 *       status: 1,
 *       meetingLink: "$meetingDetails.meetingLink"
 *     }
 *   }
 * ]);
 * ```
 */
export async function getChildrenUpcomingSessions(parentId?: string): Promise<UpcomingSession[]> {
  return [
    {
      id: "s1",
      title: "SAT Math Review",
      student: "Emma Garcia",
      teacher: "Dr. Sarah Chen",
      scheduledAt: "2024-01-28T09:00:00Z",
      duration: 60,
      status: "not-started",
      meetingLink: "https://meet.example.com/session-1",
    },
    {
      id: "s2",
      title: "English Literature",
      student: "Lucas Garcia",
      teacher: "Ms. Emily Parker",
      scheduledAt: "2024-01-28T10:30:00Z",
      duration: 60,
      status: "not-started",
      meetingLink: "https://meet.example.com/session-2",
    },
    {
      id: "s3",
      title: "Basic Algebra",
      student: "Sofia Garcia",
      teacher: "Mr. David Kim",
      scheduledAt: "2024-01-28T14:00:00Z",
      duration: 45,
      status: "not-started",
      meetingLink: "https://meet.example.com/session-3",
    },
    {
      id: "s4",
      title: "Physics Fundamentals",
      student: "Emma Garcia",
      teacher: "Prof. James Wilson",
      scheduledAt: "2024-01-29T09:00:00Z",
      duration: 60,
      status: "not-started",
    },
    {
      id: "s5",
      title: "Reading Comprehension",
      student: "Lucas Garcia",
      teacher: "Ms. Emily Parker",
      scheduledAt: "2024-01-29T11:00:00Z",
      duration: 60,
      status: "not-started",
    },
  ];
}

/**
 * Get performance comparison data for all children
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', '_id firstName lastName');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * // Performance trend by child
 * const performanceComparison = await CourseworkResult.aggregate([
 *   { $match: { examinee: { $in: childrenIds } } },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "examinee",
 *       foreignField: "_id",
 *       as: "student"
 *     }
 *   },
 *   { $unwind: "$student" },
 *   { $unwind: "$sections" },
 *   { $unwind: "$sections.submissions" },
 *   {
 *     $group: {
 *       _id: {
 *         studentId: "$examinee",
 *         studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
 *         month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }
 *       },
 *       total: { $sum: 1 },
 *       correct: { $sum: { $cond: ["$sections.submissions.isCorrect", 1, 0] } }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: "$_id.month",
 *       children: {
 *         $push: {
 *           name: "$_id.studentName",
 *           score: { $round: [{ $multiply: [{ $divide: ["$correct", "$total"] }, 100] }, 0] }
 *         }
 *       }
 *     }
 *   },
 *   { $sort: { _id: 1 } }
 * ]);
 * ```
 */
export interface ChildPerformanceComparison {
  month: string;
  emma: number;
  lucas: number;
  sofia: number;
}

export async function getChildrenPerformanceComparison(parentId?: string): Promise<ChildPerformanceComparison[]> {
  return [
    { month: "Aug", emma: 78, lucas: 72, sofia: 85 },
    { month: "Sep", emma: 82, lucas: 75, sofia: 87 },
    { month: "Oct", emma: 80, lucas: 78, sofia: 88 },
    { month: "Nov", emma: 85, lucas: 80, sofia: 90 },
    { month: "Dec", emma: 87, lucas: 82, sofia: 91 },
    { month: "Jan", emma: 88, lucas: 82, sofia: 91 },
  ];
}

/**
 * Get attendance summary for all children
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', '_id firstName lastName');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * const attendanceSummary = await Promise.all(
 *   family.children.map(async (child) => {
 *     const stats = await EnrolledSession.aggregate([
 *       {
 *         $match: {
 *           student: child._id,
 *           status: { $in: ["completed", "cancelled", "skipped", "rescheduled"] }
 *         }
 *       },
 *       {
 *         $group: {
 *           _id: "$status",
 *           count: { $sum: 1 }
 *         }
 *       }
 *     ]);
 * 
 *     const attended = stats.find(s => s._id === "completed")?.count || 0;
 *     const cancelled = stats.find(s => s._id === "cancelled")?.count || 0;
 *     const skipped = stats.find(s => s._id === "skipped")?.count || 0;
 *     const missed = cancelled + skipped;
 *     const rescheduled = stats.find(s => s._id === "rescheduled")?.count || 0;
 *     const total = attended + missed + rescheduled;
 * 
 *     return {
 *       childName: `${child.firstName} ${child.lastName}`,
 *       attended,
 *       missed,
 *       rescheduled,
 *       totalSessions: total,
 *       attendanceRate: total > 0 ? Math.round((attended / total) * 100) : 0
 *     };
 *   })
 * );
 * ```
 */
export interface ChildAttendanceSummary {
  childName: string;
  attended: number;
  missed: number;
  rescheduled: number;
  totalSessions: number;
  attendanceRate: number;
}

export async function getChildrenAttendanceSummary(parentId?: string): Promise<ChildAttendanceSummary[]> {
  return [
    {
      childName: "Emma Garcia",
      attended: 38,
      missed: 1,
      rescheduled: 1,
      totalSessions: 40,
      attendanceRate: 95,
    },
    {
      childName: "Lucas Garcia",
      attended: 27,
      missed: 2,
      rescheduled: 1,
      totalSessions: 30,
      attendanceRate: 90,
    },
    {
      childName: "Sofia Garcia",
      attended: 24,
      missed: 0,
      rescheduled: 1,
      totalSessions: 25,
      attendanceRate: 98,
    },
  ];
}

/**
 * Get billing and payment data for parent
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', '_id firstName lastName');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * // Get all bills for children
 * const bills = await Bill.aggregate([
 *   {
 *     $match: {
 *       billedTo: { $in: childrenIds },
 *       label: "income"
 *     }
 *   },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "billedTo",
 *       foreignField: "_id",
 *       as: "student"
 *     }
 *   },
 *   { $unwind: "$student" },
 *   {
 *     $project: {
 *       id: { $toString: "$_id" },
 *       student: { $concat: ["$student.firstName", " ", "$student.lastName"] },
 *       amount: "$totalPrice",
 *       dueDate: { $dateToString: { format: "%Y-%m-%d", date: "$dueDate" } },
 *       status: 1,
 *       billType: "$type",
 *       daysOverdue: {
 *         $cond: {
 *           if: { $and: [{ $lt: ["$dueDate", new Date()] }, { $ne: ["$status", "paid"] }] },
 *           then: { $divide: [{ $subtract: [new Date(), "$dueDate"] }, 86400000] },
 *           else: 0
 *         }
 *       }
 *     }
 *   },
 *   { $sort: { dueDate: -1 } },
 *   { $limit: 10 }
 * ]);
 * ```
 */
export async function getBillingPayments(parentId?: string): Promise<BillSummary[]> {
  return [
    {
      id: "b1",
      student: "Emma Garcia",
      amount: 450,
      dueDate: "2024-02-01",
      status: "unpaid",
      daysOverdue: 0,
      billType: "lesson-fee",
    },
    {
      id: "b2",
      student: "Lucas Garcia",
      amount: 500,
      dueDate: "2024-01-28",
      status: "unpaid",
      daysOverdue: 0,
      billType: "lesson-fee",
    },
    {
      id: "b3",
      student: "Emma Garcia",
      amount: 380,
      dueDate: "2024-01-15",
      status: "paid",
      daysOverdue: 0,
      billType: "enrollment-fee",
    },
    {
      id: "b4",
      student: "Sofia Garcia",
      amount: 320,
      dueDate: "2024-01-10",
      status: "paid",
      daysOverdue: 0,
      billType: "lesson-fee",
    },
    {
      id: "b5",
      student: "Lucas Garcia",
      amount: 200,
      dueDate: "2024-01-05",
      status: "paid",
      daysOverdue: 0,
      billType: "exam-fee",
    },
  ];
}

/**
 * Get children's recent coursework results
 * 
 * Mongoose Query:
 * ```javascript
 * const parentId = req.user._id;
 * 
 * // Get children from Family collection
 * const family = await Family.findOne({ guardians: parentId })
 *   .populate('children', '_id firstName lastName');
 * 
 * const childrenIds = family?.children?.map(c => c._id) || [];
 * 
 * const recentResults = await CourseworkResult.aggregate([
 *   { $match: { examinee: { $in: childrenIds } } },
 *   { $sort: { createdAt: -1 } },
 *   { $limit: 10 },
 *   {
 *     $lookup: {
 *       from: "users",
 *       localField: "examinee",
 *       foreignField: "_id",
 *       as: "student"
 *     }
 *   },
 *   { $unwind: "$student" },
 *   {
 *     $lookup: {
 *       from: "courseworks",
 *       localField: "coursework",
 *       foreignField: "_id",
 *       as: "courseworkInfo"
 *     }
 *   },
 *   { $unwind: "$courseworkInfo" },
 *   { $unwind: "$sections" },
 *   { $unwind: "$sections.submissions" },
 *   {
 *     $group: {
 *       _id: "$_id",
 *       student: { $first: { $concat: ["$student.firstName", " ", "$student.lastName"] } },
 *       coursework: { $first: "$courseworkInfo.title" },
 *       type: { $first: "$courseworkInfo.type" },
 *       completedAt: { $first: "$createdAt" },
 *       total: { $sum: 1 },
 *       correct: { $sum: { $cond: ["$sections.submissions.isCorrect", 1, 0] } }
 *     }
 *   },
 *   {
 *     $project: {
 *       student: 1,
 *       coursework: 1,
 *       type: 1,
 *       completedAt: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
 *       score: { $round: [{ $multiply: [{ $divide: ["$correct", "$total"] }, 100] }, 0] }
 *     }
 *   }
 * ]);
 * ```
 */
export interface ChildRecentResult {
  id: string;
  childName: string;
  coursework: string;
  type: 'assignment' | 'exam';
  score: number;
  maxScore: number;
  completedAt: string;
}

export async function getChildrenRecentResults(parentId?: string): Promise<ChildRecentResult[]> {
  return [
    {
      id: "cr1",
      childName: "Emma Garcia",
      coursework: "SAT Math Practice Test",
      type: "exam",
      score: 88,
      maxScore: 100,
      completedAt: "2024-01-26",
    },
    {
      id: "cr2",
      childName: "Lucas Garcia",
      coursework: "Reading Comprehension",
      type: "assignment",
      score: 82,
      maxScore: 100,
      completedAt: "2024-01-25",
    },
    {
      id: "cr3",
      childName: "Sofia Garcia",
      coursework: "Basic Math Quiz",
      type: "exam",
      score: 95,
      maxScore: 100,
      completedAt: "2024-01-24",
    },
    {
      id: "cr4",
      childName: "Emma Garcia",
      coursework: "Physics Problem Set",
      type: "assignment",
      score: 85,
      maxScore: 100,
      completedAt: "2024-01-23",
    },
    {
      id: "cr5",
      childName: "Lucas Garcia",
      coursework: "English Grammar",
      type: "assignment",
      score: 78,
      maxScore: 100,
      completedAt: "2024-01-22",
    },
  ];
}
