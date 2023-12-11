import { useEffect, useState } from "react";
import Header from "../components/common/header";
import AdminSideNav from "../components/common/admin-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";

const AdminTransactionReports = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [reports, setReports] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/reports");

        setReports(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [flag]);

  const handleSuspend = async (userType, id, rid) => {
    if (userType === "pitiquer") {
      try {
        const { data } = await api.put("/pitiquers/edit/status", {
          status: "suspended",
          ptqr_id: id,
        });

        if (data) {
          setFlag(!flag);
          await api.put("/reports/done", { id: rid });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data } = await api.put("/realtors/edit/status", {
          status: "suspended",
          rltr_id: id,
        });

        if (data) {
          setFlag(!flag);
          await api.put("/reports/done", { id: rid });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

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

        {reports && reports.length > 0 ? (
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
                {reports.map((report, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {report.id}
                    </th>

                    <td className="px-6 py-4">{report.msg}</td>
                    <td className="px-6 py-4 capitalize">{report.user_type}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`py-1 px-3 rounded-xl text-center capitalize 
                      `}
                      >
                        {new Date(report.date).toLocaleString("en-us", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          className={`py-1 px-3 rounded-xl bg-red-500 text-white`}
                          onClick={() =>
                            handleSuspend(
                              report.user_type,
                              report.user_id,
                              report.id
                            )
                          }
                        >
                          Suspend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No report found!</div>
        )}
      </main>
    </div>
  );
};

export default AdminTransactionReports;
