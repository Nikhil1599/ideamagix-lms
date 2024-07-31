import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../Dashboard/AdminDashboard";
import LecturerDashboard from "../Lecturer-Dash/LecturerDashboard";
import InstructorSignupForm from "../Lecturer-Dash/Signup";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/signup" element={<Signup />} />
      <Route path="/signup" element={<InstructorSignupForm />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/lecturer/*" element={<LecturerDashboard />} />
    </Routes>
  );
};

export default Routers;
