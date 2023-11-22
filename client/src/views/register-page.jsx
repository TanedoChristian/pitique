import AccountDetailsForm from "../components/register/account-details-form";
import PersonalDetailsForm from "../components/register/personal-details-form";
import RegisterHeader from "../components/register/register-header";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen flex flex-col poppins">
      <RegisterHeader title="Personal Details" />
      <PersonalDetailsForm />
    </div>
  );
};

export default RegisterPage;
