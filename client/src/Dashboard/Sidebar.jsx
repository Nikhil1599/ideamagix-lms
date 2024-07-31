import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed w-64  bg-white text-gray-800 shadow-lg rounded-r-lg border border-gray-200">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <ul>
          <li className="mb-4">
            <Link
              to="/admin/courses"
              className={`block p-2 rounded-md ${
                location.pathname === "/admin/courses"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Course Management
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/lectures"
              className={`block p-2 rounded-md ${
                location.pathname === "/admin/lectures"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Lecture Management
            </Link>
          </li>
          <li className="mb-4">
            <Link
              to="/admin/lecturers"
              className={`block p-2 rounded-md ${
                location.pathname === "/admin/lecturers"
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              Lecturer Management
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
