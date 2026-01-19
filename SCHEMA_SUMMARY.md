# IvyOasis Database Schema Summary

This document provides a comprehensive summary of the MongoDB schemas used in the IvyOasis education platform. Use this reference for creating analytical queries.

## Database: MongoDB (via Mongoose)

---

## Table of Contents

1. [User Management](#1-user-management)
2. [Course Management](#2-course-management)
3. [Assessment & Questions](#3-assessment--questions)
4. [Billing & Payments](#4-billing--payments)
5. [System & Files](#5-system--files)
6. [Entity Relationship Overview](#6-entity-relationship-overview)

---

## 1. User Management

### 1.1 User

**Collection**: `users`

Main user entity for all user types (Admin, Teacher, Student, Parent).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `firstName` | String | No | User's first name |
| `lastName` | String | No | User's last name |
| `email` | String | Yes (unique) | User's email address |
| `password` | String | No | Hashed password (bcrypt) |
| `role` | Enum(Role) | No | Default: 'user'. Values: user, admin, teacher, student, parent |
| `oAuthId` | String | No | OAuth provider ID |
| `profileImage` | String | No | Profile image URL |
| `phone` | String | No | Phone number |
| `gender` | Enum(Gender) | No | Values: male, female, other, unknown |
| `status` | [Enum(UserStatus)] | No | Array of statuses |
| `additionalInfo` | Object | No | Role-specific info (teacher/student/parent) |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Nested: additionalInfo.teacher (TeacherInfo)**

| Field | Type | Description |
|-------|------|-------------|
| `hourlyRate` | Number | Teacher's hourly rate |
| `university` | String | University attended |
| `universityGraduationYear` | Number | Graduation year |
| `experience` | String | Experience description |
| `transcript` | String | Transcript reference |
| `resume` | String | Resume reference |
| `topics` | [{topic: String, experience: String}] | Teaching topics with experience |
| `weeklyAvailability` | [WeeklySchedule] | Weekly availability slots (see WeeklySchedule below) |

**Nested: additionalInfo.student (StudentInfo)**

| Field | Type | Description |
|-------|------|-------------|
| `birthDate` | Date | Date of birth |
| `school` | String | Current school |
| `grade` | String | Current grade |
| `gpa` | Number | GPA |
| `examPrepTypes` | [Enum(ExamType)] | Exam types: SAT, ACT, AP, Math |
| `pastReports` | String | Past reports reference |
| `currentTestScore` | Number | Current test score |
| `targetScore` | Number | Target score |
| `targetTestDate` | Date | Target test date |
| `currentMathLevel` | Number | Current math level |
| `stragglingTopics` | [String] | Topics needing help |
| `currentCourses` | [String] | Currently enrolled courses |
| `diagnosticTestDate` | Date | Diagnostic test date |
| `weeklyAvailability` | [WeeklySchedule] | Weekly availability slots (see WeeklySchedule below) |

**Nested: additionalInfo.parent (ParentInfo)**

| Field | Type | Description |
|-------|------|-------------|
| `occupation` | String | Parent's occupation |
| `mailingAddress` | String | Mailing address |

**Enums:**

- **Role**: `user`, `admin`, `teacher`, `student`, `parent`
- **Gender**: `male`, `female`, `other`, `unknown`
- **UserStatus**: `onboarding`, `password-missing`, `active`, `inactive`, `waiting`, `admin-approval-pending`, `archived`
- **ExamType**: `SAT`, `ACT`, `AP`, `Math`
- **WeekDay**: `su`, `mo`, `tu`, `we`, `th`, `fr`, `sa`

**Nested: WeeklySchedule**

| Field | Type | Description |
|-------|------|-------------|
| `day` | Enum(WeekDay) | Day of the week (su, mo, tu, we, th, fr, sa) |
| `timeSlots` | [{start: String, end: String}] | Available time slots (HH:MM format) |

---

### 1.2 Family

**Collection**: `families`

Links guardians (parents) to children (students).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `guardians` | [ObjectId → User] | No | Parent user references |
| `children` | [ObjectId → User] | No | Student user references |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

---

### 1.3 Contact

**Collection**: `contacts`

Contact form submissions and newsletter signups.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `firstName` | String | No | First name |
| `lastName` | String | No | Last name |
| `email` | String | Yes | Email address |
| `message` | String | No | Contact message |
| `referralCode` | String | No | Referral code used |
| `source` | Enum(ContactSourceType) | Yes | Source type |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **ContactSourceType**: `contact-form`, `newsletter`, `pricing-request`

---

## 2. Course Management

### 2.1 CourseModule

**Collection**: `coursemodules`

Course templates defining curriculum structure.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `title` | String | Yes | Course title |
| `basePrice` | Number | Yes | Base price |
| `category` | Enum(CourseModuleCategory) | Yes | Course category |
| `tags` | [String] | No | Tags for categorization |
| `updatedBy` | ObjectId → User | Yes | Last editor |
| `visibleTo` | [Enum(Role)] | No | Default: [admin]. Visibility roles |
| `originalVersionId` | ObjectId → CourseModule | No | Original version reference |
| `previousVersionId` | ObjectId → CourseModule | No | Previous version |
| `nextVersionId` | ObjectId → CourseModule | No | Next version |
| `latestVersionId` | ObjectId → CourseModule | No | Latest version |
| `versions` | [ObjectId → CourseModule] | No | Version history |
| `sessions` | [ObjectId → CourseSession] | No | Course sessions |
| `hidden` | Boolean | No | Default: false |
| `isCustom` | Boolean | No | Custom course flag |
| `reminderOffset` | {lesson: Number, coursework: Number} | No | Reminder timing (minutes) |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Virtual field**: `enrollments` - references CourseEnrollment documents

**Enums:**

- **CourseModuleCategory**: `sat_math`, `sat_reading_writing`

---

### 2.2 CourseSession

**Collection**: `coursesessions`

Individual sessions within a course module (lessons or coursework).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `lesson` | ObjectId → LessonPlan | No | Lesson reference |
| `coursework` | ObjectId → Coursework | No | Coursework reference |
| `title` | String | No | Session title |
| `description` | String | No | Session description |
| `daysOffset` | Number | No | Default: 0. Days from course start |
| `duration` | Number | No | Duration in minutes |
| `type` | Enum(CourseSessionType) | Yes | Session type |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **CourseSessionType**: `lesson`, `assignment`, `exam`, `extra-session`

---

### 2.3 CourseEnrollment

**Collection**: `courseenrollments`

Student enrollment in a course.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `status` | [Enum(CourseEnrollmentStatus)] | No | Array of statuses |
| `student` | ObjectId → User | Yes | Enrolled student |
| `teacher` | ObjectId → User | No | Assigned teacher |
| `courseModule` | ObjectId → CourseModule | Yes | Course enrolled in |
| `courseModuleVersions` | [ObjectId → CourseModule] | No | Version history |
| `startDate` | Date | Yes | Course start date |
| `studentSchedules` | [{startAt: Date, endAt: Date}] | No | Scheduled times |
| `reminderOffsets` | [{user: ObjectId, reminderOffset: Object}] | No | Per-user reminders |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Virtual field**: `progress` - references EnrolledSession documents

**Enums:**

- **CourseEnrollmentStatus**:
  - `parent-approval-pending` - Waiting for parent to approve
  - `new-version-parent-approval-pending` - Waiting for parent to approve new version
  - `teacher-assignment-pending` - Waiting for admin to assign a teacher
  - `new-version-teacher-approval-pending` - Waiting for teacher to approve new version
  - `schedule-submission-pending` - Waiting for teacher to provide schedules
  - `teacher-declined-assignment` - Teacher declined, waiting for admin to assign new teacher
  - `course-in-progress` - Course is in progress
  - `initial-deposit-pending` - Waiting for initial deposit for custom course

---

### 2.4 EnrolledSession

**Collection**: `enrolledsessions`

Actual scheduled session instances for enrolled students.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `scheduledAt` | Date | Yes | Scheduled start time |
| `scheduledEndAt` | Date | Yes | Scheduled end time |
| `startedAt` | Date | No | Actual start time |
| `endedAt` | Date | No | Actual end time |
| `status` | Enum(CourseProgressStatus) | No | Default: 'not-started' |
| `meetingDetails` | {meetingLink: String} | No | Meeting info |
| `lessonAnnotation` | ObjectId → StoredFile | No | Annotated lesson file |
| `submissions` | [ObjectId → StoredFile] | No | Student submissions |
| `student` | ObjectId → User | Yes | Student reference |
| `teacher` | ObjectId → User | Yes | Teacher reference |
| `session` | ObjectId → CourseSession | Yes | Session template |
| `courseworkResult` | ObjectId → CourseworkResult | No | Results if applicable |
| `courseEnrollment` | ObjectId → CourseEnrollment | Yes | Parent enrollment |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **CourseProgressStatus**: `not-started`, `ongoing`, `completed`, `cancelled`, `rescheduled`, `auto-skipped`, `skipped`

---

### 2.5 LessonPlan

**Collection**: `lessonplans`

Reusable lesson content templates.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `title` | String | Yes | Lesson title |
| `subject` | Enum(QuestionSubject) | Yes | Subject area |
| `duration` | Number | Yes | Duration in minutes |
| `tags` | [String] | No | Tags |
| `updatedBy` | ObjectId → User | Yes | Last editor |
| `content` | [Object] | No | Lesson content blocks |
| `file` | ObjectId → StoredFile | No | Attached file |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

---

## 3. Assessment & Questions

### 3.1 Question

**Collection**: `questions`

Individual questions for assessments.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `questionText` | String | Yes | Question text |
| `questionImage` | String | No | Question image URL |
| `passage` | String | No | Reading passage |
| `subject` | Enum(QuestionSubject) | Yes | Subject area |
| `difficulty` | Enum(QuestionDifficulty) | Yes | Difficulty level |
| `tags` | [String] | No | Tags |
| `optionType` | Enum(QuestionOptionType) | Yes | Answer type |
| `options` | [{text: String, image: String}] | Yes | Answer options |
| `answers` | [Number] | Yes | Correct answer indices |
| `updatedBy` | ObjectId → User | Yes | Last editor |
| `hidden` | Boolean | No | Default: false |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **QuestionSubject**: `math`, `science`, `english`, `social`, `history`, `geography`, `analytical`, `logical`, `reasoning`, `general`
- **QuestionDifficulty**: `easy`, `base`, `hard`
- **QuestionOptionType**: `mcq-text`, `mcq-image`, `grid-in`

---

### 3.2 QuestionSet

**Collection**: `questionsets`

Grouped questions for assessments.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `title` | String | Yes | Set title |
| `subject` | Enum(QuestionSubject) | Yes | Subject area |
| `difficulty` | Enum(QuestionDifficulty) | Yes | Difficulty level |
| `category` | Enum(QuestionSetCategory) | Yes | Category |
| `tags` | [String] | No | Tags |
| `hidden` | Boolean | No | Default: false |
| `updatedBy` | ObjectId → User | Yes | Last editor |
| `questions` | [ObjectId → Question] | Yes | Questions in set |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **QuestionSetCategory**: `sat_math`, `sat_reading_writing`, `general`

---

### 3.3 Coursework

**Collection**: `courseworks`

Assignments and exams.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `title` | String | Yes | Coursework title |
| `type` | Enum(CourseworkType) | Yes | Type (assignment/exam) |
| `category` | Enum(CourseworkCategory) | Yes | Category |
| `tags` | [String] | No | Tags |
| `updatedBy` | ObjectId → User | Yes | Last editor |
| `sections` | [CourseworkSection] | Yes | Sections with question sets |
| `assignedTo` | [ObjectId → User] | No | Assigned students |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Nested: CourseworkSection**

| Field | Type | Description |
|-------|------|-------------|
| `timeLimit` | Number | Time limit in minutes |
| `breakTime` | Number | Break time (default: 0) |
| `questionSet` | ObjectId → QuestionSet | Questions for section |

**Enums:**

- **CourseworkType**: `assignment`, `exam`
- **CourseworkCategory**: `reinforcement`, `homework`, `SAT`, `ACT`, `AP`

---

### 3.4 CourseworkResult

**Collection**: `courseworkresults`

Student results for coursework.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `coursework` | ObjectId → Coursework | Yes | Coursework reference |
| `examinee` | ObjectId → User | Yes | Student who completed |
| `sections` | [CourseworkSectionResult] | No | Results per section |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Nested: CourseworkSectionResult**

| Field | Type | Description |
|-------|------|-------------|
| `questionSet` | ObjectId → QuestionSet | Question set |
| `timeLimit` | Number | Time allowed |
| `timeTaken` | Number | Time actually taken |
| `submissions` | [AnswerSubmission] | Individual answers |

**Nested: AnswerSubmission**

| Field | Type | Description |
|-------|------|-------------|
| `question` | ObjectId → Question | Question reference |
| `selectedAnswers` | [Number] | Selected answer indices |
| `submittedTextAnswer` | String | Text answer (for grid-in) |
| `isCorrect` | Boolean | Correctness flag |

---

## 4. Billing & Payments

### 4.1 Bill

**Collection**: `bills`

Individual billing items.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `type` | Enum(BillType) | No | Default: 'other-fee' |
| `status` | Enum(BillStatus) | No | Default: 'unpaid' |
| `label` | Enum(BillLabel) | No | Default: 'income' |
| `unitPrice` | Number | Yes | Unit price |
| `sessionDuration` | Number | No | Duration in milliseconds |
| `totalPrice` | Number | Yes | Total amount |
| `paidAmount` | Number | No | Amount paid |
| `dueDate` | Date | No | Payment due date |
| `remark` | String | No | Notes |
| `billedTo` | ObjectId → User | No | Bill recipient |
| `enrolledSession` | ObjectId → EnrolledSession | No | Related session |
| `courseEnrollment` | ObjectId → CourseEnrollment | No | Related enrollment |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **BillType**: `lesson-fee`, `enrollment-fee`, `other-fee`, `exam-fee`, `assignment-fee`, `reschedule-fee`, `teacher-salary`, `version-change-fee`
- **BillStatus**: `unpaid`, `paid`, `payment-in-progress`, `cancelled`, `refunded`, `overdue`, `manually-resolved`, `partially-paid`
- **BillLabel**: `income`, `expense`

---

### 4.2 Invoice

**Collection**: `invoices`

Payment transactions grouping multiple bills.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `status` | Enum(InvoiceStatus) | No | Default: 'in-progress' |
| `totalPrice` | Number | Yes | Total invoice amount |
| `paymentMethod` | Enum(PaymentMethod) | Yes | Payment method used |
| `paymentDetails` | Object | No | Payment provider details |
| `paidBy` | ObjectId → User | No | Payer reference |
| `bills` | [ObjectId → Bill] | No | Bills in invoice |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **InvoiceStatus**: `in-progress`, `payment-confirmed`, `payment-failed`
- **PaymentMethod**: `stripe`, `bank-transfer`, `cash`, `cheque`

---

## 5. System & Files

### 5.1 StoredFile

**Collection**: `storedfiles`

File metadata for uploads (S3).

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `key` | String | No | S3 object key |
| `name` | String | No | Original filename |
| `url` | String | No | File URL |
| `mimeType` | String | No | MIME type |
| `size` | Number | No | File size in bytes |
| `isPublic` | Boolean | No | Public access flag |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

---

### 5.2 SystemSettings

**Collection**: `systemsettings`

Application configuration settings.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | Auto | Primary key |
| `name` | Enum(SystemSettingsName) | Yes | Setting name |
| `description` | String | No | Setting description |
| `type` | Enum(SystemSettingsType) | Yes | Value type |
| `value` | Mixed | Yes | Setting value |
| `modifiedBy` | ObjectId → User | No | Last modifier |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

**Enums:**

- **SystemSettingsName**: `CUSTOM_COURSE_BASE_PRICE`, `SAT_SCORE_THRESHOLD`, `SESSION_RESCHEDULE_HOURS_THRESHOLD`, `BILL_DUE_DAYS`
- **SystemSettingsType**: `number`, `string`, `boolean`, `date`

---

## 6. Entity Relationship Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        USER MANAGEMENT                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌──────────┐         ┌──────────┐                                 │
│   │  Family  │─────────│   User   │                                 │
│   └──────────┘         └────┬─────┘                                 │
│      guardians              │                                        │
│      children               │ role: admin/teacher/student/parent     │
│                             │ additionalInfo: teacher/student/parent │
│                             │                                        │
└─────────────────────────────┼────────────────────────────────────────┘
                              │
┌─────────────────────────────┼────────────────────────────────────────┐
│                        COURSE MANAGEMENT                             │
├─────────────────────────────┼────────────────────────────────────────┤
│                             │                                        │
│   ┌──────────────┐    ┌─────┴──────┐    ┌─────────────────┐         │
│   │ CourseModule │────│CourseSession│────│   LessonPlan    │         │
│   └──────┬───────┘    └──────┬─────┘    └─────────────────┘         │
│          │                   │                    │                  │
│          │                   │            ┌──────┴──────┐            │
│          │                   └────────────│  Coursework │            │
│          │                                └─────────────┘            │
│          │                                                           │
│   ┌──────┴───────────┐                                              │
│   │ CourseEnrollment │◄────────────────────────┐                    │
│   └──────┬───────────┘                         │                    │
│          │ student, teacher                    │                    │
│          │                                     │                    │
│   ┌──────┴───────────┐    ┌─────────────────┐  │                    │
│   │ EnrolledSession  │────│CourseworkResult │  │                    │
│   └──────────────────┘    └─────────────────┘  │                    │
│          │                                     │                    │
└──────────┼─────────────────────────────────────┼────────────────────┘
           │                                     │
┌──────────┼─────────────────────────────────────┼────────────────────┐
│          │           BILLING                   │                    │
├──────────┼─────────────────────────────────────┼────────────────────┤
│          │                                     │                    │
│   ┌──────┴────┐                         ┌──────┴──────┐             │
│   │   Bill    │─────────────────────────│   Invoice   │             │
│   └───────────┘                         └─────────────┘             │
│   enrolledSession                        bills[]                    │
│   courseEnrollment                       paidBy → User              │
│   billedTo → User                                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                      ASSESSMENT SYSTEM                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌───────────┐    ┌──────────────┐    ┌─────────────────┐          │
│   │ Question  │────│ QuestionSet  │────│   Coursework    │          │
│   └───────────┘    └──────────────┘    └────────┬────────┘          │
│                                                  │                   │
│                                        ┌────────┴────────┐          │
│                                        │CourseworkResult │          │
│                                        └─────────────────┘          │
│                                        sections[].submissions[]     │
│                                        → AnswerSubmission           │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Common Analytical Query Patterns

### Revenue Analytics

```javascript
// Monthly revenue by course category
db.bills.aggregate([
  { $match: { status: "paid", label: "income" } },
  { $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
      revenue: { $sum: "$totalPrice" }
    }
  }
])

// Revenue by bill type
db.bills.aggregate([
  { $match: { status: "paid", label: "income" } },
  { $group: { _id: "$type", total: { $sum: "$totalPrice" } } }
])
```

### Student Performance

```javascript
// Average scores by subject
db.courseworkresults.aggregate([
  { $unwind: "$sections" },
  { $unwind: "$sections.submissions" },
  { $group: {
      _id: "$sections.questionSet",
      correctRate: { $avg: { $cond: ["$sections.submissions.isCorrect", 1, 0] } }
    }
  },
  { $lookup: { from: "questionsets", localField: "_id", foreignField: "_id", as: "set" } }
])
```

### Enrollment Analytics

```javascript
// Enrollments by status
db.courseenrollments.aggregate([
  { $unwind: "$status" },
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Active teachers with student count (status is an array, use $in)
db.courseenrollments.aggregate([
  { $match: { status: { $in: ["course-in-progress"] } } },
  { $group: { _id: "$teacher", studentCount: { $sum: 1 } } },
  { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "teacherInfo" } }
])
```

### Session Analytics

```javascript
// Session completion rates
db.enrolledsessions.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

// Average session duration
db.enrolledsessions.aggregate([
  { $match: { status: "completed", startedAt: { $exists: true }, endedAt: { $exists: true } } },
  { $project: { duration: { $subtract: ["$endedAt", "$startedAt"] } } },
  { $group: { _id: null, avgDuration: { $avg: "$duration" } } }
])
```

---

## Notes for Query Authors

1. **Timestamps**: All collections have `createdAt` and `updatedAt` fields auto-generated by Mongoose
2. **ObjectId References**: Use `$lookup` to join referenced collections
3. **Array Fields**: Use `$unwind` before grouping on array elements
4. **Enums**: Always use exact enum values (case-sensitive) as shown in this document
5. **Pagination**: Most collections support mongoose-paginate-v2 for efficient pagination
6. **Status Arrays**: Some entities (User, CourseEnrollment) have status as arrays - check with `$in` operator
