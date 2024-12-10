import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import UserTable from "./UserTable";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

// const adminData = [
//   { name: "Opera", email: "opera12@gmail.com", role: "Admin", id: 1 },
//   { name: "Chapo", email: "chapo12@gmail.com", role: "Admin", id: 2 },
//   { name: "Emmy", email: "emmy12@gmail.com", role: "Member", id: 3 },
//   { name: "Roddy", email: "roddy12@gmail.com", role: "Member", id: 4 },
//   { name: "Mubby", email: "mubby@gmail.com", role: "Admin", id: 5 },
//   { name: "Teddy", email: "teddy@gmail.com", role: "Admin", id: 6 },
// ];

const override = {
  display: "block",
  margin: "100px auto",
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AdminPreview = () => {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin`, {
          withCredentials: true,
        });
        const data = response.data;
        setFilteredData(data);
        setAdmins(data);
        console.log({ data });
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    console.log({ term });

    const filtered = admins.filter(
      (admin) =>
        admin.fullname.toLowerCase().includes(term) ||
        admin.email.toLowerCase().includes(term) ||
        admin.role.toLowerCase().includes(term)
    );
    console.log({ filtered });
    setFilteredData(filtered);
  };

  const handleDelete = async (adminId) => {
    try {
      await axios.delete(`${BASE_URL}/admin/${adminId}`, {
        withCredentials: true,
      });
      const updatedFilteredData = filteredData.filter(
        (admin) => admin._id !== adminId
      );

      setFilteredData(updatedFilteredData);
      toast.success("Admin deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  const handleUpdateRole = async (adminId, newRole) => {
    try {
      await axios.patch(
        `${BASE_URL}/admin/${adminId}`,
        {
          role: newRole,
        },
        { withCredentials: true }
      );

      const updatedFilteredRole = filteredData.map((admin) =>
        admin._id === adminId ? { ...admin, role: newRole } : admin
      );
      setFilteredData(updatedFilteredRole);
      toast.success("Admin updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  if (isLoading)
    return (
      <ClipLoader color="#3a86ff" cssOverride={override} loading={isLoading} />
    );

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
