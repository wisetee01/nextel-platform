import { VELORA_CONFIG } from "../config/constants";
import { NEXTEL_THEME } from "../styles/themeTokens";

/**
 * Layer 9: Components - Isolated Telegram Access Entry Anchor.
 * Displays high-contrast gold premium visual parameters across multi-placement targets.
 * Works independently of account registration or system validation flags.
 */
export default function MentorshipButton() {
  const { bgGold } = NEXTEL_THEME.colors;

  return (
    <a
      href={VELORA_CONFIG.TELEGRAM_MENTORSHIP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`${bgGold} inline-flex items-center justify-center rounded-full font-black text-xs md:text-sm px-5 py-3 tracking-wide uppercase shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] glow-gold text-center`}
    >
      Join our free Mentorship Channel
    </a>
  );
}
