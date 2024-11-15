import React from "react";
import "./Register.css"
// import {Link} from "react-router-dom";


const AdminReg = () => {
  return (
    <div className="container form__ --100vh">
      <div className="form-container">
      <p className="title">Create an account</p>
      <form className="form">
        <div className="--dir-column">
          <label htmlFor="fullname">Full name:</label>
          <input
            type="text"
            className="input"
            name="fullname"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="">Comfirm Password:</label>
          <input
            type="text"
            className="input"
            name="password"
            placeholder="password2"
            required
          />
        </div>

        <div className="card">
            <ul>
               <li>
               <span className="indicator">
                    &nbsp; Lowercase & Uppercase
                </span>
               </li>
               <li>
               <span className="indicator">
                    &nbsp; Number(0-9)
                </span>
               </li>
               <li>
               <span className="indicator">
                    &nbsp; Special Character(!@#$%^&*)
                </span>
               </li>
               <li>
               <span className="indicator">
                    &nbsp; At least 6 Charactters.
                </span>
               </li>
            </ul>
        </div>
        <button className="--btn">
            Signing up... Create Account
        </button> 
      </form>

      <p className="account">
         Already have an account    
         {/* ? <Link to="/login">Login</Link>  */}
      </p>
      </div>
    </div>
  );
};

export default AdminReg;
