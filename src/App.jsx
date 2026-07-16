import { UserProvider } from "./context/UserContext";
import { NavigationProvider } from "./context/NavigationContext";
import Router from "./navigation/Router";
import "./styles/globals.css";

export default function App() {
  return (
    <UserProvider>
      <NavigationProvider>
        <Router />
      </NavigationProvider>
    </UserProvider>
  );
}


