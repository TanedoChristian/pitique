import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AdminSideNav from "../components/common/admin-sidenav";
import { DashboardChart } from "../components/common/DashboardChart";
import api from "../helper/api";

const AdminDashboard = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/admins/users");

        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

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

        {user !== undefined && (
          <div className="flex justify-center gap-3 mt-5">
            <div className="w-[30%] bg-cyan-500 rounded-md p-2 text-white flex justify-center items-center">
              <div className="flex flex-col">
                <h1 className="font-semibold text-xs">Total Users</h1>
                <h1 className="mt-1 text-xs text-center">{user.total_users}</h1>
              </div>
            </div>

            <div className="w-[30%] bg-cyan-500 text-white rounded-md p-2 text-center">
              <div className="flex-col flex">
                <h1 className="font-semibold text-xs">Suspended Users</h1>
                <h1 className="mt-1 text-xs">{user.total_suspended}</h1>
              </div>
            </div>

            <div className="w-[30%] bg-cyan-500 text-white rounded-md p-2 text-center">
              <div className="flex flex-col">
                <h1 className="font-semibold text-xs">Terminated Users</h1>
                <h1 className="mt-1 text-xs">{user.total_terminated}</h1>
              </div>
            </div>
          </div>
        )}

        <div className="flex w-full justify-center gap-2 text-white mt-5">
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

        <div className="mt-5 p-3 w-full flex h-[30vh]  ">
          <div className=" w-full bg-gray-300 rounded-xl">
            <div className="flex justify-between px-3 items-center mt-2">
              <h1 className="font-bold text-gray-700">Top Pitiquer</h1>

              <select className="bg-gray-300 outline-none">
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>

            <table className=" w-full ">
              <thead className="flex justify-between w-full p-3 mt-5 font-bold text-sm text-gray-700">
                <tr>
                  <td>Name</td>
                </tr>
                <tr>
                  <td>Bookings Completed</td>
                </tr>
                <tr>
                  <td>Revenue</td>
                </tr>
              </thead>

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
