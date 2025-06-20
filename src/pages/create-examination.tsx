import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import type { Exam, Question } from "../utils/types.tsx";
import { useParams } from "react-router-dom";
import useExamsStore from "../dataset/exams.store.tsx";
import type { ExamsStore } from "../dataset/store.types.tsx";
import { useFormik } from "formik";
import { QuestionSchema } from "../utils/schemas/exams.schema.tsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function CreateExamination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const { exams, fetchExamsApi, saveQuestionsApi } =
    useExamsStore() as ExamsStore;
  const [questions, setQuestions] = useState<Question[]>(
    exam?.examQuestions || []
  );
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!exams.length) fetchExamsApi();
    if (id) {
      setExam(exams.find((exam) => exam._id === id) || null);
      setQuestions(exams.find((exam) => exam._id === id)?.examQuestions || []);
    }
  }, [exams, id]);

  const formik = useFormik({
    initialValues: {
      questionText: "",
      options: [],
      correctOption: "",
      marks: 0,
      correctOptionIndexIndex: null,
    },
    validationSchema: QuestionSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleAddQuestion = () => {
    console.log("valuesss", formik.values);
    if (formik.values.questionText === "")
      return toast.error("Please add a question");
    if (formik.values.options.length < 4)
      return toast.error("Please add all options");
    if (formik.values.options.some((option) => option === ""))
      return toast.error("Please add all options");
    if (formik.values.correctOptionIndexIndex === null)
      return toast.error("Please select a correct option");
    if (formik.values.marks === 0) return toast.error("Please add marks");
    if (
      !formik.values.options.some(
        (option) => option === formik.values.correctOption
      )
    )
      return toast.error("Your selected option is not in the options list");
    const newQuestion: Question = {
      questionText: formik.values.questionText,
      options: formik.values.options,
      correctOption: formik.values.correctOption,
      marks: formik.values.marks,
      correctOptionIndexIndex: formik.values.correctOptionIndexIndex,
    };
    setNewQuestions([...newQuestions, newQuestion]);
    formik.resetForm();
  };

  const resetCorrectOption = () => {
    // this runs when the user changes the an option. Just to be safe, we reset the correct option selected
    formik.setFieldValue("correctOption", "");
    formik.setFieldValue("correctOptionIndexIndex", null);
  };

  const handleSaveExamination = async () => {
    console.log("saving examination", questions);
    if (newQuestions.length === 0)
      return toast.error("You deh whine? Add Questions First");
    if (!id) return toast.error("Something went wrong. Please try again later");
    if (
      questions.reduce((acc, question) => acc + Number(question.marks), 0) >
      Number(exam?.totalMarks)
    )
      return toast.error(
        "The total marks of the questions should not exceed the total marks of the examination"
      );
    try {
      const body = [...questions, ...newQuestions].map((question) => ({
        questionText: question.questionText,
        options: question.options,
        correctOption: question.correctOption,
        correctOptionIndexIndex: question.correctOptionIndexIndex,
        marks: question.marks,
      }));
      saveQuestionsApi({ questions: body, examId: id || "" }).then(() => {
        setNewQuestions([]);
        setQuestions([...questions, ...newQuestions]);
        toast.success("Questions saved successfully");
      });
    } catch (error) {
      console.log("sdsds", error);
    }
  };

  return (
    <div className='create-examination'>
      <div className='title'>
        <h3>Set Questions for Examination</h3>
        <div className='d-flex gap-2'>
          <button className='button' onClick={handleSaveExamination}>
            Save Examination
          </button>
          <button
            className='button back'
            onClick={() => navigate("/examinations")}
          >
            Back to Examinations
          </button>
        </div>
      </div>
      <div className='exam-details'>
        <div className='dets'>
          <div className='det'>
            <h6>Subject</h6>
            <h3>{exam?.subject}</h3>
            {formik.errors.questionText && formik.touched.questionText && (
              <p className='text-danger'>{formik.errors.questionText}</p>
            )}
          </div>
          <div className='det'>
            <h6>Class</h6>
            <h3>{exam?.class}</h3>
          </div>
          <div className='det'>
            <h6>Term & Session</h6>
            <h3>
              {exam?.term} - {exam?.session}
            </h3>
          </div>
        </div>
        <div className='question-det'>
          <h6>Questions Added: {[...questions, ...newQuestions].length}</h6>
          <h6>
            Total Marks:{" "}
            {Number(
              [...questions, ...newQuestions].reduce(
                (acc, question) => acc + Number(question.marks),
                0
              )
            )}
            /{exam?.totalMarks}
          </h6>
        </div>
      </div>
      <div className='add-question-container'>
        <h3>Add New Question</h3>
        <div className='question-text'>
          <div className='form-group'>
            <label htmlFor='question-text'>Question Text</label>
            <textarea
              id='questionText'
              name='questionText'
              rows={4}
              className='form-control'
              value={formik.values.questionText}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className='question-options'>
          <div className='flex'>
            <div className='form-group'>
              <label>Option 1</label>
              <input
                type='text'
                id='option1'
                className='form-control'
                value={formik.values.options[0] || ""}
                onChange={(e) => {
                  formik.setFieldValue("options[0]", e.target.value);
                  if (formik.values.correctOption) resetCorrectOption();
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='form-group'>
              <label>Option 2</label>
              <input
                type='text'
                id='option2'
                className='form-control'
                value={formik.values.options[1] || ""}
                onChange={(e) => {
                  formik.setFieldValue("options[1]", e.target.value);
                  if (formik.values.correctOption) resetCorrectOption();
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='form-group'>
              <label>Option 3</label>
              <input
                type='text'
                id='option3'
                className='form-control'
                value={formik.values.options[2] || ""}
                onChange={(e) => {
                  formik.setFieldValue("options[2]", e.target.value);
                  if (formik.values.correctOption) resetCorrectOption();
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='form-group'>
              <label>Option 4</label>
              <input
                type='text'
                id='option4'
                className='form-control'
                value={formik.values.options[3] || ""}
                onChange={(e) => {
                  formik.setFieldValue("options[3]", e.target.value);
                  if (formik.values.correctOption) resetCorrectOption();
                }}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
        </div>
        <div className='correct-option'>
          <h6>Correct Option</h6>
          <div className='options'>
            {["Option 1", "Option 2", "Option 3", "Option 4"].map(
              (el, index) => {
                return (
                  <div className='option' key={el}>
                    <input
                      type='radio'
                      id={`correct-option-${index + 1}`}
                      value={el}
                      checked={formik.values.correctOptionIndexIndex === index}
                      onChange={() => {
                        if (
                          formik.values.options.length < 4 ||
                          formik.values.options[index] === ""
                        )
                          return toast.error("Please add all options");
                        formik.setFieldValue(
                          "correctOption",
                          formik.values.options[index]
                        );
                        formik.setFieldValue("correctOptionIndexIndex", index);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <label htmlFor={`correct-option-${index + 1}`}>{el}</label>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className='marks'>
          <div className='form-group'>
            <label>Marks</label>
            <input
              name='marks'
              className='form-control'
              placeholder='Marks'
              id='marks'
              type='number'
              value={formik.values.marks}
              onChange={(e) => {
                formik.setFieldValue("marks", e.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className='button-container'>
          <button className='button' onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
      </div>
      <div className='questions-container'>
        <h3>Questions ({[...questions, ...newQuestions].length})</h3>
        {[...questions, ...newQuestions].length ? (
          <QuestionsList questions={[...questions, ...newQuestions]} />
        ) : (
          <p className='no-questions'>
            No questions added yet. Use the form above to add questions.
          </p>
        )}
      </div>
    </div>
  );
}

export function QuestionsList({
  questions,
  viewMode,
}: {
  questions: [] | Question[];
  viewMode?: boolean;
}) {
  return (
    <div className='questions'>
      <AnimatePresence>
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={"question"}
          >
            <div className='' key={index}>
              <div className='title_'>
                <h4>
                  Question {index + 1} <span>({question.marks} marks)</span>
                </h4>
                {!viewMode && (
                  <div className='actions'>
                    <button className='button'>Edit</button>
                    <button className='button'>Delete</button>
                  </div>
                )}
              </div>
              <h6>{question.questionText}</h6>
              <div className='options'>
                {question.options.map((option, index) => (
                  <div
                    className={`option ${
                      question.correctOptionIndexIndex === index
                        ? "correct"
                        : ""
                    }`}
                    key={index}
                  >
                    <p>{String.fromCharCode(65 + index)}</p>
                    <label>{option}</label>
                    {question.correctOptionIndexIndex === index ? (
                      <span>Correct</span>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
