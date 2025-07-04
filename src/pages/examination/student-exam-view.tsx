import { Check, Clock5, X, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type {
  Exam,
  Question,
  ReviewObject,
  StudentAnswer,
} from "../../utils/types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "sonner";
import { failedReviews, goodReviews } from "../../utils";
import axios from "axios";

export function StudentExamView() {
  const { examId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const exam = state?.exam as Exam;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [reviewText, setReviewText] = useState<ReviewObject | null>(null);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(Math.floor(exam?.duration || 0));
  const [seconds, setSeconds] = useState(0);
  //   const [answers, setAnswers] = useState<StudentAnswer[]>([]);

  useEffect(() => {
    const examLoginStudent = localStorage.getItem("exam-login-student");
    const examLoginStudentExpiresAt = localStorage.getItem(
      "exam-login-student-expires-at"
    );
    if (!examLoginStudent || !examLoginStudentExpiresAt) {
      navigate(`/take-exam/${examId}`);
      return;
    }
    if (examLoginStudentExpiresAt && examLoginStudent) {
      const expiresAt = moment(examLoginStudentExpiresAt);
      if (expiresAt.isBefore(moment())) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("exam-login-student");
        localStorage.removeItem("exam-login-student-expires-at");
        navigate(`/take-exam/${examId}`);
        return;
      }
    }
    const answers = sessionStorage.getItem("answers");
    if (answers && questions.length > 0) {
      const parsedAnswers = JSON.parse(answers);
      const lastAnswer = parsedAnswers[parsedAnswers.length - 1];
      setAnswers([...parsedAnswers]);
      // pick the index of the last answer and add 1 to it. If it's greater than the number of questions, set it to the number of questions
      const nextIndex =
        questions.findIndex(
          (question) => question._id === lastAnswer.questionId
        ) + 1;
      if (nextIndex >= questions.length) handleSubmitExam();
      else setCurrentQuestionIndex(nextIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId, questions]);

  console.log({ answers });

  useEffect(() => {
    if (exam) return setQuestions(exam.examQuestions);
  }, [exam]);

  // Timer countdown
  useEffect(() => {
    if (loading || examSubmitted) return;
    // const timer = setInterval(() => {
    //   setSeconds((prevSeconds) => {
    //     if (minutes === 0 && prevSeconds === 0) {
    //       clearInterval(timer);
    //       // handleSubmitExam();
    //       return 0;
    //     }
    //     if (prevSeconds === 0) {
    //       setMinutes((m) => m - 1);
    //       return 59;
    //     }
    //     return prevSeconds - 1;
    //   });
    // }, 1000);

    // return () => clearInterval(timer);
  }, [loading, examSubmitted, minutes]);

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    const isAnswerCorrect =
      optionIndex === questions[currentQuestionIndex].correctOptionIndex;
    const answer: StudentAnswer = {
      questionId: questions[currentQuestionIndex]._id || "",
      selectedOption: optionIndex,
      isCorrect: isAnswerCorrect,
      marks: isAnswerCorrect ? questions[currentQuestionIndex].marks : 0,
    };
    setAnswers([...answers, answer]);
    sessionStorage.setItem("answers", JSON.stringify([...answers, answer]));
    setReviewText({
      correctAnswer: isAnswerCorrect,
      text: isAnswerCorrect
        ? goodReviews[Math.floor(Math.random() * goodReviews.length)]
        : failedReviews[Math.floor(Math.random() * failedReviews.length)],
    });
    setShowFeedback(true);
  };

  console.log({ selectedOption, currentQuestionIndex });

  const handleNextQuestion = (isLastQuestion: boolean) => {
    console.log({ isLastQuestion });
    if (selectedOption === null) return;
    setShowFeedback(false);
    setReviewText(null);
    setSelectedOption(null);
    const currentQuestion = questions[currentQuestionIndex];
    console.log({ currentQuestion, showResult });
    const isAnswerCorrect =
      selectedOption === currentQuestion.correctOptionIndex;
    console.log({ isAnswerCorrect });
    // Save answer
    //     Move to next question after delay
    if (isLastQuestion) handleSubmitExam();
    else setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  console.log({ answers });

  const handleFinishExam = async () => {
    try {
      const answers = JSON.parse(sessionStorage.getItem("answers") || "[]");
      const student = JSON.parse(
        localStorage.getItem("exam-login-student") || "{}"
      );
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exam/${examId}/submit`,
        {
          studentId: student._id,
          examId,
          schoolId: student.schoolId,
          score: answers.reduce((acc, answer) => acc + (answer.marks || 0), 0),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "exam-login-auth-token"
            )}`,
          },
        }
      );
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitExam = () => {
    setShowFeedback(false);
    setReviewText(null);
    setSelectedOption(null);
    setExamSubmitted(true);
    setShowResult(true);
    handleFinishExam();
  };

  if (examSubmitted)
    return (
      <div className='student-exam-view'>
        <div className='question-timer-container'>
          <div className='question-timer grade-box'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className='grade-container'>
                {(
                  (answers.reduce(
                    (acc, answer) => acc + (answer.marks || 0),
                    0
                  ) /
                    exam.totalMarks) *
                  100
                ).toFixed(1)}
                %
              </div>
            </motion.div>
            <h3>Examination Completed!</h3>
            <h4>Thank you for completing the Mathematics examination.</h4>
            <div className='score-box'>
              <h6>Score</h6>
              <h2>
                {answers.reduce((acc, answer) => acc + (answer.marks || 0), 0)}/
                {exam.totalMarks}
              </h2>
            </div>
            <div className='score-box'>
              <h6>Correct Questions</h6>
              <h2>
                {answers.filter((answer) => answer.isCorrect).length}/
                {questions.length} questions
              </h2>
            </div>
            <button
              className='button return-button'
              onClick={() => {
                localStorage.removeItem("exam-login-student");
                localStorage.removeItem("exam-login-student-expires-at");
                localStorage.removeItem("exam-login-auth-token");
                sessionStorage.removeItem("answers");
                navigate(`/take-exam/${examId}`);
              }}
            >
              Restart Exam
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className='student-exam-view'>
      <div className='question-timer-container'>
        <div className='question-timer'>
          <div className='question'>
            <h6>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h6>
            <div
              className='progress'
              role='progressbar'
              aria-label='Progress Bar'
              aria-valuenow={(currentQuestionIndex / questions.length) * 100}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className='progress-bar'
                style={{
                  width: `${(currentQuestionIndex / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div className='timer'>
            <Clock5 width={20} height={20} />
            <p>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
      <div className='question-timer-container'>
        <div className='question-timer question-box'>
          <h2>{questions[currentQuestionIndex]?.questionText}</h2>
          <h6>{questions[currentQuestionIndex]?.marks} points</h6>
          <div className='options'>
            <AnimatePresence>
              {questions[currentQuestionIndex]?.options.map((option, index) => {
                const isCorrect =
                  (selectedOption !== null &&
                    questions[currentQuestionIndex]?.correctOptionIndex ===
                      selectedOption &&
                    selectedOption === index) ||
                  (selectedOption !== null &&
                    questions[currentQuestionIndex]?.correctOptionIndex ===
                      index);
                const isIncorrect =
                  selectedOption !== null &&
                  selectedOption !==
                    questions[currentQuestionIndex]?.correctOptionIndex &&
                  selectedOption === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleOptionSelect(index)}
                    className={`option ${
                      isCorrect ? "correct" : isIncorrect ? "incorrect" : ""
                    }`}
                  >
                    <p>{String.fromCharCode(65 + index)}</p>
                    <label>{option}</label>
                    {isCorrect ? (
                      <div className='answer-check'>
                        <Check width={16} height={16} color='#22c55e' />
                      </div>
                    ) : isIncorrect ? (
                      <div className='answer-x'>
                        <XIcon width={16} height={16} color='#ef4444' />
                      </div>
                    ) : null}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className='feedback-container'>
        <AnimatePresence>
          {showFeedback ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                className={`feedback ${
                  reviewText?.correctAnswer ? "correct" : "incorrect"
                }`}
              >
                {reviewText?.correctAnswer ? (
                  <Check width={16} height={16} color='#22c55e' />
                ) : (
                  <X width={16} height={16} color='#ef4444' />
                )}
                {reviewText?.text}
                {!reviewText?.correctAnswer
                  ? `. The correct answer is ${questions[currentQuestionIndex]?.correctOption}`
                  : ""}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className='action-buttons-container'>
        <div className='action-buttons'>
          <button
            className='button submit-button'
            // onClick={() => setShowFeedback(true)}
            data-bs-toggle='modal'
            data-bs-target='#confirm-submit-modal'
          >
            Submit Exam
          </button>
          <button
            disabled={selectedOption === null}
            onClick={() =>
              handleNextQuestion(currentQuestionIndex === questions.length - 1)
            }
            className='button finish-button'
          >
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Exam"}
          </button>
        </div>
      </div>
      <ConfirmSubmitModal />
    </div>
  );
}

export function ConfirmSubmitModal() {
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
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <p>Are you sure you want to submit the exam?</p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='button cancel'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
