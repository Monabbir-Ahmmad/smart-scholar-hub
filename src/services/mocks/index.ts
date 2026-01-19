/**
 * Mock Dashboard Services
 * 
 * This module exports all mock services for dashboard data.
 * Each service contains Mongoose query comments for backend implementation.
 * 
 * The mock data is designed based on the MongoDB schemas defined in SCHEMA_SUMMARY.md:
 * - User Management (users, families, contacts)
 * - Course Management (coursemodules, coursesessions, courseenrollments, enrolledsessions, lessonplans)
 * - Assessment & Questions (questions, questionsets, courseworks, courseworkresults)
 * - Billing & Payments (bills, invoices)
 * - System & Files (storedfiles, systemsettings)
 */

// Admin Dashboard Services
export {
  getUserGrowthData,
  getUserStats,
  getRevenueData,
  getRevenueStats,
  getEnrollmentStatusData,
  getEnrollmentStats,
  getSessionCompletionData,
  getSessionStats,
  getQuestionBankStats,
  getLessonContentStats,
  getPerformanceDistribution,
  getTopTeachers,
  getUnpaidBills,
  getRecentActivity,
} from './adminDashboardService';

// Teacher Dashboard Services
export {
  getTeacherStats,
  getWeeklySessionLoad,
  getUpcomingSessions,
  getSessionHistory,
  getStudentManagementData,
  getStudentPerformanceHeatmap,
  getTeacherCourses,
} from './teacherDashboardService';

// Student Dashboard Services
export {
  getStudentStats,
  getCourseProgress,
  getPerformanceTrend,
  getSubjectMastery,
  getAttendanceStats,
  getUpcomingAssignments,
  getNextSession,
  getRecentResults,
  getPerformanceStats,
} from './studentDashboardService';

// Parent Dashboard Services
export {
  getParentStats,
  getChildrenOverview,
  getChildrenUpcomingSessions,
  getChildrenPerformanceComparison,
  getChildrenAttendanceSummary,
  getBillingPayments,
  getChildrenRecentResults,
} from './parentDashboardService';

// Re-export types
export type { StudentManagementData } from './teacherDashboardService';
export type { StudentStats } from './studentDashboardService';
export type {
  ChildPerformanceComparison,
  ChildAttendanceSummary,
  ChildRecentResult,
} from './parentDashboardService';
