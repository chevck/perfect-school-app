import { CheckCheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ExamDetails } from "../utils/types";

export function TakeExamComponent() {
  const [loading, setLoading] = useState(true);
  const [examDetails, setExamDetails] = useState<null | ExamDetails>(null);

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      setTimeout(() => {
        setExamDetails({
          name: "Mathematics Examination",
          grade: "Grade 10",
          term: "First Term",
          year: "2023/2024",
          teacher: "John Doe",
          date: "26th May, 2025",
          questions: 10,
          totalMarks: 0,
          id: 1,
        });
        setLoading(false);
      }, 2000);
      // const response = await fetch(
      //   `http://localhost:3000/api/exams/${examId}`
      // );
      // const data = await response.json();
      // setExamDetails(data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching exam details:", error);
      setLoading(false);
    }
  };

  console.log({ examDetails });

  return (
    <div className='take-exam-container'>
      {loading ? (
        <div className='take-exam-loading-container'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p>Loading examination details...</p>
        </div>
      ) : examDetails && examDetails?.id ? (
        <div className='take-exam-loading-container'>
          <div className='iconny'>
            <CheckCheckIcon width={32} height={32} />
          </div>
          <h2>{examDetails?.name}</h2>
          <div className='grade'>
            {examDetails?.grade} - {examDetails?.term} - {examDetails?.year}
          </div>
          <div className='error-container'>
            <h6>Student not found for this examination </h6>
          </div>
          <div className='form-group'>
            <label>Student ID or Email</label>
            <input
              type='text'
              className='form-control'
              placeholder='Student ID or Email'
            />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='**********'
            />
          </div>
          <button className='button'>Start Examination</button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
