import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AdminSideNav from "../components/common/admin-sidenav";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../helper/api";
import { Link } from "react-router-dom";

const ManagePitiquer = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [pitiquers, setPitiquers] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/pitiquers/admin/all");

        if (data) {
          setPitiquers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [flag]);

  const handleChangeStatus = async (status, id) => {
    try {
      const { data } = await api.put("/pitiquers/edit/status", {
        status,
        ptqr_id: id,
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
        <h1 className="text-xl font-bold">Manage Pitiquer </h1>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-white uppercase bg-cyan-500">
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
            {pitiquers.length > 0 &&
              pitiquers.map((pitiquer) => (
                <tr className="bg-white border-b" key={pitiquer.id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {pitiquer.id}
                  </th>
                  <td className="px-6 py-4 capitalize text-cyan-600 font-semibold">
                    <Link to={`/profile/pitique/${pitiquer.id}`}>
                      {pitiquer.fname} {pitiquer.mname} {pitiquer.lname}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{pitiquer.email}</td>
                  <td className="px-6 py-4">
                    {pitiquer.phone !== "" ? pitiquer.phone : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`py-1 px-3 rounded-xl text-center capitalize bg-${
                        pitiquer.status === "active" ? "green" : "red"
                      }-400 text-white`}
                    >
                      {pitiquer.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleChangeStatus("suspended", pitiquer.id)
                        }
                        className={`py-1 px-3 rounded-xl bg-red-500 text-white ${
                          pitiquer.status === "suspended" && " hidden"
                        }`}
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() =>
                          handleChangeStatus("terminated", pitiquer.id)
                        }
                        className={`py-1 px-3 rounded-xl bg-red-500 text-white ${
                          pitiquer.status === "terminated" && " hidden"
                        }`}
                      >
                        Terminate
                      </button>
                      <button
                        onClick={() =>
                          handleChangeStatus("active", pitiquer.id)
                        }
                        className={`py-1 px-3 rounded-xl bg-green-500  text-white ${
                          pitiquer.status === "active" && " hidden"
                        }`}
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

export default ManagePitiquer;
