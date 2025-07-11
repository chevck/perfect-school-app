import { create } from "zustand";
import axios from "axios";
import { getUserData, handleError } from "../utils";
import type { Exam, Question } from "../utils/types";
import { toast } from "sonner";
import moment from "moment";

const userData = getUserData();

const useExamsStore = create((set) => ({
  exams: [],
  loading: false,
  pageLoading: false,
  draftExamQuestions: [],
  savingQuestions: false,
  examDetails: null,
  setExamDetails: (examDetails: Exam | null) => set(() => ({ examDetails })),
  updateExams: (exams: Exam[]) => set(() => ({ exams })),
  setLoading: (loading: boolean) => set(() => ({ loading })),
  saveDraftExamQuestions: (questions: Question[]) => {
    set(() => ({ draftExamQuestions: questions }));
    localStorage.setItem("draftExamQuestions", JSON.stringify(questions));
    localStorage.setItem(
      "draftExamQuestionsValidTill",
      JSON.stringify(moment().add("2", "hours"))
    );
    return;
  },
  clearDraftExamQuestions: () => {
    localStorage.removeItem("draftExamQuestionsValidTill");
    localStorage.removeItem("draftExamQuestions");
  },
  getDraftExamQuestions: () => {
    const draftExamQuestions = localStorage.getItem("draftExamQuestions");
    if (draftExamQuestions) {
      const draftExaminationQuestionValidity = JSON.parse(
        localStorage.getItem("draftExamQuestionsValidTill") || "null"
      );
      const areDraftExamsValid = !draftExaminationQuestionValidity
        ? false
        : moment().isBefore(moment(draftExaminationQuestionValidity));

      if (!areDraftExamsValid) {
        localStorage.removeItem("draftExamQuestionsValidTill");
        localStorage.removeItem("draftExamQuestions");
        return [];
      }
      return JSON.parse(draftExamQuestions);
    }
    return [];
  },
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
      set(() => ({ pageLoading: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exams`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      set(() => ({ exams: response.data.exams }));
    } catch (error) {
      handleError(error);
    } finally {
      set(() => ({ pageLoading: false }));
    }
  },
  fetchExamDetailsApi: async (examId: string) => {
    try {
      set(() => ({ pageLoading: true, loading: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exam/${examId}`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      set(() => ({ examDetails: response.data.exam }));
    } catch (error) {
      handleError(error);
    } finally {
      set(() => ({ loading: false, pageLoading: false }));
    }
  },
  saveQuestionsApi: async (questions: Question[]) => {
    try {
      set(() => ({ savingQuestions: true }));
      await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/save-questions`,
        questions,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Questions saved successfully");
    } catch (error) {
      handleError(error);
      toast.error("Something went wrong. Please try again later");
    } finally {
      set(() => ({ savingQuestions: false }));
    }
  },
  updateExaminationApi: async (details: Exam, successMessage: string) => {
    try {
      set(() => ({ pageLoading: true }));
      const response = await axios.put(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exams/${details._id}`,
        { ...details },
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success(
        successMessage ??
          response?.data?.message ??
          "Questions saved successfully"
      );
      // set((state) => ({ examDetails: response.data.response, exams: state.exams }));
      set((state) => {
        const examIndex = state.exams.findIndex(
          (el) => el._id === response.data.response._id
        );
        state.exams[examIndex] = { ...response.data.response };
        return { examDetails: response.data.response, exams: [...state.exams] };
      });
    } catch (error) {
      handleError(error);
      toast.error("Something went wrong. Please try again later");
    } finally {
      set(() => ({ pageLoading: false }));
    }
  },
}));

export default useExamsStore;
