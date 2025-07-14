/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";

const AddSubjectSchema = Yup.object().shape({
  subjectName: Yup.string().required("Subject name is required"),
});

export function AddSubjectModal({
  handleAddSubject,
}: {
  handleAddSubject: (subject: { name: string; description: string }) => void;
}) {
  const formik = useFormik({
    initialValues: {
      subjectName: "",
      description: "",
    },
    onSubmit: (values) => {
      handleAddSubject({
        name: values.subjectName,
        description: values.description,
      });
      formik.resetForm();
    },
    validationSchema: AddSubjectSchema,
  });

  return (
    <div
      className='modal fade'
      id={"add-subject-modal"}
      tabIndex={-1}
      aria-labelledby={`custom-modal-label add-subject-modal-label`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title'
              id={`custom-modal-label add-subject-modal-label`}
            >
              <h1>Add Subject</h1>
              <p>Add a new subject for your school</p>
            </div>
            <button
              type='button'
              className='btn-close'
              id={`close-add-subject-modal`}
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Subject Name</label>
              <input
                className='form-control'
                type='text'
                placeholder='Enter subject name'
                onChange={formik.handleChange}
                id='subjectName'
                value={formik.values.subjectName}
              />
              {formik.errors.subjectName && formik.touched.subjectName ? (
                <p className='text-danger'>{formik.errors.subjectName}</p>
              ) : null}
            </div>
            <div className='form-group'>
              <label>
                Description <i>(Optional)</i>
              </label>
              <input
                className='form-control'
                type='text'
                placeholder='Enter description'
                onChange={formik.handleChange}
                id='description'
                value={formik.values.description}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='button cancel'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='button create'
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
            >
              Add Subject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
