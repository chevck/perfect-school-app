import type { Exam, Question, School, Student, Teacher } from "../utils/types";

export interface TeacherStore {
  teachers: Teacher[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchTeachersApi: () => Promise<void>;
  addTeacher: (teacher: Teacher) => void;
  removeTeacher: (teacherId: string) => void;
  updateTeacher: (teacher: Teacher) => void;
  addTeachers: (teachers: Teacher[]) => void;
}

export interface StudentStore {
  students: Student[];
  loading: boolean;
  selectedStudent: Student | null;
  setLoading: (loading: boolean) => void;
  setSelectedStudent: (student: Student | null) => void;
  fetchStudentsApi: (filters: {
    class?: string;
    status?: string;
    searchTerm?: string;
  }) => Promise<void>;
  fetchStudentApi: (studentId: string) => Promise<Student>;
  createStudentApi: (student: Student) => Promise<Student>;
  updateStudentApi: (student: Student) => Promise<Student>;
  deleteStudentApi: (studentId: string) => Promise<Student>;
  addStudent: (student: Student) => void;
  removeStudent: (studentId: string) => void;
  updateStudent: (student: Student) => void;
  addStudents: (students: Student[]) => void;
}

export interface ExamsStore {
  exams: Exam[];
  loading: boolean;
  pageLoading: boolean;
  setLoading: (loading: boolean) => void;
  fetchExamsApi: (statuses) => Promise<void>;
  createExamsApi: (exam: Exam, closeModal: () => void) => Promise<void>;
  saveQuestionsApi: (questions: {
    questions: Question[];
    examId: string;
  }) => Promise<void>;
  fetchExamDetailsApi: (examId: string) => Promise<void>;
  examDetails: Exam | null;
  setExamDetails: (examDetails: Exam | null) => void;
  draftExamQuestions: Question[];
  saveDraftExamQuestions: (questions: Question[]) => void;
  getDraftExamQuestions: () => Question[];
  clearDraftExamQuestions: () => void;
  savingQuestions: boolean;
  updateExaminationApi: (details: Exam, successMessage?: string) => void;
  deleteExaminationApi: (examId: string) => void;
}

export interface SchoolStore {
  school: School | null;
  classes: string[];
  subjects: string[];
  setSchool: (school: School | null) => void;
  setClasses: (classes: string[]) => void;
  setSubjects: (subjects: string[]) => void;
  fetchSchoolApi: () => Promise<void>;
}
