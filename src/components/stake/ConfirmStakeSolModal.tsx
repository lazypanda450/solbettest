import { Button } from "../ui/button"; // Ensure this path is correct
import { Modal } from "@/components/ui/Modal"; // Ensure this path is correct
import React from "react";

const ConfirmStakeSolModal = ({
  show,
  onClose,
  amount,
  onConfirm,
  onCheckboxChange,
  isCheckboxChecked,
}: {
  show: boolean;
  onClose: () => void;
  amount: string;
  onConfirm: () => void;
  onCheckboxChange: () => void;
  isCheckboxChecked: boolean;
}) => {
  if (!show) return null;

  return (
    <Modal
      showCloseButton={false}
      closeOnBackdropClick={true}
      onClose={onClose}
    >
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Stake</h2>
        <p className="mb-6">
          You are about to Stake{" "}
          <span className="font-semibold text-base">{amount} SOL</span>. Please
          review the stakeing terms and conditions before confirming your
          action.
        </p>

        <div className="flex flex-col items-center mb-8">
          <ul className="list-disc font-semibold text-left px-4">
            <li>SOL stakeing is permanent and unstakeing is not possible.</li>
            <li>
              Minimum SOL stake: 0.1 SOL. Maximum: 100 SOL per transaction.
            </li>
            <li>Daily ROI of 2% in $SOLBET, based on stakeed SOL amount.</li>
            <li>
              Rewards calculated daily, claimable anytime for flexible access.
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center mb-4">
          <input
            id="agreeTerms"
            type="checkbox"
            checked={isCheckboxChecked}
            onChange={onCheckboxChange}
            className="w-6 h-6 text-blue-600 border-gray-300 mr-2"
          />
          <label htmlFor="agreeTerms" className="text-xs max-w-xs">
            I accept the terms and understand that staking is irreversible and
            only rewards are claimable.
          </label>
        </div>

        <Button
          className="text-md px-2 py-2 bg-gradient-to-r from-base to-teal-400 rounded hover:bg-gradient-to-l transition-colors duration-300"
          onClick={onConfirm}
          disabled={!amount || !isCheckboxChecked}
        >
          Confirm
        </Button>
        <Button
          className="ml-2 text-md px-2 py-2 bg-gradient-to-r from-red-300 to-red-500 rounded hover:bg-gradient-to-l transition-colors duration-300"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmStakeSolModal;
