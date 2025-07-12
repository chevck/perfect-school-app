import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import type { Exam, Question } from "../../utils/types.tsx";
import { useParams } from "react-router-dom";
import useExamsStore from "../../dataset/exams.store.tsx";
import type { ExamsStore } from "../../dataset/store.types.tsx";
import { useFormik, type FormikProps } from "formik";
import { QuestionSchema } from "../../utils/schemas/exams.schema.tsx";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import parse from "html-react-parser";
import { getStatusFamily, randomId } from "../../utils/index.tsx";

export const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["formula"],
    ["clean"],
  ],
};

export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "script",
  "list",
  "formula",
];

export function CreateExamination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam | null>(null);
  const {
    exams,
    fetchExamsApi,
    saveQuestionsApi,
    saveDraftExamQuestions,
    getDraftExamQuestions,
    clearDraftExamQuestions,
  } = useExamsStore() as ExamsStore;
  const [questions, setQuestions] = useState<Question[]>([
    ...(exam?.examQuestions || []),
  ]);
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!exams.length) fetchExamsApi({});
    if (id) {
      setExam(exams.find((exam) => exam._id === id) || null);
      setQuestions(exams.find((exam) => exam._id === id)?.examQuestions || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams, id]);

  useEffect(() => {
    const draftQuestions = getDraftExamQuestions();
    if (draftQuestions) setNewQuestions(draftQuestions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      questionText: "",
      options: [],
      correctOption: "",
      marks: 0,
      correctOptionIndex: null,
      isEditing: false,
      editIndex: null,
      localId: "",
    },
    validationSchema: QuestionSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const hasQuestionExceededTotalMarks = (newQuestion) => {
    let allQuestions = [...questions, ...newQuestions];
    if (newQuestion.isEditing)
      allQuestions = allQuestions.filter(
        (el) => el.localId !== newQuestion.localId
      );
    let totalMarks = allQuestions.reduce(
      (acc, question) => acc + Number(question.marks),
      0
    );
    totalMarks = totalMarks + Number(newQuestion.marks);
    return totalMarks > Number(exam?.totalMarks);
  };

  const isQuestionValidToBeAdded = () => {
    if (formik.values.questionText === "") {
      toast.error("Please add a question");
      return false;
    }
    if (formik.values.options.length < 4) {
      toast.error("Please add all options");
      return false;
    }
    if (formik.values.options.some((option) => option === "")) {
      toast.error("Please add all options");
      return false;
    }
    const normalized = (formik?.values?.options as string[]).map((opt) =>
      opt.trim().toLowerCase()
    );
    const hasDuplicateOptions = new Set(normalized).size !== normalized.length;
    if (hasDuplicateOptions) {
      toast.error("There are similar options, change them");
      return false;
    }
    if (formik.values.correctOptionIndex === null) {
      toast.error("Please select a correct option");
      return false;
    }
    if (!formik.values.marks) {
      toast.error("Please add marks");
      return false;
    }
    if (
      !formik.values.options.some(
        (option) => option === formik.values.correctOption
      )
    ) {
      toast.error("Your selected option is not in the options list");
      return false;
    }
    if (hasQuestionExceededTotalMarks(formik.values)) {
      toast.error(
        "The total marks of the questions should not exceed the total marks of the examination"
      );
      return false;
    }
    return true;
  };

  const handleAddQuestion = () => {
    if (!isQuestionValidToBeAdded()) return;
    const newQuestion: Question = {
      questionText: formik.values.questionText,
      options: formik.values.options,
      correctOption: formik.values.correctOption,
      marks: formik.values.marks,
      correctOptionIndex: formik.values.correctOptionIndex,
      localId: randomId(),
    };
    setNewQuestions([...newQuestions, newQuestion]);
    saveDraftExamQuestions([...newQuestions, newQuestion]);
    toast.success("Question added!");
    formik.resetForm();
  };

  const resetCorrectOption = () => {
    // this runs when the user changes the an option. Just to be safe, we reset the correct option selected
    formik.setFieldValue("correctOption", "");
    formik.setFieldValue("correctOptionIndex", null);
  };

  const handleSaveExamination = async () => {
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
    if (
      [...questions, ...newQuestions].reduce(
        (acc, question) => acc + Number(question.marks),
        0
      ) < Number(exam?.totalMarks)
    )
      return toast.error(
        "The total marks of the questions should not be less than the total marks of the examination"
      );
    try {
      const body = [...questions, ...newQuestions].map((question) => ({
        questionText: question.questionText,
        options: question.options,
        correctOption: question.correctOption,
        correctOptionIndex: question.correctOptionIndex,
        marks: question.marks,
      }));
      saveQuestionsApi({ questions: body, examId: id || "" }).then(() => {
        setNewQuestions([]);
        setQuestions([...questions, ...newQuestions]);
        toast.success("Questions saved successfully");
        localStorage.removeItem("draftExamQuestions");
        navigate("/examinations");
      });
    } catch (error) {
      console.log("sdsds", error);
    }
  };

  const handleUpdateQuestion = () => {
    if (!formik.values.localId) return toast.error("Something went wrong");
    if (!isQuestionValidToBeAdded()) return;
    const allQuestions = [
      ...questions.map((el) => ({ ...el, base: "questions" })),
      ...newQuestions.map((el) => ({ ...el, base: "new-questions" })),
    ];
    const question = allQuestions.find(
      (el) => el.localId === formik.values.localId
    );
    const updatedQuestion = {
      ...question,
      questionText: formik.values.questionText,
      options: formik.values.options,
      correctOption: formik.values.correctOption,
      correctOptionIndex: formik.values.correctOptionIndex,
      marks: formik.values.marks,
    };
    if (question?.base === "questions") {
      // Handle updating existing question from questions array
      const questionIndex = questions.findIndex(
        (q) => q.localId === formik.values.localId
      );
      if (questionIndex !== -1) {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex] = updatedQuestion as Question;
        setQuestions(updatedQuestions);
      }
    } else if (question?.base === "new-questions") {
      // Handle updating question from newQuestions array
      const questionIndex = newQuestions.findIndex(
        (q) => q.localId === formik.values.localId
      );
      if (questionIndex !== -1) {
        const updatedNewQuestions = [...newQuestions];
        updatedNewQuestions[questionIndex] = updatedQuestion as Question;
        setNewQuestions(updatedNewQuestions);
        saveDraftExamQuestions(updatedNewQuestions);
      }
    }
    toast.success("Question updated successfully");
    formik.resetForm();
    formik.setFieldValue("isEditing", false);
    formik.setFieldValue("editIndex", null);
  };

  const handleDeleteQuestion = (q) => {
    const allQuestions = [
      ...questions.map((el) => ({ ...el, base: "questions" })),
      ...newQuestions.map((el) => ({ ...el, base: "new-questions" })),
    ];
    const question = allQuestions.find((el) => el.localId === q.localId);
    if (question?.base === "questions") {
      const updatedQuestions = questions.filter(
        (el) => el.localId !== q.localId
      );
      setQuestions(updatedQuestions);
    } else if (question?.base === "new-questions") {
      const updatedNewQuestions = newQuestions.filter(
        (el) => el.localId !== q.localId
      );
      setNewQuestions(updatedNewQuestions);
      saveDraftExamQuestions(updatedNewQuestions);
    }
    toast.success("Question deleted successfully");
  };

  return (
    <div className='create-examination'>
      <div className='title'>
        <h3>Set Questions for Examination</h3>
        <div className='gap-2 d-flex'>
          <button className='button' onClick={handleSaveExamination}>
            Save Examination
          </button>
          <button
            className='button back'
            onClick={() => {
              if (!id) return;
              saveQuestionsApi({
                examId: id,
                questions: [...questions, ...newQuestions],
              });
              clearDraftExamQuestions();
              navigate("/examinations");
            }}
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
            {/* {formik.errors.questionText && formik.touched.questionText && (
              <p className='text-danger'>{formik.errors.questionText}</p>
            )} */}
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
            <ReactQuill
              theme='snow'
              value={formik.values.questionText}
              onChange={(e) => {
                formik.setFieldValue("questionText", e);
              }}
              modules={quillModules}
              formats={quillFormats}
              placeholder='Enter your question here... Use the toolbar for formatting, including superscripts for expressions like 5²'
              style={{ minHeight: "120px" }}
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
                      checked={formik.values.correctOptionIndex === index}
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
                        formik.setFieldValue("correctOptionIndex", index);
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
          {formik.values.isEditing ? (
            <>
              <button
                className='button cancel'
                onClick={() => {
                  formik.resetForm();
                  formik.setFieldValue("isEditing", false);
                  formik.setFieldValue("editIndex", null);
                }}
              >
                Cancel Edit
              </button>
              <button className='button' onClick={handleUpdateQuestion}>
                Update Question
              </button>
            </>
          ) : (
            <button className='button' onClick={handleAddQuestion}>
              Add Question
            </button>
          )}
        </div>
      </div>
      <div className='questions-container'>
        <h3>Questions ({[...questions, ...newQuestions].length})</h3>
        {[...questions, ...newQuestions].length ? (
          <QuestionsList
            questions={[...questions, ...newQuestions]}
            formik={formik}
            handleDeleteQuestion={(q) => handleDeleteQuestion(q)}
          />
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
  formik,
  handleDeleteQuestion,
}: {
  questions: [] | Question[];
  viewMode?: boolean;
  formik: FormikProps<any>;
  handleDeleteQuestion: (q: Question) => void;
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
            className={`question ${question.status}`}
          >
            <div className='' key={index}>
              <div className='title_'>
                <h4>
                  Question {index + 1} <span>({question.marks} marks)</span>
                </h4>
                {!viewMode ? (
                  <div className='actions'>
                    <button
                      className='button'
                      onClick={() => {
                        formik.setValues({
                          ...question,
                          isEditing: true,
                          editIndex: index,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='button'
                      onClick={() => handleDeleteQuestion(question)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <span
                    className={`custom-status ${getStatusFamily(
                      question.status.toLowerCase()
                    )} `}
                  >
                    {question.status}
                  </span>
                )}
              </div>
              {viewMode && question.reviewNote ? (
                <div className='review-notes-container'>
                  Review Comments: This is not the best that we can do. Change
                  xxxxxxxx{" "}
                </div>
              ) : null}
              <h6>{parse(question.questionText)}</h6>
              <div className='options'>
                {question.options.map((option, index) => (
                  <div
                    className={`option ${
                      question.correctOptionIndex === index ? "correct" : ""
                    }`}
                    key={index}
                  >
                    <p>{String.fromCharCode(65 + index)}</p>
                    <label>{option}</label>
                    {question.correctOptionIndex === index ? (
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
