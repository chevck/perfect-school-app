import { useFormik } from "formik";
import { FileChartColumn, User } from "lucide-react";
import { useState } from "react";
import StudentRegistrationSchema from "../utils/schemas/studentRegistration.schema";
import { getUserData, schoolPrefix } from "../utils";
import axios from "axios";

export function CreateStudentModal() {
  const userData = getUserData();
  const admissionNumber = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const schoolNamePrefix = schoolPrefix();
    return `${schoolNamePrefix}${randomNumber}`;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      admissionNumber: admissionNumber(),
      dateOfBirth: "",
      gender: "",
      email: "",
      teacher: "",
      class: "",
      joinDate: new Date().toISOString().split("T")[0],
      parent: "",
      address: "",
    },
    onSubmit: () => {
      handleSubmit();
    },
    validationSchema: StudentRegistrationSchema,
  });

  console.log("values", formik.values);
  console.log("errors", formik.errors);

  const handleSubmit = async () => {
    try {
      const { email, ...rest } = formik.values;
      const body = { ...rest, studentEmail: email };
      console.log({ body });
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student-create`,
        body,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div
      className="modal fade"
      id="create-student-modal"
      tabIndex={-1}
      aria-labelledby="create-student-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title fs-5" id="create-student-modal-label">
              <h1>Add New Student</h1>
              <p>
                Enter the student's information below. Required fields are
                marked with an asterisk (*).
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="first-name">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.firstName && formik.touched.firstName ? (
                    <span className="text-danger">
                      {formik.errors.firstName}
                    </span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="last-name">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.lastName && formik.touched.lastName ? (
                    <span className="text-danger">
                      {formik.errors.lastName}
                    </span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="admission-number">Admission Number *</label>
                  <input
                    type="text"
                    id="admissionNumber"
                    className="form-control"
                    value={formik.values.admissionNumber}
                    onChange={formik.handleChange}
                    disabled
                  />
                  {formik.errors?.admissionNumber &&
                  formik.touched.admissionNumber ? (
                    <span className="text-danger">
                      {formik.errors.admissionNumber}
                    </span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="date-of-birth">Date of Birth *</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    className="form-control"
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.dateOfBirth && formik.touched.dateOfBirth ? (
                    <span className="text-danger">
                      {formik.errors.dateOfBirth}
                    </span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="class">Class *</label>
                  <select
                    id="class"
                    className="form-select"
                    value={formik.values.class}
                    onChange={formik.handleChange}
                  >
                    <option disabled selected value="">
                      Select Class
                    </option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                  </select>
                  {formik.errors?.class && formik.touched.class ? (
                    <span className="text-danger">{formik.errors.class}</span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="teacher">Teacher *</label>
                  <select
                    id="teacher"
                    className="form-select"
                    value={formik.values.teacher}
                    onChange={formik.handleChange}
                  >
                    <option disabled selected value="">
                      Select Teacher
                    </option>
                    <option value="1">Teacher 1</option>
                    <option value="2">Teacher 2</option>
                    <option value="3">Teacher 3</option>
                    <option value="4">Teacher 4</option>
                  </select>
                  {formik.errors?.teacher && formik.touched.teacher ? (
                    <span className="text-danger">{formik.errors.teacher}</span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    className="form-select"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <option disabled selected value="">
                      Select Gender
                    </option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </select>
                  {formik.errors?.gender && formik.touched.gender ? (
                    <span className="text-danger">{formik.errors.gender}</span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="join-date">Join Date *</label>
                  <input
                    type="date"
                    id="joinDate"
                    className="form-control"
                    value={formik.values.joinDate}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.joinDate && formik.touched.joinDate ? (
                    <span className="text-danger">
                      {formik.errors.joinDate}
                    </span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="parent-name">Parent Name *</label>
                  <input
                    type="text"
                    id="parent"
                    className="form-control"
                    value={formik.values.parent}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.parent && formik.touched.parent ? (
                    <span className="text-danger">{formik.errors.parent}</span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.email && formik.touched.email ? (
                    <span className="text-danger">{formik.errors.email}</span>
                  ) : null}
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    className="form-control"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                  {formik.errors?.address && formik.touched.address ? (
                    <span className="text-danger">{formik.errors.address}</span>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="button cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button create"
              onClick={() => formik.handleSubmit()}
            >
              Create Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentDetailsTab() {
  return (
    <div className="student-details-tab">
      <div className="info-cards-container">
        <div className="info-card">
          <div className="info-card-header">
            <h3>Personal Information</h3>
          </div>
          <div className="info-card-body">
            <div className="info-card-item">
              <h4>Full Name</h4>
              <p>John Doe</p>
            </div>
            <div className="info-card-item">
              <h4>Date of Birth</h4>
              <p>21/02/2023</p>
            </div>
            <div className="info-card-item">
              <h4>Gender</h4>
              <p>Male</p>
            </div>
            <div className="info-card-item">
              <h4>Blood Group</h4>
              <p>A+</p>
            </div>
            <div className="info-card-item">
              <h4>Medical Conditions</h4>
              <p>None</p>
            </div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-header">
            <h3>Contact Information</h3>
          </div>
          <div className="info-card-body">
            <div className="info-card-item">
              <h4>Address</h4>
              <p>123 Main St, Anytown, USA</p>
            </div>
            <div className="info-card-item">
              <h4>Emergency Contact</h4>
              <p>Not specified</p>
            </div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-header">
            <h3>Academic Information</h3>
          </div>
          <div className="info-card-body">
            <div className="info-card-item">
              <h4>Class</h4>
              <p>Grade 9 B</p>
            </div>
            <div className="info-card-item">
              <h4>Teacher</h4>
              <p>Mr. John Doe</p>
            </div>
            <div className="info-card-item">
              <h4>Join Date</h4>
              <p>21/02/2023</p>
            </div>
          </div>
        </div>
        <div className="info-card">
          <div className="info-card-header">
            <h3>Fee Information</h3>
          </div>
          <div className="info-card-body">
            <div className="info-card-item">
              <h4>Status</h4>
              <p>
                <span className="custom-status">Pending</span>
              </p>
            </div>
            <div className="info-card-item">
              <h4>Due Amount</h4>
              <p>₹ 10,000</p>
            </div>
            <div className="info-card-item">
              <h4>Last Payment Date</h4>
              <p>No payment record</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentParentsTab() {
  return (
    <div className="student-details-tab">
      <div className="info-cards-container">
        <div className="info-card">
          <div className="info-card-header">
            <h3>Parent Information</h3>
          </div>
          <div className="info-card-body">
            <div className="info-card-item">
              <h4>Full Name</h4>
              <p>John Doe</p>
            </div>
            <div className="info-card-item">
              <h4>Date of Birth</h4>
              <p>21/02/2023</p>
            </div>
            <div className="info-card-item">
              <h4>Gender</h4>
              <p>Male</p>
            </div>
            <div className="info-card-item">
              <h4>Blood Group</h4>
              <p>A+</p>
            </div>
            <div className="info-card-item">
              <h4>Medical Conditions</h4>
              <p>None</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentSiblingsTab() {
  const sibling = null;
  return (
    <div className="student-details-tab">
      {!sibling ? (
        <div className="empty-state">
          <div className="icon-wrapper">
            <User className="icon" width={24} height={24} />
          </div>
          <h3>No siblings information available</h3>
        </div>
      ) : (
        <div className="info-cards-container">
          <div className="info-card">
            <div className="info-card-header">
              <h3>Sibling Information</h3>
            </div>
            <div className="info-card-body">
              <div className="info-card-item">
                <h4>Full Name</h4>
                <p>John Doe</p>
              </div>
              <div className="info-card-item">
                <h4>Date of Birth</h4>
                <p>21/02/2023</p>
              </div>
              <div className="info-card-item">
                <h4>Gender</h4>
                <p>Male</p>
              </div>
              <div className="info-card-item">
                <h4>Blood Group</h4>
                <p>A+</p>
              </div>
              <div className="info-card-item">
                <h4>Medical Conditions</h4>
                <p>None</p>
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-header">
              <h3>Contact Information</h3>
            </div>
            <div className="info-card-body">
              <div className="info-card-item">
                <h4>Address</h4>
                <p>123 Main St, Anytown, USA</p>
              </div>
              <div className="info-card-item">
                <h4>Emergency Contact</h4>
                <p>Not specified</p>
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-header">
              <h3>Academic Information</h3>
            </div>
            <div className="info-card-body">
              <div className="info-card-item">
                <h4>Class</h4>
                <p>Grade 9 B</p>
              </div>
              <div className="info-card-item">
                <h4>Teacher</h4>
                <p>Mr. John Doe</p>
              </div>
              <div className="info-card-item">
                <h4>Join Date</h4>
                <p>21/02/2023</p>
              </div>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-header">
              <h3>Fee Information</h3>
            </div>
            <div className="info-card-body">
              <div className="info-card-item">
                <h4>Status</h4>
                <p>
                  <span className="custom-status">Pending</span>
                </p>
              </div>
              <div className="info-card-item">
                <h4>Due Amount</h4>
                <p>₹ 10,000</p>
              </div>
              <div className="info-card-item">
                <h4>Last Payment Date</h4>
                <p>No payment record</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StudentAcademicTab() {
  return (
    <div className="student-academic-tab">
      <div className="info-cards-container">
        <div className="info-card">
          <div className="info-card-header">
            <h3>Academic Performance</h3>
            <h6>All Academic year performance</h6>
          </div>
          <div className="info-card-body">
            <div className="empty-state">
              <div className="icon-wrapper">
                <FileChartColumn className="icon" width={24} height={24} />
              </div>
              <h3>Academic performance data not available</h3>
            </div>
            {/* <div className="info-card-item">
              <h4>Status</h4>
              <p>
                <span className="custom-status">Pending</span>
              </p>
            </div>
            <div className="info-card-item">
              <h4>Due Amount</h4>
              <p>₹ 10,000</p>
            </div>
            <div className="info-card-item">
              <h4>Last Payment Date</h4>
              <p>No payment record</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ViewStudentDetailsModal() {
  const [activeTab, setActiveTab] = useState("details");
  return (
    <div
      className="modal fade"
      id="view-student-details-modal"
      tabIndex={-1}
      aria-labelledby="view-student-details-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div
              className="modal-title fs-5"
              id="view-student-details-modal-label"
            >
              <div className="student-intro">
                <div className="student-image-container">
                  <img
                    src="https://api.dicebear.com/7.x/adventurer/svg?seed=Jane"
                    alt="Jane"
                  />
                </div>
                <h5>Jane Cooper</h5>
                <div>
                  <span className="custom-status success">Active</span>
                </div>
              </div>
              <div className="student-info">
                Student ID: 123444 &#8226; Joined: 21/02/2023
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="tablist">
              <div
                className={`tab-item ${
                  activeTab === "details" ? "active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </div>
              <div
                className={`tab-item ${
                  activeTab === "parents" ? "active" : ""
                }`}
                onClick={() => setActiveTab("parents")}
              >
                Parents
              </div>
              <div
                className={`tab-item ${
                  activeTab === "siblings" ? "active" : ""
                }`}
                onClick={() => setActiveTab("siblings")}
              >
                Siblings
              </div>
              <div
                className={`tab-item ${
                  activeTab === "academic" ? "active" : ""
                }`}
                onClick={() => setActiveTab("academic")}
              >
                Academic
              </div>
            </div>
            {activeTab === "details" && <StudentDetailsTab />}
            {activeTab === "parents" && <StudentParentsTab />}
            {activeTab === "siblings" && <StudentSiblingsTab />}
            {activeTab === "academic" && <StudentAcademicTab />}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="button cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="button create">
              Edit Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RemoveStudentModal() {
  return (
    <div
      className="modal fade"
      id="remove-student-modal"
      tabIndex={-1}
      aria-labelledby="remove-student-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title" id="remove-student-modal-label">
              <h1>Remove Student</h1>
              <p>
                Are you sure you want to remove Sarah Williams from the system?
                This action cannot be undone.
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="button cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" className="button create">
              Remove Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
