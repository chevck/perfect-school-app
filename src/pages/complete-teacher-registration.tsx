import { useEffect, useState } from "react";
import { LogoComponent } from "../components/logo";
import axios from "axios";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { Loader } from "../components/loader";
import { handleError } from "../utils";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { Teacher } from "../utils/types";
import { TeacherRegistrationSchema } from "../utils/schemas/teacher.schema";

export function CompleteTeacherRegistration() {
  const { teacherCode } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const [allowFormFill, setAllowFormFill] = useState(true);
  const [teacherDetails, setTeacherDetails] = useState<Teacher | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: teacherDetails?.name || "",
      qualification: "",
      yearsOfExperience: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    onSubmit: () => {
      handleCompleteRegistration();
    },
    validationSchema: TeacherRegistrationSchema,
  });

  useEffect(() => {
    if (!accessToken) {
      toast.error("Invalid registration link");
      navigate("/");
    }
    if (teacherDetails?._id) {
      formik.setValues({
        ...formik.values,
        name: teacherDetails.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherDetails]);

  console.log({ pageLoading });

  const handleGetTeacherDetails = async () => {
    if (!teacherCode) return;
    try {
      setPageLoading(true);
      const response = await axios.get(
        `${
          import.meta.env.VITE_GLOBAL_BE_URL
        }/psa/teacher-by-code/${teacherCode}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTeacherDetails(response.data.teacher);
    } catch (error) {
      setAllowFormFill(false);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again later"
        );
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
    setPageLoading(false);
  };

  const handleCompleteRegistration = async () => {
    if (!teacherCode) return;
    try {
      setIsLoading(true);
      await axios.post(
        `${
          import.meta.env.VITE_GLOBAL_BE_URL
        }/psa/complete-teacher-registration`,
        {
          ...formik.values,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Registration completed successfully. Proceed to login");
      navigate("/sign-in");
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetTeacherDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherCode]);

  return (
    <div className='registration-page-wrapper'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='registration-page'
        >
          <center>
            <LogoComponent />
          </center>
          <h3>Welcome {teacherDetails?.name || "to Perfect School App"}!</h3>
          <h6>Complete your registration to access your account</h6>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='John Doe'
              id='name'
              disabled={!allowFormFill}
              {...formik.getFieldProps("name")}
            />
            {formik.errors.name && formik.touched.name ? (
              <span className='text-danger'>{formik.errors.name}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <label>Qualification</label>
            <input
              type='text'
              className='form-control'
              placeholder='e.g Ph.D, M.Ed, B.Ed, etc.'
              id='qualification'
              disabled={!allowFormFill}
              {...formik.getFieldProps("qualification")}
            />
            {formik.errors.qualification && formik.touched.qualification ? (
              <span className='text-danger'>{formik.errors.qualification}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <label>Years of Experience</label>
            <input
              type='text'
              className='form-control'
              placeholder='e.g 5'
              id='yearsOfExperience'
              disabled={!allowFormFill}
              {...formik.getFieldProps("yearsOfExperience")}
            />
            {formik.errors.yearsOfExperience &&
            formik.touched.yearsOfExperience ? (
              <span className='text-danger'>
                {formik.errors.yearsOfExperience}
              </span>
            ) : null}
          </div>
          <div className='form-group'>
            <label>Address</label>
            <input
              type='text'
              className='form-control'
              placeholder='e.g 123 Main St, Anytown, USA'
              id='address'
              disabled={!allowFormFill}
              {...formik.getFieldProps("address")}
            />
            {formik.errors.address && formik.touched.address ? (
              <span className='text-danger'>{formik.errors.address}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <div className='action-label-container'>
              <label>Password</label>
            </div>
            <div className='password-input-container'>
              <input
                type={showPassword ? "text" : "password"}
                className='form-control'
                placeholder='********'
                disabled={!allowFormFill}
                id='password'
                {...formik.getFieldProps("password")}
              />
              <span
                className='password-toggle-button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
              <span className='text-danger'>{formik.errors.password}</span>
            ) : null}
          </div>
          <div className='form-group'>
            <div className='action-label-container'>
              <label>Confirm Password</label>
            </div>
            <div className='password-input-container'>
              <input
                type={showPassword ? "text" : "password"}
                className='form-control'
                placeholder='********'
                id='confirmPassword'
                disabled={!allowFormFill}
                {...formik.getFieldProps("confirmPassword")}
              />
              <span
                className='password-toggle-button'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </span>
            </div>
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <span className='text-danger'>
                {formik.errors.confirmPassword}
              </span>
            ) : null}
          </div>
          <button
            className='button create-account'
            type='submit'
            onClick={() => {
              if (!allowFormFill) return;
              formik.handleSubmit();
            }}
            disabled={
              isLoading ||
              !formik.values.name ||
              !formik.values.qualification ||
              !formik.values.yearsOfExperience ||
              !formik.values.password ||
              !formik.values.confirmPassword ||
              !formik.values.address
            }
          >
            {isLoading ? <Loader /> : "Complete Setup"}
          </button>
          <h5 className='has-an-account-text'>
            Have completed registration?{" "}
            <a href='/sign-in'>Sign in to continue</a>
          </h5>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
