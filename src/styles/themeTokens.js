/**
 * Layer 8: Styles - Design System Immutable Tokens
 * Centralizes the Nextel color specification matrix values to maintain uniform 
 * visual brand presentation and eliminate presentation value duplication.
 */
export const NEXTEL_THEME = {
  colors: {
    // Foundational Canvas Gradients
    bgBackgroundGrad: "bg-gradient-to-b from-[#020F0A] via-[#051F14] to-[#010805]",
    surfaceCard: "bg-[#051F14]/90 border border-emerald-950/60",
    surfaceInner: "bg-[#020F0A] border border-emerald-950/40",
    
    // High Conversion Brand Accents
    textMint: "text-[#00FFCC]",
    bgMint: "bg-[#00FFCC] hover:bg-[#00CCAA] text-[#020F0A]",
    borderMint: "border-[#00FFCC]/20 focus:border-[#00FFCC]",
    
    // Premium Tiers & Conversion Highlights
    textGold: "text-[#FFD700]",
    bgGold: "bg-[#FFD700] hover:bg-[#E6B800] text-[#020F0A]",
    borderGold: "border-[#FFD700]/30",
    
    // Readability Core Typography Layout
    textPrimary: "text-white",
    textSecondary: "text-slate-400",
    textMuted: "text-slate-500",
  },
  
  layouts: {
    maxContainer: "max-w-5xl mx-auto px-6",
    flexBetween: "flex items-center justify-between",
    cardWrapper: "rounded-2xl p-6 transition-all duration-300",
    modalOverlay: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
  }
};
