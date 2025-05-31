import { useState } from "react";
import { LogoComponent } from "../components/logo";
import axios from "axios";
import { useFormik } from "formik";
import LoginSchema from "../utils/schemas/login.schema";
import { AnimatePresence, motion } from "motion/react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { Loader } from "../components/loader";
import { getHourInMilliseconds, USER_INFORMATION } from "../utils";

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      verificationCode: "",
    },
    onSubmit: () => {
      handleLogin();
    },
    validationSchema: LoginSchema,
  });

  const handleBackToLogin = () => {
    setStep(1);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await axios.post(`${import.meta.env.VITE_GLOBAL_BE_URL}/psa/login`, {
        email: formik.values.email,
        password: formik.values.password,
      });
      formik.values.verificationCode = "";
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again later"
        );
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
    setIsLoading(false);
  };

  const handleVerifyAndSignIn = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/verify-email-otp`,
        {
          email: formik.values.email,
          otp: formik.values.verificationCode,
        }
      );
      const { message, ...rest } = res.data;
      localStorage.setItem(
        USER_INFORMATION,
        JSON.stringify({
          ...rest,
          expiresAt: new Date().getTime() + getHourInMilliseconds(24),
        })
      );
      toast.success(message);
      window.location.replace("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again later"
        );
      } else {
        toast.error("Something went wrong. Please try again later");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="registration-page-wrapper">
      {step === 1 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="registration-page"
          >
            <center>
              <LogoComponent />
            </center>
            <h3>Welcome back!</h3>
            <h6>Sign in to access your Perfect School App account</h6>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="John Doe"
                {...formik.getFieldProps("email")}
              />
              <span className="text-danger">{formik.errors.email}</span>
            </div>
            <div className="form-group">
              <div className="action-label-container">
                <label>Password</label>
                <a href="/forgot-password" className="forgot-password">
                  Forgot Password?
                </a>
              </div>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="********"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className="password-toggle-button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </span>
              </div>
              <span className="text-danger">{formik.errors.password}</span>
            </div>
            <button
              className="button create-account"
              type="submit"
              onClick={() => formik.handleSubmit()}
              disabled={
                isLoading || !formik.values.email || !formik.values.password
              }
            >
              {isLoading ? <Loader /> : "Continue with email verification"}
            </button>
            <h5 className="has-an-account-text">
              Don't have an account? <a href="/sign-up">Sign up</a>
            </h5>
          </motion.div>
        </AnimatePresence>
      ) : step === 2 ? (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="registration-page"
          >
            <center>
              <LogoComponent />
            </center>
            <h3>Welcome back, Piggy!</h3>
            <h6>Sign in to access your Perfect School App account</h6>
            <div className="verification-code-container">
              <h5>Verification code sent!</h5>
              <p>
                We've sent a 6-digit code to your email address. Please enter it
                below to continue.
              </p>
            </div>
            <div className="form-group">
              <label>Verification Code</label>
              <input
                type="text"
                className="form-control verification-code-input"
                placeholder="123456"
                {...formik.getFieldProps("verificationCode")}
              />
              {/* <span className="text-danger">{formik.errors.verificationCode}</span> */}
            </div>
            <button
              className="button create-account"
              type="submit"
              onClick={handleVerifyAndSignIn}
              disabled={isLoading || !formik.values.verificationCode}
            >
              {isLoading ? <Loader /> : "Verify & Sign in"}
            </button>
            <button
              className="button no-body create-account"
              type="submit"
              onClick={handleBackToLogin}
              disabled={isLoading}
            >
              Back to login
            </button>
            <h5 className="has-an-account-text">
              Don't have an account? <a href="/sign-up">Sign up</a>
            </h5>
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
