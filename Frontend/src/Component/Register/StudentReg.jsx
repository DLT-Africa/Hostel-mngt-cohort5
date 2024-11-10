import React from "react";
import "./Register.css"
// import {Link} from "react-router-dom";


const StudentReg = () => {
  return (
    <div className="container form__ --100vh">
        <div className="form-container">
        <p className="title">Register a new student</p>
      <form className="form">
        <div className="--dir-column">
          <label htmlFor="fullname">Student Name:</label>
          <input
            type="text"
            className="input"
            name="fullname"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            className="input"
            name="age"
            placeholder="Enter age"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="roomNumber">Room Number:</label>
          <input
            type="text"
            className="input"
            name="roomNumber"
            placeholder="Enter room number"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="email">Contact Email:</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="guardianName">Guardian's Name:</label>
          <input
            type="text"
            className="input"
            name="guardianName"
            placeholder="Enter guardian Name"
            required
          />
        </div>
        <div className="--dir-column">
          <label htmlFor="guardianEmail">Guardian's Contact Email:</label>
          <input
            type="email"
            className="input"
            name="guardianEmail"
            placeholder="Guardian's email"
            required
          />
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

export default StudentReg;
