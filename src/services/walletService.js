import { VELORA_CONFIG } from "../config/constants";

/**
 * Domain Strategy Layer handling structural financial calculations.
 * Acts as the unyielding gatekeeper for asset assignment and payment validation rules.
 */
export const walletService = {
  /**
   * Resolves the precise starting operational credit allocated to an affiliate account
   * based strictly on their chosen package tracking node.
   * 
   * @param {string} packageId - The key identifying the chosen plan (e.g., "DIAMOND", "ROYAL").
   * @returns {number} The absolute starting credit balance amount in Naira.
   * @throws {Error} If an invalid or unmapped package identifier passes into the method.
   */
  calculateStartingBalance(packageId) {
    if (!packageId) {
      throw new Error("VALIDATION ERROR: Package selection identifier parameter is required.");
    }

    const targetKey = packageId.toUpperCase();
    const mappedPackage = VELORA_CONFIG.PACKAGES[targetKey];

    if (!mappedPackage) {
      throw new Error(`STRATEGY ERROR: Selected package key "${packageId}" does not exist in system definitions.`);
    }

    // Return unalterable starting balance: DIAMOND -> 8000, ROYAL -> 14000
    return mappedPackage.startingBalance;
  },

  /**
   * Verifies if a given package string is structured correctly within platform bounds.
   * @param {string} packageId 
   * @returns {boolean}
   */
  isValidPackage(packageId) {
    if (!packageId) return false;
    return Object.prototype.hasOwnProperty.call(VELORA_CONFIG.PACKAGES, packageId.toUpperCase());
  }
};
