import logo from "../assets/logo.png";
import camera from "../assets/camera.png";

const HomePage = () => {
  const handleNavigate = (path) => {
    window.location.href = `/${path}`;
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between  p-5 relative bg-gradient-to-t from-fuchsia-400 to-blue-500 poppins">
      <div className="w-full flex justify-center  text-center">
        <div>
          <div className="w-full  items-center justify-center flex">
            <img src={logo} className="" />
          </div>
          <h1 className="text-5xl font-bold tracking-wide  text-white poppins">
            Pitique
          </h1>
          <p className="text-white font-white">Aerial Photography and Video</p>
        </div>
      </div>

      <div className=" h-[30vh] flex justify-center items-center ">
        <img src={camera} />
      </div>

      <div className="w-full absoulute flex flex-col gap-3">
        <button
          className="bg-white p-2.5  rounded-md text-xl font-bold shadow-md"
          onClick={() => handleNavigate("login")}
        >
          LOGIN
        </button>

        <button
          className=" border-2 text-white border-white p-2.5  rounded-md text-xl font-bold"
          onClick={() => handleNavigate("register")}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default HomePage;
