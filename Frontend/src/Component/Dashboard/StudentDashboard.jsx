import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import SideBar from "./SideBar";
import { IoMenu, IoCloseOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import UpdateStudentProfile from "../Modal/UpdateStudentProfile";
import ChangeStudentRoom from "../Modal/ChangeStudentRoom";
import UpdateCheckin from "../Modal/UpdateCheckin";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";

const override = {
  display: "block",
  margin: "100px auto",
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isSideBarToggled, setIsSideBarToggled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedmodal] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/student`, {
          withCredentials: true,
        });
        const data = response.data;
        setFilteredData(data);
        console.log({ data });
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch students");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, []); // filteredData

  const filtered = filteredData?.filter(
    (student) =>
      student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student.nationality.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const handleDelete = async (studentId) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/student/delete/${studentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success(res?.data);
      const updatedFilteredData = filteredData.filter(
        (student) => student._id !== studentId
      );
      setFilteredData(updatedFilteredData);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  const handleModalOpen = (students) => {
    setSelectedStudent(students);
    setCurrentRoomNumber(students?.room?.roomNumber);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedmodal("");
    setSelectedStudent(null);
  };

  const handleModalSelect = (modalType) => {
    setSelectedmodal(modalType);
  };

  const confirmDelete = (id) => {
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
          onClick: () => "Deletion Cancelled",
        },
      ],
    });
  };

  // const filteredData = data.filter(
  //   (item) =>
  //     item.nationality.toLowerCase().includes(search.toLowerCase()) ||
  //   item.email.toLowerCase().includes(search.toLowerCase())
  // );

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

  console.log(selectedStudent);

  return (
    <div>
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
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggled(false)}
                  />
                ) : (
                  <IoMenu
                    className="sidebar-toggle-icon"
                    onClick={() => setIsSideBarToggled(true)}
                  />
                )}
              </div>
              <p>Search Students</p>
              <input
                placeholder="search by name, email, or ID number"
                type="text"
                className="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

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
                      <th className="same_class">Room No</th>
                      <th className="same_class">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="table__body">
                    {filtered.map((student, index) => (
                      <tr key={index} className="table__row">
                        <td className="same_class">{student.name}</td>
                        <td className="same_class">{student.email}</td>
                        <td className="same_class">{student._id}</td>
                        <td className="same_class">{student.gender}</td>
                        <td className="same_class">{student.age}</td>
                        <td className="same_class">{student.nationality}</td>
                        <td className="same_class">
                          {student?.room?.roomNumber}
                        </td>

                        <td className="same_class">
                          <RiDeleteBin6Line
                            size={25}
                            color="red"
                            onClick={() => confirmDelete(student._id)}
                          />
                          &nbsp;&nbsp;
                          <FaPenFancy
                            size={25}
                            color="blue"
                            onClick={() => handleModalOpen(student)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/studentreg">
                <button className="btn-secondary">Add a student</button>
              </Link>
            </div>
          </main>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Select an Option</h2>
            <button
              className="one"
              onClick={() => handleModalSelect("UpdateStudentProfile")}
            >
              Update Student Profile
            </button>
            <button
              className="two"
              onClick={() => handleModalSelect("ChangeStudentRoom")}
            >
              Change Student Room
            </button>
            <button
              className="three"
              onClick={() => handleModalSelect("UpdateCheckin")}
            >
              Update Checkin
            </button>

            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
      {selectedModal === "UpdateStudentProfile" && (
        <UpdateStudentProfile
          student={selectedStudent}
          updateFilteredData={setFilteredData}
          onClose={handleModalClose}
        />
      )}

      {selectedModal === "ChangeStudentRoom" && (
        <ChangeStudentRoom
          student={selectedStudent}
          onClose={handleModalClose}
        />
      )}

      {selectedModal === "UpdateCheckin" && (
        <UpdateCheckin
          student={selectedStudent}
          onClose={handleModalClose}
          currentRoomNumber={currentRoomNumber}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
