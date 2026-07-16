import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * Nextel Platform System Hardening Boundary
 * Validates existence of critical configuration hashes at application runtime 
 * to shield components against silent environmental structural failures.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate that the system keys are present before loading memory nodes
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error("CRITICAL CONFIGURATION ERROR: Nextel environment variables are missing inside your local env safehouse.");
}

// Instantiate core platform singleton engines
const app = initializeApp(firebaseConfig);

/**
 * Raw Platform Client Instantiations
 * Exposed exclusively to Layer 2 (API) interfaces. 
 * High layers (3-10) are forbidden from importing these variables directly.
 */
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
