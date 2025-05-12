import React from "react";

const TermsOfUse = () => {
  return (
    <div className="terms-container p-6 max-w-4xl mx-auto bg-[var(--bg-color)] text-[var(--text-color)]">
      <h1 className="text-3xl font-bold mb-4 text-center">Terms of Use</h1>
      <p className="text-lg mb-6 text-[var(--text-secondary)]">
        Welcome to our website. By accessing or using our services, you agree
        to the following terms and conditions.
      </p>
      <div className="terms-content space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-[var(--text-secondary)]">
            By using our website, you agree to comply with and be bound by these
            terms of use. If you do not agree, please do not use our services.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">2. Use of Services</h2>
          <p className="text-[var(--text-secondary)]">
            You agree to use our services only for lawful purposes and in a way
            that does not infringe the rights of others.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
          <p className="text-[var(--text-secondary)]">
            All content on this website, including text, graphics, and logos, is
            the property of our company and is protected by copyright laws.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
          <p className="text-[var(--text-secondary)]">
            We are not responsible for any damages arising from the use of our
            website or services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;