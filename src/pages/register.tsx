import { LogoComponent } from "../components/logo";
import { useFormik } from "formik";
import SignupSchema from "../utils/schemas/registration.schema";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader } from "../components/loader";

export function RegisterPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { VITE_CLOUDINARY_CLOUD_NAME } = import.meta.env;
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
      acceptedTerms: false,
      address: "",
    },
    onSubmit: () => {
      handleRegisterSchool();
    },
    validationSchema: SignupSchema,
  });

  const handleOpenImageUploader = () => {
    document.getElementById("upload-school-logo")?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) =>
        formik.setFieldValue("schoolLogo", e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSchoolLogoToCloudinary = async () => {
    try {
      if (!imageFile) return;
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "perfect_school_app");
      const url = `https://api.cloudinary.com/v1_1/${VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const res = await axios.post(url, formData);
      return res.data.secure_url;
    } catch (error) {
      toast.error("There was an error uploading your school logo");
      console.log({ error });
      setIsLoading(false);
    }
  };

  const handleRegisterSchool = async () => {
    try {
      setIsLoading(true);
      const schoolLogo = await handleSaveSchoolLogoToCloudinary();
      if (!schoolLogo) {
        return toast.error("Please upload a valid school logo");
      }
      const body = {
        schoolName: formik.values.schoolName,
        logoUrl: schoolLogo,
        schoolThemeColor: formik.values.schoolThemeColor,
        adminName: formik.values.fullName,
        adminEmail: formik.values.email,
        schoolEmail: formik.values.email,
        role: formik.values.role,
        adminPassword: formik.values.password,
        address: formik.values.address,
      };
      await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/register`,
        body
      );
      toast.success(
        "You school has been registered successfully. Please check your email for next steps."
      );
      window.location.href = "/sign-in";
    } catch (error) {
      console.log("error registering school", error);
      toast.error(
        "There was an error registering your school. Please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='registration-page-wrapper'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='registration-page register'
        >
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
                <img
                  src={formik?.values?.schoolLogo}
                  alt='school-logo'
                  className='school-logo-img'
                />
              ) : (
                <>
                  <input
                    type='file'
                    id='upload-school-logo'
                    accept='image/*'
                    onChange={handleImageUpload}
                  />
                  <p>
                    Upload your school logo or <b>Drag and drop</b>
                  </p>
                </>
              )}
            </div>
            {imageFile ? (
              <span
                className='remove-image-btn text-danger'
                onClick={() => {
                  setImageFile(null);
                  formik.setFieldValue("schoolLogo", null);
                }}
              >
                Remove Image
              </span>
            ) : null}
            <span className='text-danger'>{formik.errors.schoolLogo}</span>
          </div>
          <div className='row'>
            <div className='col-12 col-md-6'>
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
            </div>
            <div className='col-12 col-md-6'>
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
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Address</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='123 Main St, Anytown, USA'
                  {...formik.getFieldProps("address")}
                />
                <span className='text-danger'>{formik.errors.address}</span>
              </div>
            </div>
            <div className='col-12 col-md-6'>
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
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>School Theme Color</label>
                <input
                  type='color'
                  className='form-control'
                  {...formik.getFieldProps("schoolThemeColor")}
                  value={formik.values.schoolThemeColor || "#ffffff"}
                />
                <span className='text-danger'>
                  {formik.errors.schoolThemeColor}
                </span>
              </div>
            </div>
            <div className='col-12 col-md-6'>
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
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  className='form-control'
                  {...formik.getFieldProps("password")}
                />
                <span className='text-danger'>{formik.errors.password}</span>
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  {...formik.getFieldProps("confirmPassword")}
                />
                <span className='text-danger'>
                  {formik.errors.confirmPassword}
                </span>
              </div>
            </div>
          </div>

          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              {...formik.getFieldProps("acceptedTerms")}
              checked={formik.values.acceptedTerms}
              onChange={(e) => {
                formik.setFieldValue("acceptedTerms", e.target.checked);
              }}
            />
            <label className='form-check-label'>
              I agree to the <a href='#'>Terms of Service</a> and{" "}
              <a href='#'>Privacy Policy</a>
            </label>
            <span className='text-danger'>{formik.errors.acceptedTerms}</span>
          </div>
          <button
            className='button create-account'
            type='submit'
            onClick={() => formik.handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Create Account"}
          </button>
          <h5 className='has-an-account-text'>
            Already have an account? <a href='/sign-in'>Login</a>
          </h5>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
