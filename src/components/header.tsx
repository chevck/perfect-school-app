import { LogoComponent } from "./logo";
import { USER_INFORMATION } from "../utils";
import { useEffect, useState } from "react";
import type { UserInformation } from "../utils/types";

export function Header() {
  const [userData, setUserData] = useState<UserInformation | null>(null);
  const isLoggedIn = !!localStorage.getItem(USER_INFORMATION);

  useEffect(() => {
    if (isLoggedIn) {
      setUserData(JSON.parse(localStorage.getItem(USER_INFORMATION) || "{}"));
    }
  }, [isLoggedIn]);

  return (
    <div className="header">
      <div className="logo-wrapper">
        <LogoComponent />
        <h3 className="full-school-name">Perfect School App</h3>
        <h3 className="short-school-name">PSA</h3>
      </div>
      {isLoggedIn ? (
        <div className="notification-section">
          <div className="notification-wrapper">
            <button>
              <i className="bi bi-bell"></i>
            </button>
            <span className="notification-count">1</span>
          </div>
          <div className="user-profile">
            <div className="user-profile-avatar">
              {userData?.schoolName?.charAt(0)}
            </div>
            <p>{userData?.schoolName}</p>
          </div>
        </div>
      ) : null}
      <button
        className="mobile-menu-bar"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <i className="bi bi-list"></i>
      </button>
      {isLoggedIn ? (
        <div className="notification-section mobile">
          <div className="notification-wrapper">
            <button>
              <i className="bi bi-bell"></i>
            </button>
            <span className="notification-count">1</span>
          </div>
          <div className="user-profile">
            <div className="user-profile-avatar">
              {userData?.schoolName?.charAt(0)}
            </div>
            <p>{userData?.schoolName}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
