/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { handleError } from "../utils";
import axios from "axios";
import { getUserData } from "../utils";

const userData = getUserData();

const useSchoolStore = create((set) => ({
  school: null,
  setSchool: (school: any) => set(() => ({ school })),
  fetchSchoolApi: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/school`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      set(() => ({ school: response.data.school }));
    } catch (error) {
      handleError(error);
    }
  },
}));

export default useSchoolStore;
