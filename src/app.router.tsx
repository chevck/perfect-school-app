import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { Dashboard } from "./pages/dashboard";
import { DashboardLayout } from "./components/dashboard-layout";
import { Billing } from "./pages/billing";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<RegisterPage />} />
        <Route path='/sign-in' element={<LoginPage />} />
        <Route path='/' element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/billing' element={<Billing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
