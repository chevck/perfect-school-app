import { useFormik } from "formik";
import ExamsSchema from "../utils/schemas/exams.schema";
import { useEffect } from "react";
import { CLASSES, getUserData, getUserRole } from "../utils";
import useTeachersStore from "../dataset/teachers.store";
import type { ExamsStore, TeacherStore } from "../dataset/store.types";
import useExamsStore from "../dataset/exams.store";

export function CreateExaminationModal() {
  const userData = getUserData();
  const userRole = getUserRole();
  const isTeacher = userRole === "teacher";

  const { teachers, fetchTeachersApi } = useTeachersStore() as TeacherStore;
  const { createExamsApi } = useExamsStore() as ExamsStore;

  const closeModal = () => {
    formik.resetForm();
    document.getElementById("close-create-examination-modal")?.click();
  };

  const formik = useFormik({
    initialValues: {
      subject: "",
      class: "",
      teacher: "",
      examinationDate: "",
      term: "",
      academicSession: "",
      totalMarks: "",
      duration: "",
      instructions: "",
    },
    onSubmit: () => createExamsApi(formik.values, () => closeModal()),
    validationSchema: ExamsSchema,
  });

  useEffect(() => {
    if (!teachers.length) fetchTeachersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userData?.teacherId)
      formik.setFieldValue("teacher", userData.teacherId);
    if (userData?.class) formik.setFieldValue("class", userData.class);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.teacherId, userData?.class]);

  // const handleCreateExamination = () => {
  //   return (window.location.href = "/create-examination");
  // };

  return (
    <div
      className='modal fade'
      id='create-examination-modal'
      tabIndex={-1}
      aria-labelledby='create-examination-modal-label'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title fs-5'
              id='create-examination-modal-label'
            >
              <h1>Create New Examination</h1>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              id='close-create-examination-modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='flex'>
              <div className='form-group'>
                <label>Subject</label>
                <select
                  className='form-control'
                  {...formik.getFieldProps("subject")}
                >
                  <option selected defaultChecked>
                    Select Subject
                  </option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Physics</option>
                </select>
                {formik.errors.subject && formik.touched.subject && (
                  <span className='text-danger'>{formik.errors.subject}</span>
                )}
              </div>
              <div className='form-group'>
                <label>Class</label>
                <select
                  className='form-control'
                  {...formik.getFieldProps("class")}
                >
                  <option selected disabled defaultChecked>
                    Select Class
                  </option>
                  {CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                {formik.errors.class && formik.touched.class && (
                  <span className='text-danger'>{formik.errors.class}</span>
                )}
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Teacher</label>
                {isTeacher ? (
                  <input
                    placeholder='Joseph Collins'
                    className='form-control'
                    disabled
                    value={
                      teachers.find(
                        (teacher) => teacher._id === formik.values.teacher
                      )?.name || ""
                    }
                  />
                ) : (
                  <select
                    className='form-control'
                    {...formik.getFieldProps("teacher")}
                  >
                    <option selected disabled defaultChecked>
                      Select Teacher
                    </option>
                    {teachers.map((teacher) => (
                      <option key={teacher._id} value={teacher._id}>
                        {teacher.name}
                      </option>
                    ))}
                  </select>
                )}
                {formik.errors.teacher && formik.touched.teacher && (
                  <span className='text-danger'>{formik.errors.teacher}</span>
                )}
              </div>
              <div className='form-group'>
                <label>Examination Date</label>
                <input
                  type='date'
                  className='form-control'
                  placeholder='Select Date'
                  {...formik.getFieldProps("examinationDate")}
                />
                {formik.errors.examinationDate &&
                  formik.touched.examinationDate && (
                    <span className='text-danger'>
                      {formik.errors.examinationDate}
                    </span>
                  )}
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Term</label>
                <select
                  className='form-control'
                  {...formik.getFieldProps("term")}
                >
                  <option selected defaultChecked>
                    Select Term
                  </option>
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Term 3</option>
                </select>
                {formik.errors.term && formik.touched.term && (
                  <span className='text-danger'>{formik.errors.term}</span>
                )}
              </div>
              <div className='form-group'>
                <label>Academic Session</label>
                <select
                  className='form-control'
                  {...formik.getFieldProps("academicSession")}
                >
                  <option selected defaultChecked>
                    Select Session
                  </option>
                  <option>2023/2024</option>
                  <option>2024/2025</option>
                  <option>2025/2026</option>
                </select>
                {formik.errors.academicSession &&
                  formik.touched.academicSession && (
                    <span className='text-danger'>
                      {formik.errors.academicSession}
                    </span>
                  )}
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Total Marks</label>
                <input
                  className='form-control'
                  placeholder='Total Marks'
                  type='number'
                  {...formik.getFieldProps("totalMarks")}
                />
                {formik.errors.totalMarks && formik.touched.totalMarks && (
                  <span className='text-danger'>
                    {formik.errors.totalMarks}
                  </span>
                )}
              </div>
              <div className='form-group'>
                <label>Duration (minutes)</label>
                <input
                  className='form-control'
                  placeholder='Duration'
                  type='number'
                  {...formik.getFieldProps("duration")}
                />
                {formik.errors.duration && formik.touched.duration && (
                  <span className='text-danger'>{formik.errors.duration}</span>
                )}
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Instructions</label>
                <textarea
                  className='form-control'
                  placeholder='Answer all questions. Each question carries the marks indicated.'
                  {...formik.getFieldProps("instructions")}
                />
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary cancel'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-primary'
              // onClick={handleCreateExamination}
              onClick={() => formik.handleSubmit()}
            >
              Create Examination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
