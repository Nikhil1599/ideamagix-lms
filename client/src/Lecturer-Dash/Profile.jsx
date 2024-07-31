import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext/AuthContext";
import { BASE_URL, token } from "../../config"; // Ensure `token` is correctly imported

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data from API if user is set
    if (user && user.id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/instructors/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setForm({
            fullName: response.data.fullName || "",
            email: response.data.email || "",
          });
        } catch (err) {
          console.error("Error fetching user data:", err.response);
          toast.error("Failed to fetch user data.");
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!form.fullName || !form.email) {
      setError("Full Name and Email are required.");
      return;
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/instructors/${user.id}`,
        {
          fullName: form.fullName,
          email: form.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.status);
      toast.success("Profile updated successfully.");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: response.data, token },
      });
      setError("");
    } catch (err) {
      console.error("Error response:", err.response);
      const errorMessage = err.response?.data?.message || err.message;
      toast.error("Failed to update profile. " + errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
