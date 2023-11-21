import RegisterHeader from "../components/registerHeader";

const RegisterPage = () => {
  return (
    // <div className="w-full h-screen flex flex-col poppins">
    //   <RegisterHeader title="Account Details" />

    //   <form className="flex flex-col gap-3 p-5 justify-between h-full">
    //     <div className="flex flex-col gap-3">
    //       <input
    //         type="text"
    //         placeholder="Email"
    //         className="p-3 bg-gray-200 w-full rounded-sm"
    //       />

    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className="p-3 bg-gray-200 w-full rounded-sm "
    //       />

    //       <input
    //         type="password"
    //         placeholder="Confirm Password"
    //         className="p-3 bg-gray-200 w-full rounded-sm "
    //       />
    //     </div>
    //     <div>
    //       <div className="flex gap-3">
    //         <input type="checkbox" name="" id="" />
    //         <p>
    //           {" "}
    //           I agree to the{" "}
    //           <span className="font-bold">Terms and Conditions </span>
    //         </p>
    //       </div>
    //       <button className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md">
    //         Login
    //       </button>
    //     </div>
    //   </form>
    // </div>

    <div className="w-full h-screen flex flex-col poppins">
      <RegisterHeader title="Personal Details" />

      <form className="flex flex-col gap-3 p-5 justify-between h-full">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="First name"
            className="p-3 bg-gray-200 w-full rounded-sm"
          />

          <input
            type="password"
            placeholder="Middle name"
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <input
            type="password"
            placeholder="Last name"
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <label>Birthday</label>
          <input
            type="date"
            placeholder="Birthday"
            className="p-3 bg-gray-200 w-full rounded-sm text-gray-700 "
          />
        </div>
        <div>
          <button className="mt-5 p-3 w-full border-2 text-lg border-cyan-400 font-bold rounded-sm shadow-md">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
