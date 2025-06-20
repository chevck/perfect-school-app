import { create } from "zustand";
import axios from "axios";
import { getUserData, handleError } from "../utils";
import type { Exam, Question } from "../utils/types";
import { toast } from "sonner";

const userData = getUserData();

const useExamsStore = create((set) => ({
  exams: [],
  loading: false,
  savingQuestions: false,
  examDetails: null,
  setExamDetails: (examDetails: Exam | null) => set(() => ({ examDetails })),
  updateExams: (exams: Exam[]) => set(() => ({ exams })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
  createExamsApi: async (exam: Exam, closeModal: () => void) => {
    console.log("exam to create", exam);
    try {
      set(() => ({ loading: true }));
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exam-create`,
        exam,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      console.log("response", response);
      set((state) => ({ exams: [...state.exams, response.data.exam] }));
      toast.success("Exam created successfully");
      closeModal();
    } catch (error) {
      handleError(error);
      toast.error("Something went wrong. Please try again later");
    } finally {
      set(() => ({ loading: false }));
    }
  },
  fetchExamsApi: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exams`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      set(() => ({ exams: response.data.exams }));
    } catch (error) {
      handleError(error);
    } finally {
      set(() => ({ loading: false }));
    }
  },

  fetchExamDetailsApi: async (examId: string) => {
    try {
      set(() => ({ loading: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exam/${examId}`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      set(() => ({ examDetails: response.data.exam }));
    } catch (error) {
      handleError(error);
    } finally {
      set(() => ({ loading: false }));
    }
  },

  saveQuestionsApi: async (questions: Question[]) => {
    try {
      set(() => ({ savingQuestions: true }));
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/save-questions`,
        questions,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      console.log("response", response);
      toast.success("Questions saved successfully");
    } catch (error) {
      handleError(error);
      toast.error("Something went wrong. Please try again later");
    } finally {
      set(() => ({ savingQuestions: false }));
    }
  },
}));

export default useExamsStore;
