/**
 * Enforces malformed-proof serialization constraints on out-of-bounds parameters.
 * Prevents logic pollution by requiring external telemetry metrics to pass raw layout inputs.
 */

/**
 * Compiles a completely URI-safe prefilled context script payload for the activation link.
 * 
 * @param {string} packageName - The explicit chosen package name string (e.g., "Diamond ESIM").
 * @param {string} formattedAmount - The formatted price signature string (e.g., "₦10,500").
 * @returns {string} An unalterable, fully encoded message parameter append template.
 */
export const buildActivationMessageParam = (packageName, formattedAmount) => {
  if (!packageName || !formattedAmount) {
    return "";
  }
  
  const rawTemplate = `hello Nextel official, ive made my payment for Nextel activation. Kindly activate my account. Here is my payment proof for ${packageName} (${formattedAmount}).`;
  
  return encodeURIComponent(rawTemplate);
};

/**
 * Validates baseline formatting properties of email patterns prior to service processing.
 * 
 * @param {string} email - Raw text user email input token.
 * @returns {boolean} Direct logic assessment.
 */
export const isValidEmailFormat = (email) => {
  if (!email || typeof email !== "string") {
    return false;
  }
  const cleanEmail = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleanEmail);
};
