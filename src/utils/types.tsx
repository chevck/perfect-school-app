export interface Question {
  questionText: string;
  options: {
    text: string;
    correct: boolean;
  }[];
  correctOption: string;
  marks: number;
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
  parents: string[];
  address: string;
  joinDate: string;
  studentId: string;
  bloodGroup: string;
  medicalConditions: string;
  teacherId: Teacher;
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
}

export interface BillingInformation {
  billId: string;
  billDate: string;
  class: string;
  term: string;
  parent: string;
  student: string;
  session: string;
}
