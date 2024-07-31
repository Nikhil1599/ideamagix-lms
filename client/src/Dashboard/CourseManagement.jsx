import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config"; // Adjust the path as necessary

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    level: "",
    description: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/courses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (err) {
      setError("Failed to fetch courses.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddCourse = async () => {
    try {
      let imageUrl = form.image;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "your_cloudinary_upload_preset");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const token = localStorage.getItem("token");
      await axios.post(
        `${BASE_URL}/courses`,
        {
          ...form,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course added successfully.");
      resetForm();
      fetchCourses(); // Refetch courses to update the table
    } catch (err) {
      toast.error("Failed to add course.");
    }
  };

  const handleEditCourse = (course) => {
    setForm({
      id: course._id,
      name: course.name,
      level: course.level,
      description: course.description,
      image: course.image,
    });
    setIsEditing(true);
  };

  const handleUpdateCourse = async () => {
    try {
      let imageUrl = form.image;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "your_cloudinary_upload_preset");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const token = localStorage.getItem("token");
      await axios.put(
        `${BASE_URL}/courses/${form.id}`,
        {
          ...form,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Course updated successfully.");
      resetForm();
      fetchCourses(); // Refetch courses to update the table
    } catch (err) {
      toast.error("Failed to update course.");
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course deleted successfully.");
      fetchCourses(); // Refetch courses to update the table
    } catch (err) {
      toast.error("Failed to delete course.");
    }
  };

  const resetForm = () => {
    setForm({ id: "", name: "", level: "", description: "", image: "" });
    setSelectedFile(null);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
      <div className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Course Name"
            className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            required
          />
        </div>
        <div className="mb-2">
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            required
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-2">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Course Description"
            className="border border-gray-300 rounded-md p-2 mr-2 resize-none w-full"
            rows="3"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2 mr-2 w-full"
          />
        </div>
        <button
          onClick={isEditing ? handleUpdateCourse : handleAddCourse}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {isEditing ? "Update Course" : "Add Course"}
        </button>
      </div>
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Course ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Level</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <tr key={course._id}>
                <td className="py-2 px-4 border-b">{course._id}</td>
                <td className="py-2 px-4 border-b">{course.name}</td>
                <td className="py-2 px-4 border-b">{course.level}</td>
                <td className="py-2 px-4 border-b">{course.description}</td>
                <td className="py-2 px-4 border-b">
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-20 h-20 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 text-center">
                No courses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
