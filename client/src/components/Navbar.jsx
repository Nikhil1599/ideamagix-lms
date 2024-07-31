import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa"; // Import profile icon from react-icons
import { AuthContext } from "../AuthContext/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-xl font-bold">
          <Link to="/">LMS Console</Link>
        </div>

        {/* Navbar Links */}
        <div className="flex items-center space-x-4">
          {token && user ? (
            <>
              <FaUserCircle className="text-xl mr-2" />
              <span className="text-white">{user?.fullName}</span>{" "}
              {/* Display user's name */}
              <button
                onClick={handleLogout}
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
