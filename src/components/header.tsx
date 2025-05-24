import { LogoComponent } from "./logo";

export function Header() {
  const isLoggedIn = true;
  // const isLoggedIn = location.pathname === "/dashboard";
  const selectedPage = location.pathname.split("/")[1];

  return (
    <div className='header'>
      <div className='logo-wrapper'>
        <LogoComponent />
        <h3 className='full-school-name'>Perfect School App</h3>
        <h3 className='short-school-name'>PSA</h3>
      </div>
      {isLoggedIn ? (
        <div className='notification-section'>
          <div className='notification-wrapper'>
            <button>
              <i className='bi bi-bell'></i>
            </button>
            <span className='notification-count'>1</span>
          </div>
          <div className='user-profile'>
            <div className='user-profile-avatar'>JD</div>
            <p>John Doe</p>
          </div>
        </div>
      ) : null}
      <button
        className='mobile-menu-bar'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasExample'
        aria-controls='offcanvasExample'
      >
        <i className='bi bi-list'></i>
      </button>
      {isLoggedIn ? (
        <div className='notification-section mobile'>
          <div className='notification-wrapper'>
            <button>
              <i className='bi bi-bell'></i>
            </button>
            <span className='notification-count'>1</span>
          </div>
          <div className='user-profile'>
            <div className='user-profile-avatar'>JD</div>
            <p>John Doe</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
