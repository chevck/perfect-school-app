import type { Teacher } from "../utils/types";

export interface TeacherStore {
  teachers: Teacher[];
  loading: boolean;
  fetchTeachersApi: () => Promise<void>;
  addTeacher: (teacher: Teacher) => void;
  removeTeacher: (teacherId: string) => void;
  updateTeacher: (teacher: Teacher) => void;
  addTeachers: (teachers: Teacher[]) => void;
}
