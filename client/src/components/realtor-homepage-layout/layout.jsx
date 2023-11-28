import PitiquerCard from "./pitiquer-card";

const RealtorLayout = ({ pitiquers }) => {
  return (
    <div className="w-full p-3 flex flex-col items-center  h-[90vh] overflow-auto">
      {pitiquers.map((pitiquer, index) => (
        <PitiquerCard key={index} pitiquer={pitiquer} />
      ))}
    </div>
  );
};

export default RealtorLayout;
