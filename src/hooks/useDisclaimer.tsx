// hooks/useDisclaimer.tsx

import { useEffect, useState } from "react";

import { useUserStore } from "./useUserStore";

export function useDisclaimer() {
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState<boolean>(false);

  const { agreedToTerms, set } = useUserStore();

  useEffect(() => {
    setShowDisclaimer(!agreedToTerms);
  }, [agreedToTerms]);

  const handleDisclaimerClose = () => {
    set((state) => ({ ...state, agreedToTerms: true }));
    setShowDisclaimer(false);
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prev) => !prev);
  };

  return {
    showDisclaimer,
    handleDisclaimerClose,
    isCheckboxChecked,
    handleCheckboxChange,
  };
}
