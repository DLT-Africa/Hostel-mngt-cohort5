import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const override = {
  display: "block",
  margin: "100px auto",
}

const AdminReg = () => {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValidMessage, setFormValidMessage] = useState(false);
  const[loading, setLoading] = useState(false);
  const[formCompleted, setFormCompleted]  = useState(false);
  

  const navigate = useNavigate()

  const {setUser} = useContext(UserContext)


  const timesIcon = <FaTimes color="red" size={20} />;
  const checkIcon = <BsCheck2All color="green" size={20} />;

  const switchIcon = (condition) => {
    return condition ? checkIcon : timesIcon;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const password = formData.password;
    setUCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
    setNum(/([0-9])/.test(password));
    setSChar(/([!,%,&,@,#,$,_,*])/.test(password));
    setPasswordLength(password.length > 5);
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const { fullname, email, password, password2} = formData;

    if(!fullname || !email || !password || !password2) {
      setFormValidMessage("Oops! All fields are required");
      return;
    }
    
    if(password != password2) {
      setFormValidMessage("Oops! Passwords do not match");

      return;

    }

    setIsSubmitting(true);
    setLoading(true)

    const response = await axios.post("http://localhost:5000/admin/register", formData, {withCredentials: true});

    console.log("response", response)

    if(response?.data) {

    
      const adminInfo = response.data;
      
      setLoading(false)
      setUser(adminInfo);
      setIsSubmitting(false);
      setFormCompleted(true);
      toast.success("Registration successful");
      navigate("/home-dash", {state: {user: response.data}})

    }

    
      
    } catch (error) {
      console.log("error", error);

      setIsSubmitting(false);
      toast.error( error?.response?.data.message)
     const message = error?.response?.data?.message ?
     `${error.response.data.message}` :  " Internal Server error";

     setFormValidMessage(message);
     setLoading(false)
      
    }
   
  };


  const handlePastePassword = (e) => { 
    e.preventDefault();
    toast.error("Cannot paste into this field");
    return false;
  }

  return (

    <>
      { loading ? (<ClipLoader color="#3a86ff" cssOverride={override} loading={loading}/>) : ( <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title">Create an account</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="--dir-column">
            <label htmlFor="fullname">Full name:</label>
            <input
              type="text"
              className="input"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleInputChange}
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
              value={formData.email}
              onChange={handleInputChange}
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
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="--dir-column">
            <label htmlFor="">Comfirm Password:</label>
            <input
              type="password"
              className="input"
              name="password2"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleInputChange}
              onPaste={handlePastePassword}
              required
            />
          </div>

          <div className="card">
            <ul>
              <li>
                <span className="indicator">
                  {switchIcon(uCase)} &nbsp; Lowercase & Uppercase
                </span>
              </li>
              <li>
                <span className="indicator">
                  {switchIcon(num)} &nbsp; Number(0-9)
                </span>
              </li>
              <li>
                <span className="indicator">
                  {switchIcon(sChar)} &nbsp; Special Character(!@#$%^&*)
                </span>
              </li>
              <li>
                <span className="indicator">
                  {switchIcon(passwordLength)} &nbsp; At least 6 Charactters.
                </span>
              </li>
            </ul>
          </div>
          <button disabled={isSubmitting} className="--btn">
            {isSubmitting ? "Signing you up..." : "Create account"}
          </button>
        </form>

        {formValidMessage && <p>{formValidMessage}</p>}

        <p className="account">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>)}
    
    </>
   
  );
};

export default AdminReg;
