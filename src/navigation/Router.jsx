import { useNavigationState } from "../context/NavigationContext";
import useUserSession from "../hooks/useUserSession"
import LandingScreen from "../screens/LandingScreen";
import AuthScreen from "../screens/AuthScreen";
import DashboardScreen from "../screens/DashboardScreen";

/**
 * Layer 6: Navigation - Conditional Switchboard for Root Layout Rendering.
 * Directs structural user traffic based on real-time authentication states.
 */
export default function Router() {
  const { currentScreen } = useNavigationState();
  const { isLoading } = useUserSession();

  // Guard initial layout assembly to prevent visual flashing during hydration passes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020F0A] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex h-12 w-12">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFCC] opacity-75"></span>
          <span className="relative inline-flex h-12 w-12 rounded-full bg-[#00FFCC]/20 border border-[#00FFCC]"></span>
        </div>
        <p className="text-xs font-mono tracking-widest text-[#00FFCC]/60 uppercase animate-pulse">
          Securing Nextel Gateway...
        </p>
      </div>
    );
  }

  // Evaluate the active navigation state string matrix to compile the correct screen layout node
  switch (currentScreen) {
    case "AUTH":
      return <AuthScreen />;
    case "DASHBOARD":
      return <DashboardScreen />;
    case "LANDING":
    default:
      return <LandingScreen />;
  }
}
