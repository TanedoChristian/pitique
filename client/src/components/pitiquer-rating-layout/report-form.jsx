const ReportForm = ({ handleReport, setReport, report }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center backdrop-blur-[1px] fixed top-0 bg-gray-300 bg-opacity-90 left-0">
      <div className="w-[350px] border border-white bg-white p-2 rounded-md flex flex-col gap-2 items-center">
        <div className="w-full  px-3">
          <p className="text-gray-600 font-semibold">What is the issue:</p>
        </div>
        <div className="w-full flex justify-center">
          <textarea
            rows={10}
            className="bg-gray-200 w-[95%] rounded-md px-2 py-1"
            name="reason"
            value={report.description}
            onChange={(e) =>
              setReport({ show: true, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleReport}
          >
            Submit
          </button>
        </div>
      </div>
      <button
        className="absolute top-5 right-5 hover:text-red-500"
        onClick={() => {
          setReport({ show: false });
        }}
      >
        X
      </button>
    </div>
  );
};

export default ReportForm;
