import { useState } from "react";

const SchedulingManagement = () => {
  const [schedules, setSchedules] = useState([]); // Sample data; replace with actual data

  const handleAddSchedule = () => {
    // Logic to add schedule
  };

  const handleEditSchedule = (id) => {
    // Logic to edit schedule
  };

  const handleDeleteSchedule = (id) => {
    // Logic to delete schedule
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Scheduling Management</h2>
      <button
        onClick={handleAddSchedule}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Add New Schedule
      </button>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Schedule ID</th>
            <th className="py-2 px-4 border-b">Lecture</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id}>
              <td className="py-2 px-4 border-b">{schedule.id}</td>
              <td className="py-2 px-4 border-b">{schedule.lecture}</td>
              <td className="py-2 px-4 border-b">{schedule.date}</td>
              <td className="py-2 px-4 border-b">{schedule.time}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditSchedule(schedule.id)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulingManagement;
