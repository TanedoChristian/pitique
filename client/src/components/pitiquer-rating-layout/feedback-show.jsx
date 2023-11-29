const PitiquerFeedback = ({ setShowFeedback, feedback, booking }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center backdrop-blur-[1px] fixed top-0 bg-gray-300 bg-opacity-90 left-0">
      <div className="w-[350px] border border-white bg-white p-2 rounded-md flex flex-col gap-2 items-center">
        <div className="flex items-center justify-center">
          <p>Rate:</p>
          {Array.from({ length: feedback.rtng }).map((_, index) => {
            return (
              <svg
                className={`w-4 h-4 text-${
                  index <= feedback.rtng ? "yellow" : "gray"
                }-300 ms-1 cursor-pointer`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
                key={index}
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            );
          })}
        </div>
        <div className="w-full  px-3">
          <p className="text-gray-600 font-semibold">Comment:</p>
        </div>
        <div className="w-full flex justify-center">
          <textarea
            rows={10}
            className="bg-gray-200 w-[95%] rounded-md px-2 py-1"
            name="fdbk"
            value={feedback.fdbk}
          ></textarea>
        </div>
        <p className="text-sm text-gray-300">By You</p>
      </div>
      <button
        className="absolute top-5 right-5 hover:text-red-500"
        onClick={() => {
          setShowFeedback(false);
        }}
      >
        X
      </button>
    </div>
  );
};

export default PitiquerFeedback;
