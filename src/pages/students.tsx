import {
  Edit,
  Ellipsis,
  Plus,
  SearchIcon,
  Trash,
  User2,
  UserX,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  CreateStudentModal,
  ViewStudentDetailsModal,
  RemoveStudentModal,
} from "../components/student.modal";
import type { StudentStore } from "../dataset/store.types.tsx";
import useStudentsStore from "../dataset/students.store.tsx";
import type { Student } from "../utils/types.tsx";
import { CustomModal } from "../components/custom-modal.tsx";
import { getStatusFamily } from "../utils/index.tsx";
import { toast } from "sonner";

export function Students() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{
    class: string;
    status: string;
    searchTerm: string;
  }>({
    class: "",
    status: "",
    searchTerm: "",
  });
  const {
    students,
    fetchStudentsApi,
    setSelectedStudent,
    selectedStudent,
    updateStudentApi,
    updateStudent,
  } = useStudentsStore() as StudentStore;

  useEffect(() => {
    fetchStudentsApi(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.class, filters.status, filters.searchTerm]);

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      setFilters({ ...filters, searchTerm: debouncedSearchTerm });
    }, 500);
    return () => clearTimeout(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleEditUser = async () => {
    const body = {
      status: selectedStudent?.status === "active" ? "inactive" : "active",
      _id: selectedStudent?._id,
    };
    const response = await updateStudentApi(body as unknown as Student);
    updateStudent(response);
    document.getElementById("close-custom-modal-edit-student-modal")?.click();
    toast.success("Student updated successfully");
  };

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
          onClick={() => setSelectedStudent(null)}
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
              value={debouncedSearchTerm}
              onChange={(e) => setDebouncedSearchTerm(e.target.value)}
            />
          </div>
          <div className="select-filters">
            <select
              className="form-select"
              name="class"
              id="class"
              onChange={(e) => {
                setFilters({ ...filters, class: e.target.value });
              }}
            >
              <option selected disabled value="">
                All Classes
              </option>
              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
            </select>
            <select
              className="form-select"
              name="status"
              id="status"
              onChange={(e) => {
                setFilters({ ...filters, status: e.target.value });
              }}
            >
              <option selected disabled value="">
                All Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
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
                    <tr key={student._id}>
                      <td className="student-info-container">
                        <div className="student-info">
                          <div className="student-image-container">
                            <img
                              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${student.name}`}
                              alt={student.name}
                            />
                          </div>
                          <div className="student-name">
                            <h6>{student.name}</h6>
                            <p>
                              {student.studentId} &#8226;{" "}
                              {new Date(student.joinDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>{student.admissionNumber}</td>
                      <td>{student.class}</td>
                      <td>
                        <span
                          className={`custom-status ${getStatusFamily(
                            student.status
                          )}`}
                        >
                          {student.status}
                        </span>
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
                              onClick={() => setSelectedStudent(student)}
                            >
                              View Details
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#create-student-modal"
                              onClick={() => setSelectedStudent(student)}
                            >
                              <Edit />
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target="#edit-student-modal"
                              onClick={() => setSelectedStudent(student)}
                            >
                              {student.status === "active" ? (
                                <>
                                  <UserX />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <User2 />
                                  Activate
                                </>
                              )}
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
                              onClick={() => setSelectedStudent(student)}
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
      <CustomModal
        title="Edit Student"
        description="Are you sure you want to edit this student?"
        onConfirm={() => handleEditUser()}
        onCancel={() => setSelectedStudent(null)}
        confirmButtonText="Edit"
        customId="edit-student-modal"
      />
    </div>
  );
}
