import { useState } from "react";
import Header from "../components/common/header";
import AdminSideNav from "../components/common/admin-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const AdminTransactionReports = () => {
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
        <div className="w-full flex justify-center p-5">
          <h1 className=" text-gray-700 text-3xl font-black ">
            Transaction Reports
          </h1>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-white uppercase bg-cyan-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
                <th scope="col" className="px-6 py-3">
                  User Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
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

                <td className="px-6 py-4">Test</td>
                <td className="px-6 py-4">Realtor</td>
                <td className="px-6 py-4">
                  <div
                    className={`py-1 px-3 rounded-xl text-center capitalize 
                      `}
                  >
                    2012-23-10
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      className={`py-1 px-3 rounded-xl bg-red-500 text-white`}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminTransactionReports;
