import { Button } from "../ui/button"; // Ensure this path is correct
import { Modal } from "@/components/ui/Modal"; // Ensure this path is correct
import React from "react";

const DisclaimerModal = ({
  show,
  onClose,
  isCheckboxChecked,
  onCheckboxChange,
}: {
  show: boolean;
  onClose: () => void;
  isCheckboxChecked: boolean;
  onCheckboxChange: () => void;
}) => {
  if (!show) return null;

  return (
    <Modal
      showCloseButton={false}
      closeOnBackdropClick={false}
      onClose={onClose}
    >
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
        <p className="mb-6">
          By using this platform, you acknowledge that you are at least 18 years
          old and agree to comply with all local laws regarding online gaming.
          Please play responsibly.
        </p>
        <div className="flex justify-center items-center mb-4">
          <input
            id="agreeTerms"
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={onCheckboxChange}
            className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 mr-2"
          />
          <label htmlFor="agreeTerms" className="text-sm font-medium">
            I accept the terms and conditions.
          </label>
        </div>
        <Button
          className="inline-flex items-center justify-center px-4 py-4 bg-gradient-to-r from-base to-teal-400 leading-none rounded hover:from-teal-400 hover:to-base transition-all duration-500 ease-in-out"
          onClick={onClose}
          disabled={!isCheckboxChecked}
        >
          Acknowledge
        </Button>
      </div>
    </Modal>
  );
};

export default DisclaimerModal;
