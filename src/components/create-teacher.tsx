import { useFormik } from "formik";
import TeacherSchema from "../utils/schemas/teacher.schema";
import axios from "axios";
import { toast } from "sonner";
import { getUserData } from "../utils";

export function CreateTeacher({
  handleGetTeachers,
}: {
  handleGetTeachers: () => void;
}) {
  const userData = getUserData();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      class: "",
      phone: "",
    },
    onSubmit: () => {
      handleCreateTeacher();
    },
    validationSchema: TeacherSchema,
  });

  const handleCreateTeacher = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/teacher-create`,
        formik.values,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Teacher invited successfully");
      handleGetTeachers();
      formik.resetForm();
      document.getElementById("close-create-teacher-modal")?.click();
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while inviting teacher");
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="create-teacher-modal"
      tabIndex={-1}
      aria-labelledby="create-teacher-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title fs-5" id="create-teacher-modal-label">
              <h1>Invite Teacher</h1>
              <p>
                Send an invitation to a new teacher to join the school platform.
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="close-create-teacher-modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                placeholder="Full name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <span className="text-danger">{formik.errors.name}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="email@example.com"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-danger">{formik.errors.email}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                className="form-control"
                placeholder="Subject to teach"
                id="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
              />
              {formik.errors.subject && formik.touched.subject ? (
                <span className="text-danger">{formik.errors.subject}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Class</label>
              <select
                className="form-select"
                id="class"
                value={formik.values.class}
                onChange={formik.handleChange}
              >
                {["Class 1", "Class 2", "Class 3"].map((el) => (
                  <option key={el}>Class 1</option>
                ))}
              </select>
              {formik.errors.class && formik.touched.class ? (
                <span className="text-danger">{formik.errors.class}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                className="form-control"
                placeholder="(555) 123-2300"
                id="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.errors.phone && formik.touched.phone ? (
                <span className="text-danger">{formik.errors.phone}</span>
              ) : null}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => formik.handleSubmit()}
            >
              Send invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
