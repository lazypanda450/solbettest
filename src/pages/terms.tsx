import {
  COMPANY_CONTACT_EMAIL,
  COMPANY_NAME,
  WEBSITE_NAME,
  WEBSITE_URL,
} from "../../config";

import Footer from "@/components/Footer";
import React from "react";

const TermsAndConditions = () => {
  return (
    <>
      <div className="mt-16 mb-16 md:mb-0 flex-1 space-y-4 p-4 md:p-8 md:px-12">
        <div className="flex justify-start">
          <h2 className="text-2xl font-bold text-start">
            Terms and Conditions
          </h2>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">1. Introduction</h2>
          <p>
            Welcome to {WEBSITE_NAME}. These terms and conditions outline the
            rules and regulations for the use of {COMPANY_NAME}&apos;s Website,
            located at {WEBSITE_URL}.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use {WEBSITE_NAME} if you do not
            agree to take all of the terms and conditions stated on this page.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">2. Eligibility</h2>
          <p>
            You must be at least 18 years old to use this website and to engage
            in gambling activities. By using this website, you warrant that you
            are at least 18 years old and have the legal capacity to enter into
            binding contracts.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">3. Accounts</h2>
          <p>
            In order to access certain features of this website or to place
            bets, you may need to create an account. You are responsible for
            maintaining the confidentiality of your account and password and for
            restricting access to your computer.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">4. Payment Terms</h2>
          <p>
            All payments made on {WEBSITE_NAME} are final and non-refundable.
            You agree to pay all fees and applicable taxes incurred by you or
            anyone using an account registered to you.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">5. User Conduct</h2>
          <p>
            You agree to use {WEBSITE_NAME} only for lawful purposes and in a
            way that does not infringe the rights of, restrict or inhibit anyone
            else&apos;s use and enjoyment of the website.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">
            6. Intellectual Property
          </h2>
          <p>
            The content of this website, including but not limited to text,
            graphics, logos, images, and software, is the property of{" "}
            {COMPANY_NAME}
            and is protected by copyright and other intellectual property laws.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">7. Termination</h2>
          <p>
            We may terminate or suspend your access to {WEBSITE_NAME}{" "}
            immediately, without prior notice or liability, for any reason
            whatsoever, including without limitation if you breach the Terms.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">8. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of [Your Country], without regard to its conflict of law
            provisions.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">9. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. By continuing to access or use our Service
            after those revisions become effective, you agree to be bound by the
            revised terms. If you do not agree to the new terms, please stop
            using the Service.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              className="text-base font-semibold"
              href={`mailto:${COMPANY_CONTACT_EMAIL}`}
            >
              {COMPANY_CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default TermsAndConditions;
