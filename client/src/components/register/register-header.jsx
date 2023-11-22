import React from "react";

const RegisterHeader = ({ title }) => {
  return (
    <header className="w-full h-[8vh] bg-cyan-400">
      <div className="h-[6vh] w-full bg-cyan-500 flex justify-center items-center">
        <h1 className="font-bold text-xl text-white tracking-wide poppins">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default RegisterHeader;
