import Logo from "../assets/perfect-school-app.svg";

export function Header() {
  return (
    <div className='header'>
      <img src={Logo} alt='Logo' className='img-fluid' />
    </div>
  );
}
