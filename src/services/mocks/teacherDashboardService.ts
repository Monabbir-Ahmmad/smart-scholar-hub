/**
 * Teacher Dashboard Mock Services
 * 
 * These services provide mock data for the teacher dashboard.
 * Each function includes the corresponding Mongoose query as a comment
 * for backend implementation reference.
 */

import type {
  TeacherStats,
  WeeklySessionData,
  UpcomingSession,
  StudentPerformanceHeatmapData,
  CourseProgress,
} from '../types';

/**
 * Get teacher statistics (current teacher's stats)
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id; // Current logged in teacher
 * 
 * // Active students count
 * const activeStudents = await CourseEnrollment.countDocuments({
 *   teacher: teacherId,
 *   status: { $in: ["course-in-progress"] }
 * });
 * 
 * // Sessions this month
 * const sessionsThisMonth = await EnrolledSession.countDocuments({
 *   teacher: teacherId,
 *   scheduledAt: { $gte: new Date(new Date().setDate(1)) }
 * });
 * 
 * // Average student score
 * const avgScore = await CourseworkResult.aggregate([
 *   {
 *     $lookup: {
 *       from: "enrolledsessions",
 *       localField: "_id",
 *       foreignField: "courseworkResult",
 *       as: "session"
 *     }
 *   },
 *   { $unwind: "$session" },
 *   { $match: { "session.teacher": teacherId } },
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
 * // Teaching hours this month
 * const teachingHours = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       teacher: teacherId,
 *       status: "completed",
 *       scheduledAt: { $gte: new Date(new Date().setDate(1)) }
 *     }
 *   },
 *   {
 *     $project: {
 *       duration: { $subtract: ["$endedAt", "$startedAt"] }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: null,
 *       totalMs: { $sum: "$duration" }
 *     }
 *   },
 *   {
 *     $project: {
 *       hours: { $divide: ["$totalMs", 3600000] }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getTeacherStats(teacherId?: string): Promise<TeacherStats> {
  return {
    activeStudents: 24,
    sessionsThisMonth: 48,
    averageStudentScore: 82.5,
    teachingHours: 36,
  };
}

/**
 * Get weekly session load for teacher
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id;
 * const startOfWeek = new Date();
 * startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
 * startOfWeek.setHours(0, 0, 0, 0);
 * 
 * const endOfWeek = new Date(startOfWeek);
 * endOfWeek.setDate(endOfWeek.getDate() + 7);
 * 
 * const weeklyLoad = await EnrolledSession.aggregate([
 *   {
 *     $match: {
 *       teacher: teacherId,
 *       scheduledAt: { $gte: startOfWeek, $lt: endOfWeek }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: { $dayOfWeek: "$scheduledAt" },
 *       sessions: { $sum: 1 },
 *       totalDuration: {
 *         $sum: { $subtract: ["$scheduledEndAt", "$scheduledAt"] }
 *       }
 *     }
 *   },
 *   {
 *     $project: {
 *       dayOfWeek: "$_id",
 *       sessions: 1,
 *       hours: { $divide: ["$totalDuration", 3600000] }
 *     }
 *   },
 *   { $sort: { dayOfWeek: 1 } }
 * ]);
 * ```
 */
export async function getWeeklySessionLoad(teacherId?: string): Promise<WeeklySessionData[]> {
  return [
    { day: "Mon", sessions: 4, hours: 4 },
    { day: "Tue", sessions: 6, hours: 5.5 },
    { day: "Wed", sessions: 3, hours: 2.5 },
    { day: "Thu", sessions: 5, hours: 4.5 },
    { day: "Fri", sessions: 7, hours: 6 },
    { day: "Sat", sessions: 2, hours: 1.5 },
    { day: "Sun", sessions: 0, hours: 0 },
  ];
}

/**
 * Get upcoming sessions for teacher
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id;
 * 
 * const upcomingSessions = await EnrolledSession.find({
 *   teacher: teacherId,
 *   scheduledAt: { $gte: new Date() },
 *   status: { $in: ["not-started", "ongoing"] }
 * })
 *   .sort({ scheduledAt: 1 })
 *   .limit(10)
 *   .populate('student', 'firstName lastName')
 *   .populate({
 *     path: 'session',
 *     populate: { path: 'lesson', select: 'title' }
 *   })
 *   .select('scheduledAt scheduledEndAt meetingDetails status');
 * ```
 */
export async function getUpcomingSessions(teacherId?: string): Promise<UpcomingSession[]> {
  return [
    {
      id: "1",
      title: "Advanced Algebra - Quadratic Equations",
      teacher: "Dr. Chen",
      student: "Alex Johnson",
      scheduledAt: "2024-01-28T09:00:00Z",
      duration: 60,
      status: "not-started",
      meetingLink: "https://meet.example.com/session-1",
    },
    {
      id: "2",
      title: "SAT Math Practice Session",
      teacher: "Dr. Chen",
      student: "Maria Garcia",
      scheduledAt: "2024-01-28T10:30:00Z",
      duration: 90,
      status: "not-started",
      meetingLink: "https://meet.example.com/session-2",
    },
    {
      id: "3",
      title: "Geometry Fundamentals",
      teacher: "Dr. Chen",
      student: "James Wilson",
      scheduledAt: "2024-01-28T14:00:00Z",
      duration: 60,
      status: "not-started",
      meetingLink: "https://meet.example.com/session-3",
    },
    {
      id: "4",
      title: "Calculus Introduction",
      teacher: "Dr. Chen",
      student: "Sophie Chen",
      scheduledAt: "2024-01-29T09:00:00Z",
      duration: 60,
      status: "not-started",
    },
    {
      id: "5",
      title: "Trigonometry Review",
      teacher: "Dr. Chen",
      student: "David Kim",
      scheduledAt: "2024-01-29T11:00:00Z",
      duration: 60,
      status: "not-started",
    },
  ];
}

/**
 * Get session history for teacher
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id;
 * 
 * const sessionHistory = await EnrolledSession.find({
 *   teacher: teacherId,
 *   status: { $in: ["completed", "cancelled", "skipped", "rescheduled"] }
 * })
 *   .sort({ scheduledAt: -1 })
 *   .limit(20)
 *   .populate('student', 'firstName lastName')
 *   .populate({
 *     path: 'session',
 *     populate: { path: 'lesson', select: 'title subject' }
 *   })
 *   .populate('courseworkResult', 'sections')
 *   .select('scheduledAt scheduledEndAt startedAt endedAt status');
 * ```
 */
export async function getSessionHistory(teacherId?: string): Promise<UpcomingSession[]> {
  return [
    {
      id: "h1",
      title: "Linear Equations",
      teacher: "Dr. Chen",
      student: "Alex Johnson",
      scheduledAt: "2024-01-26T09:00:00Z",
      duration: 60,
      status: "completed",
    },
    {
      id: "h2",
      title: "SAT Reading Comprehension",
      teacher: "Dr. Chen",
      student: "Maria Garcia",
      scheduledAt: "2024-01-25T14:00:00Z",
      duration: 90,
      status: "completed",
    },
    {
      id: "h3",
      title: "Polynomial Functions",
      teacher: "Dr. Chen",
      student: "James Wilson",
      scheduledAt: "2024-01-24T10:00:00Z",
      duration: 60,
      status: "completed",
    },
    {
      id: "h4",
      title: "Statistics Basics",
      teacher: "Dr. Chen",
      student: "Sophie Chen",
      scheduledAt: "2024-01-23T11:00:00Z",
      duration: 60,
      status: "cancelled",
    },
    {
      id: "h5",
      title: "Probability",
      teacher: "Dr. Chen",
      student: "David Kim",
      scheduledAt: "2024-01-22T15:00:00Z",
      duration: 60,
      status: "rescheduled",
    },
  ];
}

/**
 * Get student management data for teacher
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id;
 * 
 * const students = await CourseEnrollment.aggregate([
 *   {
 *     $match: {
 *       teacher: teacherId,
 *       status: { $in: ["course-in-progress"] }
 *     }
 *   },
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
 *       from: "coursemodules",
 *       localField: "courseModule",
 *       foreignField: "_id",
 *       as: "courseInfo"
 *     }
 *   },
 *   { $unwind: "$courseInfo" },
 *   {
 *     $lookup: {
 *       from: "enrolledsessions",
 *       localField: "_id",
 *       foreignField: "courseEnrollment",
 *       as: "sessions"
 *     }
 *   },
 *   {
 *     $project: {
 *       studentName: { $concat: ["$studentInfo.firstName", " ", "$studentInfo.lastName"] },
 *       courseName: "$courseInfo.title",
 *       totalSessions: { $size: "$sessions" },
 *       completedSessions: {
 *         $size: {
 *           $filter: {
 *             input: "$sessions",
 *             as: "s",
 *             cond: { $eq: ["$$s.status", "completed"] }
 *           }
 *         }
 *       },
 *       progress: {
 *         $multiply: [
 *           {
 *             $divide: [
 *               { $size: { $filter: { input: "$sessions", as: "s", cond: { $eq: ["$$s.status", "completed"] } } } },
 *               { $max: [{ $size: "$sessions" }, 1] }
 *             ]
 *           },
 *           100
 *         ]
 *       }
 *     }
 *   }
 * ]);
 * ```
 */
export interface StudentManagementData {
  id: string;
  name: string;
  course: string;
  progress: number;
  sessionsCompleted: number;
  totalSessions: number;
  lastSession: string;
  averageScore: number;
  status: 'active' | 'at-risk' | 'excellent';
}

export async function getStudentManagementData(teacherId?: string): Promise<StudentManagementData[]> {
  return [
    {
      id: "s1",
      name: "Alex Johnson",
      course: "SAT Math Prep",
      progress: 75,
      sessionsCompleted: 15,
      totalSessions: 20,
      lastSession: "2024-01-26",
      averageScore: 85,
      status: "excellent",
    },
    {
      id: "s2",
      name: "Maria Garcia",
      course: "Advanced Algebra",
      progress: 60,
      sessionsCompleted: 12,
      totalSessions: 20,
      lastSession: "2024-01-25",
      averageScore: 78,
      status: "active",
    },
    {
      id: "s3",
      name: "James Wilson",
      course: "SAT Reading & Writing",
      progress: 45,
      sessionsCompleted: 9,
      totalSessions: 20,
      lastSession: "2024-01-24",
      averageScore: 62,
      status: "at-risk",
    },
    {
      id: "s4",
      name: "Sophie Chen",
      course: "Calculus",
      progress: 80,
      sessionsCompleted: 16,
      totalSessions: 20,
      lastSession: "2024-01-26",
      averageScore: 92,
      status: "excellent",
    },
    {
      id: "s5",
      name: "David Kim",
      course: "Physics",
      progress: 55,
      sessionsCompleted: 11,
      totalSessions: 20,
      lastSession: "2024-01-23",
      averageScore: 71,
      status: "active",
    },
  ];
}

/**
 * Get student performance heatmap data
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id;
 * 
 * const performanceHeatmap = await CourseworkResult.aggregate([
 *   {
 *     $lookup: {
 *       from: "enrolledsessions",
 *       localField: "_id",
 *       foreignField: "courseworkResult",
 *       as: "session"
 *     }
 *   },
 *   { $unwind: "$session" },
 *   { $match: { "session.teacher": teacherId } },
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
 *   {
 *     $lookup: {
 *       from: "questionsets",
 *       localField: "sections.questionSet",
 *       foreignField: "_id",
 *       as: "questionSet"
 *     }
 *   },
 *   { $unwind: "$questionSet" },
 *   { $unwind: "$sections.submissions" },
 *   {
 *     $group: {
 *       _id: {
 *         studentId: "$student._id",
 *         studentName: { $concat: ["$student.firstName", " ", "$student.lastName"] },
 *         subject: "$questionSet.subject"
 *       },
 *       total: { $sum: 1 },
 *       correct: { $sum: { $cond: ["$sections.submissions.isCorrect", 1, 0] } }
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: { studentId: "$_id.studentId", studentName: "$_id.studentName" },
 *       subjects: {
 *         $push: {
 *           subject: "$_id.subject",
 *           score: { $multiply: [{ $divide: ["$correct", "$total"] }, 100] }
 *         }
 *       }
 *     }
 *   },
 *   {
 *     $project: {
 *       studentId: "$_id.studentId",
 *       studentName: "$_id.studentName",
 *       subjects: {
 *         $arrayToObject: {
 *           $map: {
 *             input: "$subjects",
 *             as: "s",
 *             in: { k: "$$s.subject", v: "$$s.score" }
 *           }
 *         }
 *       }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getStudentPerformanceHeatmap(teacherId?: string): Promise<StudentPerformanceHeatmapData[]> {
  return [
    {
      studentName: "Alex Johnson",
      studentId: "s1",
      subjects: { math: 85, english: 78, science: 82, history: 75 },
    },
    {
      studentName: "Maria Garcia",
      studentId: "s2",
      subjects: { math: 72, english: 88, science: 70, history: 85 },
    },
    {
      studentName: "James Wilson",
      studentId: "s3",
      subjects: { math: 65, english: 60, science: 68, history: 72 },
    },
    {
      studentName: "Sophie Chen",
      studentId: "s4",
      subjects: { math: 95, english: 82, science: 90, history: 78 },
    },
    {
      studentName: "David Kim",
      studentId: "s5",
      subjects: { math: 78, english: 70, science: 75, history: 68 },
    },
  ];
}

/**
 * Get courses taught by teacher
 * 
 * Mongoose Query:
 * ```javascript
 * const teacherId = req.user._id;
 * 
 * const teacherCourses = await CourseEnrollment.aggregate([
 *   {
 *     $match: {
 *       teacher: teacherId
 *     }
 *   },
 *   {
 *     $lookup: {
 *       from: "coursemodules",
 *       localField: "courseModule",
 *       foreignField: "_id",
 *       as: "course"
 *     }
 *   },
 *   { $unwind: "$course" },
 *   {
 *     $lookup: {
 *       from: "enrolledsessions",
 *       localField: "_id",
 *       foreignField: "courseEnrollment",
 *       as: "sessions"
 *     }
 *   },
 *   {
 *     $group: {
 *       _id: "$courseModule",
 *       title: { $first: "$course.title" },
 *       category: { $first: "$course.category" },
 *       studentCount: { $sum: 1 },
 *       totalSessions: { $first: { $size: "$course.sessions" } }
 *     }
 *   }
 * ]);
 * ```
 */
export async function getTeacherCourses(teacherId?: string): Promise<CourseProgress[]> {
  return [
    {
      id: "c1",
      title: "SAT Math Prep",
      teacher: "Dr. Chen",
      progress: 65,
      completedSessions: 130,
      totalSessions: 200,
      status: "in_progress",
      category: "sat_math",
    },
    {
      id: "c2",
      title: "Advanced Algebra",
      teacher: "Dr. Chen",
      progress: 72,
      completedSessions: 72,
      totalSessions: 100,
      status: "in_progress",
      category: "sat_math",
    },
    {
      id: "c3",
      title: "SAT Reading & Writing",
      teacher: "Dr. Chen",
      progress: 45,
      completedSessions: 45,
      totalSessions: 100,
      status: "in_progress",
      category: "sat_reading_writing",
    },
  ];
}
