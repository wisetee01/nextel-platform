import { useState } from "react";
import { NEXTEL_THEME } from "../styles/themeTokens";
// Add this:
import useUserSession from "../hooks/useUserSession";

import { VELORA_CONFIG } from "../config/constants";
import { formatNaira } from "../utils/formatters";
import PaymentModal from "../components/PaymentModal";

/**
 * Layer 10: Screens - Secure Private Dashboard Operations Arena.
 * Authenticates layout vectors and surfaces account credits alongside validation locks.
 */
export default function DashboardScreen() {
  const { user, logout } = useUserSession();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { bgBackgroundGrad, maxContainer, flexBetween, textMint, textGold, textSecondary, surfaceCard } = NEXTEL_THEME.colors;

  // Protect against structural canvas leakage if memory wipes execute
  if (!user) return null;

  const activeUserPackageTier = VELORA_CONFIG.PACKAGES[user.selectedPackage || "DIAMOND"];

  return (
    <div className={`${bgBackgroundGrad} min-h-screen text-white font-sans overflow-y-auto`}>
      
      {/* PRIVATE INTERNAL COMMAND NAVIGATION HEADER */}
      <nav className="bg-[#051F14]/50 border-b border-emerald-950/60 backdrop-blur-md px-6 py-4">
        <div className={`${maxContainer} ${flexBetween}`}>
          <div>
            <span className={`${textSecondary} text-[10px] uppercase font-mono tracking-widest block`}>Affiliate Node</span>
            <h2 className="text-base md:text-lg font-black text-[#00FFCC] tracking-tight">{user.username}</h2>
          </div>
          
          {/* SECURE WALLET LEDGER MATRIX NODE */}
          <div className="flex items-center gap-4 bg-[#020F0A] border border-emerald-950/60 px-4 py-2.5 rounded-xl glow-card-mint">
            <div>
              <span className={`${textSecondary} text-[9px] uppercase font-mono tracking-wider block leading-none mb-0.5`}>Available Balance</span>
              <span className={`${textGold} text-sm md:text-base font-black tracking-wide`}>
                {formatNaira(user.availableBalance)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-[#00FFCC] hover:bg-[#00CCAA] text-[#020F0A] text-xs font-black px-3.5 py-2 rounded-lg transition-all duration-150 transform active:scale-95 shadow-md uppercase tracking-wider"
            >
              Withdraw
            </button>
          </div>
        </div>
      </nav>

      {/* DASHBOARD CENTRAL OPERATION WRAPPER */}
      <main className="max-w-md mx-auto px-6 py-16 text-center space-y-6 animate-fade-in-up">
        <div className={`${surfaceCard} rounded-2xl p-6 md:p-8 space-y-4 glow-card-mint`}>
          <div className="h-12 w-12 rounded-full bg-emerald-950/40 border border-emerald-900/30 flex items-center justify-center text-[#00FFCC] text-xl font-bold mx-auto shadow-inner">
            ✓
          </div>
          <h3 className="text-lg md:text-xl font-black text-white tracking-tight">Nextel Credentials Authenticated</h3>
          <p className={`${textSecondary} text-xs leading-relaxed`}>
            Welcome, <span className="text-white font-semibold">{user.fullName}</span>. Your Nextel system allocation has mapped successfully to the <span className={`${textMint} font-bold`}>{activeUserPackageTier.name}</span> tracking node.
          </p>
        </div>

        <button
          type="button"
          onClick={logout}
          className={`${textSecondary} hover:text-red-400 text-xs font-mono uppercase tracking-widest transition-colors duration-150 block mx-auto pt-2`}
        >
          Exit Secure Session &larr;
        </button>
      </main>

      {/* VERIFIED ESCROW SYSTEM CONTROL OVERLAY */}
      {isCheckoutOpen && (
        <PaymentModal 
          chosenPackage={activeUserPackageTier} 
          onClose={() => setIsCheckoutOpen(false)} 
        />
      )}

    </div>
  );
}
