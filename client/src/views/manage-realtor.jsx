import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSideNav from "../components/common/admin-sidenav";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../helper/api";

const ManageRealtor = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [realtors, setRealtors] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/realtors");

        if (data) {
          setRealtors(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [flag]);

  const handleChangeStatus = async (status, id) => {
    try {
      const { data } = await api.put("/realtors/edit/status", {
        status,
        rltr_id: id,
      });

      if (data) {
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs  uppercase bg-cyan-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {realtors.length > 0 &&
              realtors.map((realtor) => (
                <tr className="bg-white border-b" key={realtor.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {realtor.id}
                  </th>
                  <td className="px-6 py-4 capitalize">
                    {realtor.fname} {realtor.mname} {realtor.lname}
                  </td>
                  <td className="px-6 py-4">{realtor.email}</td>
                  <td className="px-6 py-4">
                    {realtor.phone !== "" ? realtor.phone : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`py-1 px-3 rounded-xl text-center capitalize bg-${
                        realtor.status === "active" ? "green" : "red"
                      }-400 text-white`}
                    >
                      {realtor.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleChangeStatus("suspend", realtor.id)
                        }
                        className={`py-1 px-3 rounded-xl bg-red-500 text-white ${
                          realtor.status === "suspend" && " hidden"
                        }`}
                        disabled={realtor.status === "suspend"}
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() =>
                          handleChangeStatus("terminate", realtor.id)
                        }
                        className={`py-1 px-3 rounded-xl bg-red-500 text-white ${
                          realtor.status === "terminate" && " hidden"
                        }`}
                        disabled={realtor.status === "terminate"}
                      >
                        Terminate
                      </button>
                      <button
                        onClick={() => handleChangeStatus("active", realtor.id)}
                        className={`py-1 px-3 rounded-xl bg-green-500  text-white ${
                          realtor.status === "active" && " hidden"
                        }`}
                        disabled={realtor.status === "active"}
                      >
                        Activate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRealtor;
