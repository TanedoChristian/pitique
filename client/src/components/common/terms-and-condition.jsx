const TermsAndCondition = ({ setShow, show }) => {
  return (
    <div className="w-full h-screen overflow-auto flex justify-center items-center backdrop-blur-[1px] fixed top-0 bg-gray-300 bg-opacity-90 left-0">
      <div className="w-[350px] h-1/2 overflow-auto p-4 border border-white bg-white rounded-md flex flex-col gap-2">
        <h3 className="font-bold mt-5">1. Acceptance of Terms</h3>
        <h4 className="text-gray-500">
          1.1. By accessing or using the Pitique platform ("Platform"), you
          agree to comply with and be bound by these Terms and Conditions
          ("Terms"). If you do not agree with these Terms, you should not use
          the Platform.
        </h4>

        <h3 className="font-bold mt-5">2. User Accounts</h3>

        <h4 className="text-gray-500">
          2.1. To access certain features of the Platform, you may be required
          to create an account. You are responsible for maintaining the
          confidentiality of your account information and are fully responsible
          for all activities that occur under your account.
        </h4>

        <h4 className="text-gray-500">
          2.2. You agree to provide accurate and complete information during the
          registration process and to update such information to keep it
          accurate, current, and complete.
        </h4>

        <h3 className="font-bold mt-5">3. Use of the Platform</h3>

        <h4 className="text-gray-500">
          3.1. The Platform is intended for use by both Realtors and Pitiquers
          for collaborative purposes related to real estate photography and
          videography services.
        </h4>

        <h4 className="text-gray-500">
          3.2. Users are prohibited from using the Platform for any illegal or
          unauthorized purpose. Users must comply with all applicable laws and
          regulations.
        </h4>

        <h3 className="font-bold mt-5">4. Subscription and Fees</h3>

        <h4 className="text-gray-500">
          4.1. Pitiquers may be required to subscribe to the Platform by paying
          a subscription fee. The subscription fee details will be specified on
          the Platform and are subject to change.
        </h4>

        <h4 className="text-gray-500">
          4.2. Subscription fees are non-refundable unless otherwise stated.
        </h4>

        <h3 className="font-bold mt-5">5. Collaborations and Transactions</h3>

        <h4 className="text-gray-500">
          5.1. The Platform facilitates collaborations between Realtors and
          Pitiquers. Pitique is not a party to any transaction between users.
        </h4>

        <h4 className="text-gray-500">
          5.2. Users are solely responsible for the terms, conditions, and
          fulfillment of any collaboration or transaction facilitated through
          the Platform.
        </h4>

        <h3 className="font-bold mt-5">6. Intellectual Property</h3>

        <h4 className="text-gray-500">
          6.1. All content, trademarks, and intellectual property on the
          Platform are owned by Pitique. Users agree not to reproduce,
          distribute, or create derivative works from any content on the
          Platform without express permission.
        </h4>

        <h3 className="font-bold mt-5">7. Privacy</h3>

        <h4 className="text-gray-500">
          7.1. Pitique collects and uses personal information in accordance with
          its Privacy Policy. By using the Platform, you consent to the
          collection and use of your personal information as described in the
          Privacy Policy.
        </h4>

        <h3 className="font-bold mt-5">8. Termination</h3>

        <h4 className="text-gray-500">
          8.1. Pitique reserves the right to suspend or terminate your account
          and access to the Platform at its sole discretion, without notice or
          liability, for any reason.
        </h4>

        <h3 className="font-bold mt-5">9. Disclaimer of Warranties</h3>

        <h4 className="text-gray-500">
          9.1. The Platform is provided "as is" and without warranties of any
          kind, whether express or implied. Pitique makes no representation or
          warranty regarding the accuracy, completeness, or availability of the
          Platform.
        </h4>

        <h3 className="font-bold mt-5">10. Limitation of Liability</h3>

        <h4 className="text-gray-500">
          10.1. Pitique shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly.
        </h4>

        <h3 className="font-bold mt-5">11. Governing Law</h3>

        <h4 className="text-gray-500">
          11.1. These Terms are governed by and construed in accordance with the
          laws of [Jurisdiction], without regard to its conflict of law
          principles.
        </h4>

        <h3 className="font-bold mt-5">12. Changes to Terms</h3>

        <h4 className="text-gray-500">
          12.1. Pitique reserves the right to modify or update these Terms at
          any time. Users are responsible for regularly reviewing the Terms.
          Continued use of the Platform after changes constitutes acceptance of
          the modified Terms.
        </h4>
      </div>
      <button
        className="absolute top-5 right-5 hover:text-red-500"
        onClick={() => {
          setShow(!show);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TermsAndCondition;
