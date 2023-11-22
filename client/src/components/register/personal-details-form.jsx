const PersonalDetailsForm = ({ setShowAccountForm }) => {
  return (
    <form
      className="flex flex-col gap-3 p-5 justify-between h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="First name"
          className="p-3 bg-gray-200 w-full rounded-sm"
        />

        <input
          type="password"
          placeholder="Middle name"
          className="p-3 bg-gray-200 w-full rounded-sm "
        />

        <input
          type="password"
          placeholder="Last name"
          className="p-3 bg-gray-200 w-full rounded-sm "
        />

        <label>Birthday</label>
        <input
          type="date"
          placeholder="Birthday"
          className="p-3 bg-gray-200 w-full rounded-sm text-gray-700 "
        />
      </div>
      <div>
        <button
          className="mt-5 p-3 w-full border-2 text-lg border-cyan-400 font-bold rounded-sm shadow-md"
          onClick={() => {
            setShowAccountForm(true);
          }}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
