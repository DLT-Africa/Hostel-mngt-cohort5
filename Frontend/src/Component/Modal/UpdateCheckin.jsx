import React, { useState } from "react";

const UpdateCheckin = ({ student, onClose }) => {
  const [action, setAction] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [currentRoomNumber, setCurrentRoomNumber] = useState("");

  const handleRoomChange = (e) => {
    setRoomNumber(e.target.value);
  };
  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Check-In Status</h2>
        <p>
          Current Status: {student.checkedIn ? "Checked In" : "Checked Out"}
        </p>
        <p>Current Room: {currentRoomNumber || "Not assigned"}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Room Number</label>
            <input
              type="text"
              value={roomNumber}
              onChange={handleRoomChange}
              placeholder="Enter room number"
            />
          </div>

          <div>
            <label htmlFor="">Action</label>
            <select value={action} onChange={handleActionChange}>
              <option value="&nbsp;">Select an action</option>
              <option value="checkIn" disabled={student.checkedIn}>
                Check In
              </option>
              <option value="checkOut" disabled={!student.checkedIn}>
                Check Out
              </option>
            </select>
          </div>

          <button type="submit">Update Status</button>
          <button type="button" onClick={onClose}>
            {" "}
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCheckin;
