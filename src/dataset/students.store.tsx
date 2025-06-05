import { create } from "zustand";
import type { Student } from "../utils/types";
import axios from "axios";
import { getUserData, handleError } from "../utils";

const userData = getUserData();

const useStudentsStore = create((set) => ({
  loading: false,
  selectedStudent: null,
  students: [],

  setLoading: (loading: boolean) => set(() => ({ loading })),

  setSelectedStudent: (student: Student | null) =>
    set(() => ({ selectedStudent: student })),

  addStudent: (student: Student) =>
    set((state) => ({ students: [...state.students, student] })),

  addStudents: (students: Student[]) => set(() => ({ students })),

  removeStudent: (studentId: string) =>
    set((state) => ({
      students: state.students.filter((student) => student._id !== studentId),
    })),

  updateStudent: (student: Student) =>
    set((state) => ({
      students: state.students.map((s) =>
        s._id === student._id ? student : s
      ),
    })),

  fetchStudentsApi: async (filters: {
    class: string;
    status: string;
    searchTerm: string;
  }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student`,
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
          params: filters,
        }
      );
      set(() => ({ students: response.data.students }));
    } catch (error) {
      handleError(error);
    }
  },

  fetchStudentApi: async (studentId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student/${studentId}`
      );
      return response.data.student;
    } catch (error) {
      handleError(error);
    }
  },

  createStudentApi: async (student: Student) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student`,
        student
      );
      return response.data.student;
    } catch (error) {
      handleError(error);
    }
  },

  updateStudentApi: async (student: Student) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student/${student._id}`,
        student,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      return response.data.student;
    } catch (error) {
      handleError(error);
    }
  },

  deleteStudentApi: async (studentId: string) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student/${studentId}`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      return response.data.student;
    } catch (error) {
      handleError(error);
    }
  },
}));

export default useStudentsStore;
