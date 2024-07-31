import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      dispatch({ type: "LOGIN_START" });

      const response = await axios.post(`${BASE_URL}/login`, {
        email,
        password,
      });

      // Handle successful response
      if (response.status === 200) {
        const { token, user } = response.data;
        const role = user.role;

        // Store the JWT token in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);

        // Update context and local state
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user,
            token,
            role,
          },
        });

        toast.success("Login successful! Redirecting...");

        // Redirect based on user role
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/lecturer");
        }
      } else {
        toast.error("Login failed. Please try again.");
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // Server responded with a status other than 200 range
        toast.error(
          error.response.data.message || "Login failed. Please try again."
        );
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please try again later.");
        setError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        toast.error("An error occurred. Please try again.");
        setError("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
