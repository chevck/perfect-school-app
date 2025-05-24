import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

const SideBar = () => {
  const selectedPage = location.pathname.split("/")[1];
  return (
    <div className='dashboard-sidebar'>
      <ul>
        <li
          className={selectedPage === "dashboard" ? "active" : ""}
          onClick={() => (window.location.href = "/dashboard")}
        >
          <i className='bi bi-house'></i>
          <a href='/dashboard'>Dashboard</a>
        </li>
        <li
          className={selectedPage === "billing" ? "active" : ""}
          onClick={() => (window.location.href = "/billing")}
        >
          <i className='bi bi-cash'></i>
          <a href='/billing'>Billing</a>
        </li>
        <li
          className={selectedPage === "examination" ? "active" : ""}
          onClick={() => (window.location.href = "/examination")}
        >
          <i className='bi bi-book'></i>
          <a href='/examination'>Examination</a>
        </li>
        <li
          className={selectedPage === "parents" ? "active" : ""}
          onClick={() => (window.location.href = "/parents")}
        >
          <i className='bi bi-people'></i>
          <a href='/parents'>Parents</a>
        </li>
        <li
          className={selectedPage === "students" ? "active" : ""}
          onClick={() => (window.location.href = "/students")}
        >
          <i className='bi bi-person-check'></i>
          <a href='/students'>Students</a>
        </li>
        <li
          className={selectedPage === "teachers" ? "active" : ""}
          onClick={() => (window.location.href = "/teachers")}
        >
          <i className='bi bi-person'></i>
          <a href='/teachers'>Teachers</a>
        </li>
        <li
          className={selectedPage === "settings" ? "active" : ""}
          onClick={() => (window.location.href = "/settings")}
        >
          <i className='bi bi-gear'></i>
          <a href='/settings'>Settings</a>
        </li>
      </ul>
    </div>
  );
};

export function DashboardLayout() {
  return (
    <div className='dashboard-layout'>
      <Header />
      <div className='dashboard-container'>
        <div className='row'>
          <div className='col-md-2 col-12 dashboard-sidebar-container'>
            <SideBar />
          </div>
          <div className='col-md-10 col-12'>
            <Outlet />
          </div>
        </div>
        <div
          className='offcanvas offcanvas-start header-menu'
          tabIndex={-1}
          id='offcanvasExample'
          aria-labelledby='offcanvasExampleLabel'
        >
          <div className='offcanvas-header'>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>
          <div className='offcanvas-body'>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
