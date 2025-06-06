import { create } from "zustand";
import axios from "axios";
import { getUserData } from "../utils";
import { toast } from "sonner";
import type { Teacher } from "../utils/types";

const userData = getUserData();

const useTeachersStore = create((set) => ({
  loading: false,
  teachers: [],
  setLoading: (loading: boolean) => set(() => ({ loading })),
  addTeacher: (teacher: Teacher) =>
    set((state) => ({ teachers: [...state.teachers, teacher] })),
  addTeachers: (teachers: Teacher[]) => set(() => ({ teachers: teachers })),
  removeTeacher: (teacherId: string) =>
    set((state) => ({
      teachers: state.teachers.filter((teacher) => teacher._id !== teacherId),
    })),
  updateTeacher: (teacher: Teacher) =>
    set((state) => ({
      teachers: state.teachers.map((t) =>
        t._id === teacher._id ? teacher : t
      ),
    })),

  fetchTeachersApi: async () => {
    try {
      set(() => ({ loading: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/teachers`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      set(() => ({ teachers: response.data.teachers }));
    } catch (error) {
      console.log({ error });
      toast.error("Something went wrong. Please try again later");
    } finally {
      set(() => ({ loading: false }));
    }
  },
}));

export default useTeachersStore;
