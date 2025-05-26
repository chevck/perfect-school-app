import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Question {
  questionText: string;
  options: {
    text: string;
    correct: boolean;
  }[];
  correctOption: string;
  marks: number;
}

export function CreateExamination() {
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: "What is your name?",
      options: [
        { text: "John", correct: true },
        { text: "Doe", correct: false },
        { text: "Jane", correct: false },
        { text: "Doe", correct: false },
      ],
      correctOption: "John",
      marks: 1,
    };
    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className='create-examination'>
      <div className='title'>
        <h3>Set Questions for Examination</h3>
        <button className='button'>Save Examination</button>
      </div>
      <div className='exam-details'>
        <div className='dets'>
          <div className='det'>
            <h6>Subject</h6>
            <h3>Mathematics</h3>
          </div>
          <div className='det'>
            <h6>Class</h6>
            <h3>Class 1</h3>
          </div>
          <div className='det'>
            <h6>Term & Session</h6>
            <h3>First Term - 2025/2026</h3>
          </div>
        </div>
        <div className='question-det'>
          <h6>Questions Added: 0</h6>
          <h6>Total Marks: 0/100</h6>
        </div>
      </div>
      <div className='add-question-container'>
        <h3>Add New Question</h3>
        <div className='question-text'>
          <div className='form-group'>
            <label htmlFor='question-text'>Question Text</label>
            <textarea
              id='question-text'
              name='question-text'
              rows={4}
              className='form-control'
            />
          </div>
        </div>
        <div className='question-options'>
          <div className='flex'>
            <div className='form-group'>
              <label>Option 1</label>
              <input type='text' className='form-control' />
            </div>
            <div className='form-group'>
              <label>Option 2</label>
              <input type='text' className='form-control' />
            </div>
            <div className='form-group'>
              <label>Option 3</label>
              <input type='text' className='form-control' />
            </div>
            <div className='form-group'>
              <label>Option 4</label>
              <input type='text' className='form-control' />
            </div>
          </div>
        </div>
        <div className='correct-option'>
          <h6>Correct Option</h6>
          <div className='options'>
            <div>
              <input type='radio' />
              <label>Option 1</label>
            </div>
            <div>
              <input type='radio' />
              <label>Option 2</label>
            </div>
            <div>
              <input type='radio' />
              <label>Option 3</label>
            </div>
            <div>
              <input type='radio' />
              <label>Option 4</label>
            </div>
          </div>
        </div>
        <div className='marks'>
          <div className='form-group'>
            <label>Marks</label>
            <input className='form-control' placeholder='Marks' type='number' />
          </div>
        </div>
        <div className='button-container'>
          <button className='button' onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>
      </div>
      <div className='questions-container'>
        <h3>Questions ({questions.length})</h3>
        {questions.length ? (
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
                        Question {index + 1}{" "}
                        <span>({question.marks} marks)</span>
                      </h4>
                      <div className='actions'>
                        <button className='button'>Edit</button>
                        <button className='button'>Delete</button>
                      </div>
                    </div>
                    <h6>{question.questionText}</h6>
                    <div className='options'>
                      {question.options.map((option, index) => (
                        <div
                          className={`option ${
                            option.correct ? "correct" : ""
                          }`}
                          key={index}
                        >
                          <p>{String.fromCharCode(65 + index)}</p>
                          <label>{option.text}</label>
                          {option.correct ? <span>Correct</span> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className='no-questions'>
            No questions added yet. Use the form above to add questions.
          </p>
        )}
      </div>
    </div>
  );
}
