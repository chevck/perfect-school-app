import type { Student, Teacher } from "../utils/types";

export interface TeacherStore {
  teachers: Teacher[];
  loading: boolean;
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
    class: string;
    status: string;
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
