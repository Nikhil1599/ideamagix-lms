import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext/AuthContext";
import { BASE_URL, token } from "../../config"; // Ensure `token` is correctly imported

const LectureManagement = () => {
  const { user } = useContext(AuthContext);
  const [lectures, setLectures] = useState([]);
  const [courses, setCourses] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      if (user && user.id) {
        try {
          // Fetch lectures
          const response = await axios.get(`${BASE_URL}/lectures/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          setLectures(response.data);

          // Fetch courses one by one
          const fetchedCourses = {};
          for (const lecture of response.data) {
            try {
              const courseResponse = await axios.get(
                `${BASE_URL}/courses/${lecture.course}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              fetchedCourses[lecture.course] = courseResponse.data;
            } catch (err) {
              console.error(
                `Error fetching course ${lecture.course}:`,
                err.response || err
              );
              toast.error(`Failed to fetch course ${lecture.course}.`);
            }
          }
          setCourses(fetchedCourses);
        } catch (err) {
          console.error("Error fetching lectures:", err.response || err);
          toast.error("Failed to fetch lectures.");
          setError("Failed to fetch lectures.");
        }
      }
    };

    fetchLectures();
  }, [user]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Scheduled Lectures</h2>
        {error && (
          <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        {lectures.length === 0 ? (
          <p className="text-gray-500">No scheduled lectures found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lectures.map((lecture) => (
                <tr key={lecture._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {courses[lecture.course]?.name || "Loading..."}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {courses[lecture.course]?.description || "Loading..."}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {courses[lecture.course]?.level || "Loading..."}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lecture.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LectureManagement;
