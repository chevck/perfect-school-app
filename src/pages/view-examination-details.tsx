import { useState } from "react";
import { QuestionsList } from "./create-examination";
import { ChartColumnIncreasing, CircleHelp, UserCircle } from "lucide-react";
import type { Question } from "../utils/types";
import { ShareExaminationModal } from "../components/share-examination";

export function ViewExaminationDetails() {
  const [selectedTab, setSelectedTab] = useState("questions");
  return (
    <div className='view-examination-details'>
      <div className='header_'>
        <div className='title__'>
          <h3>Mathematics Examination</h3>
          <h6>Grade 10 - First Term - 2023/2024</h6>
        </div>
        <div className='controls'>
          <button className='button'>Upcoming</button>
          <button
            className='button'
            data-bs-toggle='modal'
            data-bs-target='#share-examination-modal'
          >
            <i className='bi bi-share'></i>Share
          </button>
          <button className='button'>Edit Questions</button>
          <button
            className='button'
            onClick={() => (window.location.href = "/examination")}
          >
            Back to List
          </button>
        </div>
      </div>
      <div className='body'>
        <div className='exam-dets'>
          <div className=''>
            <h5>Teacher</h5>
            <p>John Doe</p>
          </div>
          <div className=''>
            <h5>Date</h5>
            <p>26th May, 2025</p>
          </div>
          <div className=''>
            <h5>Questions</h5>
            <p>10</p>
          </div>
          <div className=''>
            <h5>Total Marks</h5>
            <p>0/100</p>
          </div>
          <div></div>
        </div>
        <div className='completion-status'>
          <h6>Completion Status</h6>
          <div
            className='progress'
            role='progressbar'
            aria-label='Basic example'
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className='progress-bar' style={{ width: "0%" }}></div>
          </div>
          <div className='progresses'>
            <p>0%</p>
            <p>0% complete</p>
            <p>100%</p>
          </div>
        </div>
      </div>
      <div className='content'>
        <div className='menu'>
          <p
            className={selectedTab === "questions" ? "active" : ""}
            onClick={() => setSelectedTab("questions")}
          >
            Questions
          </p>
          <p
            className={selectedTab === "students" ? "active" : ""}
            onClick={() => setSelectedTab("students")}
          >
            Students
          </p>
          <p
            className={selectedTab === "result" ? "active" : ""}
            onClick={() => setSelectedTab("result")}
          >
            Result
          </p>
        </div>
        <div className='content_body'>
          {selectedTab === "questions" && <QuestionComponent />}
          {selectedTab === "students" && <StudentsComponent />}
          {selectedTab === "result" && <ResultsComponent />}
        </div>
      </div>
      <ShareExaminationModal />
    </div>
  );
}

function QuestionComponent() {
  const questions: [] | Question[] = [];
  return (
    <div className=''>
      {questions.length ? (
        <div className='questions-container'>
          <QuestionsList questions={questions} />
        </div>
      ) : (
        <div className='no-question-container'>
          <div className='no-question-icon'>
            <CircleHelp width={32} height={32} color='#9ca3af' />
          </div>
          <h6>No questions added yet</h6>
          <p>This examination doesn't have any questions yet.</p>
          <button
            className='button'
            onClick={() => (window.location.href = "/create-examination")}
          >
            Add Questions
          </button>
        </div>
      )}
    </div>
  );
}

function StudentsComponent() {
  const students = [
    {
      name: "John Doe",
      studentId: "123456789",
      status: "Completed", // pending or completed
      score: 23,
    },
  ];
  return (
    <div className=''>
      {students.length ? (
        <div className='students-container table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Status</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.name}</td>
                  <td className='id'>{student.studentId}</td>
                  <td>
                    <span className='custom-status'>{student.status}</span>
                  </td>
                  <td className='score'>{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='no-question-container'>
          <div className='no-question-icon'>
            <UserCircle width={32} height={32} color='#9ca3af' />
          </div>
          <h6>No students added yet</h6>
          <p>Students will show after they have been added.</p>
          {/* <button
            className='button'
            onClick={() => (window.location.href = "/create-examination")}
          >
            Add Questions
          </button> */}
        </div>
      )}
    </div>
  );
}

function ResultsComponent() {
  const results = [];
  return (
    <div className=''>
      {results.length ? (
        <div className='students-container'></div>
      ) : (
        <div className='no-question-container'>
          <div className='no-question-icon'>
            <ChartColumnIncreasing width={32} height={32} color='#9ca3af' />
          </div>
          <h6>Results Not Available</h6>
          <p>
            Results will be available after students complete the examination.
          </p>
        </div>
      )}
    </div>
  );
}
