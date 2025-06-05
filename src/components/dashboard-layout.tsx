import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import {
  Book,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { getUserRole, logUserOut, TEACHER, USER_INFORMATION } from "../utils";

const SideBar = () => {
  const selectedPage = location.pathname.split("/")[1];
  const navigate = useNavigate();
  const userRole = getUserRole();
  const hasTeacherAccess = userRole === TEACHER;

  return (
    <div className="dashboard-sidebar">
      <ul>
        <li
          className={selectedPage === "dashboard" ? "active" : ""}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard width={18} height={18} />
          <a>Dashboard</a>
        </li>
        {!hasTeacherAccess && (
          <li
            className={selectedPage === "billing" ? "active" : ""}
            onClick={() => navigate("/billing")}
          >
            <CreditCard width={18} height={18} />
            <a>Billing</a>
          </li>
        )}
        <li
          className={selectedPage === "examination" ? "active" : ""}
          onClick={() => navigate("/examination")}
        >
          <Book width={18} height={18} />
          <a>Examination</a>
        </li>
        {!hasTeacherAccess && (
          <li
            className={selectedPage === "parents" ? "active" : ""}
            onClick={() => navigate("/parents")}
          >
            <Users width={18} height={18} />
            <a>Parents</a>
          </li>
        )}
        <li
          className={selectedPage === "students" ? "active" : ""}
          onClick={() => navigate("/students")}
        >
          <UserCheck width={18} height={18} />
          <a>Students</a>
        </li>
        {!hasTeacherAccess && (
          <li
            className={selectedPage === "teachers" ? "active" : ""}
            onClick={() => navigate("/teachers")}
          >
            <User width={18} height={18} />
            <a>Teachers</a>
          </li>
        )}
        <li
          className={selectedPage === "settings" ? "active" : ""}
          onClick={() => navigate("/settings")}
        >
          <Settings width={18} height={18} />
          <a>Settings</a>
        </li>
        <li onClick={() => logUserOut()}>
          <LogOut width={18} height={18} />
          <a>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export function DashboardLayout() {
  const nonAuthedRoutes = ["/sign-in", "/sign-up"];
  const userInformation = localStorage.getItem(USER_INFORMATION);
  if (userInformation) {
    const { expiresAt } = JSON.parse(userInformation);
    if (expiresAt < new Date().getTime()) logUserOut();
    else {
      if (nonAuthedRoutes.includes(window.location.pathname))
        window.location.href = "/dashboard";
    }
  }
  if (!userInformation && !nonAuthedRoutes.includes(window.location.pathname)) {
    window.location.href = "/sign-in";
  }

  return (
    <div className="dashboard-layout">
      <Header />
      <div className="dashboard-container">
        <div className="row">
          <div className="col-md-2 col-12 dashboard-sidebar-container">
            <SideBar />
          </div>
          <div className="col-md-10 col-12">
            <Outlet />
          </div>
        </div>
        <div
          className="offcanvas offcanvas-start header-menu"
          tabIndex={-1}
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
