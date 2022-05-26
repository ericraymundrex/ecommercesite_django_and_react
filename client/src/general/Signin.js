import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import Base from "../core/Base/Base";
import { signin, authenticate, isAuthenticated } from "../auth/auth";
import Navbar from "../core/Navebar/Navebar";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    didRedirect: false,
  });
  const { name, email, password, error, success, didRedirect } =values;

  // higher order function -> Omchange
  const handleChange = (name) =>{
    return (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    }};

  const onSumit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false});

    signin({ email, password })
      .then((data) => {
        console.log("DATA", data);
        if (data.token) {
          authenticate(data, () => {
            console.log("TOKKEN ADDED");                                                                                                                                                                                                                                                                                                                                                               
            setValues({
              ...values,
              success:true
            });
          });
        } else {
          setValues({
            ...values,
            error:true
          });
        }
      })
      .catch((e) => console.log(e));
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };



  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully. Please <Link
              to="/signin"
            >
              login now.
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Enter Valid Email id or password
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                name="password"
                className="form-control"
                value={password}
                onChange={handleChange("password")}
                type="password"
              />
            </div>
            <button
              onClick={onSumit}
              className="btn btn-success "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Navbar />


        {errorMessage()}
        {successMessage()}
      {signInForm()}

      {performRedirect()}
    <Base />
    </Fragment>
  );
};

export default Signin;
