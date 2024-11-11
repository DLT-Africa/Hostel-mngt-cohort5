import React, { useState } from "react";
import "./Dashboard.css";
import { NavLink, useLocation } from "react-router-dom";

const dashboardLinks = [
  { title: "Dashboard", route: "/home-dash" },
  { title: "Student", route: "/student-dash" },
  { title: "Rooms", route: "/room" },
  { title: "Report", route: "#" },
];

const SideBar = () => {
  const location = useLocation();

  return (
    <aside className="--flex-start">
      <div className="left">
        {dashboardLinks.map((dashboardLink, index) => (
          <div className="--flex-center --dir-column">
            <NavLink
              to={dashboardLink.route}
              className={dashboardLink.route === location.pathname ? "active-link" : ""}
            >
              {dashboardLink.title}
            </NavLink>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
