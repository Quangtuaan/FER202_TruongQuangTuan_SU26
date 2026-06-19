import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AppNavbar from "./components/AppNavbar";

function App() {
  const { state } = useAuth();

  return (
    <div>
      {state.isAuthenticated ? (
        <>
          <AppNavbar />
          <DashboardPage showLogout={false} />
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default App;