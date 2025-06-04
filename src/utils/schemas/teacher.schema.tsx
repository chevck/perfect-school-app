import * as Yup from "yup";

const TeacherSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  phone: Yup.string().required("Phone is required"),
  class: Yup.string().required("Class is required"),
});

const TeacherRegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your full name"),
  qualification: Yup.string().required("Qualification is required"),
  yearsOfExperience: Yup.string().required("Years of experience is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  // confirmPassword: Yup.string().matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
  // ),
});

export default TeacherSchema;
export { TeacherRegistrationSchema };
