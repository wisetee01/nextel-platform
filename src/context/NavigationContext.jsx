import { createContext, useContext, useState, useEffect } from "react";
import useUserSession from "../hooks/useUserSession"

const NavigationContext = createContext(null);

/**
 * Global Screen View Coordination Manager.
 * Ensures uniform route state parameters without layout compilation leaks.
 */
export const NavigationProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("LANDING"); // LANDING, AUTH, DASHBOARD
  const { user, isLoading } = useUserSession();

  // Guard navigation pipelines cleanly based on active session conditions
  useEffect(() => {
    if (isLoading) return;

    if (user) {
      // Defer state update execution past the current render pass cycle
      const timeoutId = setTimeout(() => {
        setCurrentScreen("DASHBOARD");
      }, 0);
      return () => clearTimeout(timeoutId);
    } else if (currentScreen === "DASHBOARD") {
      const timeoutId = setTimeout(() => {
        setCurrentScreen("LANDING");
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [user, isLoading, currentScreen]);

  /**
   * Route state transitional switch modifier.
   * Enforces rigorous string pattern evaluations to eliminate broken path exceptions.
   */
  const transitionToScreen = (targetScreen) => {
    const validScreens = ["LANDING", "AUTH", "DASHBOARD"];
    const parsedTarget = String(targetScreen).toUpperCase();

    if (!validScreens.includes(parsedTarget)) {
      throw new Error(`ROUTING EXCEPTION: Attempted navigation to an unmapped structural layer target: "${targetScreen}".`);
    }

    // Block unauthenticated layout entry vectors onto secure screens
    if (parsedTarget === "DASHBOARD" && !user) {
      setCurrentScreen("AUTH");
      return;
    }

    setCurrentScreen(parsedTarget);
  };

  const value = {
    currentScreen,
    navigateTo: transitionToScreen
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

/**
 * Context consumer hook ensuring streamlined routing operations.
 */
export const useNavigationState = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("SECURITY FAILURE: useNavigationState must be invoked inside a valid NavigationProvider wrapper block.");
  }
  return context;
};

