import { useEffect, useMemo, useState } from "react";
import { QuestionsList } from "./create-examination";
import {
  BookOpen,
  Calendar,
  ChartColumnIncreasing,
  CircleHelp,
  User,
  UserCircle,
} from "lucide-react";
import type { Question, Student } from "../../utils/types";
import { ShareExaminationModal } from "../../components/share-examination";
import useExamsStore from "../../dataset/exams.store";
import type { ExamsStore } from "../../dataset/store.types";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getStatusFamily } from "../../utils";
import useStudentsStore from "../../dataset/students.store";
import type { StudentStore } from "../../dataset/store.types";

export function ViewExaminationDetails() {
  const { id } = useParams();
  const [selectedTab, setSelectedTab] = useState("questions");
  const { fetchExamDetailsApi, examDetails } = useExamsStore() as ExamsStore;
  const { students, fetchStudentsApi } = useStudentsStore() as StudentStore;

  useEffect(() => {
    if (id) fetchExamDetailsApi(id);
  }, [id]);

  useEffect(() => {
    if (examDetails?.class) fetchStudentsApi({ class: examDetails?.class });
  }, [examDetails?.class]);

  const allStudents = useMemo(() => {
    return students.map((student) => {
      const examStudent = examDetails?.students.find(
        (examStudent: Partial<{ studentId: { _id: string } | string }>) => {
          if (
            typeof examStudent.studentId === "object" &&
            examStudent.studentId !== null
          ) {
            return examStudent.studentId._id === student._id;
          }
          return examStudent.studentId === student._id;
        }
      );
      if (examStudent) {
        return {
          ...student,
          examStatus: examStudent.status,
          examScore: examStudent.score || 0,
        };
      }
      return student;
    });
  }, [students, examDetails?.students]);

  return (
    <div className='view-examination-details'>
      <div className='header_'>
        <div className='title__'>
          <h3>{examDetails?.subject}</h3>
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
        <div className='controls'>
          <button className='button'>Upcoming</button>
          <button
            className='button'
            data-bs-toggle='modal'
            data-bs-target='#share-examination-modal'
          >
            <i className='bi bi-share'></i>Share
          </button>
          <button
            className='button'
            onClick={() => (window.location.href = `/create-examination/${id}`)}
          >
            Edit Questions
          </button>
          <button
            className='button'
            onClick={() => (window.location.href = "/examinations")}
          >
            Back to List
          </button>
        </div>
      </div>
      <div className='body'>
        <div className='exam-dets'>
          <div className=''>
            <h5>Teacher</h5>
            <p>{examDetails?.createdBy?.name}</p>
          </div>
          <div className=''>
            <h5>Date</h5>
            <p>{moment(examDetails?.examDate).format("Do MMM, YYYY")}</p>
          </div>
          <div className=''>
            <h5>Questions</h5>
            <p>{examDetails?.examQuestions.length}</p>
          </div>
          <div className=''>
            <h5>Total Marks</h5>
            <p>{examDetails?.totalMarks}</p>
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
            <div
              className='progress-bar'
              style={{
                width:
                  ((examDetails?.students.length || 0) /
                    (students.length || 0)) *
                    100 +
                  "%",
              }}
            ></div>
          </div>
          <div className='progresses'>
            <p>0%</p>
            <p>50% complete</p>
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
            Results
          </p>
        </div>
        <div className='content_body'>
          {selectedTab === "questions" && (
            <QuestionComponent questions={examDetails?.examQuestions || []} />
          )}
          {selectedTab === "students" && (
            <StudentsComponent students={allStudents || []} />
          )}
          {selectedTab === "result" && (
            <ResultsComponent students={allStudents || []} />
          )}
        </div>
      </div>
      <ShareExaminationModal exam={examDetails} />
    </div>
  );
}

function QuestionComponent({
  questions,
  formik,
}: {
  questions: [] | Question[];
  formik?: any;
}) {
  return (
    <div className=''>
      {questions.length ? (
        <div className='questions-container'>
          <QuestionsList
            viewMode={true}
            questions={questions || []}
            formik={formik || null}
          />
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

function StudentsComponent({ students }: { students: [] | Student[] }) {
  console.log({ students });

  const getGrade = (score: number) => {
    if (score >= 70) return "A";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    if (score >= 40) return "D";
    return "F";
  };

  const getStatus = (score: number) => {
    if (score >= 60) return "Passed";
    if (score >= 40) return "Average";
    return "Failed";
  };

  return (
    <div className=''>
      {students.length ? (
        <div className='students-container table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Exam Status</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td className='id'>{student.studentId}</td>
                  <td>
                    <span
                      className={`custom-status ${getStatusFamily(
                        student?.examStatus || "pending"
                      )}`}
                    >
                      {student?.examStatus || "Pending"}
                    </span>
                  </td>
                  <td className='score'>{student?.examScore || "-"}</td>
                  <td className='score'>
                    {student?.examScore ? getGrade(student?.examScore) : "-"}
                  </td>
                  <td className='score'>
                    {student?.examScore ? getStatus(student?.examScore) : "-"}
                  </td>
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

function ResultsComponent({ students }: { students: [] | Student[] }) {
  const results = [];

  const metrics = useMemo(() => {
    return {
      completed: students.filter(
        (student) => student.examStatus === "completed"
      ).length,
      passed: students.filter(
        (student) => student.examScore && student.examScore >= 60
      ).length,
      failed: students.filter(
        (student) => student.examScore && student.examScore < 60
      ).length,
      average:
        students.filter(
          (student) => student.examScore && student.examScore >= 40
        ).length / students.length,
    };
  }, [students]);

  console.log({ metrics });

  const completed = students.filter(
    (student) => student.examStatus === "completed"
  );
  const passed = students.filter(
    (student) => student.examScore && student.examScore >= 60
  );
  const failed = students.filter(
    (student) => student.examScore && student.examScore < 60
  );
  const average = students.filter(
    (student) => student.examScore && student.examScore >= 40
  );

  console.log({ completed, passed, failed, average });

  return (
    <div className=''>
      {!results.length ? (
        <div className='students-container'>
          <div className='examination-results'>
            <div className='examination-results-header'>
              <h4>Examination Results</h4>
              <h6>1 of 4 completed</h6>
            </div>
            <div className='examination-score-board'>
              <div className='section'>
                <h5>{completed.length}</h5>
                <p>Completed</p>
              </div>
              <div className='section'>
                <h5>{passed.length}</h5>
                <p>Passed (&gt;=60%)</p>
              </div>
              <div className='section'>
                <h5>{failed.length}</h5>
                <p>Failed (&lt;60%)</p>
              </div>
              <div className='section'>
                <h5>{average.length}%</h5>
                <p>Average Score</p>
              </div>
            </div>
          </div>
        </div>
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
