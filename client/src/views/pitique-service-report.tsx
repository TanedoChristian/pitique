import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import api from "../helper/api";
import { Link } from "react-router-dom";
import { formattedAmount } from "../helper/currencyHelper";

const PitiqueServiceReport = () => {
  const user = JSON.parse(localStorage.getItem("p-user"));
  const [report, setReport] = useState([]);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `/pitiquers/statistics/report/${user.id}`
        );

        setReport(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get(
          `/pitiquers/statistics/report/income/${user.id}`
        );

        setIncome(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);
  return (
    <div className="poppins">
      <Header className="flex items-center w-full gap-16 relative">
        <Link to="/dashboard/pitique" className="p-5 absolute">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </Link>
        <div className="w-full flex justify-center   ">
          <h1 className=" text-xl text-white font-bold ">
            Service Income Report
          </h1>
        </div>
      </Header>
      <div className="w-full p-3">
        <div className="flex flex-col gap-1 w-full justify-center  bg-gray-100 rounded-xl mt-2">
          <div className="flex gap-6 items-center p-3 justify-center">
            <p className="font-bold">Profit </p>
            <h1 className="text-3xl font-bold text-cyan-500">
              {formattedAmount(Number(income.total).toFixed(2))}
            </h1>
          </div>
        </div>

        <div className="flex   w-full justify-between   rounded-xl mt-2">
          <div className="flex p-5 w-[45%] items-center gap-2 bg-gray-100 rounded-md">
            <h1 className="text-xl text-cyan-500 font-bold">{report.length}</h1>
            <p className="text-sm font-bold">Completed</p>
          </div>
        </div>
      </div>
      <div className="px-3 flex flex-col gap-3">
        {report.length > 0 &&
          report.map((r, index) => (
            <Link
              to={`/booking/pitique/${r.id}`}
              className="rounded-md flex flex-col  bg-gray-100 poppins shadow-md p-2 text-sm"
              key={index}
            >
              <div className="flex w-full  justify-end px-3">
                <p className="font-bold text-green-400">Completed</p>
              </div>
              <div className="flex justify-between px-3 items-center  p-1 border-b border-gray-300">
                <div className="flex gap-2 items-center">
                  <img
                    className="w-8 h-8 rounded-full "
                    src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
                  />
                  <h1 className="text-xs font-bold capitalize">{r.name}</h1>
                </div>

                <div className="flex flex-col gap-2 justify-end items-end">
                  <p className="text-xs">
                    {" "}
                    {r.day},{" "}
                    {new Date(r.completed).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center px-3 ">
                <div className="flex gap-3 items-center p-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-red-500 w-4 h-4"
                  />
                  <h1 className="text-xs capitalize">{r.location}</h1>
                </div>
                <h1 className="text-xs">
                  <span className="font-bold">
                    Php {Number(r.total).toFixed(2)}
                  </span>
                </h1>
              </div>

              <div className="px-1 border-t border-gray-300 p-2 mt-2">
                <p className="text-xs">
                  Client asked for: <b>{r.pkg_desc} </b>
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PitiqueServiceReport;
