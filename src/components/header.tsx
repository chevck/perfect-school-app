import { LogoComponent } from "./logo";

export function Header() {
  const isLoggedIn = location.pathname === "/dashboard";
  return (
    <div className='header'>
      <div className='logo-wrapper'>
        <LogoComponent />
        <h3>Perfect School App</h3>
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
    </div>
  );
}
