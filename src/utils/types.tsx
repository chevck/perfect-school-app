export interface Question {
  _id?: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number | null;
  correctOption: string;
  marks: number;
  reviewNote?: string;
  status?: string;
  localId?: string;
}

export interface ExamDetails {
  name: string;
  grade: string;
  term: string;
  year: string;
  teacher: string;
  date: string;
  questions: number;
  totalMarks: number;
  id: number;
}

export interface UserInformation {
  schoolName: string;
  adminName: string;
  expiresAt: number;
  logoUrl: string;
}

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  class: string;
  subject: string;
}

export interface Student {
  _id: string;
  firstName?: string;
  lastName?: string;
  studentName?: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  class: string;
  subject: string;
  admissionNumber: string;
  dob: string;
  gender: string;
  parents: {
    name: string;
    email: string;
    phoneNumber: string;
    isPrimaryContact: boolean;
    studentIds?: { _id: string; isPrimaryContact: boolean }[];
  }[];
  address: string;
  joinDate: string;
  studentId: string;
  bloodGroup: string;
  medicalConditions: string;
  teacherId: Teacher;
  examStatus?: string;
  score?: number;
  examScore?: number;
}

export interface DashboardData {
  totalStudents: number;
  totalTeachers: number;
  pendingFees: number;
  upcomingExams: number;
  logs: {
    action: string;
    actionType: string;
    createdAt: string;
    _id: string;
  }[];
}

export interface BillItem {
  item: string;
  price: number;
  include?: boolean;
}

export interface BillingInformation {
  billId: string;
  billDate: string;
  class: string;
  term: string;
  parent: string;
  student: string;
  session: string;
  notes: string[];
}

export interface BankAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
  isPrimary: boolean;
}

export interface BillingStats {
  totalBillsAmount: number;
  totalPaidBillsAmount: number;
  totalUnpaidBillsAmount: number;
  totalBillsCount: number;
}

export interface Exam {
  _id: string;
  name: string;
  subject: string;
  session: string;
  class: string;
  term: string;
  createdBy?: Teacher;
  teacher: string;
  examDate: string;
  isReviewed: boolean;
  totalMarks: number;
  duration: number;
  examInstructions: string;
  createdAt: string;
  updatedAt: string;
  examQuestions: Question[];
  students: Student[];
  hasStarted: boolean;
}

export interface StudentAnswer {
  questionId: string;
  selectedOption: number | null;
  isCorrect: boolean | null;
  marks: number | null;
}

export interface ReviewObject {
  correctAnswer: boolean;
  text: string;
}

export interface School {
  _id: string;
  classes?: {
    className: string;
    teacher?: Teacher;
  }[];
  subjects?: {
    name: string;
    description?: string;
  }[];
  schoolBankAccounts?: BankAccount[];
  schoolName?: string;
  adminName?: string;
  expiresAt?: number;
  logoUrl?: string;
  address?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
}
