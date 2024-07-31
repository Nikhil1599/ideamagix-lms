import { Routes, Route } from "react-router-dom";
import CourseManagement from "./CourseManagement";
import LectureManagement from "./LectureManagement";
import LecturerManagement from "./LecturerManagement";

const MainContent = () => {
  return (
    <div className="ml-64 p-6">
      <Routes>
        <Route path="courses" element={<CourseManagement />} />
        <Route path="lectures" element={<LectureManagement />} />
        <Route path="lecturers" element={<LecturerManagement />} />
      </Routes>
    </div>
  );
};

export default MainContent;
