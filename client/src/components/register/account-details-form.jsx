const AccountDetailsForm = () => {
  return (
    <form className="flex flex-col gap-3 p-5 justify-between h-full">
      <div className="flex flex-col gap-3">
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

        <input
          type="password"
          placeholder="Confirm Password"
          className="p-3 bg-gray-200 w-full rounded-sm "
        />
      </div>
      <div>
        <div className="flex gap-3">
          <input type="checkbox" name="" id="" />
          <p>
            I agree to the
            <span className="font-bold">Terms and Conditions </span>
          </p>
        </div>
        <button className="mt-5 p-3 w-full bg-cyan-400 text-white font-bold rounded-sm shadow-md">
          Login
        </button>
      </div>
    </form>
  );
};

export default AccountDetailsForm;
