import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Lecture from "./Lectures";

const Maincontent = () => {
  return (
    <div className="ml-64 p-6">
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="lectures" element={<Lecture />} />
      </Routes>
    </div>
  );
};

export default Maincontent;
