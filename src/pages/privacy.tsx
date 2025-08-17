import {
  COMPANY_CONTACT_EMAIL,
  COMPANY_NAME,
  WEBSITE_NAME,
  WEBSITE_URL,
} from "../../config";

import Footer from "@/components/Footer";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="mt-16 mb-16 md:mb-0 flex-1 space-y-4 p-4 md:p-8 md:px-12">
        <div className="flex justify-start">
          <h2 className="text-2xl font-bold text-start">Privacy Policy</h2>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">1. Introduction</h2>
          <p>
            Welcome to {WEBSITE_NAME}. This Privacy Policy outlines how{" "}
            {COMPANY_NAME}
            collects, uses, and protects your personal information when you use
            our website, located at {WEBSITE_URL}.
          </p>
          <p>
            By using our website, you agree to the collection and use of
            information in accordance with this Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">
            2. Information We Collect
          </h2>
          <p>
            We collect various types of information, including personal
            information that you provide to us voluntarily when using our
            website.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">
            3. Use of Information
          </h2>
          <p>
            We use the collected information for various purposes, including to
            provide and maintain our services, to improve our website, and to
            personalize your experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">4. Data Security</h2>
          <p>
            We take appropriate measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">5. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track the
            activity on our website and hold certain information.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">
            6. Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We have no
            control over the content and privacy policies of these websites and
            encourage you to review the privacy policies of any third-party
            sites you visit.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-base font-semibold">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
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

export default PrivacyPolicy;
