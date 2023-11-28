import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSideNav from "../components/common/admin-sidenav";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ManageRealtor = () => {
  const [showSideNav, setShowNav] = useState(false);
  return (
    <div className="">
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

      <div className="w-full flex justify-center items-center p-5">
        <h1 className="text-xl font-bold">Manage Realtor </h1>
      </div>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs  uppercase bg-cyan-500 text-white">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" class="px-6 py-3">
                Status
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                1
              </th>
              <td class="px-6 py-4">John Doe</td>
              <td class="px-6 py-4">johndoe@gmail.com</td>
              <td class="px-6 py-4">0924092940</td>
              <td class="px-6 py-4">
                <button className="py-1 px-3 rounded-xl bg-green-400 text-white">
                  Active
                </button>
              </td>
              <td class="px-6 py-4">
                <div className="flex gap-2">
                  <button className="py-1 px-3 rounded-xl bg-red-500 text-white">
                    Suspend
                  </button>
                  <button className="py-1 px-3 rounded-xl bg-red-500 text-white">
                    Terminate
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRealtor;
