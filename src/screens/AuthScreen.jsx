import { useState } from "react";
import usePasswordToggle from "../hooks/usePasswordToggle";
import { NEXTEL_THEME } from "../styles/themeTokens";
// Add this:
import useUserSession from "../hooks/useUserSession";
import { useNavigationState } from "../context/NavigationContext";
import { VELORA_CONFIG } from "../config/constants";

/**
 * Layer 10: Screens - Gateway Secure Entry Signup / Form Module.
 * Collects affiliate properties and submits objects directly to Context.
 */
export default function AuthScreen() {
  const { selectedPackage, registerAndLogin, login, error, clearError } = useUserSession();
  const { navigateTo } = useNavigationState();
  const [passwordFieldType, togglePasswordVisibility, isPasswordVisible] = usePasswordToggle();

  // Auth flow toggle state tracking
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  
  // Data extraction properties state elements
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { bgBackgroundGrad, surfaceCard, textMint, textSecondary, bgMint } = NEXTEL_THEME.colors;
  const currentPackageTier = VELORA_CONFIG.PACKAGES[selectedPackage || "DIAMOND"];

  const handleAuthSubmission = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    clearError();

    try {
      if (isRegisterMode) {
        await registerAndLogin({
          fullName,
          email,
          username,
          password,
          selectedPackage: selectedPackage || "DIAMOND"
        });
      } else {
        await login(email, password);
      }
    } catch {
      // Omit 'err' variable assignment since global context state stores and renders the message
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${bgBackgroundGrad} min-h-screen flex items-center justify-center p-6 text-white`}>
      <div className={`${surfaceCard} w-full max-w-md rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl relative glow-card-mint`}>
        
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white">
            {isRegisterMode ? "Create NEXTEL Account" : "Access Your NEXTEL E-SIM Account"}
          </h2>
          {isRegisterMode && (
            <p className={`${textSecondary} text-xs font-mono uppercase tracking-wider`}>
              Selected Package: <span className={`${textMint} font-bold`}>{currentPackageTier.name}</span>
            </p>
          )}
        </div>

        {/* Operational System Failure Notification Banners */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-400 text-xs font-medium tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleAuthSubmission} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Full Name</label>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#020F0A] border border-emerald-950/60 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00FFCC] transition-colors" placeholder="e.g., Taiwo Maroof" />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#020F0A] border border-emerald-950/60 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00FFCC] transition-colors" placeholder="yourname@domain.com" />
          </div>

          {isRegisterMode && (
            <div>
              <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Preferred Username</label>
              <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#020F0A] border border-emerald-950/60 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#00FFCC] transition-colors" placeholder="username" />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Account Password</label>
            <div className="relative">
              <input type={passwordFieldType} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#020F0A] border border-emerald-950/60 rounded-xl px-4 py-3 pr-12 text-xs md:text-sm text-white focus:outline-none focus:border-[#00FFCC] transition-colors font-mono" placeholder="••••••••" />
              <button type="button" onClick={togglePasswordVisibility} className={`${textMint} absolute right-4 top-1/2 transform -translate-y-1/2 text-[10px] font-mono tracking-widest uppercase hover:text-white transition-colors`}>
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className={`${bgMint} w-full rounded-xl py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-150 transform active:scale-[0.97] disabled:opacity-50 mt-2`}>
            {isSubmitting ? "Processing Node..." : isRegisterMode ? "Register " : "Authenticate Account"}
          </button>
        </form>

        <div className="space-y-4 pt-2 text-center">
          <button 
            type="button" 
            onClick={() => { clearError(); setIsRegisterMode(!isRegisterMode); }} 
            className={`${textSecondary} hover:text-[#00FFCC] text-xs transition-colors tracking-wide block mx-auto`}
          >
            {isRegisterMode ? "Already registered? Login here" : "Need an account? Create one here"}
          </button>
          
          <button 
            type="button" 
            onClick={() => { clearError(); navigateTo("LANDING"); }} 
            className={`${textSecondary} hover:text-white text-[10px] font-mono uppercase tracking-wider block mx-auto pt-2 border-t border-emerald-950/60 w-full`}
          >
            &larr; Cancel and return to overview
          </button>
        </div>

      </div>
    </div>
  );
}

