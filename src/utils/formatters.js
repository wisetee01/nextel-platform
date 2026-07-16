/**
 * Deterministic Transformation Utility Layer for the NEXTEL platform.
 * Contains pure synchronous functions that guarantee interface presentation stability.
 */

/**
 * Transforms a raw numeric parameter safely into an unalterable Naira currency string.
 * Enforces strict, explicit integer boundaries to prevent fractional leakages on layout tiers.
 * 
 * @param {number|string} amount - The numerical denomination to transform.
 * @returns {string} Fully localized Naira currency format (e.g., ₦10,500).
 */
export const formatNaira = (amount) => {
  const parsedValue = typeof amount === "string" ? parseFloat(amount) : amount;
  
  if (isNaN(parsedValue) || parsedValue === null || parsedValue === undefined) {
    return "₦0";
  }

  // Use explicit formatting configuration mapping to isolate representations
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(parsedValue);
};
