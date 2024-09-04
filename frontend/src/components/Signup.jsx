import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleError, handleSuccess } from "/utils";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }
    try {
      const url = `http://localhost:3000/api/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form className="w-50 border-outline" onSubmit={handleSignup}>
        <div class="form-group container">
          <label for="exampleInputEmail1">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            class="form-control "
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Name..."
            value={signupInfo.name}
            required
          />
          <label for="exampleInputEmail1">Email address</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email..."
            value={signupInfo.email}
            required
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group container">
          <label for="exampleInputPassword1">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password..."
            value={signupInfo.password}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-info">
          Signup
        </button>
        <span>
          Already have an account ?<Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
