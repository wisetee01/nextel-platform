import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { auth } from "../config/firebase";

/**
 * Low-level authentication boundary for the NEXTEL platform.
 * Handshakes directly with Firebase Auth endpoints.
 * Contains zero routing, state updates, or alert parsing.
 */
export const authApi = {
  /**
   * Registers a brand new user node on the Firebase identity gateway.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<import("firebase/auth").UserCredential>}
   */
  registerUserNode(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  /**
   * Authenticates an existing user node session via username/email mapping.
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<import("firebase/auth").UserCredential>}
   */
  loginUserNode(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  },

  /**
   * Terminates the current local client token persistence node.
   * @returns {Promise<void>}
   */
  logoutUserNode() {
    return signOut(auth);
  }
};

