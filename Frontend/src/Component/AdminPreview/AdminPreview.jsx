import React, { useState } from "react";
import "./AdminPreview.css";
import UserTable from "./UserTable";
import { CiSearch } from "react-icons/ci";

const userData = [
  { name: "Opera", email: "opera12@gmail.com", role: "Admin", id: 1 },
  { name: "Chapo", email: "chapo12@gmail.com", role: "User", id: 2 },
  { name: "Emmy", email: "emmy12@gmail.com", role: "Member", id: 3 },
  { name: "Roddy", email: "roddy12@gmail.com", role: "Member", id: 4 },
  { name: "Mubby", email: "mubby@gmail.com", role: "User", id: 5 },
  { name: "Teddy", email: "teddy@gmail.com", role: "User", id: 6 },
];

const AdminPreview = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(userData);
  const [filteredData, setFilteredData] = useState(userData);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    const updatedFilteredData = filteredData.filter(
      (user) => user.id !== userId
    );

    setFilteredData(updatedFilteredData);
  };

  const handleUpdateRole = (userId, newRole) => {
    const updatedRole = users.map((user) =>
      user.id === userId ? { ...user, role: newRole } : user
    );

    setUsers(updatedRole);

    const updatedFilteredRole = filteredData.map((user) => 
      user.id === userId ? { ...user, role: newRole } : user
    );

    setFilteredData(updatedFilteredRole);
  };

  return (
    <div className="__prevCon">
      <h2 className="__prevHeader">Admins</h2>

      <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon" />

        <input
          type="text"
          className="__prevSearch"
          placeholder="Search by name or email or role"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      <div className="__prevList">
        <UserTable
          data={filteredData}
          onDelete={handleDelete}
          onUpdateRole={handleUpdateRole}
        />
      </div>

      <div className="__inviteBtnCon">
        <button className="__inviteBtn">Invite Admin</button>
      </div>
    </div>
  );
};

export default AdminPreview;
