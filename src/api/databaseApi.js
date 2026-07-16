import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Low-level unstructured database wire for the NEXTEL platform.
 * Enforces raw collection pathways without modifying data parameters.
 */
export const databaseApi = {
  /**
   * Writes a raw structural user record transaction to the users collection matrix.
   * @param {string} userId - The unique authenticated system UUID reference.
   * @param {Object} userDataPayload - Clean unparsed structural account fields.
   * @returns {Promise<void>}
   */
  saveUserDocument(userId, userDataPayload) {
    const docReference = doc(db, "users", userId);
    return setDoc(docReference, userDataPayload, { merge: true });
  },

  /**
   * Retrieves a raw unmutated platform user document snapshot vector.
   * @param {string} userId - The target system query identifier token.
   * @returns {Promise<Object|null>} Returns raw document values or null.
   */
  async fetchUserDocument(userId) {
    const docReference = doc(db, "users", userId);
    const documentSnapshot = await getDoc(docReference);
    
    if (!documentSnapshot.exists()) {
      return null;
    }
    
    return documentSnapshot.data();
  }
};
