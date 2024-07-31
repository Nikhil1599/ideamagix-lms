import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="container m-4">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
