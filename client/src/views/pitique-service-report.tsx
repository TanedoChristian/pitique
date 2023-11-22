import React from "react";
import Header from "../components/common/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const PitiqueServiceReport = () => {
  return (
    <div className="poppins">
      <Header className="flex items-center w-full gap-16 relative">
        <button className="p-5 absolute">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="text-white text-xl font-bold"
          />
        </button>
        <div className="w-full flex justify-center   ">
          <h1 className=" text-xl text-white font-bold ">
            Service Income Report
          </h1>
        </div>
      </Header>
      <div className="w-full p-3">
        <div className="flex justify-around">
          <div className="bg-gray-100  px-5 p-2">
            <h1 className="text-xs font-bold">Select start date</h1>
            <input type="date" name="" id="" className="bg-gray-100 text-xs" />
          </div>

          <div className="bg-gray-100  px-3 p-2">
            <h1 className="text-xs font-bold">Select end date</h1>
            <input type="date" name="" id="" className="bg-gray-100 text-xs" />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full justify-center  bg-gray-100 rounded-xl mt-5">
          <div className="flex gap-3 items-center p-3 justify-center">
            <h1 className="text-3xl text-cyan-500">Php 54,000</h1>
            <p className="font-bold">Profit </p>
          </div>
          <div className="p-3 flex justify-between items-center border-t border-gray-300 text-gray-600">
            <p className="text-xs "> Income </p>
            <p className="text-xs">Php 60, 000. 00</p>
          </div>

          <div className="p-3 flex justify-between items-center border-t border-gray-300">
            <p className="text-xs text-gray-600"> Commission Fee </p>
            <p className="text-xs text-gray-600">Php 60, 000. 00</p>
          </div>
        </div>

        <div className="flex   w-full justify-between   rounded-xl mt-2">
          <div className="flex p-5 w-[45%] items-center gap-2 bg-gray-100 rounded-md">
            <h1 className="text-xl text-cyan-500 font-bold"> 3</h1>
            <p>Completed</p>
          </div>

          <div className="flex p-5 w-[45%] items-center gap-2 bg-gray-100 rounded-md">
            <h1 className="text-xl font-bold text-cyan-500"> 3</h1>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="rounded-md flex flex-col  bg-gray-100 poppins shadow-md p-2 text-sm">
          <div className="flex w-full  justify-between px-3">
            <p className="text-xs font-bold">Php 18,000.00</p>
            <p className="font-bold text-green-400">Completed</p>
          </div>
          <div className="flex justify-between px-3 items-center  p-1 border-b border-gray-300">
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 rounded-full "
                src="https://cdn-icons-png.flaticon.com/512/5605/5605056.png"
              />
              <h1 className="text-xs font-bold">James Reid</h1>
            </div>

            <div className="flex flex-col gap-2 justify-end items-end">
              <p className="text-xs"> Morning, May 3, 2023</p>
            </div>
          </div>

          <div className="flex justify-between items-center px-3 ">
            <div className="flex gap-3 items-center p-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-red-500 w-4 h-4"
              />
              <h1 className="text-xs ">Cebu City</h1>
            </div>
            <h1 className="text-xs">
              Starts at <span className="font-bold">Php 18,000</span>
            </h1>
          </div>

          <div className="px-1 border-t border-gray-300 p-2 mt-2">
            <p className="text-xs">
              Client asked for: <b>Aerial Photography, Aerial Videography </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitiqueServiceReport;
