/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import * as Yup from "yup";

const AddClassSchema = Yup.object().shape({
  className: Yup.string().required("Class name is required"),
});

export function AddClassModal({
  handleAddClass,
}: {
  handleAddClass: (className: string) => void;
}) {
  const formik = useFormik({
    initialValues: {
      className: "",
    },
    onSubmit: (values) => {
      handleAddClass(values.className);
      formik.resetForm();
    },
    validationSchema: AddClassSchema,
  });

  return (
    <div
      className='modal fade'
      id={"add-class-modal"}
      tabIndex={-1}
      aria-labelledby={`custom-modal-label add-class-modal-label`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title'
              id={`custom-modal-label add-class-modal-label`}
            >
              <h1>Add Class</h1>
              <p>Add a new class for your school</p>
            </div>
            <button
              type='button'
              className='btn-close'
              id={`close-add-class-modal`}
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Class Name</label>
              <input
                className='form-control'
                type='text'
                placeholder='Enter class name'
                onChange={formik.handleChange}
                id='className'
                value={formik.values.className}
              />
              {formik.errors.className && formik.touched.className ? (
                <p className='text-danger'>{formik.errors.className}</p>
              ) : null}
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
              Add Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
