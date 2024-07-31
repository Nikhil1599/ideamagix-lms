import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

const InstructorManagement = () => {
  const [instructors, setInstructors] = useState([]);
  const [form, setForm] = useState({
    id: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState(""); // State to store the user's role

  useEffect(() => {
    fetchInstructors();
    fetchUserRole(); // Fetch user role on component mount
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/instructors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstructors(response.data);
    } catch (err) {
      setError("Failed to fetch instructors.");
    }
  };

  const fetchUserRole = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/instructors`, {
        // Endpoint to fetch user profile
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRole(response.data.role); // Assume the response has a role field
    } catch (err) {
      setError("Failed to fetch user role.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddInstructor = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/instructors`,
        {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInstructors([...instructors, response.data]);
      toast.success("Instructor added successfully.");
      resetForm();
    } catch (err) {
      toast.error("Failed to add instructor.");
    }
  };

  const handleUpdateInstructor = async () => {
    try {
      await axios.put(`${BASE_URL}/instructors/${form.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstructors(
        instructors.map((instructor) =>
          instructor._id === form.id ? { ...instructor, ...form } : instructor
        )
      );
      toast.success("Instructor updated successfully.");
      resetForm();
    } catch (err) {
      toast.error("Failed to update instructor.");
    }
  };

  const handleDeleteInstructor = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/instructors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstructors(instructors.filter((instructor) => instructor._id !== id));
      toast.success("Instructor deleted successfully.");
    } catch (err) {
      toast.error("Failed to delete instructor.");
    }
  };

  const handleEditInstructor = (instructor) => {
    setForm({
      id: instructor._id,
      fullName: instructor.fullName,
      email: instructor.email,
      password: "", // Reset password field
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      id: "",
      fullName: "",
      email: "",
      password: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Instructor Management</h2>
      {role === "admin" && ( // Show form only for admin
        <div className="mb-4">
          <div className="mb-2">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Instructor Name"
              className="border border-gray-300 rounded-md p-2 mr-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Instructor Email"
              className="border border-gray-300 rounded-md p-2 mr-2 w-full"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Instructor Password"
              className="border border-gray-300 rounded-md p-2 mr-2 w-full"
              required
            />
          </div>
          <button
            onClick={isEditing ? handleUpdateInstructor : handleAddInstructor}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {isEditing ? "Update Instructor" : "Add Instructor"}
          </button>
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Instructor ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            {role === "admin" && (
              <th className="py-2 px-4 border-b">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {instructors.length > 0 ? (
            instructors.map((instructor) => (
              <tr key={instructor._id}>
                <td className="py-2 px-4 border-b">{instructor._id}</td>
                <td className="py-2 px-4 border-b">{instructor.fullName}</td>
                <td className="py-2 px-4 border-b">{instructor.email}</td>
                {role === "admin" && (
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEditInstructor(instructor)}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInstructor(instructor._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={role === "admin" ? "4" : "3"}
                className="py-2 px-4 text-center"
              >
                No instructors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorManagement;
