import axios from "axios";
import { toast } from "sonner";

export const ADMIN = "admin";
export const TEACHER = "teacher";
export const STUDENT = "student";

export const USER_INFORMATION = "user_information";

export const getHourInMilliseconds = (hours: number) => {
  return hours * 60 * 60 * 1000;
};

export const logUserOut = () => {
  localStorage.removeItem(USER_INFORMATION);
  window.location.href = "/sign-in";
};

export const getUserData = () => {
  const userData = localStorage.getItem(USER_INFORMATION);
  return userData ? JSON.parse(userData) : null;
};

export const getUserRole = () => {
  const userData = getUserData();
  if (userData?.role === ADMIN || userData?.adminId) return ADMIN;
  if (userData?.role === TEACHER || userData?.teacherId) return TEACHER;
  if (userData?.role === STUDENT || userData?.studentId) return STUDENT;
  return null;
};

export const schoolPrefix = () => {
  const userData = getUserData();
  const schoolName = userData?.schoolName;
  if (!schoolName) return "PSA";
  const words = schoolName.trim().split(/\s+/);
  if (words.length === 1) return words[0][0].toUpperCase();
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return "PSA";
};

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return toast.error(
      error?.response?.data?.message ||
        "Something went wrong. Please try again later"
    );
  } else {
    return toast.error("Something went wrong. Please try again later");
  }
};
