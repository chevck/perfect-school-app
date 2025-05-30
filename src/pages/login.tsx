import { useEffect } from "react";
import { LogoComponent } from "../components/logo";
import axios from "axios";

export function LoginPage() {
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_GLOBAL_BE_URL}/test`).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <div className="registration-page-wrapper">
      <div className="registration-page animate__animated animate__fadeInUp animate__fast">
        <center>
          <LogoComponent />
        </center>
        <h3>Welcome back!</h3>
        <h6>Sign in to access your Perfect School App account</h6>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="John Doe" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="********"
          />
        </div>
        <button className="btn btn-primary create-account">Login</button>
        <h5 className="has-an-account-text">
          Don't have an account? <a href="/sign-up">Register</a>
        </h5>
      </div>
    </div>
  );
}
