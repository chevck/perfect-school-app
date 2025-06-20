import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { DashboardLayout } from "./components/dashboard-layout";
import { Billing } from "./pages/billing";
import { CreateBill } from "./pages/create-bill";
import { Teachers } from "./pages/teachers";
import { Examination } from "./pages/examination";
import { CreateExamination } from "./pages/create-examination";
import { ViewExaminationDetails } from "./pages/view-examination-details";
import { TakeExamComponent } from "./pages/take-exam";
import { StudentExamView } from "./pages/student-exam-view";
import { Students } from "./pages/students";
import { CompleteTeacherRegistration } from "./pages/complete-teacher-registration";
import { Settings } from "./pages/settings";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route
          path='/complete-teacher-registration/:teacherCode'
          element={<CompleteTeacherRegistration />}
        />
        <Route path='/' element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/teachers' element={<Teachers />} />
          <Route path='/parents' element={<Billing />} />
          <Route path='/students' element={<Students />} />
          <Route path='/examinations' element={<Examination />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
        <Route path='/create-bill' element={<CreateBill />} />
        <Route path='/edit-bill/:billId' element={<CreateBill />} />
        <Route path='/create-examination/:id' element={<CreateExamination />} />
        <Route
          path='/view-examination-details/:id'
          element={<ViewExaminationDetails />}
        />
        <Route path='/take-exam/:examId' element={<TakeExamComponent />} />
        <Route
          path='/take-exam/:examId/questions'
          element={<StudentExamView />}
        />
      </Routes>
    </BrowserRouter>
  );
}
