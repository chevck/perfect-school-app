export const USER_INFORMATION = "user_information";

export const getHourInMilliseconds = (hours: number) => {
  return hours * 60 * 60 * 1000;
};

export const logUserOut = () => {
  localStorage.removeItem(USER_INFORMATION);
  window.location.href = "/sign-in";
};
