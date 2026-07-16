import { useContext } from "react";
import { UserContext } from "../context/UserContext";

/**
 * Layer 7: Hooks - Consumer Interface for global user session values.
 * Isolated completely into the custom hooks layer to support Vite Fast Refresh optimizations.
 */
export default function useUserSession() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("SECURITY FAILURE: useUserSession must be invoked inside a valid UserProvider wrapper block.");
  }
  return context;
}
