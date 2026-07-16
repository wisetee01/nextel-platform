import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { databaseApi } from "../api/databaseApi";
import { authApi } from "../api/authApi";
import { userService } from "../services/userService";

// Export the raw context instance directly
export const UserContext = createContext(null);

/**
 * Global Session Provider protecting state across structural component nodes.
 * Contains only the component context wrapper to optimize Vite Fast Refresh passes.
 */
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const profileData = await databaseApi.fetchUserDocument(firebaseUser.uid);
          setCurrentUser(profileData);
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        setSessionError(err.message);
      } finally {
        setIsSessionLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRegisterTransaction = async (formPayload) => {
    setSessionError(null);
    try {
      const newUserProfile = await userService.registerNewAffiliateTransaction({
        ...formPayload,
        selectedPackage: selectedPackage || formPayload.selectedPackage
      });
      setCurrentUser(newUserProfile);
      return newUserProfile;
    } catch (err) {
      setSessionError(err.message);
      throw err;
    }
  };

  const handleLoginTransaction = async (email, password) => {
    setSessionError(null);
    try {
      const verifiedProfile = await userService.authenticateAffiliateTransaction(email, password);
      setCurrentUser(verifiedProfile);
      return verifiedProfile;
    } catch (err) {
      setSessionError(err.message);
      throw err;
    }
  };

  const handleLogoutTransaction = async () => {
    setSessionError(null);
    try {
      await authApi.logoutUserNode();
      setCurrentUser(null);
    } catch (err) {
      setSessionError(err.message);
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{
      user: currentUser,
      selectedPackage,
      setSelectedPackage,
      isLoading: isSessionLoading,
      error: sessionError,
      clearError: () => setSessionError(null),
      registerAndLogin: handleRegisterTransaction,
      login: handleLoginTransaction,
      logout: handleLogoutTransaction
    }}>
      {children}
    </UserContext.Provider>
  );
};



