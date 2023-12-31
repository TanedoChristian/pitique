import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../components/common/header";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import AdminSideNav from "../components/common/admin-sidenav";
import { DashboardChart } from "../components/common/DashboardChart";
import api from "../helper/api";
import { color } from "../helper/revenueColor";
import { formattedAmount } from "../helper/currencyHelper";
import { Link } from "react-router-dom";
const AdminDashboard = () => {
  const [showSideNav, setShowNav] = useState(false);
  const [user, setUser] = useState();
  const [topPitiquers, setTopPitiquers] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [subscription, setSubscription] = useState([]);

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

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/admins/top-pitiquers");

        setTopPitiquers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get("/admins/revenue");
        const result = await api.get("/admins/subscription");
        setSubscription(result.data);
        setRevenue(data);
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
        <div className="text-right flex justify-end">
          <Link
            to={"/admin/sales-report"}
            className="mt-3 px-5 text-sm text-gray-600 hover:underline cursor-pointer hover:text-cyan-500"
          >
            See more
          </Link>
        </div>
        <div className="w-full flex justify-center items-center">
          <DashboardChart />
        </div>

        {user !== undefined && (
          <div className="flex justify-center gap-3 mt-5  flex-wrap w-full ">
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
                <h1 className="font-semibold text-xs">Active Users</h1>
                <h1 className="mt-1 text-xs">{user.total_active}</h1>
              </div>
            </div>

            <div className="w-[30%] bg-cyan-500 text-white rounded-md p-2 text-center">
              <div className="flex-col flex">
                <h1 className="font-semibold text-xs">
                  Total Subscription Revenue
                </h1>
                <h1 className="mt-1 text-xs">
                  {formattedAmount(subscription.revenue)}
                </h1>
              </div>
            </div>

            <div className="w-[30%] bg-cyan-500 text-white rounded-md p-2 text-center">
              <div className="flex-col flex">
                <h1 className="font-semibold text-xs">
                  Total Active Subscription
                </h1>
                <h1 className="mt-1 text-xs">{subscription.total_active}</h1>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 w-full gap-2 ">
          {revenue.length !== 0 &&
            revenue.map((rev, index) => {
              return (
                <div
                  className={`mx-6 text-white mt-3 bg-${color[index]}-400 rounded-md p-2 `}
                  key={index}
                >
                  <h1 className="font-semibold text-xs">Revenue</h1>
                  <h1 className=" font-bold  mt-1">
                    {Number(rev.total_revenue).toFixed(2)}
                  </h1>
                  <h1 className="mt-1 text-xs">
                    {new Date(rev.month).toLocaleDateString("en-US", {
                      month: "long",
                    })}
                  </h1>
                </div>
              );
            })}
        </div>

        <div className="mt-5 p-3 w-full flex   ">
          <div className=" w-full bg-gray-300 rounded-xl">
            <div className="flex justify-between px-3 items-center mt-2">
              <h1 className="font-bold text-gray-700 mb-5">Top Pitiquer</h1>
            </div>

            <div className="grid grid-cols-3 gap-x-4 w-full">
              <div className="p-3  text-center font-bold text-sm">Name</div>
              <div className="p-3  text-center font-bold text-sm">
                Bookings Completed
              </div>
              <div className="p-3  text-center font-bold text-sm">Revenue</div>

              {topPitiquers.length !== 0 &&
                topPitiquers.map((pitiquer, index) => (
                  <React.Fragment key={index}>
                    <div className="p-3 text-sm text-left capitalize">
                      {pitiquer.name}
                    </div>
                    <div className="p-3 text-sm text-center">
                      {pitiquer.completed_bookings}
                    </div>
                    <div className="p-3 text-sm text-center">
                      {formattedAmount(pitiquer.total_fee)}
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
