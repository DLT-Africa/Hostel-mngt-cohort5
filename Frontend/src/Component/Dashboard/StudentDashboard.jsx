import React, { useState } from "react";
import {confirmAlert} from "react-confirm-alert";
import SideBar from "./SideBar";
import {IoMenu, IoCloseOutline} from "react-icons/io5";
import {RiDeleteBin6Line} from "react-icons/ri"
import {FaPenFancy} from "react-icons/fa"
import {Link} from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css"
import "./Dashboard.css";

const studentData = [
  {
    id: 1,
    studentName: "Buprenorphine hydrochloride",
    email: "vdysart0@aol.com",
    gender: "Female",
    age: "4",
    nationality: "Russia",
  },
  {
    id: 2,
    studentName: "Benzalkonium Chloride",
    email: "xandreutti1@psu.edu",
    gender: "Male",
    age: "11",
    nationality: "South Sudan",
  },
  {
    id: 3,
    studentName: "Methylphenidate Hydrochloride",
    email: "echallicum2@nytimes.com",
    gender: "Female",
    age: "26",
    nationality: "China",
  },
];

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentData);
  const [filteredData, updateFilteredData] = useState(studentData);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedmodal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null); 

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = students.filter(
      (student) =>
        student.studentName.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term) ||
        student.nationality.toLowerCase().includes(term)
    );
    updateFilteredData(filtered);
  };

  const handleDelete = (studentId) => {
    const updatedUsers = students.filter((student) => student.id !== studentId);
    setStudents(updatedUsers);

    const updatedFilteredData = filteredData.filter(
      (student) => student.id !== studentId
    );

    updateFilteredData(updatedFilteredData);
  };


  const handleModalOpen = (students) => {
    setSelectedStudent(students)
    setIsModalOpen(true)
  }

  const handleModalClose = ()=> {
    setIsModalOpen(false)
    setSelectedmodal("")
    setSelectedStudent(null);
  }


  const handleModalSelect = (modalType) => {
    setSelectedmodal(modalType)
  }

  const confirmDelete = (id)=> {
    confirmAlert({
      title: "Delete This Student",
      message: "Are You Sure You Want To Delete This Student?",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDelete(id),
        },
        {
          label: "cancel",
          onClick: () => ("Deletion Cancelled")
        }
      ]
    })
  }


  // const filteredData = data.filter(
  //   (item) => 
  //     item.nationality.toLowerCase().includes(search.toLowerCase()) ||
  //   item.email.toLowerCase().includes(search.toLowerCase())
  // );

  return <div>
      {isSideBarToggled && (
        <div className="mobile-side-nav">
     
          <SideBar />
          </div>
      )}
      <div className="--flex --overflow-hidden">
        <div className="desktop-side-nav">
        <SideBar />
        </div>
          <div className="--flex-dir-column --overflow-y-auto --flex-One --overflow-x-hidden">
            <main className="--flex-justify-center w-full">
              <div className="right dash-main">
                <div className="--flex-justify-between">
                  <p>Students</p>
                  {isSideBarToggled ? (
                    <IoCloseOutline
                    className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggled(false)}/>
                  ) :(
                    <IoMenu className="sidebar-toggle-iconB"
                    onClick={() => setIsSideBarToggled(true)}/>
                  
                  )}
                </div>
                <p>Search Students</p>
                  <input placeholder="search by name, email, or ID number"
                  type="text"
                  className="search"
                  value={searchTerm}
                  onChange ={(e) => setSearchTerm(e.target.value)}/>


                  <div className="table">
                    <table className="table_wrapper">
                      <thead className="table__head">
                        <tr className="table__row">
                          <th className="same_class">Student Name</th>
                          <th className="same_class">Email</th>
                          <th className="same_class">ID Number</th>
                          <th className="same_class">Gender</th>
                          <th className="same_class">Age</th>
                          <th className="same_class">Nationality</th>
                          <th className="same_class">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="table__body">
                          {filteredData.map((student, index) => (
                            <tr key={index} className="table__row">
                              <td className="same_class">{student.studentName}</td>
                              <td className="same_class">{student.email}</td>
                              <td className="same_class">{student.id}</td>
                              <td className="same_class">{student.gender}</td>
                              <td className="same_class">{student.age}</td>
                              <td className="same_class">{student.nationality}</td>

                              <td className="same_class"><RiDeleteBin6Line
                              size={25}
                              color="red"
                              onClick={() => confirmDelete(student.id)}/>
                              &nbsp;&nbsp;
                              <FaPenFancy
                              size={25}
                              color="blue"
                              onClick={() => handleModalOpen(student)}/>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                    <button className="btn-secondary">
                          <Link to="/studentreg">Add a student</Link>
                    </button>
              </div>
            </main>
          </div>
      </div>
      {isModalOpen && (
        <div className="modal"> 
            <div className="modal-content"> 
              <h2>Select an Option</h2>
              <button className="one"  onClick={() => handleModalSelect("UpdateStudentProfile")}>
                Update Student Profile
              </button>
              <button className="two" onClick={() => handleModalSelect("ChangeStudentRoom")}>
              Change Student Room
              </button>
              <button className="three" onClick={() => handleModalSelect("UpdateCheckin")}>
                Update Checkin
              </button>
              
              <button onClick={handleModalClose}>Close</button>
            </div>
        </div>
      )}
      {selectedModal === "UpdateStudentProfile" && (
        <UpdateStudentProfile
        student={selectedStudent}
        onClick={handleModalClose}/>

      )}

      {selectedModal === "ChangeStudentRoom" && (
        <ChangeStudentRoom
        student={selectedStudent}
        onClick={handleModalClose}/>
      )}

      {selectedModal === "UpdateCheckin" && (
        <UpdateCheckin
        student={selectedStudent}
        onClose={handleModalClose}/>
      )}
  </div>;
};

export default StudentDashboard;
