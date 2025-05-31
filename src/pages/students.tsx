import {
  Edit,
  Ellipsis,
  Plus,
  SearchIcon,
  Trash,
  User2,
  UserX,
} from "lucide-react";
import {
  CreateStudentModal,
  ViewStudentDetailsModal,
  RemoveStudentModal,
} from "../components/student.modal";
import { useState } from "react";

export function Students() {
  const [students] = useState([]);
  return (
    <div className="students psa_d_page">
      <div className="header_">
        <div className="title-container">
          <h2 className="title">Students</h2>
          <h6>Manage student records and information</h6>
        </div>
        <button
          className="button"
          data-bs-toggle="modal"
          data-bs-target="#create-student-modal"
        >
          <Plus />
          Add Student
        </button>
      </div>
      <div className="students-body">
        <div className="filters">
          <div className="input-filter">
            <SearchIcon width={14} height={14} className="search-icon" />
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
            />
          </div>
          <div className="select-filters">
            <select className="form-select" name="class" id="class">
              <option selected disabled value="">
                All Classes
              </option>
              <option value="">Class 1</option>
              <option value="">Class 2</option>
              <option value="">Class 3</option>
              <option value="">Class 4</option>
            </select>
            <select className="form-select" name="status" id="status">
              <option selected disabled value="">
                All Status
              </option>
              <option value="">Active</option>
              <option value="">Inactive</option>
            </select>
          </div>
        </div>
        <div className="students-table table-responsive">
          {!students.length ? (
            <div className="empty-state">
              <div className="icon-wrapper">
                <User2 />
              </div>
              <h3>No students found</h3>
              <p>Add a new student to get started</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Admission #</th>
                  <th>Class</th>
                  <th>Status</th>
                  <th>Fees (This term)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  return (
                    <tr key={student}>
                      <td className="student-info-container">
                        <div className="student-info">
                          <div className="student-image-container">
                            <img
                              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jane"
                              alt="Jane"
                            />
                          </div>
                          <div className="student-name">
                            <h6>Jane Cooper</h6>
                            <p>123456 &#8226; 15/05/2006</p>
                          </div>
                        </div>
                      </td>
                      <td>123456</td>
                      <td>Class 1</td>
                      <td>
                        <span className="custom-status success">Active</span>
                      </td>
                      <td>
                        <span className="custom-status warning">Pending</span>
                      </td>
                      <td>
                        <button
                          className="button no-body"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <Ellipsis width={16} height={16} />
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#view-student-details-modal"
                            >
                              View Details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <Edit />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <UserX />
                              Deactivate
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a
                              className="dropdown-item text-danger"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#remove-student-modal"
                            >
                              <Trash /> Remove
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <CreateStudentModal />
      <ViewStudentDetailsModal />
      <RemoveStudentModal />
    </div>
  );
}
