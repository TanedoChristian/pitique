import { createContext, useState } from "react";
import AccountDetailsForm from "../components/register/account-details-form";
import PersonalDetailsForm from "../components/register/personal-details-form";
import RegisterHeader from "../components/register/register-header";
import { UserContext } from "../context/userContext";
import { HeaderContext } from "../context/headerContext";

const RegisterPage = () => {
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [user, setUser] = useState({});

  return (
    <HeaderContext.Provider value={showAccountForm}>
      <div className="w-full h-screen flex flex-col poppins">
        <RegisterHeader setShowAccountForm={setShowAccountForm} />

        {showAccountForm ? (
          <AccountDetailsForm setUser={setUser} user={user} />
        ) : (
          <PersonalDetailsForm
            setUser={setUser}
            setShowAccountForm={setShowAccountForm}
          />
        )}
      </div>
    </HeaderContext.Provider>
  );
};

export default RegisterPage;
