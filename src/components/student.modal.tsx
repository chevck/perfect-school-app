import { useFormik } from "formik";
import { FileChartColumn, User } from "lucide-react";
import { useEffect, useState } from "react";
import StudentRegistrationSchema from "../utils/schemas/studentRegistration.schema";
import { getUserData, handleError, schoolPrefix } from "../utils";
import axios from "axios";
import useTeachersStore from "../dataset/teachers.store";
import type { StudentStore, TeacherStore } from "../dataset/store.types";
import Select from "react-select";
import useStudentsStore from "../dataset/students.store";
import moment from "moment";
import { toast } from "sonner";
import type { Student } from "../utils/types";
import { Loader } from "./loader";

export interface SelectOption {
  label: string;
  value: string;
}

export function CreateStudentModal() {
  const userData = getUserData();
  const { teachers, fetchTeachersApi } = useTeachersStore() as TeacherStore;
  const {
    addStudent,
    selectedStudent,
    updateStudent,
    setSelectedStudent,
    updateStudentApi,
    loading,
    setLoading,
  } = useStudentsStore() as StudentStore;
  const isEditAction = !!selectedStudent;

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
      teacherId: "",
      class: "",
      joinDate: "",
      parents: [] as string[],
      address: "",
    },
    onSubmit: () => (isEditAction ? handleEdit() : handleSubmit()),
    validationSchema: StudentRegistrationSchema,
  });

  useEffect(() => {
    if (!isEditAction) return formik.resetForm();
    if (isEditAction && selectedStudent) {
      formik.setValues({
        firstName: selectedStudent?.name.split(" ")[0] ?? "",
        lastName: selectedStudent?.name.split(" ")[1] ?? "",
        admissionNumber: selectedStudent?.admissionNumber ?? admissionNumber(),
        dateOfBirth: selectedStudent?.dob
          ? moment(selectedStudent.dob).format("YYYY-MM-DD")
          : new Date().toISOString().split("T")[0],
        gender: selectedStudent?.gender ?? "",
        email: selectedStudent?.email ?? "",
        teacherId:
          selectedStudent?.teacherId?._id ?? selectedStudent?.teacherId ?? "",
        class: selectedStudent?.class ?? "",
        joinDate: selectedStudent?.joinDate
          ? moment(selectedStudent.joinDate).format("YYYY-MM-DD")
          : new Date().toISOString().split("T")[0],
        parents: selectedStudent?.parents ?? [],
        address: selectedStudent?.address ?? "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction, selectedStudent]);

  useEffect(() => {
    if (!teachers.length) fetchTeachersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData?.teacherId)
      formik.setFieldValue("teacherId", userData.teacherId);
    if (userData?.class) formik.setFieldValue("class", userData.class);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.teacherId, userData?.class]);

  const handleEdit = async () => {
    try {
      const { email, ...rest } = formik.values;
      setLoading(true);
      const body = {
        ...rest,
        studentEmail: email,
        dob: moment(rest.dateOfBirth).format("YYYY-MM-DD"),
        name: `${rest.firstName} ${rest.lastName}`,
        joinDate: moment(rest.joinDate).format("YYYY-MM-DD"),
        _id: selectedStudent?._id,
      };
      const response = await updateStudentApi(body as unknown as Student);
      updateStudent(response);
      setSelectedStudent(null);
      formik.resetForm();
      document.getElementById("close-create-student-modal")?.click();
      toast.success("Student updated successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const { email, ...rest } = formik.values;
      const body = { ...rest, studentEmail: email };
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/student`,
        body,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      addStudent(response.data.student);
      formik.resetForm();
      document.getElementById("close-create-student-modal")?.click();
      toast.success("Student created successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const parentOptions: SelectOption[] = [
    { label: "Parent 1", value: "1" },
    { label: "Parent 2", value: "2" },
    { label: "Parent 3", value: "3" },
    { label: "Parent 4", value: "4" },
  ];

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
              <h1>{isEditAction ? "Edit Student" : "Add New Student"}</h1>
              <p>
                Enter the student's information below. Required fields are
                marked with an asterisk (*).
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="close-create-student-modal"
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
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                  </select>
                  {formik.errors?.class && formik.touched.class ? (
                    <span className="text-danger">{formik.errors.class}</span>
                  ) : null}
                </div>
                <div className="col-12 col-md-6 form-group">
                  <label htmlFor="teacherId">Teacher *</label>
                  <select
                    id="teacherId"
                    className="form-select"
                    value={formik.values.teacherId}
                    onChange={formik.handleChange}
                  >
                    <option disabled selected value="">
                      Select Teacher
                    </option>
                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                  {formik.errors?.teacherId && formik.touched.teacherId ? (
                    <span className="text-danger">
                      {formik.errors.teacherId}
                    </span>
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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
                  <label htmlFor="parent-name">Parent Name</label>
                  <Select
                    options={parentOptions}
                    // value={parentOptions.filter((option) =>
                    //   formik.values.parents.includes(option.value as string)
                    // )}
                    onChange={(value) =>
                      formik.setFieldValue(
                        "parents",
                        value?.map((o) => o.value) ?? []
                      )
                    }
                    className="custom-react-select"
                    classNamePrefix="select"
                    placeholder="Search Parent"
                    isSearchable={true}
                    isClearable={true}
                    isMulti={true}
                  />
                  {formik.errors?.parents && formik.touched.parents ? (
                    <span className="text-danger">{formik.errors.parents}</span>
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
              disabled={loading}
            >
              {loading ? (
                <Loader />
              ) : isEditAction ? (
                "Update Student"
              ) : (
                "Create Student"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentDetailsTab() {
  const { selectedStudent } = useStudentsStore() as StudentStore;

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
              <p>{selectedStudent?.name}</p>
            </div>
            <div className="info-card-item">
              <h4>Date of Birth</h4>
              <p>
                {selectedStudent?.dob
                  ? moment(selectedStudent.dob).format("Do MMM, YYYY")
                  : "-"}
              </p>
            </div>
            <div className="info-card-item">
              <h4>Gender</h4>
              <p>{selectedStudent?.gender}</p>
            </div>
            <div className="info-card-item">
              <h4>Blood Group</h4>
              <p>{selectedStudent?.bloodGroup ?? "-"}</p>
            </div>
            <div className="info-card-item">
              <h4>Medical Conditions</h4>
              <p>{selectedStudent?.medicalConditions ?? "-"}</p>
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
              <p>{selectedStudent?.address ?? "-"}</p>
            </div>
            <div className="info-card-item">
              <h4>Emergency Contact</h4>
              <p>{selectedStudent?.parents?.[0] ?? "-"}</p>
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
              <p>{selectedStudent?.class ?? "-"}</p>
            </div>
            <div className="info-card-item">
              <h4>Teacher</h4>
              <p>{selectedStudent?.teacherId?.name ?? "-"}</p>
            </div>
            <div className="info-card-item">
              <h4>Join Date</h4>
              <p>
                {selectedStudent?.joinDate
                  ? moment(selectedStudent.joinDate).format("Do MMM, YYYY")
                  : "-"}
              </p>
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
  const { selectedStudent } = useStudentsStore() as StudentStore;

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
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${selectedStudent?.name}`}
                    alt={selectedStudent?.name}
                  />
                </div>
                <h5>{selectedStudent?.name}</h5>
                <div>
                  <span
                    className={`custom-status ${
                      selectedStudent?.status === "active"
                        ? "success"
                        : "warning"
                    }`}
                  >
                    {selectedStudent?.status}
                  </span>
                </div>
              </div>
              <div className="student-info">
                Student ID: {selectedStudent?.studentId} &#8226; Joined:{" "}
                {selectedStudent?.joinDate
                  ? new Date(selectedStudent?.joinDate).toLocaleDateString()
                  : "N/A"}
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
  const { selectedStudent, deleteStudentApi, removeStudent } =
    useStudentsStore() as StudentStore;

  const handleRemoveStudent = async () => {
    try {
      await deleteStudentApi(selectedStudent?._id ?? "");
      removeStudent(selectedStudent?._id ?? "");
      toast.success("Student removed successfully");
      document.getElementById("close-remove-student-modal")?.click();
    } catch (error) {
      handleError(error);
    }
  };

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
                Are you sure you want to remove {selectedStudent?.name} from the
                system? This action cannot be undone.
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="close-remove-student-modal"
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
            <button
              type="submit"
              className="button create"
              onClick={handleRemoveStudent}
            >
              Remove Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
