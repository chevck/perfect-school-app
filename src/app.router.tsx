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
import { USER_INFORMATION, logUserOut } from "./utils";

export function AppRouter() {
  const userInformation = localStorage.getItem(USER_INFORMATION);
  if (userInformation) {
    const { expiresAt } = JSON.parse(userInformation);
    if (expiresAt < new Date().getTime()) logUserOut();
  }
  if (
    !userInformation &&
    !["/sign-in", "/sign-up"].includes(window.location.pathname)
  ) {
    window.location.href = "/sign-in";
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/parents" element={<Billing />} />
          <Route path="/students" element={<Billing />} />
          <Route path="/examination" element={<Examination />} />
          <Route path="/settings" element={<Billing />} />
        </Route>
        <Route path="/create-bill" element={<CreateBill />} />
        <Route path="/create-examination" element={<CreateExamination />} />
        <Route
          path="/view-examination-details"
          element={<ViewExaminationDetails />}
        />
        <Route path="/take-exam/:examId" element={<TakeExamComponent />} />
        <Route
          path="/take-exam/:examId/questions"
          element={<StudentExamView />}
        />
      </Routes>
    </BrowserRouter>
  );
}
