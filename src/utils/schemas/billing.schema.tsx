import * as Yup from "yup";

export const billingSchema = Yup.object({
  student: Yup.string().required("Student is required"),
  parent: Yup.string().required("Parent is required"),
  class: Yup.string().required("Class is required"),
  term: Yup.string().required("Term is required"),
});
