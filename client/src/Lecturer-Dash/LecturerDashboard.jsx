import Maincontent from "./Maincontent";
import Sidenav from "./Sidenav";

const LecturerDashboard = () => {
  return (
    <div className="flex">
      <div className="container m-4">
        <Sidenav />
        <Maincontent />
      </div>
    </div>
  );
};

export default LecturerDashboard;
