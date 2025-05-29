import { Check, Clock5, X, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Question } from "../utils/types";

export function StudentExamView() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);

  //   const [answers, setAnswers] = useState<StudentAnswer[]>([]);

  useEffect(() => {
    setQuestions([
      {
        questionText: "Monkey",
        correctOption: "Monkey",
        options: [
          {
            text: "Monkey",
            correct: false,
          },
          {
            text: "Monkey",
            correct: false,
          },
          {
            text: "Monkey",
            correct: false,
          },
          {
            text: "Monkey",
            correct: false,
          },
        ],
        marks: 5,
      },
    ]);
  }, []);

  // Timer countdown
  //   useEffect(() => {
  //     if (loading || examSubmitted) return;
  //     const timer = setInterval(() => {
  //       setTimeLeft((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(timer);
  //           handleSubmitExam();
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(timer);
  //   }, [loading, examSubmitted]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    const currentQuestion = questions[currentQuestionIndex];
    console.log({ currentQuestion, showResult });
    //     const isAnswerCorrect = selectedOption === currentQuestion.correctOption;

    //     // Save answer
    //     const answer: StudentAnswer = {
    //       questionId: currentQuestion.id,
    //       selectedOption,
    //       isCorrect: isAnswerCorrect,
    //       marks: isAnswerCorrect ? currentQuestion.marks : 0,
    //     };

    //     setAnswers([...answers, answer]);

    //     Move to next question after delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const options = [
    {
      id: 1,
      text: "Monkey",
      correct: false,
    },
    {
      id: 2,
      text: "Monkey",
      correct: false,
    },
    {
      id: 3,
      text: "Monkey",
      correct: false,
    },
    {
      id: 4,
      text: "Monkey",
      correct: false,
    },
  ];

  if (examSubmitted)
    return (
      <div className="student-exam-view">
        <div className="question-timer-container">
          <div className="question-timer grade-box">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="grade-container">0%</div>
            </motion.div>
            <h3>Examination Completed!</h3>
            <h4>Thank you for completing the Mathematics examination.</h4>
            <div className="score-box">
              <h6>Score</h6>
              <h2>0/10 points</h2>
            </div>
            <div className="score-box">
              <h6>Correct Questions</h6>
              <h2>0/10 questions</h2>
            </div>
            <button className="button return-button">
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="student-exam-view">
      <div className="question-timer-container">
        <div className="question-timer">
          <div className="question">
            <h6>Question 1 of 10</h6>
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow={0}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className="progress-bar" style={{ width: "0%" }}></div>
            </div>
          </div>
          <div className="timer">
            <Clock5 width={20} height={20} />
            <p>0:00</p>
          </div>
        </div>
      </div>
      <div className="question-timer-container">
        <div className="question-timer question-box">
          <h2>Which of these is not a mammal?</h2>
          <h6>5 points</h6>
          <div className="options">
            <AnimatePresence>
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleOptionSelect(index)}
                  className={`option ${
                    selectedOption === index ? "selected" : ""
                  } ${index === 1 ? "correct" : ""} ${
                    index === 2 ? "incorrect" : ""
                  }`}
                >
                  <p>{String.fromCharCode(65 + index)}</p>
                  <label>{option.text}</label>
                  <div className="answer-check">
                    <Check width={16} height={16} color="#22c55e" />
                  </div>
                  <div className="answer-x">
                    <XIcon width={16} height={16} color="#ef4444" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="feedback-container">
        <AnimatePresence>
          {showFeedback ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="feedback">
                <X />
                Good job!
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="action-buttons-container">
        <div className="action-buttons">
          <button
            className="button submit-button"
            // onClick={() => setShowFeedback(true)}
            data-bs-toggle="modal"
            data-bs-target="#confirm-submit-modal"
          >
            Submit Exam
          </button>
          <button
            // disabled={true}
            onClick={handleNextQuestion}
            className="button finish-button"
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
        className="modal"
        tabIndex={0}
        id="confirm-submit-modal"
        aria-labelledby="confirm-submit-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirm-submit-modal-label">
                Confirm Submission
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to submit the exam?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="button cancel"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
