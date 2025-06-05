import * as Yup from "yup";

const StudentRegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  admissionNumber: Yup.string().required("Admission number is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  gender: Yup.string().required("Gender is required"),
  email: Yup.string().email("Invalid email"),
  teacherId: Yup.string().required("Teacher is required"),
  class: Yup.string().required("Class is required"),
  joinDate: Yup.date().required("Join date is required"),
  parents: Yup.array().of(Yup.string()).required("Parent(s) is/are required"),
  address: Yup.string().required("Address is required"),
});

export default StudentRegistrationSchema;
