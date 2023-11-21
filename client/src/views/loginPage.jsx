const LoginPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between  p-5 relative bg-cyan-400 poppins">
      <div className="w-full flex justify-center  text-center">
        <div>
          <h1 className="text-5xl font-bold tracking-wide mt-10 text-white poppins">
            Pitique
          </h1>
          <p className="text-white font-white">Aerial Photography and Video</p>
        </div>
      </div>

      <div className="w-full absoulute flex flex-col gap-3">
        <button className="bg-white p-2.5  rounded-md text-xl font-bold shadow-md">
          LOGIN
        </button>

        <button className=" border-2 text-white border-white p-2.5  rounded-md text-xl font-bold">
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
