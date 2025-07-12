import { useEffect, useState } from "react";
import useExamsStore from "../dataset/exams.store";
import type { ExamsStore } from "../dataset/store.types";
import { LoadingPage } from "../components/loadingPage";
import { CLASSES, getStatusFamily } from "../utils";
import { motion } from "motion/react";
import moment from "moment";
// import { CreateExaminationModal } from "../components/create-examination";

export function AdminReviewExamination() {
  const [statuses, setStatuses] = useState({
    subject: "",
    term: "",
    class: "",
    status: "pending",
  });
  const { exams, fetchExamsApi, pageLoading } = useExamsStore() as ExamsStore;

  useEffect(() => {
    fetchExamsApi(statuses);
  }, [statuses]);

  return pageLoading ? (
    <LoadingPage />
  ) : (
    <div className='examination psa_d_page'>
      <div className='header_'>
        <h2 className='title'>Review Examination</h2>
        {/* <button
          className='button'
          data-bs-toggle='modal'
          data-bs-target='#create-examination-modal'
        >
          <i className='bi bi-plus-lg'></i>
          New Examination
        </button> */}
      </div>
      <div className='filters'>
        <div className='form-filter'>
          <label>Subject</label>
          <select
            className='form-select'
            onChange={({ target: { value } }) =>
              setStatuses({ ...statuses, subject: value })
            }
            value={statuses.subject}
          >
            <option selected value={""}>
              All Subjects
            </option>
            <option value='mathematics'>Mathematics</option>
            <option value='english'>English</option>
            <option value='science'>Science</option>
          </select>
        </div>
        <div className='form-filter'>
          <label>Class</label>
          <select
            className='form-select'
            onChange={({ target: { value } }) =>
              setStatuses({ ...statuses, class: value })
            }
            value={statuses.class}
          >
            <option selected value={""}>
              All Classes
            </option>
            {CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className='form-filter'>
          <label>Status</label>
          <select
            className='form-select'
            onChange={({ target: { value } }) =>
              setStatuses({ ...statuses, status: value })
            }
            value={statuses.status}
          >
            <option selected value={""}>
              All Status
            </option>
            <option value='reviewed'>Reviewed</option>
            <option value='pending'>Pending</option>
          </select>
        </div>
        <div className='form-filter'>
          <label>Term</label>
          <select
            className='form-select'
            onChange={({ target: { value } }) =>
              setStatuses({ ...statuses, term: value })
            }
            value={statuses.term}
          >
            <option selected value=''>
              All Terms
            </option>
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
      {/* <CreateExaminationModal /> */}
    </div>
  );
}
