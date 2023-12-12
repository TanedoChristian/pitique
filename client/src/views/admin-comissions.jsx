import { useEffect, useState } from "react";
import Header from "../components/common/header";
import AdminSideNav from "../components/common/admin-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";
import { formattedAmount } from "../helper/currencyHelper";
import * as XLSX from "xlsx";

const AdminCommissions = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [commission, setCommission] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/admins/commission");

        setCommission(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  const exportToExcel = () => {
    if (commission && commission.length > 0) {
      const mappedData = commission.map((comm) => ({
        "Booking ID": comm.id,
        "Pitiquer Name": comm.pname,
        Total: formattedAmount(comm.total),
        "Commission Fee (10%)": formattedAmount(comm.total * 0.1),
        Date: new Date(comm.date).toLocaleString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      const totalCommission = formattedAmount(
        commission.reduce((acc, currentValue) => {
          return acc + currentValue.total;
        }, 0) * 0.1
      );

      const total = formattedAmount(
        commission.reduce((acc, currentValue) => {
          return acc + currentValue.total;
        }, 0)
      );

      const ws = XLSX.utils.json_to_sheet(mappedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Commission Report");

      // Add total commission row to the end of the data
      const totalRow = {
        "Total All pitiquer Revenue": total,
        "Total Commission": totalCommission,
      };
      XLSX.utils.sheet_add_json(ws, [totalRow], {
        origin: `A${mappedData.length + 3}`,
      });

      XLSX.writeFile(wb, "Commission_Report.xlsx");
    } else {
      console.log("No data to export.");
    }
  };

  return (
    <div className="w-full h-screen poppins">
      {showSideNav ? <AdminSideNav setShowNav={setShowNav} /> : ""}
      <Header className="flex items-center p-5 gap-5">
        <button
          onClick={() => {
            setShowNav(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button onClick={exportToExcel}>
          <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
        </button>
      </Header>

      <main className="w-full">
        <div className="w-full ">
          <div className="flex flex-col gap-1 w-full justify-center  bg-gray-100 rounded-xl mt-2">
            <div className="flex gap-6 items-center p-3 justify-center">
              <p className="font-bold">Total Commissions </p>
              <h1 className="text-3xl font-bold text-cyan-500">
                {commission && commission.length > 0
                  ? formattedAmount(
                      commission.reduce((accumulator, currentValue) => {
                        return accumulator + currentValue.total;
                      }, 0) * 0.1
                    )
                  : formattedAmount(0)}
              </h1>
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
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Pitiquer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Commission Fee (10%)
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {commission &&
                commission.length > 0 &&
                commission.map((comm, index) => (
                  <tr className="bg-white border-b" key={index}>
                    <td className="px-6 py-4">{comm.id}</td>
                    <td className="px-6 py-4 capitalize">{comm.pname}</td>
                    <td className="px-6 py-4">
                      <div
                        className={`py-1 px-3 rounded-xl text-center capitalize 
                      `}
                      >
                        {formattedAmount(comm.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`py-1 px-3 rounded-xl text-center capitalize 
                      `}
                      >
                        {formattedAmount(comm.total * 0.1)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {new Date(comm.date).toLocaleString("en-us", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminCommissions;
