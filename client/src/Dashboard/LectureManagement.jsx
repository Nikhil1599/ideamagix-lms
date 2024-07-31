import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL, token } from "../../config";

const LectureManagement = () => {
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    courseId: "",
    instructorId: "",
    date: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentLectureId, setCurrentLectureId] = useState("");

  useEffect(() => {
    fetchLectures();
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/lectures`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLectures(response.data);
    } catch (err) {
      setError("Failed to fetch lectures.");
    }
  };

  const fetchCourses = async () => {
    try {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();

    // Validate the date
    if (!isValidDate(form.date)) {
      toast.error("The date must be today or in the future.");
      return;
    }

    const lectureData = {
      courseId: form.courseId,
      instructorId: form.instructorId,
      date: form.date,
    };

    try {
      await axios.post(`${BASE_URL}/lectures`, lectureData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast.success("Lecture added successfully.");
      resetForm();
      fetchLectures();
    } catch (err) {
      toast.error("Failed to add lecture.");
      console.error("Error adding lecture:", err.response || err);
    }
  };

  const handleUpdateLecture = async () => {
    if (!isValidDate(form.date)) {
      toast.error("The date must be today or in the future.");
      return;
    }

    try {
      await axios.put(
        `${BASE_URL}/lectures/${currentLectureId}`,
        {
          courseId: form.courseId,
          instructorId: form.instructorId,
          date: form.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Lecture updated successfully.");
      resetForm();
      fetchLectures();
    } catch (err) {
      toast.error("Failed to update lecture.");
      console.error("Error updating lecture:", err.response || err);
    }
  };

  const handleDeleteLecture = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/lectures/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Lecture deleted successfully.");
      fetchLectures();
    } catch (err) {
      toast.error("Failed to delete lecture.");
      console.error("Error deleting lecture:", err.response || err);
    }
  };

  const handleEditLecture = (lecture) => {
    setForm({
      courseId: lecture.course._id,
      instructorId: lecture.instructor._id,
      date: new Date(lecture.date).toISOString().split("T")[0],
    });
    setCurrentLectureId(lecture._id);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({
      courseId: "",
      instructorId: "",
      date: "",
    });
    setIsEditing(false);
    setCurrentLectureId("");
  };

  const isValidDate = (date) => {
    const today = new Date().toISOString().split("T")[0];
    return date >= today;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Lecture Management</h2>
      <div className="mb-4">
        <div className="mb-2">
          <select
            name="courseId"
            value={form.courseId}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            required
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select
            name="instructorId"
            value={form.instructorId}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            required
          >
            <option value="">Select Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>
                {instructor.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2 mr-2 w-full"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <button
          onClick={isEditing ? handleUpdateLecture : handleAddLecture}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          {isEditing ? "Update Lecture" : "Add Lecture"}
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
            <th className="py-2 px-4 border-b">Lecture ID</th>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Instructor</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {lectures.length > 0 ? (
            lectures.map((lecture) => (
              <tr key={lecture._id}>
                <td className="py-2 px-4 border-b">{lecture._id}</td>
                <td className="py-2 px-4 border-b">{lecture.course.name}</td>
                <td className="py-2 px-4 border-b">
                  {lecture.instructor.fullName}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(lecture.date).toISOString().split("T")[0]}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleEditLecture(lecture)}
                    className="text-blue-600 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLecture(lecture._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-2 px-4 text-center">
                No lectures found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LectureManagement;
