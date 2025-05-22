import { LogoComponent } from "../components/logo";

export function RegisterPage() {
  return (
    <div className='registration-page-wrapper'>
      <div className='registration-page animate__animated animate__fadeInUp animate__fast'>
        <center>
          <LogoComponent />
        </center>
        <h3>Create your account</h3>
        <h6>Get started with The Perfect School App</h6>
        <div className='form-group'>
          <label>Full Name</label>
          <input type='text' className='form-control' placeholder='John Doe' />
        </div>
        <div className='form-group'>
          <label>Email</label>
          <input
            type='email'
            className='form-control'
            placeholder='john.doe@example.com'
          />
        </div>
        <div className='form-group'>
          <label>School Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='ABC School'
          />
        </div>
        <div className='form-group'>
          <label>Your Role</label>
          <input
            type='text'
            value='Administrator'
            className='form-control'
            disabled
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input type='password' className='form-control' />
        </div>
        <div className='form-group'>
          <label>Confirm Password</label>
          <input type='password' className='form-control' />
        </div>
        <div className='form-check'>
          <input type='checkbox' className='form-check-input' />
          <label className='form-check-label'>
            I agree to the <a href='#'>Terms of Service</a> and{" "}
            <a href='#'>Privacy Policy</a>
          </label>
        </div>
        <button className='btn btn-primary create-account'>
          Create Account
        </button>
        <h5 className='has-an-account-text'>
          Already have an account? <a href='/sign-in'>Login</a>
        </h5>
      </div>
    </div>
  );
}
