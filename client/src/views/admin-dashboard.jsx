import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdminSideNav from "../components/common/admin-sidenav";

const AdminDashboard = () => {
  const [showSideNav, setShowNav] = useState(false);
  return (
    <div className="w-full h-screen">
      {showSideNav ? <AdminSideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </Header>
    </div>
  );
};

export default AdminDashboard;
