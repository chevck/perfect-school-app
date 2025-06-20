import * as Yup from "yup";

const ExamsSchema = Yup.object().shape({
  subject: Yup.string().required("Subject is required"),
  class: Yup.string().required("Class is required"),
  teacher: Yup.string().required("Teacher is required"),
  examinationDate: Yup.string().required("Examination date is required"),
  term: Yup.string().required("Term is required"),
  academicSession: Yup.string().required("Academic session is required"),
  totalMarks: Yup.string().required("Total marks is required"),
  duration: Yup.string().required("Duration is required"),
  instructions: Yup.string().optional(),
});

export const QuestionSchema = Yup.object().shape({
  questionText: Yup.string().required("Question text is required"),
  options: Yup.array().of(
    Yup.object().shape({
      text: Yup.string().required("Option text is required"),
      correct: Yup.boolean().required("Correct option is required"),
    })
  ),
  correctOption: Yup.string().required("Correct option is required"),
  marks: Yup.number().required("Marks is required"),
});

export default ExamsSchema;
