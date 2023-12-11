import { useState } from "react";
import Header from "../components/common/header";
import AdminSideNav from "../components/common/admin-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AdminCommissions = () => {
  const [showSideNav, setShowNav] = useState(false);

  return (
    <div className="w-full h-screen poppins ">
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
      <main className="w-full">
        <div className="w-full ">
          <div className="flex flex-col gap-1 w-full justify-center  bg-gray-100 rounded-xl mt-2">
            <div className="flex gap-6 items-center p-3 justify-center">
              <p className="font-bold">Total Commissions </p>
              <h1 className="text-3xl font-bold text-cyan-500">Php. 200.00</h1>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center p-2 mt-10">
          <h1 className=" text-gray-700 text-3xl font-black ">
            Commission Reports
          </h1>
        </div>

        <div className="relative overflow-x-auto ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-cyan-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Realtor Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Commission Fee
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  1
                </th>

                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">John Doe</td>
                <td className="px-6 py-4">
                  <div
                    className={`py-1 px-3 rounded-xl text-center capitalize 
                      `}
                  >
                    200
                  </div>
                </td>
                <td className="px-6 py-4"> 2012-23-10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminCommissions;
