import { CreateExaminationModal } from "../../components/create-examination";
import { motion } from "motion/react";
import useExamsStore from "../../dataset/exams.store";
import type { ExamsStore } from "../../dataset/store.types";
import { useEffect } from "react";
import moment from "moment";
import { CLASSES, getStatusFamily } from "../../utils";
import { LoadingPage } from "../../components/loadingPage";

export function Examination() {
  const { exams, fetchExamsApi, pageLoading, updateExaminationApi } =
    useExamsStore() as ExamsStore;

  useEffect(() => {
    fetchExamsApi();
  }, []);

  return pageLoading ? (
    <LoadingPage />
  ) : (
    <div className='examination psa_d_page'>
      <div className='header_'>
        <h2 className='title'>Examination</h2>
        <button
          className='button'
          data-bs-toggle='modal'
          data-bs-target='#create-examination-modal'
        >
          <i className='bi bi-plus-lg'></i>
          New Examination
        </button>
      </div>
      <div className='filters'>
        <div className='form-filter'>
          <label>Subject</label>
          <select className='form-select'>
            <option selected>All Subjects</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
        </div>
        <div className='form-filter'>
          <label>Class</label>
          <select className='form-select'>
            <option selected>All Classes</option>
            {CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className='form-filter'>
          <label>Status</label>
          <select className='form-select'>
            <option selected>All Status</option>
            <option value='reviewed'>Reviewed</option>
            <option value='pending'>Pending</option>
          </select>
        </div>
        <div className='form-filter'>
          <label>Term</label>
          <select className='form-select'>
            <option selected>All Terms</option>
            <option value='first'>First Term</option>
            <option value='second'>Second Term</option>
            <option value='third'>Third Term</option>
          </select>
        </div>
      </div>
      <div className='examination-table table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Teacher</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!exams.length ? (
              <tr>
                <td colSpan={6} className='text-center'>
                  No exams found
                </td>
              </tr>
            ) : (
              exams.map((exam, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>
                    <h3>{exam.subject}</h3>
                    <p>
                      {exam.term} - {exam.session}
                    </p>
                  </td>
                  <td>{exam.class}</td>
                  <td>{exam.createdBy?.name}</td>
                  <td>{moment(exam.examDate).format("Do MMM, YYYY")}</td>
                  <td>
                    <span
                      className={`custom-status ${getStatusFamily(
                        exam.isReviewed ? "active" : "pending"
                      )}`}
                    >
                      {exam.isReviewed ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className='actions'>
                    {exam?.hasStarted ? null : (
                      <button
                        className='button'
                        onClick={() =>
                          (location.href = `/create-examination/${exam._id}`)
                        }
                      >
                        Set Questions
                      </button>
                    )}
                    {exam?.isReviewed && !exam?.hasStarted ? (
                      <button
                        className='button review'
                        onClick={() => {
                          updateExaminationApi(
                            { ...exam, hasStarted: true },
                            "You can start your exams now!! 🎉"
                          );
                        }}
                      >
                        Start Exam
                      </button>
                    ) : null}
                    {exam?.isReviewed ? null : (
                      <button
                        className='button review'
                        onClick={() =>
                          (location.href = `/review-examination/${exam._id}`)
                        }
                      >
                        Review
                      </button>
                    )}
                    <button
                      className='button'
                      onClick={() =>
                        (location.href = `/view-examination-details/${exam._id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <CreateExaminationModal />
    </div>
  );
}
