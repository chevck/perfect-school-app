import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your full name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  schoolName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your school name"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  schoolLogo: Yup.string().required("Please upload your school logo"),
  schoolThemeColor: Yup.string().default("#ffffff"),
  acceptedTerms: Yup.boolean().isTrue("Please accept the terms and conditions"),
});

export default SignupSchema;
