import { NEXTEL_THEME } from "../styles/themeTokens";
import { formatNaira } from "../utils/formatters";

/**
 * Layer 9: Components - Isolated Plan Offering Component.
 * Visual layout container displaying pricing metrics and entry balance incentives.
 * Signals parent layouts via callbacks to prevent interface rule breaks.
 * 
 * @param {Object} props
 * @param {Object} props.packageData - The structural tier item object mapping from config constants.
 * @param {function} props.onSelect - Callback handler triggered when a user submits their choice.
 */
export default function PlanCard({ packageData, onSelect }) {
  if (!packageData) return null;

  const { id, name, price, startingBalance } = packageData;
  const { surfaceCard, textMint, textGold, textSecondary, bgMint, bgGold } = NEXTEL_THEME.colors;
  
  const isRoyalTier = id === "ROYAL";

  return (
    <div 
      className={`${surfaceCard} ${isRoyalTier ? "border-[#FFD700]/50 glow-card-gold" : "glow-card-mint"} relative flex flex-col justify-between space-y-6 rounded-2xl p-6 md:p-8 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]`}
    >
      {isRoyalTier && (
        <span className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-[#FFD700] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#020F0A]">
          Highly Recommended
        </span>
      )}

      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
          {name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-4xl font-black tracking-tight text-white">
            {formatNaira(price)}
          </span>
          <span className={`${textSecondary} text-xs font-mono uppercase tracking-wider`}>
            / Activation
          </span>
        </div>
        
        <div className="border-t border-emerald-950/80 pt-4 mt-4">
          <p className={`${textSecondary} text-xs leading-relaxed`}>
            Instant Operational Account Incentive Balance:
          </p>
          <p className={`${isRoyalTier ? textGold : textMint} text-lg font-black tracking-wide mt-1`}>
            {formatNaira(startingBalance)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSelect(id)}
        className={`${isRoyalTier ? bgGold : bgMint} w-full rounded-xl py-3.5 text-xs md:text-sm font-black tracking-wide uppercase transition-all duration-200 transform active:scale-[0.97] shadow-lg`}
      >
        Select {name}
      </button>
    </div>
  );
}
