import useTestimonialStream from "../hooks/useTestimonialStream";
import { NEXTEL_THEME } from "../styles/themeTokens";
import { VELORA_CONFIG } from "../config/constants";
import { useNavigationState } from "../context/NavigationContext";
// Add this:
import useUserSession from "../hooks/useUserSession";

import MentorshipButton from "../components/MentorshipButton";
import LiveNotification from "../components/LiveNotification";
import PlanCard from "../components/PlanCard";

/**
 * Layer 10: Screens - Primary Affiliate Pre-Lander Presentation Shell.
 * Orchestrates multi-placement Telegram buttons, marketing fliers, and plan selection cards.
 */
export default function LandingScreen() {
  const activeAlertData = useTestimonialStream(2000);
  const { navigateTo } = useNavigationState();
  const { setSelectedPackage } = useUserSession();
  const { bgBackgroundGrad, maxContainer, flexBetween, textMint, textGold, textSecondary, surfaceCard, surfaceInner } = NEXTEL_THEME.colors;

  /**
   * Catches atomic plan item interactions to route users cleanly into register forms.
   * @param {string} packageId 
   */
  const handlePlanSelection = (packageId) => {
    setSelectedPackage(packageId);
    navigateTo("AUTH");
  };

  return (
    <div className={`${bgBackgroundGrad} min-h-screen text-white font-sans overflow-y-auto`}>
      
      {/* FIXED HEADER PLACEMENT ACTION LAYER */}
      <header className="sticky top-0 z-40 bg-[#020F0A]/90 border-b border-emerald-950/60 backdrop-blur-md px-6 py-4">
        <div className={`${maxContainer} ${flexBetween} flex-wrap gap-4`}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#00FFCC] flex items-center justify-center font-black text-black text-sm">N</div>
            <span className="text-lg font-black tracking-wider text-white">NEXTEL <span className={textMint}>PLATFORM</span></span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => navigateTo("AUTH")} 
              className="text-xs md:text-sm font-bold text-white hover:text-[#00FFCC] transition-colors uppercase tracking-wider"
            >
              Sign In / Join
            </button>
            <MentorshipButton />
          </div>
        </div>
      </header>

      {/* MARKETING VALUE DECLARATION HUBS */}
      <main className={`${maxContainer} py-12 md:py-16 space-y-20`}>
        
        {/* Core Conversion Copy Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight glow-mint">
            Turn High-Speed Connections into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFCC] to-[#FFD700] drop-shadow-sm">Daily Payouts</span>
          </h1>
          <p className={`${textSecondary} text-sm md:text-base max-w-xl mx-auto leading-relaxed`}>
            Discover how the Nextel-powered platform lets users automate marketing campaigns, deploy next-gen ESIM solutions, and build sustainable income pipelines.
          </p>
        </section>

        {/* FLIERS & EXPLAINER CONTENT CONTAINER GRID */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className={`${surfaceCard} rounded-2xl p-6 flex flex-col justify-between space-y-4 glow-card-mint`}>
            <div className={`${surfaceInner} aspect-video rounded-xl flex flex-col items-center justify-center border-dashed border-emerald-900/40 p-4 text-center`}>
              <span className={`${textMint} font-bold text-xs uppercase tracking-widest mb-1`}>FLYER ASSET #1</span>
              <span className="text-2xl">📱</span>
              <p className={`${textSecondary} text-[11px] mt-2 max-w-xs font-mono`}>[Nextel ESIM Network Deployment Blueprint Graphic]</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#00FFCC]">1. Upload & Deploy Strategy</h3>
              <p className={`${textSecondary} text-xs mt-1 leading-relaxed`}>
                Upload customized promotional materials directly inside our pipeline to start driving highly optimized local affiliate traffic instantly.
              </p>
            </div>
          </div>

          <div className={`${surfaceCard} rounded-2xl p-6 flex flex-col justify-between space-y-4 glow-card-gold`}>
            <div className={`${surfaceInner} aspect-video rounded-xl flex flex-col items-center justify-center border-dashed border-emerald-900/40 p-4 text-center`}>
              <span className={`${textGold} font-bold text-xs uppercase tracking-widest mb-1`}>FLYER ASSET #2</span>
              <span className="text-2xl">💰</span>
              <p className={`${textSecondary} text-[11px] mt-2 max-w-xs font-mono`}>[Nextel Affiliate Commission Accelerator Chart]</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FFD700]">2. Collect Scaled Commissions</h3>
              <p className={`${textSecondary} text-xs mt-1 leading-relaxed`}>
                Every operational node triggers dynamic returns deposited into your wallet. Withdraw whenever you cross payment minimums.
              </p>
            </div>
          </div>
        </section>

        {/* MID-PAGE CONVERSION BRIDGE LAYER */}
        <section className={`${surfaceCard} bg-gradient-to-r from-[#051F14]/90 to-[#020F0A]/95 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left`}>
          <div>
            <h2 className="text-lg md:text-xl font-black text-white">Ready to access customized guidance?</h2>
            <p className={`${textSecondary} text-xs md:text-sm mt-1`}>Our live mentors outline exactly how to transition to daily five-figure structures.</p>
          </div>
          <MentorshipButton />
        </section>

        {/* SYSTEM PACKAGE SELECTION GRID MATRIX */}
        <section className="space-y-8 pt-4">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">Choose Your Nextel Operational Package</h2>
            <p className={`${textSecondary} text-xs md:text-sm max-w-md mx-auto`}>Select an active access tier below to configure your account setup automatically.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <PlanCard 
              packageData={VELORA_CONFIG.PACKAGES.DIAMOND} 
              onSelect={handlePlanSelection} 
            />
            <PlanCard 
              packageData={VELORA_CONFIG.PACKAGES.ROYAL} 
              onSelect={handlePlanSelection} 
            />
          </div>
        </section>

      </main>

      {/* FOOTER & PLACEMENT ANCHOR AT LAYER BASE */}
      <footer className="border-t border-emerald-950/60 bg-[#010805] px-6 py-12 text-center space-y-6 mt-12">
        <p className={`${textSecondary} text-xs font-mono`}>&copy; 2026 VELORA NEXTEL Platform Network. All Rights Reserved.</p>
        <div className="flex flex-col items-center justify-center gap-3">
          <MentorshipButton />
        </div>
      </footer>

      {/* FLOATING CONVERSION TICKER EMITTER WRAPPER */}
      <LiveNotification activeData={activeAlertData} />

    </div>
  );
}
