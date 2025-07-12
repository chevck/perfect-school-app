import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useExamsStore from "../../dataset/exams.store";
import type { ExamsStore } from "../../dataset/store.types";
import { LoadingPage } from "../../components/loadingPage";
import parse from "html-react-parser";
import {
  BookOpen,
  Calendar,
  CheckCircle,
  CircleX,
  Plus,
  SquarePen,
  StepBack,
  Trash,
  TriangleAlert,
  User,
} from "lucide-react";
import { Loader } from "../../components/loader";
import type { Exam, Question } from "../../utils/types";
import ReactQuill from "react-quill-new";
import { useFormik } from "formik";
import { quillFormats, quillModules } from "./create-examination";
import { toast } from "sonner";
import { AnimatePresence, motion } from "motion/react";
import { getStatusFamily } from "../../utils";
import moment from "moment";

export function ReviewExamination() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchExamDetailsApi,
    examDetails,
    pageLoading,
    saveQuestionsApi,
    savingQuestions,
    loading,
    updateExaminationApi,
  } = useExamsStore() as ExamsStore;
  // const [activeTab, setActiveTab] = useState("review");
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [questions, setQuestions] = useState<Question[] | []>([]); // this is going to be the list of the questions duplicated
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  useEffect(() => {
    if (!id) return;
    fetchExamDetailsApi(id);
  }, [id]);

  useEffect(() => {
    if (!examDetails?._id) return;
    setQuestions([...examDetails.examQuestions]);
  }, [examDetails?._id]);

  const { a, b, c, d } = useMemo(() => {
    if (!examDetails?._id) return { a: 0, b: 0, c: 0, d: 0 };
    const a = questions.filter((el) => el.status === "pending").length;
    const b = questions.filter((el) => el.status === "approved").length;
    const c = questions.filter((el) => el.status === "rejected").length;
    const d = questions.filter((el) => el.status === "needs-revision").length;
    return { a, b, c, d };
  }, [examDetails?._id, questions]);

  const handleQuestionReviewAction = (
    questionIndex,
    action,
    reviewNote = ""
  ) => {
    if (action === "approve") {
      questions[questionIndex] = {
        ...questions[questionIndex],
        status: "approved",
        reviewNote: "",
      };
      toast.success(`You have approved question ${questionIndex + 1}`);
    }

    if (action === "reject") {
      const questionId = questionIndex;
      const qIndex = questions.findIndex((q) => q._id === questionId);
      questions[qIndex] = {
        ...questions[qIndex],
        status: "rejected",
        reviewNote,
      };
    }

    if (action === "needs-revision") {
      const questionId = questionIndex;
      const qIndex = questions.findIndex((q) => q._id === questionId);
      questions[qIndex] = {
        ...questions[qIndex],
        status: "needs-revision",
        reviewNote,
      };
    }

    if (action === "delete") {
      const questionId = questionIndex;
      const filteredQuestions = questions.filter((q) => q._id !== questionId);
      setQuestions([...filteredQuestions]);
    } else setQuestions([...questions]);
  };

  const handleSaveQuestions = async () => {
    try {
      if (!examDetails || !questions.length) return;
      await saveQuestionsApi({ examId: examDetails?._id, questions });
    } catch (error) {
      console.log("sds", error);
    }
  };

  const handleApproveAllQuestions = async () => {
    if (!examDetails?._id) return;
    const details: Exam = {
      ...examDetails,
      isReviewed: true,
      examQuestions: questions.map((el) => ({
        ...el,
        reviewNote: "",
        status: "approved",
      })),
    };
    updateExaminationApi(details);
    fetchExamDetailsApi(examDetails._id);
  };

  return pageLoading ? (
    <LoadingPage />
  ) : (
    <div className='review-examination'>
      <div className='review-examination-header'>
        <div className='_left'>
          <h3>
            Review: Mathematics Examination{" "}
            <span
              className={
                "custom-status " +
                getStatusFamily(examDetails?.isReviewed ? "approved" : "draft")
              }
            >
              {examDetails?.isReviewed ? "Approved" : "Under review"}
            </span>
          </h3>
          <div className=''>
            <p>
              <BookOpen />
              {examDetails?.class}
            </p>
            <p>
              <User />
              {examDetails?.createdBy?.name}
            </p>
            <p>
              <Calendar />
              {moment(examDetails?.createdAt).format("Do MMM, YYYY")}
            </p>
          </div>
        </div>
        <div className='_right'>
          <button className='button details' onClick={() => navigate(-1)}>
            <StepBack />
            Back
          </button>
          {examDetails?.isReviewed ? null : (
            <>
              <button
                className='button finalize'
                onClick={handleApproveAllQuestions}
                disabled={loading || !examDetails?.examQuestions.length}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <CheckCircle /> Approve All Questions
                  </>
                )}
              </button>
              <button
                className='button save'
                onClick={handleSaveQuestions}
                disabled={savingQuestions || !examDetails?.examQuestions.length}
              >
                {savingQuestions ? (
                  <Loader />
                ) : (
                  <>
                    <CheckCircle /> Save Updates
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
      <div className='metrics'>
        <div className='card'>
          <h3>{questions.length ?? 0}</h3>
          <p>Total Questions</p>
        </div>
        <div className='card'>
          <h3>{a}</h3>
          <p>Pending Review</p>
        </div>
        <div className='card'>
          <h3>{b}</h3>
          <p>Approved</p>
        </div>
        <div className='card'>
          <h3>{c}</h3>
          <p>Rejected</p>
        </div>
        <div className='card'>
          <h3>{d}</h3>
          <p>Needs Revision</p>
        </div>
      </div>
      <br />
      <br />

      {/* <div className='tablist'>
        <div
          className={`tab-item ${activeTab === "review" ? "active" : ""}`}
          onClick={() => setActiveTab("review")}
        >
          Review Questions
        </div>
        <div
          className={`tab-item ${activeTab === "bulk-actions" ? "active" : ""}`}
          onClick={() => setActiveTab("bulk-actions")}
        >
          Bulk Actions
        </div>
      </div> */}

      <div className='question-board'>
        <div className='action-bar'>
          <select
            className='select form-select'
            onChange={({ target: { value } }) => setFilteredStatus(value)}
          >
            <option value='all'>All Questions</option>
            <option value='pending'>Pending</option>
            <option value='approved'>Approved</option>
            <option value='rejected'>Rejected</option>
            <option value='needs-revision'>Needs Revision</option>
          </select>
          <button
            className='button'
            data-bs-toggle='modal'
            data-bs-target='#edit-question-modal'
          >
            <Plus />
            Add Question
          </button>
        </div>
        <div className='questions'>
          <AnimatePresence>
            {(filteredStatus !== "all"
              ? questions.filter((el) => el.status === filteredStatus)
              : questions
            )?.length ? (
              (filteredStatus !== "all"
                ? questions.filter((el) => el.status === filteredStatus)
                : questions
              ).map((el, index) => (
                <motion.div
                  className='question-item'
                  key={el._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h5>{index + 1}</h5>
                  <div className='question-section'>
                    <div className='question'>
                      <div className='question-titles'>
                        <h4>{parse(el.questionText)}</h4>
                        <div className='marks'>
                          <p>{el.marks} marks</p>
                          {/* <p>By: Admin</p>
                        <p>15/06/2024</p> */}
                        </div>
                      </div>
                      {el?.status ? (
                        <div className='question-revision-status'>
                          {el.status === "needs-revision" ? (
                            <TriangleAlert />
                          ) : null}
                          <p
                            className={`custom-status ${getStatusFamily(
                              el.status.toLowerCase()
                            )}`}
                          >
                            {el.status}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    <div className='options'>
                      {el.options.map((option, index) => (
                        <div
                          className={`option ${
                            el.correctOptionIndex === index ? "correct" : ""
                          }`}
                          key={index}
                        >
                          <p>{String.fromCharCode(65 + index)}</p>
                          <label>{option}</label>
                          {el.correctOptionIndex === index ? (
                            <span>Correct</span>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    {el?.reviewNote ? (
                      <div className='question-review'>
                        <b>Review Notes:</b>
                        {el.reviewNote}
                      </div>
                    ) : null}
                    {el.status === "approved" ? null : (
                      <div className='question-actions'>
                        <button
                          className='button approve'
                          onClick={() =>
                            handleQuestionReviewAction(index, "approve")
                          }
                        >
                          <CheckCircle />
                          Approve
                        </button>
                        <button
                          className='button reject'
                          data-bs-toggle='modal'
                          data-bs-target='#rejection-modal'
                          onClick={() => setSelectedQuestion(el)}
                        >
                          <CircleX />
                          Reject
                        </button>
                        <button
                          className='button revision'
                          data-bs-toggle='modal'
                          data-bs-target='#revision-modal'
                          onClick={() => setSelectedQuestion(el)}
                        >
                          <TriangleAlert />
                          Request Revision
                        </button>
                        <button
                          className='button edit'
                          data-bs-toggle='modal'
                          data-bs-target='#edit-question-modal'
                          onClick={() => setSelectedQuestion(el)}
                        >
                          <SquarePen />
                          Edit
                        </button>
                        <button
                          className='button delete'
                          data-bs-toggle='modal'
                          data-bs-target='#confirm-submit-modal'
                          onClick={() => setSelectedQuestion(el)}
                        >
                          <Trash />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className='question-item'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: "block" }}
              >
                <h6
                  style={{
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {filteredStatus && filteredStatus !== "all"
                    ? "No questions found for the selected filter."
                    : "No questions found."}
                </h6>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <CustomModal
        title='Reason'
        description='Enter rejection reason'
        onConfirm={(reviewNote) => {
          handleQuestionReviewAction(
            selectedQuestion?._id,
            "reject",
            reviewNote
          );
          setSelectedQuestion(null);
        }}
        onCancel={() => setSelectedQuestion(null)}
        confirmButtonText='Save'
        customId='rejection-modal'
      />
      <CustomModal
        title='Review'
        description='Enter revision notes'
        onConfirm={(reviewNote) => {
          handleQuestionReviewAction(
            selectedQuestion?._id,
            "needs-revision",
            reviewNote
          );
          setSelectedQuestion(null);
        }}
        onCancel={() => setSelectedQuestion(null)}
        confirmButtonText='Save'
        customId='revision-modal'
      />
      <EditQuestionModal
        question={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        setQuestions={setQuestions}
        questions={questions}
        examDetails={examDetails}
      />
      <ConfirmDeleteModal
        handleDeleteQuestion={() =>
          handleQuestionReviewAction(selectedQuestion?._id, "delete")
        }
      />
    </div>
  );
}

function CustomModal({
  title,
  description,
  onConfirm,
  onCancel,
  confirmButtonText,
  customId,
  loading = false,
}: {
  title: string;
  description: string;
  onConfirm: (reviewNote) => void;
  onCancel: () => void;
  confirmButtonText: string;
  customId: string;
  loading?: boolean;
}) {
  const [reviewNote, setReviewNote] = useState("");
  return (
    <div
      className='modal fade custom-modal'
      id={`${customId}`}
      tabIndex={-1}
      aria-labelledby={`custom-modal-label ${customId}-label`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title'
              id={`custom-modal-label ${customId}-label`}
            >
              <h1>{title}</h1>
              {description ? (
                <p style={{ width: "100%" }}>{description}</p>
              ) : null}
            </div>
            <button
              type='button'
              className='btn-close'
              id={`close-custom-modal-${customId}`}
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <input
              className='form-control'
              onChange={({ target: { value } }) => setReviewNote(value)}
            />
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='button cancel'
              data-bs-dismiss='modal'
              onClick={() => {
                onCancel();
                setReviewNote("");
              }}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='button create'
              onClick={() => {
                onConfirm(reviewNote);
                setReviewNote("");
                document
                  .getElementById(`close-custom-modal-${customId}`)
                  ?.click();
              }}
              disabled={loading}
            >
              {loading ? <Loader /> : confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditQuestionModal({
  question,
  setSelectedQuestion,
  setQuestions,
  questions,
  examDetails,
}) {
  const customId = "edit-question-modal";
  const formik = useFormik({
    initialValues: {
      questionText: "",
      options: ["", "", "", ""],
      correctOptionIndex: null,
      correctOption: "",
      marks: null,
      ...question,
    },
    enableReinitialize: true,
    onSubmit: () => {
      handleUpdateQuestion();
    },
  });

  useEffect(() => {
    if (question) formik.setValues(question);
  }, [question]);

  const handleUpdateQuestion = () => {
    const { correctOption, correctOptionIndex, questionText, options, marks } =
      formik.values;
    if (!questionText || questionText.length < 5)
      return toast.error("You deh whine? Add a valid question");
    if (!correctOption || correctOptionIndex < 0)
      return toast.error("You have to select a correct option");
    if (options.length < 4) return toast.error("Please add all options");
    if (options.some((option) => option === ""))
      return toast.error("Please add all options");
    const normalized = options.map((opt) => opt.trim().toLowerCase());
    const hasDuplicateOptions = new Set(normalized).size !== normalized.length;
    if (hasDuplicateOptions)
      return toast.error("There are similar options, change them");
    if (marks === 0) return toast.error("Please add marks");
    if (!options.some((option) => option === correctOption))
      return toast.error("Your selected option is not in the options list");
    if (!marks) return toast.error("Please add marks!");
    if (
      questions.reduce((acc, question) => acc + Number(question.marks), 0) +
        marks >
      Number(examDetails?.totalMarks)
    )
      return toast.error(
        "The total marks of the questions should not exceed the total marks of the examination"
      );
    if (!question) {
      // is a new question
      questions.push({
        ...formik.values,
        status: "pending",
      });
      setQuestions([...questions]);
      toast.success("Added Question");
      formik.resetForm();
    } else {
      const questionToEditIndex = questions.findIndex(
        (el) => el._id === question._id
      );
      questions[questionToEditIndex] = { ...formik.values };
      setQuestions([...questions]);
      toast.success("Updated Question!");
    }
    document.getElementById("close-edit-examination-modal")?.click();
    setSelectedQuestion(null);
  };

  return (
    <div
      className='modal fade edit-questions-modal'
      id={customId}
      tabIndex={-1}
      aria-labelledby={`custom-modal-label ${customId}-label`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content create-examination'>
          <div className='modal-header'>
            <div
              className='modal-title fs-5'
              id='create-examination-modal-label'
            >
              <h1>Edit Question</h1>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              id='close-edit-examination-modal'
              aria-label='Close'
            />
          </div>
          <div className='modal-body add-question-container'>
            <div className='form-group question-text'>
              <label>Question Text</label>
              <ReactQuill
                theme='snow'
                value={formik.values?.questionText}
                onChange={(e) => {
                  formik.setFieldValue("questionText", e);
                }}
                modules={quillModules}
                formats={quillFormats}
                placeholder='Enter your question here... Use the toolbar for formatting, including superscripts for expressions like 5²'
                // style={{ minHeight: "200px" }}
              />
            </div>
            <div className='question-options'>
              <div className='flex'>
                {formik?.values?.options?.map((el, index) => (
                  <div className='form-group' key={index}>
                    <label>Option {index + 1}</label>
                    <input
                      className='form-control'
                      value={el}
                      onChange={({ target: { value } }) => {
                        formik.setFieldValue(`options[${index}]`, value);
                        if (formik.values.correctOptionIndex === index) {
                          formik.setFieldValue("correctOption", "");
                          formik.setFieldValue("correctOptionIndex", null);
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='correct-option'>
              <h6>Correct Option</h6>
              <div className='options'>
                {formik.values.options?.map((el, index) => (
                  <div className='option' key={index}>
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
                    <label htmlFor={`correct-option-${index + 1}`}>
                      Option {index + 1}
                    </label>
                  </div>
                ))}
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
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='button cancel'
              data-bs-dismiss='modal'
              // onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='button create'
              // onClick={onConfirm}
              // disabled={loading}
              onClick={() => formik.handleSubmit()}
            >
              Update Question
              {/* {loading ? <Loader /> : confirmButtonText} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmDeleteModal({ handleDeleteQuestion }) {
  return (
    <>
      <div
        className='modal'
        tabIndex={0}
        id='confirm-submit-modal'
        aria-labelledby='confirm-submit-modal-label'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='confirm-submit-modal-label'>
                Confirm Submission
              </h5>
              <button
                type='button'
                className='btn-close'
                id='close-modal'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to delete this question?</p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='button cancel'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => {
                  handleDeleteQuestion();
                  document.getElementById("close-modal")?.click();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
