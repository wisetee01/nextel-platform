import { useState, useCallback } from "react";

/**
 * Stateful lifecycle hook orchestrating presentation security parameters for form tokens.
 * Isolates local memory properties to eliminate layout coupling anomalies inside forms.
 * 
 * @returns {Array} Destructured tuple array [inputTypeString, toggleStateCallback, isCurrentlyVisibleBoolean]
 */
export default function usePasswordToggle() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Wrap toggle actions in an unalterable reference token to prevent render micro-recreations
  const handleToggleAction = useCallback(() => {
    setIsPasswordVisible((previousState) => !previousState);
  }, []);

  const inputTypeSignature = isPasswordVisible ? "text" : "password";

  return [inputTypeSignature, handleToggleAction, isPasswordVisible];
}
