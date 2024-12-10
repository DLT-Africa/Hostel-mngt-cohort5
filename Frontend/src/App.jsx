import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Component/Header/Header";
import AdminReg from "./Component/Register/AdminReg";
import StudentReg from "./Component/Register/StudentReg";
import AdminPreview from "./Component/AdminPreview/AdminPreview";
import Login from "./Component/Register/Login";
import Layout from "./Component/Layout/Layout";
import HomeDash from "./Component/Dashboard/HomeDash";
import StudentDashboard from "./Component/Dashboard/StudentDashboard";
import Rooms from "./Component/Dashboard/Rooms";
import RequireAuth from "./context/RequireAuth";

function App() {
  const renderRoute = () => (
    <Routes>
      <Route path="/" element={<AdminReg />} />
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route
          path="/studentreg"
          element={
            <Layout>
              <StudentReg />
            </Layout>
          }
        />
        <Route
          path="/adminprev"
          element={
            <Layout>
              <AdminPreview />
            </Layout>
          }
        />
        <Route
          path="/home-dash"
          element={
            <Layout>
              <HomeDash />
            </Layout>
          }
        />

        <Route path="/student-dash" element={<StudentDashboard />} />
        <Route path="/room" element={<Rooms />} />
      </Route>
    </Routes>
  );

  return <>{renderRoute()}</>;
}

export default App;
