import { NEXTEL_THEME } from "../styles/themeTokens";
import { formatNaira } from "../utils/formatters";

/**
 * Layer 9: Components - Isolated Live Payout Emitter Element.
 * Subscribes to input data updates fed upstream from local visual lifecycles.
 * Handles styling layouts without tracking DOM session state changes directly.
 * 
 * @param {Object} props
 * @param {Object} props.activeData - Active snapshot payload from the hook stream.
 */
export default function LiveNotification({ activeData }) {
  if (!activeData) return null;

  const { surfaceCard, textMint, textGold, textSecondary } = NEXTEL_THEME.colors;

  return (
    <div 
      key={activeData.id} 
      className={`${surfaceCard} fixed bottom-6 left-6 z-50 flex max-w-xs md:max-w-sm items-center gap-4 rounded-xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md animate-fade-in-up glow-card-mint`}
    >
      {/* Real-time activity pulse indicator block */}
      <div className="relative flex h-3 w-3 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFCC] opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00FFCC]"></span>
      </div>

      <div className="flex flex-col space-y-0.5">
        <p className={`${textSecondary} text-[10px] uppercase font-mono tracking-widest`}>
          Live Payout Notification
        </p>
        <p className="text-xs md:text-sm font-bold text-white">
          {activeData.name} from <span className={`${textGold} font-extrabold`}>{activeData.state}</span>
        </p>
        <p className={`${textMint} text-xs md:text-sm font-black`}>
          Successfully Withdrew {formatNaira(activeData.amount)}
        </p>
      </div>
    </div>
  );
}
