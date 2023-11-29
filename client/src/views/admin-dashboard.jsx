import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AdminSideNav from "../components/common/admin-sidenav";
import { DashboardChart } from "../components/common/DashboardChart";

const AdminDashboard = () => {
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
      <main>
        <div className="flex justify-center w-full items-center">
          <DashboardChart />
        </div>

        <div className="flex w-full justify-center gap-2 text-white mt-10">
          <div className="w-[48%] bg-[#a2fa4b] rounded-md p-2 ">
            <h1 className="font-semibold text-xs">Revenue</h1>
            <h1 className=" font-bold  mt-1">Php 25,200.00</h1>
            <h1 className="mt-1 text-xs">January</h1>
          </div>
          <div className="w-[48%] bg-violet-300 rounded-md p-2">
            <h1 className="font-semibold text-xs">Revenue</h1>
            <h1 className=" font-bold  mt-1">Php 25,200.00</h1>
            <h1 className="mt-1 text-xs">January</h1>
          </div>
        </div>

        <div className="flex w-full justify-center gap-2 text-white mt-2">
          <div className="w-[48%] bg-green-400 rounded-md p-2">
            <h1 className="font-semibold text-xs">Revenue</h1>
            <h1 className=" font-bold  mt-1">Php 25,200.00</h1>
            <h1 className="mt-1 text-xs">January</h1>
          </div>
          <div className="w-[48%] bg-orange-500 rounded-md p-2">
            <h1 className="font-semibold text-xs">Revenue</h1>
            <h1 className=" font-bold  mt-1">Php 25,200.00</h1>
            <h1 className="mt-1 text-xs">January</h1>
          </div>
        </div>

        <div className="mt-5 p-3 w-full flex h-[40vh]  ">
          <div className=" w-full bg-gray-300 rounded-xl">
            <div className="flex justify-between px-3 items-center mt-2">
              <h1 className="font-bold text-gray-700">Top Pitiquer</h1>

              <select className="bg-gray-300 outline-none">
                <selected>Month</selected>
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>

            <table className=" w-full ">
              <th className="flex justify-between w-full p-3 mt-5 font-bold text-sm text-gray-700">
                <tr>Name</tr>
                <tr>Bookings Completed</tr>
                <tr>Revenue </tr>
              </th>

              <tbody className="font-light text-sm overflow-y-auto">
                <tr className="flex justify-between w-full p-2  ">
                  <td className="flex gap-2 items-center">
                    <img
                      src="https://mb.com.ph/wp-content/uploads/2021/03/Probinsyano-Full-Photo-March-4.jpg"
                      className="w-8 h-8 rounded-full "
                    />
                    Tyle
                  </td>
                  <td className="p-2">17</td>
                  <td className="p-2">154,535.00</td>
                </tr>

                <tr className="flex justify-between w-full p-2  ">
                  <td className="flex gap-2 items-center">
                    <img
                      src="https://mb.com.ph/wp-content/uploads/2021/03/Probinsyano-Full-Photo-March-4.jpg"
                      className="w-8 h-8 rounded-full "
                    />
                    Tyle
                  </td>
                  <td className="p-2">17</td>
                  <td className="p-2">154,535.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
