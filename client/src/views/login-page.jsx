const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-between flex-col poppins tracking-wide">
      <div className="h-[40vh] w-full  bg-cyan-400 rounded-b-[50%] flex items-center  justify-center ">
        <h1 className=" text-5xl font-bold tracking-wide  text-white poppins">
          Pitique
        </h1>
      </div>

      <div className="p-10">
        <form className="flex flex-col gap-3">
          <h1 className="text-lg font-bold">Login </h1>
          <input
            type="text"
            placeholder="Email"
            className="p-3 bg-gray-200 w-full rounded-sm"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-gray-200 w-full rounded-sm "
          />

          <button className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
