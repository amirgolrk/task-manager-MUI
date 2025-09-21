/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./SignUpForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {ChangeEvent} from "react"
import toaster from "../helpers/toaster";

const SignUpForm = () => {
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
    //sam
  const handleInputChange = (event : ChangeEvent<HTMLInputElement>, setInput: React.Dispatch<React.SetStateAction<string>> ) => {
    const { name, value } = event.target;
    setInput(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const submitHandler = async (event :React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password1 !== password2) {
      toaster("Passwords don't match","error",3000)
      return;
    }

    try {
      const formData = {
        email: email,
        password: password1
      };

      const response = await axios.post("http://localhost:4000/register", formData);
      const token = response.data.accessToken;
      console.log(token);
      localStorage.setItem('token', token);
      toaster("Registration successful","success",3000)
      await navigate("/");
    } catch (error : any) {
      console.log(error?.message);
      toaster(error?.message,"error",3000)
    }

    setPassword1('');
    setPassword2('');
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <div className="form-box">
            <form className="form" onSubmit={submitHandler}>
              <span className="title">Sign up</span>
              <hr />
              <span className="subtitle">
                Create a free account with your email.
              </span>
              <div className="form-container">
                <input type="email" name="email" className="input" placeholder="Email" value={email} onChange={(event) => handleInputChange(event, setEmail)} />
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
                  name="password"
                  className="input"
                  placeholder="Password"
                  value={password1}
                  onChange={(event) => handleInputChange(event, setPassword1)}
                />
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
                  name="password"
                  className="input"
                  placeholder="Repeat password"
                  value={password2}
                  onChange={(event) => handleInputChange(event, setPassword2)}
                />
              </div>
              <button type="submit">Sign up</button>
              {/* Visibility toggle button */}
              <button type="button" className="bg-info" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </form>
            <div className="form-section">
              <p>
                Have an account? <Link to={"/login"}>Log in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;


