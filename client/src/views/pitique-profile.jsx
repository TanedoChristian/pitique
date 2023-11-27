import PitiqueProfileLayout from "../components/pitique-profile-layout/layout";

const PitiqueProfile = () => {
  const user = JSON.parse(localStorage.getItem("p-user"));

  return (
    <div>
      <PitiqueProfileLayout user={user} />
    </div>
  );
};

export default PitiqueProfile;
