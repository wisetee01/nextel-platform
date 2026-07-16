/**
 * Unalterable Source of Truth for Platform Financial Tiers,
 * Merchant Escrow Vectors, and Dynamic Tracking Telemetry Parameters.
 */
export const VELORA_CONFIG = {
  TELEGRAM_MENTORSHIP_LINK: "https://t.me/nextelofficial00",
  TELEGRAM_ACTIVATION_LINK: "https://t.me/nextelofficial0",
  
  PACKAGES: {
    DIAMOND: {
      id: "DIAMOND",
      name: "Diamond ESIM",
      price: 10500,
      startingBalance: 8000
    },
    ROYAL: {
      id: "ROYAL",
      name: "Royal Esim",
      price: 17500,
      startingBalance: 14000
    }
  },
  
  MERCHANT: {
    BANK_NAME: "9 Payment Service Bank",
    ACCOUNT_NAME: "TAIWO MAROOF",
    ACCOUNT_NUMBER: "6095786597",
    RESTRICTION_WARN: "We don't accept payments from Opay. You can transfer your money to another bank before sending. Thank you"
  }
};

/**
 * Seed Array Dataset for Live Conversion Notifications.
 * Handled via isolated background lifecycle intervals inside Layer 7 (Hooks).
 */
export const MOCK_TESTIMONIAL_POOL = [
  { name: "Chidi K.", state: "Anambra" },
  { name: "Aminu M.", state: "Kano" },
  { name: "Funke A.", state: "Oyo" },
  { name: "Blessing O.", state: "Rivers" },
  { name: "Tunde J.", state: "Lagos" },
  { name: "Musa I.", state: "Kaduna" },
  { name: "Chioma N.", state: "Enugu" },
  { name: "Zainab S.", state: "FCT Abuja" },
  { name: "Yetunde B.", state: "Ogun" },
  { name: "Emeka O.", state: "Delta" },
  { name: "Saheed I.", state: "Osun" },
  { name: "Chioma N.", state: "Asaba" },
  { name: "Zainab S.", state: "Kwara " },
  { name: "Precious B.", state: "Edo" },
  { name: "john O.", state: "Delta" }

];
