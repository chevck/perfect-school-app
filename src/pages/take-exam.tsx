import { CheckCheckIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useExamsStore from "../dataset/exams.store";
import type { ExamsStore } from "../dataset/store.types";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { handleError } from "../utils";

export function TakeExamComponent() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { fetchExamDetailsApi, examDetails, loading } =
    useExamsStore() as ExamsStore;

  useEffect(() => {
    if (examId) fetchExamDetailsApi(examId);
  }, [examId]);

  const formik = useFormik({
    initialValues: {
      studentId: "",
      // password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleLoginStudent();
    },
    validationSchema: Yup.object({
      studentId: Yup.string().required("Student ID is required"),
    }),
  });

  const isExamExpired = moment(examDetails?.examDate).isBefore(moment());

  const handleLoginStudent = async () => {
    // navigate(`/take-exam/${examId}/questions`);
    try {
      formik.setSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/exam-login-student`,
        {
          examId,
          studentId: formik.values.studentId,
        }
      );
      console.log(response, "response");
      localStorage.setItem(
        "exam-login-student",
        JSON.stringify(response.data.student)
      );
      localStorage.setItem(
        "exam-login-student-expires-at",
        moment()
          .add(response.data.exam.duration + 10, "minutes")
          .format("YYYY-MM-DD HH:mm:ss")
      );
      localStorage.setItem("exam-login-auth-token", response.data.authToken);
      navigate(`/take-exam/${examId}/questions`, {
        state: { exam: response.data.exam },
      });
    } catch (error) {
      formik.setSubmitting(false);
      console.log(error, "error");
      handleError(error);
    }
  };

  return (
    <div className='take-exam-container'>
      {loading ? (
        <div className='take-exam-loading-container'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p>Loading examination details...</p>
        </div>
      ) : examDetails && examDetails?._id ? (
        <div className='take-exam-loading-container'>
          <div className='iconny'>
            <CheckCheckIcon width={32} height={32} />
          </div>
          <h2>{examDetails?.subject}</h2>
          <div className='grade'>
            {examDetails?.class} - {examDetails?.term} - {examDetails?.session}
          </div>
          {isExamExpired && (
            <div className='error-container'>
              <h6>This examination has expired. Please contact the teacher.</h6>
            </div>
          )}
          <div className='form-group'>
            <label>Student ID or Email</label>
            <input
              type='text'
              className='form-control'
              placeholder='Student ID or Email'
              {...formik.getFieldProps("studentId")}
              required
            />
            {formik.touched.studentId && formik.errors.studentId && (
              <div className='text-danger'>{formik.errors.studentId}</div>
            )}
          </div>
          {/* <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='**********'
              {...formik.getFieldProps("password")}
            />
          </div> */}
          <button
            className='button'
            onClick={() => formik.handleSubmit()}
            // onClick={() => {
            //   navigate(`/take-exam/${examId}/questions`);
            // }}
            disabled={isExamExpired || formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Start Examination"}
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
