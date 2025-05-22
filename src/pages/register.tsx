import { LogoComponent } from "../components/logo";
import { useFormik } from "formik";
import SignupSchema from "../utils/schemas/registration.schema";

export function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      schoolLogo: "",
      fullName: "",
      email: "",
      schoolName: "",
      role: "Administrator",
      password: "",
      confirmPassword: "",
      terms: false,
      schoolThemeColor: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: SignupSchema,
  });

  const handleOpenImageUploader = () => {
    document.getElementById("upload-school-logo")?.click();
  };

  return (
    <div className='registration-page-wrapper'>
      <div className='registration-page animate__animated animate__fadeInUp animate__fast'>
        <center>
          <LogoComponent />
        </center>
        <h3>Create your account</h3>
        <h6>Get started with The Perfect School App</h6>
        <div className='form-group'>
          <label>School Logo</label>
          <div
            className='upload-image-wrapper'
            onClick={handleOpenImageUploader}
          >
            {formik.values.schoolLogo ? (
              <img src={formik.values.schoolLogo} alt='school-logo' />
            ) : null}
            <input
              type='file'
              {...formik.getFieldProps("schoolLogo")}
              id='upload-school-logo'
              accept='image/*'
            />
            <p>
              Upload your school logo or <b>Drag and drop</b>
            </p>
          </div>
          <span className='text-danger'>{formik.errors.schoolLogo}</span>
        </div>
        <div className='form-group'>
          <label>Full Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='John Doe'
            {...formik.getFieldProps("fullName")}
          />
          <span className='text-danger'>{formik.errors.fullName}</span>
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder='john.doe@example.com'
            {...formik.getFieldProps("email")}
          />
          <span className='text-danger'>{formik.errors.email}</span>
        </div>
        <div className='form-group'>
          <label>School Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='ABC School'
            {...formik.getFieldProps("schoolName")}
          />
          <span className='text-danger'>{formik.errors.schoolName}</span>
        </div>
        <div className='form-group'>
          <label>School Theme Color</label>
          <input
            type='color'
            className='form-control'
            {...formik.getFieldProps("schoolThemeColor")}
            value={formik.values.schoolThemeColor || "#ffffff"}
          />
          <span className='text-danger'>{formik.errors.schoolThemeColor}</span>
        </div>
        <div className='form-group'>
          <label>Your Role</label>
          <input
            type='text'
            value='Administrator'
            className='form-control'
            disabled
          />
          <span className='text-danger'>{formik.errors.role}</span>
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            {...formik.getFieldProps("password")}
          />
          <span className='text-danger'>{formik.errors.password}</span>
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <input
            type='password'
            className='form-control'
            {...formik.getFieldProps("confirmPassword")}
          />
          <span className='text-danger'>{formik.errors.confirmPassword}</span>
        </div>
        <div className='form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            {...formik.getFieldProps("terms")}
          />
          <label className='form-check-label'>
            I agree to the <a href='#'>Terms of Service</a> and{" "}
            <a href='#'>Privacy Policy</a>
          </label>
        </div>
        <button
          className='btn btn-primary create-account'
          type='submit'
          onClick={() => formik.handleSubmit()}
        >
          Create Account
        </button>
        <h5 className='has-an-account-text'>
          Already have an account? <a href='/sign-in'>Login</a>
        </h5>
      </div>
    </div>
  );
}
