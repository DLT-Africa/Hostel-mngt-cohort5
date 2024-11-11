import React, { useState } from "react";

const ChangeStudentRoom = ({ student, onClose }) => {
  const [newRoomNum, setNewRoomNum] = useState("");

  const handleChange = (e) => {
    setNewRoomNum(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Student&apos;s Room</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>New Room Number</label>
            <input type="text" value={newRoomNum} onChange={handleChange} />
          </div>

          <button type="submit">Change Room</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeStudentRoom;
