export const ADMIN_INFORMATION = "admin_information";

export const getHourInMilliseconds = (hours: number) => {
  return hours * 60 * 60 * 1000;
};

export const logUserOut = () => {
  localStorage.removeItem(ADMIN_INFORMATION);
  window.location.href = "/sign-in";
};
