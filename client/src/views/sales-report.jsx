import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import AdminSideNav from "../components/common/admin-sidenav";
import api from "../helper/api";
import { formattedAmount } from "../helper/currencyHelper";
import * as XLSX from "xlsx";

const SalesReport = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [commission, setCommission] = useState([]);
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const _commission = await api.get("/admins/commission/total");
      const _subscription = await api.get("/admins/subscription/report");
      setCommission(_commission.data);
      setSubscription(_subscription.data);
    };
    fetch();
  }, []);

  const exportToExcel = (data, filename, type) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

    if (type === 1) {
      // Update column headers in the worksheet
      ws["A1"] = { t: "s", v: "Pitiquer ID" };
      ws["B1"] = { t: "s", v: "Name" };
      ws["C1"] = { t: "s", v: "Revenue" };
      ws["D1"] = { t: "s", v: "Commission Fee" };
      ws["E1"] = { t: "s", v: "Date" };

      // Map the data to the desired headers
      const mappedData = data.map((item) => ({
        "Pitiquer ID": item.id,
        Name: item.pname,
        Revenue: item.total,
        "Commission Fee": item.commission_fee,
        Date: new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      XLSX.utils.sheet_add_json(ws, mappedData, { origin: "A1" });

      // Add total row for commission
      const totalCommissionRow = {
        "Total Users Revenue": formattedAmount(
          data.reduce((acc, currentValue) => acc + currentValue.total, 0)
        ),
        "Commission Fee": formattedAmount(
          data.reduce(
            (acc, currentValue) => acc + currentValue.commission_fee,
            0
          )
        ),
      };
      XLSX.utils.sheet_add_json(ws, [totalCommissionRow], {
        origin: `A${mappedData.length + 3}`,
      });
    } else {
      // Update column headers in the worksheet
      ws["A1"] = { t: "s", v: "Pitiquer ID" };
      ws["B1"] = { t: "s", v: "Name " };
      ws["C1"] = { t: "s", v: "Amount" };
      ws["D1"] = { t: "s", v: "Total" };
      ws["E1"] = { t: "s", v: "Date" };

      // Map the data to the desired headers
      const mappedData = data.map((item) => ({
        "Pitiquer ID": item.id,
        Name: item.pname,
        Amount: item.amount,
        Total: item.prev_amount,
        Date: new Date(item.last_paid_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      // Add the mapped data to the worksheet
      XLSX.utils.sheet_add_json(ws, mappedData, { origin: "A1" });

      // Add total row for subscription
      const totalSubscriptionRow = {
        "Total Income Subscription": formattedAmount(
          data.reduce((acc, currentValue) => acc + currentValue.prev_amount, 0)
        ),
      };
      XLSX.utils.sheet_add_json(ws, [totalSubscriptionRow], {
        origin: `A${mappedData.length + 3}`,
      });
    }

    XLSX.writeFile(wb, filename);
  };

  return (
    <div>
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
      <div className="flex justify-end my-5 mx-10"></div>
      <div className="grid md:grid-cols-2 my-5 grid-cols-1 gap-6 mx-4">
        {commission.length > 0 ? (
          <div className="relative overflow-x-auto">
            <button
              onClick={() => {
                exportToExcel(commission, "pitiquer_sales_report.xlsx", 1);
              }}
              className="hover:underline py-1 text-cyan-500 hover:text-cyan-800"
            >
              <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
            </button>
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
                    Income
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
                {commission.map((c, i) => (
                  <tr className="bg-white border-b" key={i}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {c.id}
                    </th>
                    <td className="px-6 py-4 capitalize text-gray-900 font-semibold">
                      {c.pname}
                    </td>
                    <td className="px-6 py-4">{formattedAmount(c.total)}</td>
                    <td className="px-6 py-4">
                      {formattedAmount(c.commission_fee)}
                    </td>
                    <td className="px-6 py-4">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(c.date))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Sales income found</p>
        )}

        {subscription.length > 0 ? (
          <div className="relative overflow-x-auto">
            <button
              onClick={() => {
                exportToExcel(
                  subscription,
                  "subscription_sales_report.xlsx",
                  2
                );
              }}
              className="hover:underline py-1 text-cyan-500 hover:text-cyan-800"
            >
              <FontAwesomeIcon icon={faFileExcel} /> Export to Excel
            </button>
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
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscription.map((c, i) => (
                  <tr className="bg-white border-b" key={i}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {c.id}
                    </th>
                    <td className="px-6 py-4 capitalize text-gray-900 font-semibold">
                      {c.pname}
                    </td>
                    <td className="px-6 py-4">{formattedAmount(c.amount)}</td>
                    <td className="px-6 py-4">
                      {formattedAmount(c.prev_amount)}
                    </td>
                    <td className="px-6 py-4">
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(c.last_paid_date))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No subscription sales found</p>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
