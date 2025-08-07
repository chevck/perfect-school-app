/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { handleError } from "../utils";
import axios from "axios";
import { getUserData } from "../utils";

const userData = getUserData();

const useSchoolStore = create((set) => ({
  school: null,
  classes: [],
  subjects: [],
  setSchool: (school: any) => set(() => ({ school })),
  fetchSchoolApi: async () => {
    try {
      const {
        data: { school },
      } = await axios.get(`${import.meta.env.VITE_GLOBAL_BE_URL}/psa/school`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      set(() => ({
        school,
        classes: school.classes.map(
          (el: { className: string }) => el.className
        ),
        subjects: school.subjects,
      }));
    } catch (error) {
      handleError(error);
    }
  },
}));

export default useSchoolStore;
